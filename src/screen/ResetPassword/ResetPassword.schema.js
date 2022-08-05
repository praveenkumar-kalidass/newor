import Joi from 'joi';

export const SCHEMA = Joi.object({
  password: Joi.string().alphanum().min(6).max(15)
    .required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
});

export const INITIAL_STATE = {
  password: '',
  confirmPassword: '',
};

export const FIELDS = [
  {
    key: 'password',
    placeholder: 'PASSWORD',
  },
  {
    key: 'confirmPassword',
    placeholder: 'CONFIRM_PASSWORD',
  },
];
