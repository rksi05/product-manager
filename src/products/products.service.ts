import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productsModel: Model<Product>) {}

    async getAllProducts() {
        const chars = await this.productsModel.find().exec();
        return chars.map(c => ({ id: c.id, 
            name: c.name,
            title: c.title,
            affilation: c.affilation,
            rating: c.rating,
            img: c.img
        }));
    }

    async insertProducts(name: string, title:string, affilation: string, rating: string, img:string) {
        const newChar = new this.productsModel({ name: name, title:title, affilation: affilation, rating: rating, img: img });
        const result = await newChar.save();
        return result.id as string;
    }

    async getProductById(charId: string) {
        const char = await (await this.findProduct(charId));
        return { name: char.name, title: char.title, affilation: char.affilation, rating: char.rating, img: char.img };
    }

    async updateProductById(charId: string, name: string, title:string, affilation: string, rating: string, img:string) {
        const updatedProduct = await this.findProduct(charId);

        if (name) {
            updatedProduct.name = name;
        }
        if (title) {
            updatedProduct.title = title;
        }
        if (affilation) {
            updatedProduct.affilation = affilation;
        }
        if (rating) {
            updatedProduct.rating = rating;
        }
        if (img) {
            updatedProduct.img = img;
        }
        updatedProduct.save();
    }

    async deleteProductById(charId: string) {
        const result = await this.productsModel.deleteOne({ _id: charId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('product does not exist');
        }

    }

    private async findProduct(charId: string): Promise<Product> {
        let char;
        try {
            char = await this.productsModel.findById(charId)

        } catch (error) {
            throw new NotFoundException('product does not exist');

        }
        if (!char) {
            throw new NotFoundException('product does not exist');
        }
        return char;
    }
}