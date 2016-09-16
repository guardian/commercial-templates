export function ajaxCall(url, data) {
  return new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send(data);

    req.onload = () => {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };

    req.onerror = () => reject(new Error("Network error"));
    req.send(data);
  });
}
