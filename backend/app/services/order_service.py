from sqlalchemy.orm import Session
from app.repositories.order_repo import OrderRepository
from app.repositories.customer_repo import CustomerRepository
from app.repositories.product_repo import ProductRepository
from app.schemas.order import OrderCreate
from app.utils.exceptions import BusinessLogicException, NotFoundException

class OrderService:
    def __init__(self, db: Session):
        self.db = db
        self.order_repo = OrderRepository(db)
        self.customer_repo = CustomerRepository(db)
        self.product_repo = ProductRepository(db)

    def create_order(self, order_in: OrderCreate):
        customer = self.customer_repo.get_by_id(order_in.customer_id)
        if not customer:
            raise NotFoundException("Customer not found")

        total_amount = 0.0
        items_data = []

        # Validate & Lock inventory
        for item in order_in.items:
            product = self.product_repo.get_by_id(item.product_id, lock=True)
            if not product:
                raise NotFoundException(f"Product ID {item.product_id} not found")
            
            if product.stock_quantity < item.quantity:
                raise BusinessLogicException(f"Insufficient stock for '{product.name}'. Requested: {item.quantity}, Available: {product.stock_quantity}")

            line_total = float(product.price) * item.quantity
            total_amount += line_total
            
            old_stock = product.stock_quantity
            product.stock_quantity -= item.quantity

            self.order_repo.create_inventory_log(
                product_id=product.id,
                event="SALE",
                changed=-item.quantity,
                old=old_stock,
                new=product.stock_quantity
            )

            items_data.append({
                "product_id": product.id,
                "quantity": item.quantity,
                "unit_price": product.price
            })

        order = self.order_repo.create_order(customer.id, total_amount)
        for data in items_data:
            self.order_repo.create_order_item(order.id, **data)

        self.db.commit()
        self.db.refresh(order)
        return order

    def get_order(self, order_id: int):
        order = self.order_repo.get_by_id(order_id)
        if not order:
            raise NotFoundException("Order not found")
        return order

    def get_orders(self, page: int, page_size: int, status: str):
        skip = (page - 1) * page_size
        return self.order_repo.list(skip, page_size, status)

    def update_order_status(self, order_id: int, status: str):
        order = self.get_order(order_id)
        updated = self.order_repo.update_status(order, status)
        self.db.commit()
        self.db.refresh(updated)
        return updated