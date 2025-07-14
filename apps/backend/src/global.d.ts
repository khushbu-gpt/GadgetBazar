// src/types/express.d.ts
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      uid: string;
      email: string;
      role: string;
    };
    file?: Express.Multer.File,
    files?: Express.Multer.File[]
  }
} 