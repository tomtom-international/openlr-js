(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.OpenLR = {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var byteLength_1 = byteLength;
var toByteArray_1 = toByteArray;
var fromByteArray_1 = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount (b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr((len * 3 / 4) - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

var base64Js = {
	byteLength: byteLength_1,
	toByteArray: toByteArray_1,
	fromByteArray: fromByteArray_1
};

var read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
};

var write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

var ieee754 = {
	read: read,
	write: write
};

var buffer = createCommonjsModule(function (module, exports) {
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

var K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  );
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }};
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length);
  buf.__proto__ = Buffer.prototype;
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  });
}

Buffer.poolSize = 8192; // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
};

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype;
Buffer.__proto__ = Uint8Array;

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
};

function allocUnsafe (size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
};

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  var buf = createBuffer(length);

  var actual = buf.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(length);
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf;
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype;
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(len);

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len);
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
};

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0;
    if (isFinite(length)) {
      length = length >>> 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64Js.fromByteArray(buf)
  } else {
    return base64Js.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf = this.subarray(start, end);
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype;
  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = (value >>> 8);
  this[offset + 1] = (value & 0xff);
  return offset + 2
};

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset + 3] = (value >>> 24);
  this[offset + 2] = (value >>> 16);
  this[offset + 1] = (value >>> 8);
  this[offset] = (value & 0xff);
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset] = (value >>> 24);
  this[offset + 1] = (value >>> 16);
  this[offset + 2] = (value >>> 8);
  this[offset + 3] = (value & 0xff);
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = (value >>> 8);
  this[offset + 1] = (value & 0xff);
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  this[offset + 2] = (value >>> 16);
  this[offset + 3] = (value >>> 24);
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  this[offset] = (value >>> 24);
  this[offset + 1] = (value >>> 16);
  this[offset + 2] = (value >>> 8);
  this[offset + 3] = (value & 0xff);
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding);
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64Js.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}
});

var buffer_1 = buffer.Buffer;
var buffer_2 = buffer.SlowBuffer;
var buffer_3 = buffer.INSPECT_MAX_BYTES;
var buffer_4 = buffer.kMaxLength;

var LocationType_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var LocationType;
(function (LocationType) {
    /** Location is UNKNOWN. */
    LocationType[LocationType["UNKNOWN"] = 0] = "UNKNOWN";
    /** line location. */
    LocationType[LocationType["LINE_LOCATION"] = 1] = "LINE_LOCATION";
    /** simple geo coordinates */
    LocationType[LocationType["GEO_COORDINATES"] = 2] = "GEO_COORDINATES";
    /** point along a line */
    LocationType[LocationType["POINT_ALONG_LINE"] = 3] = "POINT_ALONG_LINE";
    /** point of interest with an access point along a line */
    LocationType[LocationType["POI_WITH_ACCESS_POINT"] = 4] = "POI_WITH_ACCESS_POINT";
    /** circle area location */
    LocationType[LocationType["CIRCLE"] = 5] = "CIRCLE";
    /** polygon area location */
    LocationType[LocationType["POLYGON"] = 6] = "POLYGON";
    /** closed line area location */
    LocationType[LocationType["CLOSED_LINE"] = 7] = "CLOSED_LINE";
    /** rectangular area location */
    LocationType[LocationType["RECTANGLE"] = 8] = "RECTANGLE";
    /** grid area location */
    LocationType[LocationType["GRID"] = 9] = "GRID";
})(LocationType = exports.LocationType || (exports.LocationType = {}));
exports.AREA_LOCATIONS = new Set([LocationType.CIRCLE, LocationType.POLYGON, LocationType.CLOSED_LINE, LocationType.RECTANGLE, LocationType.GRID]);
exports.POINTS_LOCATIONS = new Set([LocationType.GEO_COORDINATES, LocationType.POINT_ALONG_LINE, LocationType.POI_WITH_ACCESS_POINT]);

});

unwrapExports(LocationType_1);
var LocationType_2 = LocationType_1.LocationType;
var LocationType_3 = LocationType_1.AREA_LOCATIONS;
var LocationType_4 = LocationType_1.POINTS_LOCATIONS;

var BinaryConstants = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/** The data format IDENTIFIER. */
exports.IDENTIFIER = 'binary';
/** used for rounding */
exports.ROUND_FACTOR = 0.5;
/** The Constant BITS_PER_BYTE. */
exports.BITS_PER_BYTE = 8;
/** The Constant DECA_MICRO_DEG_FACTOR is used to transform degree values into deca-micro degrees. */
exports.DECA_MICRO_DEG_FACTOR = 100000.0;
/** The Constant BIT24FACTOR is used for the conversion of lat/lon coordinates into a 24bit accuracy. */
exports.BIT24FACTOR = 46603.377778;
/** The Constant BIT24FACTOR_REVERSED is used for the conversion of 24bit lat/lon values back into prior accuracy. */
exports.BIT24FACTOR_REVERSED = 1 / exports.BIT24FACTOR;
/** The BEARING_SECTOR defines the length of a bearing interval. */
exports.BEARING_SECTOR = 11.25;
/** The LENGTH_INTERVAL defines the length of a dnp and offset interval. */
exports.LENGTH_INTERVAL = 58.6;
/** The IS_POINT defines a point location reference. */
exports.IS_POINT = 1;
/** The IS_NOT_POINT indicates that the location reference is not a point location. */
exports.IS_NOT_POINT = 0;
// /** The IS_AREA defines an area location reference. */
// const IS_AREA = 1;
/** The AREA_CODE_CIRCLE defines the code for a cirle location reference. */
exports.AREA_CODE_CIRCLE = 0;
/** The AREA_CODE_RECTANGLE defines the code for a rectangle location reference. */
exports.AREA_CODE_RECTANGLE = 2;
/** The AREA_CODE_GRID defines the code for a grid location reference. */
exports.AREA_CODE_GRID = 2; // For BINARY_VERSION_3 the same as for AREA_CODE_RECTANGLE
/** The AREA_CODE_POLYGON defines the code for a polygon location reference. */
exports.AREA_CODE_POLYGON = 1;
/** The AREA_CODE_CLOSEDLINE defines the code for a closed line location reference. */
exports.AREA_CODE_CLOSEDLINE = 3;
/** The AREA_CODE_NOAREA defines the code for a non-area location reference. */
exports.IS_NOT_AREA = 0;
/** The HAS_ATTRIBUTES the existence of attribute information in the stream. */
exports.HAS_ATTRIBUTES = 1;
/** The Constant HAS_NO_ATTRIBUTES. */
exports.HAS_NO_ATTRIBUTES = 0;
/** The HEADER_SIZE defines the size [in bytes] of the header. */
exports.HEADER_SIZE = 1;
/** The FIRST_LRP_SIZE defines the size [in bytes] of the first location reference point. */
exports.FIRST_LRP_SIZE = 9;
/** The LRP_SIZE defines the size [in bytes] of an intermediate location reference point. */
exports.LRP_SIZE = 7;
/** The LAST_LRP_SIZE defines the size [in bytes] of the last location reference point. */
exports.LAST_LRP_SIZE = 6;
/** The Constant ABS_COORD_SIZE. */
exports.ABS_COORD_SIZE = 6;
/** The Constant RELATIVE_OFFSET_LENGTH. */
exports.RELATIVE_OFFSET_LENGTH = 0.390625;
/** The MIN_BYTES defines the minimum size [in bytes] of a binary location reference. */
exports.MIN_BYTES_LINE_LOCATION = exports.HEADER_SIZE + exports.FIRST_LRP_SIZE + exports.LAST_LRP_SIZE;
/** The MIN_BYTES defines the minimum size [in bytes] of a binary closed line location reference. */
exports.MIN_BYTES_CLOSED_LINE_LOCATION = exports.HEADER_SIZE + exports.FIRST_LRP_SIZE + 2;
/** The Constant GEOCOORD_SIZE. */
exports.GEOCOORD_SIZE = exports.HEADER_SIZE + exports.ABS_COORD_SIZE;
/** The Constant MIN_BYTES_POINT_LOCATION. */
exports.MIN_BYTES_POINT_LOCATION = exports.GEOCOORD_SIZE;
/** The Constant BINARY_VERSION_2. */
exports.BINARY_VERSION_2 = 2;
/** The Constant BINARY_VERSION_3. */
exports.BINARY_VERSION_3 = 3;
/** The LATEST_BINARY_VERSION defines the current version of the binary format. */
exports.LATEST_BINARY_VERSION = exports.BINARY_VERSION_3;
/** The HAS_OFFSET defines the existence of offset information. */
exports.HAS_OFFSET = 1;
/** The Constant OFFSET_BUCKETS. */
exports.OFFSET_BUCKETS = 256;
/** The Constant POINT_ALONG_LINE_SIZE. */
exports.POINT_ALONG_LINE_SIZE = exports.HEADER_SIZE + exports.FIRST_LRP_SIZE + exports.LAST_LRP_SIZE;
/** The Constant RELATIVE_COORD_SIZE. */
exports.RELATIVE_COORD_SIZE = 4;
/** number of bits used for a small radius */
exports.SMALL_RADIUS_BITS = 8;
/** number of bits used for a medium radius */
exports.MEDIUM_RADIUS_BITS = 16;
/** number of bits used for a large radius */
exports.LARGE_RADIUS_BITS = 24;
/** number of bits used for a small radius */
exports.EXTRA_LARGE_RADIUS_BITS = 32;
/** The Constant DIMENSION_SIZE. */
exports.DIMENSION_SIZE = 2;
/** The Constant RECTANGLE_SIZE. */
exports.RECTANGLE_SIZE = exports.HEADER_SIZE + exports.ABS_COORD_SIZE + exports.RELATIVE_COORD_SIZE;
/** The Constant LARGE_RECTANGLE_SIZE. */
exports.LARGE_RECTANGLE_SIZE = exports.HEADER_SIZE + exports.ABS_COORD_SIZE + exports.ABS_COORD_SIZE;
/** The Constant GRID_SIZE. */
exports.GRID_SIZE = exports.RECTANGLE_SIZE + 2 * exports.DIMENSION_SIZE;
/** The Constant LARGE_GRID_SIZE. */
exports.LARGE_GRID_SIZE = exports.LARGE_RECTANGLE_SIZE + 2 * exports.DIMENSION_SIZE;
/** The Constant MIN_BYTES_POLYGON. */
exports.MIN_BYTES_POLYGON = exports.HEADER_SIZE + exports.ABS_COORD_SIZE + 2 * exports.RELATIVE_COORD_SIZE;
/** The Constant POINT_OFFSET_SIZE. */
exports.POINT_OFFSET_SIZE = 1;
/** The Constant POINT_WITH_ACCESS_SIZE. */
exports.POINT_WITH_ACCESS_SIZE = exports.HEADER_SIZE + exports.FIRST_LRP_SIZE + exports.LAST_LRP_SIZE + exports.RELATIVE_COORD_SIZE;
/** The Constant POINT_LOCATION_VERSION. */
exports.POINT_LOCATION_VERSION = 3;
/** The Constant POINT_LOCATION_TYPES. */
exports.POINT_LOCATION_TYPES = new Set([LocationType_1.LocationType.GEO_COORDINATES, LocationType_1.LocationType.POI_WITH_ACCESS_POINT, LocationType_1.LocationType.POINT_ALONG_LINE]);
/** The Constant AREA_LOCATION_VERSION. */
exports.AREA_LOCATION_VERSION = 3;
/** The Constant AREA_LOCATION_TYPES. */
exports.AREA_LOCATION_TYPES = new Set([LocationType_1.LocationType.CIRCLE, LocationType_1.LocationType.GRID, LocationType_1.LocationType.CLOSED_LINE, LocationType_1.LocationType.RECTANGLE, LocationType_1.LocationType.POLYGON]);

});

unwrapExports(BinaryConstants);
var BinaryConstants_1 = BinaryConstants.IDENTIFIER;
var BinaryConstants_2 = BinaryConstants.ROUND_FACTOR;
var BinaryConstants_3 = BinaryConstants.BITS_PER_BYTE;
var BinaryConstants_4 = BinaryConstants.DECA_MICRO_DEG_FACTOR;
var BinaryConstants_5 = BinaryConstants.BIT24FACTOR;
var BinaryConstants_6 = BinaryConstants.BIT24FACTOR_REVERSED;
var BinaryConstants_7 = BinaryConstants.BEARING_SECTOR;
var BinaryConstants_8 = BinaryConstants.LENGTH_INTERVAL;
var BinaryConstants_9 = BinaryConstants.IS_POINT;
var BinaryConstants_10 = BinaryConstants.IS_NOT_POINT;
var BinaryConstants_11 = BinaryConstants.AREA_CODE_CIRCLE;
var BinaryConstants_12 = BinaryConstants.AREA_CODE_RECTANGLE;
var BinaryConstants_13 = BinaryConstants.AREA_CODE_GRID;
var BinaryConstants_14 = BinaryConstants.AREA_CODE_POLYGON;
var BinaryConstants_15 = BinaryConstants.AREA_CODE_CLOSEDLINE;
var BinaryConstants_16 = BinaryConstants.IS_NOT_AREA;
var BinaryConstants_17 = BinaryConstants.HAS_ATTRIBUTES;
var BinaryConstants_18 = BinaryConstants.HAS_NO_ATTRIBUTES;
var BinaryConstants_19 = BinaryConstants.HEADER_SIZE;
var BinaryConstants_20 = BinaryConstants.FIRST_LRP_SIZE;
var BinaryConstants_21 = BinaryConstants.LRP_SIZE;
var BinaryConstants_22 = BinaryConstants.LAST_LRP_SIZE;
var BinaryConstants_23 = BinaryConstants.ABS_COORD_SIZE;
var BinaryConstants_24 = BinaryConstants.RELATIVE_OFFSET_LENGTH;
var BinaryConstants_25 = BinaryConstants.MIN_BYTES_LINE_LOCATION;
var BinaryConstants_26 = BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION;
var BinaryConstants_27 = BinaryConstants.GEOCOORD_SIZE;
var BinaryConstants_28 = BinaryConstants.MIN_BYTES_POINT_LOCATION;
var BinaryConstants_29 = BinaryConstants.BINARY_VERSION_2;
var BinaryConstants_30 = BinaryConstants.BINARY_VERSION_3;
var BinaryConstants_31 = BinaryConstants.LATEST_BINARY_VERSION;
var BinaryConstants_32 = BinaryConstants.HAS_OFFSET;
var BinaryConstants_33 = BinaryConstants.OFFSET_BUCKETS;
var BinaryConstants_34 = BinaryConstants.POINT_ALONG_LINE_SIZE;
var BinaryConstants_35 = BinaryConstants.RELATIVE_COORD_SIZE;
var BinaryConstants_36 = BinaryConstants.SMALL_RADIUS_BITS;
var BinaryConstants_37 = BinaryConstants.MEDIUM_RADIUS_BITS;
var BinaryConstants_38 = BinaryConstants.LARGE_RADIUS_BITS;
var BinaryConstants_39 = BinaryConstants.EXTRA_LARGE_RADIUS_BITS;
var BinaryConstants_40 = BinaryConstants.DIMENSION_SIZE;
var BinaryConstants_41 = BinaryConstants.RECTANGLE_SIZE;
var BinaryConstants_42 = BinaryConstants.LARGE_RECTANGLE_SIZE;
var BinaryConstants_43 = BinaryConstants.GRID_SIZE;
var BinaryConstants_44 = BinaryConstants.LARGE_GRID_SIZE;
var BinaryConstants_45 = BinaryConstants.MIN_BYTES_POLYGON;
var BinaryConstants_46 = BinaryConstants.POINT_OFFSET_SIZE;
var BinaryConstants_47 = BinaryConstants.POINT_WITH_ACCESS_SIZE;
var BinaryConstants_48 = BinaryConstants.POINT_LOCATION_VERSION;
var BinaryConstants_49 = BinaryConstants.POINT_LOCATION_TYPES;
var BinaryConstants_50 = BinaryConstants.AREA_LOCATION_VERSION;
var BinaryConstants_51 = BinaryConstants.AREA_LOCATION_TYPES;

var BinaryReturnCode_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryReturnCode;
(function (BinaryReturnCode) {
    BinaryReturnCode[BinaryReturnCode["INVALID_VERSION"] = 0] = "INVALID_VERSION";
    BinaryReturnCode[BinaryReturnCode["INVALID_OFFSET"] = 1] = "INVALID_OFFSET";
    BinaryReturnCode[BinaryReturnCode["UNKNOWN_LOCATION_TYPE"] = 2] = "UNKNOWN_LOCATION_TYPE";
    BinaryReturnCode[BinaryReturnCode["MISSING_DATA"] = 3] = "MISSING_DATA";
    BinaryReturnCode[BinaryReturnCode["NOT_ENOUGH_BYTES"] = 4] = "NOT_ENOUGH_BYTES";
    BinaryReturnCode[BinaryReturnCode["READING_HEADER_FAILURE"] = 5] = "READING_HEADER_FAILURE";
    BinaryReturnCode[BinaryReturnCode["INVALID_BYTE_SIZE"] = 6] = "INVALID_BYTE_SIZE";
    BinaryReturnCode[BinaryReturnCode["INVALID_HEADER"] = 7] = "INVALID_HEADER";
    BinaryReturnCode[BinaryReturnCode["INVALID_RADIUS"] = 8] = "INVALID_RADIUS";
    BinaryReturnCode[BinaryReturnCode["INVALID_BINARY_DATA"] = 9] = "INVALID_BINARY_DATA";
})(BinaryReturnCode = exports.BinaryReturnCode || (exports.BinaryReturnCode = {}));
exports.getId = function (returnCode) { return returnCode; };

});

unwrapExports(BinaryReturnCode_1);
var BinaryReturnCode_2 = BinaryReturnCode_1.BinaryReturnCode;
var BinaryReturnCode_3 = BinaryReturnCode_1.getId;

