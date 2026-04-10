import puppeteer from 'puppeteer';
import path from 'path';

async function screenshot() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });
  
  console.log('正在打开页面...');
  
  try {
    await page.goto('http://localhost:3000', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // 等待内容加载
    await new Promise(r => setTimeout(r, 5000));
    
    const screenshotPath = path.join(process.cwd(), 'screenshot.png');
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: false 
    });
    
    console.log(`截图已保存: ${screenshotPath}`);
  } catch (error) {
    console.error('截图失败:', error);
  }
  
  await browser.close();
}

screenshot();
