import { Event } from "@/entities/event";
import { Booking } from "@/entities/booking";
import { Session, User } from "@/entities/user";

/**
 * Сущности операционной базы данных
 */
const entities = [User, Session, Event, Booking];

export default entities;
