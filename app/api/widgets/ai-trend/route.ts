import { NextRequest, NextResponse } from 'next/server';
import type {
  AITrendData,
  HuggingFaceModel,
  AIGitHubRepo,
  AINewsItem,
} from '@/components/widgets/implementations/AITrendWidget/types';

/**
 * AI Trend Widget API Route
 *
 * Aggregates trending AI content from multiple sources:
 * 1. Hugging Face trending models (https://huggingface.co/api/trending)
 * 2. GitHub trending repos (AI-related: langchain, openai, transformers, etc.)
 * 3. GeekNews AI-tagged articles
 *
 * Query params:
 * - limit: number of items per source (default: 5)
 * - period: daily | weekly | monthly (default: daily)
 * - sources: comma-separated list of sources (default: all)
 * - githubLanguage: filter GitHub by language (default: python)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const period = searchParams.get('period') || 'daily';
    const sources = searchParams.get('sources')?.split(',') || [
      'huggingface',
      'github',
      'news',
    ];
    const githubLanguage = searchParams.get('githubLanguage') || 'python';

    const data: AITrendData = {
      huggingface: [],
      github: [],
      news: [],
      lastUpdated: new Date().toISOString(),
    };

    // Fetch Hugging Face trending models
    if (sources.includes('huggingface')) {
      data.huggingface = await fetchHuggingFaceTrending(limit);
    }

    // Fetch GitHub trending repos
    if (sources.includes('github')) {
      data.github = await fetchGitHubTrending(limit, githubLanguage, period);
    }

    // Fetch AI news from GeekNews
    if (sources.includes('news')) {
      data.news = await fetchAINews(limit);
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('AI Trend API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI trends' },
      { status: 500 }
    );
  }
}

/**
 * Fetch trending models from Hugging Face
 */
