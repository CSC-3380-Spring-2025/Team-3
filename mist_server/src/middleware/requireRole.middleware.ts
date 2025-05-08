import { Request, Response, NextFunction } from "express";
import HttpException from "@/utils/exceptions/http.exception";

function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(`[REQUIREROLE] path=${req.path}, required=${role}, user=${req.user?.role}`);
    
    if (!req.user || req.user.role !== role) {
      return next(new HttpException(403, "Forbidden: Insufficient role"));
    }
    next();
  };
}

export default requireRole;