const mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/SEROI';
// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MONGODB_CLOUD_URI;
// } else
// if (process.env.NODE_ENV === 'docker') {
//   dbURI = 'mongodb://dockercontainername/SEROI';
// }
mongoose.connect(dbURI, {
  useNewUrlParser: true,

  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose je povezan na ${dbURI}.`);
});

mongoose.connection.on('error', (napaka) => {
  console.log('Mongoose napaka pri povezavi: ', napaka);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose ni povezan.');
});

const pravilnaZaustavitev = (sporocilo, povratniKlic) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose je zaprl povezavo preko '${sporocilo}'`);
    povratniKlic();
  });
};

// Ponovni zagon nodemon
process.once('SIGUSR2', () => {
  pravilnaZaustavitev('nodemon ponovni zagon', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Izhod iz aplikacije
process.on('SIGINT', () => {
  pravilnaZaustavitev('izhod iz aplikacije', () => {
    process.exit(0);
  });
});

// Izhod iz aplikacije na Heroku
process.on('SIGTERM', () => {
  pravilnaZaustavitev('izhod iz aplikacije na Heroku', () => {
    process.exit(0);
  });
});

//dodaj vse modele
require('./models/outputProxy');
require('./models/programs');
require('./models/projects');
require('./models/stakeholders');
