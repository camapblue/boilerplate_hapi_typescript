import { sign, verify, SignOptions, decode } from 'jsonwebtoken';
import environment from '../environment';
import { generateRandomString } from '../string.utils';

/**
 * generates JWT token
 */

export const createJwtToken = (
  payload: Record<string, unknown>,
  signOptions?: SignOptions
) => {
  return sign(payload, environment.jwt.secretKey, {
    ...signOptions,
    audience: environment.jwt.audience,
    issuer: environment.jwt.issuer,
    jwtid: generateRandomString(8)
  });
};

/**
 * Verify JWT token
 */

export const verifyJwtToken = (token: string) => {
  return verify(token, environment.jwt.secretKey);
};

/**
 * Decode JWT token
 */

export const decodeJwtToken = (token: string) => {
  return decode(token, { complete: true });
};
