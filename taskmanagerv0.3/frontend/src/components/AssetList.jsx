import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const AssetList = ({ assets, setAssets, setEditingAsset }) => {
  const { user } = useAuth();

  const handleDelete = async (assetId) => {
    try {
      await axiosInstance.delete(`/api/assets/${assetId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAssets(assets.filter((asset) => asset._id !== assetId));
    } catch (error) {
      alert('Failed to delete asset.');
    }
  };

  return (
    <div>
      {assets.map((asset) => (
        <div key={asset._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{asset.name}</h2>
          <p>{asset.name}</p>
          <p>{asset.type}</p>
          <p>{asset.capacity}</p>
          <p>{asset.status}</p>
          <p>{asset.notes}</p>
          
          <div className="mt-2">
            <button
              onClick={() => setEditingAsset(asset)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(asset._id)}
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

export default AssetList;
