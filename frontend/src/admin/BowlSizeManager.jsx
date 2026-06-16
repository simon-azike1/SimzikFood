import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Loader } from 'lucide-react';

const BowlSizeManager = () => {
  const [bowlSize, setBowlSize] = useState(null);
  const [selectedFile, setSelectedFile] = useState({ single: null, family: null });
  const [descriptions, setDescriptions] = useState({
    single: 'Single Portion (~1 Liter)',
    family: 'Family Size (Feeds 4–6)',
  });
  const [loading, setLoading] = useState({ single: false, family: false, fetch: true });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchBowlSize();
  }, []);

  const fetchBowlSize = async () => {
    try {
      const response = await fetch(`${apiUrl}/bowl-sizes`);
      const data = await response.json();
      if (data && (data.singleImageUrl || data.familyImageUrl)) {
        setBowlSize(data);
        setDescriptions({
          single: data.singleDescription || 'Single Portion (~1 Liter)',
          family: data.familyDescription || 'Family Size (Feeds 4–6)',
        });
      } else {
        setBowlSize(null);
      }
    } catch (err) {
      console.log('No existing bowl size images');
    } finally {
      setLoading(prev => ({ ...prev, fetch: false }));
    }
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      setSelectedFile(prev => ({ ...prev, [type]: file }));
      setError('');
    }
  };

  const handleUpload = async (type) => {
    if (!selectedFile[type]) {
      setError(`Please select an image for ${type} portion`);
      return;
    }

    setLoading(prev => ({ ...prev, [type]: true }));
    setMessage('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile[type]);
      formData.append('type', type);
      formData.append('description', descriptions[type]);

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiUrl}/bowl-sizes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload ${type} bowl size image`);
      }

      const data = await response.json();
      setBowlSize(data.bowlSize);
      setSelectedFile(prev => ({ ...prev, [type]: null }));
      setMessage(`${type} portion image uploaded successfully!`);
      setTimeout(() => setMessage(''), 3000);
      await fetchBowlSize();
    } catch (err) {
      setError(err.message || `Error uploading ${type} image`);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleDelete = async (type) => {
    if (!bowlSize || !window.confirm(`Delete the ${type} portion image?`)) {
      return;
    }

    setLoading(prev => ({ ...prev, [type]: true }));
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiUrl}/bowl-sizes/${bowlSize._id}/${type}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${type} image`);
      }

      const data = await response.json();
      setBowlSize(data.bowlSize);
      setMessage(`${type} portion image deleted successfully!`);
      setTimeout(() => setMessage(''), 3000);
      await fetchBowlSize();
    } catch (err) {
      setError(err.message || `Error deleting ${type} image`);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  if (loading.fetch) {
    return (
      <div className="bg-[#111317] border border-white/10 rounded-[2rem] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
        <p className="text-white/50 text-center">Loading...</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {message && (
        <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/15 text-emerald-200">
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-3xl bg-red-500/10 border border-red-500/15 text-red-200">
          {error}
        </div>
      )}

      {/* SINGLE PORTION SECTION */}
      <div className="bg-[#111317] border border-white/10 rounded-[2rem] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518] font-bold">1</div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#F5C518] mb-1">Single Portion</p>
            <h3 className="text-lg font-semibold text-white">Upload ~1 Liter bowl image</h3>
          </div>
        </div>

        {bowlSize?.singleImageUrl && (
          <div className="mb-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50 mb-3 font-semibold">Current image</p>
            <div className="rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#0B0B0D]">
              <img src={bowlSize.singleImageUrl} alt="Single Portion" className="w-full h-full max-h-[300px] object-cover" />
            </div>
            <p className="text-sm text-white/60 mt-3 text-center">{bowlSize.singleDescription}</p>
          </div>
        )}

        <div className="mb-6 rounded-[1.75rem] border border-dashed border-white/10 bg-white/5 p-6 text-center">
          <Upload className="mx-auto mb-3 w-12 h-12 text-[#F5C518]" />
          <label className="cursor-pointer inline-flex flex-col items-center gap-2">
            <span className="text-base font-semibold text-white">Choose image</span>
            <span className="text-xs text-white/50">PNG, JPG up to 5MB</span>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange('single', e)} className="hidden" disabled={loading.single} />
          </label>
          {selectedFile.single && <p className="mt-3 text-sm text-white/70">Selected: <span className="font-semibold">{selectedFile.single.name}</span></p>}
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">Description</label>
            <input type="text" value={descriptions.single} onChange={(e) => setDescriptions(prev => ({ ...prev, single: e.target.value }))} placeholder="Single Portion (~1 Liter)" className="w-full rounded-2xl border border-white/10 bg-[#09090B] px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#F5C518] focus:outline-none focus:ring-2 focus:ring-[#F5C518]/20 transition text-sm" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleUpload('single')} disabled={!selectedFile.single || loading.single} className={`flex-1 flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${selectedFile.single && !loading.single ? 'bg-[#F5C518] text-[#0F0F11] hover:bg-[#ffd85c]' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>
              {loading.single ? <><Loader className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Upload Single</>}
            </button>
            {bowlSize?.singleImageUrl && <button onClick={() => handleDelete('single')} disabled={loading.single} className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition ${!loading.single ? 'bg-red-500/15 text-red-300 hover:bg-red-500/25' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}><Trash2 className="w-4 h-4" /></button>}
          </div>
        </div>
      </div>

      {/* FAMILY PORTION SECTION */}
      <div className="bg-[#111317] border border-white/10 rounded-[2rem] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl bg-[#40916C]/10 flex items-center justify-center text-[#40916C] text-xl">🥣</div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#40916C] mb-1">Family Portion</p>
            <h3 className="text-lg font-semibold text-white">Upload family size bowl image</h3>
          </div>
        </div>

        {bowlSize?.familyImageUrl && (
          <div className="mb-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50 mb-3 font-semibold">Current image</p>
            <div className="rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#0B0B0D]">
              <img src={bowlSize.familyImageUrl} alt="Family Portion" className="w-full h-full max-h-[300px] object-cover" />
            </div>
            <p className="text-sm text-white/60 mt-3 text-center">{bowlSize.familyDescription}</p>
          </div>
        )}

        <div className="mb-6 rounded-[1.75rem] border border-dashed border-white/10 bg-white/5 p-6 text-center">
          <Upload className="mx-auto mb-3 w-12 h-12 text-[#40916C]" />
          <label className="cursor-pointer inline-flex flex-col items-center gap-2">
            <span className="text-base font-semibold text-white">Choose image</span>
            <span className="text-xs text-white/50">PNG, JPG up to 5MB</span>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange('family', e)} className="hidden" disabled={loading.family} />
          </label>
          {selectedFile.family && <p className="mt-3 text-sm text-white/70">Selected: <span className="font-semibold">{selectedFile.family.name}</span></p>}
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">Description</label>
            <input type="text" value={descriptions.family} onChange={(e) => setDescriptions(prev => ({ ...prev, family: e.target.value }))} placeholder="Family Size (Feeds 4–6)" className="w-full rounded-2xl border border-white/10 bg-[#09090B] px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#40916C] focus:outline-none focus:ring-2 focus:ring-[#40916C]/20 transition text-sm" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleUpload('family')} disabled={!selectedFile.family || loading.family} className={`flex-1 flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${selectedFile.family && !loading.family ? 'bg-[#40916C] text-white hover:bg-[#50a876]' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>
              {loading.family ? <><Loader className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Upload Family</>}
            </button>
            {bowlSize?.familyImageUrl && <button onClick={() => handleDelete('family')} disabled={loading.family} className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition ${!loading.family ? 'bg-red-500/15 text-red-300 hover:bg-red-500/25' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}><Trash2 className="w-4 h-4" /></button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BowlSizeManager;
