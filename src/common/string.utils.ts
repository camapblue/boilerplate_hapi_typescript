export const generateRandomString = (count: number) => {
  const sym = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let str = "";

  for (let i = 0; i < count; i++) {
    const idx = Math.random() * sym.length;

    str += sym.charAt(idx);
  }

  return str;
};

export const base64Encode = (str: string): string => {
  return new Buffer(str).toString("base64url");
};
