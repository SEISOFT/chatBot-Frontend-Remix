import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export function createJWT(user: { id: string; email: string }) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyJWT(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Solo retornamos si es un objeto de tipo JwtPayload
    if (typeof decoded === "object" && "email" in decoded) {
      return decoded as JwtPayload;
    }
    return null;
  } catch (err) {
    console.error("Token verification failed", err);
    return null;
  }
}