var BitStreamAbstract_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var BitStreamAbstract = /** @class */ (function () {
    function BitStreamAbstract() {
        /** The buffer size in bytes */
        this._totalBufferLengthBytes = BitStreamAbstract._DEFAULT_BUFFER_LENGTH;
    }
    /** Expand buffer the size of the internal data buffer to size new_length. If new_length is smaller than the current size, then nothing will be done. */
    BitStreamAbstract.prototype._expandBuffer = function (newLength) {
        var normalizedNewLength = newLength || (2 * this._totalBufferLengthBytes);
        if (normalizedNewLength > this._totalBufferLengthBytes) {
            this._totalBufferLengthBytes = normalizedNewLength;
            var newBuffer = buffer.Buffer.alloc(normalizedNewLength);
            this._buffer.copy(newBuffer);
            this._buffer = newBuffer;
        }
    };
    /** Creates the internal data buffer of size length. */
    BitStreamAbstract.prototype._createBuffer = function (length) {
        this._totalBufferLengthBytes = length;
        this._buffer = buffer.Buffer.alloc(length);
    };
    BitStreamAbstract.prototype._getData = function () {
        var byteLength = this._currentBit >>> BitStreamAbstract._BIT_BYTE_SHIFT;
        var copyBuffer = buffer.Buffer.alloc(byteLength);
        this._buffer.copy(copyBuffer, 0, 0, byteLength);
        return copyBuffer;
    };
    /** Factor to shift between bit and byte */
    BitStreamAbstract._BIT_BYTE_SHIFT = 3;
    /** Number of bits in a byte */
    BitStreamAbstract._BYTE_SIZE = 8;
    /** position of the highest bit in a byte (count starts at 0) */
    BitStreamAbstract._HIGHEST_BIT = BitStreamAbstract._BYTE_SIZE - 1;
    /**
     * Bit mask to mask the lowest bits of a byte
     */
    BitStreamAbstract._BITMASK = [0x00000000, 0x00000001, 0x00000003,
        0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f,
        0x000000ff, 0x000001ff, 0x000003ff, 0x000007ff, 0x00000fff,
        0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff, 0x0001ffff,
        0x0003ffff, 0x0007ffff, 0x000fffff, 0x001fffff, 0x003fffff,
        0x007fffff, 0x00ffffff, 0x01ffffff, 0x03ffffff, 0x07ffffff,
        0x0fffffff, 0x1fffffff, 0x3fffffff, 0x7fffffff, 0xffffffff];
    /**
     * Complementary bit mask for negative integer values
     */
    BitStreamAbstract._COMPLEMENT_MASK = [0xffffffff, 0xfffffffe, 0xfffffffc,
        0xfffffff8, 0xfffffff0, 0xffffffe0, 0xffffffc0, 0xffffff80,
        0xffffff00, 0xfffffe00, 0xfffffc00, 0xfffff800, 0xfffff000,
        0xffffe000, 0xffffc000, 0xffff8000, 0xffff0000, 0xfffe0000,
        0xfffc0000, 0xfff80000, 0xfff00000, 0xffe00000, 0xffc00000,
        0xff800000, 0xff000000, 0xfe000000, 0xfc000000, 0xf8000000,
        0xf0000000, 0xe0000000, 0xc0000000, 0x80000000, 0x00000000];
    /**
     * Bit mask to mask one single bit of a byte (needed for the detection of negative numbers)
     */
    BitStreamAbstract._SIGNED_MASK = [0x00000000, 0x00000001, 0x00000002,
        0x00000004, 0x00000008, 0x00000010, 0x00000020, 0x00000040,
        0x00000080, 0x00000100, 0x00000200, 0x00000400, 0x00000800,
        0x00001000, 0x00002000, 0x00004000, 0x00008000, 0x00010000,
        0x00020000, 0x00040000, 0x00080000, 0x00100000, 0x00200000,
        0x00400000, 0x00800000, 0x01000000, 0x02000000, 0x04000000,
        0x08000000, 0x10000000, 0x20000000, 0x40000000, 0x80000000];
    /** the default buffer size */
    BitStreamAbstract._DEFAULT_BUFFER_LENGTH = 1024;
    /** maximum number of bits which can be read/put at a time */
    BitStreamAbstract._MAX_BIT_SIZE = 32;
    return BitStreamAbstract;
}());
exports.BitStreamAbstract = BitStreamAbstract;

});

unwrapExports(BitStreamAbstract_1);
var BitStreamAbstract_2 = BitStreamAbstract_1.BitStreamAbstract;

var BitStreamInput_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var BitStreamInput = /** @class */ (function (_super) {
    __extends(BitStreamInput, _super);
    function BitStreamInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BitStreamInput.prototype.getBits = function (count) {
        // Get the bits
        var x = this._getNextBits(count);
        // Adjust the bit pointers
        this._currentBit += count;
        return x;
    };
    BitStreamInput.prototype.getSignedBits = function (count) {
        // Get the (signed) bits
        var x = this._getNextSignedBits(count);
        // Adjust the bit pointers
        this._currentBit += count;
        return x;
    };
    BitStreamInput.prototype._getNextBits = function (count) {
        if (count === 0) {
            return 0;
        }
        if (count > BitStreamAbstract_1.BitStreamAbstract._MAX_BIT_SIZE || count < 1) {
            throw new Error('Invalid bit size');
        }
        if (this._currentBit + count > this._bufferFilledBytes << BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT) {
            // Forward check if we reach the end of the buffer
            this._fillBufferFromInput();
        }
        if ((this._totalBufferLengthBytes << BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT) - this._currentBit < count) {
            // Check if there is enough data in the buffer (after reading from stream)
            throw new Error('Not enough data');
        }
        var returnValue = 0;
        var currentByteIndex = this._currentBit >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT;
        var endByteIndex = (this._currentBit + count - 1) >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT;
        var room = BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE - (this._currentBit % BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE); // unread bits in the first byte
        if (room >= count) {
            // The requested value is completely in the first byte so read the data
            returnValue = (this._buffer[currentByteIndex] >> room - count) & BitStreamAbstract_1.BitStreamAbstract._BITMASK[count];
        }
        else {
            // Leftover bits in the last byte
            var leftover = (this._currentBit + count) % BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE;
            returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.BitStreamAbstract._BITMASK[room];
            // Now iterate byte-wise, stop before last byte
            for (currentByteIndex++; currentByteIndex < endByteIndex; currentByteIndex++) {
                // Shift return value
                returnValue <<= BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE;
                // and put the bits read instead (full byte)
                returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.BitStreamAbstract._BITMASK[BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE];
            }
            // Now deal with the last part
            if (leftover > 0) {
                returnValue <<= leftover; // Make room for remaining bits
                returnValue |= (this._buffer[currentByteIndex] >> (BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE - leftover)) & BitStreamAbstract_1.BitStreamAbstract._BITMASK[leftover];
            }
            else {
                // Last byte will be read completely
                returnValue <<= BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE;
                returnValue |= this._buffer[currentByteIndex] & BitStreamAbstract_1.BitStreamAbstract._BITMASK[BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE];
            }
        }
        return returnValue;
    };
    BitStreamInput.prototype._getNextSignedBits = function (count) {
        // Get the (unsigned) bits
        var x = this._getNextBits(count);
        // Check if the number read is negative?
        if (count > 1 && ((BitStreamAbstract_1.BitStreamAbstract._SIGNED_MASK[count] & x) !== 0)) {
            // Number is negative so transform into an integer including the sign
            return x | BitStreamAbstract_1.BitStreamAbstract._COMPLEMENT_MASK[count];
        }
        else {
            // Number is positive, no transformation needed
            return x;
        }
    };
    BitStreamInput.prototype._fillBufferFromInput = function () {
        var currentByteIndex = this._currentBit >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT; // Current byte offset
        var remainingBytes = this._bufferFilledBytes - currentByteIndex; // Remaining bytes
        // Copy remaining data (not read yet) into the head of the buffer and overwrite already read data
        this._buffer.copy(this._buffer, 0, currentByteIndex, this._bufferFilledBytes);
        var maxSizeInBuffer = this._totalBufferLengthBytes - currentByteIndex;
        var bytesReadFromStream = this._inBuffer.copy(this._buffer, remainingBytes, 0, maxSizeInBuffer);
        if (bytesReadFromStream < maxSizeInBuffer) {
            // No more data available but application should read more, that is an error
            throw new Error('End of Data');
        }
        // Adjust buffer size being used
        // The total buffer size might be larger but this should only happen
        // The last reading data from stream!
        this._bufferFilledBytes = remainingBytes + bytesReadFromStream;
        // Set bit pointer according to the part already being processed
        this._currentBit &= BitStreamAbstract_1.BitStreamAbstract._HIGHEST_BIT;
    };
    BitStreamInput.fromString = function (value, encoding) {
        var bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = Buffer.from(value, encoding);
        bitStreamInput._createBuffer(bitStreamInput._inBuffer.length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    };
    BitStreamInput.fromStringAndLength = function (value, encoding, length) {
        var bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = Buffer.from(value, encoding);
        bitStreamInput._createBuffer(length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    };
    BitStreamInput.fromBuffer = function (buffer) {
        var bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = buffer;
        bitStreamInput._createBuffer(buffer.length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    };
    BitStreamInput.fromBufferAndLength = function (buffer, length) {
        var bitStreamInput = new BitStreamInput();
        bitStreamInput._inBuffer = buffer;
        bitStreamInput._createBuffer(length);
        bitStreamInput._currentBit = 0;
        bitStreamInput._bufferFilledBytes = 0;
        bitStreamInput._fillBufferFromInput();
        return bitStreamInput;
    };
    return BitStreamInput;
}(BitStreamAbstract_1.BitStreamAbstract));
exports.BitStreamInput = BitStreamInput;

});

unwrapExports(BitStreamInput_1);
var BitStreamInput_2 = BitStreamInput_1.BitStreamInput;

var RawLocationReference_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var RawLocationReference = /** @class */ (function () {
    function RawLocationReference() {
    }
    // static fromValues(id: string, locationType: LocationType, returnCode: number) {
    //     const rawLocationReference = new RawLocationReference();
    //     rawLocationReference._id = id;
    //     rawLocationReference._locationType = locationType;
    //     rawLocationReference._returnCode = returnCode;
    //     return rawLocationReference;
    // }
    // static fromIdAndLocationType(id: string, locationType: LocationType) {
    //     const rawLocationReference = new RawLocationReference();
    //     rawLocationReference._id = id;
    //     rawLocationReference._locationType = locationType;
    //     rawLocationReference._returnCode = null;
    //     return rawLocationReference;
    // }
    RawLocationReference.prototype.getId = function () {
        return this._id;
    };
    RawLocationReference.prototype.hasId = function () {
        return this._id !== null;
    };
    RawLocationReference.prototype.getLocationType = function () {
        return this._locationType;
    };
    RawLocationReference.prototype.getReturnCode = function () {
        return this._returnCode;
    };
    RawLocationReference.prototype.isValid = function () {
        return this._returnCode === null;
    };
    RawLocationReference.prototype.getLocationReferencePoints = function () {
        return null;
    };
    RawLocationReference.prototype.getOffsets = function () {
        return null;
    };
    RawLocationReference.prototype.getGeoCoordinates = function () {
        return null;
    };
    RawLocationReference.prototype.getSideOfRoad = function () {
        return null;
    };
    RawLocationReference.prototype.getOrientation = function () {
        return null;
    };
    RawLocationReference.prototype.getCornerPoints = function () {
        return null;
    };
    RawLocationReference.prototype.getLowerLeftPoint = function () {
        return null;
    };
    RawLocationReference.prototype.getUpperRightPoint = function () {
        return null;
    };
    RawLocationReference.prototype.getCenterPoint = function () {
        return null;
    };
    RawLocationReference.prototype.getRadius = function () {
        return -1;
    };
    RawLocationReference.prototype.getNumberOfColumns = function () {
        return -1;
    };
    RawLocationReference.prototype.getNumberOfRows = function () {
        return -1;
    };
    return RawLocationReference;
}());
exports.RawLocationReference = RawLocationReference;

});

unwrapExports(RawLocationReference_1);
var RawLocationReference_2 = RawLocationReference_1.RawLocationReference;

var RawInvalidLocationReference_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });


var RawInvalidLocationReference = /** @class */ (function (_super) {
    __extends(RawInvalidLocationReference, _super);
    function RawInvalidLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawInvalidLocationReference.fromIdAndStatusCode = function (id, error) {
        var rawInvalidLocationReference = new RawInvalidLocationReference();
        rawInvalidLocationReference._id = id;
        rawInvalidLocationReference._locationType = LocationType_1.LocationType.UNKNOWN;
        rawInvalidLocationReference._returnCode = error;
        return rawInvalidLocationReference;
    };
    RawInvalidLocationReference.fromInvalidValues = function (id, error, locationType) {
        var rawInvalidLocationReference = new RawInvalidLocationReference();
        rawInvalidLocationReference._id = id;
        rawInvalidLocationReference._locationType = locationType;
        rawInvalidLocationReference._returnCode = error;
        return rawInvalidLocationReference;
    };
    return RawInvalidLocationReference;
}(RawLocationReference_1.RawLocationReference));
exports.RawInvalidLocationReference = RawInvalidLocationReference;

});

unwrapExports(RawInvalidLocationReference_1);
var RawInvalidLocationReference_2 = RawInvalidLocationReference_1.RawInvalidLocationReference;

var BinaryInformation_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryInformation = /** @class */ (function () {
    function BinaryInformation() {
    }
    BinaryInformation._RFU_VALUE = 0;
    return BinaryInformation;
}());
exports.BinaryInformation = BinaryInformation;

});

unwrapExports(BinaryInformation_1);
var BinaryInformation_2 = BinaryInformation_1.BinaryInformation;

var Header_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(BinaryInformation_1.BinaryInformation._RFU_VALUE, Header._RFU_BITS);
        var arf1 = this._arf / 2;
        var arf0 = this._arf % 2;
        bitStreamOutput.putBits(arf1, Header._AREA_FLAG_BIT1);
        bitStreamOutput.putBits(this._pf, Header._POINT_FLAG_BITS);
        bitStreamOutput.putBits(arf0, Header._AREA_FLAG_BIT0);
        bitStreamOutput.putBits(this._af, Header._ATTR_FLAG_BITS);
        bitStreamOutput.putBits(this._ver, Header._VERSION_BITS);
    };
    Header.fromValues = function (arfValue, afValue, pfValue, verValue) {
        var header = new Header();
        header._arf = arfValue;
        header._af = afValue;
        header._pf = pfValue;
        header._ver = verValue;
        return header;
    };
    Header.fromBitStreamInput = function (bitStreamInput) {
        var rfu = bitStreamInput.getBits(Header._RFU_BITS);
        if (rfu !== BinaryInformation_1.BinaryInformation._RFU_VALUE) {
            throw new Error('Const value mismatch');
        }
        var header = new Header();
        var arf1 = bitStreamInput.getBits(Header._AREA_FLAG_BIT0);
        header._pf = bitStreamInput.getBits(Header._POINT_FLAG_BITS);
        var arf0 = bitStreamInput.getBits(Header._AREA_FLAG_BIT1);
        header._arf = 2 * arf1 + arf0;
        header._af = bitStreamInput.getBits(Header._ATTR_FLAG_BITS);
        header._ver = bitStreamInput.getBits(Header._VERSION_BITS);
        return header;
    };
    Object.defineProperty(Header.prototype, "arf", {
        get: function () {
            return this._arf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "af", {
        get: function () {
            return this._af;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "pf", {
        get: function () {
            return this._pf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "ver", {
        get: function () {
            return this._ver;
        },
        enumerable: true,
        configurable: true
    });
    Header._RFU_BITS = 1;
    Header._AREA_FLAG_BIT0 = 1;
    Header._AREA_FLAG_BIT1 = 1;
    /** Number of bits used for attributes flag */
    Header._ATTR_FLAG_BITS = 1;
    /** Number of bits used for poflag */
    Header._POINT_FLAG_BITS = 1;
    /** Number of bits used for version */
    Header._VERSION_BITS = 3;
    return Header;
}(BinaryInformation_1.BinaryInformation));
exports.Header = Header;

});

unwrapExports(Header_1);
var Header_2 = Header_1.Header;

var SideOfRoad_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var SideOfRoad;
(function (SideOfRoad) {
    SideOfRoad[SideOfRoad["ON_ROAD_OR_UNKNOWN"] = 0] = "ON_ROAD_OR_UNKNOWN";
    SideOfRoad[SideOfRoad["RIGHT"] = 1] = "RIGHT";
    SideOfRoad[SideOfRoad["LEFT"] = 2] = "LEFT";
    SideOfRoad[SideOfRoad["BOTH"] = 3] = "BOTH";
})(SideOfRoad = exports.SideOfRoad || (exports.SideOfRoad = {}));
exports.getSideOfRoadValues = function () { return [SideOfRoad.ON_ROAD_OR_UNKNOWN, SideOfRoad.RIGHT, SideOfRoad.LEFT, SideOfRoad.BOTH]; };
exports.getDefault = function () { return SideOfRoad.ON_ROAD_OR_UNKNOWN; };
exports.getId = function (sideOfRoad) { return sideOfRoad; };

});

unwrapExports(SideOfRoad_1);
var SideOfRoad_2 = SideOfRoad_1.SideOfRoad;
var SideOfRoad_3 = SideOfRoad_1.getSideOfRoadValues;
var SideOfRoad_4 = SideOfRoad_1.getDefault;
var SideOfRoad_5 = SideOfRoad_1.getId;

var Orientation_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var Orientation;
(function (Orientation) {
    Orientation[Orientation["NO_ORIENTATION_OR_UNKNOWN"] = 0] = "NO_ORIENTATION_OR_UNKNOWN";
    Orientation[Orientation["WITH_LINE_DIRECTION"] = 1] = "WITH_LINE_DIRECTION";
    Orientation[Orientation["AGAINST_LINE_DIRECTION"] = 2] = "AGAINST_LINE_DIRECTION";
    Orientation[Orientation["BOTH"] = 3] = "BOTH";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
exports.getOrientationValues = function () { return [Orientation.NO_ORIENTATION_OR_UNKNOWN, Orientation.WITH_LINE_DIRECTION, Orientation.AGAINST_LINE_DIRECTION, Orientation.BOTH]; };
exports.getDefault = function () { return Orientation.NO_ORIENTATION_OR_UNKNOWN; };
exports.getId = function (orientation) { return orientation; };

});

unwrapExports(Orientation_1);
var Orientation_2 = Orientation_1.Orientation;
var Orientation_3 = Orientation_1.getOrientationValues;
var Orientation_4 = Orientation_1.getDefault;
var Orientation_5 = Orientation_1.getId;

