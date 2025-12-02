'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, KeyRound } from 'lucide-react';
import { useRequestPasswordReset, useVerifyPasswordReset } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// 단계 정의
type Step = 'email' | 'code' | 'password';

// 이메일 입력 스키마
const emailSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
});

// 인증코드 입력 스키마
const codeSchema = z.object({
  code: z
    .string()
    .min(6, '인증 코드는 6자리입니다.')
    .max(6, '인증 코드는 6자리입니다.'),
});

// 비밀번호 재설정 스키마
const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다.'
    ),
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

type EmailFormData = z.infer<typeof emailSchema>;
type CodeFormData = z.infer<typeof codeSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

/**
 * 비밀번호 찾기 페이지
 *
 * 단계별 플로우:
 * 1. 이메일 입력
 * 2. 인증 코드 입력
 * 3. 새 비밀번호 설정
 */
export default function ForgotPasswordPage() {
  const [step, setStep] = React.useState<Step>('email');
  const [email, setEmail] = React.useState('');

  const requestPasswordReset = useRequestPasswordReset();
  const verifyPasswordReset = useVerifyPasswordReset();

  // 이메일 폼
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  // 인증코드 폼
  const codeForm = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: '' },
  });

  // 비밀번호 폼
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  // 이메일 제출
  const onEmailSubmit = async (data: EmailFormData) => {
    requestPasswordReset.mutate(data.email, {
      onSuccess: () => {
        setEmail(data.email);
        setStep('code');
      },
    });
  };

  // 인증코드 제출
  const onCodeSubmit = async (data: CodeFormData) => {
    // 인증코드 검증 후 다음 단계로
    setStep('password');
  };

  // 비밀번호 재설정 제출
  const onPasswordSubmit = async (data: PasswordFormData) => {
    const code = codeForm.getValues('code');
    verifyPasswordReset.mutate({
      email,
      code,
      newPassword: data.newPassword,
    });
  };

  const isLoading =
    requestPasswordReset.isPending || verifyPasswordReset.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo.svg"
            alt="Careerly"
            width={120}
            height={32}
            className="mb-6"
          />
          <h1 className="text-2xl font-bold text-slate-900">
            비밀번호 찾기
          </h1>
          <p className="text-sm text-slate-500 mt-2 text-center">
            {step === 'email' && '등록된 이메일 주소를 입력하세요'}
            {step === 'code' && '이메일로 전송된 인증 코드를 입력하세요'}
            {step === 'password' && '새로운 비밀번호를 설정하세요'}
          </p>
        </div>

        {/* 진행 단계 표시 */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                step === 'email'
                  ? 'bg-coral-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              )}
            >
              1
            </div>
            <div className="w-12 h-0.5 bg-slate-200" />
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                step === 'code'
                  ? 'bg-coral-500 text-white'
                  : step === 'password'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              )}
            >
              2
            </div>
            <div className="w-12 h-0.5 bg-slate-200" />
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                step === 'password'
                  ? 'bg-coral-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              )}
            >
              3
            </div>
          </div>
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          {/* 이메일 입력 단계 */}
          {step === 'email' && (
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-coral-50 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-coral-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...emailForm.register('email')}
                  disabled={isLoading}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="coral"
                size="md"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? '전송 중...' : '인증 코드 전송'}
              </Button>
            </form>
          )}

          {/* 인증코드 입력 단계 */}
          {step === 'code' && (
            <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-coral-50 rounded-full flex items-center justify-center">
                  <KeyRound className="w-6 h-6 text-coral-500" />
                </div>
              </div>

              <div className="text-center mb-4">
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-900">{email}</span>
                  <br />
                  위 주소로 인증 코드가 전송되었습니다.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">인증 코드</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="6자리 인증 코드"
                  maxLength={6}
                  {...codeForm.register('code')}
                  disabled={isLoading}
                />
                {codeForm.formState.errors.code && (
                  <p className="text-sm text-red-500">
                    {codeForm.formState.errors.code.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => setStep('email')}
                  disabled={isLoading}
                >
                  이전
                </Button>
                <Button
                  type="submit"
                  variant="coral"
                  size="md"
                  className="flex-1"
                  disabled={isLoading}
                >
                  다음
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    requestPasswordReset.mutate(email);
                  }}
                  className="text-sm text-coral-500 hover:text-coral-600"
                  disabled={isLoading}
                >
                  인증 코드 재전송
                </button>
              </div>
            </form>
          )}

          {/* 비밀번호 재설정 단계 */}
          {step === 'password' && (
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-coral-50 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-coral-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="영문 대소문자, 숫자 포함 8자 이상"
                  {...passwordForm.register('newPassword')}
                  disabled={isLoading}
                />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-sm text-red-500">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  {...passwordForm.register('confirmPassword')}
                  disabled={isLoading}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => setStep('code')}
                  disabled={isLoading}
                >
                  이전
                </Button>
                <Button
                  type="submit"
                  variant="coral"
                  size="md"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? '변경 중...' : '비밀번호 변경'}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* 하단 링크 */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
