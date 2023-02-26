import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { WeaponsService } from './weapons.service';

@Controller('weapons')
export class WeaponsController {
    constructor(private readonly wepsService: WeaponsService) { }
    
    @Get()
    async getAllWeapons() {
        const weps = await this.wepsService.getAllWeapons();
        return weps;
    }

    @Post()
    async addWeapon(
        @Body('name') wepName: string, 
        @Body('user') wepUser: string,
        @Body('backstory') wepBackstory: string, 
        @Body('img') wepImg: string,
        ) {

        const generatedId = await this.wepsService.insertWeapons(wepName, wepUser, wepBackstory, wepImg);
        return { id: generatedId };
    }

    @Get(':id')
    async getWeaponById(@Param('id') wepId: string,) {
        const weps  = await this.wepsService.getWeaponById(wepId);
        return weps;
    }

    @Patch(':id')
    async updateWeaponById(
        @Param('id') wepId: string,
        @Body('name') wepName: string, 
        @Body('user') wepUser: string,
        @Body('backstory') wepBackstory: string, 
        @Body('img') wepImg: string,
    ) {
        await this.wepsService.updateWeaponById(wepId, wepName, wepUser, wepBackstory, wepImg);
        return null;
    }

    @Delete(':id')
    async deleteWeaponById(@Param('id') wepId: string,) {
        await this.wepsService.deleteWeaponById(wepId);
        return null;
    }

}
