import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true},
    title: { type: String, required: true},
    affilation: { type: String, required: true},
    rating: {type: String, required: true},
    img: { type: String, required: true},
});

export interface Product extends mongoose.Document{
    id: string;
    name: string;
    title: string; 
    affilation: string;
    rating: string;
    img: string;
}