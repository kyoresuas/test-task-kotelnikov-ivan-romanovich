import i18next from "i18next";
import { SwaggerContract } from "@/contracts/swagger";
import { timestampsSample } from "@/schemas/common.schemas";
import { AppFastifySchema, CustomFormat } from "@/types/shared";

export const createEventSchema = {
  tags: [SwaggerContract.AdminTag.EVENTS],
  summary: "Создать событие",
  security: [{ Bearer: [] }],
  body: {
    type: "object",
    required: ["name", "totalSeats"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        description: "Название события",
        example: "Meetup",
      },
      totalSeats: {
        type: "integer",
        minimum: 0,
        description: "Всего мест",
        example: 100,
      },
    },
  },
  response: {
    201: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["message", "event"],
      properties: {
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: i18next.t("swagger.messages.SAVED"),
        },
        event: {
          type: "object",
          required: ["id", "name", "totalSeats", "createdAt", "updatedAt"],
          properties: {
            id: {
              type: "string",
              format: CustomFormat.UUID,
              description: "ID события",
              example: SwaggerContract.UUIDExample,
            },
            name: {
              type: "string",
              description: "Название события",
              example: "Meetup",
            },
            totalSeats: {
              type: "integer",
              description: "Всего мест",
              example: 100,
            },
            ...timestampsSample,
          },
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    401: SwaggerContract.ClientErrorResponseFactory(401),
    403: SwaggerContract.ClientErrorResponseFactory(403),
  },
} as const satisfies AppFastifySchema;

export type CreateEventType = typeof createEventSchema;
