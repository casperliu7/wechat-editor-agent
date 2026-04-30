---
name: Buda Social Cards
allowed-tools: Bash(*), Write, Edit, generate_image, ask_user
user-invocable: true
description: Generates high-end social media image cards combining AI illustrations, real photos, and HTML infographics using Playwright.
---

# 🦞 Buda Social Cards (Brand Storytelling Engine)

This skill generates "Apple-like" or "Buda-style" high-end presentations for social media (Xiaohongshu), perfect for brand narratives, event recaps, tutorials, and dense information.

It uses a pure **HTML/Playwright rendering pipeline** that seamlessly mixes:
1. **AI Illustrations** (3D Pop style)
2. **Real Photos** (from user workspace)
3. **Pure HTML Infographics** (Timelines, VS comparisons, grids)

## 📐 The Workflow

### Stage 1: Content & Layout Planning
1. Extract **3-6 core scenes** or punchy quotes from the text.
2. Decide the card type for each scene:
   - `image`: Needs an AI illustration OR maps to a user-provided real photo/screenshot.
   - `infographic`: Needs high info-density (e.g., a VS comparison, a 3-step timeline, a checklist). Will be rendered purely with HTML/CSS.
3. Check the workspace for existing real photos. If none, plan to generate AI illustrations.

### Stage 2: AI Illustration Generation
1. For missing visuals, use `generate_image` (Size: `1024x1792`).
2. **Brand Prompt Rule**: You MUST append this exact suffix to EVERY prompt to maintain the Buda aesthetic:
   > `, 3D pop illustration style, minimalist, abstract isometric elements, warm parchment background, matte gold accents, clean and trendy, no text.`

### Stage 3: HTML/Playwright Rendering Engine (Node.js)
Write a Node.js script using `playwright` to render cards.

**CRITICAL SAFEGUARDS (Lessons Learned):**
- **Base64 Images**: Never use `file://` paths in Playwright HTML. Read local images and convert them to base64 strings (`data:image/jpeg;base64,...`) before injecting them into `<img>` tags.
- **String Templates**: Avoid nested backticks or complex template literals when writing JS from the agent to prevent `SyntaxError` in Bash. Use simple string concatenation (`'data:image/...' + base64String`) where necessary.

**Strict CSS Rules:**
1. **Viewport**: `1080px × 1440px` (3:4).
2. **Brand Colors**:
   - Background: `background-color: oklch(0.985 0.006 85);` (Warm Parchment #F8F4E6)
   - Accents: `color: oklch(0.52 0.076 78);` (Matte Gold #A68A56)
3. **Typography**: Load Google Fonts. `'Noto Serif SC', serif;` for titles/quotes, and `'Inter', sans-serif;` for body/numbers.
4. **Anti-Cutoff Layout (Flexbox)**:
   - Container MUST use: `display: flex; flex-direction: column; flex: 1; padding-bottom: 60px; box-sizing: border-box;`
5. **Image Wrapping (`type: "image"`)**:
   - Wrap images in a `.image-wrapper` div.
   - Use `object-fit: cover;` and `border-radius: 40px;` with `box-shadow: 0 30px 60px rgba(0,0,0,0.12);`.
6. **Infographic Box (`type: "infographic"`)**:
   - Inject custom HTML directly instead of an `<img>` tag.
   - Example styles to implement: `.compare-card`, `.timeline`, `.step-num`.

### Stage 4: Headless Browser Snapshot
When taking the screenshot in Node.js:
1. `headless: true`
2. **Retina Sharpness**: Set `deviceScaleFactor: 2`.
3. **Wait for Network**: Use `await page.setContent(html, { waitUntil: 'networkidle' });` and `await page.waitForTimeout(2000);` before `page.screenshot()`.

### Stage 5: Compression & Delivery
Playwright PNGs are too large and will crash Xiaohongshu automation. Compress to JPG:
```bash
convert output_card_raw.png -quality 85 final_card.jpg
```
Provide the user with the final compressed JPG files via standard delivery markers.
