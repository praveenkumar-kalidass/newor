import Joi from 'joi';

export const SCHEMA = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  password: Joi.string().alphanum().min(6).max(15)
    .required(),
});

export const INITIAL_STATE = {
  email: '',
  password: '',
};

export const FIELDS = [
  {
    key: 'email',
    placeholder: 'EMAIL',
  },
  {
    key: 'password',
    placeholder: 'PASSWORD',
  },
];
