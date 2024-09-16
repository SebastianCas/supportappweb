import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTicket from "./CreateTicket";
import { createSupportTicket } from "../services/supportApi";

jest.mock("../services/supportApi");

describe("CreateTicket", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form fields correctly", () => {
    render(<CreateTicket />);

    expect(screen.getByLabelText("Ticket Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Database Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Schema Name")).toBeInTheDocument();
    expect(screen.getByLabelText("SQL Query")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Ticket" })).toBeInTheDocument();
  });

  test("updates form fields on change", () => {
    render(<CreateTicket />);

    fireEvent.change(screen.getByLabelText("Ticket Description"), { target: { value: "Test description" } });
    fireEvent.change(screen.getByLabelText("Database Name"), { target: { value: "TestDB" } });
    fireEvent.change(screen.getByLabelText("Schema Name"), { target: { value: "TestSchema" } });
    fireEvent.change(screen.getByLabelText("SQL Query"), { target: { value: "SELECT * FROM test;" } });

    expect(screen.getByLabelText("Ticket Description")).toHaveValue("Test description");
    expect(screen.getByLabelText("Database Name")).toHaveValue("TestDB");
    expect(screen.getByLabelText("Schema Name")).toHaveValue("TestSchema");
    expect(screen.getByLabelText("SQL Query")).toHaveValue("SELECT * FROM test;");
  });

  test("submits the form", async () => {
    (createSupportTicket as jest.Mock).mockResolvedValueOnce({});

    render(<CreateTicket />);

    fireEvent.change(screen.getByLabelText("Ticket Description"), { target: { value: "Test description" } });
    fireEvent.change(screen.getByLabelText("Database Name"), { target: { value: "TestDB" } });
    fireEvent.change(screen.getByLabelText("Schema Name"), { target: { value: "TestSchema" } });
    fireEvent.change(screen.getByLabelText("SQL Query"), { target: { value: "SELECT * FROM test;" } });

    fireEvent.click(screen.getByRole("button", { name: "Create Ticket" }));

    await waitFor(() =>
      expect(createSupportTicket).toHaveBeenCalledWith({
        description: "Test description",
        database_name: "TestDB",
        schema_name: "TestSchema",
        sql_query: "SELECT * FROM test;",
      }),
    );

    expect(screen.queryByText("spinner")).not.toBeInTheDocument();
  });
});
