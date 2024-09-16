import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavbarComponent from "./Navbar";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("NavbarComponent", () => {
  it("renders the Navbar with links and logout button", () => {
    render(
      <BrowserRouter>
        <NavbarComponent />
      </BrowserRouter>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Create Ticket")).toBeInTheDocument();
    expect(screen.getByText("Traking Cases")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("navigates to home on logout", () => {
    const navigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => navigate);

    render(
      <BrowserRouter>
        <NavbarComponent />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText("Logout"));
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
