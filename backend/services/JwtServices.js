import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_STRING, REFRESG_TOKEN_STRING } from "../config/index.js";
import RefreshToken from "../models/token.js";

class JwtServices {
  //signAccessToken
  static signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, ACCESS_TOKEN_STRING, { expiresIn: expiryTime });
  }
  //signRefreshToken
  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, REFRESG_TOKEN_STRING, {
      expiresIn: expiryTime,
    });
  }
  //verifyAccessToken
  static verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_STRING);
  }
  //verifyRefreshToken
  static verifyRefreshToken(token) {
    return jwt.verify(token, REFRESG_TOKEN_STRING);
  }
  //storeRefreshtoken
  static async storeRefreshToken(userId, token) {
    const newToken = new RefreshToken({
      userId,
      token,
    });
    await newToken.save();
  }
}

export default JwtServices;
