import i18next from "i18next";
import { SwaggerContract } from "@/contracts/swagger";
import { timestampsSample } from "@/schemas/common.schemas";
import { AppFastifySchema, CustomFormat } from "@/types/shared";

export const reserveBookingSchema = {
  tags: [SwaggerContract.ClientTag.BOOKINGS],
  summary: "Забронировать место на мероприятие",
  security: [{ Bearer: [] }],
  body: {
    type: "object",
    required: ["eventId"],
    properties: {
      eventId: {
        type: "string",
        format: CustomFormat.UUID,
        description: "ID события",
        example: SwaggerContract.UUIDExample,
      },
    },
  },
  response: {
    201: {
      type: "object",
      required: [
        "message",
        "id",
        "eventId",
        "userId",
        "createdAt",
        "updatedAt",
      ],
      description: SwaggerContract.ActionResponseSchema.description,
      properties: {
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: i18next.t("swagger.messages.SAVED"),
        },
        id: {
          type: "string",
          format: CustomFormat.UUID,
          description: "ID бронирования",
          example: SwaggerContract.UUIDExample,
        },
        eventId: {
          type: "string",
          format: CustomFormat.UUID,
          description: "ID события",
          example: SwaggerContract.UUIDExample,
        },
        userId: {
          type: "string",
          format: CustomFormat.UUID,
          description: "ID пользователя",
          example: SwaggerContract.UUIDExample,
        },
        ...timestampsSample,
      },
    },
    400: SwaggerContract.ClientErrorResponseFactory(400),
    401: SwaggerContract.ClientErrorResponseFactory(401),
    409: SwaggerContract.ClientErrorResponseFactory(409),
  },
} as const satisfies AppFastifySchema;

export type ReserveBookingType = typeof reserveBookingSchema;
