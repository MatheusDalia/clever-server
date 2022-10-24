import Joi from 'joi';

export const UserType = Joi.object({
  name: Joi.string().required(),
  birth_date: Joi.date().required(),
});
