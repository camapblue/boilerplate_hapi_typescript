import { createJwtToken, verifyJwtToken } from '../jwt.utils';

const payload = {
  email: 'email@ptc.com'
};

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn().mockReturnValue('jwtToken'),
  verify: jest.fn().mockReturnValue({
    email: 'email@ptc.com'
  })
}));

describe('jwt.utils', () => {
  describe('createJwtToken', () => {
    it('should return token', () => {
      const token = createJwtToken(payload);

      expect(token).toEqual('jwtToken');
    });
  });

  describe('verifyJwtToken', () => {
    it('should return payload', () => {
      const result = verifyJwtToken('jwtToken');

      expect(result).toEqual(payload);
    });
  });
});
