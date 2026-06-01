from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.models.order import Order, OrderItem
from app.models.inventory import InventoryLog

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, order_id: int) -> Order | None:
        return self.db.execute(select(Order).where(Order.id == order_id)).scalar_one_or_none()

    def list(self, skip: int = 0, limit: int = 10, status: str = None):
        query = select(Order)
        if status: query = query.where(Order.status == status)
        
        total = self.db.execute(select(func.count()).select_from(query.subquery())).scalar()
        items = self.db.execute(query.offset(skip).limit(limit)).scalars().unique().all()
        return items, total

    def create_order(self, customer_id: int, total_amount: float) -> Order:
        new_order = Order(customer_id=customer_id, total_amount=total_amount, status="PENDING")
        self.db.add(new_order)
        self.db.flush()
        return new_order

    def create_order_item(self, order_id: int, product_id: int, quantity: int, unit_price: float) -> OrderItem:
        item = OrderItem(order_id=order_id, product_id=product_id, quantity=quantity, unit_price=unit_price)
        self.db.add(item)
        self.db.flush()
        return item
        
    def create_inventory_log(self, product_id: int, event: str, changed: int, old: int, new: int) -> InventoryLog:
        log = InventoryLog(product_id=product_id, event_type=event, quantity_changed=changed, previous_stock=old, new_stock=new)
        self.db.add(log)
        self.db.flush()
        return log

    def update_status(self, db_order: Order, status: str) -> Order:
        db_order.status = status
        self.db.flush()
        return db_order