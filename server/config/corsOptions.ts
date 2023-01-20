const allowesOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if(allowesOrigins.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;