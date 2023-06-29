import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiResponse, Product } from 'src/utils/types';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) {

    }

    @Get('')
    async getProducts(): Promise<any> {
        return await this.productService.findAll();
    }

    @Post('/add')
    async createProduct(@Body() product: Product[]):Promise<any> {
        product.forEach(async(p) => await this.productService.addProduct(p))
        return 3;
    } 

}
