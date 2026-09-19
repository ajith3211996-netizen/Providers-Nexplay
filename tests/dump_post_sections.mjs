import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function checkSections() {
  const html = await ClientUtils.httpGet('https://new6.hdhub4u.cl/reacher-season-4-hindi-webrip-all-episodes/');
  const hRegex = /<h[2-6][^>]*>([\s\S]*?)<\/h[2-6]>/gi;
  let match;
  while ((match = hRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length > 0 && !text.includes('Related') && !text.includes('Leave a Reply')) {
      console.log('Heading:', text);
    }
  }

  const aRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let am;
  const links = [];
  while ((am = aRegex.exec(html)) !== null) {
    const href = am[1];
    const text = am[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (href.includes('hubdrive') || href.includes('greenmotors') || href.includes('greenmount') || href.includes('hubcloud') || href.includes('gamerxyt') || href.includes('hblinks')) {
      links.push({ href, text });
    }
  }
  console.log(`\nTotal download/bridge links in post: ${links.length}`);
  links.forEach((l, i) => console.log(`[${i}] "${l.text}" -> ${l.href}`));
}
checkSections();
