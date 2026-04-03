# 🚀 WeChat Editor Agent & Skills 🤖📝

[中文版说明向下滚动](#中文说明-chinese-version)

A complete, out-of-the-box **AI Agent** repository for WeChat Official Account (微信公众号) operations, designed for the Buda ecosystem.

This repository provides a 24/7 autonomous **"WeChat Editor Agent"**, along with its underlying suite of individual skills. It can independently research topics, write deep-dive articles, generate viral cover images and contextual illustrations, format the text into beautiful WeChat-compatible HTML, and publish directly to your WeChat Draft Box—all triggered by a single prompt.

## 📦 What's Inside?

### 1. The Agent (`.buda/agents/wechat-editor`)
A pre-configured, ready-to-use AI Agent tailored as a Senior New Media Editor. You can install this Agent directly from the Buda Marketplace. It automatically bundles and orchestrates all the skills below.

### 2. The Core Skills (`skills/`)
You can also install these skills individually into your own custom agents:
*   **`wechat-publish-pipeline`**: The core orchestrator. Manages the full workflow from topic selection to publishing.
*   **`baoyu-post-to-wechat`**: Handles publishing to the WeChat Draft Box.
*   **`baoyu-markdown-to-html`**: Converts standard Markdown into beautifully styled HTML optimized for WeChat.
*   **`baoyu-article-illustrator`**: Analyzes article structure and intelligently generates contextual illustrations.
*   **`baoyu-cover-image`**: Generates high-quality cover images.
*   **`baoyu-imagine`**: The underlying multi-model AI image generation engine.

## 🚀 Installation & Usage

**For Buda Users:**
Simply link this repository in the Buda Developer Center to publish both the `WeChat Editor Agent` and its 6 individual skills to the Marketplace.

**For Local / Manual Setup:**
1. Clone this repository into your agent's workspace.
2. Install the necessary Node.js dependencies:
   ```bash
   cd wechat-editor-agent
   npm install
   ```

---

# 中文说明 (Chinese Version)

欢迎来到 **微信公众号全自动主编 (WeChat Editor Agent)** 仓库！本仓库专为 Buda 生态和 AI 智能体框架设计。

通过本仓库，你不仅可以获得一套完整的自动化发文“技能包”，还可以直接获得一个预配置好的 **“全自动微信主编 Agent”**。它可以实现“一条龙”式的内容创作：自主搜索选题、撰写文章、自动生成封面和内页配图、精美的微信排版，并最终直接将成品推送到你的公众号草稿箱中。

## 📦 仓库包含内容

### 1. 开箱即用的智能体 (Agent)
**路径：** `.buda/agents/wechat-editor`
这是一个预先设定好“资深主编”性格与指令的 Agent。买家/用户在 Buda 市场一键安装这个 Agent 后，它会默认自带完整的发文工作流，收到你的发文指令后即可全自动跑到终点。

### 2. 独立技能包 (Skills)
**路径：** `skills/`
如果你想把这些能力装配给自己的其他 Agent，也可以独立安装这些模块：
*   **`wechat-publish-pipeline`** (核心流水线): 总控中心，负责调度从选题到发布的所有步骤。
*   **`baoyu-post-to-wechat`**: 负责与微信公众号交互，将内容保存至草稿箱。
*   **`baoyu-markdown-to-html`**: 将 Markdown 转为自带样式的精美微信 HTML。
*   **`baoyu-article-illustrator`**: 智能配图助手，分析结构并插入 AI 逻辑图。
*   **`baoyu-cover-image`**: 封面生成器，支持多尺寸、多风格渲染。
*   **`baoyu-imagine`**: 底层的 AI 绘图引擎（支持 OpenAI、百炼等）。

## 🚀 上架与配置指南

**在 Buda 市场发布：**
你只需要在 Buda 开发者的“插件仓库”中绑定本 GitHub 仓库 (`casperliu7/wechat-editor-agent`)。Buda 会自动识别并同时上架 1 个全能 Agent 和 6 个独立技能。

**环境依赖：**
要让完整流水线在本地跑通，需在根目录下安装一次依赖，并为底层技能（如 `baoyu-imagine` 和 `baoyu-post-to-wechat`）配置好你的 AI 绘图 API Key 和 微信公众号登录状态。

```bash
cd wechat-editor-agent
npm install
```

---
*Powered by Buda - 释放人类创造力，让 AI 接管重复劳动！*