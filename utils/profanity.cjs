const Filter = require('bad-words');
const filter = new Filter();

function cleanProfanity(text) {
  return filter.clean(text);
}

function isProfane(text) {
  return filter.isProfane(text);
}

module.exports = { cleanProfanity, isProfane };
