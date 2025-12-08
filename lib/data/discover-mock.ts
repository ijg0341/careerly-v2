import { DiscoverContentCardProps } from '@/components/ui/discover-content-card';
import { MarketAssetMiniCardProps } from '@/components/ui/market-asset-mini-card';
import { JobMarketTrend } from '@/components/ui/job-market-trend-card';
import { WeatherForecast } from '@/components/ui/weather-info-card';

// AI 카테고리 타입
export type AICategory = 'ai-core' | 'ai-enabled' | 'traditional';
// ai-core: AI/ML 엔지니어, 프롬프트 엔지니어 등 AI 핵심 직무
// ai-enabled: 전통 직무 + AI 도구 활용 필요
// traditional: AI와 무관한 전통 직무

// 직무 카테고리 타입
export type JobRole = 'engineering' | 'design' | 'marketing' | 'pm' | 'data' | 'operations' | 'other';
// engineering: 개발/엔지니어링
// design: 디자인/UX
// marketing: 마케팅/그로스
// pm: 기획/PM
// data: 데이터 분석/사이언스
// operations: 운영/비즈니스
// other: 기타

// 직무 카테고리 설정
export const jobRoleConfig: Record<JobRole, { label: string; icon: string; color: string }> = {
  engineering: { label: '개발', icon: '💻', color: 'blue' },
  design: { label: '디자인', icon: '🎨', color: 'pink' },
  marketing: { label: '마케팅', icon: '📈', color: 'orange' },
  pm: { label: '기획/PM', icon: '📋', color: 'indigo' },
  data: { label: '데이터', icon: '📊', color: 'emerald' },
  operations: { label: '운영', icon: '⚙️', color: 'slate' },
  other: { label: '기타', icon: '📁', color: 'gray' },
};

// AI 카테고리별 브리핑 타입
export interface AICategoryBriefing {
  category: AICategory;
  title: string;
  summary: string;
  keyInsight: string;
  jobCount: number;
}

// Metadata types for different content types
export interface JobMetadata {
  averageSalary?: string;
  openPositions?: number;
  employeeSatisfaction?: number; // 0-100
  hiringTrend?: number; // -10 ~ +10 (%)
  companySize?: string;
  industry?: string;
  foundedYear?: number;
  companyName?: string;
  companyLogo?: string;
}

export interface BlogMetadata {
  totalPosts?: number;
  averageViews?: number;
  postFrequency?: string;
  popularityRank?: number;
  techStack?: string[];
}

export interface BookMetadata {
  publisher?: string;
  rating?: number;
  reviewCount?: number;
  pages?: number;
  publishDate?: string;
  isbn?: string;
}

export interface CourseMetadata {
  students?: number;
  rating?: number;
  completionRate?: number;
  duration?: string;
  level?: string;
}

export interface JobRoleMetadata {
  roleName: string;                    // 직무명 (예: "프론트엔드 개발자")
  marketDemand: number;                // 시장 수요 점수 (0-100)
  salaryRange: {                       // 연봉 범위
    min: number;
    max: number;
    average: number;
  };
  experienceDistribution: {            // 경력 요구사항 분포
    junior: number;                    // 신입/주니어 비율 (%)
    mid: number;                       // 중급 비율 (%)
    senior: number;                    // 시니어 비율 (%)
  };
  requiredSkills: Array<{              // 필요 스킬
    name: string;
    importance: number;                // 중요도 (0-100)
  }>;
  demandTrend: number[];               // 최근 6개월 채용 수요 추이
  growthRate: number;                  // 직무 성장률 (%)
  competitionLevel: 'low' | 'medium' | 'high';  // 경쟁 강도
}

export type ContentMetadata = JobMetadata | BlogMetadata | BookMetadata | CourseMetadata;

// Extended type for detailed view
export interface DiscoverContentDetail extends Omit<DiscoverContentCardProps, 'relatedContent' | 'contentId'> {
  contentId: string | number;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  readTime?: string;
  fullContent?: string;
  relatedContent?: DiscoverContentCardProps[];
  metadata?: ContentMetadata;
  jobRoleMetadata?: JobRoleMetadata;
}

// Mock API Response Type
export interface DiscoverMockResponse {
  id: number;
  user: {
    id: number;
  };
  persona: {
    id: number;
  };
  date: string;
  jobs: Array<{
    id: number;
    title: string;
    url: string;
    company: {
      title: string;
      sign: string | null;
      image: string;
    };
    summary: string;
    createdAt: string;
    updatedAt: string;
    score: number;
    reason: string;
    hasMyBookmark: boolean;
    hasMyLike: boolean;
  }>;
  blogs: Array<{
    id: number;
    title: string;
    url: string;
    company: {
      title: string;
      sign: string | null;
      image: string;
    };
    source: string | null;
    category: string | null;
    imageUrl: string | null;
    publishedAt: string | null;
    summary: string;
    createdAt: string | null;
    score: number;
    aiScore: number; // AI 관련도 점수 (0-100)
    aiCategory: 'ai-dev' | 'ai-design' | 'ai-biz' | 'ai-general' | 'other'; // AI&Dev, AI&Design, AI&Biz, AI 일반, 기타
    reason: string;
    hasMyBookmark: boolean;
    hasMyLike: boolean;
  }>;
  books: Array<{
    id: number;
    title: string;
    url: string;
    company: {
      title: string;
      sign: string | null;
      image: string;
    };
    source: string;
    category: string | null;
    imageUrl: string;
    publishedAt: string | null;
    summary: string;
    createdAt: string | null;
    score: number;
    reason: string;
    hasMyBookmark: boolean;
    hasMyLike: boolean;
  }>;
  courses: Array<{
    id: number;
    url: string;
    company: {
      title: string;
      sign: string | null;
      image: string;
    };
    author: string | null;
    instructor: string | null;
    category: string | null;
    subcategory: string | null;
    imageUrl: string;
    level: string | null;
    title: string;
    subtitle: string | null;
    tags: string[];
    summary: string;
    publishedAt: string | null;
    createdAt: string | null;
    score: number;
    reason: string;
    hasMyBookmark: boolean;
    hasMyLike: boolean;
  }>;
  createdAt: string;
}

// Transform functions
export function transformJobsToContentCards(jobs: DiscoverMockResponse['jobs']): DiscoverContentCardProps[] {
  return jobs.map((job, index) => ({
    contentId: `job-${job.id}`,
    title: job.title,
    summary: job.summary,
    thumbnailUrl: job.company.image,
    sources: [
      {
        name: job.company.title,
        href: job.url,
      },
    ],
    postedAt: new Date(job.createdAt).toLocaleDateString('ko-KR'),
    stats: {
      likes: 0,
      views: 100 + (index * 123), // 고정된 값 사용
    },
    href: `/discover/job-${job.id}`,
    badge: `매칭 ${Math.floor(job.score * 100)}%`,
    badgeTone: 'coral' as const,
    liked: job.hasMyLike,
    bookmarked: job.hasMyBookmark,
    tags: ['채용', '커리어', 'IT', '개발자'],
  }));
}

export function transformBlogsToContentCards(blogs: DiscoverMockResponse['blogs']): DiscoverContentCardProps[] {
  return blogs.map((blog, index) => ({
    contentId: `blog-${blog.id}`,
    title: blog.title,
    summary: blog.summary,
    thumbnailUrl: blog.imageUrl || blog.company.image,
    sources: [
      {
        name: blog.company.title,
        href: blog.url,
      },
    ],
    postedAt: blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('ko-KR') : undefined,
    stats: {
      likes: 50 + (index * 15),
      views: 500 + (index * 250),
    },
    href: `/discover/blog-${blog.id}`,
    badge: '추천',
    badgeTone: 'success' as const,
    liked: blog.hasMyLike,
    bookmarked: blog.hasMyBookmark,
    tags: ['기술블로그', '개발', '인사이트', 'AI', '성장'],
  }));
}

export function transformBooksToContentCards(books: DiscoverMockResponse['books']): DiscoverContentCardProps[] {
  return books.map((book, index) => ({
    contentId: `book-${book.id}`,
    title: book.title,
    summary: book.summary,
    thumbnailUrl: book.imageUrl,
    sources: [
      {
        name: book.company.title,
        href: book.url,
      },
    ],
    stats: {
      likes: 80 + (index * 25),
      views: 800 + (index * 350),
    },
    href: `/discover/book-${book.id}`,
    badge: '도서',
    badgeTone: 'default' as const,
    liked: book.hasMyLike,
    bookmarked: book.hasMyBookmark,
    tags: ['도서', '학습', '리더십', '프로그래밍', 'React'],
  }));
}

export function transformCoursesToContentCards(courses: DiscoverMockResponse['courses']): DiscoverContentCardProps[] {
  return courses.map((course, index) => ({
    contentId: `course-${course.id}`,
    title: course.title,
    summary: course.summary,
    thumbnailUrl: course.imageUrl,
    sources: [
      {
        name: course.company.title,
        href: course.url,
      },
    ],
    stats: {
      likes: 60 + (index * 20),
      views: 600 + (index * 300),
    },
    href: `/discover/course-${course.id}`,
    badge: course.level || '강의',
    badgeTone: 'warning' as const,
    liked: course.hasMyLike,
    bookmarked: course.hasMyBookmark,
    tags: ['온라인강의', '리더십', '매니지먼트', '커리어', '성장'],
  }));
}

// Mock trending companies data
export const mockTrendingCompanies: MarketAssetMiniCardProps[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    currency: '$',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: -1.23,
    changePercent: -0.86,
    currency: '$',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 378.91,
    change: 5.67,
    changePercent: 1.52,
    currency: '$',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.23,
    change: -3.45,
    changePercent: -1.37,
    currency: '$',
  },
];

// Mock job market trends
export const mockJobMarketTrends: JobMarketTrend[] = [
  {
    id: '1',
    category: 'IT/개발',
    position: 'Frontend Developer',
    postingCount: 1245,
    change: 87,
    changePercent: 7.5,
    chart: [100, 105, 110, 108, 115, 120, 125],
  },
  {
    id: '2',
    category: 'IT/개발',
    position: 'Backend Developer',
    postingCount: 1580,
    change: 123,
    changePercent: 8.4,
    chart: [100, 102, 108, 112, 118, 124, 128],
  },
  {
    id: '3',
    category: 'AI/ML',
    position: 'ML Engineer',
    postingCount: 890,
    change: 156,
    changePercent: 21.3,
    chart: [100, 110, 115, 125, 135, 145, 156],
  },
  {
    id: '4',
    category: 'Design',
    position: 'UX Designer',
    postingCount: 567,
    change: -23,
    changePercent: -3.9,
    chart: [100, 98, 95, 94, 92, 90, 88],
  },
];

// Mock weather forecast
export const mockWeatherForecast: WeatherForecast[] = [
  {
    day: '내일',
    temp: 18,
    condition: 'sunny',
  },
  {
    day: '모레',
    temp: 16,
    condition: 'cloudy',
  },
  {
    day: '3일 후',
    temp: 14,
    condition: 'rainy',
  },
];

