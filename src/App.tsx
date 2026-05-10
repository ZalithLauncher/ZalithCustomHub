import { Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/app-shell'
import { I18nProvider } from '@/i18n'
import { EditorPage } from '@/pages/editor'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { SubmissionDetailPage } from '@/pages/submission-detail'

function App() {
  return (
    <I18nProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/works/:slug" element={<SubmissionDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </I18nProvider>
  )
}

export default App
