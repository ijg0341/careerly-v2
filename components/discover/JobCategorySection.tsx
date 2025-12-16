'use client';

import { JobListItem, JobItemData } from './JobListItem';

export interface JobCategorySectionProps {
  title: string;
  jobs: JobItemData[];
  variant: 'purple' | 'teal' | 'slate';
  onJobClick: (job: JobItemData) => void;
}

const sectionConfig = {
  purple: {
    bgClass: 'bg-purple-50/50',
    titleClass: 'text-purple-900',
    countBgClass: 'bg-purple-100',
    countTextClass: 'text-purple-600',
  },
  teal: {
    bgClass: 'bg-teal-50/50',
    titleClass: 'text-teal-900',
    countBgClass: 'bg-teal-100',
    countTextClass: 'text-teal-600',
  },
  slate: {
    bgClass: 'bg-slate-50/70',
    titleClass: 'text-slate-700',
    countBgClass: 'bg-slate-200',
    countTextClass: 'text-slate-500',
  },
};

export function JobCategorySection({
  title,
  jobs,
  variant,
  onJobClick,
}: JobCategorySectionProps) {
  const config = sectionConfig[variant];

  if (jobs.length === 0) return null;

  return (
    <div className={`${config.bgClass} rounded-xl p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <h3 className={`text-sm font-bold ${config.titleClass}`}>{title}</h3>
        <span
          className={`text-xs ${config.countTextClass} ${config.countBgClass} px-2 py-0.5 rounded-full`}
        >
          {jobs.length}
        </span>
      </div>
      <div className="space-y-1">
        {jobs.map((job) => (
          <JobListItem
            key={job.id}
            job={job}
            variant={variant}
            onClick={() => onJobClick(job)}
          />
        ))}
      </div>
    </div>
  );
}
