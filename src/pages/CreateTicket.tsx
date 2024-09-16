import React, { useState } from "react";
import InputField from "../components/InputField";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { createSupportTicket } from "../services/supportApi";

const CreateTicket: React.FC = () => {
  const [formData, setFormData] = useState({
    description: "",
    database_name: "",
    schema_name: "",
    sql_query: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createSupportTicket(formData);
      setFormData({
        description: "",
        database_name: "",
        schema_name: "",
        sql_query: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Create support ticket</h1>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <Form>
              <div>
                <InputField
                  label="Ticket Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <InputField
                  label="Database Name"
                  name="database_name"
                  value={formData.database_name}
                  onChange={handleChange}
                />
                <InputField
                  label="Schema Name"
                  name="schema_name"
                  value={formData.schema_name}
                  onChange={handleChange}
                />
                <InputField
                  label="SQL Query"
                  name="sql_query"
                  value={formData.sql_query}
                  type="textarea"
                  onChange={handleChange}
                />
              </div>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Create Ticket
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTicket;
