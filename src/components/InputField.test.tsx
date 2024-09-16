import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField Component", () => {
  const mockOnChange = jest.fn();

  it("renders an input field with the correct label", () => {
    render(<InputField label="Test Label" name="testName" value="" onChange={mockOnChange} />);

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders a textarea when type is 'textarea'", () => {
    render(<InputField label="Test Textarea" name="testTextarea" value="" onChange={mockOnChange} type="textarea" />);

    expect(screen.getByLabelText("Test Textarea")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    render(<InputField label="Test Input" name="testInput" value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Test Input");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("calls onChange when textarea value changes", () => {
    render(<InputField label="Test Textarea" name="testTextarea" value="" onChange={mockOnChange} type="textarea" />);

    const textarea = screen.getByLabelText("Test Textarea");
    fireEvent.change(textarea, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("renders input field with required attribute when required is true", () => {
    render(<InputField label="Test Required" name="testRequired" value="" onChange={mockOnChange} required={true} />);

    const input = screen.getByLabelText("Test Required");
    expect(input).toBeRequired();
  });
});
