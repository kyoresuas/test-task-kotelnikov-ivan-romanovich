import { di } from "@/config/DIContainer";
import { primitive } from "@/utils/primitive";
import { EventsService } from "@/services/events";
import { CreateEventType } from "@/schemas/admin";
import { AppFastifyHandler } from "@/types/shared";

export const createEventHandler: AppFastifyHandler<CreateEventType> = async (
  req,
  reply
) => {
  const eventsService = di.container.resolve<EventsService>(EventsService.key);

  const event = await eventsService.createEvent(req.body);

  reply.code(201).send({
    message: req.i18n.t("swagger.messages.SAVED"),
    event: primitive(event),
  });
};
