import React from 'react';
import { useNavigate } from 'react-router-dom';

const Medicines: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Pharmacy Service has moved</h2>
      <p className="text-gray-600 mb-6">Our pharmacy services have been updated. Please visit the Drepto Store for our specialized healthcare products.</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Medicines;
