import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/supportApi";
import InputField from "../components/InputField";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [form, setForm] = React.useState<RegisterForm>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const response = await createUser(form);
      if (response.success) {
        navigate("/");
      } else {
        setMessage("Error creating user");
      }
    } catch (error) {
      console.error("Error creating user", error);
      setMessage("Error creating user");
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Register</h1>
          {message && <p>{message}</p>}
          <Form>
            <div>
              <InputField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required={true}
              />
              <InputField
                label="Password"
                name="password"
                value={form.password}
                type="password"
                onChange={handleChange}
                required={true}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                type="password"
                onChange={handleChange}
                required={true}
              />
            </div>
            <Button variant="primary" type="submit" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
