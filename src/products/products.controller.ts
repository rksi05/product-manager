import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('characters')
export class ProductsController {
    constructor(private readonly charsService: ProductsService) { }
    
    @Get()
    async getAllProducts() {
        const chars = await this.charsService.getAllProducts();
        return chars;
    }

    @Post()
    async addProduct(
        @Body('name') prodName: string, 
        @Body('title') prodTitle: string,
        @Body('affilation') prodAffilation: string, 
        @Body('rating') prodRating: string, 
        @Body('img') prodImg: string,
        ) {

        const generatedId = await this.charsService.insertProducts(prodName, prodTitle, prodAffilation, prodRating, prodImg);
        return { id: generatedId };
    }

    @Get(':id')
    async getProductById(@Param('id') charId: string,) {
        const char  = await this.charsService.getProductById(charId);
        return char;
    }

    @Patch(':id')
    async updateProductById(
        @Param('id') charId: string,
        @Body('name') prodName: string, 
        @Body('title') prodTitle: string,
        @Body('affilation') prodAffilation: string, 
        @Body('rating') prodRating: string, 
        @Body('img') prodImg: string,
    ) {
        await this.charsService.updateProductById(charId, prodName, prodTitle, prodAffilation, prodRating, prodImg);
        return null;
    }

    @Delete(':id')
    async deleteProductById(@Param('id') charId: string,) {
        await this.charsService.deleteProductById(charId);
        return null;
    }

}
