import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    {type === "textarea" ? (
      <div>
        <textarea name={name} id={name} value={value} rows={5} onChange={onChange}></textarea>
      </div>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        style={{ marginBottom: "1rem", display: "block" }}
        required={required}
      />
    )}
  </div>
);

export default InputField;
