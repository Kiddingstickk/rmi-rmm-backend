import Filter from 'bad-words';

const filter = new Filter();

export function cleanProfanity(text) {
  return filter.clean(text);
}

export function isProfane(text) {
  return filter.isProfane(text);
}
