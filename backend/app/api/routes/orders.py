from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.order import OrderCreate, OrderResponse, OrderStatusUpdate
from app.utils.responses import APIResponse, PaginatedResponse
from app.services.order_service import OrderService

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("", response_model=APIResponse[OrderResponse])
def create_order(order_in: OrderCreate, db: Session = Depends(get_db)):
    order = OrderService(db).create_order(order_in)
    return APIResponse(data=order, message="Order created successfully")

@router.get("", response_model=APIResponse[PaginatedResponse[OrderResponse]])
def list_orders(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    status: str = None,
    db: Session = Depends(get_db)
):
    items, total = OrderService(db).get_orders(page, page_size, status)
    return APIResponse(data=PaginatedResponse(items=items, total=total, page=page, page_size=page_size))

@router.get("/{id}", response_model=APIResponse[OrderResponse])
def get_order(id: int, db: Session = Depends(get_db)):
    return APIResponse(data=OrderService(db).get_order(id))

@router.patch("/{id}/status", response_model=APIResponse[OrderResponse])
def update_order_status(id: int, status_in: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = OrderService(db).update_order_status(id, status_in.status)
    return APIResponse(data=order, message="Order status updated successfully")