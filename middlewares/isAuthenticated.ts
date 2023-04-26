import { expressjwt, Request as JWTRequest, TokenGetter} from "express-jwt";
import jwt from "jsonwebtoken"


function getTokenFromHeaders(req:JWTRequest): string | null{
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET as jwt.Secret,
  algorithms: ["HS256"] as jwt.Algorithm[] ,
  requestProperty: "payload",
  getToken: getTokenFromHeaders as TokenGetter,
});

export default isAuthenticated;