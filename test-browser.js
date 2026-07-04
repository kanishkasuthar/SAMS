import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log("Navigating to http://localhost:5173/");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  
  console.log("Page loaded. Clicking links...");
  
  const links = ['/matrix', '/roles', '/decision-flow', '/reports', '/history', '/sessions', '/notifications', '/users'];
  
  for (let link of links) {
    console.log("Navigating to", link);
    await page.goto(`http://localhost:5173${link}`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log("Checking drag and drop in OrgStudio...");
  await page.goto('http://localhost:5173/studio', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  
  await browser.close();
  console.log("Done");
})();
