import jwt from "jsonwebtoken";
import { AppError } from "./AppError";

export type tokenPayload = {
  email: string;
  uid: string;
  role: string;
};

type Unit =
  | "Years"
  | "Year"
  | "Yrs"
  | "Yr"
  | "Y"
  | "Weeks"
  | "Week"
  | "W"
  | "Days"
  | "Day"
  | "D"
  | "Hours"
  | "Hour"
  | "Hrs"
  | "Hr"
  | "H"
  | "Minutes"
  | "Minute"
  | "Mins"
  | "Min"
  | "M"
  | "Seconds"
  | "Second"
  | "Secs"
  | "Sec"
  | "s"
  | "Milliseconds"
  | "Millisecond"
  | "Msecs"
  | "Msec"
  | "Ms";

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type JWT_EXPIRY_FORMAT =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

export function generateRefreshToken({ email, uid, role }: tokenPayload) {
  const refreshExpiry =
    (process.env.JWT_REFRESH_EXPIRY as JWT_EXPIRY_FORMAT) || "30d";
  const secret = process.env.JWT_SECRET as string;

  if (!refreshExpiry) throw new AppError("Refresh Expiry is required");
  return jwt.sign({ email, uid, role, type: "REFRESH" }, secret, {
    expiresIn: refreshExpiry
  });
}

export function generateAccessToken({ email, uid, role }: tokenPayload) {
  const accessExpiry = process.env.JWT_EXPIRY_FORMAT as JWT_EXPIRY_FORMAT || "1d";
  const secret = process.env.JWT_SECRET as string;

  if (!accessExpiry) throw new AppError("Access Expiry is required");
  return jwt.sign({ email, uid, role, type: "ACCESS" }, secret, {
    expiresIn: accessExpiry
  });
}

export function generateLoginToken(
  { uid, email, role }: tokenPayload): {
    refreshToken: string,
    accesToken: string
  } {
  const accessExpiry = process.env.JWT_EXPIRY_FORMAT || "1d";
  if (!accessExpiry) throw new AppError("Access Expiry is required");
  return {
    refreshToken: generateRefreshToken({ uid, email, role }),
    accesToken: generateAccessToken({ uid, email, role }),
  };
}
export function decodeToken(token: string): tokenPayload {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) throw new Error("JWT Secret is required");
  return jwt.verify(token, secret) as tokenPayload;
}
