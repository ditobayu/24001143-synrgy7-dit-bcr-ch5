import { Model, ModelObject } from "objection";
import { OrdersModel } from "./order";

export class CarsModel extends Model {
  id!: number;
  name!: string;
  category!: string;
  price!: number;
  color!: string;
  year!: number;
  image!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "cars";
  }
  static get relationMappings() {
    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: OrdersModel,
        join: {
          from: "orders.car_id",
          to: "cars.id",
        },
      },
    };
  }
}

export type Articles = ModelObject<CarsModel>;
