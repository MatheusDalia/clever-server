import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';

import User from './User';

@Entity()
export default class Metric {
  @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

  @Column('int')
    bpm: number | undefined;

  @Column('int')
    pa: number | undefined;

  @Column('date')
    metric_date: Date | undefined;

  @Column('int')
    metric_hour:number | undefined;

  @ManyToOne(() => User, (user) => user.metric)
    user: User | undefined;
}
