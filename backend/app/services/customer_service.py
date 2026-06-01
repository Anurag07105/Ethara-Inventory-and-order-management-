from sqlalchemy.orm import Session
from app.repositories.customer_repo import CustomerRepository
from app.schemas.customer import CustomerCreate, CustomerUpdate
from app.utils.exceptions import BusinessLogicException, NotFoundException

class CustomerService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = CustomerRepository(db)

    def create_customer(self, customer_in: CustomerCreate):
        if self.repo.get_by_email(customer_in.email):
            raise BusinessLogicException("A customer with this email already exists")
        customer = self.repo.create(customer_in)
        self.db.commit()
        self.db.refresh(customer)
        return customer

    def get_customer(self, customer_id: int):
        customer = self.repo.get_by_id(customer_id)
        if not customer:
            raise NotFoundException("Customer not found")
        return customer

    def get_customers(self, page: int, page_size: int, email: str, name: str):
        skip = (page - 1) * page_size
        return self.repo.list(skip, page_size, email, name)

    def update_customer(self, customer_id: int, customer_in: CustomerUpdate):
        db_customer = self.get_customer(customer_id)
        if customer_in.email and customer_in.email != db_customer.email:
            if self.repo.get_by_email(customer_in.email):
                raise BusinessLogicException("Email is already in use by another customer")
        
        updated = self.repo.update(db_customer, customer_in)
        self.db.commit()
        self.db.refresh(updated)
        return updated

    def delete_customer(self, customer_id: int):
        db_customer = self.get_customer(customer_id)
        self.repo.delete(db_customer)
        self.db.commit()