import { useState, useEffect } from "react";

const UserForm = ({ onSubmit, editingUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);

    if (!editingUser) {
      setFormData({
        name: "",
        email: "",
        age: "",
      });
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">
        {editingUser ? "Update User" : "Create User"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3"
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
        required
      />

      <button className="bg-blue-600 text-white px-5 py-2 rounded">
        {editingUser ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default UserForm;
