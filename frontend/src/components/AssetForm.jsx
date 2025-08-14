import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TYPES = ['personnel', 'vehicle', 'equipment', 'medical'];
const STATUSES = ['available', 'assigned', 'maintenance', 'retired']; 

function validateAsset(data) {
  const errors = [];
  if (!data.name || !data.name.trim()) errors.push('Name is required.');
  if (!TYPES.includes(data.type)) errors.push('Select a valid type.');
  if (data.capacity !== '' && isNaN(Number(data.capacity))) errors.push('Enter the number.');
  if (!STATUSES.includes(data.status)) errors.push('Select a valid status. ');
  return errors;
}

const AssetForm = ({ assets, setAssets, editingAsset, setEditingAsset }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', type: '', capacity: '', status: 'available', notes: '' });

  useEffect(() => {
    if (editingAsset) {
      setFormData({
        name: editingAsset.name,
        type: editingAsset.type,
        capacity: editingAsset.capacity,
        status: editingAsset.status,
        notes: editingAsset.notes,
      });
    } else {
      setFormData({ name: '', type: '', capacity: '', status: 'available', notes: '' });
    }
  }, [editingAsset]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateAsset(formData);
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    try {
      if (editingAsset) {
        const response = await axiosInstance.put(`/api/assets/${editingAsset._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAssets(assets.map((asset) => (asset._id === response.data._id ? response.data : asset)));
      } else {
        const response = await axiosInstance.post('/api/assets', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAssets([...assets, response.data]);
      }
      setEditingAsset(null);
      setFormData({ name: '', type: '', capacity: '', status: 'available', notes: '' });
    } catch (error) {
      alert('Failed to save asset.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingAsset ? 'Edit Asset' : 'Add Asset'}</h1>
      
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      >
          <option value="" disabled>-- Select Type --</option>
          <option value="personnel">Personnel</option>
          <option value="vehicle">Vehicle</option>
          <option value="equipment">Equipment</option>
          <option value="medical">Medical</option>
      </select>

      <input
        type="text"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      >
          <option value="" disabled>-- Select Status --</option>
          <option value="available">Available</option>
          <option value="assigned">Assigned</option>
          <option value="maintenance">Maintenance</option>
          <option value="retired">Retired</option>
      </select>

      <input
        type="text"
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingAsset ? 'Update Asset' : 'Add Asset'}
      </button>
    </form>
  );
};

export default AssetForm;
