import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { WeaponsController} from './weapons.controller';
import { WeaponsService } from './weapons.service';
import { WeaponSchema } from './weapons.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: WeaponSchema }])],
    controllers: [WeaponsController],
    providers: [WeaponsService],
})
export class WeaponsModule{}