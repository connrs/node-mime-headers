var test = require('tape');
var mimeEncode = require('../lib/mime-encode.js');

test('Single ASCII character encoded', function (t) {
  t.equal(mimeEncode('e'), '=?UTF-8?B?ZQ==?=');
  t.end();
});

test('Single non-ASCII character encoded', function (t) {
  t.equal(mimeEncode('é'), '=?UTF-8?B?w6k=?=');
  t.end();
});

test('Two non-ASCII characters encoded', function (t) {
  t.equal(mimeEncode('éé'), '=?UTF-8?B?w6nDqQ==?=');
  t.end();
});

test('Two non-ASCII characters separated by a space', function (t) {
  t.equal(mimeEncode('é é'), '=?UTF-8?B?w6kgw6k=?=');
  t.end();
});

test('Wrap line at 76 characters', function (t) {
  var input = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw';
  var output = '=?UTF-8?B?YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXphYmNkZWZnaGlqa2xtbm9wcXJzdHV2?=\r\n =?UTF-8?B?dw==?=';
  t.equal(mimeEncode(input), output);
  t.end();
});

test('Wrap line with initial offset', function (t) {
  var header = 'Subject: ';
  var input = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw';
  var output = header + '=?UTF-8?B?YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXphYmNkZWZnaGlqa2xt?=\r\n =?UTF-8?B?bm9wcXJzdHV2dw==?=';
  t.equal(header + mimeEncode(input, header.length), output);
  t.end();
});
