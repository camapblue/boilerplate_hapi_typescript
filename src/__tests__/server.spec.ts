import * as Server from "../server";

jest.mock("@hapi/hapi", () => {
  const origin = jest.requireActual("@hapi/hapi");

  class ServerMock extends origin.Server {
    start = jest.fn();
  }
  return {
    ...origin,
    Server: ServerMock,
  };
});

describe("hapi server", () => {
  it("should create server", async () => {
    const server = await Server.createServer();
    expect(server).toBeDefined();
  });
});
