describe('config', () => {
  const env = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });
  describe('env schema validation', () => {
    it('should throw error when env variables is invalid', async () => {
      process.env.MODE = 'dummyMode';

      expect(() => {
        require('../config');
      }).toThrowError();
    });
  });
});
