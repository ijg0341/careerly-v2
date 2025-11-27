'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AccountPageLayout } from '@/components/ui/account-page-layout';
import { AccountSidebarNav } from '@/components/ui/account-sidebar-nav';
import { AccountProfileHeader } from '@/components/ui/account-profile-header';
import { AccountFieldRow } from '@/components/ui/account-field-row';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Chip } from '@/components/ui/chip';
import { Skeleton } from '@/components/ui/skeleton';
import {
  User,
  Briefcase,
  GraduationCap,
  Heart,
  Bookmark,
  Settings,
  Clock,
  Search,
  MessageSquare,
  FileText,
  Zap,
  Link as LinkIcon,
  Trash2,
  Edit,
  Plus,
  X,
} from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import {
  useMyProfileDetail,
  useCurrentUser,
  useUpdateMyProfile,
  useAddCareer,
  useUpdateCareer,
  useDeleteCareer,
  useAddEducation,
  useUpdateEducation,
  useDeleteEducation,
} from '@/lib/api';
import type { CareerRequest, EducationRequest } from '@/lib/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const sidebarItems = [
  {
    id: 'profile',
    label: '프로필',
    icon: <User className="w-4 h-4" />,
  },
  {
    id: 'career',
    label: '경력',
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: 'education',
    label: '학력',
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 'activity',
    label: '활동',
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: 'bookmarks',
    label: '북마크',
    icon: <Bookmark className="w-4 h-4" />,
  },
  {
    id: 'settings',
    label: '설정',
    icon: <Settings className="w-4 h-4" />,
  },
];

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

function ProfilePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { recentQueries, clearRecentQueries } = useStore();
  const [activeTab, setActiveTab] = useState('profile');

  // 편집 상태
  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [editingBasicInfo, setEditingBasicInfo] = useState(false);
  const [basicInfoValues, setBasicInfoValues] = useState({ name: '', headline: '', openToWork: '' });

  // 경력/학력 추가 폼 상태
  const [showAddCareer, setShowAddCareer] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);

  // API 데이터 가져오기
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const { data: profile, isLoading: isProfileLoading, error } = useMyProfileDetail(currentUser?.id);

  // Mutation 훅
  const updateProfile = useUpdateMyProfile();
  const addCareer = useAddCareer();
  const updateCareer = useUpdateCareer();
  const deleteCareer = useDeleteCareer();
  const addEducation = useAddEducation();
  const updateEducation = useUpdateEducation();
  const deleteEducation = useDeleteEducation();

  const isLoading = isUserLoading || isProfileLoading;

  // URL 쿼리 파라미터로 탭 상태 관리
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && sidebarItems.some((item) => item.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // 프로필 데이터 로드 시 상태 초기화
  useEffect(() => {
    if (profile) {
      setDescriptionValue(profile.long_description || '');
      setBasicInfoValues({
        name: profile.name || '',
        headline: profile.headline || '',
        openToWork: profile.open_to_work_status || '',
      });
    }
  }, [profile]);

  const handleTabChange = (itemId: string) => {
    setActiveTab(itemId);
    router.push(`/profile?tab=${itemId}`);
  };

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '현재';
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  // 자기소개 저장
  const handleSaveDescription = async () => {
    try {
      await updateProfile.mutateAsync({
        long_description: descriptionValue,
      });
      setEditingDescription(false);
    } catch (error) {
      console.error('Failed to update description:', error);
    }
  };

  // 기본 정보 저장
  const handleSaveBasicInfo = async () => {
    try {
      await updateProfile.mutateAsync({
        name: basicInfoValues.name,
        headline: basicInfoValues.headline,
        open_to_work_status: basicInfoValues.openToWork,
      });
      setEditingBasicInfo(false);
    } catch (error) {
      console.error('Failed to update basic info:', error);
    }
  };

  // 경력 삭제
  const handleDeleteCareer = async (careerId: number) => {
    if (!confirm('이 경력을 삭제하시겠습니까?')) return;
    try {
      await deleteCareer.mutateAsync(careerId);
    } catch (error) {
      console.error('Failed to delete career:', error);
    }
  };

  // 학력 삭제
  const handleDeleteEducation = async (educationId: number) => {
    if (!confirm('이 학력을 삭제하시겠습니까?')) return;
    try {
      await deleteEducation.mutateAsync(educationId);
    } catch (error) {
      console.error('Failed to delete education:', error);
    }
  };

  // 로그인 체크
  if (!currentUser && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">프로필을 보려면 로그인이 필요합니다.</p>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              로그인
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <AccountPageLayout
          sidebar={
            <AccountSidebarNav
              items={sidebarItems}
              activeItem={activeTab}
              onNavigate={handleTabChange}
            />
          }
        >
          <ProfileSkeleton />
        </AccountPageLayout>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-red-500">프로필을 불러오는 중 오류가 발생했습니다.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              다시 시도
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AccountPageLayout
        sidebar={
          <AccountSidebarNav
            items={sidebarItems}
            activeItem={activeTab}
            onNavigate={handleTabChange}
          />
        }
      >
        <div className="space-y-6">
          {/* Profile Header */}
          <AccountProfileHeader
            avatarUrl={profile?.image_url || undefined}
            displayName={profile?.name || currentUser?.name || ''}
            username={`@user${profile?.user_id || currentUser?.id}`}
            onChangeAvatar={() => console.log('Change avatar')}
          />

          {activeTab === 'profile' && (
            <>
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>기본 정보</CardTitle>
                    {!editingBasicInfo && (
                      <button
                        onClick={() => setEditingBasicInfo(true)}
                        className="px-3 py-1.5 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        수정
                      </button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingBasicInfo ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">이름</label>
                        <input
                          type="text"
                          value={basicInfoValues.name}
                          onChange={(e) => setBasicInfoValues({ ...basicInfoValues, name: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">직무</label>
                        <input
                          type="text"
                          value={basicInfoValues.headline}
                          onChange={(e) => setBasicInfoValues({ ...basicInfoValues, headline: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="예: 프론트엔드 개발자"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">구직 상태</label>
                        <select
                          value={basicInfoValues.openToWork}
                          onChange={(e) => setBasicInfoValues({ ...basicInfoValues, openToWork: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">선택 안함</option>
                          <option value="open">구직 중</option>
                          <option value="closed">비공개</option>
                        </select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleSaveBasicInfo}
                          disabled={updateProfile.isPending}
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updateProfile.isPending ? '저장 중...' : '저장'}
                        </button>
                        <button
                          onClick={() => {
                            setEditingBasicInfo(false);
                            setBasicInfoValues({
                              name: profile?.name || '',
                              headline: profile?.headline || '',
                              openToWork: profile?.open_to_work_status || '',
                            });
                          }}
                          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          취소
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-0">
                      <AccountFieldRow
                        label="이름"
                        value={profile?.name || '-'}
                      />
                      <AccountFieldRow
                        label="사용자 ID"
                        value={`${profile?.user_id || ''}`}
                        description="고유 사용자 식별자"
                      />
                      <AccountFieldRow
                        label="직무"
                        value={profile?.headline || '-'}
                      />
                      {profile?.open_to_work_status && (
                        <AccountFieldRow
                          label="구직 상태"
                          value={profile.open_to_work_status === 'open' ? '구직 중' : '비공개'}
                        />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 스킬 */}
              {profile?.skills && profile.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-500" />
                      스킬
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Chip key={skill.id} variant="default">
                          {skill.name}
                        </Chip>
                      ))}
                    </div>
                    <button className="mt-4 px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                      + 스킬 추가
                    </button>
                  </CardContent>
                </Card>
              )}

              {/* 자기소개 */}
              <Card>
                <CardHeader>
                  <CardTitle>자기소개</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile?.description && (
                      <p className="text-sm text-slate-500 mb-2">간단 소개: {profile.description}</p>
                    )}
                    <textarea
                      className="w-full min-h-[120px] p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="자신을 소개하는 글을 작성해보세요..."
                      value={descriptionValue}
                      onChange={(e) => setDescriptionValue(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleSaveDescription}
                        disabled={updateProfile.isPending}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updateProfile.isPending ? '저장 중...' : '저장'}
                      </button>
                      {descriptionValue !== (profile?.long_description || '') && (
                        <button
                          onClick={() => setDescriptionValue(profile?.long_description || '')}
                          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          취소
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 사이트/링크 */}
              {profile?.sites && profile.sites.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-blue-500" />
                      링크
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profile.sites.map((site) => (
                        <a
                          key={site.id}
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <LinkIcon className="w-4 h-4 text-slate-500" />
                          <div>
                            <p className="font-medium text-slate-900">{site.name}</p>
                            <p className="text-sm text-slate-500">{site.url}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 경력 기간 요약 */}
              {profile?.career_duration && (
                <Card>
                  <CardHeader>
                    <CardTitle>경력 요약</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <p className="text-3xl font-bold text-slate-900">
                          {profile.career_duration.career_year}년
                        </p>
                        <p className="text-sm text-slate-600 mt-1">총 경력</p>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <p className="text-3xl font-bold text-slate-900">
                          {profile.career_duration.total_career_duration_months}개월
                        </p>
                        <p className="text-sm text-slate-600 mt-1">상세 기간</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {activeTab === 'career' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-teal-500" />
                    경력
                  </CardTitle>
                  <button
                    onClick={() => setShowAddCareer(!showAddCareer)}
                    className="px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-1"
                  >
                    {showAddCareer ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showAddCareer ? '취소' : '경력 추가'}
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {showAddCareer && (
                  <div className="p-4 border border-teal-200 bg-teal-50/50 rounded-lg">
                    <p className="text-sm text-teal-700 mb-2">
                      경력 추가 기능은 곧 제공될 예정입니다.
                    </p>
                    <p className="text-xs text-slate-600">
                      현재는 삭제 기능만 사용할 수 있습니다.
                    </p>
                  </div>
                )}
                {profile?.careers && profile.careers.length > 0 ? (
                  profile.careers.map((career) => (
                    <div key={career.id} className="space-y-4 p-4 bg-slate-50 rounded-lg relative group">
                      <button
                        onClick={() => handleDeleteCareer(career.id)}
                        disabled={deleteCareer.isPending}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-start justify-between pr-10">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900">{career.title}</h3>
                          <p className="text-sm text-slate-600">{career.company}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            {formatDate(career.start_date)} -{' '}
                            {career.is_current ? '현재' : formatDate(career.end_date)}
                          </p>
                          {career.description && (
                            <p className="text-sm text-slate-600 mt-2">{career.description}</p>
                          )}
                        </div>
                        {career.is_current === 1 && <Badge tone="success">재직 중</Badge>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">등록된 경력이 없습니다.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'education' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                    학력
                  </CardTitle>
                  <button
                    onClick={() => setShowAddEducation(!showAddEducation)}
                    className="px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-1"
                  >
                    {showAddEducation ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showAddEducation ? '취소' : '학력 추가'}
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {showAddEducation && (
                  <div className="p-4 border border-teal-200 bg-teal-50/50 rounded-lg">
                    <p className="text-sm text-teal-700 mb-2">
                      학력 추가 기능은 곧 제공될 예정입니다.
                    </p>
                    <p className="text-xs text-slate-600">
                      현재는 삭제 기능만 사용할 수 있습니다.
                    </p>
                  </div>
                )}
                {profile?.educations && profile.educations.length > 0 ? (
                  profile.educations.map((edu) => (
                    <div key={edu.id} className="space-y-2 p-4 bg-slate-50 rounded-lg relative group">
                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        disabled={deleteEducation.isPending}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="pr-10">
                        <h3 className="font-semibold text-lg text-slate-900">{edu.institute}</h3>
                        <p className="text-sm text-slate-600">{edu.major}</p>
                        <p className="text-sm text-slate-500">
                          {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                        </p>
                        {edu.description && (
                          <p className="text-sm text-slate-600 mt-2">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">등록된 학력이 없습니다.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'activity' && (
            <>
              {/* 검색 히스토리 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-teal-500" />
                      <CardTitle>검색 히스토리</CardTitle>
                    </div>
                    {recentQueries.length > 0 && (
                      <button
                        onClick={clearRecentQueries}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        전체 삭제
                      </button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {recentQueries.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">검색 기록이 없습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {recentQueries.slice(0, 5).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSearch(item.query)}
                          className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-teal-50 hover:border-teal-200 border border-transparent transition-all text-left group"
                        >
                          <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-900 text-sm font-medium truncate">
                              {item.query}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {dayjs(item.timestamp).fromNow()}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 작성한 게시글 - TODO: 게시글 API 연동 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-500" />
                    <CardTitle>작성한 게시글</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">작성한 게시글이 없습니다.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Q&A - TODO: Q&A API 연동 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-teal-500" />
                    <CardTitle>Q&A</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">작성한 질문이 없습니다.</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'bookmarks' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-teal-500" />
                  <CardTitle>북마크</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">저장된 북마크가 없습니다.</p>
                  <p className="text-sm text-slate-400 mt-2">
                    검색 결과를 북마크하여 나중에 다시 확인하세요.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>설정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  <AccountFieldRow
                    label="프로필 공개"
                    value="공개"
                    description="다른 사용자가 내 프로필을 볼 수 있습니다"
                    actionLabel="변경"
                    onAction={() => console.log('Change visibility')}
                  />
                  <AccountFieldRow
                    label="알림"
                    value="켜짐"
                    description="새로운 활동에 대한 알림을 받습니다"
                    actionLabel="변경"
                    onAction={() => console.log('Change notifications')}
                  />
                  <AccountFieldRow
                    label="언어"
                    value="한국어"
                    description="인터페이스 언어"
                    actionLabel="변경"
                    onAction={() => console.log('Change language')}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </AccountPageLayout>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageContent />
    </Suspense>
  );
}
