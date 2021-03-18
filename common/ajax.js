//封装Ajax
function myAjax(opt) {
  opt = opt || {};
  opt.method = opt.method || 'GET';
  opt.url = opt.url || '';
  opt.async = opt.async || true;
  opt.data = opt.data || null;
  opt.dataType = opt.dataType || 'JSON';
  opt.success = opt.success || function () { };

  let xmlHttp = null;
  xmlHttp = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

  let params = [];
  for (let key in opt.data) {
    params.push(key + '=' + opt.data[key]);
  }

  let postData = params.join('&');
  if (opt.dataType === 'JSONP') {
    creatScript(opt.url, postData);
  }
  if (opt.method.toUpperCase() === 'POST') {
    xmlHttp.open(opt.method, opt.url, opt.async);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
  }
  if (opt.method.toUpperCase() === 'GET') {
    xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
    xmlHttp.send(null);
  }

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      if (opt.dataType === 'JSON') {
        opt.success(xmlHttp.response);
      }
    }
  }
}

function creatScript(url, data) {
  let oScript = document.createElement(script);
  oScript.src = url + '?' + data + '&callback=getEn';
  document.body.appendChild(oScript);
}