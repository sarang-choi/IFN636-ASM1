import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig.jsx';
import AssetForm from '../components/AssetForm.jsx';
import AssetList from '../components/AssetList.jsx';
import { useAuth } from '../context/AuthContext.js';

const Assets = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [editingAsset, setEditingAsset] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axiosInstance.get('/api/assets', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAssets(response.data);
      } catch (error) {
        alert('Failed to fetch assets.');
      }
    };

    fetchAssets();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <AssetForm
        assets={assets}
        setAssets={setAssets}
        editingAsset={editingAsset}
        setEditingAsset={setEditingAsset}
      />
      <AssetList assets={assets} setAssets={setAssets} setEditingAsset={setEditingAsset} />
    </div>
  );
};

export default Assets;
