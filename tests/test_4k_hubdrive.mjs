import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function test4kHubDrive() {
  const hubDriveUrl = 'https://hubdrive.pics/file/8968731580';
  console.log('Resolving 4K HubDrive URL:', hubDriveUrl);
  const res = await ClientUtils.resolveDeepHubCloudChain(hubDriveUrl, '4k');
  console.log('4K Result:', JSON.stringify(res, null, 2));
}

test4kHubDrive().catch(console.error);
