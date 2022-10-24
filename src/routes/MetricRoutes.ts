import { Router } from 'express';
import { MetricController } from '../controllers';

const metricRouter = Router();

metricRouter.route('/')
  .post(
    MetricController.create,
  );

metricRouter.route('/:metricId')
  .get(
    MetricController.read,
  );

metricRouter.route('/:metricId')
  .delete(
    MetricController.read,
    MetricController.delete,
  );
metricRouter.route('/:metricId')
  .patch(
    MetricController.read,
    MetricController.update,
  );

export default metricRouter;
