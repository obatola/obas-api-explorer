export const apiMethods = [
  'get',
  'delete',
  'post',
  'put',
  // 'head',
  // 'options',
  // 'patch',
  // 'link',
  // 'unlink',
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
