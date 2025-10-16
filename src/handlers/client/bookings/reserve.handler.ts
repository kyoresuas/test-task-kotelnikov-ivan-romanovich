import { di } from "@/config/DIContainer";
import { primitive } from "@/utils/primitive";
import { AppFastifyHandler } from "@/types/shared";
import { BookingsService } from "@/services/bookings";
import { ReserveBookingType } from "@/schemas/client";

export const reserveBookingHandler: AppFastifyHandler<
  ReserveBookingType
> = async (req, reply) => {
  const bookingsService = di.container.resolve<BookingsService>(
    BookingsService.key
  );

  const userId = req.session!.userId;
  const eventId = req.body.eventId;

  const booking = await bookingsService.reserve({
    userId,
    eventId,
  });

  reply.code(201).send({
    message: req.i18n.t("swagger.messages.SAVED"),
    ...primitive(booking),
  });
};
