import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "@/entities/booking";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Название события
   */
  @Column()
  name!: string;

  /**
   * Общее количество мест
   */
  @Column({ type: "integer", default: 0 })
  totalSeats!: number;

  /**
   * Бронирования данного события
   */
  @OneToMany(() => Booking, (booking) => booking.event)
  bookings!: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
