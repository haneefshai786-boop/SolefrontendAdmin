import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../api/api.js";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");
  const [folderId, setFolderId] = useState("");
  const [folders, setFolders] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const vendorsRes = await API.get("/vendors");
    setVendors(vendorsRes.data);
    const foldersRes = await API.get("/folders");
    setFolders(foldersRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/vendors/${editId}`, { name, folder: folderId });
      setEditId(null);
    } else {
      await API.post("/vendors", { name, folder: folderId });
    }
    setName(""); setFolderId(""); fetchData();
  };

  const handleEdit = (v) => {
    setName(v.name); setFolderId(v.folder._id); setEditId(v._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/vendors/${id}`);
    fetchData();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <h1>Vendors</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Vendor name" value={name} onChange={e=>setName(e.target.value)} required />
          <select value={folderId} onChange={e=>setFolderId(e.target.value)} required>
            <option value="">Select Folder</option>
            {folders.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
          </select>
          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>
        <ul>
          {vendors.map(v => (
            <li key={v._id}>
              {v.name} ({v.folder?.name || "No Folder"})
              <button onClick={() => handleEdit(v)}>Edit</button>
              <button onClick={() => handleDelete(v._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Vendors;
