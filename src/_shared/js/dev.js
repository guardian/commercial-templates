// necessary when running multiple local services and making CORS requests
export function portify(host, target = '9000') {
  return host.replace('7000', target);
}