async function fetchHuggingFaceTrending(limit: number): Promise<HuggingFaceModel[]> {
  // Mock data for now - will integrate real API later
  const mockModels: HuggingFaceModel[] = [
    {
      id: 'meta-llama/Llama-3.3-70B-Instruct',
      name: 'Llama-3.3-70B-Instruct',
      author: 'meta-llama',
      downloads: 1250000,
      likes: 4823,
      tags: ['text-generation', 'llm', 'instruct'],
      description: 'Meta\'s latest Llama 3.3 70B instruction-tuned model with enhanced reasoning',
      url: 'https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct',
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'black-forest-labs/FLUX.1-dev',
      name: 'FLUX.1-dev',
      author: 'black-forest-labs',
      downloads: 850000,
      likes: 3912,
      tags: ['text-to-image', 'diffusion', 'flux'],
      description: 'FLUX.1 development model - state-of-the-art text-to-image generation',
      url: 'https://huggingface.co/black-forest-labs/FLUX.1-dev',
      lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'Qwen/QwQ-32B-Preview',
      name: 'QwQ-32B-Preview',
      author: 'Qwen',
      downloads: 620000,
      likes: 2856,
      tags: ['reasoning', 'multilingual', 'qwen'],
      description: 'Qwen reasoning model with enhanced logical capabilities',
      url: 'https://huggingface.co/Qwen/QwQ-32B-Preview',
      lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mistralai/Mistral-Small-24B',
      name: 'Mistral-Small-24B',
      author: 'mistralai',
      downloads: 480000,
      likes: 2134,
      tags: ['text-generation', 'mistral', 'efficient'],
      description: 'Compact yet powerful language model from Mistral AI',
      url: 'https://huggingface.co/mistralai/Mistral-Small-24B',
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'deepseek-ai/DeepSeek-V3',
      name: 'DeepSeek-V3',
      author: 'deepseek-ai',
      downloads: 390000,
      likes: 1892,
      tags: ['coding', 'reasoning', 'moe'],
      description: 'DeepSeek V3 - advanced MoE model specialized in code generation',
      url: 'https://huggingface.co/deepseek-ai/DeepSeek-V3',
      lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return mockModels.slice(0, limit);
}

/**
 * Fetch AI-related trending repositories from GitHub
 */
async function fetchGitHubTrending(
  limit: number,
  language: string,
  period: string
): Promise<AIGitHubRepo[]> {
  // Mock data for now - will integrate real scraping/API later
  const mockRepos: AIGitHubRepo[] = [
    {
      id: 'langchain-ai/langchain',
      name: 'langchain',
      owner: 'langchain-ai',
      description: 'Build context-aware reasoning applications with LangChain',
      stars: 98234,
      todayStars: 234,
      language: 'Python',
      url: 'https://github.com/langchain-ai/langchain',
    },
    {
      id: 'ollama/ollama',
      name: 'ollama',
      owner: 'ollama',
      description: 'Get up and running with large language models locally',
      stars: 87456,
      todayStars: 512,
      language: 'Go',
      url: 'https://github.com/ollama/ollama',
    },
    {
      id: 'anthropics/anthropic-sdk-python',
      name: 'anthropic-sdk-python',
      owner: 'anthropics',
      description: 'Python SDK for Claude API by Anthropic',
      stars: 12345,
      todayStars: 89,
      language: 'Python',
      url: 'https://github.com/anthropics/anthropic-sdk-python',
    },
    {
      id: 'ggerganov/llama.cpp',
      name: 'llama.cpp',
      owner: 'ggerganov',
      description: 'Port of Meta\'s LLaMA model in pure C/C++ for efficient inference',
      stars: 67890,
      todayStars: 156,
      language: 'C++',
      url: 'https://github.com/ggerganov/llama.cpp',
    },
    {
      id: 'huggingface/transformers',
      name: 'transformers',
      owner: 'huggingface',
      description: 'State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX',
      stars: 134567,
      todayStars: 312,
      language: 'Python',
      url: 'https://github.com/huggingface/transformers',
    },
  ];

  return mockRepos.slice(0, limit);
}

/**
 * Fetch AI-tagged news from GeekNews
 */
async function fetchAINews(limit: number): Promise<AINewsItem[]> {
  // Mock data for now - will integrate GeekNews RSS filtering later
  const mockNews: AINewsItem[] = [
    {
      id: 'gn-1',
      title: 'Claude 3.5 Sonnet의 새로운 컴퓨터 사용 기능 분석',
      url: 'https://news.hada.io/topic?id=17234',
      points: 156,
      comments: 42,
      postedAt: '2h ago',
      tags: ['AI', 'Claude', 'Anthropic'],
    },
    {
      id: 'gn-2',
      title: 'OpenAI o3 모델, 수학 올림피아드 수준의 추론 능력 달성',
      url: 'https://news.hada.io/topic?id=17235',
      points: 234,
      comments: 67,
      postedAt: '5h ago',
      tags: ['AI', 'OpenAI', 'Reasoning'],
    },
    {
      id: 'gn-3',
      title: 'Google Gemini 2.0: 멀티모달 AI의 새로운 지평',
      url: 'https://news.hada.io/topic?id=17236',
      points: 189,
      comments: 51,
      postedAt: '7h ago',
      tags: ['AI', 'Google', 'Multimodal'],
    },
    {
      id: 'gn-4',
      title: 'LangGraph로 구축하는 멀티 에이전트 시스템 아키텍처',
      url: 'https://news.hada.io/topic?id=17237',
      points: 123,
      comments: 34,
      postedAt: '1d ago',
      tags: ['AI', 'LangChain', 'Architecture'],
    },
    {
      id: 'gn-5',
      title: 'DeepSeek-V3: 한국어 성능이 뛰어난 오픈소스 LLM',
      url: 'https://news.hada.io/topic?id=17238',
      points: 167,
      comments: 45,
      postedAt: '1d ago',
      tags: ['AI', 'LLM', 'Korean'],
    },
  ];

  return mockNews.slice(0, limit);
}
