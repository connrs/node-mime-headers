var NEWLINE = '\r\n';
var mimeHeader = require('./mime-header.js');

function MimeHeaders() {
  this._headers = [];
}

MimeHeaders.prototype.push = function (key, value) {
  this._headers.push(mimeHeader(key, value));
};

MimeHeaders.prototype.toString = function () {
  return this._headers.reduce(this._reduceHeaders.bind(this), '') + NEWLINE;
};

MimeHeaders.prototype._reduceHeaders = function (memo, header) {
  return memo + header.toString() + NEWLINE;
};

function mimeHeaders() {
  var headers = new MimeHeaders();

  return headers;
}

module.exports = mimeHeaders;
