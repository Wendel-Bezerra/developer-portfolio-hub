import Aurora from '@/components/Aurora'

export function AuroraBackground() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Aurora
        className="absolute inset-0"
        colorStops={['#04010e', '#3919a4', '#5227FF']}
        blend={0.5}
        amplitude={1.0}
        speed={1}
      />
      <div className="absolute inset-0 bg-background/30" />
    </div>
  )
}

