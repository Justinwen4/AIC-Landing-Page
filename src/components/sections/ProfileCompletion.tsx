import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { currentUser } from '../../data/mockData'

const steps = [
  { id: 1, label: 'Basic profile', completed: true },
  { id: 2, label: 'Location & interests', completed: true },
  { id: 3, label: 'Career preferences', completed: true },
  { id: 4, label: 'Travel radius', completed: false },
  { id: 5, label: 'Connect LinkedIn', completed: false },
]

export default function ProfileCompletion() {
  const completedCount = steps.filter((s) => s.completed).length

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[13px] font-semibold text-[var(--color-text-primary)]">
            Complete your profile
          </h3>
          <p className="text-[12px] text-[var(--color-text-tertiary)] mt-0.5">
            {currentUser.completionPercent}% complete · {completedCount}/{steps.length} steps
          </p>
        </div>
        <button className="text-[12px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-mid)] flex items-center gap-1 transition-colors">
          Continue
          <ArrowRight size={12} strokeWidth={2} />
        </button>
      </div>

      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-[var(--color-accent)] rounded-full transition-all"
          style={{ width: `${currentUser.completionPercent}%` }}
        />
      </div>

      <div className="space-y-1.5">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-2">
            {step.completed ? (
              <CheckCircle2 size={14} strokeWidth={2} className="text-[var(--color-accent)]" />
            ) : (
              <Circle size={14} strokeWidth={1.75} className="text-[var(--color-text-tertiary)]" />
            )}
            <span
              className={`text-[12px] ${
                step.completed
                  ? 'text-[var(--color-text-tertiary)] line-through'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
