import { EntityRepository, Repository } from 'typeorm';
import { Metric } from '../models';

@EntityRepository(Metric)
export default class MetricRepository extends Repository<Metric> {
  public async findById(id: string): Promise<Metric | false | string> {
    try {
      const metric = await this.findOne(id);

      if (!metric) {
        return false;
      }

      return metric;
    } catch (error) {
      return error.severity || error;
    }
  }

  public async patch(
    id: string,
    metricData: any,
  ): Promise<Metric | string> {
    try {
      await this.update(id, metricData);
      const UpdatedMetric = await this.findOne(id);

      return UpdatedMetric;
    } catch (error) {
      return error;
    }
  }
}
