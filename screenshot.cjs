const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to login...');
    await page.goto('http://localhost:5173/login');
    
    // Login
    await page.fill('input[type="email"]', 'kanishkasuthar1005@gmail.com');
    await page.fill('input[type="password"]', 'kanishka@1005');
    await page.click('button[type="submit"]');
    
    console.log('Waiting for dashboard...');
    await page.waitForURL('http://localhost:5173/');
    
    console.log('Navigating to studio...');
    await page.goto('http://localhost:5173/studio');
    
    console.log('Waiting for React Flow to load...');
    await page.waitForTimeout(3000); 
    
    page.on('console', msg => console.log('Browser Console:', msg.text()));
    page.on('pageerror', err => console.log('Browser Error:', err.message));
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: '/Users/kanishkasuthar/.gemini/antigravity/scratch/SAMS/studio_screenshot.png', fullPage: true });
    
    console.log('Screenshot saved');
    
    const canvasHtml = await page.evaluate(() => {
      const el = document.querySelector('.studio-canvas-wrapper');
      return el ? el.outerHTML.substring(0, 1000) + '...' : 'Canvas not found';
    });
    console.log('Canvas HTML preview:', canvasHtml);
    
  } catch (err) {
    console.error('Error during automation:', err);
  } finally {
    await browser.close();
  }
})();
