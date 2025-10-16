import { Repository } from "typeorm";
import { Event } from "@/entities/event";
import { IPagination } from "@/types/shared";

export class EventsService {
  static key = "eventsService";

  constructor(private eventRepository: Repository<Event>) {}

  /**
   * Получить все события
   */
  async getEvents({ pagination }: { pagination: IPagination }): Promise<{
    totalSize: number;
    items: Event[];
  }> {
    const [items, totalSize] = await this.eventRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.limit,
      order: { createdAt: "DESC" },
    });

    return { totalSize, items };
  }

  /**
   * Создать событие
   */
  async createEvent({
    name,
    totalSeats,
  }: {
    name: string;
    totalSeats: number;
  }): Promise<Event> {
    const event = await this.eventRepository.save(
      this.eventRepository.create({ name, totalSeats })
    );

    return event;
  }
}
