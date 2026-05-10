interface EditorPaneProps {
  value: string
  onChange: (value: string) => void
  label: string
}

export function EditorPane({ value, onChange, label }: EditorPaneProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{label}</h2>
        <span className="text-xs text-muted-foreground">{value.length} chars</span>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        className="min-h-[360px] w-full rounded-[1.5rem] border border-border bg-background px-4 py-4 font-mono text-sm leading-6 text-foreground outline-none ring-0 transition-colors placeholder:text-muted-foreground focus:border-primary sm:min-h-[520px]"
      />
    </section>
  )
}
