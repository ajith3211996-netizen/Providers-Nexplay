async function probeUrl(url, headers = {}) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Range': 'bytes=0-1024',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        ...headers
      },
      signal: controller.signal
    });
    clearTimeout(timeout);
    return { ok: res.ok || res.status === 206, status: res.status, mime: res.headers.get('content-type'), length: res.headers.get('content-length') };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function testProbes() {
  const urls = [
    { name: 'HDHub4u 4K Stream', url: 'https://gpdl.rohitkiskk.workers.dev/?id=ec521c51a38f42d5772c48637f9a74012b07ccc160e83c03082460dc4b6f7238c1cec5614a402542ef14747dd81b26c708969ea2fa42990f79590a60e581f5f6334f1b4ab6c9dd53302a24ec622688def6fdad51f7f3f5c4786abac7988855f5aec740d5ad30f6e4acef426f64340b94::b4cc45257cad86cd20e13117ade64452' },
    { name: 'Movies4u 4K Stream (BusyCDN)', url: 'https://instant.busycdn.xyz/e092e1d68cf55c3b2df6b9bb10560daeef102b7f8e08a6637e235cf6d72a038d94ef4a939567d2e29617dd68c69d798d4de9ca4231c17360ae0b235a09dbca55989693c61948b8e9253bc05541c088e138006744c96756b27ed47f2a62666c1e5e3a1e4a9f5c9b383c98bcc5800ea302::1d66f758cd6231752c9dc98129f44b6b?bytes=6542285871' },
    { name: 'Movies4u 4K Stream (Workers)', url: 'https://pixel.rohitkiskk.workers.dev/?id=766c4be4a6f714533a1a9e0e4d36a1c853e32e35d60e965466c8c1a4c7985c5e0e2be75c4e4b3fdbd261e920dfb88b0dcb3a0c5a56a7208ed48066b7862226de694529639636e796e6b45889478df9d2fe4c9342c5c9277b1101ba8c165a85fe::03be82c36987082b73a0c954c08c064f' }
  ];

  for (const item of urls) {
    const probe = await probeUrl(item.url);
    console.log(`${item.name}:`, probe);
  }
}

testProbes().catch(console.error);