var FunctionalRoadClass_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var FunctionalRoadClass;
(function (FunctionalRoadClass) {
    FunctionalRoadClass[FunctionalRoadClass["FRC_0"] = 0] = "FRC_0";
    FunctionalRoadClass[FunctionalRoadClass["FRC_1"] = 1] = "FRC_1";
    FunctionalRoadClass[FunctionalRoadClass["FRC_2"] = 2] = "FRC_2";
    FunctionalRoadClass[FunctionalRoadClass["FRC_3"] = 3] = "FRC_3";
    FunctionalRoadClass[FunctionalRoadClass["FRC_4"] = 4] = "FRC_4";
    FunctionalRoadClass[FunctionalRoadClass["FRC_5"] = 5] = "FRC_5";
    FunctionalRoadClass[FunctionalRoadClass["FRC_6"] = 6] = "FRC_6";
    FunctionalRoadClass[FunctionalRoadClass["FRC_7"] = 7] = "FRC_7";
})(FunctionalRoadClass = exports.FunctionalRoadClass || (exports.FunctionalRoadClass = {}));
exports.getFRCValues = function () { return [FunctionalRoadClass.FRC_0, FunctionalRoadClass.FRC_1, FunctionalRoadClass.FRC_2, FunctionalRoadClass.FRC_3, FunctionalRoadClass.FRC_4, FunctionalRoadClass.FRC_5, FunctionalRoadClass.FRC_6, FunctionalRoadClass.FRC_7]; };
exports.getId = function (frc) { return frc; };
exports.lower = function (frc) { return Math.min(frc + 1, FunctionalRoadClass.FRC_7); };
exports.higher = function (frc) { return Math.max(frc - 1, FunctionalRoadClass.FRC_0); };
exports.getHighestFrc = FunctionalRoadClass.FRC_0;
exports.getLowestFrc = FunctionalRoadClass.FRC_7;

});

unwrapExports(FunctionalRoadClass_1);
var FunctionalRoadClass_2 = FunctionalRoadClass_1.FunctionalRoadClass;
var FunctionalRoadClass_3 = FunctionalRoadClass_1.getFRCValues;
var FunctionalRoadClass_4 = FunctionalRoadClass_1.getId;
var FunctionalRoadClass_5 = FunctionalRoadClass_1.lower;
var FunctionalRoadClass_6 = FunctionalRoadClass_1.higher;
var FunctionalRoadClass_7 = FunctionalRoadClass_1.getHighestFrc;
var FunctionalRoadClass_8 = FunctionalRoadClass_1.getLowestFrc;

var FormOfWay_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var FormOfWay;
(function (FormOfWay) {
    /** The physical road type is unknown. */
    FormOfWay[FormOfWay["UNDEFINED"] = 0] = "UNDEFINED";
    /**
     * A Motorway is defined as a road permitted for motorized vehicles only in combination with a prescribed minimum speed. It has two or more physically separated carriageways and no single level-crossings.
     */
    FormOfWay[FormOfWay["MOTORWAY"] = 1] = "MOTORWAY";
    /**
     * A multiple carriageway is defined as a road with physically separated carriageways regardless of the number of lanes. If a road is also a motorway; it should be coded as such and not as a multiple carriageway.
     */
    FormOfWay[FormOfWay["MULTIPLE_CARRIAGEWAY"] = 2] = "MULTIPLE_CARRIAGEWAY";
    /**
     * All roads without separate carriageways are considered as roads with a single carriageway.
     */
    FormOfWay[FormOfWay["SINGLE_CARRIAGEWAY"] = 3] = "SINGLE_CARRIAGEWAY";
    /**
     * A Roundabout is a road which forms a ring on which traffic travelling in only one direction is allowed.
     */
    FormOfWay[FormOfWay["ROUNDABOUT"] = 4] = "ROUNDABOUT";
    /**
     * A Traffic Square is an open area (partly) enclosed by roads which is used for non-traffic purposes and which is not a Roundabout.
     */
    FormOfWay[FormOfWay["TRAFFIC_SQUARE"] = 5] = "TRAFFIC_SQUARE";
    /** A Slip Road is a road especially designed to enter or leave a line. */
    FormOfWay[FormOfWay["SLIPROAD"] = 6] = "SLIPROAD";
    /**
     * The physical road type is known but does not fit into one of the other categories.
     */
    FormOfWay[FormOfWay["OTHER"] = 7] = "OTHER";
})(FormOfWay = exports.FormOfWay || (exports.FormOfWay = {}));
exports.getFormOfWayValues = function () { return [FormOfWay.UNDEFINED, FormOfWay.MOTORWAY, FormOfWay.MULTIPLE_CARRIAGEWAY, FormOfWay.SINGLE_CARRIAGEWAY, FormOfWay.ROUNDABOUT, FormOfWay.TRAFFIC_SQUARE, FormOfWay.SLIPROAD]; };
exports.getId = function (formOfWay) { return formOfWay; };

});

unwrapExports(FormOfWay_1);
var FormOfWay_2 = FormOfWay_1.FormOfWay;
var FormOfWay_3 = FormOfWay_1.getFormOfWayValues;
var FormOfWay_4 = FormOfWay_1.getId;

var LocationReferencePoint_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var LocationReferencePoint = /** @class */ (function () {
    function LocationReferencePoint() {
    }
    LocationReferencePoint.prototype.getLongitudeDeg = function () {
        return this._longitude;
    };
    LocationReferencePoint.prototype.getLatitudeDeg = function () {
        return this._latitude;
    };
    LocationReferencePoint.prototype.getBearing = function () {
        return this._bearing;
    };
    LocationReferencePoint.prototype.getDistanceToNext = function () {
        return this._distanceToNext;
    };
    LocationReferencePoint.prototype.getFRC = function () {
        return this._frc;
    };
    LocationReferencePoint.prototype.getFOW = function () {
        return this._fow;
    };
    LocationReferencePoint.prototype.getLfrc = function () {
        return this._lfrcnp;
    };
    LocationReferencePoint.prototype.isLastLRP = function () {
        return this._isLast;
    };
    LocationReferencePoint.fromValues = function (sequenceNumber, frc, fow, longitude, latitude, bearing, distanceToNext, lfrcnp, isLast) {
        var lrp = new LocationReferencePoint();
        lrp._bearing = bearing;
        lrp._distanceToNext = distanceToNext;
        lrp._frc = frc;
        lrp._fow = fow;
        lrp._lfrcnp = lfrcnp;
        lrp._isLast = isLast;
        lrp._longitude = longitude;
        lrp._latitude = latitude;
        lrp._sequenceNumber = sequenceNumber;
        return lrp;
    };
    LocationReferencePoint.fromGeoCoordinate = function (coord) {
        var lrp = new LocationReferencePoint();
        lrp._longitude = coord.getLongitudeDeg();
        lrp._latitude = coord.getLatitudeDeg();
        lrp._frc = null;
        lrp._fow = null;
        lrp._bearing = 0;
        lrp._lfrcnp = null;
        lrp._isLast = false;
        lrp._distanceToNext = 0;
        lrp._sequenceNumber = 1;
        return lrp;
    };
    return LocationReferencePoint;
}());
exports.LocationReferencePoint = LocationReferencePoint;

});

unwrapExports(LocationReferencePoint_1);
var LocationReferencePoint_2 = LocationReferencePoint_1.LocationReferencePoint;

var AbstractDecoder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });






var AbstractDecoder = /** @class */ (function () {
    function AbstractDecoder() {
    }
    AbstractDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        throw new Error('This method is abstract');
    };
    AbstractDecoder.prototype._resolveSideOfRoad = function (attrib1) {
        var value = attrib1.sideOrOrientation;
        return SideOfRoad_1.getSideOfRoadValues()[value];
    };
    AbstractDecoder.prototype._resolveOrientation = function (attrib1) {
        var value = attrib1.sideOrOrientation;
        return Orientation_1.getOrientationValues()[value];
    };
    AbstractDecoder.prototype._calculateRelativeDistance = function (offset) {
        var lower = offset * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        var upper = (offset + 1) * BinaryConstants.RELATIVE_OFFSET_LENGTH;
        return (lower + upper) / 2;
    };
    AbstractDecoder.prototype._createFirstLRP = function (seqNr, firstLRP) {
        var frc = FunctionalRoadClass_1.getFRCValues()[firstLRP.attrib1.frc];
        var fow = FormOfWay_1.getFormOfWayValues()[firstLRP.attrib1.fow];
        var lon = this._calculate32BitRepresentation(firstLRP.lon);
        var lat = this._calculate32BitRepresentation(firstLRP.lat);
        var bearing = this._calculateBearingEstimate(firstLRP.attrib2.bear);
        var dnp = this._calculateDistanceEstimate(firstLRP.attrib3.dnp);
        var lfrc = FunctionalRoadClass_1.getFRCValues()[firstLRP.attrib2.lfrcnp];
        return LocationReferencePoint_1.LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    };
    AbstractDecoder.prototype._createIntermediateLRPFromLatitudeLongitude = function (seqNr, intermediateLRP, prevLon, prevLat) {
        var frc = FunctionalRoadClass_1.getFRCValues()[intermediateLRP.attrib1.frc];
        var fow = FormOfWay_1.getFormOfWayValues()[intermediateLRP.attrib1.fow];
        var lon = prevLon + (intermediateLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        var lat = prevLat + (intermediateLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        var bearing = this._calculateBearingEstimate(intermediateLRP.attrib2.bear);
        var dnp = this._calculateDistanceEstimate(intermediateLRP.attrib3.dnp);
        var lfrc = FunctionalRoadClass_1.getFRCValues()[intermediateLRP.attrib2.lfrcnp];
        return LocationReferencePoint_1.LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, false);
    };
    AbstractDecoder.prototype._createIntermediateLRPFromFirstAndLast = function (seqNr, lastClosedLineLRP, firstLRP) {
        var frc = FunctionalRoadClass_1.getFRCValues()[lastClosedLineLRP.attrib5.frc];
        var fow = FormOfWay_1.getFormOfWayValues()[lastClosedLineLRP.attrib5.fow];
        var bearing = this._calculateBearingEstimate(lastClosedLineLRP.attrib6.bear);
        var lon = this._calculate32BitRepresentation(firstLRP.lon);
        var lat = this._calculate32BitRepresentation(firstLRP.lat);
        return LocationReferencePoint_1.LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, 0, null, true);
    };
    AbstractDecoder.prototype._createLastLRP = function (seqNr, lastLRP, prevLon, prevLat) {
        var frc = FunctionalRoadClass_1.getFRCValues()[lastLRP.attrib1.frc];
        var fow = FormOfWay_1.getFormOfWayValues()[lastLRP.attrib1.fow];
        var lon = prevLon + (lastLRP.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        var lat = prevLat + (lastLRP.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
        var bearing = this._calculateBearingEstimate(lastLRP.attrib4.bear);
        var dnp = 0;
        var lfrc = FunctionalRoadClass_1.FunctionalRoadClass.FRC_7;
        return LocationReferencePoint_1.LocationReferencePoint.fromValues(seqNr, frc, fow, lon, lat, bearing, dnp, lfrc, true);
    };
    AbstractDecoder.prototype._calculate32BitRepresentation = function (val) {
        var sgn = Math.sign(val);
        return (val - (sgn * BinaryConstants.ROUND_FACTOR)) * BinaryConstants.BIT24FACTOR_REVERSED;
    };
    AbstractDecoder.prototype._calculateBearingEstimate = function (interval) {
        var lower = interval * BinaryConstants.BEARING_SECTOR;
        var upper = (interval + 1) * BinaryConstants.BEARING_SECTOR;
        return (upper + lower) / 2;
    };
    AbstractDecoder.prototype._calculateDistanceEstimate = function (interval) {
        var lower = interval * BinaryConstants.LENGTH_INTERVAL;
        var upper = (interval + 1) * BinaryConstants.LENGTH_INTERVAL;
        return Math.round((upper + lower) / 2);
    };
    AbstractDecoder.prototype._get24BitRepresentation = function (val) {
        var sgn = Math.sign(val);
        return Math.round(Math.fround((sgn * BinaryConstants.ROUND_FACTOR) + (val * BinaryConstants.BIT24FACTOR)));
    };
    return AbstractDecoder;
}());
exports.AbstractDecoder = AbstractDecoder;

});

unwrapExports(AbstractDecoder_1);
var AbstractDecoder_2 = AbstractDecoder_1.AbstractDecoder;

var AbstractCoordinate_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var AbstractCoordinate = /** @class */ (function (_super) {
    __extends(AbstractCoordinate, _super);
    function AbstractCoordinate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractCoordinate.prototype.putCoordinates = function (bitStreamOutput) {
        bitStreamOutput.putBits(this._lon, this._coordBits);
        bitStreamOutput.putBits(this._lat, this._coordBits);
    };
    AbstractCoordinate.prototype._read = function (bitStreamInput) {
        this._lon = bitStreamInput.getSignedBits(this._coordBits);
        this._lat = bitStreamInput.getSignedBits(this._coordBits);
    };
    AbstractCoordinate.fromBitCount = function (countBits) {
        var abstractCoordinate = new AbstractCoordinate();
        abstractCoordinate._coordBits = countBits;
        return abstractCoordinate;
    };
    Object.defineProperty(AbstractCoordinate.prototype, "lon", {
        get: function () {
            return this._lon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCoordinate.prototype, "lat", {
        get: function () {
            return this._lat;
        },
        enumerable: true,
        configurable: true
    });
    return AbstractCoordinate;
}(BinaryInformation_1.BinaryInformation));
exports.AbstractCoordinate = AbstractCoordinate;

});

unwrapExports(AbstractCoordinate_1);
var AbstractCoordinate_2 = AbstractCoordinate_1.AbstractCoordinate;

var AbstractLRP_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var AbstractLRP = /** @class */ (function (_super) {
    __extends(AbstractLRP, _super);
    function AbstractLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractLRP.fromBitCount = function (countBits) {
        var abstractLrp = new AbstractLRP();
        abstractLrp._coordBits = countBits;
        return abstractLrp;
    };
    Object.defineProperty(AbstractLRP.prototype, "attrib1", {
        get: function () {
            return this._attrib1;
        },
        enumerable: true,
        configurable: true
    });
    return AbstractLRP;
}(AbstractCoordinate_1.AbstractCoordinate));
exports.AbstractLRP = AbstractLRP;

});

unwrapExports(AbstractLRP_1);
var AbstractLRP_2 = AbstractLRP_1.AbstractLRP;

var Attr1_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var Attr1 = /** @class */ (function (_super) {
    __extends(Attr1, _super);
    function Attr1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr1.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(this._sideOrOrientation, Attr1._SIDE_OR_ORIENTATION_BITS);
        bitStreamOutput.putBits(this._frc, Attr1._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr1._FOW_BITS);
    };
    Attr1.fromValues = function (frc, fow, sideOrOrientation) {
        var attr1 = new Attr1();
        attr1._frc = frc;
        attr1._fow = fow;
        attr1._sideOrOrientation = sideOrOrientation;
        return attr1;
    };
    Attr1.fromBitStreamInput = function (bitStreamInput) {
        var attr1 = new Attr1();
        attr1._sideOrOrientation = bitStreamInput.getBits(Attr1._SIDE_OR_ORIENTATION_BITS);
        attr1._frc = bitStreamInput.getBits(Attr1._FRC_BITS);
        attr1._fow = bitStreamInput.getBits(Attr1._FOW_BITS);
        return attr1;
    };
    Object.defineProperty(Attr1.prototype, "frc", {
        get: function () {
            return this._frc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr1.prototype, "fow", {
        get: function () {
            return this._fow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr1.prototype, "sideOrOrientation", {
        get: function () {
            return this._sideOrOrientation;
        },
        enumerable: true,
        configurable: true
    });
    /** The Constant SIDE_OR_ORIENTATION_BITS. */
    Attr1._SIDE_OR_ORIENTATION_BITS = 2;
    /** Number of bits used for frc */
    Attr1._FRC_BITS = 3;
    /** Number of bits used for fow */
    Attr1._FOW_BITS = 3;
    return Attr1;
}(BinaryInformation_1.BinaryInformation));
exports.Attr1 = Attr1;

});

unwrapExports(Attr1_1);
var Attr1_2 = Attr1_1.Attr1;

var Attr2_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var Attr2 = /** @class */ (function (_super) {
    __extends(Attr2, _super);
    function Attr2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr2.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(this._lfrcnp, Attr2._LFRCNP_BITS);
        bitStreamOutput.putBits(this._bear, Attr2._BEAR_BITS);
    };
    Attr2.fromValues = function (lfrcnp, bear) {
        var attr2 = new Attr2();
        attr2._lfrcnp = lfrcnp;
        attr2._bear = bear;
        return attr2;
    };
    Attr2.fromBitStreamInput = function (bitStreamInput) {
        var attr2 = new Attr2();
        attr2._lfrcnp = bitStreamInput.getBits(Attr2._LFRCNP_BITS);
        attr2._bear = bitStreamInput.getBits(Attr2._BEAR_BITS);
        return attr2;
    };
    Object.defineProperty(Attr2.prototype, "lfrcnp", {
        get: function () {
            return this._lfrcnp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr2.prototype, "bear", {
        get: function () {
            return this._bear;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for lfrcnp */
    Attr2._LFRCNP_BITS = 3;
    /** Number of bits used for bear */
    Attr2._BEAR_BITS = 5;
    return Attr2;
}(BinaryInformation_1.BinaryInformation));
exports.Attr2 = Attr2;

});

unwrapExports(Attr2_1);
var Attr2_2 = Attr2_1.Attr2;

var Attr3_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var Attr3 = /** @class */ (function (_super) {
    __extends(Attr3, _super);
    function Attr3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr3.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(this._dnp, Attr3._DNP_BITS);
    };
    Attr3.fromValues = function (dnp) {
        var attr3 = new Attr3();
        attr3._dnp = dnp;
        return attr3;
    };
    Attr3.fromBitStreamInput = function (bitStreamInput) {
        var attr3 = new Attr3();
        attr3._dnp = bitStreamInput.getBits(Attr3._DNP_BITS);
        return attr3;
    };
    Object.defineProperty(Attr3.prototype, "dnp", {
        get: function () {
            return this._dnp;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for dnp */
    Attr3._DNP_BITS = 8;
    return Attr3;
}(BinaryInformation_1.BinaryInformation));
exports.Attr3 = Attr3;

});

unwrapExports(Attr3_1);
var Attr3_2 = Attr3_1.Attr3;

var FirstLRP_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });




var FirstLRP = /** @class */ (function (_super) {
    __extends(FirstLRP, _super);
    function FirstLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstLRP.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    };
    FirstLRP.fromValues = function (lon, lat, attrib1, attrib2, attrib3) {
        var firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._lon = lon;
        firstLrp._lat = lat;
        firstLrp._attrib1 = attrib1;
        firstLrp._attrib2 = attrib2;
        firstLrp._attrib3 = attrib3;
        return firstLrp;
    };
    FirstLRP.fromBitStreamInput = function (bitStreamInput) {
        var firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._read(bitStreamInput);
        firstLrp._attrib1 = Attr1_1.Attr1.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib2 = Attr2_1.Attr2.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib3 = Attr3_1.Attr3.fromBitStreamInput(bitStreamInput);
        return firstLrp;
    };
    Object.defineProperty(FirstLRP.prototype, "attrib2", {
        get: function () {
            return this._attrib2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirstLRP.prototype, "attrib3", {
        get: function () {
            return this._attrib3;
        },
        enumerable: true,
        configurable: true
    });
    FirstLRP._COORD_BITS = 24;
    return FirstLRP;
}(AbstractLRP_1.AbstractLRP));
exports.FirstLRP = FirstLRP;

});

