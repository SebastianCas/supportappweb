import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/supportApi";
import InputField from "../components/InputField";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await login(username, password);
    if (response.success) {
      localStorage.setItem("token", response.token || "");
      navigate("/trakingCases");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Login</h1>
          <Form>
            <div>
              <InputField
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
              <InputField
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required={true}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Login
            </Button>
            <div>
              <Button href="/register" variant="link">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
