# WeChat Agent Skills 🤖📝

[中文版说明向下滚动](#中文说明-chinese-version)

A complete, end-to-end automated publishing pipeline for WeChat Official Accounts (微信公众号), designed for the Pi (Sandagent) framework.

This skill repository allows your AI agent to independently research topics, write articles, generate cover images and illustrations, format the text into beautiful WeChat-compatible HTML, and publish directly to your WeChat Draft Box—all from a single prompt.

## 📦 Included Skills

This repository bundles several interconnected skills:

*   **`wechat-publish-pipeline`**: The core orchestrator. Manages the full workflow from topic selection to publishing.
*   **`baoyu-post-to-wechat`**: Handles the actual publishing to the WeChat Draft Box (via API or Chrome CDP).
*   **`baoyu-markdown-to-html`**: Converts standard Markdown into beautifully styled HTML optimized for WeChat.
*   **`baoyu-article-illustrator`**: Analyzes article structure and intelligently generates contextual illustrations.
*   **`baoyu-cover-image`**: Generates high-quality cover images with various aspect ratios and styles.
*   **`baoyu-imagine`**: The underlying multi-model AI image generation engine.

## 🚀 Installation

1. Clone this repository into your agent's workspace (e.g., `/agent/skills/` or define it in your custom path).
2. Install the necessary Node.js dependencies:
   ```bash
   cd wechat-agent-skills
   npm install
   # or
   bun install
   ```

## ⚙️ Configuration

To make the pipeline work seamlessly, you need to configure:

1.  **Image Generation API:** Ensure you have configured your preferred AI image provider (OpenAI, Midjourney, Flux, etc.) for `baoyu-imagine`.
2.  **WeChat Login State:** The `baoyu-post-to-wechat` skill requires access to your WeChat Official Account. You will need to configure your active Chrome CDP session or WeChat cookie/token parameters in the skill's environment or configuration file.

## 💡 Usage

Once installed, simply tell your agent:
> *"Write a new article about the latest AI trends, add illustrations, format it, and publish it to my WeChat Draft Box."*

The `wechat-publish-pipeline` will automatically trigger and report its progress step-by-step.

---

# 中文说明 (Chinese Version)

专为 Pi (Sandagent) 智能体框架设计的微信公众号全自动运营与发布技能包。

通过本技能包，你的 AI 助手可以实现“一条龙”式的自动化内容创作：自主搜索选题、撰写文章、自动生成封面和内页配图、进行精美的微信排版，并最终直接将成品推送到你的公众号草稿箱中。只需一句指令，无需人工中途干预。

## 📦 包含的技能模块

本仓库将以下相互协作的技能打包在了一起：

*   **`wechat-publish-pipeline`** (核心流水线): 总控中心，负责按顺序调度从选题到发布的所有步骤。
*   **`baoyu-post-to-wechat`**: 负责与微信公众号后台交互，将内容保存至草稿箱（支持 API 或 Chrome CDP 自动化）。
*   **`baoyu-markdown-to-html`**: 排版引擎，将 Markdown 转换为带样式的、适配微信生态的优美 HTML。
*   **`baoyu-article-illustrator`**: 智能配图助手，分析文章结构并在合适的位置插入 AI 生成的说明图。
*   **`baoyu-cover-image`**: 封面生成器，支持多种尺寸、色系和渲染风格的头图生成。
*   **`baoyu-imagine`**: 底层的 AI 绘图引擎（支持 OpenAI, 各种开源模型等）。

## 🚀 安装指南

1. 将本仓库克隆到你的 agent 工作区（例如 `/agent/skills/` 目录下）。
2. 安装必要的依赖项：
   ```bash
   cd wechat-agent-skills
   npm install
   # 或者使用 bun
   bun install
   ```

## ⚙️ 准备工作与配置

为了让全自动流水线顺畅运行，你需要完成以下前置配置：

1.  **AI 绘图 API**: 为 `baoyu-imagine` 技能配置好你常用的图像生成大模型 API Key（如 OpenAI, 阿里云百炼等）。
2.  **微信登录授权**: `baoyu-post-to-wechat` 需要能够登录你的公众号。你需要在该技能的配置中设置好 Chrome CDP 调试端口（用于接管已登录的浏览器）或提供有效的 Cookie/Token。

## 💡 使用方法

安装完成后，你只需要对 Agent 说：
> *“帮我写一篇关于最新 AI 资讯的新文章，配图排版并直接发到公众号草稿箱。”*

`wechat-publish-pipeline` 就会自动接管，并向你实时汇报每一步的完成进度。