import React, { useState, useEffect } from 'react';

const BowlSizeDisplay = () => {
  const [bowlSize, setBowlSize] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchBowlSize = async () => {
      try {
        const response = await fetch(`${apiUrl}/bowl-sizes`);
        if (response.ok) {
          const data = await response.json();
          setBowlSize(data);
        }
      } catch (err) {
        console.log('Bowl size not available');
      } finally {
        setLoading(false);
      }
    };

    fetchBowlSize();
  }, []);

  if (loading || !bowlSize) {
    return null;
  }

  return (
    <div className="my-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {bowlSize.description}
        </h3>
        <img
          src={bowlSize.imageUrl}
          alt={bowlSize.description}
          className="max-w-2xl mx-auto h-auto rounded-lg shadow-lg"
        />
        <p className="text-gray-600 mt-4 text-sm">
          Reference image for portion sizes
        </p>
      </div>
    </div>
  );
};

export default BowlSizeDisplay;
