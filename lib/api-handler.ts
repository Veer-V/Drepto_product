import { VercelRequest, VercelResponse } from '@vercel/node';

type HandlerFunction = (req: VercelRequest, res: VercelResponse) => Promise<any>;

export function createHandler(handler: HandlerFunction) {
    return async (req: VercelRequest, res: VercelResponse) => {
        // 1. Set CORS Headers
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET,OPTIONS,PATCH,DELETE,POST,PUT'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
        );

        // 2. Handle OPTIONS request (Preflight)
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        try {
            // 3. Execute the actual handler
            await handler(req, res);
        } catch (error: any) {
            console.error('[API Error]:', error);

            // 4. Return a safe error response instead of crashing
            // Only include stack trace in development
            const isDev = process.env.NODE_ENV !== 'production';

            return res.status(500).json({
                message: 'Internal Server Error',
                code: 'INTERNAL_SERVER_ERROR',
                details: isDev ? error.message : undefined,
                // In extremely critical failures, we still want to return JSON, not let Vercel return 502
            });
        }
    };
}
