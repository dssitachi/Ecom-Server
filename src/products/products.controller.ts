import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiResponse, Product } from 'src/utils/types';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) {

    }

    @Get('')
    async getProducts(): Promise<any> {
        console.log('here')
        return await this.productService.findAll();
    }

    @Get('/:id')
    async getProduct(@Param('id') id): Promise<any> {
        return await this.productService.findOne(id);
    }

    @Post('/add')
    async createProduct(@Body() product: Product[]):Promise<any> {
        console.log(7);
        product.forEach(async(p) => await this.productService.addProduct(p))
        return 3;
    } 

}
