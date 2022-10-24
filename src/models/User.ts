import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';

import Metric from './Metric';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

  @Column('text')
    name: string | undefined;

  @Column('date')
    birth_date: Date | undefined;

  @OneToMany(() => Metric, (metric) => metric.user)
    metric: Metric[] | undefined;
}
