import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const severities = ['minor', 'moderate', 'serious', 'critical'];

function validateIncident(data) {
  const errors = [];
  if (!data.title || !data.title.trim()) errors.push('Title is required.');
  if (!data.type || !data.type.trim()) errors.push('Type is required.');
  if (!data.location || !data.location.trim()) errors.push('Location is required.');
  if (!severities.includes(data.severity)) errors.push('Select a valid severity. ');
  return errors;
}

const IncidentForm = ({ incidents, setIncidents, editingIncident, setEditingIncident }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', type: '', severity: '', description: '', location: '' });

  useEffect(() => {
    if (editingIncident) {
      setFormData({
        title: editingIncident.title,
        type: editingIncident.type,
        severity: editingIncident.severity,
        description: editingIncident.description,
        location: editingIncident.location,
      });
    } else {
      setFormData({ title: '', type: '', severity: '', description: '', location: '' });
    }
  }, [editingIncident]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateIncident(formData);
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    try {
      if (editingIncident) {
        const response = await axiosInstance.put(`/api/incidents/${editingIncident._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setIncidents(incidents.map((incident) => (incident._id === response.data._id ? response.data : incident)));
      } else {
        const response = await axiosInstance.post('/api/incidents', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setIncidents([...incidents, response.data]);
      }
      setEditingIncident(null);
      setFormData({ title: '', type: '', severity: '', description: '', location: '' });
    } catch (error) {
      alert('Failed to save incident.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingIncident ? 'Edit Incident' : 'Add Incident'}</h1>
      
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Disaster Type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <select
        value={formData.severity}
        onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      >
          <option value="" disabled>-- Select Severity --</option>
          <option value="minor">minor</option>
          <option value="moderate">moderate</option>
          <option value="serious">serious</option>
          <option value="critical">critical</option>
      </select>

      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Location (address) "
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingIncident ? 'Update Incident' : 'Add Incident'}
      </button>
    </form>
  );
};

export default IncidentForm;