unwrapExports(FirstLRP_1);
var FirstLRP_2 = FirstLRP_1.FirstLRP;

var IntermediateLRP_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });




var IntermediateLRP = /** @class */ (function (_super) {
    __extends(IntermediateLRP, _super);
    function IntermediateLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntermediateLRP.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    };
    IntermediateLRP.fromValues = function (lon, lat, attrib1, attrib2, attrib3) {
        var intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._lon = lon;
        intermediateLrp._lat = lat;
        intermediateLrp._attrib1 = attrib1;
        intermediateLrp._attrib2 = attrib2;
        intermediateLrp._attrib3 = attrib3;
        return intermediateLrp;
    };
    IntermediateLRP.fromBitStreamInput = function (bitStreamInput) {
        var intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._read(bitStreamInput);
        intermediateLrp._attrib1 = Attr1_1.Attr1.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib2 = Attr2_1.Attr2.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib3 = Attr3_1.Attr3.fromBitStreamInput(bitStreamInput);
        return intermediateLrp;
    };
    Object.defineProperty(IntermediateLRP.prototype, "attrib2", {
        get: function () {
            return this._attrib2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntermediateLRP.prototype, "attrib3", {
        get: function () {
            return this._attrib3;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for coordinates (relative) */
    IntermediateLRP._COORD_BITS = 16;
    return IntermediateLRP;
}(AbstractLRP_1.AbstractLRP));
exports.IntermediateLRP = IntermediateLRP;

});

unwrapExports(IntermediateLRP_1);
var IntermediateLRP_2 = IntermediateLRP_1.IntermediateLRP;

var Attr4_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var Attr4 = /** @class */ (function (_super) {
    __extends(Attr4, _super);
    function Attr4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr4.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(Attr4._RFU_VALUE, Attr4._RFU_BITS);
        bitStreamOutput.putBits(this._pOffsetF, Attr4._POFFF_BITS);
        bitStreamOutput.putBits(this._nOffsetF, Attr4._NOFFF_BITS);
        bitStreamOutput.putBits(this._bear, Attr4._BEAR_BITS);
    };
    Attr4.fromValues = function (pOffsetF, nOffsetF, bear) {
        var attr4 = new Attr4();
        attr4._pOffsetF = pOffsetF;
        attr4._nOffsetF = nOffsetF;
        attr4._bear = bear;
        return attr4;
    };
    Attr4.fromBitStreamInput = function (bitStreamInput) {
        var rfu = bitStreamInput.getBits(Attr4._RFU_BITS);
        if (rfu !== Attr4._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        var attr4 = new Attr4();
        attr4._pOffsetF = bitStreamInput.getBits(Attr4._POFFF_BITS);
        attr4._nOffsetF = bitStreamInput.getBits(Attr4._NOFFF_BITS);
        attr4._bear = bitStreamInput.getBits(Attr4._BEAR_BITS);
        return attr4;
    };
    Object.defineProperty(Attr4.prototype, "pOffsetF", {
        get: function () {
            return this._pOffsetF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr4.prototype, "nOffsetF", {
        get: function () {
            return this._nOffsetF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr4.prototype, "bear", {
        get: function () {
            return this._bear;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of unused bits */
    Attr4._RFU_BITS = 1;
    /** Number of bits used for positive offset flag */
    Attr4._POFFF_BITS = 1;
    /** Number of bits used for negative offset flag */
    Attr4._NOFFF_BITS = 1;
    /** Number of bits used for bearing */
    Attr4._BEAR_BITS = 5;
    return Attr4;
}(BinaryInformation_1.BinaryInformation));
exports.Attr4 = Attr4;

});

unwrapExports(Attr4_1);
var Attr4_2 = Attr4_1.Attr4;

var LastLRP_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });



var LastLRP = /** @class */ (function (_super) {
    __extends(LastLRP, _super);
    function LastLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LastLRP.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib4.put(bitStreamOutput);
    };
    LastLRP.fromValues = function (lon, lat, attrib1, attrib4) {
        var lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._lon = lon;
        lastLrp._lat = lat;
        lastLrp._attrib1 = attrib1;
        lastLrp._attrib4 = attrib4;
        return lastLrp;
    };
    LastLRP.fromBitStreamInput = function (bitStreamInput) {
        var lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._read(bitStreamInput);
        lastLrp._attrib1 = Attr1_1.Attr1.fromBitStreamInput(bitStreamInput);
        lastLrp._attrib4 = Attr4_1.Attr4.fromBitStreamInput(bitStreamInput);
        return lastLrp;
    };
    Object.defineProperty(LastLRP.prototype, "attrib4", {
        get: function () {
            return this._attrib4;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for coordinates (relative) */
    LastLRP._COORD_BITS = 16;
    return LastLRP;
}(AbstractLRP_1.AbstractLRP));
exports.LastLRP = LastLRP;

});

unwrapExports(LastLRP_1);
var LastLRP_2 = LastLRP_1.LastLRP;

var Offset_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var Offset = /** @class */ (function (_super) {
    __extends(Offset, _super);
    function Offset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Offset.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(this._offset, Offset._OFFSET_BITS);
    };
    Offset.fromValues = function (offsetValue) {
        var offset = new Offset();
        offset._offset = offsetValue;
        return offset;
    };
    Offset.fromBitStreamInput = function (bitStreamInput) {
        var offset = new Offset();
        offset._offset = bitStreamInput.getBits(Offset._OFFSET_BITS);
        return offset;
    };
    Object.defineProperty(Offset.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        enumerable: true,
        configurable: true
    });
    /** Number of bits used for offset */
    Offset._OFFSET_BITS = 8;
    return Offset;
}(BinaryInformation_1.BinaryInformation));
exports.Offset = Offset;

});

unwrapExports(Offset_1);
var Offset_2 = Offset_1.Offset;

var Offsets_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var Offsets = /** @class */ (function () {
    function Offsets() {
    }
    Offsets.prototype.hasPositiveOffset = function () {
        return (this._pOffset !== 0 || this._pOffRelative !== 0);
    };
    Offsets.prototype.hasNegativeOffset = function () {
        return (this._nOffset !== 0 || this._nOffRelative !== 0);
    };
    Offsets.prototype.getPositiveOffset = function (length) {
        if (this.hasPositiveOffset()) {
            if (this._version === BinaryConstants.BINARY_VERSION_2) {
                return this._pOffset;
            }
            else if (this._version === BinaryConstants.BINARY_VERSION_3) {
                return Math.round(this._pOffRelative * length / Offsets._PERCENTAGE);
            }
        }
        return 0;
    };
    Offsets.prototype.getNegativeOffset = function (length) {
        if (this.hasNegativeOffset()) {
            if (this._version === BinaryConstants.BINARY_VERSION_2) {
                return this._nOffset;
            }
            else if (this._version === BinaryConstants.BINARY_VERSION_3) {
                return Math.round(this._nOffRelative * length / Offsets._PERCENTAGE);
            }
        }
        return 0;
    };
    Offsets.fromValues = function (pOff, nOff) {
        var offsets = new Offsets();
        offsets._pOffset = pOff;
        offsets._nOffset = nOff;
        offsets._version = BinaryConstants.BINARY_VERSION_2;
        offsets._pOffRelative = 0.0;
        offsets._nOffRelative = 0.0;
        return offsets;
    };
    Offsets.fromRelativeValues = function (pOff, nOff) {
        var offsets = new Offsets();
        offsets._pOffset = 0;
        offsets._nOffset = 0;
        offsets._version = BinaryConstants.BINARY_VERSION_3;
        offsets._pOffRelative = pOff;
        offsets._nOffRelative = nOff;
        return offsets;
    };
    /** The Constant PERCENTAGE. */
    Offsets._PERCENTAGE = 100;
    return Offsets;
}());
exports.Offsets = Offsets;

});

unwrapExports(Offsets_1);
var Offsets_2 = Offsets_1.Offsets;

var RawLineLocationReference_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });


var RawLineLocationReference = /** @class */ (function (_super) {
    __extends(RawLineLocationReference, _super);
    function RawLineLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawLineLocationReference.prototype.getLocationReferencePoints = function () {
        return this._points;
    };
    RawLineLocationReference.prototype.getOffsets = function () {
        return this._offsets;
    };
    RawLineLocationReference.fromLineValues = function (id, points, offsets) {
        var rawLineLocationReference = new RawLineLocationReference();
        rawLineLocationReference._id = id;
        rawLineLocationReference._locationType = LocationType_1.LocationType.LINE_LOCATION;
        rawLineLocationReference._returnCode = null;
        rawLineLocationReference._points = points;
        rawLineLocationReference._offsets = offsets;
        return rawLineLocationReference;
    };
    return RawLineLocationReference;
}(RawLocationReference_1.RawLocationReference));
exports.RawLineLocationReference = RawLineLocationReference;

});

unwrapExports(RawLineLocationReference_1);
var RawLineLocationReference_2 = RawLineLocationReference_1.RawLineLocationReference;

var LineDecoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });








var LineDecoder = /** @class */ (function (_super) {
    __extends(LineDecoder, _super);
    function LineDecoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        // Calculate number of intermediates (integer division: get rid of possible offset information)
        var nrIntermediates = Math.floor((totalBytes - (BinaryConstants.MIN_BYTES_LINE_LOCATION)) / BinaryConstants.LRP_SIZE);
        // Read first location reference point
        var firstLRP = FirstLRP_1.FirstLRP.fromBitStreamInput(bitStreamInput);
        // Read intermediate location reference points
        var intermediates = [];
        for (var i = 0; i < nrIntermediates; i++) {
            var lrp = IntermediateLRP_1.IntermediateLRP.fromBitStreamInput(bitStreamInput);
            intermediates.push(lrp);
        }
        var lastLRP = LastLRP_1.LastLRP.fromBitStreamInput(bitStreamInput);
        var posOff = null;
        var negOff = null;
        // Check for positive offset and read in
        if (lastLRP.attrib4.pOffsetF === BinaryConstants.HAS_OFFSET) {
            posOff = Offset_1.Offset.fromBitStreamInput(bitStreamInput);
        }
        // Check for negative offset and read in
        if (lastLRP.attrib4.nOffsetF === BinaryConstants.HAS_OFFSET) {
            negOff = Offset_1.Offset.fromBitStreamInput(bitStreamInput);
        }
        var offsets = Offsets_1.Offsets.fromValues(0, 0);
        if (version === BinaryConstants.BINARY_VERSION_2) {
            var pOffValue = 0;
            var nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateDistanceEstimate(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateDistanceEstimate(negOff.offset);
            }
            offsets = Offsets_1.Offsets.fromValues(pOffValue, nOffValue);
        }
        else if (version === BinaryConstants.BINARY_VERSION_3) {
            var pOffValue = 0;
            var nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateRelativeDistance(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateRelativeDistance(negOff.offset);
            }
            offsets = Offsets_1.Offsets.fromRelativeValues(pOffValue, nOffValue);
        }
        var lrpCount = 1;
        var points = [];
        var p = this._createFirstLRP(lrpCount, firstLRP);
        lrpCount++;
        points.push(p);
        var prevLon = p.getLongitudeDeg();
        var prevLat = p.getLatitudeDeg();
        for (var _i = 0, intermediates_1 = intermediates; _i < intermediates_1.length; _i++) {
            var intermediate = intermediates_1[_i];
            var intermediatePoint = this._createIntermediateLRPFromLatitudeLongitude(lrpCount, intermediate, prevLon, prevLat);
            lrpCount++;
            points.push(intermediatePoint);
            prevLon = intermediatePoint.getLongitudeDeg();
            prevLat = intermediatePoint.getLatitudeDeg();
        }
        var lp = this._createLastLRP(lrpCount, lastLRP, prevLon, prevLat);
        points.push(lp);
        var rawLocRef = RawLineLocationReference_1.RawLineLocationReference.fromLineValues(id, points, offsets);
        if (binaryData !== null) {
            binaryData.negOffset = negOff;
            binaryData.posOffset = posOff;
            binaryData.lastLRP = lastLRP;
            binaryData.intermediates = intermediates;
            binaryData.firstLRP = firstLRP;
        }
        return rawLocRef;
    };
    return LineDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.LineDecoder = LineDecoder;

});

unwrapExports(LineDecoder_1);
var LineDecoder_2 = LineDecoder_1.LineDecoder;

var RawPointLocationReference_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var RawPointLocationReference = /** @class */ (function (_super) {
    __extends(RawPointLocationReference, _super);
    function RawPointLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawPointLocationReference.prototype.getLocationReferencePoints = function () {
        return this._points;
    };
    RawPointLocationReference.prototype.getOffsets = function () {
        return this._offsets;
    };
    RawPointLocationReference.prototype.getOrientation = function () {
        return this._orientation;
    };
    RawPointLocationReference.prototype.getSideOfRoad = function () {
        return this._sideOfRoad;
    };
    RawPointLocationReference.fromPointValues = function (id, locationType, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        var rawPointLocationReference = new RawPointLocationReference();
        rawPointLocationReference._id = id;
        rawPointLocationReference._locationType = locationType;
        rawPointLocationReference._returnCode = null;
        rawPointLocationReference._points = [lrp1, lrp2];
        rawPointLocationReference._offsets = offsets;
        rawPointLocationReference._orientation = orientation;
        rawPointLocationReference._sideOfRoad = sideOfRoad;
        return rawPointLocationReference;
    };
    return RawPointLocationReference;
}(RawLocationReference_1.RawLocationReference));
exports.RawPointLocationReference = RawPointLocationReference;

});

unwrapExports(RawPointLocationReference_1);
var RawPointLocationReference_2 = RawPointLocationReference_1.RawPointLocationReference;

var RawPointAlongLineLocationReference_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });


var RawPointAlongLineLocationReference = /** @class */ (function (_super) {
    __extends(RawPointAlongLineLocationReference, _super);
    function RawPointAlongLineLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawPointAlongLineLocationReference.fromPointAlongLineValues = function (id, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        var rawPointAlongLineLocationReference = new RawPointAlongLineLocationReference();
        rawPointAlongLineLocationReference._id = id;
        rawPointAlongLineLocationReference._locationType = LocationType_1.LocationType.POINT_ALONG_LINE;
        rawPointAlongLineLocationReference._returnCode = null;
        rawPointAlongLineLocationReference._points = [lrp1, lrp2];
        rawPointAlongLineLocationReference._offsets = offsets;
        rawPointAlongLineLocationReference._orientation = orientation;
        rawPointAlongLineLocationReference._sideOfRoad = sideOfRoad;
        return rawPointAlongLineLocationReference;
    };
    return RawPointAlongLineLocationReference;
}(RawPointLocationReference_1.RawPointLocationReference));
exports.RawPointAlongLineLocationReference = RawPointAlongLineLocationReference;

});

unwrapExports(RawPointAlongLineLocationReference_1);
var RawPointAlongLineLocationReference_2 = RawPointAlongLineLocationReference_1.RawPointAlongLineLocationReference;

var PointAlongLineDecoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });






var PointAlongLineDecoder = /** @class */ (function (_super) {
    __extends(PointAlongLineDecoder, _super);
    function PointAlongLineDecoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointAlongLineDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        var firstLRP = FirstLRP_1.FirstLRP.fromBitStreamInput(bitStreamInput);
        var lrp1 = this._createFirstLRP(1, firstLRP);
        var orientation = this._resolveOrientation(firstLRP.attrib1);
        var lastLRP = LastLRP_1.LastLRP.fromBitStreamInput(bitStreamInput);
        var lrp2 = this._createLastLRP(2, lastLRP, lrp1.getLongitudeDeg(), lrp1.getLatitudeDeg());
        var sideOfRoad = this._resolveSideOfRoad(lastLRP.attrib1);
        var offsets = Offsets_1.Offsets.fromValues(0, 0);
        var posOff = null;
        if (lastLRP.attrib4.pOffsetF === 1) {
            posOff = Offset_1.Offset.fromBitStreamInput(bitStreamInput);
            var rawLocRef = this._calculateRelativeDistance(posOff.offset);
            offsets = Offsets_1.Offsets.fromRelativeValues(rawLocRef, 0.0);
        }
        var rawLocationReference = RawPointAlongLineLocationReference_1.RawPointAlongLineLocationReference.fromPointAlongLineValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation);
        if (binaryData !== null) {
            binaryData.firstLRP = firstLRP;
            binaryData.lastLRP = lastLRP;
            binaryData.posOffset = posOff;
        }
        return rawLocationReference;
    };
    return PointAlongLineDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.PointAlongLineDecoder = PointAlongLineDecoder;

});

unwrapExports(PointAlongLineDecoder_1);
var PointAlongLineDecoder_2 = PointAlongLineDecoder_1.PointAlongLineDecoder;

var AbsoluteCoordinates_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var AbsoluteCoordinates = /** @class */ (function (_super) {
    __extends(AbsoluteCoordinates, _super);
    function AbsoluteCoordinates() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbsoluteCoordinates.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    };
    AbsoluteCoordinates.fromValues = function (longitude, latitude) {
        var absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._lon = longitude;
        absoluteCoordinates._lat = latitude;
        return absoluteCoordinates;
    };
    AbsoluteCoordinates.fromBitStreamInput = function (bitStreamInput) {
        var absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._read(bitStreamInput);
        return absoluteCoordinates;
    };
    /** Number of bits used for coordinate (absolute) */
    AbsoluteCoordinates._COORD_BITS = 24;
    return AbsoluteCoordinates;
}(AbstractCoordinate_1.AbstractCoordinate));
exports.AbsoluteCoordinates = AbsoluteCoordinates;

});

unwrapExports(AbsoluteCoordinates_1);
var AbsoluteCoordinates_2 = AbsoluteCoordinates_1.AbsoluteCoordinates;

