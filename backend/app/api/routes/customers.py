from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.customer import CustomerCreate, CustomerUpdate, CustomerResponse
from app.utils.responses import APIResponse, PaginatedResponse
from app.services.customer_service import CustomerService

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.post("", response_model=APIResponse[CustomerResponse])
def create_customer(customer_in: CustomerCreate, db: Session = Depends(get_db)):
    customer = CustomerService(db).create_customer(customer_in)
    return APIResponse(data=customer, message="Customer created successfully")

@router.get("", response_model=APIResponse[PaginatedResponse[CustomerResponse]])
def list_customers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    email: str = None,
    name: str = None,
    db: Session = Depends(get_db)
):
    items, total = CustomerService(db).get_customers(page, page_size, email, name)
    return APIResponse(data=PaginatedResponse(items=items, total=total, page=page, page_size=page_size))

@router.get("/{id}", response_model=APIResponse[CustomerResponse])
def get_customer(id: int, db: Session = Depends(get_db)):
    return APIResponse(data=CustomerService(db).get_customer(id))

@router.put("/{id}", response_model=APIResponse[CustomerResponse])
def update_customer(id: int, customer_in: CustomerUpdate, db: Session = Depends(get_db)):
    customer = CustomerService(db).update_customer(id, customer_in)
    return APIResponse(data=customer, message="Customer updated successfully")

@router.delete("/{id}", response_model=APIResponse)
def delete_customer(id: int, db: Session = Depends(get_db)):
    CustomerService(db).delete_customer(id)
    return APIResponse(message="Customer deleted successfully")