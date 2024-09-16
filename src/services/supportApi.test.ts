import { createSupportTicket, getTickets, login, getUsers, createUser } from "./supportApi";

global.fetch = jest.fn();

describe("supportApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createSupportTicket", () => {
    it("should create a support ticket", async () => {
      const mockTicketData = { title: "Test Ticket" };
      const mockResponse = { id: 1, ...mockTicketData };
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await createSupportTicket(mockTicketData);

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/ticket/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer null" },
        body: JSON.stringify(mockTicketData),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTickets", () => {
    it("should get tickets without createdby", async () => {
      const mockResponse = [{ id: 1, title: "Test Ticket" }];
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await getTickets();

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/ticket", { method: "GET" });
      expect(result).toEqual(mockResponse);
    });

    it("should get tickets with createdby", async () => {
      const mockResponse = [{ id: 1, title: "Test Ticket" }];
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await getTickets("user1");

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/ticket?createdby=user1", { method: "GET" });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("login", () => {
    it("should login successfully", async () => {
      const mockResponse = { token: "12345" };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await login("username", "password");

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "username", password: "password" }),
      });
      expect(result).toEqual({ success: true, token: "12345" });
    });

    it("should fail to login", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({}),
      });

      const result = await login("username", "password");

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "username", password: "password" }),
      });
      expect(result).toEqual({ success: false });
    });
  });

  describe("getUsers", () => {
    it("should get users", async () => {
      const mockResponse = [{ id: 1, username: "user1" }];
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await getUsers();

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/auth/users", { method: "GET" });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const mockUserData = { username: "user1", password: "password" };
      const mockResponse = { id: 1, ...mockUserData };
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await createUser(mockUserData);

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockUserData),
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
