from sqlalchemy.orm import Session
from app.repositories.product_repo import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate
from app.utils.exceptions import BusinessLogicException, NotFoundException

class ProductService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = ProductRepository(db)

    def create_product(self, product_in: ProductCreate):
        if self.repo.get_by_sku(product_in.sku):
            raise BusinessLogicException("A product with this SKU already exists")
        product = self.repo.create(product_in)
        self.db.commit()
        self.db.refresh(product)
        return product

    def get_product(self, product_id: int):
        product = self.repo.get_by_id(product_id)
        if not product:
            raise NotFoundException("Product not found")
        return product

    def get_products(self, page: int, page_size: int, sku: str, name: str):
        skip = (page - 1) * page_size
        return self.repo.list(skip, page_size, sku, name)
        
    def update_product(self, product_id: int, product_in: ProductUpdate):
        db_product = self.get_product(product_id)
        updated = self.repo.update(db_product, product_in)
        self.db.commit()
        self.db.refresh(updated)
        return updated

    def delete_product(self, product_id: int):
        db_product = self.get_product(product_id)
        self.repo.delete(db_product)
        self.db.commit()