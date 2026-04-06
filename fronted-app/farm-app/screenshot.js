const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log('Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 30000 });
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    
    await browser.close();
    console.log('Screenshot saved to screenshot.png');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
