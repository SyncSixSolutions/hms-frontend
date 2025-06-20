import React from "react";

type StepIndicatorProps = {
    currentStep: number;
    steps: string[];
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => (
    <div className="fixed right-8 top-1/4 flex flex-col items-center z-20">
        {steps.map((step, idx) => (
            <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                        ${currentStep === idx
                            ? "bg-blue-700 text-white"
                            : currentStep > idx
                                ? "bg-blue-400 text-white"
                                : "bg-gray-300 text-gray-600"}
                        `}
                    >
                        {idx + 1}
                    </div>
                    <span className="text-xs text-center mb-2 w-20">{step}</span>
                </div>
                {idx < steps.length - 1 && (
                    <div className="h-10 w-1 bg-gray-300 my-1 rounded" />
                )}
            </React.Fragment>
        ))}
    </div>
);

export default StepIndicator;