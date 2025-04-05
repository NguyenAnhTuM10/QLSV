import React, { useState } from "react";
import Login from "./components/Login";
import StudentList from "./components/StudentList";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div>
      {loggedIn ? (
        <>
          <div className="container mt-3">
            <button
              className="btn btn-outline-danger float-end"
              onClick={() => {
                localStorage.removeItem("token");
                setLoggedIn(false);
              }}
            >
              Đăng xuất
            </button>
          </div>
          <StudentList />
        </>
      ) : (
        <Login onLoginSuccess={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
