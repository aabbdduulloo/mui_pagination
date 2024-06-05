import React, { useState, useEffect } from "react";
import "./brand.css"; // CSS faylini import qilamiz

const Brand = () => {
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); // Foydalanuvchining qidirayotgan nomi

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${usersPerPage}`
    )
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error("Ma'lumotlar olinmada xato:", error));
  }, [currentPage, usersPerPage]);

  const filterUsersByName = name => {
    const filteredUsers = userData.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    setUserData(filteredUsers);
    setCurrentPage(1);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (userData && userData.length === usersPerPage) {
      fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${
          currentPage + 1
        }&_limit=${usersPerPage}`
      )
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error("Ma'lumotlar olinmada xato:", error));
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${
          currentPage - 1
        }&_limit=${usersPerPage}`
      )
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error("Ma'lumotlar olinmada xato:", error));
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="brand-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={() => filterUsersByName(searchTerm)}>Search</button>
      </div>
      <table id="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.address.street}, {user.address.suite},{" "}
                  {user.address.city}
                </td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="page-link"
          >
            Prev
          </button>
        </li>
        {userData &&
          Array.from({ length: Math.ceil(userData.length / usersPerPage) }).map(
            (_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`page-link ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        <li className="page-item">
          <button
            onClick={nextPage}
            disabled={!userData || userData.length < usersPerPage}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Brand;
