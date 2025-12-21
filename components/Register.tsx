

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import BackButton from './BackButton';

interface RegisterProps {
  onToggleView: () => void;
}

const Register: React.FC<RegisterProps> = ({ onToggleView }) => {
  const [formData, setFormData] = useState({
    role: UserRole.PATIENT,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New success state
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password, confirmPassword, ...userDetails } = formData;
    if (Object.values(userDetails).some(field => field === '')) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setSuccess('');

    try {
      await register({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        role: userDetails.role,
        password: password
      });
      // Show success message with coupon
      setSuccess('Registration Successful! Use coupon code FIRSTFREE for your first free order!');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Drepto!</h3>
        <p className="text-green-600 font-bold text-lg mb-6">{success}</p>
        <button onClick={() => window.location.href = '/dashboard'} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <BackButton />
      </div>
      <h2 className="text-2xl font-bold text-center text-dark-blue mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
        </div>
        <input type="email" name="email" placeholder="Email ID" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
        <div className="grid grid-cols-2 gap-3">
          <select name="gender" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary text-gray-500">
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
        </div>
        <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary">
          {Object.values(UserRole).map(r => <option key={r} value={r}>{`Register as ${r}`}</option>)}
        </select>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Register
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <button onClick={onToggleView} className="font-semibold text-primary hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
