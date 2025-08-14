import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const IncidentList = ({ incidents, setIncidents, setEditingIncident }) => {
  const { user } = useAuth();

  const handleDelete = async (incidentId) => {
    try {
      await axiosInstance.delete(`/api/incidents/${incidentId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setIncidents(incidents.filter((incident) => incident._id !== incidentId));
    } catch (error) {
      alert('Failed to delete incident.');
    }
  };

  return (
    <div>
      {incidents.map((incident) => (
        <div key={incident._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{incident.title}</h2>
          <p>{incident.type}</p>
          <p>{incident.severity}</p>
          <p>{incident.description}</p>
          <p>{incident.location}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingIncident(incident)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(incident._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentList;
