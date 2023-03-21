function reformatError(errObj) {
  const errorsList = errObj.details.map((item) => [item.path[0], item.message]);
  return {
    success: false,
    msg: 'Input errors occured',
    errors: errorsList,
  };
}

module.exports = {
  reformatError,
};
