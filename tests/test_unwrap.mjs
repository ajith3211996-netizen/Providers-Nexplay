function rot13(str) {
  return (str + '').replace(/[a-zA-Z]/g, function (c) {
    return String.fromCharCode(
      (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
    );
  });
}

function decodeGreenmountToken(token) {
  if (!token) return null;
  try {
    let d1 = Buffer.from(token, 'base64').toString('utf8');
    let d2 = Buffer.from(d1, 'base64').toString('utf8');
    let d3 = rot13(d2);
    let d4 = Buffer.from(d3, 'base64').toString('utf8');
    const json = JSON.parse(d4);
    if (json && json.o) {
      return Buffer.from(json.o, 'base64').toString('utf8');
    }
  } catch(e) {
    console.error('decode error:', e);
  }
  return null;
}

const token = 'Y214WE0xWjNZbXRhVUdwMmIxQldObFo2ZFRCeFZVOXRRbmxxYVV0UU9XRndla2w1YjNveGFYRlVPV3h3YkRWM1RERnFhVzVVT1dkTlNtdDFiM3BGZVhCNWFtbFdkbXAyYjJ4V05sWjZVMVpJZDA5M1JsSXdNa2RWZURWdk1rVkxSbnBqZGtWdGVHdEtlRm94Y0ZSYWJVaExUVzVHVW1OcVRWUXhTWEY0TlV0S2QwMTRSVk5qWjBwNk5VRmFTbE5TUlVkUFFVVlRWbXhXWVRBOQ==';

const decoded = decodeGreenmountToken(token);
console.log('Decoded Token URL:', decoded);
