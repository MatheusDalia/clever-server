import {
  Request, Response, NextFunction,
} from 'express';
import { getCustomRepository } from 'typeorm';
import { MetricRepository } from '../repositories';
import { MetricType } from '../DTOs';

class MetricController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      const {
        bpm,
        pa,
        metric_date,
        metric_hour,
        userId,
      } = req.body;

      const metricRepository = getCustomRepository(MetricRepository);

      const metricData = {
        bpm,
        pa,
        metric_date,
        metric_hour,
        userId,
      };

      const { error } = MetricType.validate(metricData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const metricProd = await metricRepository.save(metricData, user);

      res.locals = {
        status: 201,
        message: 'Metric created',
        data: { metricProd },

      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { metricId } = req.params;

      const metricRepository = getCustomRepository(MetricRepository);
      const metric = await metricRepository.findById(metricId);

      if (!metric) {
        return next({
          status: 404,
          message: 'Metric not found',
        });
      }

      if (metric === 'ERROR') {
        return next({
          status: 400,
          message: 'Incorrect parameters',
        });
      }

      res.locals = {
        status: 200,
        data: metric,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { metricId } = req.params;
      const metricData = req.body;

      const { error } = MetricType.validate(metricData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const metricRepository = getCustomRepository(MetricRepository);
      const updatedMetric = await metricRepository.patch(metricId, metricData);

      res.locals = {
        status: 200,
        message: 'Metric updated',
        data: updatedMetric,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { metricId } = req.params;

      const metricRepository = getCustomRepository(MetricRepository);
      await metricRepository.delete(metricId);

      const metric = metricRepository.findById(metricId);

      res.locals = {
        status: 200,
        message: 'Metric deleted',
        data: metric,
      };

      return next();
    } catch (error) {
      return next({
        status: 400,
        message: error.details,
      });
    }
  }
}

export default new MetricController();
