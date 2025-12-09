'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BadgeCheck,
  MapPin,
  Users,
  Eye,
  Heart,
  UserPlus,
  Briefcase,
  FileText,
  MessageCircle,
  ArrowLeft,
  Lock,
  ExternalLink,
} from 'lucide-react';
import {
  mockCompanyDetails,
  mockRecentlyUpdatedCompanies,
  COMPANY_REGISTRATION_FORM_URL,
  CompanyDetail,
} from '@/lib/data/discover-mock';

// AI 카테고리 설정
const aiCategoryConfig = {
  'ai-core': {
    label: 'AI 직무',
    icon: '🤖',
    className: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  'ai-enabled': {
    label: 'AI 활용',
    icon: '🔧',
    className: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  'traditional': {
    label: '',
    icon: '',
    className: '',
  },
};

// 세션 스토리지 키
const FREE_COMPANY_KEY = 'careerly_free_company_id';

// 무료 열람 가능한 기업 ID 가져오기 (세션당 1개)
function getFreeCompanyId(): string {
  if (typeof window === 'undefined') return '';

  let freeCompanyId = sessionStorage.getItem(FREE_COMPANY_KEY);

  if (!freeCompanyId) {
    // 미등록(non-premium) 기업 중 랜덤으로 1개 선택
    const nonPremiumCompanies = mockRecentlyUpdatedCompanies.filter(c => !c.isPremium);
    if (nonPremiumCompanies.length > 0) {
      const randomIndex = Math.floor(Math.random() * nonPremiumCompanies.length);
      freeCompanyId = nonPremiumCompanies[randomIndex].id;
      sessionStorage.setItem(FREE_COMPANY_KEY, freeCompanyId);
    }
  }

  return freeCompanyId || '';
}

// 기업 페이지 접근 가능 여부 체크
function canAccessCompany(company: CompanyDetail, freeCompanyId: string): boolean {
  // 유료 등록 기업은 항상 접근 가능
  if (company.isPremium) return true;
  // 무료 열람 기업이면 접근 가능
  if (company.id === freeCompanyId) return true;
  return false;
}

export default function CompanyDetailPage() {
  const params = useParams();
  const companyId = params.id as string;

  const [freeCompanyId, setFreeCompanyId] = React.useState<string>('');
  const [company, setCompany] = React.useState<CompanyDetail | null>(null);
  const [canAccess, setCanAccess] = React.useState<boolean>(true);

  React.useEffect(() => {
    const freeId = getFreeCompanyId();
    setFreeCompanyId(freeId);

    const companyData = mockCompanyDetails[companyId];
    setCompany(companyData || null);

    if (companyData) {
      setCanAccess(canAccessCompany(companyData, freeId));
    }
  }, [companyId]);

  if (!company) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">기업을 찾을 수 없습니다</h1>
          <p className="text-slate-500 mb-4">요청하신 기업 정보가 존재하지 않습니다.</p>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>발견 페이지로 돌아가기</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>발견 페이지로 돌아가기</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Company Header */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
          <div className="flex items-start gap-5">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden p-2 flex-shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-slate-400">
                  {company.name[0]}
                </span>
              )}
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
                {company.isPremium && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 rounded-full">
                    <BadgeCheck className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-medium text-teal-700">인증기업</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="font-medium text-slate-700">{company.category}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>직원 {company.employeeCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar - 기업 담당자 넛지용 */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">조회수</p>
                  <p className="font-semibold text-slate-900">{company.stats.views.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">관심 등록</p>
                  <p className="font-semibold text-slate-900">{company.stats.followers.toLocaleString()}명</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">이번주 지원자</p>
                  <p className="font-semibold text-slate-900">{company.stats.weeklyApplicants}명</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {canAccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Jobs & Blogs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Jobs Section */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-teal-600" />
                    <h2 className="font-semibold text-slate-900">채용공고</h2>
                    <span className="text-sm text-slate-500">({company.jobs.length}건)</span>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {company.jobs.map((job) => {
                    const aiConfig = aiCategoryConfig[job.aiCategory];
                    const showAiLabel = job.aiCategory !== 'traditional';

                    return (
                      <div
                        key={job.id}
                        className="px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-slate-900 truncate">
                                {job.title}
                              </h3>
                              {showAiLabel && (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${aiConfig.className}`}>
                                  <span>{aiConfig.icon}</span>
                                  <span>{aiConfig.label}</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                              <span>{job.createdAt}</span>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{job.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>{job.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Blogs Section */}
              {company.blogs.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <h2 className="font-semibold text-slate-900">기술 블로그</h2>
                      <span className="text-sm text-slate-500">({company.blogs.length}건)</span>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {company.blogs.map((blog) => (
                      <div
                        key={blog.id}
                        className="px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <h3 className="font-medium text-slate-900 mb-1.5">{blog.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{blog.createdAt}</span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{blog.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Comments */}
            <div className="space-y-6">
              {/* Recent Comments */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-teal-600" />
                    <h2 className="font-semibold text-slate-900">최근 댓글</h2>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {company.recentComments.length > 0 ? (
                    company.recentComments.map((comment) => (
                      <div key={comment.id} className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                            {comment.userImage ? (
                              <img
                                src={comment.userImage}
                                alt={comment.userName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs font-medium text-slate-500">
                                {comment.userName[0]}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700 line-clamp-2">
                              &quot;{comment.content}&quot;
                            </p>
                            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                              <span>{comment.userName}</span>
                              <span>·</span>
                              <span>{comment.createdAt}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-5 py-8 text-center text-sm text-slate-400">
                      아직 댓글이 없습니다
                    </div>
                  )}
                </div>
              </div>

              {/* Company Registration CTA */}
              {!company.isPremium && (
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border border-teal-100 p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">이 기업의 담당자이신가요?</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    기업 페이지를 개설하고 더 많은 인재에게 노출되세요.
                  </p>
                  <a
                    href={COMPANY_REGISTRATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <BadgeCheck className="w-4 h-4" />
                    <span>기업 페이지 개설 신청</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Locked Content - 블러 처리된 화면 */
          <div className="relative">
            {/* Blurred Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 filter blur-sm pointer-events-none select-none">
              {/* Jobs Section (blurred) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <h2 className="font-semibold text-slate-400">채용공고</h2>
                    <span className="text-sm text-slate-300">({company.jobs.length}건)</span>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {company.jobs.slice(0, 1).map((job, idx) => (
                    <div key={idx} className="px-5 py-4">
                      <div className="h-5 w-48 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-slate-100 rounded"></div>
                    </div>
                  ))}
                  {company.jobs.slice(1).map((_, idx) => (
                    <div key={idx} className="px-5 py-4">
                      <div className="h-5 w-48 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-slate-100 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (blurred) */}
              <div className="bg-white rounded-2xl border border-slate-100 h-64"></div>
            </div>

            {/* Overlay CTA */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-md text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  기업 정보가 잠겨 있습니다
                </h3>
                <p className="text-slate-600 mb-6">
                  이 기업의 전체 채용공고와 상세 정보를 보려면 프리미엄 서비스를 이용하세요.
                </p>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors">
                    프리미엄 구독하기
                  </button>
                  <a
                    href={COMPANY_REGISTRATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                  >
                    <span>기업 담당자이신가요?</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
