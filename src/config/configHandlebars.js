const handlebars = require('express-handlebars');
const path = require('path');
const Handlebars = require('handlebars'); // Import the core Handlebars module for custom helper registration

function configHandlebars(app) {
  // Set up the Handlebars engine with the .hbs extension
  app.engine(
    'hbs',
    handlebars.engine({
      extname: 'hbs',
    })
  );

  // Set the view engine to Handlebars
  app.set('view engine', 'hbs');
  app.set('views', path.resolve('src/views'));

  // Register custom Handlebars helpers
  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '>':
        return v1.length > v2 ? options.fn(this) : options.inverse(this);
      case '==':
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case '<':
        return v1.length < v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  Handlebars.registerHelper('shorten', function (str, len) {
    if (str.length > len) {
      return str.substring(0, len) + '...';
    }
    return str;
  });

  return app;
}

module.exports = configHandlebars;