var Line_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var Line = /** @class */ (function () {
    function Line() {
    }
    Line.prototype.intersectsLineValues = function (x1, y1, x2, y2) {
        return Line.linesIntersect(x1, y1, x2, y2, this._x1, this._y1, this._x2, this._y2);
    };
    Line.prototype.intersectsLineObject = function (line) {
        return Line.linesIntersect(line.x1, line.y1, line.x2, line.y2, this._x1, this._y1, this._x2, this._y2);
    };
    Line.fromValues = function (x1, y1, x2, y2) {
        var line = new Line();
        line._x1 = x1;
        line._y1 = y1;
        line._x2 = x2;
        line._y2 = y2;
        return line;
    };
    Object.defineProperty(Line.prototype, "x1", {
        get: function () {
            return this._x1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "y1", {
        get: function () {
            return this._y1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "x2", {
        get: function () {
            return this._x2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "y2", {
        get: function () {
            return this._y2;
        },
        enumerable: true,
        configurable: true
    });
    Line.relativeCCW = function (x1, y1, x2, y2, px, py) {
        x2 -= x1;
        y2 -= y1;
        px -= x1;
        py -= y1;
        var ccw = px * y2 - py * x2;
        if (ccw === 0.0) {
            ccw = px * x2 + py * y2;
            if (ccw > 0.0) {
                px -= x2;
                py -= y2;
                ccw = px * x2 + py * y2;
                if (ccw < 0.0) {
                    ccw = 0.0;
                }
            }
        }
        return (ccw < 0.0) ? -1 : ((ccw > 0.0) ? 1 : 0);
    };
    Line.linesIntersect = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        return ((Line.relativeCCW(x1, y1, x2, y2, x3, y3) * Line.relativeCCW(x1, y1, x2, y2, x4, y4) <= 0) && (Line.relativeCCW(x3, y3, x4, y4, x1, y1) * Line.relativeCCW(x3, y3, x4, y4, x2, y2) <= 0));
    };
    return Line;
}());
exports.Line = Line;

});

unwrapExports(Line_1);
var Line_2 = Line_1.Line;

var GeometryUtils_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


var BearingDirection;
(function (BearingDirection) {
    BearingDirection[BearingDirection["IN_DIRECTION"] = 1] = "IN_DIRECTION";
    BearingDirection[BearingDirection["AGAINST_DIRECTION"] = 2] = "AGAINST_DIRECTION";
})(BearingDirection = exports.BearingDirection || (exports.BearingDirection = {}));
var GeometryUtils = /** @class */ (function () {
    function GeometryUtils() {
        throw new Error('Cannot instantiate utility class');
    }
    GeometryUtils.geoCoordinatesDistance = function (coord1, coord2) {
        return GeometryUtils.latitudeLongitudeDistance(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg());
    };
    GeometryUtils.latitudeLongitudeDistance = function (longitude1, latitude1, longitude2, latitude2) {
        if (latitude2 === latitude1 && longitude2 === longitude1) {
            return 0.0;
        }
        var f = GeometryUtils._toRadians((latitude2 + latitude1) / 2.0);
        var g = GeometryUtils._toRadians((latitude2 - latitude1) / 2.0);
        var l = GeometryUtils._toRadians((longitude2 - longitude1) / 2.0);
        var sinF = Math.sin(f);
        var sinG = Math.sin(g);
        var cosF = Math.cos(f);
        var cosG = Math.cos(g);
        var sinl = Math.sin(l);
        var cosl = Math.cos(l);
        var s = sinG * sinG * cosl * cosl + cosF * cosF * sinl * sinl;
        if (s === 0) {
            return 0.0;
        }
        var c = cosG * cosG * cosl * cosl + sinF * sinF * sinl * sinl;
        if (c === 0) {
            return 0.0;
        }
        var w = Math.atan(Math.sqrt(s / c));
        if (w === 0) {
            return 0.0;
        }
        var d = 2 * w * GeometryUtils._EQUATORIAL_RADIUS;
        var r = Math.sqrt(s * c) / w;
        var h1 = (3 * r - 1.0) / (2 * c);
        var h2 = (3 * r + 1.0) / (2 * s);
        return d * (1 + GeometryUtils._OBLATENESS * h1 * sinF * sinF * cosG * cosG - GeometryUtils._OBLATENESS * h2 * cosF * cosF * sinG * sinG);
    };
    GeometryUtils.geoCoordinatesBearing = function (coord1, coord2) {
        return GeometryUtils.latitudeLongitudeBearing(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg());
    };
    GeometryUtils.latitudeLongitudeBearing = function (p1Longitude, p1Latitude, p2Longitude, p2Latitude) {
        var deltaX = (GeometryUtils._transformDecaMicroDeg(p2Longitude - p1Longitude)) * GeometryUtils._hMult(p2Latitude);
        var deltaY = GeometryUtils._transformDecaMicroDeg(p2Latitude - p1Latitude);
        var angle = GeometryUtils.toDegrees(Math.atan2(deltaX, deltaY));
        if (angle < 0) {
            angle += GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        return angle;
    };
    GeometryUtils.calculateLineBearing = function (line, dir, pointDistance, projectionAlongLine) {
        if (line === null) {
            return -1.0;
        }
        var p1 = null;
        var p2 = null;
        if (dir === BearingDirection.IN_DIRECTION) {
            if (projectionAlongLine > 0) {
                p1 = line.getGeoCoordinateAlongLine(projectionAlongLine);
                if (line.getLineLength() < projectionAlongLine + pointDistance) {
                    p2 = line.getEndNode().getGeoCoordinates();
                }
                else {
                    p2 = line.getGeoCoordinateAlongLine(projectionAlongLine + pointDistance);
                }
            }
            else {
                p1 = line.getStartNode().getGeoCoordinates();
                if (line.getLineLength() < pointDistance) {
                    p2 = line.getEndNode().getGeoCoordinates();
                }
                else {
                    p2 = line.getGeoCoordinateAlongLine(pointDistance);
                }
            }
        }
        else {
            if (projectionAlongLine > 0) {
                p1 = line.getGeoCoordinateAlongLine(projectionAlongLine);
                if (projectionAlongLine < pointDistance) {
                    p2 = line.getStartNode().getGeoCoordinates();
                }
                else {
                    p2 = line.getGeoCoordinateAlongLine(projectionAlongLine - pointDistance);
                }
            }
            else {
                p1 = line.getEndNode().getGeoCoordinates();
                if (line.getLineLength() < pointDistance) {
                    p2 = line.getStartNode().getGeoCoordinates();
                }
                else {
                    p2 = line.getGeoCoordinateAlongLine(line.getLineLength() - pointDistance);
                }
            }
        }
        return GeometryUtils.geoCoordinatesBearing(p1, p2);
    };
    GeometryUtils.checkCoordinateBounds = function (lon, lat) {
        return (lon >= GeometryUtils.MIN_LON && lon <= GeometryUtils.MAX_LON && lat >= GeometryUtils.MIN_LAT && lat <= GeometryUtils.MAX_LAT);
    };
    GeometryUtils.geoCoordinatesIntersectStraights = function (coord1, bear1, coord2, bear2) {
        return GeometryUtils.latitudeLongitudeIntersectStraights(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), bear1, coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), bear2);
    };
    GeometryUtils.latitudeLongitudeIntersectStraights = function (longitude1, latitude1, bear1, longitude2, latitude2, bear2) {
        var m1 = Math.tan(GeometryUtils.toRadians(GeometryUtils.QUARTER_CIRCLE - bear1));
        var m2 = Math.tan(GeometryUtils.toRadians(GeometryUtils.QUARTER_CIRCLE - bear2));
        var x;
        var y;
        if (bear1 === 0.0) {
            if (bear2 === 0.0) {
                return null;
            }
            x = longitude1;
            y = +m2 * (x - longitude2) + latitude2;
            if (!isFinite(x) || !isFinite(y)) {
                return null;
            }
            return GeoCoordinates_1.GeoCoordinates.fromValues(x, y);
        }
        if (bear2 === 0.0) {
            if (bear1 === 0.0) {
                return null;
            }
            x = longitude2;
            y = +m1 * (x - longitude1) + latitude1;
            if (!isFinite(x) || !isFinite(y)) {
                return null;
            }
            return GeoCoordinates_1.GeoCoordinates.fromValues(x, y);
        }
        if (isNaN(m1) || !isFinite(m1) || isNaN(m2) || !isFinite(m2)) {
            return null;
        }
        if (m1 === m2) {
            return null;
        }
        x = (m1 * longitude1 - m2 * longitude2 + latitude2 - latitude1) / (m1 - m2);
        y = latitude1 + m1 * (x - longitude1);
        if (!isFinite(x) || !isFinite(y)) {
            return null;
        }
        return GeoCoordinates_1.GeoCoordinates.fromValues(x, y);
    };
    GeometryUtils.lineIntersection = function (gc1Start, gc1End, gc2Start, gc2End) {
        var line1 = Line_1.Line.fromValues(gc1Start.getLongitudeDeg(), gc1Start.getLatitudeDeg(), gc1End.getLongitudeDeg(), gc1End.getLatitudeDeg());
        var line2 = Line_1.Line.fromValues(gc2Start.getLongitudeDeg(), gc2Start.getLatitudeDeg(), gc2End.getLongitudeDeg(), gc2End.getLatitudeDeg());
        return line1.intersectsLineObject(line2);
    };
    GeometryUtils.geoCoordinatesPointAlongLine = function (coord1, coord2, offset) {
        return GeometryUtils.latitudeLongitudePointAlongLine(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), offset);
    };
    GeometryUtils.latitudeLongitudePointAlongLine = function (longitudeA, latitudeA, longitudeB, latitudeB, offset) {
        var deltaX = Math.abs(longitudeB - longitudeA);
        var deltaY = latitudeB - latitudeA;
        if ((longitudeA > longitudeB)) {
            deltaX = -deltaX;
        }
        if (latitudeA < latitudeB) {
            if (deltaY < 0) {
                deltaY = -deltaY;
            }
        }
        else {
            if (deltaY > 0) {
                deltaY = -deltaY;
            }
        }
        deltaX *= offset;
        deltaY *= offset;
        var lon = longitudeA + deltaX;
        var lat = latitudeA + deltaY;
        return GeoCoordinates_1.GeoCoordinates.fromValues(lon, lat);
    };
    GeometryUtils.geoCoordinatesScaleUpperRightCoordinate = function (lowerLeft, upperRight, xFactor, yFactor) {
        return GeometryUtils.latitudeLongitudeScaleUpperRightCoordinate(lowerLeft.getLongitudeDeg(), lowerLeft.getLatitudeDeg(), upperRight.getLongitudeDeg(), upperRight.getLatitudeDeg(), xFactor, yFactor);
    };
    GeometryUtils.latitudeLongitudeScaleUpperRightCoordinate = function (lowerLeftLon, lowerLeftLat, upperRightLon, upperRightLat, xFactor, yFactor) {
        var newBottomRight = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, upperRightLon, lowerLeftLat, xFactor);
        var newTopLeft = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, lowerLeftLon, upperRightLat, yFactor);
        return GeoCoordinates_1.GeoCoordinates.fromValues(newBottomRight.getLongitudeDeg(), newTopLeft.getLatitudeDeg());
    };
    GeometryUtils.roundDefault = function (val) {
        return GeometryUtils.roundDecimalPlaces(val, GeometryUtils._DEFAULT_PRECISION);
    };
    GeometryUtils.roundDecimalPlaces = function (val, decimalPlaces) {
        return Math.round(val * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    };
    GeometryUtils.geoCoordinatesDetermineCoordinateInDistance = function (coord, angle, distanceKm) {
        return GeometryUtils.latitudeLongitudeDetermineCoordinateInDistance(coord.getLongitudeDeg(), coord.getLatitudeDeg(), angle, distanceKm);
    };
    GeometryUtils.latitudeLongitudeDetermineCoordinateInDistance = function (lon, lat, angle, distanceKm) {
        var lat1 = lat * Math.PI / GeometryUtils.HALF_CIRCLE;
        var az12 = angle * Math.PI / GeometryUtils.HALF_CIRCLE;
        var sinu1 = Math.sin(lat1);
        var cosu1 = Math.cos(lat1);
        var az12cos = Math.cos(az12);
        var az12sin = Math.sin(az12);
        var sina = cosu1 * az12sin;
        var ss = Math.sin(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
        var cs = Math.cos(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
        var g = sinu1 * ss - cosu1 * cs * az12cos;
        var lat2 = Math.atan(((sinu1 * cs + cosu1 * ss * az12cos) / (Math.sqrt(sina * sina + g * g)))) * GeometryUtils.HALF_CIRCLE / Math.PI;
        var lon2 = lon + Math.atan(ss * az12sin / (cosu1 * cs - sinu1 * ss * az12cos)) * GeometryUtils.HALF_CIRCLE / Math.PI + (2 * GeometryUtils.FULL_CIRCLE_DEGREE);
        while (lat2 > GeometryUtils.QUARTER_CIRCLE) {
            lat2 = lat2 - GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        while (lon2 > GeometryUtils.HALF_CIRCLE) {
            lon2 = lon2 - GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        return GeoCoordinates_1.GeoCoordinates.fromValues(lon2, lat2);
    };
    GeometryUtils.toDegrees = function (radians) {
        return radians * (180 / Math.PI);
    };
    GeometryUtils.toRadians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    GeometryUtils._toRadians = function (value) {
        return value * GeometryUtils._RAD_FACTOR;
    };
    GeometryUtils._transformDecaMicroDeg = function (val) {
        return val * GeometryUtils._DIVISIONS_PER_DEGREE;
    };
    GeometryUtils._hMult = function (y) {
        return Math.cos(y * GeometryUtils._RAD_FACTOR);
    };
    GeometryUtils.bearingDirection = {
        IN_DIRECTION: BearingDirection.IN_DIRECTION,
        AGAINST_DIRECTION: BearingDirection.AGAINST_DIRECTION
    };
    /** Degree in a full circle */
    GeometryUtils.FULL_CIRCLE_DEGREE = 360;
    /** The Constant MAX_LAT. */
    GeometryUtils.MAX_LAT = 90;
    /** The Constant MIN_LAT. */
    GeometryUtils.MIN_LAT = -90;
    /** The Constant MAX_LON. */
    GeometryUtils.MAX_LON = 180;
    /** The Constant MIN_LON. */
    GeometryUtils.MIN_LON = -180;
    /** The Constant ZERO_CIRCLE. */
    GeometryUtils.ZERO_CIRCLE = 0;
    /** The Constant HALF_CIRCLE. */
    GeometryUtils.HALF_CIRCLE = 180;
    /** The Constant QUARTER_CIRCLE. */
    GeometryUtils.QUARTER_CIRCLE = 90;
    /** The Constant QUARTER_CIRCLE. */
    GeometryUtils.THREE_QUARTER_CIRCLE = 270;
    /** The default precision for rounding coordinate values. */
    GeometryUtils._DEFAULT_PRECISION = 5;
    /** The Constant METER_PER_KILOMETER. */
    GeometryUtils._METER_PER_KILOMETER = 1000.0;
    /** The Constant divisionsPerDegree. */
    GeometryUtils._DIVISIONS_PER_DEGREE = 100000; // 1000 * 100;
    /** = DIVISIONS_PER_DEGREE / DIVISIONS_PER_RADIAN */
    GeometryUtils._RAD_FACTOR = 0.017453292519943294;
    /** The equatorial radius in meters */
    GeometryUtils._EQUATORIAL_RADIUS = 6378137; // meter
    /** The Constant INVERSE_FLATTENING. */
    GeometryUtils._INVERSE_FLATTENING = 298.257223563;
    /** The Constant OBLATENESS. */
    GeometryUtils._OBLATENESS = 1 / GeometryUtils._INVERSE_FLATTENING;
    return GeometryUtils;
}());
exports.GeometryUtils = GeometryUtils;

});

unwrapExports(GeometryUtils_1);
var GeometryUtils_2 = GeometryUtils_1.BearingDirection;
var GeometryUtils_3 = GeometryUtils_1.GeometryUtils;

var GeoCoordinates_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var GeoCoordinates = /** @class */ (function () {
    function GeoCoordinates() {
    }
    GeoCoordinates.prototype.getLatitudeDeg = function () {
        return this._latitude;
    };
    GeoCoordinates.prototype.getLongitudeDeg = function () {
        return this._longitude;
    };
    GeoCoordinates.fromValues = function (longitude, latitude) {
        if (!GeometryUtils_1.GeometryUtils.checkCoordinateBounds(longitude, latitude)) {
            throw new Error('Coordinates out of bounds');
        }
        var geoCoordinates = new GeoCoordinates();
        geoCoordinates._longitude = longitude;
        geoCoordinates._latitude = latitude;
        return geoCoordinates;
    };
    return GeoCoordinates;
}());
exports.GeoCoordinates = GeoCoordinates;

});

unwrapExports(GeoCoordinates_1);
var GeoCoordinates_2 = GeoCoordinates_1.GeoCoordinates;

var RawGeoCoordLocationReference_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });


var RawGeoCoordLocationReference = /** @class */ (function (_super) {
    __extends(RawGeoCoordLocationReference, _super);
    function RawGeoCoordLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawGeoCoordLocationReference.prototype.getGeoCoordinates = function () {
        return this._geoCoord;
    };
    RawGeoCoordLocationReference.fromGeoCoordValues = function (id, geoCoord) {
        var rawGeoCoordLocationReference = new RawGeoCoordLocationReference();
        rawGeoCoordLocationReference._id = id;
        rawGeoCoordLocationReference._locationType = LocationType_1.LocationType.GEO_COORDINATES;
        rawGeoCoordLocationReference._returnCode = null;
        rawGeoCoordLocationReference._geoCoord = geoCoord;
        return rawGeoCoordLocationReference;
    };
    return RawGeoCoordLocationReference;
}(RawPointLocationReference_1.RawPointLocationReference));
exports.RawGeoCoordLocationReference = RawGeoCoordLocationReference;

});

unwrapExports(RawGeoCoordLocationReference_1);
var RawGeoCoordLocationReference_2 = RawGeoCoordLocationReference_1.RawGeoCoordLocationReference;

var GeoCoordDecoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });




var GeoCoordDecoder = /** @class */ (function (_super) {
    __extends(GeoCoordDecoder, _super);
    function GeoCoordDecoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoCoordDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        var absCoord = AbsoluteCoordinates_1.AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        var geoCoord = GeoCoordinates_1.GeoCoordinates.fromValues(this._calculate32BitRepresentation(absCoord.lon), this._calculate32BitRepresentation(absCoord.lat));
        var rawLocRef = RawGeoCoordLocationReference_1.RawGeoCoordLocationReference.fromGeoCoordValues(id, geoCoord);
        if (binaryData !== null) {
            binaryData.absCoord = absCoord;
        }
        return rawLocRef;
    };
    return GeoCoordDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.GeoCoordDecoder = GeoCoordDecoder;

});

