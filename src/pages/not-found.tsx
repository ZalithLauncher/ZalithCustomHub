import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

export function NotFoundPage() {
  const { t } = useI18n()

  return (
    <section className="space-y-6">
      <Button asChild variant="outline">
        <Link to="/">
          <ArrowLeft />
          {t.common.backToHome}
        </Link>
      </Button>
      <EmptyState title={t.common.pageNotFound} description={t.common.pageNotFoundDescription} />
    </section>
  )
}
