import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';

import User from './User';

@Entity()
export default class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bpm: number;

  @Column('date')
  metric_date: Date;

  @Column()
  metric_hour:number;

  @ManyToOne(() => User, (user) => user.metric)
  user: User;
}
