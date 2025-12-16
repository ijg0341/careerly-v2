/**
 * 날짜 포맷팅 유틸 함수
 */

/**
 * 날짜 탭 포맷팅 (오늘, 어제, MM/DD)
 */
export function formatDateTab(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(date, today)) return '오늘';
  if (isSameDay(date, yesterday)) return '어제';
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

/**
 * 최근 7일 날짜 목록 생성 (최신순)
 */
export function generateLast7Days(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

/**
 * 날짜 헤더 포맷팅 (M월 D일 (요일))
 */
export function formatDateHeader(dateStr: string): string {
  if (dateStr === 'unknown') return '날짜 미상';
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${month}월 ${day}일 (${days[date.getDay()]})`;
}

/**
 * 짧은 날짜 포맷팅 (M/D)
 */
export function formatShortDate(dateStr: string): string {
  if (dateStr === 'unknown') return '';
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

/**
 * 주간 키 생성 (해당 주의 일요일 날짜)
 */
export function getWeekKey(dateStr: string): string {
  const date = new Date(dateStr);
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  return startOfWeek.toISOString().split('T')[0];
}

/**
 * 주간 헤더 포맷팅
 */
export function formatWeekHeader(weekStartStr: string): string {
  if (weekStartStr === 'unknown') return '날짜 미상';
  const startDate = new Date(weekStartStr);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());
  thisWeekStart.setHours(0, 0, 0, 0);

  // 주 차이 계산
  const diffTime = thisWeekStart.getTime() - startDate.getTime();
  const diffWeeks = Math.round(diffTime / (7 * 24 * 60 * 60 * 1000));

  if (diffWeeks === 0) {
    return '이번 주';
  } else if (diffWeeks === 1) {
    return '지난 주';
  } else {
    return `${diffWeeks}주 전`;
  }
}

/**
 * 날짜별 그룹화
 */
export function groupByDate<T>(
  items: T[],
  getDate: (item: T) => string
): Record<string, T[]> {
  const grouped: Record<string, T[]> = {};
  items.forEach((item) => {
    const dateKey = getDate(item) || 'unknown';
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(item);
  });
  return grouped;
}

/**
 * 주간별 그룹화
 */
export function groupByWeek<T>(
  items: T[],
  getDate: (item: T) => string
): Record<string, T[]> {
  const grouped: Record<string, T[]> = {};
  items.forEach((item) => {
    const dateStr = getDate(item) || 'unknown';
    const weekKey = dateStr !== 'unknown' ? getWeekKey(dateStr) : 'unknown';
    if (!grouped[weekKey]) {
      grouped[weekKey] = [];
    }
    grouped[weekKey].push(item);
  });
  return grouped;
}
