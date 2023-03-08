import * as mongoose from 'mongoose';

export const WeaponSchema = new mongoose.Schema({
    name: { type: String, required: true},
    user: { type: String, required: true},
    type: { type: String, required: false},
    img: { type: String, required: true},
});

export interface Weapon extends mongoose.Document{
    id: string;
    name: string;
    user: string; 
    type: string;
    img: string;
}