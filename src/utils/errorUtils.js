const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
  let message = '';

  if (err instanceof mongoose.MongooseError) {
    message = Object.values(err.errors).at(0).message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return message;
};

// middleware factory
exports.validate = (Model) => async (req, res, next) => {
  try {
    const modelInstance = new Model(req.body);

    await modelInstance.validate(); // If invalid, it will throw an error

    next();

    // const isValid = await modelInstance.validate();

    // if (!isValid) {
    //     return res.redirect('/404');
    // }

    // next();
  } catch (err) {
    // todo: Its too disruptive
    const message = this.getErrorMessage(err);

    res.render('auth/register', { ...req.body, error: message });
  }
};
