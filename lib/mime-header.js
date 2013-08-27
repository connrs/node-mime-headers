var SEPARATOR = ': ';
var semiColonSpace = /; /;
var commaSpace = /, /;
var multipleSpaces = / +/;
var mimeEncode = require('./mime-encode.js');
var encodableCharacters = /[^\x20-\x7E]/;

function MimeHeader() {}

MimeHeader.prototype.setKey = function (key) {
  this._key = key;
};

MimeHeader.prototype.setValue = function (value) {
  this._value = value;
};

MimeHeader.prototype.toString = function () {
  var headers;

  if (this._hasEncodableCharacters()) {
    headers = this._mimeEncodeHeaderString();
  }
  else {
    headers = this._buildStandardHeaderString();
  }

  return headers;
};

MimeHeader.prototype._hasEncodableCharacters = function () {
  return encodableCharacters.test(this._value);
};

MimeHeader.prototype._mimeEncodeHeaderString = function () {
  return this._fieldToString() + mimeEncode(this._value, this._mimeEncodeInitialOffset());
};

MimeHeader.prototype._fieldToString = function () {
  return this._key + SEPARATOR;
};

MimeHeader.prototype._mimeEncodeInitialOffset = function () {
  return this._fieldToString().length;
};

MimeHeader.prototype._buildStandardHeaderString = function () {
  return this._splitLines(this._fieldToString() + this._value);
};

MimeHeader.prototype._splitLines = function (line) {
  if (!this._textTooLong(line)) {
    return line;
  }

  return this._splitLine(line);
};

MimeHeader.prototype._splitLine = function (line) {
  if (semiColonSpace.test(line)) {
    line = this._splitLineBySemicolon(line);
  }
  else if (commaSpace.test(line)) {
    line = this._splitLineByComma(line);
  }
  else {
    line = this._splitLineBySpace(line);
  }

  return line;
};

MimeHeader.prototype._textTooLong = function (text) {
  return text.length > 76;
};

MimeHeader.prototype._splitLineBySemicolon = function (line) {
  return this._firstPartSemicolonSplit(line) + ';\r\n ' + this._splitLines(this._secondPartSemicolonSplit(line));
};

MimeHeader.prototype._firstPartSemicolonSplit = function (text) {
  return text.substr(0, text.indexOf('; '));
};

MimeHeader.prototype._secondPartSemicolonSplit = function (text) {
  return text.substr(text.indexOf('; ') + 2);
};

MimeHeader.prototype._splitLineByComma = function (line) {
  return this._firstPartCommaSplit(line) + ',\r\n ' + this._splitLines(this._secondPartCommaSplit(line));
};

MimeHeader.prototype._firstPartCommaSplit = function (text) {
  return text.substr(0, text.indexOf(', '));
};

MimeHeader.prototype._secondPartCommaSplit = function (text) {
  return text.substr(text.indexOf(', ') + 2);
};

MimeHeader.prototype._splitLineBySpace = function (line) {
  return this._firstPartSpaceSplit(line) + '\r\n ' + this._splitLines(this._secondPartSpaceSplit(line));
};

MimeHeader.prototype._firstPartSpaceSplit = function (text) {
  return text.split(' ').slice(0, 2).join(' ');
};

MimeHeader.prototype._secondPartSpaceSplit = function (text) {
  return text.split(' ').slice(2).join(' ');
};

function mimeHeader(key, value) {
  var header = new MimeHeader();

  header.setKey(key);
  header.setValue(value);

  return header;
}

module.exports = mimeHeader;
