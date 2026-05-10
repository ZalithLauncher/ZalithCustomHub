import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'

export function SiteNav() {
  const { t } = useI18n()

  return (
    <nav className="flex items-center gap-1">
      {[
        { to: '/', label: t.nav.gallery },
        { to: '/editor', label: t.nav.editor },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-foreground/10 text-foreground'
                : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
