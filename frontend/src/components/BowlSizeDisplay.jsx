import React, { useState, useEffect } from 'react';

const BowlSizeDisplay = () => {
  const [bowlSize, setBowlSize] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || '/api';
  const hasImages = !!(bowlSize?.singleImageUrl || bowlSize?.familyImageUrl);

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

  if (loading) {
    return (
      <section className="py-20 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-[0_40px_120px_rgba(245,197,24,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#F5C518] mb-4">Portion Guide</p>
            <p className="text-white/50">Loading the bowl size reference...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 border-t border-white/5 bg-[#060607]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-[#F5C518] mb-4">Portion Guide</p>
          <h2 className="text-4xl font-semibold text-white mb-4 sm:text-5xl">Bowl Size Reference</h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-4">
            Choose between single and family portions to find the perfect serving size for your order.
          </p>
          {!hasImages && (
            <p className="text-white/40 max-w-2xl mx-auto">
              No portion guide has been uploaded yet. Once you upload a bowl size image from the admin panel, it will appear here on the homepage.
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* SINGLE PORTION */}
          {bowlSize?.singleImageUrl ? (
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111316] to-[#0A0B0D] shadow-[0_30px_90px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="relative h-[420px] overflow-hidden bg-[#0B0B0D]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-transparent to-transparent" />
                <img
                  src={bowlSize.singleImageUrl}
                  alt="Single Portion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518] font-bold text-lg">1</div>
                  <h3 className="text-2xl font-semibold text-white">Single Portion</h3>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">{bowlSize.singleDescription || bowlSize.description}</p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/50 mb-1">Perfect for</p>
                  <p className="text-white font-semibold">One person or lighter meal</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-12 flex items-center justify-center min-h-[600px]">
              <p className="text-white/40 text-center">Single portion image coming soon...</p>
            </div>
          )}

          {/* FAMILY PORTION */}
          {bowlSize?.familyImageUrl ? (
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111316] to-[#0A0B0D] shadow-[0_30px_90px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="relative h-[420px] overflow-hidden bg-[#0B0B0D]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-transparent to-transparent" />
                <img
                  src={bowlSize.familyImageUrl}
                  alt="Family Portion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#40916C]/10 flex items-center justify-center text-[#40916C] text-xl">🥣</div>
                  <h3 className="text-2xl font-semibold text-white">Family Portion</h3>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">{bowlSize.familyDescription || bowlSize.description}</p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/50 mb-1">Perfect for</p>
                  <p className="text-white font-semibold">Family of 4–6 people</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-12 flex items-center justify-center min-h-[600px]">
              <p className="text-white/40 text-center">Family portion image coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BowlSizeDisplay;
 