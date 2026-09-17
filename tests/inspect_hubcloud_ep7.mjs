import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function inspectHubCloudEp7() {
  const link14 = "https://greenmotors.cc/?id=OUZDRjhoaHJlN0ZOTm1KR3JQL3l2Zm1zejBaSk1jcUZ5SURXNmtqa3RuY1FULzRqRi8zbXREQm1UME9XdzBSZWpGb0hCcEg5aDdkOEVtemlnQUxmUzZxTS9aSVp4VytEUmhmb1dQLy93aEk9";
  const gHtml = await ClientUtils.httpGet(link14);
  const tokenMatch = gHtml.match(/s\(['"]o['"],\s*['"]([^'"]+)['"]/i);
  console.log('tokenMatch:', tokenMatch ? tokenMatch[1].substring(0, 50) : null);
  
  // unwrap greenmount token
  function rot13(str) {
    return (str || '').replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
  }
  let d1 = Buffer.from(tokenMatch[1], 'base64').toString('utf8');
  let d2 = Buffer.from(d1, 'base64').toString('utf8');
  let d3 = rot13(d2);
  let d4 = Buffer.from(d3, 'base64').toString('utf8');
  const json = JSON.parse(d4);
  const hubUrl = Buffer.from(json.o, 'base64').toString('utf8');
  console.log('HubCloud landing URL:', hubUrl);

  const hubHtml = await ClientUtils.httpGet(hubUrl, link14);
  console.log('hubHtml:\n', hubHtml);
}

inspectHubCloudEp7().catch(console.error);
