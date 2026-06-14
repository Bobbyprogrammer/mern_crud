import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Pencil, Trash2 } from 'lucide-react';

import UserForm from './components/UserForm';
import api from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const name = 'Babar khan';
  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data.data);
    } catch (error) {
      toast.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    try {
      await api.post('/users', userData);

      toast.success('User Created');

      fetchUsers();
    } catch (error) {
      toast.error('Creation Failed', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      await api.put(`/users/${editingUser._id}`, userData);

      toast.success('User Updated');

      setEditingUser(null);

      fetchUsers();
    } catch (error) {
      toast.error('Update Failed', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);

      toast.success('User Deleted');

      fetchUsers();
    } catch (error) {
      toast.error('Delete Failed', error);
    }
  };

  const submitHandler = (userData) => {
    if (editingUser) {
      updateUser(userData);
    } else {
      createUser(userData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">MERN CRUD APP</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <UserForm onSubmit={submitHandler} editingUser={editingUser} />

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>

                  <p>{user.email}</p>

                  <p>Age: {user.age}</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setEditingUser(user)} className="text-blue-600">
                    <Pencil size={20} />
                  </button>

                  <button onClick={() => deleteUser(user._id)} className="text-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            {users.length === 0 && <div className="text-center text-gray-500">No Users Found</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
