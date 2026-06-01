from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate

class CustomerRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, customer_id: int) -> Customer | None:
        return self.db.execute(select(Customer).where(Customer.id == customer_id)).scalar_one_or_none()

    def get_by_email(self, email: str) -> Customer | None:
        return self.db.execute(select(Customer).where(Customer.email == email)).scalar_one_or_none()

    def list(self, skip: int = 0, limit: int = 10, email: str = None, name: str = None):
        query = select(Customer)
        if email: query = query.where(Customer.email.ilike(f"%{email}%"))
        if name: query = query.where(Customer.name.ilike(f"%{name}%"))
        
        total = self.db.execute(select(func.count()).select_from(query.subquery())).scalar()
        items = self.db.execute(query.offset(skip).limit(limit)).scalars().all()
        return items, total

    def create(self, customer_in: CustomerCreate) -> Customer:
        db_customer = Customer(**customer_in.model_dump())
        self.db.add(db_customer)
        self.db.flush()
        return db_customer

    def update(self, db_customer: Customer, customer_in: CustomerUpdate) -> Customer:
        update_data = customer_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_customer, field, value)
        self.db.flush()
        return db_customer

    def delete(self, db_customer: Customer):
        self.db.delete(db_customer)
        self.db.flush()