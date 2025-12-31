import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (plan: string) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Subscribed successfully!');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setMessage(data.message || 'Subscription failed');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Become a part of Drepto today.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          {/* Standard Plan */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white">
            <div className="p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Standard
              </h2>
              <p className="mt-4 text-sm text-gray-500">
                Essential features for individuals.
              </p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  $10
                </span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <button
                onClick={() => handleSubscribe('Standard')}
                disabled={loading}
                className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Subscribe Standard'}
              </button>
              {message && (
                <p className="mt-2 text-center text-sm text-red-500">
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white">
            <div className="p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Premium
              </h2>
              <p className="mt-4 text-sm text-gray-500">
                Advanced features and priority support.
              </p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  $20
                </span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <button
                onClick={() => handleSubscribe('Premium')}
                disabled={loading}
                className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Subscribe Premium'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
