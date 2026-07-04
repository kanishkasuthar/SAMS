import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  try {
    await page.goto('http://localhost:5173/matrix', { waitUntil: 'networkidle0', timeout: 10000 });
    console.log("Matrix loaded");
  } catch (e) {
    console.log("Error loading Matrix:", e.message);
  }
  
  await browser.close();
})();
