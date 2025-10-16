import { di } from "@/config/DIContainer";
import { primitive } from "@/utils/primitive";
import { GetEventsType } from "@/schemas/client";
import { EventsService } from "@/services/events";
import { AppFastifyHandler } from "@/types/shared";

export const getEventsHandler: AppFastifyHandler<GetEventsType> = async (
  req,
  reply
) => {
  const eventsService = di.container.resolve<EventsService>(EventsService.key);

  const { totalSize, items } = await eventsService.getEvents({
    pagination: req.query,
  });

  reply.code(200).send({ totalSize, items: primitive(items) });
};
