import React, { useState } from 'react';

interface CouponPopupProps {
    isOpen: boolean;
    onClose: () => void;
    code: string;
}

const CouponPopup: React.FC<CouponPopupProps> = ({ isOpen, onClose, code }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent animate-fade-in pointer-events-none">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative border-4 border-orange-100 animate-scale-up pointer-events-auto mb-20">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Gift!</h3>
                <p className="text-gray-600 mb-6">Use this coupon code at checkout to get an exclusive discount.</p>

                <div className="bg-orange-50 p-4 rounded-xl mb-6 flex items-center justify-between border border-orange-100 border-dashed">
                    <span className="font-mono text-xl font-bold text-orange-600 tracking-wider">{code}</span>
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-orange-100 rounded-lg transition-colors group"
                        title="Copy Code"
                    >
                        {copied ? <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>}
                    </button>
                    {copied && <span className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded shadow-lg animate-fade-in">Copied!</span>}
                </div>

                <button onClick={onClose} className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
                    Got it, Thanks!
                </button>
            </div>
        </div>
    );
};

export default CouponPopup;
