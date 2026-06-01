from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.utils.responses import APIResponse, PaginatedResponse
from app.services.product_service import ProductService

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("", response_model=APIResponse[ProductResponse])
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    product = ProductService(db).create_product(product_in)
    return APIResponse(data=product, message="Product created successfully")

@router.get("", response_model=APIResponse[PaginatedResponse[ProductResponse]])
def list_products(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    sku: str = None,
    name: str = None,
    db: Session = Depends(get_db)
):
    items, total = ProductService(db).get_products(page, page_size, sku, name)
    return APIResponse(data=PaginatedResponse(items=items, total=total, page=page, page_size=page_size))

@router.get("/{id}", response_model=APIResponse[ProductResponse])
def get_product(id: int, db: Session = Depends(get_db)):
    return APIResponse(data=ProductService(db).get_product(id))

@router.put("/{id}", response_model=APIResponse[ProductResponse])
def update_product(id: int, product_in: ProductUpdate, db: Session = Depends(get_db)):
    product = ProductService(db).update_product(id, product_in)
    return APIResponse(data=product, message="Product updated successfully")

@router.delete("/{id}", response_model=APIResponse)
def delete_product(id: int, db: Session = Depends(get_db)):
    ProductService(db).delete_product(id)
    return APIResponse(message="Product deleted successfully")