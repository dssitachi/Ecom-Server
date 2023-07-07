import { ProductEntity } from '../entity/product.entity';
import { ApiResponse, Product } from '../utils/types';
import { Repository } from 'typeorm';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<ProductEntity>);
    findAll(): Promise<ProductEntity[]>;
    addProduct(product: Product): Promise<ApiResponse>;
}
