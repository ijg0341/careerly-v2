'use client';

import { User, Mail, Settings } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-teal-500" />
          <h1 className="text-2xl font-bold text-slate-900">프로필</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="tw-profile-image w-20 h-20 flex items-center justify-center bg-gradient-to-br from-teal-400 to-purple-500">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">게스트</h2>
              <p className="text-sm text-slate-500">guest@careerly.com</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Mail className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700">이메일</p>
                <p className="text-sm text-slate-500">guest@careerly.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Settings className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700">설정</p>
                <p className="text-sm text-slate-500">계정 설정 및 환경 설정</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-teal-500">0</p>
            <p className="text-sm text-slate-600 mt-1">검색 횟수</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-500">0</p>
            <p className="text-sm text-slate-600 mt-1">북마크</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">0</p>
            <p className="text-sm text-slate-600 mt-1">좋아요</p>
          </div>
        </div>
      </div>
    </div>
  );
}
