import Joi from 'joi';

import TRANSLATION from '../../translation/en.json';

export const SCHEMA = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).label(TRANSLATION.EMAIL),
  password: Joi.string().alphanum().min(6).max(15)
    .required()
    .label(TRANSLATION.PASSWORD),
});

export const INITIAL_STATE = {
  email: '',
  password: '',
};

export const FIELDS = [
  {
    key: 'email',
    placeholder: TRANSLATION.EMAIL,
  },
  {
    key: 'password',
    placeholder: TRANSLATION.PASSWORD,
  },
];
