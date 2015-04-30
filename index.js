var rabbitStats = require('./lib/rabbitStats')('http://localhost:15672/api/', 'guest', 'guest');

//rabbitStats.getNodes().then(console.log).catch(console.error);
//rabbitStats.getNode('rabbit@localhost').then(console.log).catch(console.error);
rabbitStats.getOverview().then(console.log).catch(console.error);
