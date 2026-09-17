import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function testHDHub4kUnwrap() {
  const ep7BridgeUrl = 'https://greenmotors.cc/?id=OUZDRjhoaHJlN0ZOTm1KR3JQL3l2Zm1zejBaSk1jcUZ5SURXNmtqa3RuY1FULzRqRi8zbXREQm1UME9XdzBSZWpGb0hCcEg5aDdkOEVtemlnQUxmUzZxTS9aSVp4VytEUmhmb1dQLy93aEk9';
  console.log('Resolving Ep 7 bridge with qualityHint "4k":');
  const res4k = await ClientUtils.resolveDeepHubCloudChain(ep7BridgeUrl, '4k');
  console.log('4K Streams:', JSON.stringify(res4k, null, 2));

  console.log('Resolving Ep 7 bridge with qualityHint "1080p":');
  const res1080 = await ClientUtils.resolveDeepHubCloudChain(ep7BridgeUrl, '1080p');
  console.log('1080p Streams:', JSON.stringify(res1080, null, 2));
}

testHDHub4kUnwrap().catch(console.error);
