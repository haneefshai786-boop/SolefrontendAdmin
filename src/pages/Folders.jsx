import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../api/api.js";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all folders
  const fetchFolders = async () => {
    const res = await API.get("/folders");
    setFolders(res.data);
  };

  useEffect(() => { fetchFolders(); }, []);

  // Handle add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/folders/${editId}`, { name });
      setEditId(null);
    } else {
      await API.post("/folders", { name });
    }
    setName("");
    fetchFolders();
  };

  // Edit folder
  const handleEdit = (f) => {
    setName(f.name);
    setEditId(f._id);
  };

  // Delete folder
  const handleDelete = async (id) => {
    await API.delete(`/folders/${id}`);
    fetchFolders();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <h1>Folders</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Folder name" value={name} onChange={e => setName(e.target.value)} required />
          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>
        <ul>
          {folders.map(f => (
            <li key={f._id}>
              {f.name}
              <button onClick={() => handleEdit(f)}>Edit</button>
              <button onClick={() => handleDelete(f._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Folders;
