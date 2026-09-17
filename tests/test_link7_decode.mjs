import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function testDecode() {
  const link7 = "https://greenmotors.cc/?id=OUZDRjhoaHJlN0ZOTm1KR3JQL3l2Zm1zejBaSk1jcUZ5SURXNmtqa3RuY1FULzRqRi8zbXREQm1UME9XdzBSZXdmYUtnbDUyS2RTUHk0RFowcUVET1lCUmlPbU9PQm9aWlV6WkFFY3JybjQ9";
  const gHtml = await ClientUtils.httpGet(link7);
  console.log('gHtml length:', gHtml.length);
  const tokenMatch = gHtml.match(/s\(['"]o['"],\s*['"]([^'"]+)['"]/i);
  console.log('tokenMatch:', tokenMatch ? tokenMatch[1].substring(0, 50) : 'none');
  const hubUrl = ClientUtils.decodeGreenmountToken(tokenMatch[1]);
  console.log('Decoded Hub URL:', hubUrl);

  if (hubUrl) {
    const hubHtml = await ClientUtils.httpGet(hubUrl, link7);
    console.log('hubHtml snippet:', hubHtml.substring(0, 1000));
  }
}

testDecode().catch(console.error);
