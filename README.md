#MIME Headers

[![Travis CI Test Status](https://travis-ci.org/connrs/node-mime-headers.png)](https://travis-ci.org/connrs/node-mime-headers)

Build a MIME headers object for emails that will output as a string. Headers will be Base64 encoded when necessary.

    npm install mime-headers

To use:

    var headers = require('mime-headers')();
    headers.push('Content-Type: text/plain');
    headers.push('Content-Transfer-Encoding: quoted-printable');
    headers.toString();

    // Content-Type: text/plain
    // Content-Transfer-Encoding: quoted-printable
    //

## Extending encoded words

Non-ASCII text is automatically encoded as [encoded words](http://tools.ietf.org/html/rfc2047) using B-encoding. I didn't have a specific need to provide Q-encoding but I welcome tests & patches to enable it. In particular, I would welcome using lib/mime-encode.js as the API and making 2 modules: b-mime-encode and q-mime-encode.
