'use client';

import * as React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  MessageCircleQuestion,
  Eye,
  User,
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
} from 'lucide-react';

export interface QuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  viewCount?: number;
}

// 프롬프트에서 질문과 프로필 분리
function parsePrompt(text: string): { question: string; profile: string | null } {
  const separator = '\n---\n';
  const separatorIndex = text.indexOf(separator);

  if (separatorIndex === -1) {
    return { question: text, profile: null };
  }

  const question = text.substring(0, separatorIndex).trim();
  const profileSection = text.substring(separatorIndex + separator.length).trim();
  const profile = profileSection.replace(/^내정보:\s*/i, '').trim();

  return { question, profile };
}

// 프로필 텍스트를 구조화된 데이터로 파싱
interface ParsedProfile {
  name: string;
  headline: string;
  skills: string[];
  currentJob: { title: string; company: string } | null;
  careerYears: string;
  education: string;
}

function parseProfileText(profileText: string): ParsedProfile {
  const lines = profileText.split('\n').map(l => l.trim()).filter(Boolean);

  const profile: ParsedProfile = {
    name: '',
    headline: '',
    skills: [],
    currentJob: null,
    careerYears: '',
    education: '',
  };

  let currentSection = '';
  let careerIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 첫 줄은 이름
    if (i === 0 && !line.includes(':')) {
      profile.name = line;
      continue;
    }

    // 섹션 헤더 감지
    if (line === '소개') {
      currentSection = 'headline';
      continue;
    } else if (line === '스킬') {
      currentSection = 'skills';
      continue;
    } else if (line === '경력 요약') {
      currentSection = 'career_summary';
      continue;
    } else if (line === '경력') {
      currentSection = 'career';
      careerIndex = 0;
      continue;
    } else if (line === '학력') {
      currentSection = 'education';
      continue;
    }

    // 섹션별 파싱
    if (currentSection === 'headline') {
      profile.headline = line;
      currentSection = '';
    } else if (currentSection === 'skills') {
      // 스킬은 공백으로 구분
      profile.skills = line.split(/\s+/).filter(s => s.length > 0);
      currentSection = '';
    } else if (currentSection === 'career_summary') {
      profile.careerYears = line;
      currentSection = '';
    } else if (currentSection === 'career') {
      // 첫 번째 경력만 파싱 (현재 직장)
      if (careerIndex === 0 && !profile.currentJob) {
        profile.currentJob = { title: line, company: '' };
        careerIndex++;
      } else if (careerIndex === 1 && profile.currentJob) {
        profile.currentJob.company = line;
        currentSection = ''; // 첫 번째 경력만
      }
    } else if (currentSection === 'education') {
      if (!profile.education) {
        profile.education = line;
      } else {
        profile.education += ' · ' + line;
      }
    }
  }

  return profile;
}

const QuestionCard = React.forwardRef<HTMLDivElement, QuestionCardProps>(
  ({ question: rawQuestion, viewCount, className, ...props }, ref) => {
    const [isProfileExpanded, setIsProfileExpanded] = useState(false);
    const { question, profile: profileText } = parsePrompt(rawQuestion);
    const hasProfile = !!profileText;

    // 일반 질문 (프로필 없음)
    if (!hasProfile) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6 shadow-sm',
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20">
              <MessageCircleQuestion className="h-4 w-4 text-teal-600" />
              <span className="text-xs font-medium text-teal-700">질문</span>
            </div>
            {viewCount !== undefined && (
              <div className="flex items-center gap-1.5 text-slate-500">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">{viewCount.toLocaleString()}</span>
              </div>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 leading-relaxed">
            {rawQuestion}
          </h2>
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-gradient-to-br from-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        </div>
      );
    }

    // 개인화 질문 - 프로필 자랑 스타일
    const profile = parseProfileText(profileText);

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-xl border shadow-sm',
          'bg-gradient-to-br from-purple-50 via-white to-teal-50',
          'border-purple-200/50',
          className
        )}
        {...props}
      >
        {/* 배경 장식 */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-teal-500/10 border border-purple-300/30">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-medium bg-gradient-to-r from-purple-700 to-teal-700 bg-clip-text text-transparent">
                내 프로필 기반 맞춤 질문
              </span>
            </div>
            {viewCount !== undefined && (
              <div className="flex items-center gap-1.5 text-slate-500">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">{viewCount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* 질문 */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed mb-6">
            {question}
          </h2>

          {/* 프로필 카드 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
            {/* 프로필 헤더 - 항상 표시 */}
            <button
              onClick={() => setIsProfileExpanded(!isProfileExpanded)}
              className="w-full p-4 text-left hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* 아바타 플레이스홀더 */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 text-white font-bold text-lg shadow-md">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{profile.name}</h3>
                    {profile.headline && (
                      <p className="text-sm text-slate-600">{profile.headline}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    {isProfileExpanded ? '접기' : '프로필 보기'}
                  </span>
                  {isProfileExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* 스킬 태그 - 항상 표시 (최대 5개) */}
              {profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {profile.skills.slice(0, 5).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-teal-100 text-slate-700 border border-purple-200/50"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 5 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                      +{profile.skills.length - 5}
                    </span>
                  )}
                </div>
              )}
            </button>

            {/* 확장된 프로필 정보 */}
            {isProfileExpanded && (
              <div className="px-4 pb-4 pt-0 space-y-3 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                <div className="pt-3 space-y-3">
                  {/* 경력 */}
                  {profile.currentJob && (
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 flex-shrink-0">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {profile.currentJob.title}
                        </p>
                        <p className="text-xs text-slate-600">
                          {profile.currentJob.company}
                          {profile.careerYears && ` · ${profile.careerYears}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 학력 */}
                  {profile.education && (
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 flex-shrink-0">
                        <GraduationCap className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-700">{profile.education}</p>
                      </div>
                    </div>
                  )}

                  {/* 모든 스킬 */}
                  {profile.skills.length > 5 && (
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 flex-shrink-0">
                        <Award className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

QuestionCard.displayName = 'QuestionCard';

export { QuestionCard };
