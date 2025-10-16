import { UserRole } from "@/entities/user";
import { AppFastifyRoute } from "@/types/shared";
import { createEventHandler } from "@/handlers/admin";
import { verifyPreHandler } from "@/middleware/verify";
import { CreateEventType, createEventSchema } from "@/schemas/admin";

export const createEventController: AppFastifyRoute<CreateEventType> = {
  url: "/events",
  method: "POST",
  schema: createEventSchema,
  preHandler: verifyPreHandler([UserRole.ADMINISTRATOR]),
  handler: createEventHandler,
};
