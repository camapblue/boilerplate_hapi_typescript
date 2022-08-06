export const environment = () => {
  return {
    jwt: {
      expiration: 24 * 60 * 60 * 7, // 7 days
      rememberMe: 24 * 60 * 60 * 30, // 30 days
      issuer: process.env.SERVER_HOST || "localhost",
      audience: "Boilerplate Hapi Script",
      secretKey:
        process.env.JWT_SECRET_KEY || "2a4Xj9vQjfxV3rw2Usi2qMKEiMlOIjN5",
      refreshTokenTTL: 3600 * 24 * 90, // 90 days
      refreshTokenKeyPrefix: "refresh_token",
    },
    appUrl: {
      frontendUrl: process.env.FRONTEND_URL || "localhost",
      backendUrl: process.env.BACKEND_URL || "localhost",
    },
  };
};

export default environment();
