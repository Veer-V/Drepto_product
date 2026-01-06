import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { action } = req.query;

    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { default: prisma } = await import('../lib/prisma');

        // ==========================================
        // DOCTORS (GET)
        // ==========================================
        if (action === 'doctors') {
            if (req.method === 'GET') {
                const doctors = await prisma.doctor.findMany({ where: { available: true } });
                return res.status(200).json(doctors);
            }
            return res.status(405).json({ error: 'Method not allowed' });
        }

        // ==========================================
        // APPOINTMENTS (GET / POST)
        // ==========================================
        else if (action === 'appointments') {
            // GET: Fetch appointments
            if (req.method === 'GET') {
                const { userId, role } = req.query;
                let where = {};
                if (role === 'Doctor') {
                    if (userId) where = { doctorId: userId as string };
                } else {
                    if (userId) where = { patientId: userId as string };
                }

                const appointments = await prisma.appointment.findMany({
                    where,
                    include: { doctor: true },
                    orderBy: { date: 'asc' },
                });
                return res.status(200).json(appointments);
            }

            // POST: Create appointment
            else if (req.method === 'POST') {
                const { patientId, doctorId, date, time, type, amount } = req.body;
                if (!patientId || !doctorId || !date || !time) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }

                const appointment = await prisma.appointment.create({
                    data: {
                        patientId,
                        doctorId,
                        date: new Date(date),
                        time,
                        type: type || 'Video',
                        amount: amount || 499,
                        status: 'UPCOMING',
                    },
                });
                return res.status(201).json(appointment);
            }
            return res.status(405).json({ error: 'Method not allowed' });
        }

        else {
            return res.status(400).json({ error: `Invalid action: ${action}` });
        }

    } catch (error: any) {
        console.error(`Clinic API Error (${action}):`, error);
        return res.status(500).json({ error: `Clinic Action Failed: ${error.message}` });
    }
}
