import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const envKeys = Object.keys(process.env);
        const hasDbUrl = envKeys.includes('DATABASE_URL');

        // Minimal JSON response
        res.status(200).json({
            status: 'Debug Online',
            time: new Date().toISOString(),
            nodeVersion: process.version,
            memoryUsage: process.memoryUsage(),
            envHasDbUrl: hasDbUrl
        });
    } catch (error: any) {
        res.status(500).json({
            error: 'Debug Failed',
            details: error.message
        });
    }
}
