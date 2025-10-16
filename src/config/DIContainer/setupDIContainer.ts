import { di } from "./awilixManager";
import { Event } from "@/entities/event";
import { asClass, asValue } from "awilix";
import { Booking } from "@/entities/booking";
import { appLogger } from "../winstonLogger";
import { AuthService } from "@/services/auth";
import { CronService } from "@/services/cron";
import { UserService } from "@/services/user";
import { Session, User } from "@/entities/user";
import { EventsService } from "@/services/events";
import appDataSource from "@/constants/appDataSource";
import { BookingsService } from "@/services/bookings";

/**
 * Внедрить зависимости в DI-контейнер
 */
export const setupDIContainer = (): void => {
  appLogger.info("Внедрение зависимостей...");

  // Таблицы операционной базы данных
  const userRepository = appDataSource.getRepository(User);
  const eventRepository = appDataSource.getRepository(Event);
  const sessionRepository = appDataSource.getRepository(Session);
  const bookingRepository = appDataSource.getRepository(Booking);

  di.container.register({
    userRepository: asValue(userRepository),
    eventRepository: asValue(eventRepository),
    sessionRepository: asValue(sessionRepository),
    bookingRepository: asValue(bookingRepository),

    [CronService.key]: asClass(CronService).singleton(),
    [AuthService.key]: asClass(AuthService).singleton(),
    [UserService.key]: asClass(UserService).singleton(),
    [EventsService.key]: asClass(EventsService).singleton(),
    [BookingsService.key]: asClass(BookingsService).singleton(),
  });

  appLogger.verbose("Зависимости внедрены");
};
