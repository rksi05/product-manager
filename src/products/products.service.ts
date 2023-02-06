import { Injectable } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>
    ){}

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel ({ title: title, description: desc, price: price});
        const result = await newProduct.save();
        console.log(result);
        return 'prodId';
    }

    getProducts(){
        return [...this.products];
    }
}