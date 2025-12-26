import React from 'react';

interface ComingSoonOverlayProps {
    title?: string;
    description?: string;
    onBack?: () => void;
}

const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
    title = "Coming Soon",
    description = "We are working hard to bring this service to you.",
    onBack
}) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurred Backdrop */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>

            {/* Content Card */}
            <div className="relative z-10 bg-white rounded-3xl p-8 text-center max-w-sm shadow-2xl border border-gray-100 animate-fade-in-up">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">{description}</p>

                {onBack && (
                    <button
                        onClick={onBack}
                        className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                    >
                        Go Back
                    </button>
                )}
            </div>
        </div>
    );
};

export default ComingSoonOverlay;
