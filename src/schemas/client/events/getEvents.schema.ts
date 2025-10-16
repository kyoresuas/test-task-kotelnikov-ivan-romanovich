import { SwaggerContract } from "@/contracts/swagger";
import { timestampsSample } from "@/schemas/common.schemas";
import { AppFastifySchema, CustomFormat } from "@/types/shared";

export const getEventsSchema = {
  tags: [SwaggerContract.ClientTag.EVENTS],
  summary: "Получить все события",
  security: [{ Bearer: [] }],
  querystring: {
    type: "object",
    properties: {
      ...SwaggerContract.EnablePaginationSchema.properties,
    },
  },
  response: {
    200: {
      type: "object",
      required: ["totalSize", "items"],
      description: SwaggerContract.PaginatedResponseSchema.description,
      properties: {
        totalSize: {
          type: "integer",
          description: "Количество всех элементов",
          example: 10,
        },
        items: {
          type: "array",
          description: "Список событий",
          items: {
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
      },
    },
    401: SwaggerContract.ClientErrorResponseFactory(401),
  },
} as const satisfies AppFastifySchema;

export type GetEventsType = typeof getEventsSchema;
