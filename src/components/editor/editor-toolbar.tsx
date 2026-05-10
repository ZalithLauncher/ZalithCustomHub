import { Copy, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EditorToolbarProps {
  onCopy: () => void
  onDownload: () => void
  copyLabel: string
  downloadLabel: string
}

export function EditorToolbar({
  onCopy,
  onDownload,
  copyLabel,
  downloadLabel,
}: EditorToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button type="button" className="w-full sm:w-auto" onClick={onCopy}>
        <Copy />
        {copyLabel}
      </Button>
      <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={onDownload}>
        <Download />
        {downloadLabel}
      </Button>
    </div>
  )
}
