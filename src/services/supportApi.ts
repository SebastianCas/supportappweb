interface LoginResponse {
  success: boolean;
  token?: string;
}

export const createSupportTicket = async (ticketData: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/ticket/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(ticketData),
  });
  return response.json();
};

export const getTickets = async (createdby?: any) => {
  const url = createdby ? `http://localhost:8000/ticket?createdby=${createdby}` : "http://localhost:8000/ticket";
  const response = await fetch(url, { method: "GET" });
  return response.json();
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, token: data.token };
    }
    return { success: false };
  } catch (error) {
    console.error("Error logging in", error);
    return { success: false };
  }
};

export const getUsers = async () => {
  const response = await fetch("http://localhost:8000/auth/users", { method: "GET" });
  return response.json();
};

export const createUser = async (userData: any) => {
  const response = await fetch("http://localhost:8000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};
