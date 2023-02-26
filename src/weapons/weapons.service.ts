import { Injectable, NotFoundException } from '@nestjs/common';
import { Weapon } from './weapons.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WeaponsService {

    constructor(@InjectModel('Weapons') private readonly weaponsModel: Model<Weapon>) {}

    async getAllWeapons() {
        const weps = await this.weaponsModel.find().exec();
        return weps.map(c => ({ id: c.id, 
            name: c.name,
            user: c.user,
            backstory: c.backstory,
            img: c.img
        }));
    }

    async insertWeapons(name: string, user:string, backstory: string, img:string) {
        const newWep = new this.weaponsModel({ name: name, user: user, backstory: backstory, img: img });
        const result = await newWep.save();
        return result.id as string;
    }

    async getWeaponById(wepId: string) {
        const wep = await (await this.findWeapon(wepId));
        return { name: wep.name, user: wep.user, backstory: wep.backstory, img: wep.img };
    }

    async updateWeaponById(wepId: string, name: string, user:string, backstory: string, img:string) {
        const updatedWeapon = await this.findWeapon(wepId);

        if (name) {
            updatedWeapon.name = name;
        }
        if (user) {
            updatedWeapon.user = user;
        }
        if (backstory) {
            updatedWeapon.backstory = backstory;

        }
        if (img) {
            updatedWeapon.img = img;
        }
        updatedWeapon.save();
    }

    async deleteWeaponById(wepId: string) {
        const result = await this.weaponsModel.deleteOne({ _id: wepId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('weapon does not exist');
        }

    }

    private async findWeapon(wepId: string): Promise<Weapon> {
        let wep;
        try {
            wep = await this.weaponsModel.findById(wepId)

        } catch (error) {
            throw new NotFoundException('weapon does not exist');

        }
        if (!wep) {
            throw new NotFoundException('weapon does not exist');
        }
        return wep;
    }
}