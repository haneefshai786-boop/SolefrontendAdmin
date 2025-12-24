import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const token = localStorage.getItem("adminToken");

  const [folders, setFolders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    folder: "",
    vendor: "",
    category: "",
    subcategory: ""
  });

  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch folders, vendors, products
  useEffect(() => {
    axios.get("http://localhost:3500/api/admin/folders", config)
      .then(res => setFolders(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:3500/api/admin/vendors", config)
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:3500/api/admin/products", config)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch categories when vendor changes
  useEffect(() => {
    if (formData.vendor) {
      axios.get(`http://localhost:3500/api/admin/categories?vendor=${formData.vendor}`, config)
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    } else {
      setCategories([]);
    }
    setFormData(prev => ({ ...prev, category: "", subcategory: "" }));
    setSubcategories([]);
  }, [formData.vendor]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      axios.get(`http://localhost:3500/api/admin/subcategories?category=${formData.category}`, config)
        .then(res => setSubcategories(res.data))
        .catch(err => console.error(err));
    } else {
      setSubcategories([]);
    }
    setFormData(prev => ({ ...prev, subcategory: "" }));
  }, [formData.category]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:3500/api/admin/products", formData, config)
      .then(res => {
        setProducts([...products, res.data]);
        setFormData({
          name: "",
          price: "",
          image: "",
          description: "",
          folder: "",
          vendor: "",
          category: "",
          subcategory: ""
        });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:3500/api/admin/products/${id}`, config)
      .then(() => setProducts(products.filter(p => p._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <select name="folder" value={formData.folder} onChange={handleChange} required>
          <option value="">Select Folder</option>
          {folders.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
        </select>

        <select name="vendor" value={formData.vendor} onChange={handleChange} required>
          <option value="">Select Vendor</option>
          {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
        </select>

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        <select name="subcategory" value={formData.subcategory} onChange={handleChange} required>
          <option value="">Select Subcategory</option>
          {subcategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <button type="submit">Create Product</button>
      </form>

      <h3>Existing Products</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Vendor</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.vendor?.name}</td>
              <td>{p.category?.name}</td>
              <td>{p.subcategory?.name}</td>
              <td>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
