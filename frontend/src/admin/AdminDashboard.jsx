import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

const Icons = {
  UtensilsCrossed: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="m15 15 3.4-3.4"/><path d="m2 22 5.5-5.5"/><path d="M9 9 2 2"/><path d="m2 9 9-7"/><path d="m22 22-9-9"/></svg>),
  Settings2: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>),
  ExternalLink: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>),
  LogOut: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>),
  Plus: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
  Pencil: () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>),
  Trash2: () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>),
  Eye: () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>),
  EyeOff: () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>),
  Star: () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Menu: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>),
  X: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  Lock: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>),
  User: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
  LayoutGrid: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>),
  Tag: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>),
  ChevronDown: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>),
  Upload: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>),
  Image: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>),
}

const CATEGORIES = ['main', 'stews', 'soups', 'sides', 'drinks']
const EMPTY_FORM = {
  name: '', category: 'main', description: '',
  singlePrice: '', familyPrice: '',
  singleLabel: 'Single Portion', familyLabel: 'Family Size',
  available: true, featured: false, order: 0,
  imageUrl: '', imagePublicId: '',
}

function Field({ label, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      {label && (
        <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-2">
          {label}{required && <span className="text-[#F5C518] ml-0.5">*</span>}
        </label>
      )}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/8 focus:border-[#F5C518]/50 focus:bg-white/[0.06] text-white placeholder-white/15 px-4 py-3 rounded-xl outline-none transition-all duration-200 text-sm" />
    </div>
  )
}

function Toggle({ checked, onChange, activeColor, label }) {
  return (
    <button type="button" onClick={onChange} className="flex items-center gap-3">
      <div className="relative w-11 h-[22px] rounded-full transition-all duration-300 cursor-pointer"
        style={{ background: checked ? activeColor : 'rgba(255,255,255,0.07)', boxShadow: checked ? `0 0 16px ${activeColor}35` : 'none' }}>
        <div className="absolute top-[3px] w-4 h-4 rounded-full shadow-sm transition-all duration-300"
          style={{ left: checked ? '23px' : '3px', background: checked && activeColor === '#F5C518' ? '#0D0D0D' : 'white' }} />
      </div>
      <span className="text-xs font-semibold transition-colors duration-200"
        style={{ color: checked ? activeColor : 'rgba(255,255,255,0.25)' }}>{label}</span>
    </button>
  )
}

function StatCard({ label, value, accent, icon }) {
  return (
    <div className="relative bg-[#111317] border border-white/[0.07] rounded-2xl p-5 overflow-hidden group hover:border-white/[0.12] transition-all duration-300">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 100% 0%, ${accent}10 0%, transparent 50%)` }} />
      <div className="flex items-start justify-between mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">{label}</p>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}12`, color: accent }}>{icon}</div>
      </div>
      <p className="text-[2.4rem] font-black leading-none tracking-tight" style={{ color: accent }}>{value}</p>
    </div>
  )
}

// ── Image Upload Component ────────────────────────────────────
function ImageUploader({ imageUrl, imagePublicId, onChange, onDelete }) {
  const fileRef  = useRef()
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await axios.post('/api/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onChange(res.data.imageUrl, res.data.publicId)
      toast.success('Image uploaded')
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = async () => {
    if (!imagePublicId) { onChange('', ''); return }
    try {
      await axios.delete('/api/upload', { data: { publicId: imagePublicId } })
      onChange('', '')
      toast.success('Image removed')
    } catch {
      // Still clear locally even if Cloudinary delete fails
      onChange('', '')
    }
  }

  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-2">
        Dish Image
      </label>

      {imageUrl ? (
        // Preview with delete
        <div className="relative rounded-xl overflow-hidden border border-white/8 group">
          <img src={imageUrl} alt="dish" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button type="button" onClick={() => fileRef.current.click()}
              className="flex items-center gap-2 bg-[#F5C518] text-[#0C0C0E] font-bold px-4 py-2 rounded-lg text-xs">
              <Icons.Upload /> Replace
            </button>
            <button type="button" onClick={handleDelete}
              className="flex items-center gap-2 bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-xs">
              <Icons.Trash2 /> Remove
            </button>
          </div>
        </div>
      ) : (
        // Upload drop zone
        <button type="button" onClick={() => fileRef.current.click()}
          disabled={uploading}
          className="w-full h-36 border-2 border-dashed border-white/10 hover:border-[#F5C518]/40 rounded-xl flex flex-col items-center justify-center gap-3 text-white/25 hover:text-white/50 transition-all">
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-[#F5C518]/40 border-t-[#F5C518] rounded-full animate-spin" />
              <span className="text-xs">Uploading...</span>
            </>
          ) : (
            <>
              <Icons.Image />
              <span className="text-xs font-medium">Click to upload image</span>
              <span className="text-[10px] text-white/20">JPG, PNG up to 5MB</span>
            </>
          )}
        </button>
      )}

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  )
}

