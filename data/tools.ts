// AI开发者工具数据源(扩充版,44个工具,9分类)
// 数据来源: GitHub API 2026-07-31 实时拉取,已剔除异常/不相关项
// 用于: 导航站Showcase展示 + 后续程序化SEO的工具详情页

export interface Tool {
  name: string;
  fullName: string;
  url: string;
  stars: number;
  category: string;
  desc: string;
}

export interface Category {
  id: string;
  zh: string;
  en: string;
  ja: string;
}

export const categories: Category[] = [
  { id: "ai-coding", zh: "AI编程Agent", en: "AI Coding Agents", ja: "AIコーディング" },
  { id: "browser", zh: "浏览器自动化", en: "Browser Automation", ja: "ブラウザ自動化" },
  { id: "platform", zh: "AI应用平台", en: "AI App Platforms", ja: "AIアプリ基盤" },
  { id: "automation", zh: "工作流自动化", en: "Workflow Automation", ja: "ワークフロー自動化" },
  { id: "rag", zh: "RAG知识库", en: "RAG & Knowledge Base", ja: "RAG・知識ベース" },
  { id: "multi-agent", zh: "多Agent框架", en: "Multi-Agent Frameworks", ja: "マルチエージェント" },
  { id: "mcp", zh: "能力扩展(MCP/Skills)", en: "Capability (MCP/Skills)", ja: "能力拡張(MCP/Skills)" },
  { id: "gateway", zh: "LLM网关", en: "LLM Gateways", ja: "LLMゲートウェイ" },
  { id: "memory", zh: "记忆/上下文", en: "Memory & Context", ja: "メモリ・コンテキスト" },
  { id: "vector-db", zh: "向量数据库/检索", en: "Vector DB & Search", ja: "ベクトルDB・検索" },
  { id: "llm-runtime", zh: "LLM运行时", en: "LLM Runtime", ja: "LLMランタイム" },
  { id: "model-framework", zh: "模型框架", en: "Model Frameworks", ja: "モデルフレームワーク" },
  { id: "image-gen", zh: "图像生成", en: "Image Generation", ja: "画像生成" },
  { id: "tts", zh: "TTS/语音", en: "TTS & Voice", ja: "TTS・音声" },
  { id: "docs", zh: "文档处理", en: "Document Processing", ja: "ドキュメント処理" },
];

