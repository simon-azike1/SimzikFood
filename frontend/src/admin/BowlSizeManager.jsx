import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Loader } from 'lucide-react';

const BowlSizeManager = () => {
  const [bowlSize, setBowlSize] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('Bowl Size Reference');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch current bowl size on mount
  useEffect(() => {
    fetchBowlSize();
  }, []);

  const fetchBowlSize = async () => {
    try {
      const response = await fetch(`${apiUrl}/bowl-sizes`);
      const data = await response.json();
      if (data && data.imageUrl) {
        setBowlSize(data);
        setDescription(data.description || 'Bowl Size Reference');
      }
    } catch (err) {
      console.log('No existing bowl size image');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('description', description);

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiUrl}/bowl-sizes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload bowl size image');
      }

      const data = await response.json();
      setBowlSize(data.bowlSize);
      setSelectedFile(null);
      setMessage('Bowl size image uploaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!bowlSize || !window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiUrl}/bowl-sizes/${bowlSize._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete bowl size image');
      }

      setBowlSize(null);
      setMessage('Bowl size image deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Error deleting image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Bowl Size Reference Image</h3>

      {message && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Current Image Preview */}
      {bowlSize && (
        <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-3 font-semibold">Current Image:</p>
          <img
            src={bowlSize.imageUrl}
            alt="Bowl Size Reference"
            className="max-h-96 mx-auto rounded-lg object-contain"
          />
          <p className="text-sm text-gray-500 mt-2 text-center">{bowlSize.description}</p>
        </div>
      )}

      {/* Upload Form */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
          <label className="cursor-pointer text-center">
            <span className="text-blue-600 font-semibold hover:underline">
              Click to upload
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </label>
          <p className="text-gray-500 text-sm mt-2">or drag and drop</p>
          <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
        </div>

        {selectedFile && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700 font-semibold">
              Selected: {selectedFile.name}
            </p>
          </div>
        )}
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Bowl Size Reference"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
            selectedFile && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload Image
            </>
          )}
        </button>

        {bowlSize && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
              !loading
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Delete Image
          </button>
        )}
      </div>
    </div>
  );
};

export default BowlSizeManager;
