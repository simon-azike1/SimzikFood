import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

const CATEGORIES  = ['main', 'stews', 'soups', 'sides', 'drinks']
const EMPTY_FORM  = {
  name: '', category: 'main', description: '',
  singlePrice: '', familyPrice: '',
  singleLabel: 'Single Portion', familyLabel: 'Family Size',
  available: true, featured: false, order: 0,
}

/* ── small reusable input ── */
function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-1.5">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 focus:border-[#F5C518] text-white placeholder-white/25 px-3.5 py-2.5 rounded-xl outline-none transition-colors text-sm"
      />
    </div>
  )
}

/* ── toggle switch ── */
function Toggle({ checked, onChange, activeColor, label }) {
  return (
    <button onClick={onChange} className="flex items-center gap-2.5 cursor-pointer">
      <div
        className="relative w-11 h-6 rounded-full transition-colors"
        style={{ background: checked ? activeColor : 'rgba(255,255,255,0.1)' }}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`}
          style={{ background: checked && activeColor === '#F5C518' ? '#0D0D0D' : '#fff' }}
        />
      </div>
      <span className="text-sm font-semibold" style={{ color: checked ? activeColor : 'rgba(255,255,255,0.35)' }}>
        {label}
      </span>
    </button>
  )
}

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const [items,      setItems]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [activeTab,  setActiveTab]  = useState('menu')
  const [showForm,   setShowForm]   = useState(false)
  const [editItem,   setEditItem]   = useState(null)
  const [form,       setForm]       = useState(EMPTY_FORM)
  const [saving,     setSaving]     = useState(false)
  const [filterCat,  setFilterCat]  = useState('all')
  const [pwForm,     setPwForm]     = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwLoading,  setPwLoading]  = useState(false)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    try   { const r = await axios.get('/api/menu/admin/all'); setItems(r.data) }
    catch { toast.error('Failed to load items') }
    finally { setLoading(false) }
  }

  const openAdd = () => { setForm(EMPTY_FORM); setEditItem(null); setShowForm(true) }
  const openEdit = item => {
    setForm({
      name: item.name, category: item.category, description: item.description || '',
      singlePrice: item.singlePrice, familyPrice: item.familyPrice || '',
      singleLabel: item.singleLabel || 'Single Portion',
      familyLabel: item.familyLabel || 'Family Size',
      available: item.available, featured: item.featured, order: item.order || 0,
    })
    setEditItem(item); setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.singlePrice) { toast.error('Name and single price required'); return }
    setSaving(true)
    try {
      if (editItem) { await axios.put(`/api/menu/${editItem._id}`, form); toast.success('Item updated!') }
      else          { await axios.post('/api/menu', form);               toast.success('Item added!') }
      setShowForm(false); fetchItems()
    } catch { toast.error('Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return
    try   { await axios.delete(`/api/menu/${id}`); toast.success('Deleted'); fetchItems() }
    catch { toast.error('Delete failed') }
  }

  const toggleAvailable = async item => {
    try   { await axios.put(`/api/menu/${item._id}`, { ...item, available: !item.available }); fetchItems() }
    catch { toast.error('Update failed') }
  }

  const handlePwChange = async () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error('Passwords do not match'); return }
    if (pwForm.newPassword.length < 6) { toast.error('Min 6 characters'); return }
    setPwLoading(true)
    try {
      await axios.put('/api/auth/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
      toast.success('Password changed!'); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setPwLoading(false) }
  }

  const filtered = filterCat === 'all' ? items : items.filter(i => i.category === filterCat)
  const stats = {
    total:      items.length,
    available:  items.filter(i => i.available).length,
    featured:   items.filter(i => i.featured).length,
    categories: [...new Set(items.map(i => i.category))].length,
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">

      {/* ──────────── SIDEBAR ──────────── */}
      <aside className="w-56 shrink-0 bg-[#0A0A0A] border-r border-[#F5C518]/10 flex flex-col">

        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5C518] to-[#C9A000] flex items-center justify-center text-[#0D0D0D] font-black text-sm font-display">A</div>
            <div>
              <div className="font-display font-extrabold text-[#F5C518] text-sm">AZIKE</div>
              <div className="text-[9px] tracking-[2px] text-white/25 uppercase">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 pt-4">
          <p className="text-[9px] text-white/20 tracking-[2px] uppercase px-3 mb-2">Management</p>
          {[
            { key: 'menu',     icon: '🍽️', label: 'Menu Items' },
            { key: 'settings', icon: '⚙️', label: 'Settings'   },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 text-left transition-all ${
                activeTab === tab.key
                  ? 'bg-[#F5C518]/12 border border-[#F5C518]/25 text-[#F5C518]'
                  : 'text-white/45 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}

          <p className="text-[9px] text-white/20 tracking-[2px] uppercase px-3 mb-2 mt-4">Site</p>
          <a href="/" target="_blank" rel="noreferrer"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/45 hover:text-white/70 hover:bg-white/5 transition-all">
            <span>🌐</span> View Website
          </a>
        </nav>

        {/* User */}
        <div className="p-3 border-t border-white/5">
          <div className="px-3 py-2 text-white/35 text-xs mb-1">👤 {admin?.username}</div>
          <button
            onClick={() => { logout(); navigate('/admin/login') }}
            className="w-full px-3 py-2.5 bg-red-500/8 border border-red-500/15 rounded-xl text-red-400 text-xs font-semibold hover:bg-red-500/15 transition-colors text-left"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ──────────── MAIN ──────────── */}
      <div className="flex-1 overflow-auto">

        {/* Top bar */}
        <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex justify-between items-center sticky top-0 z-10 backdrop-blur">
          <h1 className="font-display font-bold text-xl">
            {activeTab === 'menu' ? '🍽️ Menu Management' : '⚙️ Settings'}
          </h1>
          {activeTab === 'menu' && (
            <button
              onClick={openAdd}
              className="bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
            >
              + Add New Item
            </button>
          )}
        </div>

        <div className="p-8">

          {/* ── MENU TAB ── */}
          {activeTab === 'menu' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Items', value: stats.total,      color: '#F5C518',  icon: '🍽️' },
                  { label: 'Available',   value: stats.available,  color: '#40916C',  icon: '✅' },
                  { label: 'Featured',    value: stats.featured,   color: '#FFD84D',  icon: '⭐' },
                  { label: 'Categories',  value: stats.categories, color: '#a78bfa',  icon: '📋' },
                ].map(({ label, value, color, icon }) => (
                  <div key={label} className="bg-white/[0.04] border border-white/7 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-[11px] text-white/35 font-bold uppercase tracking-wide">{label}</div>
                      <span className="text-lg">{icon}</span>
                    </div>
                    <div className="font-display font-extrabold text-3xl" style={{ color }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Category filter pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['all', ...CATEGORIES].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                      filterCat === cat
                        ? 'bg-[#F5C518]/15 border border-[#F5C518]/40 text-[#F5C518]'
                        : 'bg-transparent border border-white/8 text-white/40 hover:text-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="bg-white/[0.03] border border-white/7 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_120px] px-5 py-3 bg-white/[0.03] border-b border-white/5 text-[11px] text-white/35 font-bold uppercase tracking-wide">
                  <div>Item</div><div>Category</div><div>Single</div><div>Family</div><div>Status</div><div>Actions</div>
                </div>

                {loading ? (
                  <div className="text-center py-14 text-white/30">Loading items...</div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-14 text-white/30">No items found.</div>
                ) : filtered.map((item, i) => (
                  <div
                    key={item._id}
                    className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_120px] px-5 py-4 items-center hover:bg-white/[0.02] transition-colors ${i < filtered.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                  >
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        {item.name}
                        {item.featured && <span className="text-[9px] bg-[#F5C518]/15 text-[#F5C518] px-2 py-0.5 rounded-full font-bold">FEATURED</span>}
                      </div>
                      {item.description && (
                        <div className="text-xs text-white/30 truncate max-w-[200px] mt-0.5">{item.description}</div>
                      )}
                    </div>
                    <div className="text-xs text-[#40916C] font-semibold capitalize">{item.category}</div>
                    <div className="font-bold text-[#F5C518] text-sm">{item.singlePrice} MAD</div>
                    <div className="font-bold text-[#40916C] text-sm">{item.familyPrice ? `${item.familyPrice} MAD` : '—'}</div>
                    <div>
                      <button
                        onClick={() => toggleAvailable(item)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                          item.available
                            ? 'bg-[#40916C]/15 border-[#40916C]/25 text-[#40916C]'
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}
                      >
                        {item.available ? '✅ Live' : '❌ Hidden'}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)}
                        className="px-3 py-1.5 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-lg text-[#F5C518] text-xs font-semibold hover:bg-[#F5C518]/20 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item._id, item.name)}
                        className="px-3 py-1.5 bg-red-500/8 border border-red-500/15 rounded-lg text-red-400 text-xs hover:bg-red-500/15 transition-colors">
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── SETTINGS TAB ── */}
          {activeTab === 'settings' && (
            <div className="max-w-md space-y-6">
              <div className="bg-white/[0.03] border border-white/7 rounded-2xl p-7">
                <h3 className="font-display font-bold text-lg text-[#F5C518] mb-1">🔐 Change Password</h3>
                <p className="text-white/35 text-sm mb-6">Update your admin password below.</p>
                <Field label="Current Password" type="password" placeholder="••••••••" value={pwForm.currentPassword} onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} />
                <Field label="New Password"     type="password" placeholder="Min 6 characters" value={pwForm.newPassword}     onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} />
                <Field label="Confirm Password" type="password" placeholder="Repeat new password" value={pwForm.confirmPassword} onChange={e => setPwForm({ ...pwForm, confirmPassword: e.target.value })} />
                <button
                  onClick={handlePwChange}
                  disabled={pwLoading}
                  className={`bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 ${pwLoading ? 'opacity-60' : ''}`}
                >
                  {pwLoading ? 'Saving...' : '🔐 Update Password'}
                </button>
              </div>

              <div className="bg-white/[0.03] border border-white/7 rounded-2xl p-7">
                <h3 className="font-display font-bold text-lg mb-4">ℹ️ Admin Info</h3>
                <div className="space-y-2 text-sm text-white/45">
                  <div>👤 Username: <span className="text-[#F5C518] font-bold">{admin?.username}</span></div>
                  <div>🌐 API running on port 5000</div>
                  <div>📱 +212 751 780853</div>
                  <div>✉️ azikeshinye@gmail.com</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ──────────── MODAL FORM ──────────── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="bg-[#1A1A1A] border border-[#F5C518]/20 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-bold text-xl text-[#F5C518]">
                {editItem ? '✏️ Edit Item' : '➕ Add New Item'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white text-2xl leading-none">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-2">
                <Field label="Item Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jollof Rice" />
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#F5C518] text-white px-3.5 py-2.5 rounded-xl outline-none transition-colors text-sm"
                >
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#1A1A1A] capitalize">{c}</option>)}
                </select>
              </div>
              <Field label="Display Order" type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />

              <div className="col-span-2 mb-4">
                <label className="block text-[11px] font-bold uppercase tracking-wide text-white/40 mb-1.5">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the dish..."
                  className="w-full bg-white/5 border border-white/10 focus:border-[#F5C518] text-white placeholder-white/25 px-3.5 py-2.5 rounded-xl outline-none transition-colors resize-y text-sm"
                />
              </div>

              <Field label="Single Price (MAD) *" type="number" value={form.singlePrice} onChange={e => setForm({ ...form, singlePrice: e.target.value })} placeholder="60" />
              <Field label="Family Price (MAD)"   type="number" value={form.familyPrice}  onChange={e => setForm({ ...form, familyPrice: e.target.value })}  placeholder="120 (optional)" />
              <Field label="Single Label" value={form.singleLabel} onChange={e => setForm({ ...form, singleLabel: e.target.value })} />
              <Field label="Family Label" value={form.familyLabel} onChange={e => setForm({ ...form, familyLabel: e.target.value })} />
            </div>

            {/* Toggles */}
            <div className="flex gap-8 py-3 mb-5">
              <Toggle
                checked={form.available}
                onChange={() => setForm({ ...form, available: !form.available })}
                activeColor="#40916C"
                label={form.available ? 'Available' : 'Hidden'}
              />
              <Toggle
                checked={form.featured}
                onChange={() => setForm({ ...form, featured: !form.featured })}
                activeColor="#F5C518"
                label={form.featured ? '⭐ Featured' : 'Not Featured'}
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border-2 border-[#F5C518]/40 text-[#F5C518] hover:bg-[#F5C518]/10 font-bold py-3 rounded-xl transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex-[2] bg-[#F5C518] hover:bg-[#FFD84D] text-[#0D0D0D] font-bold py-3 rounded-xl transition-all text-sm hover:-translate-y-0.5 ${saving ? 'opacity-60' : ''}`}
              >
                {saving ? '⏳ Saving...' : editItem ? '✅ Save Changes' : '➕ Add Item'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
