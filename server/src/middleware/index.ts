import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const logReqRes = (fileName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const log = `${new Date().toISOString()} ${req.ip} ${req.method} ${req.path}\n`;
        fs.appendFile(fileName, log, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
            next();
        });
    };
};
