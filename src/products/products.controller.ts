import { Controller, Get} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) {

    }

    @Get('')
    async getProducts(): Promise<any> {
        return await this.productService.findAll();
    }

    // @Post('/add')
    // async createProduct(@Body() product: Product[]):Promise<any> {
    //     console.log('here')
    //     product.forEach(async(p) => await this.productService.addProduct(p))
    //     return 3;
    // } 

}
