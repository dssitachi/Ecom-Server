import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiResponse, Product } from 'src/utils/types';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) {

    }

    @Get('')
    async getProducts(): Promise<any> {
        const x = await this.productService.findAll();
        console.log(x);
        return x;
    }

    @Post('/add')
    async createProduct(@Body() product: Product):Promise<ApiResponse> {
        return await this.productService.addProduct(product);
    } 

}