unwrapExports(GeoCoordDecoder_1);
var GeoCoordDecoder_2 = GeoCoordDecoder_1.GeoCoordDecoder;

var RelativeCoordinates_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var RelativeCoordinates = /** @class */ (function (_super) {
    __extends(RelativeCoordinates, _super);
    function RelativeCoordinates() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelativeCoordinates.prototype.put = function (bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    };
    RelativeCoordinates.fromValues = function (longitude, latitude) {
        var relativeCoordinates = new RelativeCoordinates();
        relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
        relativeCoordinates._lon = longitude;
        relativeCoordinates._lat = latitude;
        return relativeCoordinates;
    };
    RelativeCoordinates.fromBitStreamInput = function (bitStreamInput) {
        var relativeCoordinates = new RelativeCoordinates();
        relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
        relativeCoordinates._read(bitStreamInput);
        return relativeCoordinates;
    };
    /** Number of bits used for coordinates (relative) */
    RelativeCoordinates._COORD_BITS = 16;
    return RelativeCoordinates;
}(AbstractCoordinate_1.AbstractCoordinate));
exports.RelativeCoordinates = RelativeCoordinates;

});

unwrapExports(RelativeCoordinates_1);
var RelativeCoordinates_2 = RelativeCoordinates_1.RelativeCoordinates;

var RawPolygonLocationReference_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });


var RawPolygonLocationReference = /** @class */ (function (_super) {
    __extends(RawPolygonLocationReference, _super);
    function RawPolygonLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawPolygonLocationReference.prototype.getCornerPoints = function () {
        return this._corners;
    };
    RawPolygonLocationReference.fromPolygonValues = function (id, corners) {
        var rawPolygonLocationReference = new RawPolygonLocationReference();
        rawPolygonLocationReference._id = id;
        rawPolygonLocationReference._locationType = LocationType_1.LocationType.POLYGON;
        rawPolygonLocationReference._returnCode = null;
        rawPolygonLocationReference._corners = corners;
        return rawPolygonLocationReference;
    };
    return RawPolygonLocationReference;
}(RawLocationReference_1.RawLocationReference));
exports.RawPolygonLocationReference = RawPolygonLocationReference;

});

unwrapExports(RawPolygonLocationReference_1);
var RawPolygonLocationReference_2 = RawPolygonLocationReference_1.RawPolygonLocationReference;

var PolygonDecoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });






var PolygonDecoder = /** @class */ (function (_super) {
    __extends(PolygonDecoder, _super);
    function PolygonDecoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PolygonDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        var remainingBytes = totalBytes - (BinaryConstants.HEADER_SIZE + BinaryConstants.ABS_COORD_SIZE);
        var numRemainingCorners = remainingBytes / BinaryConstants.RELATIVE_COORD_SIZE;
        var cornersCoords = [];
        var firstCornerAbsCoord = AbsoluteCoordinates_1.AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        var firstCornerCoord = GeoCoordinates_1.GeoCoordinates.fromValues(this._calculate32BitRepresentation(firstCornerAbsCoord.lon), this._calculate32BitRepresentation(firstCornerAbsCoord.lat));
        cornersCoords.push(firstCornerCoord);
        var prevCornerAbsCoord = firstCornerAbsCoord;
        for (var i = 0; i < numRemainingCorners; i++) {
            var remainingCoord = RelativeCoordinates_1.RelativeCoordinates.fromBitStreamInput(bitStreamInput);
            var lon = this._calculate32BitRepresentation(prevCornerAbsCoord.lon) + Math.fround(remainingCoord.lon / BinaryConstants.DECA_MICRO_DEG_FACTOR);
            var lat = this._calculate32BitRepresentation(prevCornerAbsCoord.lat) + Math.fround(remainingCoord.lat / BinaryConstants.DECA_MICRO_DEG_FACTOR);
            var cornerCoord = GeoCoordinates_1.GeoCoordinates.fromValues(lon, lat);
            cornersCoords.push(cornerCoord);
            prevCornerAbsCoord = AbsoluteCoordinates_1.AbsoluteCoordinates.fromValues(this._get24BitRepresentation(cornerCoord.getLongitudeDeg()), this._get24BitRepresentation(cornerCoord.getLatitudeDeg()));
        }
        var rawLocRef = RawPolygonLocationReference_1.RawPolygonLocationReference.fromPolygonValues(id, cornersCoords);
        return rawLocRef;
    };
    return PolygonDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.PolygonDecoder = PolygonDecoder;

});

unwrapExports(PolygonDecoder_1);
var PolygonDecoder_2 = PolygonDecoder_1.PolygonDecoder;

var RawCircleLocationReference_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });


var RawCircleLocationReference = /** @class */ (function (_super) {
    __extends(RawCircleLocationReference, _super);
    function RawCircleLocationReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RawCircleLocationReference.prototype.getCenterPoint = function () {
        return this._center;
    };
    RawCircleLocationReference.prototype.getRadius = function () {
        return this._radius;
    };
    RawCircleLocationReference.fromCircleValues = function (id, center, radius) {
        var rawCircleLocationReference = new RawCircleLocationReference();
        rawCircleLocationReference._id = id;
        rawCircleLocationReference._locationType = LocationType_1.LocationType.CIRCLE;
        rawCircleLocationReference._center = center;
        rawCircleLocationReference._radius = radius;
        return rawCircleLocationReference;
    };
    return RawCircleLocationReference;
}(RawPointLocationReference_1.RawPointLocationReference));
exports.RawCircleLocationReference = RawCircleLocationReference;

});

unwrapExports(RawCircleLocationReference_1);
var RawCircleLocationReference_2 = RawCircleLocationReference_1.RawCircleLocationReference;

var Radius_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var RadiusType;
(function (RadiusType) {
    /** Small radius (BINARY_VERSION_3: up to 255m) */
    RadiusType[RadiusType["SMALL"] = 1] = "SMALL";
    /** Medium radius (BINARY_VERSION_3: up to 65536m) */
    RadiusType[RadiusType["MEDIUM"] = 2] = "MEDIUM";
    /** Large radius (BINARY_VERSION_3: up to 16777216m) */
    RadiusType[RadiusType["LARGE"] = 3] = "LARGE";
    /** Extra large radius (BINARY_VERSION_3: up to 4294967296m) */
    RadiusType[RadiusType["EXTRA_LARGE"] = 4] = "EXTRA_LARGE";
    /** Unknown radius type */
    RadiusType[RadiusType["UNKNOWN"] = 0] = "UNKNOWN";
})(RadiusType = exports.RadiusType || (exports.RadiusType = {}));
exports.resolveRadius = function (bytes) {
    return bytes >= RadiusType.UNKNOWN && bytes <= RadiusType.EXTRA_LARGE ? bytes : RadiusType.UNKNOWN;
};
var Radius = /** @class */ (function () {
    function Radius() {
    }
    Radius.prototype.put = function (bitStreamOutput) {
        if (this._radius <= Radius._MAX_RADIUS_SMALL) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.SMALL_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_MEDIUM) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.MEDIUM_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.LARGE_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_EXTRA_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);
        }
        else {
            throw new Error('Invalid range');
        }
    };
    Radius.fromValues = function (radiusValue) {
        var radius = new Radius();
        radius._radius = radiusValue;
        return radius;
    };
    Radius.fromBitStreamInput = function (bitStreamInput, type) {
        var radius = new Radius();
        switch (type) {
            case RadiusType.SMALL:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.SMALL_RADIUS_BITS));
                break;
            case RadiusType.MEDIUM:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.MEDIUM_RADIUS_BITS));
                break;
            case RadiusType.LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.LARGE_RADIUS_BITS));
                break;
            case RadiusType.EXTRA_LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.EXTRA_LARGE_RADIUS_BITS));
                break;
            default:
                throw new Error('Invalid value range');
        }
        return radius;
    };
    Object.defineProperty(Radius.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        enumerable: true,
        configurable: true
    });
    Radius._intToLong = function (integer) {
        if (integer < 0) {
            return integer & (Radius._MAX_RADIUS_EXTRA_LARGE - 1);
        }
        else {
            return integer;
        }
    };
    /** The Constant MAX_RADIUS_SMALL. */
    Radius._MAX_RADIUS_SMALL = Math.pow(2, BinaryConstants.SMALL_RADIUS_BITS);
    /** The Constant MAX_RADIUS_MEDIUM. */
    Radius._MAX_RADIUS_MEDIUM = Math.pow(2, BinaryConstants.MEDIUM_RADIUS_BITS);
    /** The Constant MAX_RADIUS_LARGE. */
    Radius._MAX_RADIUS_LARGE = Math.pow(2, BinaryConstants.LARGE_RADIUS_BITS);
    /** The Constant MAX_RADIUS_EXTRA_LARGE. */
    Radius._MAX_RADIUS_EXTRA_LARGE = Math.pow(2, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);
    return Radius;
}());
exports.Radius = Radius;

});

unwrapExports(Radius_1);
var Radius_2 = Radius_1.RadiusType;
var Radius_3 = Radius_1.resolveRadius;
var Radius_4 = Radius_1.Radius;

var CircleDecoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });






var CircleDecoder = /** @class */ (function (_super) {
    __extends(CircleDecoder, _super);
    function CircleDecoder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_SIZE = BinaryConstants.HEADER_SIZE + BinaryConstants.ABS_COORD_SIZE;
        return _this;
    }
    CircleDecoder.prototype.decodeData = function (id, bitStreamInput, totalBytes, version, binaryData) {
        var radiusSize = totalBytes - this.BASE_SIZE;
        var rt = Radius_1.resolveRadius(radiusSize);
        var absCoord = AbsoluteCoordinates_1.AbsoluteCoordinates.fromBitStreamInput(bitStreamInput);
        var geoCoord = GeoCoordinates_1.GeoCoordinates.fromValues(this._calculate32BitRepresentation(absCoord.lon), this._calculate32BitRepresentation(absCoord.lat));
        var radius = Radius_1.Radius.fromBitStreamInput(bitStreamInput, rt);
        var rawLocRef = RawCircleLocationReference_1.RawCircleLocationReference.fromCircleValues(id, geoCoord, radius.radius);
        if (binaryData !== null) {
            binaryData.absCoord = absCoord;
        }
        return rawLocRef;
    };
    return CircleDecoder;
}(AbstractDecoder_1.AbstractDecoder));
exports.CircleDecoder = CircleDecoder;

});

unwrapExports(CircleDecoder_1);
var CircleDecoder_2 = CircleDecoder_1.CircleDecoder;

var RawBinaryData_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var RawBinaryData = /** @class */ (function () {
    function RawBinaryData() {
    }
    return RawBinaryData;
}());
exports.RawBinaryData = RawBinaryData;

});

unwrapExports(RawBinaryData_1);
var RawBinaryData_2 = RawBinaryData_1.RawBinaryData;

var BinaryDecoder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });











var BinaryDecoder = /** @class */ (function () {
    function BinaryDecoder() {
    }
    BinaryDecoder.prototype.decodeData = function (locationReference) {
        var data = locationReference.getLocationReferenceData();
        if (data === null) {
            return RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(locationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.NOT_ENOUGH_BYTES);
        }
        else {
            return this._parseBinaryData(locationReference.getId(), data, null);
        }
    };
    BinaryDecoder.prototype.getDataFormatIdentifier = function () {
        return BinaryConstants.IDENTIFIER;
    };
    BinaryDecoder.prototype.resolveBinaryData = function (id, data) {
        var binaryData = new RawBinaryData_1.RawBinaryData();
        this._parseBinaryData(id, data, binaryData);
        return binaryData;
    };
    BinaryDecoder.prototype._checkVersion = function (header) {
        var ver = header.ver;
        for (var _i = 0, _a = BinaryDecoder._VERSIONS; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v === ver) {
                return true;
            }
        }
        return false;
    };
    BinaryDecoder.prototype._parseBinaryData = function (id, data, binaryData) {
        var totalBytes = data.length;
        // Check if enough bytes available
        if (totalBytes < Math.min(BinaryConstants.MIN_BYTES_LINE_LOCATION, Math.min(Math.min(BinaryConstants.MIN_BYTES_POINT_LOCATION, BinaryConstants.MIN_BYTES_POLYGON), BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION))) {
            return RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.NOT_ENOUGH_BYTES);
        }
        // Read in data
        var bitStreamInput = BitStreamInput_1.BitStreamInput.fromBufferAndLength(data, totalBytes);
        var header;
        // Read header information
        try {
            header = Header_1.Header.fromBitStreamInput(bitStreamInput);
            if (binaryData !== null) {
                binaryData.header = header;
            }
        }
        catch (error) {
            return RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.READING_HEADER_FAILURE);
        }
        // Check version
        if (!this._checkVersion(header)) {
            return RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION);
        }
        var isPointLocation = header.pf === BinaryConstants.IS_POINT;
        var hasAttributes = header.af === BinaryConstants.HAS_ATTRIBUTES;
        var areaLocationCode = header.arf;
        var isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        var rawLocRef = null;
        var decoder = null;
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            decoder = new LineDecoder_1.LineDecoder();
        }
        else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants.GEOCOORD_SIZE) {
                    decoder = new GeoCoordDecoder_1.GeoCoordDecoder();
                }
                else {
                    rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
                }
            }
            else {
                if (totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    decoder = new PointAlongLineDecoder_1.PointAlongLineDecoder();
                }
                else if (totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    // decoder = new PoiAccessDecoder();
                    throw new Error('PoiAccessDecider not implemented');
                }
                else {
                    rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
                }
            }
        }
        else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
                // decoder = new ClosedLineDecoder();
                throw new Error('ClosedLineDecoder not implemented');
            }
            else {
                rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
            }
        }
        else {
            switch (areaLocationCode) {
                case BinaryConstants.AREA_CODE_CIRCLE:
                    decoder = new CircleDecoder_1.CircleDecoder();
                    break;
                case BinaryConstants.AREA_CODE_RECTANGLE:
                    /* includes case OpenLRBinaryConstants.AREA_CODE_GRID */
                    if (totalBytes === BinaryConstants.RECTANGLE_SIZE || totalBytes === BinaryConstants.LARGE_RECTANGLE_SIZE) {
                        // decoder = new RectangleDecoder();
                        throw new Error('RectangleDecoder not implemented');
                    }
                    else if (totalBytes === BinaryConstants.GRID_SIZE || totalBytes === BinaryConstants.LARGE_GRID_SIZE) {
                        // decoder = new GridDecoder();
                        throw new Error('GridDecoder not implemented');
                    }
                    else {
                        rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
                    }
                    break;
                case BinaryConstants.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants.MIN_BYTES_POLYGON) {
                        decoder = new PolygonDecoder_1.PolygonDecoder();
                    }
                    else {
                        rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BYTE_SIZE);
                    }
                    break;
                default:
                    rawLocRef = RawInvalidLocationReference_1.RawInvalidLocationReference.fromIdAndStatusCode(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_HEADER);
            }
        }
        if (decoder !== null) {
            rawLocRef = decoder.decodeData(id, bitStreamInput, totalBytes, header.ver, binaryData);
        }
        return rawLocRef;
    };
    BinaryDecoder.getVersions = function () {
        return BinaryDecoder._VERSIONS;
    };
    BinaryDecoder._VERSIONS = [2, 3];
    return BinaryDecoder;
}());
exports.BinaryDecoder = BinaryDecoder;

});

unwrapExports(BinaryDecoder_1);
var BinaryDecoder_2 = BinaryDecoder_1.BinaryDecoder;

var LocationReference_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });





var LocationReference = /** @class */ (function () {
    function LocationReference() {
    }
    LocationReference.prototype.getReturnCode = function () {
        return this._returnCode;
    };
    LocationReference.prototype.getId = function () {
        return this._id;
    };
    LocationReference.prototype.isValid = function () {
        return this._returnCode === null;
    };
    LocationReference.prototype.getDataIdentifier = function () {
        return BinaryConstants.IDENTIFIER;
    };
    LocationReference.prototype.getLocationReferenceData = function () {
        if (this.isValid()) {
            return this._data;
        }
        else {
            return null;
        }
    };
    LocationReference.prototype.getLocationType = function () {
        return this._locationType;
    };
    LocationReference.prototype.getVersion = function () {
        return this._version;
    };
    LocationReference.fromIdAndBuffer = function (id, data) {
        var locationReference = new LocationReference();
        locationReference._id = id;
        locationReference._data = data;
        locationReference._returnCode = null;
        locationReference._locationType = LocationReference._resolveLocationType(data);
        var version = LocationReference._resolveVersion(data);
        if (!LocationReference._checkVersion(version)) {
            throw new Error('Invalid version');
        }
        locationReference._version = version;
        return locationReference;
    };
    LocationReference.fromValues = function (id, returnCode, locationType, version) {
        var locationReference = new LocationReference();
        locationReference._id = id;
        locationReference._data = null;
        locationReference._returnCode = returnCode;
        locationReference._locationType = locationType;
        locationReference._version = version;
        return locationReference;
    };
    LocationReference._checkVersion = function (ver) {
        for (var _i = 0, _a = BinaryDecoder_1.BinaryDecoder.getVersions(); _i < _a.length; _i++) {
            var v = _a[_i];
            if (ver === v) {
                return true;
            }
        }
        return false;
    };
    LocationReference._resolveVersion = function (data) {
        if (data === null || data.length === 0) {
            throw new Error('Invalid binary data');
        }
        return data[0] & LocationReference._VERSION_MASK;
    };
    LocationReference._resolveLocationType = function (data) {
        var locationType = null;
        var totalBytes = data.length;
        var bitStreamInput = BitStreamInput_1.BitStreamInput.fromBufferAndLength(data, totalBytes);
        var header = Header_1.Header.fromBitStreamInput(bitStreamInput);
        var hasAttributes = header.af === BinaryConstants.HAS_ATTRIBUTES;
        var isPointLocation = header.pf === BinaryConstants.IS_POINT;
        var areaLocationCode = header.arf;
        var isAreaLocation = ((areaLocationCode === 0 && !isPointLocation && !hasAttributes) || areaLocationCode > 0);
        if (!isPointLocation && !isAreaLocation && hasAttributes) {
            locationType = LocationType_1.LocationType.LINE_LOCATION;
        }
        else if (isPointLocation && !isAreaLocation) {
            if (!hasAttributes) {
                if (totalBytes === BinaryConstants.GEOCOORD_SIZE) {
                    locationType = LocationType_1.LocationType.GEO_COORDINATES;
                }
                else {
                    throw new Error('Byte size does not match geo coordinate location');
                }
            }
            else {
                if (totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE || totalBytes === BinaryConstants.POINT_ALONG_LINE_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    locationType = LocationType_1.LocationType.POINT_ALONG_LINE;
                }
                else if (totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE || totalBytes === BinaryConstants.POINT_WITH_ACCESS_SIZE + BinaryConstants.POINT_OFFSET_SIZE) {
                    locationType = LocationType_1.LocationType.POI_WITH_ACCESS_POINT;
                }
                else {
                    throw new Error('Bye size does not match point location');
                }
            }
        }
        else if (isAreaLocation && !isPointLocation && hasAttributes) {
            if (totalBytes >= BinaryConstants.MIN_BYTES_CLOSED_LINE_LOCATION) {
                locationType = LocationType_1.LocationType.CLOSED_LINE;
            }
            else {
                throw new Error('Byte size does not match closed line location');
            }
        }
        else {
            switch (areaLocationCode) {
                case BinaryConstants.AREA_CODE_CIRCLE:
                    locationType = LocationType_1.LocationType.CIRCLE;
                    break;
                case BinaryConstants.AREA_CODE_RECTANGLE:
                    /* Includes case BinaryConstants.AREA_CODE_GRID */
                    if (totalBytes === BinaryConstants.RECTANGLE_SIZE || totalBytes === BinaryConstants.LARGE_RECTANGLE_SIZE) {
                        locationType = LocationType_1.LocationType.RECTANGLE;
                    }
                    else if (totalBytes === BinaryConstants.GRID_SIZE || totalBytes === BinaryConstants.LARGE_GRID_SIZE) {
                        locationType = LocationType_1.LocationType.GRID;
                    }
                    else {
                        throw new Error('Byte size does not match area rectangle location');
                    }
                    break;
                case BinaryConstants.AREA_CODE_POLYGON:
                    if (!hasAttributes && totalBytes >= BinaryConstants.MIN_BYTES_POLYGON) {
                        locationType = LocationType_1.LocationType.POLYGON;
                    }
                    else {
                        throw new Error('Byte size does not match polygon location');
                    }
                    break;
                default:
                    throw new Error('Byte size does not match area location');
            }
        }
        return locationType;
    };
    /** The Constant VERSION_MASK. */
    LocationReference._VERSION_MASK = 7;
    return LocationReference;
}());
exports.LocationReference = LocationReference;

});

