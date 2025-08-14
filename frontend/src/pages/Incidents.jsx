import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import IncidentForm from '../components/IncidentForm';
import IncidentList from '../components/IncidentList.jsx';
import { useAuth } from '../context/AuthContext';

const Incidents = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [editingIncident, setEditingIncident] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axiosInstance.get('/api/incidents', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setIncidents(response.data);
      } catch (error) {
        alert('Failed to fetch incidents.');
      }
    };

    fetchIncidents();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <IncidentForm
        incidents={incidents}
        setIncidents={setIncidents}
        editingIncident={editingIncident}
        setEditingIncident={setEditingIncident}
      />
      <IncidentList incidents={incidents} setIncidents={setIncidents} setEditingIncident={setEditingIncident} />
    </div>
  );
};

export default Incidents;
