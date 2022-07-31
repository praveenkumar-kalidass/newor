import Joi from 'joi';

export const SCHEMA = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(25)
    .required(),
  lastName: Joi.string().alphanum().min(3).max(25)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  password: Joi.string().alphanum().min(6).max(15)
    .required(),
  mobileNumber: Joi.string().pattern(/^[0-9]+$/, 'numbers').length(10)
    .required(),
});

export const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  password: '',
};

export const FIELDS = [
  {
    key: 'firstName',
    placeholder: 'FIRST_NAME',
  },
  {
    key: 'lastName',
    placeholder: 'LAST_NAME',
  },
  {
    key: 'email',
    placeholder: 'EMAIL',
  },
  {
    key: 'mobileNumber',
    placeholder: 'MOBILE_NUMBER',
  },
  {
    key: 'password',
    placeholder: 'PASSWORD',
  },
];
