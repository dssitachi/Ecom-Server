import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entity/product.entity';
import { ApiResponse, Product } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>) {

    }

    async findAll(): Promise<ProductEntity[]> {
        return await this.productsRepository.find()
    }

    async addProduct(product: Product): Promise<ApiResponse> {
        try {
            var productEntity = new ProductEntity();
            productEntity.name = product.name;
            productEntity.category = product.category;
            productEntity.description = product.description;
            productEntity.price = product.price;
            productEntity.img = product.img;
            productEntity.brand = product.brand;
            await this.productsRepository.save(productEntity);

            return {
                response: productEntity,
                message: "success"
            }

        } catch (error) {
            return {
                response: error,
                message: error.message
            }
        }
    }

}
