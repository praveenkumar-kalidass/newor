import Joi from 'joi';

export const SCHEMA = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required(),
});

export const INITIAL_STATE = {
  email: '',
};

export const FIELDS = [
  {
    key: 'email',
    placeholder: 'EMAIL',
  },
];
