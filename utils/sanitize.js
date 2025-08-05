import sanitizeHtml from 'sanitize-html';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { cleanProfanity } = require('./profanity.cjs');

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

  return cleanProfanity(cleanHtml);
};