import Joi from 'joi';

export const MetricType = Joi.object({
  bpm: Joi.number().required(),
  pa: Joi.number().required(),
  metric_date: Joi.date().required(),
  metric_hour: Joi.number().required(),
  userId: Joi.string().required(),
});
