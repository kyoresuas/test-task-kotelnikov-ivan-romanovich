import { AppFastifyRoute } from "@/types/shared";
import { authPreHandler } from "@/middleware/auth";
import { reserveBookingHandler } from "@/handlers/client";
import { ReserveBookingType, reserveBookingSchema } from "@/schemas/client";

/**
 * Забронировать место на событие
 */
export const reserveBookingController: AppFastifyRoute<ReserveBookingType> = {
  url: "/bookings/reserve",
  method: "POST",
  schema: reserveBookingSchema,
  preHandler: authPreHandler(),
  handler: reserveBookingHandler,
};
