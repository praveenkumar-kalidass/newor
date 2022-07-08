import Joi from 'joi';

import TRANSLATION from '../../translation/en.json';

export const SCHEMA = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(25)
    .required(),
  lastName: Joi.string().alphanum().min(3).max(25)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  password: Joi.string().alphanum().min(6).max(15)
    .required(),
});

export const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const FIELDS = [
  {
    key: 'firstName',
    placeholder: TRANSLATION.FIRST_NAME,
  },
  {
    key: 'lastName',
    placeholder: TRANSLATION.LAST_NAME,
  },
  {
    key: 'email',
    placeholder: TRANSLATION.EMAIL,
  },
  {
    key: 'password',
    placeholder: TRANSLATION.PASSWORD,
  },
];
