import sanitizeHtml from 'sanitize-html';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Filter = require('./badWordsShim.cjs');

const filter = new Filter();

export const sanitizeText = (text) => {
  if (!text || typeof text !== 'string') return '';

  const cleanHtml = sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
    transformTags: {
      'script': () => ({ tagName: 'noscript' }),
    },
    textFilter: (input) => input.trim(),
  });

  const cleanText = filter.clean(cleanHtml);
  return cleanText;
};