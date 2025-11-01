import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { id: 1, name: 'Profile Method', description: 'Choose how to input your profile' },
    { id: 2, name: 'Profile Details', description: 'Add your experience and skills' },
    { id: 3, name: 'Preferences', description: 'Set your job search preferences' },
    { id: 4, name: 'Review', description: 'Review and complete your profile' },
  ]

  return (
    <div className="relative">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-700">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isUpcoming = step.id > currentStep

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                  isCompleted
                    ? 'bg-indigo-600 text-white'
                    : isCurrent
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/20'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>

              <div className="mt-3 text-center">
                <p className={`text-sm font-medium ${
                  isCurrent ? 'text-white' : isCompleted ? 'text-indigo-400' : 'text-slate-400'
                }`}>
                  {step.name}
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-24">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}