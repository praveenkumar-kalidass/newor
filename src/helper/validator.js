const validator = (schema, state, initialState, isSubmit = false) => {
  const { error } = schema.validate(state, { abortEarly: false });
  if (error?.details) {
    return error.details.reduce((result, item) => {
      if (isSubmit || state[item.context.key]) {
        return {
          ...result,
          [item.context.key]: item.message,
        };
      }
      return {
        ...result,
        [item.context.key]: '',
      };
    }, initialState);
  }
  return {
    ...initialState,
  };
};

export default validator;
