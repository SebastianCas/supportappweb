import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { Container, Row, Col } from "react-bootstrap";
import { getTickets, getUsers } from "../services/supportApi";

interface Ticket {
  description: string;
  database_name: string;
  schema_name: string;
  username: string;
  created_at: string;
}

interface User {
  id: number;
  username: string;
}

const TrakingCases: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const usersResult = await getUsers();
        setUsers(usersResult as []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadTickets = async () => {
      setIsLoading(true);
      try {
        const ticketsResult = await getTickets(selectedUser);
        setTickets(ticketsResult as []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTickets();
  }, [selectedUser]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handelUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value);
    setSelectedUser(userId);
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.database_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const tA = new Date(a.created_at).getTime();
    const tB = new Date(b.created_at).getTime();

    if (sortDirection === "asc") {
      return tA - tB;
    } else {
      return tB - tA;
    }
  });

  const sortDirectionHandler = () => {
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTickets.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Traking Cases</h1>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <div>
              <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
              <label htmlFor="createBy" style={{ marginLeft: "10rem" }}>
                Created By
              </label>
              <select id="createBy" onChange={handelUserChange} value={selectedUser || ""}>
                <option value="">All</option>{" "}
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
              <Table
                data={currentItems}
                colums={[
                  { key: "description", header: "Description" },
                  { key: "database_name", header: "Database Name" },
                  { key: "schema_name", header: "Schema Name" },
                  { key: "username", header: "Create By" },
                  { key: "created_at", header: "Created At", isSorteable: true },
                ]}
                sortDirection={sortDirection}
                onSort={sortDirectionHandler}
              />
              <div>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={tickets.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
    // <div>
    //   <div>
    //     <h1>Traking Cases</h1>
    //     {isLoading ? (
    //       <div className="spinner"></div>
    //     ) : (
    //       <div>
    //         <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
    //         <label htmlFor="createBy">Created By</label>
    //         <select id="createBy" onChange={handelUserChange} value={selectedUser || ""}>
    //           <option value="">All</option>
    //           {users.map((user) => (
    //             <option key={user.id} value={user.id}>
    //               {user.username}
    //             </option>
    //           ))}
    //         </select>
    //         <Table
    //           data={currentItems}
    //           colums={[
    //             { key: "description", header: "Description" },
    //             { key: "database_name", header: "Database Name" },
    //             { key: "schema_name", header: "Schema Name" },
    //             { key: "username", header: "Create By" },
    //             { key: "created_at", header: "Created At", isSorteable: true },
    //           ]}
    //           sortDirection={sortDirection}
    //           onSort={sortDirectionHandler}
    //         />
    //         <div>
    //           <Pagination
    //             itemsPerPage={itemsPerPage}
    //             totalItems={tickets.length}
    //             paginate={paginate}
    //             currentPage={currentPage}
    //           />
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default TrakingCases;
