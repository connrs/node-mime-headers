/*jslint stupid: true */
var test = require('tape');
var mimeHeaders = require('../');

test('Create mimeHeaders', function (t) {
  mimeHeaders();
  t.end();
});

test('Add header', function (t) {
  var headers = mimeHeaders();
  headers.push('Content-Type', 'text/plain');
  t.end();
});

test('One header to string', function (t) {
  var headers = mimeHeaders();
  headers.push('Content-Type', 'text/plain');
  t.equal(headers.toString(), 'Content-Type: text/plain\r\n\r\n');
  t.end();
});

test('Two headers to string', function (t) {
  var headers = mimeHeaders();
  headers.push('Content-Type', 'text/html');
  headers.push('Content-Transfer-Encoding', 'quoted-printable');
  t.equal(headers.toString(), 'Content-Type: text/html\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n');
  t.end();
});

test('Wrap at semi-colon when line is over 76 characters', function (t) {
  var headers = mimeHeaders();
  headers.push('Content-Disposition', 'attachment; filename=012345678901234567890123456789012345678901234567890.eml');
  t.equal(headers.toString(), 'Content-Disposition: attachment;\r\n filename=012345678901234567890123456789012345678901234567890.eml\r\n\r\n');
  t.end();
});

test('Wrap twice at semi-colon', function (t) {
  var headers = mimeHeaders();
  headers.push('Content-Disposition', 'attachment; filename=012345678901234567890123456789012345678901234567890.eml; filename2=012345678901234567890123456789012345678901234567890.eml');
  t.equal(headers.toString(), 'Content-Disposition: attachment;\r\n filename=012345678901234567890123456789012345678901234567890.eml;\r\n filename2=012345678901234567890123456789012345678901234567890.eml\r\n\r\n');
  t.end();
});

test('Wrap at comma when line is over 76 characters', function (t) {
  var headers = mimeHeaders();
  headers.push('Content-Disposition', 'attachment, filename=012345678901234567890123456789012345678901234567890.eml');
  t.equal(headers.toString(), 'Content-Disposition: attachment,\r\n filename=012345678901234567890123456789012345678901234567890.eml\r\n\r\n');
  t.end();
});

test('Wrap at space when line is over 76 characters', function (t) {
  var headers = mimeHeaders();
  headers.push('Content-Disposition', 'attachment filename=012345678901234567890123456789012345678901234567890.eml');
  t.equal(headers.toString(), 'Content-Disposition: attachment\r\n filename=012345678901234567890123456789012345678901234567890.eml\r\n\r\n');
  t.end();
});

test('MIME encode header', function (t) {
  var headers = mimeHeaders();
  headers.push('Subject', 'Excellenté');
  t.equal(headers.toString(), 'Subject: =?UTF-8?B?RXhjZWxsZW50w6k=?=\r\n\r\n');
  t.end();
});
