import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const genders = ['female', 'male', 'non'];
const conditions = ['minor', 'moderate', 'serious', 'critical']; 

function validateCasualty(data) {
  const errors = [];
  if (!data.name || !data.name.trim()) errors.push('Name is required.');
  if (data.age === '' || isNaN(Number(data.age))) errors.push('Enter the number.');
  if (!genders.includes(data.gender)) errors.push('Select your gender. ');
  if (!conditions.includes(data.condition)) errors.push('Select a valid condition. ');
  return errors;
}

const CasualtyForm = ({ casualties, setCasualties, editingCasualty, setEditingCasualty }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', condition: '', notes: '', });

  useEffect(() => {
    if (editingCasualty) {
      setFormData({
        name: editingCasualty.name,
        age: editingCasualty.age,
        gender: editingCasualty.gender,
        condition: editingCasualty.condition,
        notes: editingCasualty.notes,
      });
    } else {
      setFormData({ name: '', age: '', gender: '', condition: '', notes: '' });
    }
  }, [editingCasualty]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateCasualty(formData);
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    try {
      if (editingCasualty) {
        const response = await axiosInstance.put(`/api/casualties/${editingCasualty._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCasualties(casualties.map((casualty) => (casualty._id === response.data._id ? response.data : casualty)));
      } else {
        const response = await axiosInstance.post('/api/casualties', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCasualties([...casualties, response.data]);
      }
      setEditingCasualty(null);
      setFormData({ name: '', age: '', gender: '', condition: '', notes: '' });
    } catch (error) {
      alert('Failed to save casualty.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingCasualty ? 'Edit Casualty' : 'Add Casualty'}</h1>
      
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <select
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      >
          <option value="" disabled>-- Select Gender --</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non">Non</option>
      </select>

      <select
        value={formData.condition}
        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      >
          <option value="" disabled>-- Select Condition --</option>
          <option value="minor">minor</option>
          <option value="moderate">moderate</option>
          <option value="serious">serious</option>
          <option value="critical">critical</option>
      </select>

      <input
        type="text"
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingCasualty ? 'Update Casualty' : 'Add Casualty'}
      </button>
    </form>
  );
};

export default CasualtyForm;
