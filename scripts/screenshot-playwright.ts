import { chromium } from 'playwright';
import path from 'path';

async function screenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 900 });
  
  console.log('正在打开页面...');
  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 });
  
  // 等待主要内容出现
  try {
    await page.waitForSelector('main', { timeout: 5000 });
  } catch (e) {
    console.log('等待超时，继续截图...');
  }
  
  await page.waitForTimeout(2000);
  
  const screenshotPath = path.join(process.cwd(), 'screenshot.png');
  await page.screenshot({ 
    path: screenshotPath,
    fullPage: false 
  });
  
  console.log(`截图已保存: ${screenshotPath}`);
  
  await browser.close();
}

screenshot().catch(console.error);
