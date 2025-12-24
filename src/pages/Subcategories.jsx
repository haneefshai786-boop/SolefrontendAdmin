import React, { useEffect, useState } from "react";
import axios from "axios";

const Subcategories = () => {
  const token = localStorage.getItem("adminToken");

  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    vendor: "",
    category: ""
  });

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Fetch vendors
  useEffect(() => {
    axios.get("http://localhost:3500/api/admin/vendors", config)
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
    
    axios.get("http://localhost:3500/api/admin/subcategories", config)
      .then(res => setSubcategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch categories when vendor changes
  useEffect(() => {
    if (!formData.vendor) return;
    axios.get(`http://localhost:3500/api/admin/categories?vendor=${formData.vendor}`, config)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [formData.vendor]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:3500/api/admin/subcategories", formData, config)
      .then(res => {
        setSubcategories([...subcategories, res.data]);
        setFormData({ name: "", vendor: "", category: "" });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:3500/api/admin/subcategories/${id}`, config)
      .then(() => setSubcategories(subcategories.filter(s => s._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Subcategories</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Subcategory Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select name="vendor" value={formData.vendor} onChange={handleChange} required>
          <option value="">Select Vendor</option>
          {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
        </select>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <button type="submit">Create Subcategory</button>
      </form>

      <h3>Existing Subcategories</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.category?.name}</td>
              <td>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subcategories;
