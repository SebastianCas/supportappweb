import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

describe("Button component", () => {
  test("renders the button with the provided text", () => {
    render(<Button text="Click me" onClick={() => {}} />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when the disabled prop is true", () => {
    render(<Button text="Click me" onClick={() => {}} disabled />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeDisabled();
  });

  test("is not disabled when the disabled prop is false", () => {
    render(<Button text="Click me" onClick={() => {}} disabled={false} />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).not.toBeDisabled();
  });
});
