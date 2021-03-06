import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
});
