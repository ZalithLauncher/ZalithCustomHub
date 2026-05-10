import type { SubmissionRecord } from '@/types/submission'
import { EmptyState } from '@/components/empty-state'
import { SubmissionCard } from '@/components/submission-card'
import { useI18n } from '@/i18n'

interface SubmissionGridProps {
  submissions: SubmissionRecord[]
}

export function SubmissionGrid({ submissions }: SubmissionGridProps) {
  const { t } = useI18n()

  if (!submissions.length) {
    return <EmptyState title={t.home.title} description={t.home.empty} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {submissions.map((submission) => (
        <SubmissionCard key={submission.slug} submission={submission} />
      ))}
    </div>
  )
}
