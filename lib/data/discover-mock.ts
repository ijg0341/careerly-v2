import { DiscoverContentCardProps } from '@/components/ui/discover-content-card';
import { MarketAssetMiniCardProps } from '@/components/ui/market-asset-mini-card';
import { JobMarketTrend } from '@/components/ui/job-market-trend-card';
import { WeatherForecast } from '@/components/ui/weather-info-card';

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
    href: job.url,
    badge: `매칭 ${Math.floor(job.score * 100)}%`,
    badgeTone: 'coral' as const,
    liked: job.hasMyLike,
    bookmarked: job.hasMyBookmark,
  }));
}

export function transformBlogsToContentCards(blogs: DiscoverMockResponse['blogs']): DiscoverContentCardProps[] {
  return blogs.map((blog, index) => ({
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
    href: blog.url,
    badge: '추천',
    badgeTone: 'success' as const,
    liked: blog.hasMyLike,
    bookmarked: blog.hasMyBookmark,
  }));
}

export function transformBooksToContentCards(books: DiscoverMockResponse['books']): DiscoverContentCardProps[] {
  return books.map((book, index) => ({
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
    href: book.url,
    badge: '도서',
    badgeTone: 'default' as const,
    liked: book.hasMyLike,
    bookmarked: book.hasMyBookmark,
  }));
}

