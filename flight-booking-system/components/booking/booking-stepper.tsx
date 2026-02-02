import { Check } from "lucide-react"

interface BookingStepperProps {
    currentStep: number
}

const steps = [
    { id: 1, name: "Passenger Details" },
    { id: 2, name: "Seat Selection" },
    { id: 3, name: "Review & Pay" },
]

export function BookingStepper({ currentStep }: BookingStepperProps) {
    return (
        <nav aria-label="Progress" className="w-full">
            <ol role="list" className="flex items-center w-full">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className={`${stepIdx !== steps.length - 1 ? 'w-full' : ''} relative flex flex-col items-center`}>
                        {step.id < currentStep ? (
                            <>
                                <div className="absolute top-4 left-[50%] w-full flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-blue-600" />
                                </div>
                                <a href="#" className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-900 z-10">
                                    <Check className="h-5 w-5 text-white" aria-hidden="true" />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        ) : step.id === currentStep ? (
                            <>
                                <div className="absolute top-4 left-[50%] w-full flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a href="#" className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white z-10" aria-current="step">
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        ) : (
                            <>
                                <div className="absolute top-4 left-[50%] w-full flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a href="#" className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 z-10">
                                    <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true" />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        )}
                        <span className="mt-2 text-xs font-medium text-gray-500 whitespace-nowrap absolute top-8">
                            {step.name}
                        </span>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
