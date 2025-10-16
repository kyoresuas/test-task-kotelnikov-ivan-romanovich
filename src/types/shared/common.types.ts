import { Types } from "mongoose";
import { FastifyRoutes } from "./fastify.types";

export type ArgumentsType<F extends () => any> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export type Primitive<T> = {
  [k in keyof T]: T[k] extends
    | bigint
    | Date
    | Types.ObjectId
    | (bigint | null)
    | (Date | null)
    | (Types.ObjectId | null)
    | (bigint | undefined)
    | (Date | undefined)
    | (Types.ObjectId | undefined)
    ? never
    : T[k] extends object | (object | null) | (object | undefined)
    ? Primitive<T[k]>
    : T[k];
};

export enum CustomFormat {
  UUID = "uuid",
  MONGOOSE_ID = "objectId",
  DATE_TIME = "dateTime",
}

export type Module = "fastify";

export interface IAppConfig {
  ENV: "development" | "preproduction" | "production";
  ENABLED_MODULES: Module[];
  ENABLED_FASTIFY_ROUTES: {
    [x in FastifyRoutes]?: {
      host: string;
      port: number;
    };
  };
  ENABLED_TASKS: string[];
  BCRYPT_ROUNDS_COUNT: number;
  JWT_SECRET_KEY?: string;
  POSTGRESQL_URL?: string;
}

export interface IPagination {
  skip: number;
  limit: number;
}