export function transformCoursesToContentCards(courses: DiscoverMockResponse['courses']): DiscoverContentCardProps[] {
  return courses.map((course, index) => ({
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
    href: course.url,
    badge: course.level || '강의',
    badgeTone: 'warning' as const,
    liked: course.hasMyLike,
    bookmarked: course.hasMyBookmark,
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
    {
      id: 47659,
      title: '2025년 버전, 개발조직 주도 교육 및 성장 회고(Tech-driven Education Retrospect)',
      url: 'https://techtopic.skplanet.com/techlearning2025/',
      company: {
        title: 'SK Planet 블로그',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/skplanet.jpg',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: null,
      summary:
        'SK플래닛은 2025년, 개발자 경쟁력 강화와 프로덕트 적시 런칭을 목표로 AI 및 테크 교육 프로그램을 적극적으로 운영했습니다. CTO, 개발그룹 등 개발 조직 주도로 Tech Academy, Bootcamp, MOOC, Agile Coaching, AI/Cloud/Web3 교육 등을 통해 개발자 성장을 지원해왔으며, 특히 최태원 회장의 AI 활용 강조에 발맞춰 단순 툴 소개를 넘어 업무 프로세스에 AI를 녹여 생산성을 향상시키는 교육에 집중했습니다.\n\n2025년 추진 방향은 시장 대비 개발자 경쟁력 강화와 프로덕트 적시 런칭을 위한 Skill 보유를 목표로, AI와 Tech 육성 방향을 Upskilling 및 Reskilling으로 설정했습니다. AI는 프로덕트 개발, AI Coding, Workflow로 정의하고 프로덕트 개발과 AI Coding에 포커스를 맞췄으며, Tech는 구성원 및 조직 니즈가 높은 분야(k8s, Redis, Kafka 등)를 중심으로 Upskilling 및 Reskilling 프로그램을 제공했습니다.\n\n주요 프로그램으로는 외부 전문가를 초청한 AI & 테크 인사이트 세미나(GitHub Copilot UNIVERSE 리캡, NVIDIA GTC 2025 리캡 및 MCP 소개, Cursor 도입 및 활용 사례 공유, RAG/Agent 및 바이브코딩 도입 사례 공유, 사내 Agent 특강 등)와 실습 중심의 Tech Upskilling 핸즈온 교육(RAG & AI Agent 개발, Docker & Kubernetes 배포 및 모니터링, Redis 장애실습, GitHub Copilot 활용 Figma MCP 핸즈온 등)이 진행되었습니다.\n\n또한, 직무 변경 대상자의 빠른 현업 적응을 위한 Tech Reskilling 교육(웹 프론트엔드, 백엔드, 데이터 엔지니어링)을 오프라인 및 온라인 연계 과정으로 제공하여 높은 만족도를 얻었습니다. 회사 기술 블로그를 개발자 Tech Writing Playground로 활용하여 글쓰기 역량 개발 및 정보 공유를 활성화했으며, SK 데보션 프로 활동 및 SK AI SUMMIT 발표 참여를 통해 개발자 퍼스널 브랜딩 기회를 제공했습니다.\n\n결론적으로 SK플래닛은 AI 시대에도 개발자의 성장과 이를 위한 기업의 노력이 필수적임을 강조하며, 이를 통해 기업과 개인이 함께 성장하는 지혜로운 길을 모색하고 있습니다.\n\n🌟 한 줄 요약: SK플래닛은 AI 시대를 맞아 개발자 경쟁력 강화를 위해 AI 및 테크 교육, 직무 전환 지원, 기술 블로그 활용 등 다각적인 프로그램을 운영하며 조직과 개인의 동반 성장을 추구하고 있습니다.',
      createdAt: null,
      score: 0.8,
      reason:
        '이 인재는 팀원들의 기술 성장을 지원하고, 프로젝트 매니징 능력을 발휘하는 프론트엔드 개발팀 리더입니다. 이 블로그 글은 개발 조직의 교육 및 성장 회고를 다루고 있어, 팀원들의 기술 향상과 관련된 다양한 프로그램과 방향성을 제시하고 있어 실무에 도움이 될 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47610,
      title: 'Arvind Jain Pushes into AI-powered Productivity',
      url: 'https://sequoiacap.com/article/arvind-jain-glean-spotlight/',
      company: {
        title: 'Sequoia 블로그',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/sequoiacap.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: null,
      summary:
        'Arvind Jain은 과거 Rubrik에서 겪었던 직원들의 정보 검색 비효율성 문제를 해결하기 위해 AI 기반 기업 검색 엔진 Glean을 창업했습니다. Google에서 검색 엔진 개발 경험을 쌓은 Jain은 기업 내부에 파편화된 정보를 효과적으로 검색하고 활용하는 것이 인터넷 검색보다 어렵다는 점에 주목했습니다. Glean은 다양한 SaaS 도구에 흩어진 기업 데이터를 지식 그래프로 구축하고, 최신 자연어 처리 및 딥러닝 기술을 활용하여 개인화된 검색 결과를 제공합니다. 특히 최근에는 생성형 AI를 통합하여 단순 정보 검색을 넘어 업무 수행까지 지원하는 \'업무 도우미\'로 발전하고 있습니다. Glean은 기업의 생산성을 획기적으로 향상시키고, 직원들이 정보 탐색에 소요하는 시간을 줄여 핵심 업무에 집중할 수 있도록 돕는 것을 목표로 합니다.\n\n🌟 한 줄 요약: AI 기반 기업 검색 엔진 Glean은 파편화된 기업 정보를 통합하고 생성형 AI를 활용하여 업무 생산성을 극대화한다.',
      createdAt: null,
      score: 0.7,
      reason:
        '이 인재는 프론트엔드 개발자로서의 경험을 바탕으로 팀 리더 역할을 수행하고 있습니다. 이 블로그 글은 AI 기반의 생산성 향상에 대한 내용을 다루고 있어, 프론트엔드 개발과 관련된 최신 기술 트렌드와 AI의 활용 방안에 대한 통찰을 제공할 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
    {
      id: 47555,
      title: '기기 없이 앱을 테스트하는 법, 멀티버스가 알려드립니다',
      url: 'https://tech.kakaopay.com/post/multiverse/',
      company: {
        title: '카카오페이 테크블로그',
        sign: null,
        image: 'https://somoonai.s3.amazonaws.com/uploads/logos/kakaopaytech.png',
      },
      source: null,
      category: null,
      imageUrl: null,
      publishedAt: null,
      summary:
        '카카오페이 클라이언트 플랫폼 팀은 테스트 기기 부족 및 관리 비용, 다양한 버전에서의 테스트 불편함 등 모바일 서비스 개발 시 발생하는 현실적인 문제들을 해결하기 위해 사내 테스트 플랫폼 \'멀티버스\'를 개발했습니다. 멀티버스는 맥북 하나로 실제 기기 없이 다양한 OS 버전과 기기 환경에서 앱을 테스트할 수 있는 가상 기기(시뮬레이터, 에뮬레이터)를 제공하며, 클릭 한 번으로 환경 구축, 가상 기기 생성 및 관리, 앱 설치 및 실행, 딥 링크 실행, 화면 캡처 및 녹화, 사용자 행동 로그 실시간 확인 등 다양한 테스트 편의 기능을 지원합니다. 이를 통해 프론트엔드, 백엔드 개발자뿐만 아니라 기획자, 디자이너 등 다양한 직군의 사용자들이 테스트에 집중할 수 있도록 돕고 개발 생산성을 향상시켰습니다. 향후에는 확장된 로그 콘솔, 사내 테스트 도구 및 어드민 연계, 직군별 테스트 편의 기능 제공 등을 통해 더욱 발전된 플랫폼으로 진화할 계획입니다.\n\n🌟 한 줄 요약: 멀티버스는 실제 기기 없이도 다양한 환경에서 앱 테스트를 가능하게 하여 개발 생산성을 극대화하는 혁신적인 사내 테스트 플랫폼입니다.',
      createdAt: null,
      score: 0.6,
      reason:
        '이 인재는 대규모 웹 애플리케이션의 프론트엔드 아키텍처 설계 및 구현을 담당하고 있습니다. 이 블로그 글은 가상 기기를 활용한 앱 테스트 방법을 소개하고 있어, 프론트엔드 개발 시 유용한 테스트 환경 구축에 대한 정보를 제공하여 실무에 도움이 될 것입니다.',
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
      createdAt: null,
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
      createdAt: null,
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
      createdAt: null,
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
      createdAt: null,
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
      createdAt: null,
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
      createdAt: null,
      score: 0.6,
      reason:
        '이 강의는 경험이 풍부한 관리자들이 리더십 역할로 나아가는 데 필요한 기술을 개발하는 데 초점을 맞추고 있습니다. 팀원들을 코칭하고 전략적 사고를 촉진하는 방법을 배우는 것은 이 인재의 커리어 성장에 큰 도움이 될 것입니다.',
      hasMyBookmark: false,
      hasMyLike: false,
    },
  ],
  createdAt: '2025-10-30 01:38:00',
};

// Today's Jobs Mock Data
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
        company: {
          name: '스노우',
          symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/snow-symbol_1694506510.webp?w=400&h=400&auto=format',
        },
      },
      {
        id: '357243',
        url: 'https://recruit.snowcorp.com/rcrt/view.do?annoId=30004056',
        title: '[SNOW] 그로스 마케터 (계약직)',
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
        title: '[플리토] Data Engineer 인턴 채용',
        company: {
          name: '플리토',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/Flitto_sns_profile.png',
        },
      },
      {
        id: '358254',
        url: 'https://flitto.career.greetinghr.com/ko/o/184662',
        title: '[플리토] 프로젝트 인재풀 운영 매니저 채용',
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
        title: '[크랙] Product Designer',
        company: {
          name: '뤼튼테크놀로지스',
          symbolImageUrl: 'https://publy.imgix.net/admin/careerly/company/ci/wrtn-symbol_1683698706.webp?w=400&h=400&auto=format',
        },
      },
      {
        id: '358061',
        url: 'https://wrtn.career.greetinghr.com/ko/o/184202',
        title: '[크랙] Product Design Lead',
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
      name: 'Xai',
      symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
    },
    jobs: [
      {
        id: '358064',
        url: 'https://job-boards.greenhouse.io/xai/jobs/4959262007',
        title: 'Windows Systems Engineer',
        company: {
          name: 'Xai',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
        },
      },
      {
        id: '358850',
        url: 'https://job-boards.greenhouse.io/xai/jobs/4961357007',
        title: 'Network Development Engineer (Ops&Deploy) -xAI Networking',
        company: {
          name: 'Xai',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
        },
      },
      {
        id: '357269',
        url: 'https://job-boards.greenhouse.io/xai/jobs/4959690007',
        title: 'RL Environments Specialist',
        company: {
          name: 'Xai',
          symbolImageUrl: 'https://somoonai.s3.amazonaws.com/uploads/logos/xai.png',
        },
      },
    ],
  },
];
