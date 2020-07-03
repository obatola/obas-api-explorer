export const apiMethods = [
  'GET',
  'DELETE',
  'POST',
  'PUT',
  // 'HEAD',
  // 'OPTIONS',
  // 'PATCH',
  // 'LINK',
  // 'UNLINK',
];

interface ContentTypeMapType {
  [key: string]: string;
}

export const contentTypeMap: ContentTypeMapType = {
  text: 'text/plain',
  javascript: 'application/javascript',
  json: 'application/json',
  html: 'text/html',
  xml: 'application/xml',
};
