import DOMPurify from 'dompurify';

export function createMarkup(htmlString) {
  return { __html: DOMPurify.sanitize(htmlString) };
};

export function slugifyDirector(name) {
  return name.split('(')[0].trim().split(' ').join('-')
}