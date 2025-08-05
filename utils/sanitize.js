import sanitizeHtml from 'sanitize-html';
import { cleanProfanity } from './profanity.js';

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
