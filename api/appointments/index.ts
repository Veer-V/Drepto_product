import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default async function handler(req: Request, res: Response) {
    // GET: Fetch appointments for a user (Patient or Doctor)
    if (req.method === 'GET') {
        const { userId, role } = req.query; // Assuming simple query params for now

        try {
            let where = {};

            // Basic logic: if role is doctor, search by doctorId, else patientId
            // In a real app, userId would come from a secure session/token
            if (role === 'Doctor') {
                // This assumes the passed userId maps to a doctor's internal ID, 
                // or we handle mapping. For now, let's keep it simple.
                // Note: The User ID in our auth system is different from Doctor ID potentially.
                // We might need to look up the doctor by email/userId.
                // For this MVP, let's fetch ALL for testing or filter by doctorId if passed directly.
                if (userId) where = { doctorId: userId as string };
            } else {
                if (userId) where = { patientId: userId as string };
            }

            const appointments = await prisma.appointment.findMany({
                where,
                include: {
                    doctor: true, // properties of the doctor
                    // patient: true, // properties of the patient (uncomment when relation exists)
                },
                orderBy: { date: 'asc' }
            });
            return res.status(200).json(appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            return res.status(500).json({ error: 'Failed to fetch appointments' });
        }
    }

    // POST: Create a new appointment
    if (req.method === 'POST') {
        const { patientId, doctorId, date, time, type, amount } = req.body;

        if (!patientId || !doctorId || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const appointment = await prisma.appointment.create({
                data: {
                    patientId,
                    doctorId,
                    date: new Date(date),
                    time,
                    type: type || 'Video',
                    amount: amount || 499,
                    status: 'UPCOMING'
                }
            });
            return res.status(201).json(appointment);
        } catch (error) {
            console.error('Error creating appointment:', error);
            return res.status(500).json({ error: 'Failed to create appointment' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
