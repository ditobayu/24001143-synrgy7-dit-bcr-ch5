import { Model, ModelObject } from "objection";
import { CarsModel } from "./car";
import { UsersModel } from "./users";

export class OrdersModel extends Model {
  id!: number;
  user_id!: number;
  car_id!: number;
  price!: number;
  status!: string;
  start_rent!: Date;
  finish_rent!: Date;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "orders";
  }

  static get relationMappings() {
    return {
      cars: {
        relation: Model.BelongsToOneRelation,
        modelClass: CarsModel,
        join: {
          from: "cars.user_id",
          to: "orders.id",
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: "users.user_id",
          to: "orders.id",
        },
      },
    };
  }
}

export type Articles = ModelObject<OrdersModel>;
