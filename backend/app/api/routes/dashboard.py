from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.core.database import get_db
from app.models.order import Order
from app.models.product import Product
from app.models.customer import Customer
from app.utils.responses import APIResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=APIResponse)
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Simple aggregated query logic for dashboard using DB layer strictly mapping out required data
    total_orders = db.execute(select(func.count(Order.id))).scalar()
    total_revenue = db.execute(select(func.sum(Order.total_amount))).scalar() or 0.0
    total_products = db.execute(select(func.count(Product.id))).scalar()
    total_customers = db.execute(select(func.count(Customer.id))).scalar()

    stats = {
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "total_products": total_products,
        "total_customers": total_customers
    }
    return APIResponse(data=stats)