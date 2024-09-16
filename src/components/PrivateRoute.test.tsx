import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

describe("PrivateRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("redirects to home page if no token is present", () => {
    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <div>Private Page</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders children if token is present", () => {
    localStorage.setItem("token", "test-token");

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <div>Private Page</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Private Page")).toBeInTheDocument();
  });
});
