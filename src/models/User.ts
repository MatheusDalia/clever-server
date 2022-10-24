import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';

import Metric from './Metric';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('date')
  birth_date: Date;

  @Column('uuid', { unique: true })
  metricId: string;

  @OneToMany(() => Metric, (metric) => metric.user)
   metric: Metric[];
}
