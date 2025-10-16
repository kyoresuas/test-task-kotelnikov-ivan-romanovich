import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user";
import { Event } from "../event";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Событие бронирования
   */
  @ManyToOne(() => Event, (event) => event.bookings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  event!: Event;

  /**
   * Ссылка на событие
   */
  @Column()
  eventId!: string;

  /**
   * Пользователь, сделавший бронирование
   */
  @ManyToOne(() => User, (user) => user.bookings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user!: User;

  /**
   * Ссылка на пользователя
   */
  @Column()
  userId!: string;

  /**
   * Время создания бронирования
   */
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
