var MAX_LINE_LENGTH = 76;
var NEXT_LINE_OFFSET = 1;
var ENCODE_HEADER = '=?UTF-8?B?';
var ENCODE_FOOTER = '?=';

function mimeEncode(text, initialOffset) {
  return joinLines(wrapLines(encodeCharacters(text), initialOffset || 0));
}

function encodeCharacters(text) {
  return textToBase64(text);
}

function textToBase64(text) {
  return (new Buffer(text)).toString('base64');
}

function wrapLines(text, offset) {
  var splitIndex = MAX_LINE_LENGTH - offset - (ENCODE_HEADER + ENCODE_FOOTER).length;

  if (text.length <= splitIndex) {
    return [ text ];
  }

  while (splitIndex % 4 !== 0) {
    splitIndex -= 4 - splitIndex % 4;
  }

  return [ text.substr(0, splitIndex) ].concat(wrapLines(text.substr(splitIndex), NEXT_LINE_OFFSET));
}

function joinLines(lines) {
  return ENCODE_HEADER + lines.join(ENCODE_FOOTER + '\r\n' + addNextLineOffset() + ENCODE_HEADER) + ENCODE_FOOTER;
}

function addNextLineOffset() {
  return new Array(NEXT_LINE_OFFSET + 1).join(' ');
}

module.exports = mimeEncode;
