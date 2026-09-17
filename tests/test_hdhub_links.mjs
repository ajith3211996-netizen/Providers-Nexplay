import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function testLinks() {
  const url = 'https://new5.hdhub4u.cl/the-boys-season-4-hindi-uncensored-webrip-all-episodes/';
  const link7 = "https://greenmotors.cc/?id=OUZDRjhoaHJlN0ZOTm1KR3JQL3l2Zm1zejBaSk1jcUZ5SURXNmtqa3RuY1FULzRqRi8zbXREQm1UME9XdzBSZXdmYUtnbDUyS2RTUHk0RFowcUVET1lCUmlPbU9PQm9aWlV6WkFFY3JybjQ9";
  const link14 = "https://greenmotors.cc/?id=OUZDRjhoaHJlN0ZOTm1KR3JQL3l2Zm1zejBaSk1jcUZ5SURXNmtqa3RuY1FULzRqRi8zbXREQm1UME9XdzBSZWpGb0hCcEg5aDdkOEVtemlnQUxmUzZxTS9aSVp4VytEUmhmb1dQLy93aEk9";

  console.log('--- Resolving Link #7 (4K-2160p SDR WEB-DL [GD]) ---');
  try {
    const res7 = await ClientUtils.resolveDeepHubCloudChain(link7, '4k');
    console.log('Link #7 result:', JSON.stringify(res7, null, 2));
  } catch (e) {
    console.error('Link #7 error:', e.message);
  }

  console.log('--- Resolving Link #14 (EPiSODE 7) ---');
  try {
    const res14 = await ClientUtils.resolveDeepHubCloudChain(link14, '1080p');
    console.log('Link #14 result:', JSON.stringify(res14, null, 2));
  } catch (e) {
    console.error('Link #14 error:', e.message);
  }
}

testLinks().catch(console.error);