// Mock discover response (from user's provided data)
export const mockDiscoverResponse: DiscoverMockResponse = {
  id: 1783,
  user: {
    id: 725616,
  },
  persona: {
    id: 523,
  },
  date: '2025-10-30',
  jobs: [
    {
      id: 357170,
      title: 'Principal Software Engineer',
      url: 'https://jobs.careers.microsoft.com/global/en/job/1903375/Principal-Software-Engineer',
      company: {
        title: 'Microsoft US',
        sign: 'microsoftus',
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/microsoft.png',
      },
      summary:
        'Microsoft Azure Compute 팀에서 클라우드 인프라스트럭처의 핵심인 Azure Compute 플랫폼을 발전시킬 엔지니어를 모집합니다. 전 세계 수백만 대의 서버를 관리하며 유연하고 안정적이며 확장 가능한 컴퓨팅 용량을 제공하는 이 플랫폼에서, 탄력적인 컴퓨팅 지원, 성능 최적화, 대규모 안정성 확보 등의 업무를 수행하게 됩니다. 분산 시스템에 대한 깊은 이해와 복잡한 기술적 과제를 해결하는 능력을 갖춘 인재를 찾으며, Microsoft의 클라우드 생태계에 의미 있는 영향을 줄 기회를 제공합니다.',
      createdAt: '2025-10-27 15:00:00',
      updatedAt: '2025-10-27 15:00:00',
      score: 0.7,
      reason:
        '이 인재는 프론트엔드 개발팀 리더로서 클라우드 기반의 대규모 웹 애플리케이션 아키텍처 설계 및 구현 경험이 있습니다. Microsoft Azure Compute 팀의 채용 공고는 클라우드 인프라스트럭처의 핵심인 Azure Compute 플랫폼을 발전시키는 역할로, 이 인재의 기술적 배경과 프로젝트 매니징 능력을 활용할 수 있는 좋은 기회입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 356391,
      title: 'Community Lead (1 YR FTC)',
      url: 'https://wework.wd1.myworkdayjobs.com/ko-KR/WeWork/job/Berlin-Germany/Community-Lead--1-YR-FTC-_JR-0062780-1',
      company: {
        title: 'Wework',
        sign: 'wework',
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/wework.png',
      },
      summary:
        'WeWork에서 커뮤니티 리드(Community Lead)를 채용합니다. 본 포지션은 WeWork 공간의 멤버 경험을 향상시키고, 멤버들의 니즈를 충족하며, 글로벌 스탠다드를 유지하는 역할을 담당합니다. 주요 업무로는 멤버십 관리 및 유지, 신규 멤버 온보딩, 커뮤니티 활성화를 위한 이벤트 기획 및 실행, 건물 운영 및 관리, 안전 및 보안 관리, 영업 지원 등이 포함됩니다. 환대 산업(hospitality) 분야에서 2년 이상의 경험과 뛰어난 대인 관계 및 의사소통 능력을 갖춘 인재를 찾습니다.',
      createdAt: '2025-10-26 15:00:00',
      updatedAt: '2025-10-29 15:00:00',
      score: 0.65,
      reason:
        '이 인재는 팀 리더로서의 경험과 기술 교육 세션 주도를 통해 팀원들의 성장을 지원하고 있습니다. WeWork의 커뮤니티 리드 포지션은 멤버 경험을 향상시키고, 팀을 이끌어가는 역할로, 이 인재의 리더십과 커뮤니케이션 능력을 더욱 발전시킬 수 있는 기회를 제공합니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 355490,
      title: 'IT 서비스 안정성 및 위험관리 전문가 (경력)',
      url: 'https://careers.kakao.com/jobs/P-14275',
      company: {
        title: '카카오',
        sign: 'kakao',
        image: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
      },
      summary:
        '카카오에서 IT 재해 및 장애 등 위기관리 거버넌스를 책임지고 서비스 안정성을 강화할 전문가를 채용합니다. IT 거버넌스 체계 고도화, 전사 BCP 및 재해 관리, 서비스 장애 관리 프로세스 혁신, 대내외 Compliance 대응을 주요 업무로 하며, 관련 분야 10년 이상의 경력과 팀 리딩 경험이 필수입니다. 금융/통신 분야 IT 거버넌스, 관련 법규 기반 업무 경험자는 우대합니다. 서류 전형, 1차/2차 인터뷰를 거쳐 최종 합격자를 선정하며, 완전선택근무제, 월 1일 리커버리데이, 주 1일 원격근무 등 유연한 근로 제도를 제공합니다.',
      createdAt: '2025-10-26 15:00:00',
      updatedAt: '2025-10-29 15:00:00',
      score: 0.6,
      reason:
        '이 인재는 프로젝트 매니징과 팀 리딩 경험이 풍부합니다. 카카오는 IT 재해 및 장애 관리 전문가를 찾고 있으며, 이 인재의 경험이 서비스 안정성을 강화하는 데 기여할 수 있는 좋은 기회입니다. 특히, 금융/통신 분야의 IT 거버넌스 경험이 있다면 더욱 적합할 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 355533,
      title: 'Application Developer-Microsoft Dynamics 365 Customer Engagement',
      url: 'https://ibmglobal.avature.net/en_AU/careers/JobDetail?jobId=68789&source=WEB_Search_APAC',
      company: {
        title: 'IBM Global',
        sign: 'ibmglobal',
        image: 'https://publy.imgix.net/careerly/companies/symbol-image/2025/09/09/11hanhuxaha.png?w=400&h=400&auto=format',
      },
      summary:
        'IBM 컨설팅에서 Dynamics CRM 개발자를 채용합니다. 본 포지션은 고객사의 하이브리드 클라우드 및 AI 여정을 가속화하는 데 기여하며, 특히 Dynamics CRM 커스터마이징, 설정, C# .NET 및 Dynamics CRM 플러그인, 워크플로우, 웹 서비스 기반 애플리케이션 개발 업무를 수행합니다. JavaScript 스크립팅, 단위 테스트 및 어셈블리 테스트 생성, 고객 프로젝트 경험이 필수이며, Power Platform 도구(Power BI, Power Apps), Azure Logic Apps, Azure Functions 개발 및 배포 경험이 우대됩니다. 학사 학위 이상 소지자를 대상으로 하며, 석사 학위 소지자는 우대됩니다.',
      createdAt: '2025-10-26 15:00:00',
      updatedAt: '2025-10-28 15:00:00',
      score: 0.6,
      reason:
        '이 인재는 JavaScript 및 프로젝트 매니징 기술을 보유하고 있습니다. IBM의 Dynamics CRM 개발자 포지션은 고객사의 하이브리드 클라우드 및 AI 여정을 가속화하는 역할로, 이 인재의 기술적 역량과 프로젝트 경험을 활용할 수 있는 좋은 기회입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
  ],
  blogs: [
    // === 12월 8일 (일) - 5개 ===
    {
      id: 47700,
      title: 'Claude MCP(Model Context Protocol) 완벽 가이드: AI Agent 개발의 새로운 패러다임',
      url: 'https://tech.example.com/claude-mcp-guide',
      company: {
        title: '토스 테크블로그',
        sign: null,
        image: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      publishedAt: '2025-12-08',
      summary: 'Anthropic이 공개한 MCP(Model Context Protocol)는 AI 에이전트가 외부 도구와 데이터 소스에 접근하는 방식을 표준화합니다.',
      createdAt: '2025-12-08 09:00:00',
      score: 0.95,
      aiScore: 98,
      aiCategory: 'ai-dev',
      reason: 'AI Agent 개발의 핵심 프로토콜인 MCP에 대한 실무 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47750,
      title: 'Vercel AI SDK 4.0: 스트리밍 UI와 Tool Calling의 진화',
      url: 'https://tech.example.com/vercel-ai-sdk-4',
      company: {
        title: '당근 테크블로그',
        sign: null,
        image: 'https://about.daangn.com/static/media/daangn-symbol.57768a21.svg',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      publishedAt: '2025-12-08',
      summary: 'Vercel AI SDK 4.0의 새로운 기능들을 살펴봅니다. useChat, useCompletion 훅의 개선사항과 Tool Calling 패턴을 다룹니다.',
      createdAt: '2025-12-08 14:00:00',
      score: 0.91,
      aiScore: 94,
      aiCategory: 'ai-dev',
      reason: 'AI SDK 업데이트 및 실전 활용',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47751,
      title: 'AI 코파일럿으로 디자인 시스템 문서화 자동화하기',
      url: 'https://design.example.com/ai-design-docs',
      company: {
        title: '토스 디자인 블로그',
        sign: null,
        image: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      publishedAt: '2025-12-08',
      summary: 'Figma AI와 GitHub Copilot을 활용해 디자인 시스템 문서를 자동 생성하는 워크플로우를 공유합니다.',
      createdAt: '2025-12-08 11:00:00',
      score: 0.78,
      aiScore: 82,
      aiCategory: 'ai-design',
      reason: 'AI 기반 디자인 문서화 자동화',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47752,
      title: 'ChatGPT 팀 플랜 vs 엔터프라이즈: 우리 회사에 맞는 선택은?',
      url: 'https://blog.example.com/chatgpt-plans-compare',
      company: {
        title: '리멤버 블로그',
        sign: null,
        image: 'https://www.rememberapp.co.kr/assets/img/common/logo_symbol.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-08',
      summary: 'ChatGPT 팀 플랜과 엔터프라이즈 플랜의 기능, 보안, 가격을 비교 분석하고 도입 시 고려사항을 정리합니다.',
      createdAt: '2025-12-08 10:00:00',
      score: 0.72,
      aiScore: 68,
      aiCategory: 'ai-biz',
      reason: 'AI 도구 도입 의사결정 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47753,
      title: 'Sora로 만드는 제품 소개 영상: 프롬프트 작성법',
      url: 'https://design.example.com/sora-product-video',
      company: {
        title: '네이버 D2',
        sign: null,
        image: 'https://d2.naver.com/static/img/app/common/logo_d2.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop',
      publishedAt: '2025-12-08',
      summary: 'OpenAI Sora를 활용한 제품 소개 영상 제작 가이드. 효과적인 프롬프트 작성법과 편집 워크플로우를 소개합니다.',
      createdAt: '2025-12-08 16:00:00',
      score: 0.80,
      aiScore: 85,
      aiCategory: 'ai-design',
      reason: 'AI 영상 생성 실전 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },

    // === 12월 7일 (토) - 6개 ===
    {
      id: 47699,
      title: 'LangGraph로 구축하는 Multi-Agent 시스템: 실전 아키텍처 패턴',
      url: 'https://engineering.example.com/langgraph-multi-agent',
      company: {
        title: '카카오 테크블로그',
        sign: null,
        image: 'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/5f9c58c2017800001.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      publishedAt: '2025-12-07',
      summary: 'LangGraph를 활용한 복잡한 Multi-Agent 워크플로우 설계 방법을 다룹니다. State Graph 패턴과 에이전트 간 협업 전략을 설명합니다.',
      createdAt: '2025-12-07 14:00:00',
      score: 0.92,
      aiScore: 95,
      aiCategory: 'ai-dev',
      reason: 'LangGraph 기반 Multi-Agent 아키텍처 실전 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47754,
      title: 'Windsurf IDE 심층 리뷰: Cursor의 대안이 될 수 있을까?',
      url: 'https://tech.example.com/windsurf-review',
      company: {
        title: 'GeekNews',
        sign: null,
        image: 'https://news.hada.io/logo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-07',
      summary: 'Codeium의 새로운 AI IDE Windsurf를 2주간 실제 프로젝트에서 사용해본 솔직한 리뷰. Cursor와의 비교 분석.',
      createdAt: '2025-12-07 10:00:00',
      score: 0.88,
      aiScore: 90,
      aiCategory: 'ai-dev',
      reason: 'AI IDE 비교 리뷰',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47755,
      title: 'Canva AI로 SNS 콘텐츠 대량 생산하기',
      url: 'https://design.example.com/canva-ai-content',
      company: {
        title: '요즘IT',
        sign: null,
        image: 'https://yozm.wishket.com/static/img/og_image.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-07',
      summary: 'Canva의 AI 기능들을 활용해 인스타그램, 유튜브 썸네일 등 SNS 콘텐츠를 효율적으로 제작하는 방법을 공유합니다.',
      createdAt: '2025-12-07 09:00:00',
      score: 0.70,
      aiScore: 72,
      aiCategory: 'ai-design',
      reason: 'AI 디자인 툴 활용 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47756,
      title: 'AI 기반 코드 리뷰 자동화: CodeRabbit vs Sourcery 비교',
      url: 'https://tech.example.com/ai-code-review-tools',
      company: {
        title: 'LINE 테크블로그',
        sign: null,
        image: 'https://engineering.linecorp.com/images/line-developers-logo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-07',
      summary: 'PR 자동 리뷰 도구 CodeRabbit과 Sourcery를 실제 프로젝트에 적용해본 경험을 공유합니다.',
      createdAt: '2025-12-07 15:00:00',
      score: 0.85,
      aiScore: 88,
      aiCategory: 'ai-dev',
      reason: 'AI 코드 리뷰 도구 비교',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47757,
      title: 'Perplexity로 시장 조사 10배 빠르게 하기',
      url: 'https://blog.example.com/perplexity-research',
      company: {
        title: 'Disquiet 블로그',
        sign: null,
        image: 'https://disquiet.io/favicon.ico',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-07',
      summary: 'Perplexity AI를 활용한 효율적인 시장 조사 방법론. 경쟁사 분석, 트렌드 파악, 리포트 작성까지.',
      createdAt: '2025-12-07 11:00:00',
      score: 0.68,
      aiScore: 65,
      aiCategory: 'ai-biz',
      reason: 'AI 리서치 도구 활용',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47758,
      title: 'GPT-4 Vision으로 UI 테스트 자동화하기',
      url: 'https://tech.example.com/gpt4-vision-ui-test',
      company: {
        title: '우아한형제들 테크블로그',
        sign: null,
        image: 'https://techblog.woowahan.com/wp-content/uploads/2021/06/woowahanLogo.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      publishedAt: '2025-12-07',
      summary: 'GPT-4 Vision API를 활용한 시각적 UI 테스트 자동화 구현기. 스크린샷 기반 회귀 테스트를 AI로.',
      createdAt: '2025-12-07 17:00:00',
      score: 0.90,
      aiScore: 92,
      aiCategory: 'ai-dev',
      reason: 'AI 기반 UI 테스트 자동화',
      hasMyBookmark: false,
      hasMyLike: false,
    },

    // === 12월 6일 (금) - 5개 ===
    {
      id: 47698,
      title: 'ChatGPT로 업무 생산성 200% 올리기: 프롬프트 엔지니어링 실전 팁',
      url: 'https://blog.example.com/chatgpt-productivity',
      company: {
        title: '리멤버 블로그',
        sign: null,
        image: 'https://www.rememberapp.co.kr/assets/img/common/logo_symbol.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=400&h=300&fit=crop',
      publishedAt: '2025-12-06',
      summary: '일상 업무에서 ChatGPT를 효과적으로 활용하는 방법을 소개합니다. 이메일 작성, 회의록 정리, 보고서 작성 팁.',
      createdAt: '2025-12-06 10:00:00',
      score: 0.75,
      aiScore: 72,
      aiCategory: 'ai-biz',
      reason: 'AI 도구 활용 업무 생산성 향상 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47759,
      title: 'Amazon Bedrock으로 RAG 시스템 구축하기',
      url: 'https://tech.example.com/bedrock-rag',
      company: {
        title: '쿠팡 테크블로그',
        sign: null,
        image: 'https://www.coupang.com/favicon.ico',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-06',
      summary: 'AWS Bedrock의 Knowledge Bases 기능을 활용한 엔터프라이즈급 RAG 시스템 구축 가이드.',
      createdAt: '2025-12-06 14:00:00',
      score: 0.88,
      aiScore: 91,
      aiCategory: 'ai-dev',
      reason: 'AWS AI 서비스 활용',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47760,
      title: 'Figma AI 기능 총정리: 2024 연말 업데이트',
      url: 'https://design.example.com/figma-ai-update',
      company: {
        title: '토스 디자인 블로그',
        sign: null,
        image: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop',
      publishedAt: '2025-12-06',
      summary: 'Figma의 AI 기능들을 총정리합니다. AI 레이어 이름 지정, 자동 레이아웃, 이미지 생성 기능 활용법.',
      createdAt: '2025-12-06 11:00:00',
      score: 0.76,
      aiScore: 80,
      aiCategory: 'ai-design',
      reason: 'Figma AI 기능 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47761,
      title: 'Claude Artifacts로 프로토타입 빠르게 만들기',
      url: 'https://blog.example.com/claude-artifacts',
      company: {
        title: '요즘IT',
        sign: null,
        image: 'https://yozm.wishket.com/static/img/og_image.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-06',
      summary: 'Claude의 Artifacts 기능을 활용해 인터랙티브 프로토타입을 빠르게 만드는 방법. React 컴포넌트부터 게임까지.',
      createdAt: '2025-12-06 09:00:00',
      score: 0.82,
      aiScore: 86,
      aiCategory: 'ai-dev',
      reason: 'Claude AI 실전 활용',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47762,
      title: 'AI 어시스턴트 비교: Claude vs ChatGPT vs Gemini 2024',
      url: 'https://ai.example.com/ai-assistant-compare-2024',
      company: {
        title: 'GeekNews',
        sign: null,
        image: 'https://news.hada.io/logo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-06',
      summary: '2024년 말 기준 주요 AI 어시스턴트들의 성능, 기능, 가격을 종합 비교합니다.',
      createdAt: '2025-12-06 16:00:00',
      score: 0.78,
      aiScore: 75,
      aiCategory: 'ai-general',
      reason: 'AI 어시스턴트 비교 분석',
      hasMyBookmark: false,
      hasMyLike: false,
    },

    // === 12월 5일 (목) - 4개 ===
    {
      id: 47697,
      title: 'Cursor AI로 개발 속도 3배 높이기: VSCode에서 AI 페어 프로그래밍',
      url: 'https://tech.example.com/cursor-ai-development',
      company: {
        title: '배달의민족 테크블로그',
        sign: null,
        image: 'https://techblog.woowahan.com/wp-content/uploads/2021/06/woowahanLogo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-05',
      summary: 'Cursor IDE의 핵심 기능과 효과적인 활용법을 다룹니다. Composer 모드, Chat 기능, 코드 자동 완성의 차이점.',
      createdAt: '2025-12-05 11:00:00',
      score: 0.88,
      aiScore: 90,
      aiCategory: 'ai-dev',
      reason: 'AI 코딩 도구 Cursor 실전 활용 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47763,
      title: 'Gamma AI로 프레젠테이션 5분만에 만들기',
      url: 'https://blog.example.com/gamma-ai-presentation',
      company: {
        title: 'Disquiet 블로그',
        sign: null,
        image: 'https://disquiet.io/favicon.ico',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-05',
      summary: 'Gamma AI를 활용한 프레젠테이션 제작 가이드. 텍스트 입력만으로 전문적인 슬라이드를 만드는 방법.',
      createdAt: '2025-12-05 09:00:00',
      score: 0.65,
      aiScore: 62,
      aiCategory: 'ai-biz',
      reason: 'AI 프레젠테이션 도구',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47764,
      title: 'AI 이미지 생성 도구 비교: DALL-E 3 vs Midjourney vs Stable Diffusion',
      url: 'https://design.example.com/ai-image-compare',
      company: {
        title: '네이버 D2',
        sign: null,
        image: 'https://d2.naver.com/static/img/app/common/logo_d2.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=400&h=300&fit=crop',
      publishedAt: '2025-12-05',
      summary: '주요 AI 이미지 생성 도구들의 품질, 속도, 가격, 사용성을 비교 분석합니다.',
      createdAt: '2025-12-05 14:00:00',
      score: 0.74,
      aiScore: 78,
      aiCategory: 'ai-design',
      reason: 'AI 이미지 생성 도구 비교',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47765,
      title: 'Spring AI로 Java 백엔드에 LLM 통합하기',
      url: 'https://tech.example.com/spring-ai-integration',
      company: {
        title: 'NHN 테크블로그',
        sign: null,
        image: 'https://www.nhn.com/favicon.ico',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-05',
      summary: 'Spring AI 프레임워크를 활용해 Java 애플리케이션에 OpenAI, Anthropic API를 통합하는 방법.',
      createdAt: '2025-12-05 15:00:00',
      score: 0.86,
      aiScore: 89,
      aiCategory: 'ai-dev',
      reason: 'Java AI 통합 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },

    // === 12월 4일 (수) - 4개 ===
    {
      id: 47696,
      title: 'Next.js 15 App Router 마이그레이션 완벽 가이드',
      url: 'https://engineering.example.com/nextjs15-migration',
      company: {
        title: '카카오 테크블로그',
        sign: null,
        image: 'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/5f9c58c2017800001.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-04',
      summary: 'Next.js 14에서 15로 마이그레이션하면서 겪은 경험을 공유합니다. Turbopack, 새로운 캐싱 전략.',
      createdAt: '2025-12-04 15:00:00',
      score: 0.70,
      aiScore: 35,
      aiCategory: 'other',
      reason: 'Next.js 프레임워크 마이그레이션 기술 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47766,
      title: 'Copilot for Microsoft 365 실제 업무 활용기',
      url: 'https://blog.example.com/copilot-365-review',
      company: {
        title: '리멤버 블로그',
        sign: null,
        image: 'https://www.rememberapp.co.kr/assets/img/common/logo_symbol.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-04',
      summary: 'Microsoft 365 Copilot을 3개월간 사용해본 솔직한 후기. Excel, PowerPoint, Teams에서의 활용도.',
      createdAt: '2025-12-04 10:00:00',
      score: 0.70,
      aiScore: 68,
      aiCategory: 'ai-biz',
      reason: 'MS Copilot 실사용 후기',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47767,
      title: 'PostgreSQL에서 pgvector로 벡터 검색 구현하기',
      url: 'https://tech.example.com/pgvector-guide',
      company: {
        title: '당근 테크블로그',
        sign: null,
        image: 'https://about.daangn.com/static/media/daangn-symbol.57768a21.svg',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-04',
      summary: 'pgvector 확장을 사용해 PostgreSQL에서 벡터 유사도 검색을 구현하는 방법. RAG 시스템의 벡터 DB로 활용.',
      createdAt: '2025-12-04 14:00:00',
      score: 0.84,
      aiScore: 87,
      aiCategory: 'ai-dev',
      reason: '벡터 DB 구현 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47768,
      title: 'Adobe Firefly로 제품 이미지 배경 자동 생성하기',
      url: 'https://design.example.com/firefly-product-images',
      company: {
        title: '토스 디자인 블로그',
        sign: null,
        image: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-04',
      summary: 'Adobe Firefly의 생성적 채우기 기능을 활용해 이커머스 제품 이미지의 배경을 자동으로 생성하는 워크플로우.',
      createdAt: '2025-12-04 11:00:00',
      score: 0.72,
      aiScore: 76,
      aiCategory: 'ai-design',
      reason: 'Adobe AI 활용 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },

    // === 12월 3일 (화) - 4개 ===
    {
      id: 47695,
      title: 'AI 시대의 개발자 커리어: 5년 후를 준비하는 전략',
      url: 'https://blog.example.com/ai-developer-career',
      company: {
        title: 'wanted 인사이트',
        sign: null,
        image: 'https://static.wanted.co.kr/images/wdes/0_5.c7ead3a6.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-03',
      summary: 'AI가 개발 업무를 자동화하는 시대, 개발자가 키워야 할 역량. CTO 인터뷰를 통한 미래 개발자상.',
      createdAt: '2025-12-03 09:00:00',
      score: 0.65,
      aiScore: 60,
      aiCategory: 'ai-general',
      reason: 'AI 시대 개발자 커리어 전략',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47769,
      title: 'Anthropic Claude API 비용 최적화 전략',
      url: 'https://tech.example.com/claude-api-cost',
      company: {
        title: '뤼튼 테크블로그',
        sign: null,
        image: 'https://static.wrtn.io/images/wrtn/logo/logo-wrtn-symbol.svg',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-03',
      summary: 'Claude API 사용 비용을 줄이는 실전 팁. 프롬프트 캐싱, 배치 처리, 모델 선택 전략.',
      createdAt: '2025-12-03 14:00:00',
      score: 0.83,
      aiScore: 86,
      aiCategory: 'ai-dev',
      reason: 'AI API 비용 최적화',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47770,
      title: 'Runway Gen-3로 AI 뮤직비디오 만들기',
      url: 'https://design.example.com/runway-music-video',
      company: {
        title: '요즘IT',
        sign: null,
        image: 'https://yozm.wishket.com/static/img/og_image.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      publishedAt: '2025-12-03',
      summary: 'Runway의 최신 비디오 생성 모델 Gen-3를 활용한 뮤직비디오 제작 과정을 공유합니다.',
      createdAt: '2025-12-03 11:00:00',
      score: 0.75,
      aiScore: 79,
      aiCategory: 'ai-design',
      reason: 'AI 비디오 생성 활용',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47771,
      title: 'AI 챗봇 구축 플랫폼 비교: Dialogflow vs Rasa vs Botpress',
      url: 'https://tech.example.com/chatbot-platform-compare',
      company: {
        title: 'LINE 테크블로그',
        sign: null,
        image: 'https://engineering.linecorp.com/images/line-developers-logo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-03',
      summary: '주요 챗봇 구축 플랫폼들의 기능, 가격, 커스터마이징 용이성을 비교합니다.',
      createdAt: '2025-12-03 15:00:00',
      score: 0.80,
      aiScore: 82,
      aiCategory: 'ai-dev',
      reason: '챗봇 플랫폼 비교',
      hasMyBookmark: false,
      hasMyLike: false,
    },

    // === 12월 2일 (월) - 5개 ===
    {
      id: 47694,
      title: 'RAG 파이프라인 성능 최적화: Embedding부터 Reranking까지',
      url: 'https://tech.example.com/rag-optimization',
      company: {
        title: '네이버 D2',
        sign: null,
        image: 'https://d2.naver.com/static/img/app/common/logo_d2.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-02',
      summary: 'RAG 시스템의 검색 정확도와 응답 품질을 높이는 방법. Hybrid Search, Semantic Chunking, Reranking.',
      createdAt: '2025-12-02 16:00:00',
      score: 0.93,
      aiScore: 96,
      aiCategory: 'ai-dev',
      reason: 'RAG 시스템 최적화 심화 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47772,
      title: 'Gemini 2.0 Flash로 멀티모달 앱 만들기',
      url: 'https://tech.example.com/gemini-2-flash',
      company: {
        title: '카카오 테크블로그',
        sign: null,
        image: 'https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/5f9c58c2017800001.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
      publishedAt: '2025-12-02',
      summary: 'Google의 새로운 Gemini 2.0 Flash 모델을 활용한 멀티모달 애플리케이션 개발 가이드.',
      createdAt: '2025-12-02 10:00:00',
      score: 0.89,
      aiScore: 92,
      aiCategory: 'ai-dev',
      reason: 'Gemini 2.0 활용 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47773,
      title: 'AI 번역 도구 비교: DeepL vs Google vs ChatGPT',
      url: 'https://blog.example.com/ai-translation-compare',
      company: {
        title: 'Disquiet 블로그',
        sign: null,
        image: 'https://disquiet.io/favicon.ico',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-02',
      summary: '주요 AI 번역 서비스들의 정확도, 뉘앙스 표현력, 전문 용어 처리 능력을 비교합니다.',
      createdAt: '2025-12-02 09:00:00',
      score: 0.62,
      aiScore: 58,
      aiCategory: 'ai-general',
      reason: 'AI 번역 도구 비교',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47774,
      title: 'Stable Diffusion 3으로 일관된 캐릭터 생성하기',
      url: 'https://design.example.com/sd3-character',
      company: {
        title: '토스 디자인 블로그',
        sign: null,
        image: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-02',
      summary: 'Stable Diffusion 3의 새로운 기능들을 활용해 일관된 캐릭터 이미지를 생성하는 테크닉.',
      createdAt: '2025-12-02 14:00:00',
      score: 0.73,
      aiScore: 77,
      aiCategory: 'ai-design',
      reason: 'SD3 캐릭터 생성 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47775,
      title: 'Slack AI 기능 활용해서 팀 생산성 높이기',
      url: 'https://blog.example.com/slack-ai-features',
      company: {
        title: '리멤버 블로그',
        sign: null,
        image: 'https://www.rememberapp.co.kr/assets/img/common/logo_symbol.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-02',
      summary: 'Slack의 AI 요약, 검색, 채널 요약 기능을 활용한 팀 커뮤니케이션 효율화 방법.',
      createdAt: '2025-12-02 11:00:00',
      score: 0.66,
      aiScore: 63,
      aiCategory: 'ai-biz',
      reason: 'Slack AI 활용 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },

    // === 지난 주 (11/25 ~ 12/1) - 기존 데이터 유지 ===
    {
      id: 47693,
      title: 'GitHub Copilot Workspace 리뷰: AI가 이슈를 PR로 만들어준다면?',
      url: 'https://engineering.example.com/copilot-workspace',
      company: {
        title: 'LINE 테크블로그',
        sign: null,
        image: 'https://engineering.linecorp.com/images/line-developers-logo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-12-01',
      summary: 'GitHub Copilot Workspace 베타 버전 실제 테스트 경험. 이슈 분석부터 PR 생성까지.',
      createdAt: '2025-12-01 10:00:00',
      score: 0.85,
      aiScore: 88,
      aiCategory: 'ai-dev',
      reason: 'GitHub Copilot 새 기능 실전 리뷰',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47692,
      title: 'Kubernetes 클러스터 비용 50% 절감한 방법',
      url: 'https://tech.example.com/k8s-cost-optimization',
      company: {
        title: '쿠팡 테크블로그',
        sign: null,
        image: 'https://www.coupang.com/favicon.ico',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-11-30',
      summary: '대규모 Kubernetes 클러스터 운영 비용 절반으로 줄인 경험. Spot Instance, HPA/VPA 튜닝.',
      createdAt: '2025-11-30 14:00:00',
      score: 0.72,
      aiScore: 25,
      aiCategory: 'other',
      reason: 'Kubernetes 인프라 비용 최적화',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47691,
      title: 'Midjourney v6로 디자인 시스템 구축하기: AI 생성 에셋 활용법',
      url: 'https://design.example.com/midjourney-design-system',
      company: {
        title: '토스 디자인 블로그',
        sign: null,
        image: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
      publishedAt: '2025-11-29',
      summary: 'Midjourney v6를 활용해 일관된 디자인 에셋을 생성하는 방법. Style Reference 기능 활용.',
      createdAt: '2025-11-29 11:00:00',
      score: 0.68,
      aiScore: 78,
      aiCategory: 'ai-design',
      reason: 'AI 이미지 생성 도구 디자인 활용 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47690,
      title: 'OpenAI Assistants API v2 마이그레이션 가이드',
      url: 'https://tech.example.com/assistants-api-v2',
      company: {
        title: '뤼튼 테크블로그',
        sign: null,
        image: 'https://static.wrtn.io/images/wrtn/logo/logo-wrtn-symbol.svg',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-11-28',
      summary: 'OpenAI Assistants API v2 주요 변경 사항. Vector Store API, File Search, Streaming 지원.',
      createdAt: '2025-11-28 15:00:00',
      score: 0.90,
      aiScore: 94,
      aiCategory: 'ai-dev',
      reason: 'OpenAI API 마이그레이션 기술 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47689,
      title: 'TypeScript 5.4 새 기능 총정리: NoInfer와 개선된 타입 추론',
      url: 'https://engineering.example.com/typescript-54',
      company: {
        title: '우아한형제들 테크블로그',
        sign: null,
        image: 'https://techblog.woowahan.com/wp-content/uploads/2021/06/woowahanLogo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-11-27',
      summary: 'TypeScript 5.4의 새로운 기능들. NoInfer 유틸리티 타입, 클로저 타입 내로잉 개선.',
      createdAt: '2025-11-27 10:00:00',
      score: 0.65,
      aiScore: 20,
      aiCategory: 'other',
      reason: 'TypeScript 새 버전 기능 소개',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47688,
      title: 'Claude 3.5 Sonnet vs GPT-4o: 코딩 능력 벤치마크 비교',
      url: 'https://ai.example.com/claude-vs-gpt4o-coding',
      company: {
        title: 'GeekNews',
        sign: null,
        image: 'https://news.hada.io/logo.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: '2025-11-26',
      summary: '최신 LLM들의 코딩 능력 실제 비교. 버그 수정, 코드 리뷰, 리팩토링 10가지 시나리오.',
      createdAt: '2025-11-26 16:00:00',
      score: 0.82,
      aiScore: 85,
      aiCategory: 'ai-dev',
      reason: 'AI 코딩 모델 벤치마크 비교 분석',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47687,
      title: 'Notion AI로 문서 작업 자동화하기: 템플릿과 워크플로우',
      url: 'https://productivity.example.com/notion-ai-workflow',
      company: {
        title: 'Disquiet 블로그',
        sign: null,
        image: 'https://disquiet.io/favicon.ico',
      },
      source: null,
      category: null,
      imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
      publishedAt: '2025-11-25',
      summary: 'Notion AI 활용 문서 작업 자동화. 회의록 자동 정리, 번역, 요약, Q&A 생성 템플릿.',
      createdAt: '2025-11-25 09:00:00',
      score: 0.60,
      aiScore: 58,
      aiCategory: 'ai-biz',
      reason: 'AI 업무 자동화 도구 활용 가이드',
      hasMyBookmark: false,
      hasMyLike: false,
    },
  ],
  books: [
    {
      id: 47495,
      title: '리드 개발자로 가는 길',
      url: 'https://jpub.tistory.com/468927',
      company: {
        title: '제이펍 출판사',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/jpub.png',
      },
      source: 'book',
      category: null,
      imageUrl:
        'https://i1.daumcdn.net/thumb/C276x260/?fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fdk6blp%2FdJMb9Pfjqgb%2FAAAAAAAAAAAAAAAAAAAAADPGcXXK3M5eii8Fv88B3YatgEK7-Yad_QoHJKSP-MpX%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1761922799%26allow_ip%3D%26allow_referer%3D%26signature%3D6MqTEhGzSDGRFzQPZznDaXhf1YA%253D',
      publishedAt: null,
      summary:
        '이 책은 개발자에서 팀을 이끄는 리드 개발자로 성장하고자 하는 이들을 위한 실전 가이드입니다. 단순히 코드를 잘 작성하는 것을 넘어, 팀의 방향을 제시하고 위기를 기회로 바꾸는 리더의 역량이 중요해지는 IT 현장의 흐름을 반영합니다. 책은 개발 프로세스 개선, 기술 문서 작성, 고객과의 소통, 팀 멘토링, 건설적인 피드백 전달 등 리드 개발자에게 필요한 핵심 역량을 다룹니다. 또한, 커리어 경로 설계, 기술 학습 방법, 리더십 스타일 탐색, 프레젠테이션 기술 향상 등 개발자로서 다음 단계를 준비하는 데 필요한 구체적인 조언을 제공합니다. 특히, 한국어판 부록에는 한국 리드 개발자 10인의 인터뷰가 수록되어 있어, 국내 개발 환경에서의 생생한 경험과 실질적인 조언을 얻을 수 있습니다. 이 책은 기술 역량과 소프트 스킬의 균형을 통해 성공적인 리드 개발자가 되고자 하는 모든 개발자에게 필독서입니다.\n\n🌟 한 줄 요약: 개발자에서 리드 개발자로 성장하기 위한 기술과 리더십, 소프트 스킬을 아우르는 종합 가이드.',
      createdAt: '2025-10-28 15:00:00',
      score: 0.9,
      reason:
        '이 인재는 프론트엔드 개발팀 리더로서 팀원들의 기술 성장을 지원하고 프로젝트 매니징 능력을 발휘하고 있습니다. 이 책은 리드 개발자로 성장하기 위한 실전 가이드를 제공하여, 팀을 이끄는 리더의 역량을 키우는 데 실질적인 도움이 될 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47387,
      title: 'Full Stack Development with Spring Boot and React',
      url: 'https://www.packtpub.com/en-us/product/full-stack-development-with-spring-boot-and-react-9781801818643',
      company: {
        title: 'Packt 출판사',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/packtpub.png',
      },
      source: 'book',
      category: null,
      imageUrl: 'https://content.packt.com/B17818/cover_image.jpg',
      publishedAt: null,
      summary:
        '이 책은 Spring Boot와 React를 활용하여 강력하고 확장 가능한 풀스택 애플리케이션을 구축하는 방법을 다룹니다. Java 개발자가 풀스택 개발을 시작하는 데 필요한 모든 것을 제공하며, Spring Boot를 사용한 백엔드 개발의 기초(환경 설정, 의존성 주입, 보안, 테스트)부터 React를 활용한 프론트엔드 개발(Custom Hooks, 서드파티 컴포넌트, MUI 활용)까지 상세하게 안내합니다. 또한, RESTful 웹 서비스 구축, 데이터베이스 관리(ORM, JPA, Hibernate), 단위 테스트 및 JWT를 활용한 Spring Security 적용, 고성능 애플리케이션 개발, 프론트엔드 커스터마이징, 그리고 애플리케이션의 테스트, 보안, 배포까지 포괄적으로 다룹니다. 이 책을 통해 독자는 현대적인 풀스택 애플리케이션 개발 이론을 배우고 실질적인 기술 역량을 함양할 수 있습니다.\n\n🌟 한 줄 요약: Spring Boot와 React를 활용한 풀스택 개발의 전 과정을 실습 중심으로 학습할 수 있는 종합 가이드',
      createdAt: '2025-10-27 15:00:00',
      score: 0.7,
      reason:
        '이 인재는 React와 JavaScript에 대한 깊은 이해를 바탕으로 팀의 기술적 방향성을 설정하고 있습니다. 이 책은 Spring Boot와 React를 활용한 풀스택 개발을 다루고 있어, 이 인재의 기술 스택을 확장하는 데 유용할 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47565,
      title: '실무에 바로 쓰는 일잘러의 챗GPT 프롬프트 74가지',
      url: 'https://jpub.tistory.com/468928',
      company: {
        title: '제이펍 출판사',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/jpub.png',
      },
      source: 'book',
      category: null,
      imageUrl:
        'https://i1.daumcdn.net/thumb/C276x260/?fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FXB6Kq%2FdJMb84cp1rm%2FAAAAAAAAAAAAAAAAAAAAAIh8eTYajbo772MAlCouxhY-pVuMil9l53WjtUR9SKra%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1761922799%26allow_ip%3D%26allow_referer%3D%26signature%3DhxEVooJjHw195qbCukx%252FGdNbQb8%253D',
      publishedAt: null,
      summary:
        '본 콘텐츠는 \'실무에 바로 쓰는 일잘러의 챗GPT 프롬프트 74가지\'라는 도서를 소개하며, 챗GPT를 활용하여 업무 효율을 높이고 일상에 집중할 수 있는 노하우를 제공합니다. 이 책은 단순한 챗GPT 기능 설명이 아닌, 74가지의 실용적인 프롬프트를 통해 이메일 작성, 기획안 검토, 데이터 분석, 프레젠테이션 준비 등 직장 업무 전반을 혁신하는 방법을 제시합니다. 또한, 번아웃 극복, 동기 부여, 소비 습관 분석 등 개인적인 고민 해결에도 챗GPT를 활용할 수 있음을 보여줍니다. 특히, 챗GPT 초보자도 쉽게 따라 할 수 있도록 노션에 정리된 프롬프트를 복사-붙여넣기만으로 활용 가능하며, Gamma AI, Napkin AI, 클로바노트, Draw.io 등 다양한 AI 도구와의 연계를 통해 챗GPT의 잠재력을 극대화하는 방법도 다룹니다. 이 책은 AI와 함께 일하는 시대에 필요한 챗GPT 활용 기준을 제시하며, 일과 삶의 균형을 추구하는 모든 사람에게 유용한 가이드가 될 것입니다.\n\n🌟 한 줄 요약: 챗GPT 프롬프트 74가지로 업무와 일상을 혁신하는 실용 가이드.',
      createdAt: '2025-10-29 15:00:00',
      score: 0.6,
      reason:
        'AI와 협업하여 문제를 해결하는 \'바이브 코더\'로서의 성장에 관심이 있는 이 인재에게, 이 책은 AI와 함께 프로젝트를 체계적으로 수행하는 방법을 제시합니다. 이는 이 인재의 기술적 역량을 더욱 강화하는 데 도움이 될 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
  ],
  courses: [
    {
      id: 47404,
      url: 'https://www.linkedin.com/learning/paths/human-centered-leadership-for-aspiring-managers',
      company: {
        title: 'Linkedin Edu',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/linkedinlearning.png',
      },
      author: null,
      instructor: null,
      category: null,
      subcategory: null,
      imageUrl:
        'https://media.licdn.com/dms/image/v2/D560DAQHvfs_PULybTg/learning-public-banner-crop_300_1400/B56ZnQBv6.JoAQ-/0/1760131743600?e=2147483647&v=beta&t=Ug7ljzzgQQwDCa1rsBJZAS2QafyapiqQw1bsRmGPrRg',
      level: null,
      title: 'Human-Centered Leadership for Aspiring Managers',
      subtitle: null,
      tags: ['Development', 'Develop', 'Radar', '3', 'Business'],
      summary:
        '본 콘텐츠는 개인 기여자에서 관리자로 전환을 준비하는 예비 관리자들을 위한 인간 중심 리더십 기술을 다룹니다. 감성 지능, 적극적 경청, 공감적 소통, 주인의식 및 책임감, 변화에 대한 적응력 등 팀의 신뢰, 협업, 성공을 증진하는 데 필수적인 사고방식과 행동을 개발하는 데 초점을 맞춥니다. 특히, 감성 지능을 활용하여 관계를 강화하고, 적극적 경청과 공감적 소통을 통해 팀원들이 존중받고 이해받는다고 느끼게 하며, 주인의식과 책임감을 모델링하여 팀의 성과를 이끌어내는 방법을 안내합니다. 또한, 변화와 불확실성에 유연하게 대처하는 적응력 있는 리더십을 함양하는 방법을 제시합니다. 이 과정은 관리자로서의 성공적인 전환을 위한 실질적인 지침을 제공합니다.\n\n🌟 한 줄 요약: 예비 관리자가 팀의 성공을 이끄는 인간 중심 리더십 역량을 키우는 방법을 안내합니다.',
      publishedAt: null,
      createdAt: '2025-10-28 15:00:00',
      score: 0.8,
      reason:
        '이 강의는 팀 리더로서 필요한 인간 중심의 리더십 기술을 개발하는 데 중점을 두고 있습니다. 특히, 팀원들과의 신뢰 구축 및 효과적인 커뮤니케이션을 통해 팀의 성과를 높이는 데 도움이 될 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47410,
      url: 'https://www.linkedin.com/learning/paths/human-centered-leadership-for-senior-executives',
      company: {
        title: 'Linkedin Edu',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/linkedinlearning.png',
      },
      author: null,
      instructor: null,
      category: null,
      subcategory: null,
      imageUrl:
        'https://media.licdn.com/dms/image/v2/D560DAQHytVCM40zJHw/learning-public-banner-crop_300_1400/B56ZnP5SccJsAQ-/0/1760129525737?e=2147483647&v=beta&t=1Qy0ZSfqBNKQ-a2CEIhSfQUxHlQsWp130F3SH2wta-s',
      level: null,
      title: 'Human-Centered Leadership for Senior Executives',
      subtitle: null,
      tags: ['C', 'AI', 'Community', 'organizations', '3', 'Performance'],
      summary:
        '본 콘텐츠는 복잡하고 글로벌하며 AI가 지원되는 비즈니스 환경에서 기업 변화를 주도하고자 하는 임원 및 C-레벨 리더를 대상으로 인간 중심 리더십 스킬을 제공합니다. 고성과 리더십 팀 구축, 모호함 탐색, 감성 지능 활용, 비전 제시를 통한 조직 성장 및 회복력 강화에 초점을 맞춘 전문가 주도 강좌들로 구성되어 있습니다. 특히, 현대적인 직장을 위한 임원 리더십 팀 구축, 양자적 사고를 통한 리더십 모호함 탐색, 글로벌 팀 및 조직 리딩의 구체적인 도전 과제 극복, 생성형 AI를 활용한 리더의 감성 지능 향상, 그리고 임원을 위한 고급 갈등 해결 기법에 대한 내용을 다룹니다. 또한, 혁신, 참여, 성장의 문화를 조성하는 변혁적 리더십에 대한 강좌도 포함되어 있습니다.\n\n🌟 한 줄 요약: AI 시대, 임원은 인간 중심 리더십으로 조직 변화와 성장을 이끌어야 한다.',
      publishedAt: null,
      createdAt: '2025-10-27 15:00:00',
      score: 0.7,
      reason:
        '이 강의는 고위 경영진을 위한 인간 중심의 리더십 기술을 다루며, 팀의 성과를 극대화하고 조직의 변화를 이끌어내는 데 필요한 전략적 통찰력을 제공합니다. 팀 리더로서의 역량을 더욱 강화할 수 있습니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47415,
      url: 'https://www.linkedin.com/learning/paths/human-centered-leadership-for-senior-managers-and-senior-leaders',
      company: {
        title: 'Linkedin Edu',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/linkedinlearning.png',
      },
      author: null,
      instructor: null,
      category: null,
      subcategory: null,
      imageUrl:
        'https://media.licdn.com/dms/image/v2/D560DAQEMkNQtwDLBXg/learning-public-banner-crop_300_1400/B56ZnP0pvUI4AU-/0/1760128310418?e=2147483647&v=beta&t=Rm7VbrhHYqqFvkwQHwXL4DgnTDNYPR9QpMiYsJ0fXGo',
      level: null,
      title: 'Human-Centered Leadership for Senior Managers and Senior Leaders',
      subtitle: null,
      tags: ['C', 'Framework', 'Development', '24', 'Develop', '11'],
      summary:
        '본 콘텐츠는 경험 많은 관리자가 리더십 역할로 전환하는 데 필요한 핵심 역량을 강화하는 데 초점을 맞춥니다. 조직 내 역학 관계를 탐색하고, 갈등 상황을 효과적으로 관리하며, 팀이 전략적으로 사고하도록 코칭하는 기술을 개발합니다. 또한 권력 관계를 활용하고, 포용적인 문화를 조성하며, 공감과 솔직함을 바탕으로 변혁적 변화를 주도하는 방법을 배웁니다. 리더십 전환, 공감적 솔직함, 용감한 리더십, 전략적 사고 코칭, 리더십 효과성, 조직 내 권력 역학 활용, 임원 리더십으로의 전환, 디자인 씽킹을 통한 변화 주도, 조직 정치 탐색, 갈등에서 용기로 나아가기, 문화적 역량 및 포용성 함양, 공감으로 리드하기 등 다양한 주제를 다루는 12개의 강좌로 구성되어 있습니다. 각 강좌는 해당 분야의 전문가들이 진행하며, 실질적인 기술과 통찰력을 제공하여 리더들이 조직 내에서 더 큰 영향력을 발휘하고 성공적으로 이끌 수 있도록 돕습니다.\n\n🌟 한 줄 요약: 경험 많은 관리자가 리더십으로 성공적으로 전환하고 조직에 긍정적인 변화를 이끌기 위한 실질적인 가이드라인을 제공합니다.',
      publishedAt: null,
      createdAt: '2025-10-29 15:00:00',
      score: 0.6,
      reason:
        '이 강의는 경험이 풍부한 관리자들이 리더십 역할로 나아가는 데 필요한 기술을 개발하는 데 초점을 맞추고 있습니다. 팀원들을 코칭하고 전략적 사고를 촉진하는 방법을 배우는 것은 이 인재의 커리어 성장에 큰 도움이 될 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
  ],
  createdAt: '2025-10-30 01:38:00',
};

// Get detailed content by ID
export function getDiscoverContentDetail(id: string): DiscoverContentDetail | null {
  const allContent = [
    ...transformJobsToContentCards(mockDiscoverResponse.jobs),
    ...transformBlogsToContentCards(mockDiscoverResponse.blogs),
    ...transformBooksToContentCards(mockDiscoverResponse.books),
    ...transformCoursesToContentCards(mockDiscoverResponse.courses),
  ];

  const content = allContent.find((item) => item.contentId === id);
  if (!content) return null;

  // Add additional detail fields
  const tags: string[] = [];
  let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
  let readTime = '5분';
  let metadata: ContentMetadata | undefined;
  let jobRoleMetadata: JobRoleMetadata | undefined;

  if (id.startsWith('job-')) {
    tags.push('채용', '커리어', 'IT');
    readTime = '3분';
    metadata = {
      averageSalary: '8,500만원',
      openPositions: 24,
      employeeSatisfaction: 85,
      hiringTrend: 7.5,
      companySize: '1,000-5,000명',
      industry: 'IT/소프트웨어',
      foundedYear: 1975,
      companyName: '토스',
      companyLogo: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
    } as JobMetadata;
    jobRoleMetadata = {
      roleName: '프론트엔드 개발자',
      marketDemand: 87,
      salaryRange: {
        min: 45000000,
        max: 95000000,
        average: 68000000
      },
      experienceDistribution: {
        junior: 25,
        mid: 45,
        senior: 30
      },
      requiredSkills: [
        { name: 'React', importance: 95 },
        { name: 'TypeScript', importance: 90 },
        { name: 'JavaScript', importance: 85 },
        { name: 'HTML/CSS', importance: 80 },
        { name: 'Next.js', importance: 75 },
        { name: 'Git', importance: 70 }
      ],
      demandTrend: [520, 580, 640, 710, 780, 850],
      growthRate: 18.5,
      competitionLevel: 'high'
    } as JobRoleMetadata;
  } else if (id.startsWith('blog-')) {
    tags.push('기술', '블로그', '인사이트');
    difficulty = 'intermediate';
    readTime = '7분';
    metadata = {
      totalPosts: 458,
      averageViews: 12500,
      postFrequency: '주 2-3회',
      popularityRank: 15,
      techStack: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
    } as BlogMetadata;
  } else if (id.startsWith('book-')) {
    tags.push('도서', '학습', '성장');
    difficulty = 'beginner';
    readTime = '10분';
    metadata = {
      publisher: '제이펍',
      rating: 4.7,
      reviewCount: 342,
      pages: 428,
      publishDate: '2024-02-15',
      isbn: '979-11-92987-45-6',
    } as BookMetadata;
  } else if (id.startsWith('course-')) {
    tags.push('강의', '온라인', '학습');
    difficulty = 'intermediate';
    readTime = '15분';
    metadata = {
      students: 12847,
      rating: 4.8,
      completionRate: 78,
      duration: '12시간 30분',
      level: '중급',
    } as CourseMetadata;
  }

  // Get related content (exclude current item)
  const relatedContent = allContent
    .filter((item) => item.contentId !== id && item.badgeTone === content.badgeTone)
    .slice(0, 3);

  return {
    ...content,
    contentId: content.contentId!, // contentId는 transform 함수에서 항상 설정됨
    tags,
    difficulty,
    readTime,
    fullContent: content.summary,
    relatedContent,
    metadata,
    jobRoleMetadata,
  };
}

// Today's Jobs Mock Data
export const mockSourceStats = {
  totalSources: 1240,
  activeJobs: 8543,
  updatesToday: 342,
};

// 카테고리별 출처 데이터
export const mockSourcesByCategory = {
  companies: [
    {
      id: 'company-1',
      name: '토스',
      logo: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      activeCount: 156,
      category: 'Fintech',
    },
    {
      id: 'company-2',
      name: '카카오',
      logo: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
      activeCount: 124,
      category: 'Tech',
    },
    {
      id: 'company-3',
      name: '네이버',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/naver.png',
      activeCount: 98,
      category: 'Tech',
    },
    {
      id: 'company-4',
      name: '쿠팡',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/coupang.png',
      activeCount: 87,
      category: 'E-commerce',
    },
    {
      id: 'company-5',
      name: '라인',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/line.png',
      activeCount: 65,
      category: 'Global',
    },
    {
      id: 'company-6',
      name: '뤼튼',
      logo: 'https://publy.imgix.net/admin/careerly/company/ci/wrtn-symbol_1683698706.webp?w=400&h=400&auto=format',
      activeCount: 42,
      category: 'AI',
    },
    {
      id: 'company-7',
      name: '당근',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/daangn.png',
      activeCount: 38,
      category: 'Platform',
    },
    {
      id: 'company-8',
      name: '배달의민족',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/baemin.png',
      activeCount: 31,
      category: 'Delivery',
    },
  ],
  blogs: [
    {
      id: 'blog-1',
      name: '카카오페이 테크블로그',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/kakaopaytech.png',
      activeCount: 245,
      category: 'Tech Blog',
    },
    {
      id: 'blog-2',
      name: '토스 테크블로그',
      logo: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
      activeCount: 198,
      category: 'Tech Blog',
    },
    {
      id: 'blog-3',
      name: '우아한형제들 기술블로그',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/woowahan.png',
      activeCount: 176,
      category: 'Tech Blog',
    },
    {
      id: 'blog-4',
      name: '당근 테크블로그',
      logo: 'https://about.daangn.com/static/media/daangn-symbol.57768a21.svg',
      activeCount: 167,
      category: 'Tech Blog',
    },
    {
      id: 'blog-5',
      name: '네이버 D2',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/naver.png',
      activeCount: 156,
      category: 'Tech Blog',
    },
    {
      id: 'blog-6',
      name: '쿠팡 엔지니어링 블로그',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/coupang.png',
      activeCount: 134,
      category: 'Tech Blog',
    },
    {
      id: 'blog-7',
      name: '라인 엔지니어링',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/line.png',
      activeCount: 123,
      category: 'Tech Blog',
    },
    {
      id: 'blog-8',
      name: 'SK Planet 블로그',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/skplanet.jpg',
      activeCount: 98,
      category: 'Tech Blog',
    },
    {
      id: 'blog-9',
      name: 'Hyperconnect 테크블로그',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/hyperconnect.png',
      activeCount: 87,
      category: 'Tech Blog',
    },
    {
      id: 'blog-10',
      name: 'Sequoia 블로그',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/sequoiacap.png',
      activeCount: 76,
      category: 'VC Insight',
    },
  ],
  education: [
    {
      id: 'edu-1',
      name: 'LinkedIn Learning',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/linkedinlearning.png',
      activeCount: 1250,
      category: 'Online Course',
    },
    {
      id: 'edu-2',
      name: 'Udemy',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/udemy.png',
      activeCount: 980,
      category: 'Online Course',
    },
    {
      id: 'edu-3',
      name: 'Coursera',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/coursera.png',
      activeCount: 756,
      category: 'Online Course',
    },
    {
      id: 'edu-4',
      name: '인프런',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/inflearn.png',
      activeCount: 542,
      category: 'Online Course',
    },
  ],
  books: [
    {
      id: 'book-1',
      name: '제이펍 출판사',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/jpub.png',
      activeCount: 328,
      category: 'Publisher',
    },
    {
      id: 'book-2',
      name: 'Packt 출판사',
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/packtpub.png',
      activeCount: 412,
      category: 'Publisher',
    },
    {
      id: 'book-3',
      name: "O'Reilly",
      logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/oreilly.png',
      activeCount: 567,
      category: 'Publisher',
    },
  ],
};

// 기존 호환성을 위한 export
export const mockTopSources = mockSourcesByCategory.companies.slice(0, 5);
export const mockTodayJobs = [
  {
    company: {
      id: '740',
      name: '스노우',
      symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/snow-symbol_1694506510.webp?w=400&h=400&auto=format',
    },
    jobs: [
      {
        id: '357993',
        url: 'https://recruit.snowcorp.com/rcrt/view.do?annoId=30004061',
        title: '[KREAM] Brand Growth Marketing 담당자 모집',
        summary: 'KREAM의 브랜드 성장을 이끌 마케팅 담당자를 찾습니다. 브랜드 캠페인 기획 및 실행, 성과 분석을 담당합니다.',
        createdAt: '2025-12-06',
        aiCategory: 'ai-enabled' as AICategory,
        jobRole: 'marketing' as JobRole,
        company: {
          name: '스노우',
          symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/snow-symbol_1694506510.webp?w=400&h=400&auto=format',
        },
      },
      {
        id: '357243',
        url: 'https://recruit.snowcorp.com/rcrt/view.do?annoId=30004056',
        title: '[SNOW] 그로스 마케터 (계약직)',
        summary: 'SNOW 앱의 사용자 성장을 위한 마케팅 전략 수립 및 실행. 데이터 기반 성과 분석 및 개선 업무.',
        createdAt: '2025-12-05',
        aiCategory: 'ai-enabled' as AICategory,
        jobRole: 'marketing' as JobRole,
        company: {
          name: '스노우',
          symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/snow-symbol_1694506510.webp?w=400&h=400&auto=format',
        },
      },
    ],
  },
  {
    company: {
      id: '1164',
      name: '플리토',
      symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/Flitto_sns_profile.png',
    },
    jobs: [
      {
        id: '358256',
        url: 'https://flitto.career.greetinghr.com/ko/o/183669',
        title: '[플리토] AI Data Engineer 인턴 채용',
        summary: 'AI 모델 학습용 데이터 파이프라인 구축 및 관리, ETL 프로세스 개발. Python, SQL 활용 데이터 처리 업무.',
        createdAt: '2025-12-07',
        aiCategory: 'ai-core' as AICategory,
        jobRole: 'data' as JobRole,
        company: {
          name: '플리토',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/Flitto_sns_profile.png',
        },
      },
      {
        id: '358254',
        url: 'https://flitto.career.greetinghr.com/ko/o/184662',
        title: '[플리토] 프로젝트 인재풀 운영 매니저 채용',
        summary: '번역가 인재풀 관리 및 프로젝트 매칭. 번역 품질 관리 및 번역가 커뮤니케이션 업무.',
        createdAt: '2025-12-07',
        aiCategory: 'traditional' as AICategory,
        jobRole: 'operations' as JobRole,
        company: {
          name: '플리토',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/Flitto_sns_profile.png',
        },
      },
    ],
  },
  {
    company: {
      id: '360',
      name: '카카오',
      symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
    },
    jobs: [
      {
        id: '357503',
        url: 'https://careers.kakao.com/jobs/P-14279',
        title: '전략 기획 담당자 (경력)',
        summary: '카카오 사업 전략 수립 및 실행. 시장 분석, 경쟁사 분석, 신규 사업 기회 발굴 업무.',
        createdAt: '2025-12-04',
        aiCategory: 'traditional' as AICategory,
        jobRole: 'pm' as JobRole,
        company: {
          name: '카카오',
          symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
        },
      },
    ],
  },
  {
    company: {
      id: '905',
      name: '뤼튼테크놀로지스',
      symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/wrtn-symbol_1683698706.webp?w=400&h=400&auto=format',
    },
    jobs: [
      {
        id: '358063',
        url: 'https://wrtn.career.greetinghr.com/ko/o/184103',
        title: '[크랙] AI Product Designer',
        summary: 'AI 기반 서비스의 UX/UI 디자인. 사용자 리서치, 프로토타이핑, 디자인 시스템 구축 업무.',
        createdAt: '2025-12-06',
        aiCategory: 'ai-enabled' as AICategory,
        jobRole: 'design' as JobRole,
        company: {
          name: '뤼튼테크놀로지스',
          symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/wrtn-symbol_1683698706.webp?w=400&h=400&auto=format',
        },
      },
      {
        id: '358061',
        url: 'https://wrtn.career.greetinghr.com/ko/o/184202',
        title: '[크랙] AI Product Design Lead',
        summary: 'AI 제품 디자인 팀 리드 및 제품 디자인 전략 수립. 디자인 시스템 관리, 팀 멘토링 업무.',
        createdAt: '2025-12-06',
        aiCategory: 'ai-enabled' as AICategory,
        jobRole: 'design' as JobRole,
        company: {
          name: '뤼튼테크놀로지스',
          symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/wrtn-symbol_1683698706.webp?w=400&h=400&auto=format',
        },
      },
    ],
  },
  {
    company: {
      id: '1404',
      name: 'xAI',
      symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
    },
    jobs: [
      {
        id: '358064',
        url: 'https://job-boards.greenhouse.io/xai/jobs/4959262007',
        title: 'Windows Systems Engineer',
        summary: 'AI 인프라용 Windows 시스템 구축 및 관리. Active Directory, 그룹 정책, 보안 설정 업무.',
        createdAt: '2025-12-06',
        aiCategory: 'ai-enabled' as AICategory,
        jobRole: 'engineering' as JobRole,
        company: {
          name: 'xAI',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
        },
      },
      {
        id: '358850',
        url: 'https://job-boards.greenhouse.io/xai/jobs/4961357007',
        title: 'AI Infrastructure Engineer',
        summary: '대규모 AI 모델 학습을 위한 네트워크 인프라 운영 및 배포 자동화. GPU 클러스터 관리.',
        createdAt: '2025-12-07',
        aiCategory: 'ai-core' as AICategory,
        jobRole: 'engineering' as JobRole,
        company: {
          name: 'xAI',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
        },
      },
      {
        id: '357269',
        url: 'https://job-boards.greenhouse.io/xai/jobs/4959690007',
        title: 'RL Environments Specialist',
        summary: '강화학습 환경 구축 및 최적화. 시뮬레이션 환경 개발, 벤치마크 설계 업무.',
        createdAt: '2025-12-05',
        aiCategory: 'ai-core' as AICategory,
        jobRole: 'engineering' as JobRole,
        company: {
          name: 'xAI',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
        },
      },
    ],
  },
];

// 날짜별 채용공고 데이터 + AI 요약 + 카테고리별 브리핑
export const mockDailyJobData: Record<string, {
  summary: string;
  companies: typeof mockTodayJobs;
  categoryBriefings?: AICategoryBriefing[];
}> = {
  '2025-12-07': {
    summary: '오늘 수집된 채용공고는 총 10개입니다. 스노우, 플리토, 카카오, 뤼튼테크놀로지스, xAI 등 5개 기업에서 새로운 포지션을 오픈했습니다.',
    companies: mockTodayJobs,
    categoryBriefings: [
      {
        category: 'ai-core',
        title: 'AI 핵심 직무',
        summary: 'xAI와 플리토에서 AI 인프라 및 데이터 엔지니어링 포지션을 오픈했습니다. 특히 xAI의 RL Environments Specialist는 강화학습 환경 전문가로, 국내에서 보기 드문 희소 포지션입니다.',
        keyInsight: '강화학습 전문가 수요 증가',
        jobCount: 3,
      },
      {
        category: 'ai-enabled',
        title: 'AI 활용 직무',
        summary: '뤼튼에서 AI 제품 디자이너를 채용하고 있어 AI 스타트업의 디자인 조직 확장이 눈에 띕니다. 마케팅 분야에서도 AI 기반 데이터 분석 역량을 요구하는 추세입니다.',
        keyInsight: 'AI 제품 디자인 수요 급증',
        jobCount: 5,
      },
      {
        category: 'traditional',
        title: '기타 직무',
        summary: '카카오 전략 기획과 플리토 운영 매니저 등 전통적인 직무도 채용 중입니다. 대기업의 사업 확장과 스타트업의 운영 효율화 니즈가 반영된 것으로 보입니다.',
        keyInsight: '전략/운영 직무 꾸준한 수요',
        jobCount: 2,
      },
    ],
  },
  '2025-12-06': {
    summary: '어제 수집된 채용공고는 총 3개입니다. 카카오와 네이버, 두 대기업에서 개발자 포지션을 오픈했습니다.',
    companies: [
      {
        company: {
          id: '360',
          name: '카카오',
          symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
        },
        jobs: [
          {
            id: '357510',
            url: 'https://careers.kakao.com/jobs/P-14280',
            title: '프론트엔드 개발자 (React/TypeScript)',
            summary: '카카오 서비스의 웹 프론트엔드 개발. React, TypeScript 기반 UI 컴포넌트 설계 및 구현.',
            createdAt: '2025-12-06',
            aiCategory: 'ai-enabled' as AICategory,
            jobRole: 'engineering' as JobRole,
            company: {
              name: '카카오',
              symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
            },
          },
          {
            id: '357511',
            url: 'https://careers.kakao.com/jobs/P-14281',
            title: '백엔드 개발자 (Java/Kotlin)',
            summary: 'MSA 기반 서비스 개발 및 운영. Spring Boot, Kotlin 활용한 API 설계.',
            createdAt: '2025-12-06',
            aiCategory: 'traditional' as AICategory,
            jobRole: 'engineering' as JobRole,
            company: {
              name: '카카오',
              symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
            },
          },
        ],
      },
      {
        company: {
          id: '100',
          name: '네이버',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/naver.png',
        },
        jobs: [
          {
            id: '357520',
            url: 'https://recruit.navercorp.com/jobs/12345',
            title: '검색 플랫폼 엔지니어',
            summary: '네이버 검색 서비스의 핵심 플랫폼 개발. 대용량 데이터 처리 및 검색 알고리즘 최적화.',
            createdAt: '2025-12-06',
            aiCategory: 'ai-enabled' as AICategory,
            jobRole: 'engineering' as JobRole,
            company: {
              name: '네이버',
              symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/naver.png',
            },
          },
        ],
      },
    ],
    categoryBriefings: [
      {
        category: 'ai-enabled',
        title: 'AI 활용 직무',
        summary: '카카오와 네이버에서 AI 기술을 활용하는 개발자를 채용 중입니다. 특히 검색 알고리즘 최적화와 프론트엔드 개발에 AI 도구 활용이 필수가 되고 있습니다.',
        keyInsight: '대기업 AI 활용 개발자 채용 활발',
        jobCount: 2,
      },
      {
        category: 'traditional',
        title: '기타 직무',
        summary: '카카오 백엔드 개발자 포지션은 MSA 전환 프로젝트와 관련된 것으로 보입니다. 전통적인 백엔드 아키텍처 역량이 여전히 중요합니다.',
        keyInsight: 'MSA 아키텍처 경험 중시',
        jobCount: 1,
      },
    ],
  },
  '2025-12-05': {
    summary: '이날 수집된 채용공고는 총 2개로, 모두 토스에서 나왔습니다. Security Engineer와 Data Analyst 포지션입니다.',
    companies: [
      {
        company: {
          id: '200',
          name: '토스',
          symbolImageUrl: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
        },
        jobs: [
          {
            id: '357530',
            url: 'https://toss.im/career/jobs/12345',
            title: 'Security Engineer',
            summary: '토스 금융 서비스의 보안 아키텍처 설계 및 취약점 분석. 침투 테스트 및 보안 감사.',
            createdAt: '2025-12-05',
            aiCategory: 'traditional' as AICategory,
            jobRole: 'engineering' as JobRole,
            company: {
              name: '토스',
              symbolImageUrl: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
            },
          },
          {
            id: '357531',
            url: 'https://toss.im/career/jobs/12346',
            title: 'Data Analyst',
            summary: '사용자 행동 데이터 분석 및 인사이트 도출. A/B 테스트 설계 및 결과 분석.',
            createdAt: '2025-12-05',
            aiCategory: 'ai-enabled' as AICategory,
            jobRole: 'data' as JobRole,
            company: {
              name: '토스',
              symbolImageUrl: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
            },
          },
        ],
      },
    ],
    categoryBriefings: [
      {
        category: 'ai-enabled',
        title: 'AI 활용 직무',
        summary: '토스 Data Analyst는 AI 기반 분석 도구 활용이 필수입니다. A/B 테스트 자동화와 예측 분석에 ML 모델을 활용하는 추세입니다.',
        keyInsight: '데이터 분석에 AI 도구 필수화',
        jobCount: 1,
      },
      {
        category: 'traditional',
        title: '기타 직무',
        summary: '금융권 보안 규제 강화로 시니어급 Security Engineer 수요가 증가하고 있습니다. 침투 테스트 경험이 필수 요건입니다.',
        keyInsight: '핀테크 보안 전문가 수요 급증',
        jobCount: 1,
      },
    ],
  },
  '2025-12-04': {
    summary: '이날은 쿠팡에서 Logistics Optimization Engineer 1건만 수집되었습니다.',
    companies: [
      {
        company: {
          id: '300',
          name: '쿠팡',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/coupang.png',
        },
        jobs: [
          {
            id: '357540',
            url: 'https://www.coupang.jobs/jobs/12345',
            title: 'Logistics Optimization Engineer',
            summary: '쿠팡 물류 네트워크 최적화 알고리즘 개발. 배송 경로 최적화 및 재고 관리 시스템.',
            createdAt: '2025-12-04',
            aiCategory: 'ai-enabled' as AICategory,
            jobRole: 'engineering' as JobRole,
            company: {
              name: '쿠팡',
              symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/coupang.png',
            },
          },
        ],
      },
    ],
    categoryBriefings: [
      {
        category: 'ai-enabled',
        title: 'AI 활용 직무',
        summary: '쿠팡 로켓배송의 핵심인 물류 최적화 알고리즘 개발 포지션입니다. ML 기반 수요 예측과 경로 최적화 경험이 우대됩니다.',
        keyInsight: '물류 AI 최적화 전문가 수요',
        jobCount: 1,
      },
    ],
  },
  '2025-12-03': {
    summary: '이날은 넥슨에서 Game Server Developer 1건이 수집되었습니다.',
    companies: [
      {
        company: {
          id: '400',
          name: '넥슨',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/nexon.png',
        },
        jobs: [
          {
            id: '357550',
            url: 'https://career.nexon.com/jobs/12345',
            title: 'Game Server Developer',
            summary: '대규모 온라인 게임 서버 개발. 실시간 멀티플레이 시스템 구현 및 최적화.',
            createdAt: '2025-12-03',
            aiCategory: 'traditional' as AICategory,
            jobRole: 'engineering' as JobRole,
            company: {
              name: '넥슨',
              symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/nexon.png',
            },
          },
        ],
      },
    ],
    categoryBriefings: [
      {
        category: 'traditional',
        title: '기타 직무',
        summary: '게임 서버 개발은 여전히 전통적인 시스템 프로그래밍 역량이 핵심입니다. 대규모 동시접속 처리와 실시간 통신 최적화 경험이 중요합니다.',
        keyInsight: '게임 서버 개발자 꾸준한 수요',
        jobCount: 1,
      },
    ],
  },
};

// 7일간 채용공고 수집 통계 (트렌드 차트용)
export const mockWeeklyStats = [
  { date: '2025-12-01', count: 45, companies: 12 },
  { date: '2025-12-02', count: 38, companies: 9 },
  { date: '2025-12-03', count: 52, companies: 15 },
  { date: '2025-12-04', count: 41, companies: 11 },
  { date: '2025-12-05', count: 67, companies: 18 },
  { date: '2025-12-06', count: 55, companies: 14 },
  { date: '2025-12-07', count: 73, companies: 20 },
];

// 최근 업데이트된 기업 리스트 (사이드바용)
export interface RecentlyUpdatedCompany {
  id: string;
  name: string;
  logo: string;
  category: string;
  isPremium: boolean;
  updatedJobCount: number;
  updatedAt: string;
  totalJobs: number;
}

export const mockRecentlyUpdatedCompanies: RecentlyUpdatedCompany[] = [
  {
    id: 'company-1',
    name: '토스',
    logo: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
    category: 'Fintech',
    isPremium: true,
    updatedJobCount: 3,
    updatedAt: '2시간 전',
    totalJobs: 156,
  },
  {
    id: 'company-6',
    name: '뤼튼',
    logo: 'https://publy.imgix.net/admin/careerly/company/ci/wrtn-symbol_1683698706.webp?w=400&h=400&auto=format',
    category: 'AI',
    isPremium: false,
    updatedJobCount: 2,
    updatedAt: '5시간 전',
    totalJobs: 42,
  },
  {
    id: 'company-xai',
    name: 'xAI',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
    category: 'AI',
    isPremium: true,
    updatedJobCount: 5,
    updatedAt: '1일 전',
    totalJobs: 28,
  },
  {
    id: 'company-2',
    name: '카카오',
    logo: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
    category: 'Tech',
    isPremium: true,
    updatedJobCount: 4,
    updatedAt: '1일 전',
    totalJobs: 124,
  },
  {
    id: 'company-3',
    name: '네이버',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/naver.png',
    category: 'Tech',
    isPremium: false,
    updatedJobCount: 2,
    updatedAt: '2일 전',
    totalJobs: 98,
  },
  {
    id: 'company-4',
    name: '라인',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/line.png',
    category: 'Tech',
    isPremium: true,
    updatedJobCount: 3,
    updatedAt: '2일 전',
    totalJobs: 87,
  },
  {
    id: 'company-5',
    name: '쿠팡',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/coupang.png',
    category: 'E-commerce',
    isPremium: true,
    updatedJobCount: 6,
    updatedAt: '3일 전',
    totalJobs: 203,
  },
  {
    id: 'company-7',
    name: '당근',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/daangn.png',
    category: 'Tech',
    isPremium: false,
    updatedJobCount: 2,
    updatedAt: '3일 전',
    totalJobs: 45,
  },
  {
    id: 'company-8',
    name: '배달의민족',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/baemin.png',
    category: 'Tech',
    isPremium: true,
    updatedJobCount: 4,
    updatedAt: '4일 전',
    totalJobs: 112,
  },
  {
    id: 'company-9',
    name: 'OpenAI',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/openai.png',
    category: 'AI',
    isPremium: true,
    updatedJobCount: 7,
    updatedAt: '4일 전',
    totalJobs: 89,
  },
  {
    id: 'company-10',
    name: 'Anthropic',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/anthropic.png',
    category: 'AI',
    isPremium: true,
    updatedJobCount: 4,
    updatedAt: '5일 전',
    totalJobs: 56,
  },
];

// 전체 기업 목록 (검색용)
export interface SearchableCompany {
  id: string;
  name: string;
  logo: string;
  category: string;
  isPremium: boolean;
  totalJobs: number;
}

export const mockAllCompanies: SearchableCompany[] = [
  // 인증 기업 (Premium)
  { id: 'company-1', name: '토스', logo: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png', category: 'Fintech', isPremium: true, totalJobs: 156 },
  { id: 'company-xai', name: 'xAI', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png', category: 'AI', isPremium: true, totalJobs: 28 },
  { id: 'company-2', name: '카카오', logo: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format', category: 'Tech', isPremium: true, totalJobs: 124 },
  { id: 'company-4', name: '라인', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/line.png', category: 'Tech', isPremium: true, totalJobs: 87 },
  { id: 'company-5', name: '쿠팡', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/coupang.png', category: 'E-commerce', isPremium: true, totalJobs: 203 },
  { id: 'company-8', name: '배달의민족', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/baemin.png', category: 'Tech', isPremium: true, totalJobs: 112 },
  { id: 'company-9', name: 'OpenAI', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/openai.png', category: 'AI', isPremium: true, totalJobs: 89 },
  { id: 'company-10', name: 'Anthropic', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/anthropic.png', category: 'AI', isPremium: true, totalJobs: 56 },
  { id: 'company-google', name: 'Google', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/google.png', category: 'Tech', isPremium: true, totalJobs: 312 },
  { id: 'company-meta', name: 'Meta', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/meta.png', category: 'Tech', isPremium: true, totalJobs: 245 },
  { id: 'company-amazon', name: 'Amazon', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/amazon.png', category: 'Tech', isPremium: true, totalJobs: 567 },
  { id: 'company-apple', name: 'Apple', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/apple.png', category: 'Tech', isPremium: true, totalJobs: 234 },
  // 미등록 기업 (Non-Premium)
  { id: 'company-6', name: '뤼튼', logo: 'https://publy.imgix.net/admin/careerly/company/ci/wrtn-symbol_1683698706.webp?w=400&h=400&auto=format', category: 'AI', isPremium: false, totalJobs: 42 },
  { id: 'company-3', name: '네이버', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/naver.png', category: 'Tech', isPremium: false, totalJobs: 98 },
  { id: 'company-7', name: '당근', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/daangn.png', category: 'Tech', isPremium: false, totalJobs: 45 },
  { id: 'company-sk', name: 'SK텔레콤', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/skt.png', category: 'Telecom', isPremium: false, totalJobs: 67 },
  { id: 'company-lg', name: 'LG전자', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/lg.png', category: 'Electronics', isPremium: false, totalJobs: 134 },
  { id: 'company-samsung', name: '삼성전자', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/samsung.png', category: 'Electronics', isPremium: false, totalJobs: 456 },
  { id: 'company-hyundai', name: '현대자동차', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/hyundai.png', category: 'Automotive', isPremium: false, totalJobs: 178 },
  { id: 'company-ncsoft', name: '엔씨소프트', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/ncsoft.png', category: 'Gaming', isPremium: false, totalJobs: 89 },
  { id: 'company-krafton', name: '크래프톤', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/krafton.png', category: 'Gaming', isPremium: false, totalJobs: 76 },
  { id: 'company-nexon', name: '넥슨', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/nexon.png', category: 'Gaming', isPremium: false, totalJobs: 112 },
  { id: 'company-socar', name: '쏘카', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/socar.png', category: 'Mobility', isPremium: false, totalJobs: 34 },
  { id: 'company-yanolja', name: '야놀자', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/yanolja.png', category: 'Travel', isPremium: false, totalJobs: 56 },
  { id: 'company-musinsa', name: '무신사', logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/musinsa.png', category: 'Fashion', isPremium: false, totalJobs: 67 },
];

// 기업 상세 정보 (기업 페이지용)
export interface CompanyDetail {
  id: string;
  name: string;
  logo: string;
  category: string;
  location: string;
  employeeCount: string;
  isPremium: boolean;
  stats: {
    views: number;
    followers: number;
    weeklyApplicants: number;
  };
  jobs: Array<{
    id: string;
    title: string;
    createdAt: string;
    views: number;
    comments: number;
    aiCategory: 'ai-core' | 'ai-enabled' | 'traditional';
  }>;
  blogs: Array<{
    id: string;
    title: string;
    createdAt: string;
    views: number;
  }>;
  recentComments: Array<{
    id: string;
    userName: string;
    userImage?: string;
    content: string;
    createdAt: string;
  }>;
}

export const mockCompanyDetails: Record<string, CompanyDetail> = {
  'company-1': {
    id: 'company-1',
    name: '토스',
    logo: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
    category: 'Fintech',
    location: '서울',
    employeeCount: '2,000+',
    isPremium: true,
    stats: {
      views: 12345,
      followers: 892,
      weeklyApplicants: 127,
    },
    jobs: [
      { id: 'job-1', title: 'AI Engineer', createdAt: '오늘', views: 234, comments: 5, aiCategory: 'ai-core' },
      { id: 'job-2', title: 'Frontend Developer', createdAt: '어제', views: 189, comments: 3, aiCategory: 'traditional' },
      { id: 'job-3', title: 'Data Scientist', createdAt: '2일 전', views: 156, comments: 2, aiCategory: 'ai-core' },
      { id: 'job-4', title: 'Backend Developer', createdAt: '3일 전', views: 201, comments: 4, aiCategory: 'ai-enabled' },
      { id: 'job-5', title: 'Product Designer', createdAt: '4일 전', views: 98, comments: 1, aiCategory: 'traditional' },
    ],
    blogs: [
      { id: 'blog-1', title: '토스의 마이크로서비스 아키텍처 전환기', createdAt: '1주 전', views: 3421 },
      { id: 'blog-2', title: 'React Native에서 Flutter로 전환한 이유', createdAt: '2주 전', views: 2876 },
      { id: 'blog-3', title: '토스 디자인 시스템 구축기', createdAt: '3주 전', views: 1923 },
    ],
    recentComments: [
      { id: 'c1', userName: '개발자A', userImage: 'https://i.pravatar.cc/40?u=dev1', content: '이 회사 면접 후기 궁금합니다', createdAt: '2시간 전' },
      { id: 'c2', userName: '취준생B', userImage: 'https://i.pravatar.cc/40?u=job2', content: '복지가 좋다고 들었는데 실제로도 그런가요?', createdAt: '5시간 전' },
    ],
  },
  'company-6': {
    id: 'company-6',
    name: '뤼튼',
    logo: 'https://publy.imgix.net/admin/careerly/company/ci/wrtn-symbol_1683698706.webp?w=400&h=400&auto=format',
    category: 'AI',
    location: '서울',
    employeeCount: '100+',
    isPremium: false,
    stats: {
      views: 4567,
      followers: 234,
      weeklyApplicants: 45,
    },
    jobs: [
      { id: 'job-1', title: 'AI Product Designer', createdAt: '오늘', views: 87, comments: 2, aiCategory: 'ai-enabled' },
      { id: 'job-2', title: 'ML Engineer', createdAt: '어제', views: 123, comments: 4, aiCategory: 'ai-core' },
      { id: 'job-3', title: 'Backend Developer', createdAt: '3일 전', views: 67, comments: 1, aiCategory: 'ai-enabled' },
      { id: 'job-4', title: 'Frontend Developer', createdAt: '5일 전', views: 89, comments: 2, aiCategory: 'traditional' },
    ],
    blogs: [
      { id: 'blog-1', title: 'LLM 프로덕트를 만드는 방법', createdAt: '1주 전', views: 1567 },
    ],
    recentComments: [
      { id: 'c1', userName: '마케터C', content: 'AI 툴 경험이 있으면 유리할까요?', createdAt: '1시간 전' },
    ],
  },
  'company-xai': {
    id: 'company-xai',
    name: 'xAI',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
    category: 'AI',
    location: 'San Francisco',
    employeeCount: '500+',
    isPremium: true,
    stats: {
      views: 8901,
      followers: 567,
      weeklyApplicants: 89,
    },
    jobs: [
      { id: 'job-1', title: 'AI Infrastructure Engineer', createdAt: '오늘', views: 345, comments: 8, aiCategory: 'ai-core' },
      { id: 'job-2', title: 'Windows Systems Engineer', createdAt: '어제', views: 189, comments: 3, aiCategory: 'ai-enabled' },
      { id: 'job-3', title: 'ML Research Scientist', createdAt: '2일 전', views: 456, comments: 12, aiCategory: 'ai-core' },
    ],
    blogs: [],
    recentComments: [
      { id: 'c1', userName: 'AI연구자D', userImage: 'https://i.pravatar.cc/40?u=ai4', content: '일론 머스크 회사라 궁금하네요', createdAt: '3시간 전' },
    ],
  },
  'company-2': {
    id: 'company-2',
    name: '카카오',
    logo: 'https://publy.imgix.net/admin/careerly/company/ci/kakao1.png?w=400&h=400&auto=format',
    category: 'Tech',
    location: '판교',
    employeeCount: '5,000+',
    isPremium: true,
    stats: {
      views: 23456,
      followers: 1234,
      weeklyApplicants: 234,
    },
    jobs: [
      { id: 'job-1', title: 'Backend Developer', createdAt: '오늘', views: 567, comments: 15, aiCategory: 'traditional' },
      { id: 'job-2', title: 'iOS Developer', createdAt: '어제', views: 345, comments: 8, aiCategory: 'traditional' },
      { id: 'job-3', title: 'AI Platform Engineer', createdAt: '2일 전', views: 234, comments: 6, aiCategory: 'ai-core' },
    ],
    blogs: [
      { id: 'blog-1', title: '카카오톡 메시지 전송 시스템 개선기', createdAt: '2주 전', views: 5678 },
    ],
    recentComments: [],
  },
  'company-3': {
    id: 'company-3',
    name: '네이버',
    logo: 'https://somoonai.s3.amazonaws.com/uploads/logos/naver.png',
    category: 'Tech',
    location: '분당',
    employeeCount: '4,000+',
    isPremium: false,
    stats: {
      views: 18765,
      followers: 987,
      weeklyApplicants: 178,
    },
    jobs: [
      { id: 'job-1', title: 'Search Engineer', createdAt: '오늘', views: 234, comments: 5, aiCategory: 'ai-enabled' },
      { id: 'job-2', title: 'Frontend Developer', createdAt: '3일 전', views: 178, comments: 3, aiCategory: 'traditional' },
    ],
    blogs: [],
    recentComments: [],
  },
};

// 기업 수집 신청 폼 URL
export const COMPANY_REGISTRATION_FORM_URL = 'https://forms.gle/example';