export const tools: Tool[] = [
  // AI编程Agent
  { name: "OpenHands", fullName: "All-Hands-AI/OpenHands", url: "https://github.com/All-Hands-AI/OpenHands", stars: 82600, category: "ai-coding", desc: "开源自主编程agent,Devin的开源替代" },
  { name: "OpenInterpreter", fullName: "OpenInterpreter/openinterpreter", url: "https://github.com/OpenInterpreter/openinterpreter", stars: 67400, category: "ai-coding", desc: "本地代码执行agent,支持多种模型" },
  { name: "rtk", fullName: "rtk-ai/rtk", url: "https://github.com/rtk-ai/rtk", stars: 74100, category: "ai-coding", desc: "CLI代理,减少60-90%的LLM token消耗" },
  { name: "DeepSeek-Reasonix", fullName: "esengine/DeepSeek-Reasonix", url: "https://github.com/esengine/DeepSeek-Reasonix", stars: 28100, category: "ai-coding", desc: "DeepSeek原生的终端AI编程agent" },
  { name: "Serena", fullName: "oraios/serena", url: "https://github.com/oraios/serena", stars: 27200, category: "ai-coding", desc: "强大的MCP编程工具包,语义检索" },
  { name: "Kilo Code", fullName: "Kilo-Org/kilocode", url: "https://github.com/Kilo-Org/kilocode", stars: 26600, category: "ai-coding", desc: "一体化agentic工程平台" },
  // 浏览器自动化
  { name: "browser-use", fullName: "browser-use/browser-use", url: "https://github.com/browser-use/browser-use", stars: 107400, category: "browser", desc: "让AI agent能操控浏览器完成网页任务" },
  { name: "Firecrawl", fullName: "firecrawl/firecrawl", url: "https://github.com/firecrawl/firecrawl", stars: 158500, category: "browser", desc: "大规模搜索、抓取、与网页交互的API" },
  { name: "agent-browser", fullName: "vercel-labs/agent-browser", url: "https://github.com/vercel-labs/agent-browser", stars: 39600, category: "browser", desc: "为AI agent设计的浏览器自动化CLI" },
  { name: "Lightpanda", fullName: "lightpanda-io/browser", url: "https://github.com/lightpanda-io/browser", stars: 33200, category: "browser", desc: "为AI和自动化设计的headless浏览器" },
  { name: "Page Agent", fullName: "alibaba/page-agent", url: "https://github.com/alibaba/page-agent", stars: 28300, category: "browser", desc: "阿里巴巴的页内JS GUI agent" },
  { name: "Skyvern", fullName: "Skyvern-AI/skyvern", url: "https://github.com/Skyvern-AI/skyvern", stars: 22600, category: "browser", desc: "用AI自动化浏览器工作流" },
  { name: "Automa", fullName: "AutomaApp/automa", url: "https://github.com/AutomaApp/automa", stars: 21500, category: "browser", desc: "浏览器扩展,连接节点自动化操作" },
  { name: "Maxun", fullName: "getmaxun/maxun", url: "https://github.com/getmaxun/maxun", stars: 17000, category: "browser", desc: "开源无代码网页抓取/爬虫平台" },
  // AI应用平台
  { name: "Dify", fullName: "langgenius/dify", url: "https://github.com/langgenius/dify", stars: 150900, category: "platform", desc: "构建Agentic工作流、RAG、丰富AI模型接入" },
  { name: "Open WebUI", fullName: "open-webui/open-webui", url: "https://github.com/open-webui/open-webui", stars: 147400, category: "platform", desc: "友好的AI界面,支持Ollama/OpenAI等" },
  { name: "LangChain", fullName: "langchain-ai/langchain", url: "https://github.com/langchain-ai/langchain", stars: 143100, category: "platform", desc: "Agent工程平台,LLM应用开发框架" },
  { name: "Flowise", fullName: "FlowiseAI/Flowise", url: "https://github.com/FlowiseAI/Flowise", stars: 55100, category: "platform", desc: "可视化构建AI Agent" },
  // 工作流自动化
  { name: "n8n", fullName: "n8n-io/n8n", url: "https://github.com/n8n-io/n8n", stars: 198800, category: "automation", desc: "开源工作流自动化,原生AI能力(fair-code)" },
  { name: "MoneyPrinterTurbo", fullName: "harry0703/MoneyPrinterTurbo", url: "https://github.com/harry0703/MoneyPrinterTurbo", stars: 100700, category: "automation", desc: "AI大模型一键生成高清短视频" },
  { name: "ToolJet", fullName: "ToolJet/ToolJet", url: "https://github.com/ToolJet/ToolJet", stars: 38300, category: "automation", desc: "开源的AI agent/自动化/应用构建基础" },
  { name: "Conductor", fullName: "conductor-oss/conductor", url: "https://github.com/conductor-oss/conductor", stars: 32000, category: "automation", desc: "事件驱动的agentic工作流引擎" },
  { name: "Budibase", fullName: "Budibase/budibase", url: "https://github.com/Budibase/budibase", stars: 28200, category: "automation", desc: "AI agent、自动化和应用运营平台" },
  { name: "Activepieces", fullName: "activepieces/activepieces", url: "https://github.com/activepieces/activepieces", stars: 23500, category: "automation", desc: "AI Agent + MCP + 工作流自动化(400+MCP)" },
  // RAG知识库
  { name: "PaddleOCR", fullName: "PaddlePaddle/PaddleOCR", url: "https://github.com/PaddlePaddle/PaddleOCR", stars: 86600, category: "rag", desc: "把PDF/图片转成结构化数据" },
  { name: "RagFlow", fullName: "infiniflow/ragflow", url: "https://github.com/infiniflow/ragflow", stars: 86500, category: "rag", desc: "领先的开源RAG,文档解析强" },
  { name: "Prompt Engineering Guide", fullName: "dair-ai/Prompt-Engineering-Guide", url: "https://github.com/dair-ai/Prompt-Engineering-Guide", stars: 77100, category: "rag", desc: "Prompt工程指南、论文、资源" },
  { name: "AnythingLLM", fullName: "Mintplex-Labs/anything-llm", url: "https://github.com/Mintplex-Labs/anything-llm", stars: 64100, category: "rag", desc: "桌面级RAG应用,全功能" },
  { name: "FastGPT", fullName: "labring/FastGPT", url: "https://github.com/labring/FastGPT", stars: 29200, category: "rag", desc: "工作流强的知识库,国产" },
  // 多Agent框架
  { name: "Graphify", fullName: "Graphify-Labs/graphify", url: "https://github.com/Graphify-Labs/graphify", stars: 99400, category: "multi-agent", desc: "把代码库/文档/SQL转成可交互知识" },
  { name: "AutoGen", fullName: "microsoft/autogen", url: "https://github.com/microsoft/autogen", stars: 60100, category: "multi-agent", desc: "微软的多agent对话编程框架" },
  { name: "CrewAI", fullName: "crewAIInc/crewAI", url: "https://github.com/crewAIInc/crewAI", stars: 56400, category: "multi-agent", desc: "多agent角色分工协作" },
  { name: "Nanobot", fullName: "HKUDS/nanobot", url: "https://github.com/HKUDS/nanobot", stars: 46500, category: "multi-agent", desc: "超轻量、自托管的个人AI agent" },
  { name: "LangGraph", fullName: "langchain-ai/langgraph", url: "https://github.com/langchain-ai/langgraph", stars: 38500, category: "multi-agent", desc: "内置cron的Agent Server,持久化追踪" },
  { name: "Pocket Flow", fullName: "The-Pocket/PocketFlow", url: "https://github.com/The-Pocket/PocketFlow", stars: 11100, category: "multi-agent", desc: "100行代码的LLM框架,Agent构建Agent" },
  // 能力扩展
  { name: "Agent Skills", fullName: "anthropics/skills", url: "https://github.com/anthropics/skills", stars: 165300, category: "mcp", desc: "SKILL.md工作流打包的事实标准" },
  { name: "MCP Servers", fullName: "modelcontextprotocol/servers", url: "https://github.com/modelcontextprotocol/servers", stars: 89000, category: "mcp", desc: "9800+社区MCP服务器,连接agent与外部" },
  { name: "Awesome LLM Apps", fullName: "Shubhamsaboo/awesome-llm-apps", url: "https://github.com/Shubhamsaboo/awesome-llm-apps", stars: 129200, category: "mcp", desc: "100+ AI Agent、Skills、RAG应用(免费开源)" },
  { name: "Awesome Claude Skills", fullName: "ComposioHQ/awesome-claude-skills", url: "https://github.com/ComposioHQ/awesome-claude-skills", stars: 71400, category: "mcp", desc: "Claude Skills精选清单与资源" },
  // LLM网关
  { name: "Gemini CLI", fullName: "google-gemini/gemini-cli", url: "https://github.com/google-gemini/gemini-cli", stars: 106300, category: "gateway", desc: "谷歌开源,把Gemini直接带到终端" },
  { name: "LiteLLM", fullName: "BerriAI/litellm", url: "https://github.com/BerriAI/litellm", stars: 55100, category: "gateway", desc: "统一API代理,300+模型一键切换" },
  // 记忆/上下文
  { name: "claude-mem", fullName: "thedotmack/claude-mem", url: "https://github.com/thedotmack/claude-mem", stars: 89100, category: "memory", desc: "跨会话的持久上下文,捕获每个agent" },
  { name: "Hermes Agent", fullName: "NousResearch/hermes-agent", url: "https://github.com/NousResearch/hermes-agent", stars: 223200, category: "memory", desc: "随你成长的agent(NousResearch)" },
  // 向量数据库/检索
  { name: "Milvus", fullName: "milvus-io/milvus", url: "https://github.com/milvus-io/milvus", stars: 45400, category: "vector-db", desc: "高性能云原生向量数据库" },
  { name: "LlamaIndex", fullName: "run-llama/llama_index", url: "https://github.com/run-llama/llama_index", stars: 51200, category: "vector-db", desc: "领先的文档agent和OCR平台" },
  { name: "Meilisearch", fullName: "meilisearch/meilisearch", url: "https://github.com/meilisearch/meilisearch", stars: 58800, category: "vector-db", desc: "极速搜索引擎API,AI驱动的相关性" },
  { name: "PageIndex", fullName: "VectifyAI/PageIndex", url: "https://github.com/VectifyAI/PageIndex", stars: 34900, category: "vector-db", desc: "无向量的文档索引,基于推理" },
  // LLM运行时/推理
  { name: "Ollama", fullName: "ollama/ollama", url: "https://github.com/ollama/ollama", stars: 177400, category: "llm-runtime", desc: "本地运行Kimi/GLM/MiniMax/DeepSeek等模型" },
  { name: "AutoGPT", fullName: "Significant-Gravitas/AutoGPT", url: "https://github.com/Significant-Gravitas/AutoGPT", stars: 185700, category: "llm-runtime", desc: "Accessible AI for everyone,低代码agent平台" },
  // 模型框架
  { name: "Transformers", fullName: "huggingface/transformers", url: "https://github.com/huggingface/transformers", stars: 163200, category: "model-framework", desc: "模型定义框架,PyTorch/TensorFlow/JAX" },
  { name: "PydanticAI", fullName: "pydantic/pydantic-ai", url: "https://github.com/pydantic/pydantic-ai", stars: 18900, category: "model-framework", desc: "AI Agent框架,Pydantic方式" },
  // 图像生成(新分类)
  { name: "Stable Diffusion WebUI", fullName: "AUTOMATIC1111/stable-diffusion-webui", url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui", stars: 164300, category: "image-gen", desc: "Stable Diffusion的Web UI,本地图像生成" },
  { name: "ComfyUI", fullName: "Comfy-Org/ComfyUI", url: "https://github.com/Comfy-Org/ComfyUI", stars: 123000, category: "image-gen", desc: "最强大的模块化扩散模型GUI/后端" },
  { name: "LocalAI", fullName: "mudler/LocalAI", url: "https://github.com/mudler/LocalAI", stars: 48000, category: "image-gen", desc: "开源AI引擎,本地运行任何模型(文本/图像/音频)" },
  // TTS/语音(新分类)
  { name: "GPT-SoVITS", fullName: "RVC-Boss/GPT-SoVITS", url: "https://github.com/RVC-Boss/GPT-SoVITS", stars: 60300, category: "tts", desc: "1分钟语音数据训练高质量TTS/语音克隆" },
  { name: "Coqui TTS", fullName: "coqui-ai/TTS", url: "https://github.com/coqui-ai/TTS", stars: 45800, category: "tts", desc: "深度学习Text-to-Speech工具包" },
  // 文档处理(新分类)
  { name: "MarkItDown", fullName: "microsoft/markitdown", url: "https://github.com/microsoft/markitdown", stars: 170500, category: "docs", desc: "微软出品,把文件/Office文档转成Markdown" },
  // 向量数据库(补充)
  { name: "Qdrant", fullName: "qdrant/qdrant", url: "https://github.com/qdrant/qdrant", stars: 33700, category: "vector-db", desc: "高性能、大规模向量数据库" },
  { name: "ScrapeGraphAI", fullName: "ScrapeGraphAI/Scrapegraph-ai", url: "https://github.com/ScrapeGraphAI/Scrapegraph-ai", stars: 28800, category: "vector-db", desc: "基于AI的Python爬虫" },
];
