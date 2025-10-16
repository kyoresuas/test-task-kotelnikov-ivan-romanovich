import { AppFastifyRoute } from "@/types/shared";
import { getEventsHandler } from "@/handlers/client/events";
import { GetEventsType, getEventsSchema } from "@/schemas/client";

/**
 * Получить все события
 */
export const getEventsController: AppFastifyRoute<GetEventsType> = {
  url: "/events",
  method: "GET",
  schema: getEventsSchema,
  handler: getEventsHandler,
};
