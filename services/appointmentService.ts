export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'Video' | 'Audio' | 'Chat';
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  amount: number;
  doctor?: any; // populated doctor object
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3006/api';

export const appointmentService = {
  async createAppointment(data: {
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    type: string;
    amount: number;
  }): Promise<Appointment | null> {
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to book appointment');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in createAppointment:', error);
      throw error;
    }
  },

  async getMyAppointments(
    role: 'Patient' | 'Doctor',
    userId: string,
  ): Promise<Appointment[]> {
    try {
      const response = await fetch(
        `${API_URL}/appointments?role=${role}&userId=${userId}`,
      );
      if (!response.ok) throw new Error('Failed to fetch appointments');
      return await response.json();
    } catch (error) {
      console.error('Error in getMyAppointments:', error);
      return [];
    }
  },
};
