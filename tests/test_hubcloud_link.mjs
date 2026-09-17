import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function testHubcloudLink() {
  const url = 'https://hubcloud.ist/drive/yfqto3qqvqobbvf';
  const res = await ClientUtils.resolveDeepHubCloudChain(url, '4k');
  console.log('ClientUtils result for hubcloud link:', JSON.stringify(res, null, 2));
}

testHubcloudLink().catch(console.error);