unwrapExports(LocationReference_1);
var LocationReference_2 = LocationReference_1.LocationReference;

var Attr5_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var Attr5 = /** @class */ (function (_super) {
    __extends(Attr5, _super);
    function Attr5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr5.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(Attr5._RFU_VALUE, Attr5._NR_RFU);
        bitStreamOutput.putBits(this._frc, Attr5._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr5._FOW_BITS);
    };
    Attr5.fromValues = function (frc, fow) {
        var attr5 = new Attr5();
        attr5._frc = frc;
        attr5._fow = fow;
        return attr5;
    };
    Attr5.fromBitStreamInput = function (bitStreamInput) {
        var rfu = bitStreamInput.getBits(Attr5._NR_RFU);
        if (rfu !== Attr5._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        var attr5 = new Attr5();
        attr5._frc = bitStreamInput.getBits(Attr5._FRC_BITS);
        attr5._fow = bitStreamInput.getBits(Attr5._FOW_BITS);
        return attr5;
    };
    Object.defineProperty(Attr5.prototype, "frc", {
        get: function () {
            return this._frc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attr5.prototype, "fow", {
        get: function () {
            return this._fow;
        },
        enumerable: true,
        configurable: true
    });
    /** The Constant RFU. */
    Attr5._NR_RFU = 2;
    /** Number of bits used for frc */
    Attr5._FRC_BITS = 3;
    /** Number of bits used for fow */
    Attr5._FOW_BITS = 3;
    return Attr5;
}(BinaryInformation_1.BinaryInformation));
exports.Attr5 = Attr5;

});

unwrapExports(Attr5_1);
var Attr5_2 = Attr5_1.Attr5;

var Attr6_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var Attr6 = /** @class */ (function (_super) {
    __extends(Attr6, _super);
    function Attr6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attr6.prototype.put = function (bitStreamOutput) {
        bitStreamOutput.putBits(Attr6._RFU_VALUE, Attr6._NR_RFU);
        bitStreamOutput.putBits(this._bear, Attr6._BEAR_BITS);
    };
    Attr6.fromValues = function (bear) {
        var attr6 = new Attr6();
        attr6._bear = bear;
        return attr6;
    };
    Attr6.fromBitStreamInput = function (bitStreamInput) {
        var rfu = bitStreamInput.getBits(Attr6._NR_RFU);
        if (rfu !== Attr6._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        var attr6 = new Attr6();
        attr6._bear = bitStreamInput.getBits(Attr6._BEAR_BITS);
        return attr6;
    };
    Object.defineProperty(Attr6.prototype, "bear", {
        get: function () {
            return this._bear;
        },
        enumerable: true,
        configurable: true
    });
    /** number of bits used for lfrcnp */
    Attr6._NR_RFU = 3;
    /** number of bits used for bear */
    Attr6._BEAR_BITS = 5;
    return Attr6;
}(BinaryInformation_1.BinaryInformation));
exports.Attr6 = Attr6;

});

unwrapExports(Attr6_1);
var Attr6_2 = Attr6_1.Attr6;

var LastClosedLineLRP_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });



var LastClosedLineLRP = /** @class */ (function (_super) {
    __extends(LastClosedLineLRP, _super);
    function LastClosedLineLRP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LastClosedLineLRP.prototype.put = function (bitStreamOutput) {
        this._attrib5.put(bitStreamOutput);
        this._attrib6.put(bitStreamOutput);
    };
    LastClosedLineLRP.fromValues = function (attrib5, attrib6) {
        var lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = attrib5;
        lastClosedLineLrp._attrib6 = attrib6;
        return lastClosedLineLrp;
    };
    LastClosedLineLRP.fromBitStreamInput = function (bitStreamInput) {
        var lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = Attr5_1.Attr5.fromBitStreamInput(bitStreamInput);
        lastClosedLineLrp._attrib6 = Attr6_1.Attr6.fromBitStreamInput(bitStreamInput);
        return lastClosedLineLrp;
    };
    Object.defineProperty(LastClosedLineLRP.prototype, "attrib5", {
        get: function () {
            return this._attrib5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LastClosedLineLRP.prototype, "attrib6", {
        get: function () {
            return this._attrib6;
        },
        enumerable: true,
        configurable: true
    });
    return LastClosedLineLRP;
}(BinaryInformation_1.BinaryInformation));
exports.LastClosedLineLRP = LastClosedLineLRP;

});

unwrapExports(LastClosedLineLRP_1);
var LastClosedLineLRP_2 = LastClosedLineLRP_1.LastClosedLineLRP;

var AbstractEncoder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });





















var AbstractEncoder = /** @class */ (function () {
    function AbstractEncoder() {
    }
    AbstractEncoder.prototype.encodeData = function (rawLocationReference, version) {
        throw new Error('This method is abstract');
    };
    AbstractEncoder.prototype._checkOffsets = function (offsets, positiveDirection, locationReferences) {
        var length = 0;
        var value = -1;
        if (positiveDirection) {
            length = locationReferences[0].getDistanceToNext();
            value = offsets.getPositiveOffset(length);
        }
        else {
            length = locationReferences[locationReferences.length - 2].getDistanceToNext();
            value = offsets.getNegativeOffset(length);
        }
        return value <= length;
    };
    AbstractEncoder.prototype._generateOffset = function (offsets, positiveDirection, version, locationReferences) {
        var length = 0;
        var value = -1;
        if (positiveDirection) {
            length = locationReferences[0].getDistanceToNext();
            value = offsets.getPositiveOffset(length);
        }
        else {
            length = locationReferences[locationReferences.length - 2].getDistanceToNext();
            value = offsets.getNegativeOffset(length);
        }
        var offset = null;
        if (value > 0) {
            var offValue = -1;
            if (version === BinaryConstants.BINARY_VERSION_2) {
                offValue = this._calculateLengthInterval(value);
            }
            else if (version === BinaryConstants.BINARY_VERSION_3) {
                offValue = this._calculateRelativeInterval(value, length);
            }
            else {
                throw new Error('Invalid version');
            }
            offset = Offset_1.Offset.fromValues(offValue);
        }
        return offset;
    };
    AbstractEncoder.prototype._generateRadius = function (radius) {
        return Radius_1.Radius.fromValues(radius);
    };
    AbstractEncoder.prototype._calculateRelativeInterval = function (value, length) {
        if (value === length) {
            return BinaryConstants.OFFSET_BUCKETS - 1;
        }
        return Math.floor((BinaryConstants.OFFSET_BUCKETS * value) / length);
    };
    AbstractEncoder.prototype._generateHeader = function (version, locationType, hasAttributes) {
        var pF = BinaryConstants.IS_NOT_POINT;
        var arF = BinaryConstants.IS_NOT_AREA;
        if (LocationType_1.POINTS_LOCATIONS.has(locationType)) {
            pF = BinaryConstants.IS_POINT;
        }
        else if (LocationType_1.AREA_LOCATIONS.has(locationType)) {
            if (locationType === LocationType_1.LocationType.CIRCLE) {
                arF = BinaryConstants.AREA_CODE_CIRCLE;
            }
            else if (locationType === LocationType_1.LocationType.RECTANGLE) {
                arF = BinaryConstants.AREA_CODE_RECTANGLE;
            }
            else if (locationType === LocationType_1.LocationType.GRID) {
                arF = BinaryConstants.AREA_CODE_GRID;
            }
            else if (locationType === LocationType_1.LocationType.POLYGON) {
                arF = BinaryConstants.AREA_CODE_POLYGON;
            }
            else if (locationType === LocationType_1.LocationType.CLOSED_LINE) {
                arF = BinaryConstants.AREA_CODE_CLOSEDLINE;
            }
        }
        var aF = BinaryConstants.HAS_NO_ATTRIBUTES;
        if (hasAttributes) {
            aF = BinaryConstants.HAS_ATTRIBUTES;
        }
        return Header_1.Header.fromValues(arF, aF, pF, version);
    };
    AbstractEncoder.prototype._generateFirstLRPFromLRP = function (locationReferencePoint) {
        return FirstLRP_1.FirstLRP.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRP(locationReferencePoint), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    };
    AbstractEncoder.prototype._generateFirstLRPFromLRPAndOrientation = function (locationReferencePoint, orientation) {
        return FirstLRP_1.FirstLRP.fromValues(this._get24BitRepresentation(locationReferencePoint.getLongitudeDeg()), this._get24BitRepresentation(locationReferencePoint.getLatitudeDeg()), this._generateAttribute1FromLRPAndOrientation(locationReferencePoint, orientation), this._generateAttribute2(locationReferencePoint), this._generateAttribute3(locationReferencePoint));
    };
    AbstractEncoder.prototype._generateLastLrpFromPointsAndOffsets = function (points, pOff, nOff) {
        var pSize = points.length;
        var lrp = points[pSize - 1];
        var prev = points[pSize - 2];
        return LastLRP_1.LastLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute4(lrp, pOff, nOff));
    };
    AbstractEncoder.prototype._generateLastLrpFromPointsAndOffsetAndSideOfRoad = function (points, pOff, sideOfRoad) {
        var pSize = points.length;
        var lrp = points[pSize - 1];
        var prev = points[pSize - 2];
        return LastLRP_1.LastLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRPAndSideOfRoad(lrp, sideOfRoad), this._generateAttribute4(lrp, pOff, null));
    };
    AbstractEncoder.prototype._generateLRPs = function (pointList) {
        var data = [];
        var nrPoints = pointList.length;
        for (var i = 1; i < nrPoints - 1; i++) {
            var lrp = pointList[i];
            var prev = pointList[i - 1];
            var newLRP = IntermediateLRP_1.IntermediateLRP.fromValues(this._getRelativeRepresentation(prev.getLongitudeDeg(), lrp.getLongitudeDeg()), this._getRelativeRepresentation(prev.getLatitudeDeg(), lrp.getLatitudeDeg()), this._generateAttribute1FromLRP(lrp), this._generateAttribute2(lrp), this._generateAttribute3(lrp));
            data.push(newLRP);
        }
        return data;
    };
    AbstractEncoder.prototype._generateLastLineLRP = function (pointList) {
        // Last "intermediate" LRP
        var pSize = pointList.length;
        var lrp = pointList[pSize - 1];
        return LastClosedLineLRP_1.LastClosedLineLRP.fromValues(this._generateAttribute5(lrp), this._generateAttribute6(lrp));
    };
    AbstractEncoder.prototype._generateAttribute2 = function (lrp) {
        var lastFrc = lrp.getLfrc();
        if (lastFrc === null) {
            throw new Error('Last FRC cannot be null');
        }
        else {
            return Attr2_1.Attr2.fromValues(FunctionalRoadClass_1.getId(lastFrc), this._calculateBearingInterval(lrp.getBearing()));
        }
    };
    AbstractEncoder.prototype._generateAttribute6 = function (lrp) {
        return Attr6_1.Attr6.fromValues(this._calculateBearingInterval(lrp.getBearing()));
    };
    AbstractEncoder.prototype._generateAttribute1FromLRP = function (lrp) {
        var frc = lrp.getFRC();
        var fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.Attr1.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), 0);
        }
    };
    AbstractEncoder.prototype._generateAttribute1FromLRPAndSideOfRoad = function (lrp, sideOfRoad) {
        var frc = lrp.getFRC();
        var fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.Attr1.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), SideOfRoad_1.getId(sideOfRoad));
        }
    };
    AbstractEncoder.prototype._generateAttribute1FromLRPAndOrientation = function (lrp, orientation) {
        var frc = lrp.getFRC();
        var fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr1_1.Attr1.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow), Orientation_1.getId(orientation));
        }
    };
    AbstractEncoder.prototype._generateAttribute3 = function (lrp) {
        return Attr3_1.Attr3.fromValues(this._calculateLengthInterval(lrp.getDistanceToNext()));
    };
    AbstractEncoder.prototype._generateAttribute4 = function (lrp, pOff, nOff) {
        var pF = 0;
        if (pOff !== null) {
            pF = 1;
        }
        var nF = 0;
        if (nOff !== null) {
            nF = 1;
        }
        return Attr4_1.Attr4.fromValues(pF, nF, this._calculateBearingInterval(lrp.getBearing()));
    };
    AbstractEncoder.prototype._generateAttribute5 = function (lrp) {
        var frc = lrp.getFRC();
        var fow = lrp.getFOW();
        if (frc === null || fow === null) {
            throw new Error('FRC and FOW cannot be null');
        }
        else {
            return Attr5_1.Attr5.fromValues(FunctionalRoadClass_1.getId(frc), FormOfWay_1.getId(fow));
        }
    };
    AbstractEncoder.prototype._calculateBearingInterval = function (angle) {
        return Math.floor(angle / BinaryConstants.BEARING_SECTOR);
    };
    AbstractEncoder.prototype._calculateLengthInterval = function (val) {
        return Math.floor(val / BinaryConstants.LENGTH_INTERVAL);
    };
    AbstractEncoder.prototype._get24BitRepresentation = function (val) {
        var sgn = Math.sign(val);
        return Math.round((sgn * BinaryConstants.ROUND_FACTOR) + (val * BinaryConstants.BIT24FACTOR));
    };
    AbstractEncoder.prototype._getRelativeRepresentation = function (prevVal, nextVal) {
        return Math.round(BinaryConstants.DECA_MICRO_DEG_FACTOR * (nextVal - prevVal));
    };
    AbstractEncoder.prototype._generateAbsCoord = function (coord) {
        return AbsoluteCoordinates_1.AbsoluteCoordinates.fromValues(this._get24BitRepresentation(coord.getLongitudeDeg()), this._get24BitRepresentation(coord.getLatitudeDeg()));
    };
    AbstractEncoder.prototype._generateRelativeCoordinates = function (startLRP, coord) {
        return RelativeCoordinates_1.RelativeCoordinates.fromValues(this._getRelativeRepresentation(startLRP.getLongitudeDeg(), coord.getLongitudeDeg()), this._getRelativeRepresentation(startLRP.getLatitudeDeg(), coord.getLatitudeDeg()));
    };
    AbstractEncoder.prototype._fitsInto2Bytes = function (value) {
        return (value >= -Math.pow(2, 15) && value <= Math.pow(2, 15) - 1);
    };
    return AbstractEncoder;
}());
exports.AbstractEncoder = AbstractEncoder;

});

unwrapExports(AbstractEncoder_1);
var AbstractEncoder_2 = AbstractEncoder_1.AbstractEncoder;

