import React, { useState } from 'react';

interface Plan {
    name: string;
    price: string;
    features: string[];
    color: string;
    recommended?: boolean;
}

const plans: Plan[] = [
    {
        name: '1 Month',
        price: '₹90',
        features: ['2 Patches', 'Regular Price: ₹90', 'Standard Plan'],
        color: 'bg-gray-50 border-gray-200'
    },
    {
        name: '2 Months',
        price: '₹150',
        features: ['4 Patches', 'Regular Price: ₹180', 'Save ~17%'],
        color: 'bg-blue-50 border-blue-200'
    },
    {
        name: '6 Months',
        price: '₹499',
        features: ['12 Patches', 'Regular Price: ₹540', 'Save ~8%', 'Most Popular Choice'],
        color: 'bg-yellow-50 border-yellow-200',
        recommended: true
    },
    {
        name: '12 Months',
        price: '₹999',
        features: ['24 Patches', 'Regular Price: ₹1080', 'Save ~8%', 'Best Value Plan'],
        color: 'bg-slate-800 text-white border-slate-700',
        recommended: true
    }
];

interface SubscriptionPlansProps {
    onBack: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onBack }) => {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (planName: string) => {
        setLoading(planName);
        try {
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: planName })
            });

            if (res.ok) {
                alert(`Successfully subscribed to ${planName} Plan!`);
            } else {
                alert('Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred.');
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="animate-fade-in-up pb-10">
            {/* Header */}
            <div className="flex items-center mb-8 sticky top-0 bg-gray-50/95 backdrop-blur-sm z-30 py-4 border-b border-gray-100">
                <button onClick={onBack} className="mr-4 p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">Drepto Premium</h2>
                    <p className="text-sm text-gray-500">Choose a plan that fits your health needs</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                    <div key={plan.name} className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 hover:shadow-xl ${plan.color} ${plan.recommended ? 'scale-105 shadow-lg z-10' : ''}`}>
                        {plan.recommended && (
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl shadow-sm uppercase tracking-wider">
                                {plan.name === '6 Months' ? 'Most Popular' : 'Best Value'}
                            </div>
                        )}

                        <h3 className={`text-2xl font-bold mb-2 ${plan.name === 'Platinum' ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                        <div className={`text-3xl font-bold mb-6 ${plan.name === 'Platinum' ? 'text-blue-300' : 'text-primary'}`}>{plan.price}</div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className={`w-5 h-5 shrink-0 ${plan.name === 'Platinum' ? 'text-green-400' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className={`text-sm ${plan.name === 'Platinum' ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSubscribe(plan.name)}
                            disabled={loading !== null}
                            className={`w-full py-3 rounded-xl font-bold transition-all transform active:scale-95 ${plan.name === 'Platinum'
                                ? 'bg-white text-slate-900 hover:bg-gray-100'
                                : plan.recommended
                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-200 hover:shadow-orange-300'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                } ${loading ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {loading === plan.name ? 'Processing...' : 'Subscribe Now'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Need a Custom Plan for your Organization?</h3>
                <p className="text-gray-500 mb-6">We offer tailored health packages for corporates and large families.</p>
                <button className="text-primary font-bold hover:underline">Contact Sales Support →</button>
            </div>
        </div>
    );
};

export default SubscriptionPlans;
