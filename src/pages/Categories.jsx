import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const token = localStorage.getItem("adminToken");

  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    vendor: ""
  });

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Fetch vendors
  useEffect(() => {
    axios.get("http://localhost:3500/api/admin/vendors", config)
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:3500/api/admin/categories", config)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:3500/api/admin/categories", formData, config)
      .then(res => {
        setCategories([...categories, res.data]);
        setFormData({ name: "", vendor: "" });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:3500/api/admin/categories/${id}`, config)
      .then(() => setCategories(categories.filter(c => c._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select name="vendor" value={formData.vendor} onChange={handleChange} required>
          <option value="">Select Vendor</option>
          {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
        </select>
        <button type="submit">Create Category</button>
      </form>

      <h3>Existing Categories</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Vendor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.vendor?.name}</td>
              <td>
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
