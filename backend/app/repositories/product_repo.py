from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, product_id: int, lock: bool = False) -> Product | None:
        query = select(Product).where(Product.id == product_id)
        if lock:
            query = query.with_for_update()
        return self.db.execute(query).scalar_one_or_none()

    def get_by_sku(self, sku: str) -> Product | None:
        return self.db.execute(select(Product).where(Product.sku == sku)).scalar_one_or_none()

    def list(self, skip: int = 0, limit: int = 10, sku: str = None, name: str = None):
        query = select(Product)
        if sku: query = query.where(Product.sku.ilike(f"%{sku}%"))
        if name: query = query.where(Product.name.ilike(f"%{name}%"))
        
        total = self.db.execute(select(func.count()).select_from(query.subquery())).scalar()
        items = self.db.execute(query.offset(skip).limit(limit)).scalars().all()
        return items, total

    def create(self, product_in: ProductCreate) -> Product:
        db_product = Product(**product_in.model_dump())
        self.db.add(db_product)
        self.db.flush()
        return db_product

    def update(self, db_product: Product, product_in: ProductUpdate) -> Product:
        update_data = product_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_product, field, value)
        self.db.flush()
        return db_product

    def delete(self, db_product: Product):
        self.db.delete(db_product)
        self.db.flush()