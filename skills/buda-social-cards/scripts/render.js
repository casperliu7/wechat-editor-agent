const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function renderCard(outputFile, title, imageUrl, subtitle) {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700&family=Inter:wght@400;600&display=swap');
      body {
        width: 1080px;
        height: 1440px;
        margin: 0;
        background-color: oklch(0.985 0.006 85); /* Warm Parchment */
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 120px 80px;
        box-sizing: border-box;
      }
      .card {
        background: #FFFFFF;
        width: 100%;
        border-radius: 40px;
        box-shadow: 0 40px 100px rgba(46, 44, 42, 0.08);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 80px 60px;
        box-sizing: border-box;
        flex: 1;
        border: 4px solid oklch(0.985 0.006 85);
        padding-bottom: 60px;
      }
      .title {
        font-family: 'Noto Serif SC', serif;
        font-size: 72px;
        font-weight: 700;
        color: #2E2C2A;
        text-align: center;
        line-height: 1.4;
        margin-bottom: 80px;
      }
      .title span {
        color: oklch(0.52 0.076 78); /* Matte Gold */
      }
      .image-wrapper {
        width: 100%;
        flex-grow: 1;
        max-height: 700px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        background: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 60px;
      }
      .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .quote {
        font-size: 42px;
        color: #666;
        text-align: center;
        line-height: 1.6;
        font-weight: 600;
        padding: 0 40px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="title">${title}</div>
      <div class="image-wrapper">
        <img src="${imageUrl}" />
      </div>
      <div class="quote">${subtitle}</div>
    </div>
  </body>
  </html>
  `;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1440 },
    deviceScaleFactor: 2 // Critical for sharp text on social media
  });
  
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Give external fonts & images time to settle
  
  const rawPng = outputFile.replace('.jpg', '_raw.png');
  await page.screenshot({ path: rawPng });
  await browser.close();

  // Defense compression to 75% JPG as per SOP
  console.log(\`Compressing \${rawPng} -> \${outputFile}\`);
  try {
    execSync(\`convert \${rawPng} -quality 75 \${outputFile}\`);
    fs.unlinkSync(rawPng); // Clean up the raw massive PNG
  } catch (e) {
    console.error('Compression failed, ensure ImageMagick is installed:', e.message);
  }
}

module.exports = { renderCard };