import { decodeToken, tokenPayload } from "../utils/jsontoken";

export const VerifyAccessTokenMiddleWare = (req: { headers: { authorization: any; }; user: tokenPayload; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; status_code?: number; }): any; new(): any; }; }; }, next: () => void) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ error: "Invalid access token", status_code: 401 });
  }
};
