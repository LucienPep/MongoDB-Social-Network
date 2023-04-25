const { connect, connection } = require('mongoose');

//Connect function used my mongoose to run Local server
connect('mongodb://localhost/commentExample', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