var BitStreamOutput_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var BitStreamOutput = /** @class */ (function (_super) {
    __extends(BitStreamOutput, _super);
    function BitStreamOutput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BitStreamOutput.prototype.putBits = function (value, countBitsToPut) {
        // Sanity check
        if (countBitsToPut === 0) {
            return value;
        }
        if (countBitsToPut > BitStreamAbstract_1.BitStreamAbstract._MAX_BIT_SIZE || countBitsToPut < 1) {
            throw new Error('Invalid bit size');
        }
        // Make sure we have enough room
        if ((this._currentBit + countBitsToPut) > (this._totalBufferLengthBytes << BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT)) {
            this._expandBuffer();
        }
        var endByteIndex = (this._currentBit + countBitsToPut - 1) >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT; // End byte position
        var beginByteIndex = this._currentBit >>> BitStreamAbstract_1.BitStreamAbstract._BIT_BYTE_SHIFT; // Current byte position
        var freeBitsFirstByte = BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE - (this._currentBit % BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE); // Room in the first byte of the buffer
        var remainingValue = value;
        if (freeBitsFirstByte >= countBitsToPut) {
            // Value fits into the first byte
            // Reset free bits (remove old data)
            this._buffer[beginByteIndex] &= BitStreamAbstract_1.BitStreamAbstract._COMPLEMENT_MASK[freeBitsFirstByte];
            // Insert the value into the free bits
            this._buffer[beginByteIndex] |= BitStreamAbstract_1.BitStreamAbstract._BITMASK[freeBitsFirstByte] & (remainingValue << freeBitsFirstByte - countBitsToPut);
        }
        else {
            // Value does not fit into the first byte
            var countBitsToPutLastByte = (countBitsToPut - freeBitsFirstByte) % BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE; // Number of bits to put in the last byte
            if (countBitsToPutLastByte > 0) {
                // There will be a rest to put into an additional byte (complete buffer will not be aligned)
                this._buffer[endByteIndex] = 0; // Clear byte
                this._buffer[endByteIndex] |= (remainingValue << BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE - countBitsToPutLastByte) & BitStreamAbstract_1.BitStreamAbstract._BITMASK[BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE]; // Put the bits in the head of byte
                remainingValue >>= countBitsToPutLastByte; // Prune remaining data
                endByteIndex--;
            }
            for (; endByteIndex > beginByteIndex; endByteIndex--) {
                // Now put the full bytes into the buffer
                this._buffer[endByteIndex] = 0; // Clear byte
                this._buffer[endByteIndex] |= remainingValue & BitStreamAbstract_1.BitStreamAbstract._BITMASK[BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE]; // Put next byte
                remainingValue >>>= BitStreamAbstract_1.BitStreamAbstract._BYTE_SIZE;
            }
            // endByteIndex is now equal to beginByteIndex
            // Fill up the first byte with the remaining data
            this._buffer[endByteIndex] &= BitStreamAbstract_1.BitStreamAbstract._COMPLEMENT_MASK[freeBitsFirstByte];
            this._buffer[endByteIndex] |= remainingValue & BitStreamAbstract_1.BitStreamAbstract._BITMASK[freeBitsFirstByte];
        }
        // Adjust internal pointer
        this._currentBit += countBitsToPut;
        return value;
    };
    BitStreamOutput.prototype.getData = function () {
        return this._getData();
    };
    BitStreamOutput.fromValues = function () {
        var bitStreamOutput = new BitStreamOutput();
        bitStreamOutput._createBuffer(BitStreamOutput._DEFAULT_BUFFER_LENGTH);
        bitStreamOutput._currentBit = 0;
        return bitStreamOutput;
    };
    BitStreamOutput.fromLength = function (length) {
        var bitStreamOutput = new BitStreamOutput();
        bitStreamOutput._createBuffer(length);
        bitStreamOutput._currentBit = 0;
        return bitStreamOutput;
    };
    return BitStreamOutput;
}(BitStreamAbstract_1.BitStreamAbstract));
exports.BitStreamOutput = BitStreamOutput;

});

unwrapExports(BitStreamOutput_1);
var BitStreamOutput_2 = BitStreamOutput_1.BitStreamOutput;

var LineEncoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });





var LineEncoder = /** @class */ (function (_super) {
    __extends(LineEncoder, _super);
    function LineEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineEncoder.prototype.encodeData = function (rawLocationReference, version) {
        var locationReferences = rawLocationReference.getLocationReferencePoints();
        if (locationReferences !== null) {
            var offsets = rawLocationReference.getOffsets();
            if (locationReferences === null || offsets === null || locationReferences.length <= 0) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.LINE_LOCATION, version);
            }
            var returnCode = this._checkOffsets(offsets, true, locationReferences);
            if (!returnCode) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_OFFSET, LocationType_1.LocationType.LINE_LOCATION, version);
            }
            returnCode = this._checkOffsets(offsets, false, locationReferences);
            if (!returnCode) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_OFFSET, LocationType_1.LocationType.LINE_LOCATION, version);
            }
            return LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryLineLocation(locationReferences, offsets, version));
        }
        else {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.LINE_LOCATION, version);
        }
    };
    LineEncoder.prototype._generateBinaryLineLocation = function (locationReferences, offsets, version) {
        var header = this._generateHeader(version, LocationType_1.LocationType.LINE_LOCATION, true);
        var firstLRP = this._generateFirstLRPFromLRP(locationReferences[0]);
        var lrps = this._generateLRPs(locationReferences);
        var pOff = this._generateOffset(offsets, true, version, locationReferences);
        var nOff = this._generateOffset(offsets, false, version, locationReferences);
        var lastLRP = this._generateLastLrpFromPointsAndOffsets(locationReferences, pOff, nOff);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        firstLRP.put(out);
        for (var _i = 0, lrps_1 = lrps; _i < lrps_1.length; _i++) {
            var lrp = lrps_1[_i];
            lrp.put(out);
        }
        lastLRP.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        if (nOff !== null) {
            nOff.put(out);
        }
        return out.getData();
    };
    return LineEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.LineEncoder = LineEncoder;

});

unwrapExports(LineEncoder_1);
var LineEncoder_2 = LineEncoder_1.LineEncoder;

var PointAlongLineEncoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });






var PointAlongLineEncoder = /** @class */ (function (_super) {
    __extends(PointAlongLineEncoder, _super);
    function PointAlongLineEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointAlongLineEncoder.prototype.encodeData = function (rawLocationReference, version) {
        if (rawLocationReference.getLocationReferencePoints() === null) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.POINT_ALONG_LINE, version);
        }
        var locationReferencePoints = rawLocationReference.getLocationReferencePoints();
        if (locationReferencePoints === null || locationReferencePoints.length <= 0) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.POINT_ALONG_LINE, version);
        }
        else {
            var startLRP = locationReferencePoints[0];
            var endLRP = locationReferencePoints[1];
            var offsets = rawLocationReference.getOffsets();
            var sideOfRoad = rawLocationReference.getSideOfRoad();
            var orientation = rawLocationReference.getOrientation();
            if (startLRP === null || endLRP === null || offsets === null || sideOfRoad === null || orientation === null) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.POINT_ALONG_LINE, version);
            }
            if (version < BinaryConstants.BINARY_VERSION_3) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, LocationType_1.LocationType.POI_WITH_ACCESS_POINT, version);
            }
            var returnCode = this._checkOffsets(offsets, true, locationReferencePoints);
            if (!returnCode) {
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_OFFSET, LocationType_1.LocationType.POINT_ALONG_LINE, version);
            }
            return LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version));
        }
    };
    PointAlongLineEncoder.prototype._generateBinaryPointAlongLineLocation = function (startLRP, endLRP, offsets, sideOfRoad, orientation, version) {
        var header = this._generateHeader(version, LocationType_1.LocationType.POINT_ALONG_LINE, true);
        var first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
        var lrps = [startLRP, endLRP];
        var pOff = this._generateOffset(offsets, true, version, lrps);
        if (pOff === null) {
            throw new Error('Positive offset cannot be null');
        }
        var last = this._generateLastLrpFromPointsAndOffsetAndSideOfRoad(lrps, pOff, sideOfRoad);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        first.put(out);
        last.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        return out.getData();
    };
    return PointAlongLineEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.PointAlongLineEncoder = PointAlongLineEncoder;

});

unwrapExports(PointAlongLineEncoder_1);
var PointAlongLineEncoder_2 = PointAlongLineEncoder_1.PointAlongLineEncoder;

var GeoCoordEncoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });





var GeoCoordEncoder = /** @class */ (function (_super) {
    __extends(GeoCoordEncoder, _super);
    function GeoCoordEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoCoordEncoder.prototype.encodeData = function (rawLocationReference, version) {
        var coord = rawLocationReference.getGeoCoordinates();
        if (coord === null) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.GEO_COORDINATES, version);
        }
        else if (version < 3) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, LocationType_1.LocationType.GEO_COORDINATES, version);
        }
        else {
            return LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryGeoCoordLocation(coord, version));
        }
    };
    GeoCoordEncoder.prototype._generateBinaryGeoCoordLocation = function (coord, version) {
        var header = this._generateHeader(version, LocationType_1.LocationType.GEO_COORDINATES, false);
        var absCoord = this._generateAbsCoord(coord);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        absCoord.put(out);
        return out.getData();
    };
    return GeoCoordEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.GeoCoordEncoder = GeoCoordEncoder;

});

unwrapExports(GeoCoordEncoder_1);
var GeoCoordEncoder_2 = GeoCoordEncoder_1.GeoCoordEncoder;

var PolygonEncoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });







var PolygonEncoder = /** @class */ (function (_super) {
    __extends(PolygonEncoder, _super);
    function PolygonEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PolygonEncoder.prototype.encodeData = function (rawLocationReference, version) {
        var id = rawLocationReference.getId();
        var cornerPoints = rawLocationReference.getCornerPoints();
        if (cornerPoints === null) {
            return LocationReference_1.LocationReference.fromValues(id, BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.POLYGON, version);
        }
        if (version < BinaryConstants.BINARY_VERSION_3) {
            return LocationReference_1.LocationReference.fromValues(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, LocationType_1.LocationType.POLYGON, version);
        }
        var lr = null;
        try {
            lr = LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPolygonLocation(cornerPoints, version));
        }
        catch (error) {
            lr = LocationReference_1.LocationReference.fromValues(id, BinaryReturnCode_1.BinaryReturnCode.INVALID_BINARY_DATA, LocationType_1.LocationType.POLYGON, version);
        }
        return lr;
    };
    PolygonEncoder.prototype._generateBinaryPolygonLocation = function (cornerPoints, version) {
        var prevCoord = cornerPoints[0];
        var firstCornerPoint = this._generateAbsCoord(prevCoord);
        var relCornerCoords = [];
        for (var i = 1; i < cornerPoints.length; i++) {
            var geoCoord = cornerPoints[i];
            var relRepValLon = this._getRelativeRepresentation(prevCoord.getLongitudeDeg(), geoCoord.getLongitudeDeg());
            var relRepValLat = this._getRelativeRepresentation(prevCoord.getLatitudeDeg(), geoCoord.getLatitudeDeg());
            if (this._fitsInto2Bytes(relRepValLon) && this._fitsInto2Bytes(relRepValLat)) {
                var relCornerCoord = RelativeCoordinates_1.RelativeCoordinates.fromValues(relRepValLon, relRepValLat);
                relCornerCoords.push(relCornerCoord);
                prevCoord = geoCoord;
            }
        }
        var header = this._generateHeader(version, LocationType_1.LocationType.POLYGON, false);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        firstCornerPoint.put(out);
        relCornerCoords.forEach(function (relCoord) { return relCoord.put(out); });
        return out.getData();
    };
    return PolygonEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.PolygonEncoder = PolygonEncoder;

});

unwrapExports(PolygonEncoder_1);
var PolygonEncoder_2 = PolygonEncoder_1.PolygonEncoder;

var CircleEncoder_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });






var CircleEncoder = /** @class */ (function (_super) {
    __extends(CircleEncoder, _super);
    function CircleEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircleEncoder.prototype.encodeData = function (rawLocationReference, version) {
        var center = rawLocationReference.getCenterPoint();
        var radius = rawLocationReference.getRadius();
        if (center === null) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.MISSING_DATA, LocationType_1.LocationType.CIRCLE, version);
        }
        if (radius < 0) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_RADIUS, LocationType_1.LocationType.CIRCLE, version);
        }
        if (version < BinaryConstants.BINARY_VERSION_3) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, LocationType_1.LocationType.CIRCLE, version);
        }
        return LocationReference_1.LocationReference.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryCircleLocation(center, radius, version));
    };
    CircleEncoder.prototype._generateBinaryCircleLocation = function (center, r, version) {
        var radius = this._generateRadius(r); // r represents radius in meters
        var absCoord = this._generateAbsCoord(center);
        var header = this._generateHeader(version, LocationType_1.LocationType.CIRCLE, false);
        var out = BitStreamOutput_1.BitStreamOutput.fromValues();
        header.put(out);
        absCoord.put(out);
        if (radius != null) {
            radius.put(out);
        }
        return out.getData();
    };
    return CircleEncoder;
}(AbstractEncoder_1.AbstractEncoder));
exports.CircleEncoder = CircleEncoder;

});

unwrapExports(CircleEncoder_1);
var CircleEncoder_2 = CircleEncoder_1.CircleEncoder;

var BinaryEncoder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });









var BinaryEncoder = /** @class */ (function () {
    function BinaryEncoder() {
    }
    BinaryEncoder.prototype.getDataFormatIdentifier = function () {
        return BinaryConstants.IDENTIFIER;
    };
    BinaryEncoder.prototype.getSupportedVersions = function () {
        return BinaryEncoder._VERSIONS;
    };
    BinaryEncoder.prototype.encodeDataFromRLR = function (rawLocationReference) {
        return this.encodeDataFromRLRAndVersion(rawLocationReference, BinaryEncoder._VERSIONS[BinaryEncoder._VERSIONS.length - 1]);
    };
    BinaryEncoder.prototype.encodeDataFromRLRAndVersion = function (rawLocationReference, version) {
        var locationType = rawLocationReference.getLocationType();
        if (!this._checkVersion(version, locationType)) {
            return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.INVALID_VERSION, locationType, version);
        }
        var encoder = null;
        switch (locationType) {
            case LocationType_1.LocationType.GEO_COORDINATES:
                encoder = new GeoCoordEncoder_1.GeoCoordEncoder();
                break;
            case LocationType_1.LocationType.LINE_LOCATION:
                encoder = new LineEncoder_1.LineEncoder();
                break;
            case LocationType_1.LocationType.POI_WITH_ACCESS_POINT:
                // encoder = new PoiAccessEncoder();
                throw new Error('PoiAccessEncoder not implemented');
            case LocationType_1.LocationType.POINT_ALONG_LINE:
                encoder = new PointAlongLineEncoder_1.PointAlongLineEncoder();
                break;
            case LocationType_1.LocationType.CIRCLE:
                encoder = new CircleEncoder_1.CircleEncoder();
                break;
            case LocationType_1.LocationType.RECTANGLE:
                // encoder = new RectangleEncoder();
                throw new Error('RectangleEncoder not implemented');
            case LocationType_1.LocationType.GRID:
                // encoder = new GridEncoder();
                throw new Error('GridEncoder not implemented');
            case LocationType_1.LocationType.POLYGON:
                encoder = new PolygonEncoder_1.PolygonEncoder();
                break;
            case LocationType_1.LocationType.CLOSED_LINE:
                // encoder = new ClosedLineEncoder();
                throw new Error('ClosedLineEncoder not implemented');
            case LocationType_1.LocationType.UNKNOWN:
            default:
                return LocationReference_1.LocationReference.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.BinaryReturnCode.UNKNOWN_LOCATION_TYPE, locationType, version);
        }
        return encoder.encodeData(rawLocationReference, version);
    };
    BinaryEncoder.prototype._checkVersion = function (version, locationType) {
        var valid = false;
        for (var _i = 0, _a = BinaryEncoder._VERSIONS; _i < _a.length; _i++) {
            var ver = _a[_i];
            if (version === ver) {
                valid = true;
            }
        }
        if (BinaryConstants.POINT_LOCATION_TYPES.has(locationType) && version < BinaryConstants.POINT_LOCATION_VERSION) {
            valid = false;
        }
        if (BinaryConstants.AREA_LOCATION_TYPES.has(locationType) && version < BinaryConstants.AREA_LOCATION_VERSION) {
            valid = false;
        }
        return valid;
    };
    /** The Constant VERSIONS. */
    BinaryEncoder._VERSIONS = [2, 3];
    return BinaryEncoder;
}());
exports.BinaryEncoder = BinaryEncoder;

});

unwrapExports(BinaryEncoder_1);
var BinaryEncoder_2 = BinaryEncoder_1.BinaryEncoder;

var Serializer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });










var constructors = {
    Object: Object,
    Array: Array,
    Offsets: Offsets_1.Offsets,
    LocationReference: LocationReference_1.LocationReference,
    LocationReferencePoint: LocationReferencePoint_1.LocationReferencePoint,
    GeoCoordinates: GeoCoordinates_1.GeoCoordinates,
    RawInvalidLocationReference: RawInvalidLocationReference_1.RawInvalidLocationReference,
    RawLineLocationReference: RawLineLocationReference_1.RawLineLocationReference,
    RawPointAlongLineLocationReference: RawPointAlongLineLocationReference_1.RawPointAlongLineLocationReference,
    RawGeoCoordLocationReference: RawGeoCoordLocationReference_1.RawGeoCoordLocationReference,
    RawPolygonLocationReference: RawPolygonLocationReference_1.RawPolygonLocationReference,
    RawCircleLocationReference: RawCircleLocationReference_1.RawCircleLocationReference
};
var Serializer = /** @class */ (function () {
    function Serializer() {
    }
    Serializer.serialize = function (instance) {
        if (!instance) {
            return instance;
        }
        else {
            switch (instance.constructor.name) {
                case 'Number':
                case 'Boolean':
                case 'String':
                    return instance;
                case 'Object':
                case 'Array':
                default:
                    var properties = instance.constructor.name === 'Array' ? [] : {};
                    for (var property in instance) {
                        if (instance.hasOwnProperty(property)) {
                            properties[property] = Serializer.serialize(instance[property]);
                        }
                    }
                    return { type: instance.constructor.name, properties: properties };
            }
        }
    };
    Serializer.deserialize = function (object) {
        if (!object) {
            return object;
        }
        else {
            switch (object.constructor.name) {
                case 'Number':
                case 'Boolean':
                case 'String':
                    return object;
                case 'Object':
                case 'Array':
                    var type = object.type;
                    var properties = object.properties;
                    var constructor = constructors[type];
                    var instance = new constructor();
                    for (var property in properties) {
                        if (properties.hasOwnProperty(property)) {
                            instance[property] = Serializer.deserialize(properties[property]);
                        }
                    }
                    return instance;
                default:
                    throw new Error('Unsupported JavaScript object type: ' + object.constructor.name);
            }
        }
    };
    return Serializer;
}());
exports.Serializer = Serializer;

});

unwrapExports(Serializer_1);
var Serializer_2 = Serializer_1.Serializer;

var es5 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.Buffer = buffer.Buffer;

exports.BinaryDecoder = BinaryDecoder_1.BinaryDecoder;

exports.BinaryEncoder = BinaryEncoder_1.BinaryEncoder;

exports.LocationReference = LocationReference_1.LocationReference;

exports.RawLocationReference = RawLocationReference_1.RawLocationReference;

exports.Serializer = Serializer_1.Serializer;

});

var index = unwrapExports(es5);
var es5_1 = es5.Buffer;
var es5_2 = es5.BinaryDecoder;
var es5_3 = es5.BinaryEncoder;
var es5_4 = es5.LocationReference;
var es5_5 = es5.RawLocationReference;
var es5_6 = es5.Serializer;

exports['default'] = index;
exports.Buffer = es5_1;
exports.BinaryDecoder = es5_2;
exports.BinaryEncoder = es5_3;
exports.LocationReference = es5_4;
exports.RawLocationReference = es5_5;
exports.Serializer = es5_6;

Object.defineProperty(exports, '__esModule', { value: true });

})));
