import databases from "../databases";
const mockConnectFunction = jest.fn();

jest.mock("mongoose", () => {
  const origin = jest.requireActual("mongoose");
  return {
    ...origin,
    connect: () => mockConnectFunction,
  };
});

describe("databases", () => {
  describe("#connect", () => {
    it("should call connect mongoose connect function", async () => {
      const result = await databases.connect();
      expect(result).toBeDefined();
    });
  });
});
