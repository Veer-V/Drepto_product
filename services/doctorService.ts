import { Doctor } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3006/api';

export const doctorService = {
  async getAllDoctors(): Promise<Doctor[]> {
    try {
      const response = await fetch(`${API_URL}/doctors`);
      if (!response.ok) throw new Error('Failed to fetch doctors');
      return await response.json();
    } catch (error) {
      console.error('Error in getAllDoctors:', error);
      return [];
    }
  },

  async getDoctorById(id: string): Promise<Doctor | null> {
    // For now we might not have a direct ID endpoint, but we can filter from getAll
    // or add a specific endpoint later. Let's do simple fetch for now.
    // Optimization: In real app, use specific endpoint /api/doctors/:id
    const doctors = await this.getAllDoctors();
    return doctors.find((d) => d.id === id) || null;
  },
};
