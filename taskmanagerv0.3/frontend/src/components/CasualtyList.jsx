import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const CasualtyList = ({ casualties, setCasualties, setEditingCasualty }) => {
  const { user } = useAuth();

  const handleDelete = async (casualtyId) => {
    try {
      await axiosInstance.delete(`/api/casualties/${casualtyId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCasualties(casualties.filter((casualty) => casualty._id !== casualtyId));
    } catch (error) {
      alert('Failed to delete casualty.');
    }
  };

  return (
    <div>
      {casualties.map((casualty) => (
        <div key={casualty._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{casualty.name}</h2>
          <p>{casualty.name}</p>
          <p>{casualty.gender}</p>
          <p>{casualty.age}</p>
          <p>{casualty.condition}</p>
          <p>{casualty.notes}</p>

          <div className="mt-2">
            <button
              onClick={() => setEditingCasualty(casualty)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(casualty._id)}
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

export default CasualtyList;
