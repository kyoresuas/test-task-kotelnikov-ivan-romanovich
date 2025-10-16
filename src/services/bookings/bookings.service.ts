import { Repository } from "typeorm";
import { Event } from "@/entities/event";
import { APIError } from "@/utils/APIError";
import { Booking } from "@/entities/booking";

/**
 * Сервис для управления бронированиями
 */
export class BookingsService {
  static key = "bookingsService";

  constructor(
    private eventRepository: Repository<Event>,
    private bookingRepository: Repository<Booking>
  ) {}

  /**
   * Забронировать место на событие
   */
  async reserve({ eventId, userId }: { eventId: string; userId: string }) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new APIError(404);
    }

    const existing = await this.bookingRepository.findOne({
      where: { eventId, userId },
    });

    if (existing) {
      throw new APIError(409);
    }

    const currentBookingsCount = await this.bookingRepository.count({
      where: { eventId },
    });

    if (currentBookingsCount >= event.totalSeats) {
      throw new APIError(409);
    }

    const booking = await this.bookingRepository.save(
      this.bookingRepository.create({ eventId, userId })
    );

    return {
      id: booking.id,
      eventId: booking.eventId,
      userId: booking.userId,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  }
}
