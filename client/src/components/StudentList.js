import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      const res = await axios.put(`http://localhost:5000/api/students/${editingId}`, form);
      setStudents(students.map((s) => (s._id === editingId ? res.data : s)));
      setEditingId(null);
    } else {
      const res = await axios.post("http://localhost:5000/api/students", form);
      setStudents([...students, res.data]);
    }
    setForm({ name: "", age: "", email: "" });
    setCurrentPage(1); // reset về trang đầu
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, age: student.age, email: student.email });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    setStudents(students.filter((s) => s._id !== id));
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Quản Lý Sinh Viên</h2>

      <div className="row mb-3">
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Tìm theo tên hoặc email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset về trang đầu khi tìm
            }}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Tên"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Tuổi"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            {editingId ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.email}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(s)}>
                  Sửa
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s._id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav>
        <ul className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button onClick={() => handlePageChange(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default StudentList;