// ════════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const [items,        setItems]       = useState([])
  const [loading,      setLoading]     = useState(true)
  const [activeTab,    setActiveTab]   = useState('menu')
  const [showForm,     setShowForm]    = useState(false)
  const [editItem,     setEditItem]    = useState(null)
  const [form,         setForm]        = useState(EMPTY_FORM)
  const [saving,       setSaving]      = useState(false)
  const [filterCat,    setFilterCat]   = useState('all')
  const [sidebarOpen,  setSidebarOpen] = useState(false)
  const [pwForm,       setPwForm]      = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwLoading,    setPwLoading]   = useState(false)

  useEffect(() => { fetchItems() }, [])
  useEffect(() => { if (sidebarOpen) setSidebarOpen(false) }, [activeTab])

  const fetchItems = async () => {
    try   { const r = await axios.get('/api/menu/admin/all'); setItems(r.data) }
    catch { toast.error('Could not load menu items') }
    finally { setLoading(false) }
  }

  const openAdd  = () => { setForm(EMPTY_FORM); setEditItem(null); setShowForm(true) }
  const openEdit = item => {
    setForm({
      name: item.name, category: item.category,
      description: item.description || '',
      singlePrice: item.singlePrice, familyPrice: item.familyPrice || '',
      singleLabel: item.singleLabel || 'Single Portion',
      familyLabel: item.familyLabel || 'Family Size',
      available: item.available, featured: item.featured, order: item.order || 0,
      imageUrl: item.imageUrl || '', imagePublicId: item.imagePublicId || '',
    })
    setEditItem(item); setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name?.trim() || !form.singlePrice) { toast.error('Dish name and price are required'); return }
    setSaving(true)
    try {
      if (editItem) { await axios.put(`/api/menu/${editItem._id}`, form); toast.success('Changes saved') }
      else          { await axios.post('/api/menu', form);               toast.success('Item added') }
      setShowForm(false); fetchItems()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove "${name}" from the menu?`)) return
    try   { await axios.delete(`/api/menu/${id}`); toast.success(`"${name}" removed`); fetchItems() }
    catch { toast.error('Delete failed') }
  }

  const toggleAvailable = async item => {
    try   { await axios.put(`/api/menu/${item._id}`, { ...item, available: !item.available }); fetchItems() }
    catch { toast.error('Update failed') }
  }

  const handlePwChange = async () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error('Passwords do not match'); return }
    if (pwForm.newPassword.length < 6) { toast.error('Minimum 6 characters'); return }
    setPwLoading(true)
    try {
      await axios.put('/api/auth/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
      toast.success('Password updated')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
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
  const catColors = { main: '#F5C518', stews: '#FB923C', soups: '#34D399', sides: '#60A5FA', drinks: '#A78BFA' }
  const NAV = [
    { key: 'menu',     label: 'Menu Items', icon: <Icons.UtensilsCrossed /> },
    { key: 'settings', label: 'Settings',   icon: <Icons.Settings2 /> },
  ]

  return (
    <div className="flex h-screen bg-[#0C0C0E] text-white overflow-hidden">

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-[#0E0E11] border-r border-white/[0.06] flex flex-col transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F5C518] flex items-center justify-center">
              <span className="text-[#0C0C0E] font-black text-sm">S</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide leading-none">Simzik</p>
              <p className="text-white/20 text-[9px] tracking-[0.2em] uppercase mt-0.5">Admin</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/25 hover:text-white/60"><Icons.X /></button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/15 px-3 mb-3">Management</p>
          {NAV.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-left transition-all duration-200 ${
                activeTab === tab.key ? 'bg-white/[0.07] text-white border border-white/[0.08]' : 'text-white/35 hover:text-white/60 hover:bg-white/[0.04]'
              }`}>
              <span className={activeTab === tab.key ? 'text-[#F5C518]' : 'text-white/20'}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.key && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F5C518]" />}
            </button>
          ))}
          <div className="pt-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/15 px-3 mb-3">Quick Links</p>
            <a href="/" target="_blank" rel="noreferrer"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/30 hover:text-white/55 hover:bg-white/[0.04] transition-all">
              <span className="text-white/15"><Icons.ExternalLink /></span>View Website
            </a>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-white/[0.06] space-y-1 shrink-0">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center text-white/30 shrink-0"><Icons.User /></div>
            <p className="text-[11px] text-white/30 truncate">{admin?.email || admin?.username}</p>
          </div>
          <button onClick={() => { logout(); navigate('/admin/login') }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400/50 hover:text-red-400 hover:bg-red-400/[0.06] transition-all">
            <Icons.LogOut />Sign out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 shrink-0 flex items-center justify-between px-5 md:px-7 border-b border-white/[0.06] bg-[#0C0C0E]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.05] text-white/50 hover:text-white transition-colors">
              <Icons.Menu />
            </button>
            <div>
              <h1 className="font-semibold text-[15px] text-white/90">{activeTab === 'menu' ? 'Menu Management' : 'Settings'}</h1>
              <p className="text-[11px] text-white/20 leading-none mt-0.5 hidden sm:block">
                {activeTab === 'menu' ? `${stats.available} of ${stats.total} items live` : 'Account & security'}
              </p>
            </div>
          </div>
          {activeTab === 'menu' && (
            <button onClick={openAdd}
              className="flex items-center gap-2 bg-[#F5C518] hover:bg-[#FFD84D] text-[#0C0C0E] font-bold px-4 py-2.5 rounded-xl text-[13px] transition-all hover:-translate-y-px shadow-lg shadow-[#F5C518]/10">
              <Icons.Plus />
              <span className="hidden sm:inline">New Item</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-5 md:p-7 max-w-6xl mx-auto">

            {/* MENU TAB */}
            {activeTab === 'menu' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <StatCard label="Total Items" value={stats.total}      accent="#F5C518" icon={<Icons.LayoutGrid />} />
                  <StatCard label="Available"   value={stats.available}  accent="#34D399" icon={<Icons.Eye />} />
                  <StatCard label="Featured"    value={stats.featured}   accent="#FBBF24" icon={<Icons.Star />} />
                  <StatCard label="Categories"  value={stats.categories} accent="#A78BFA" icon={<Icons.Tag />} />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                  <button onClick={() => setFilterCat('all')}
                    className={`px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                      filterCat === 'all' ? 'bg-white/10 text-white border border-white/15' : 'text-white/30 hover:text-white/55 border border-white/[0.06]'
                    }`}>All Items</button>
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setFilterCat(cat)}
                      className={`px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all shrink-0 capitalize ${
                        filterCat === cat ? 'text-[#0C0C0E] border border-transparent font-bold' : 'text-white/30 hover:text-white/55 border border-white/[0.06]'
                      }`}
                      style={filterCat === cat ? { background: catColors[cat] } : {}}>
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Items */}
                {loading ? (
                  <div className="flex items-center justify-center py-24 text-white/20 text-sm">Loading...</div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center text-white/20"><Icons.UtensilsCrossed /></div>
                    <p className="text-white/25 text-sm">No items in this category</p>
                    <button onClick={openAdd} className="text-[#F5C518] text-sm font-semibold">Add the first item</button>
                  </div>
                ) : (
                  <>
                    {/* Mobile cards */}
                    <div className="md:hidden space-y-3">
                      {filtered.map(item => (
                        <div key={item._id} className="bg-[#111317] border border-white/[0.07] rounded-2xl overflow-hidden">
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-36 object-cover" />
                          )}
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-semibold text-[14px] text-white/90">{item.name}</span>
                                  {item.featured && (
                                    <span className="inline-flex items-center gap-1 text-[#F5C518] bg-[#F5C518]/10 border border-[#F5C518]/15 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                      <Icons.Star /> Featured
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] font-medium capitalize mt-1 block" style={{ color: catColors[item.category] }}>{item.category}</span>
                              </div>
                              <button onClick={() => toggleAvailable(item)}
                                className={`shrink-0 flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
                                  item.available ? 'bg-[#34D399]/10 border border-[#34D399]/20 text-[#34D399]' : 'bg-white/[0.04] border border-white/[0.08] text-white/30'
                                }`}>
                                {item.available ? <><Icons.Eye /> Live</> : <><Icons.EyeOff /> Hidden</>}
                              </button>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                              <div className="flex gap-4">
                                <div>
                                  <p className="text-[9px] text-white/20 uppercase tracking-wider mb-0.5">Single</p>
                                  <p className="font-bold text-[#F5C518] text-sm">{item.singlePrice} MAD</p>
                                </div>
                                {item.familyPrice && (
                                  <div>
                                    <p className="text-[9px] text-white/20 uppercase tracking-wider mb-0.5">Family</p>
                                    <p className="font-bold text-[#34D399] text-sm">{item.familyPrice} MAD</p>
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => openEdit(item)}
                                  className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white/60 text-[12px] font-medium hover:text-white transition-all">
                                  <Icons.Pencil /> Edit
                                </button>
                                <button onClick={() => handleDelete(item._id, item.name)}
                                  className="flex items-center px-3 py-2 bg-red-500/[0.06] border border-red-500/10 rounded-xl text-red-400/60 hover:text-red-400 transition-all">
                                  <Icons.Trash2 />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block bg-[#0E0E11] border border-white/[0.07] rounded-2xl overflow-hidden">
                      <div className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_1fr_140px] gap-4 px-6 py-3.5 border-b border-white/[0.05] bg-white/[0.015]">
                        {['', 'Dish', 'Category', 'Single', 'Family', 'Status', 'Actions'].map(h => (
                          <p key={h} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/20">{h}</p>
                        ))}
                      </div>
                      {filtered.map((item, i) => (
                        <div key={item._id}
                          className={`grid grid-cols-[60px_2fr_1fr_1fr_1fr_1fr_140px] gap-4 px-6 py-4 items-center hover:bg-white/[0.015] transition-colors ${i < filtered.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                          {/* Thumbnail */}
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/[0.04] flex items-center justify-center shrink-0">
                            {item.imageUrl
                              ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                              : <span className="text-white/15"><Icons.Image /></span>
                            }
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[14px] text-white/85">{item.name}</span>
                              {item.featured && (
                                <span className="inline-flex items-center gap-1 text-[#F5C518] bg-[#F5C518]/8 px-2 py-0.5 rounded-full text-[9px] font-bold">
                                  <Icons.Star /> Featured
                                </span>
                              )}
                            </div>
                            {item.description && <p className="text-[11px] text-white/20 truncate max-w-[200px] mt-0.5">{item.description}</p>}
                          </div>
                          <div>
                            <span className="text-[11px] font-semibold capitalize px-2.5 py-1 rounded-full"
                              style={{ color: catColors[item.category], background: `${catColors[item.category]}12` }}>
                              {item.category}
                            </span>
                          </div>
                          <p className="font-bold text-[#F5C518] text-[13px]">{item.singlePrice} MAD</p>
                          <p className="font-bold text-[#34D399] text-[13px]">{item.familyPrice ? `${item.familyPrice} MAD` : <span className="text-white/15">—</span>}</p>
                          <div>
                            <button onClick={() => toggleAvailable(item)}
                              className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
                                item.available
                                  ? 'bg-[#34D399]/8 border border-[#34D399]/18 text-[#34D399] hover:bg-[#34D399]/14'
                                  : 'bg-white/[0.04] border border-white/8 text-white/25'
                              }`}>
                              {item.available ? <><Icons.Eye /> Live</> : <><Icons.EyeOff /> Hidden</>}
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(item)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-white/55 text-[12px] font-medium hover:text-white hover:bg-white/[0.08] transition-all">
                              <Icons.Pencil /> Edit
                            </button>
                            <button onClick={() => handleDelete(item._id, item.name)}
                              className="flex items-center px-3 py-1.5 bg-red-500/[0.05] border border-red-500/[0.08] rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/[0.09] transition-all">
                              <Icons.Trash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="max-w-sm space-y-4">
                <div className="bg-[#0E0E11] border border-white/[0.07] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.05]">
                    <div className="w-9 h-9 rounded-xl bg-[#F5C518]/8 border border-[#F5C518]/12 flex items-center justify-center text-[#F5C518]"><Icons.Lock /></div>
                    <div>
                      <p className="font-semibold text-[14px] text-white/85">Change Password</p>
                      <p className="text-[11px] text-white/25 mt-0.5">Update your login credentials</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Field label="Current Password" type="password" placeholder="Enter current password" value={pwForm.currentPassword} onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} />
                    <Field label="New Password"     type="password" placeholder="Minimum 6 characters"  value={pwForm.newPassword}     onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} />
                    <Field label="Confirm Password" type="password" placeholder="Repeat new password"   value={pwForm.confirmPassword} onChange={e => setPwForm({ ...pwForm, confirmPassword: e.target.value })} />
                  </div>
                  <button onClick={handlePwChange} disabled={pwLoading}
                    className={`w-full mt-5 bg-[#F5C518] hover:bg-[#FFD84D] text-[#0C0C0E] font-bold py-3 rounded-xl text-sm transition-all ${pwLoading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-px'}`}>
                    {pwLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>

                <div className="bg-[#0E0E11] border border-white/[0.07] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.05]">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-white/30"><Icons.User /></div>
                    <div>
                      <p className="font-semibold text-[14px] text-white/85">Account Details</p>
                      <p className="text-[11px] text-white/25 mt-0.5">Your admin information</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Admin',   value: admin?.email || admin?.username },
                      { label: 'Phone',   value: '+212 751 780853' },
                      { label: 'Email',   value: 'azikeshinye@gmail.com' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-white/[0.04] last:border-0">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/20">{label}</span>
                        <span className="text-[12px] text-white/50">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-5">
          <div className="bg-[#111317] border border-white/[0.09] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
              <div>
                <h2 className="font-bold text-[15px] text-white/90">{editItem ? 'Edit Menu Item' : 'Add New Item'}</h2>
                <p className="text-[11px] text-white/25 mt-0.5">{editItem ? 'Update dish details' : 'Fill in details for the new dish'}</p>
              </div>
              <button onClick={() => setShowForm(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.05] text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-all">
                <Icons.X />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

              {/* Image uploader */}
              <ImageUploader
                imageUrl={form.imageUrl}
                imagePublicId={form.imagePublicId}
                onChange={(url, publicId) => setForm({ ...form, imageUrl: url, imagePublicId: publicId })}
                onDelete={() => setForm({ ...form, imageUrl: '', imagePublicId: '' })}
              />

              <Field label="Dish Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jollof Rice" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-2">Category</label>
                  <div className="relative">
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full appearance-none bg-white/[0.04] border border-white/8 focus:border-[#F5C518]/50 text-white px-4 py-3 rounded-xl outline-none transition-all text-sm pr-9">
                      {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#1A1A1A] capitalize">{c}</option>)}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"><Icons.ChevronDown /></div>
                  </div>
                </div>
                <Field label="Display Order" type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} placeholder="0" />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-2">Description</label>
                <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the dish..."
                  className="w-full bg-white/[0.04] border border-white/8 focus:border-[#F5C518]/50 text-white placeholder-white/15 px-4 py-3 rounded-xl outline-none transition-all resize-none text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Single Price (MAD)" required type="number" value={form.singlePrice} onChange={e => setForm({ ...form, singlePrice: e.target.value })} placeholder="60" />
                <Field label="Family Price (MAD)" type="number" value={form.familyPrice} onChange={e => setForm({ ...form, familyPrice: e.target.value })} placeholder="Optional" />
                <Field label="Single Label" value={form.singleLabel} onChange={e => setForm({ ...form, singleLabel: e.target.value })} />
                <Field label="Family Label" value={form.familyLabel} onChange={e => setForm({ ...form, familyLabel: e.target.value })} />
              </div>

              <div className="flex gap-8 py-4 border-t border-white/[0.05]">
                <Toggle checked={form.available} onChange={() => setForm({ ...form, available: !form.available })} activeColor="#34D399" label={form.available ? 'Visible on menu' : 'Hidden from menu'} />
                <Toggle checked={form.featured} onChange={() => setForm({ ...form, featured: !form.featured })} activeColor="#F5C518" label={form.featured ? 'Featured dish' : 'Standard dish'} />
              </div>
            </div>

            <div className="flex gap-3 px-6 py-5 border-t border-white/[0.06] shrink-0 bg-[#0E0E11]">
              <button onClick={() => setShowForm(false)}
                className="flex-1 border border-white/[0.08] text-white/40 hover:text-white/70 font-medium py-3 rounded-xl transition-all text-sm">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className={`flex-[2] bg-[#F5C518] hover:bg-[#FFD84D] text-[#0C0C0E] font-bold py-3 rounded-xl text-sm transition-all ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-px'}`}>
                {saving ? 'Saving...' : editItem ? 'Save Changes' : 'Add to Menu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}