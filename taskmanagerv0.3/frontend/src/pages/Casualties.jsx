import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig.jsx';
import CasualtyForm from '../components/CasualtyForm.jsx';
import CasualtyList from '../components/CasualtyList.jsx';
import { useAuth } from '../context/AuthContext.js';

const Casualties = () => {
  const { user } = useAuth();
  const [casualties, setCasualties] = useState([]);
  const [editingCasualty, setEditingCasualty] = useState(null);

  useEffect(() => {
    const fetchCasualties = async () => {
      try {
        const response = await axiosInstance.get('/api/casualties', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCasualties(response.data);
      } catch (error) {
        alert('Failed to fetch casualties.');
      }
    };

    fetchCasualties();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <CasualtyForm
        casualties={casualties}
        setCasualties={setCasualties}
        editingCasualty={editingCasualty}
        setEditingCasualty={setEditingCasualty}
      />
      <CasualtyList 
      casualties={casualties} 
      setCasualties={setCasualties} 
      setEditingCasualty={setEditingCasualty} />
    </div>
  );
};

export default Casualties;
