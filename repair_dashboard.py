from pathlib import Path

root = Path(r'C:\Users\Bongani\Documents\umqasho')

main_content = """import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  Home,
  LayoutGrid,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Star,
  TrendingUp,
  UserRound,
  Users,
} from 'lucide-react'
import './styles.css'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'properties', label: 'My Properties', icon: Building2 },
  { id: 'rooms', label: 'Rooms', icon: Home },
  { id: 'messages', label: 'Messages', icon: MessageSquareText },
  { id: 'viewings', label: 'Viewings', icon: CalendarDays },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
  { id: 'referrals', label: 'Referrals', icon: Users },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const metricCards = [
  { title: 'Active Listings', value: '12', subtitle: '+2 this month', icon: Building2, accent: 'green' },
  { title: 'Total Rooms', value: '28', subtitle: 'Across 8 properties', icon: Home, accent: 'amber' },
  { title: 'Available Rooms', value: '16', subtitle: '4 new enquiries', icon: ShieldCheck, accent: 'sage' },
  { title: 'Viewing Requests', value: '5', subtitle: '2 pending response', icon: CalendarDays, accent: 'coral' },
]

const propertyCards = [
  {
    id: 1,
    name: 'Oakview Homes',
    location: 'Tembisa, Gauteng',
    rooms: 8,
    available: 5,
    price: 'R3,200 - R4,500 / month',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    status: 'ACTIVE',
    badge: 'Verified Property',
  },
  {
    id: 2,
    name: 'Mokoena Court',
    location: 'Katlehong, Gauteng',
    rooms: 6,
    available: 3,
    price: 'R2,800 - R3,900 / month',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    status: 'DRAFT',
    badge: 'Draft listing',
  },
  {
    id: 3,
    name: 'Soweto Family Flats',
    location: 'Orlando East, Soweto',
    rooms: 10,
    available: 8,
    price: 'R3,400 - R5,100 / month',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    status: 'ACTIVE',
    badge: 'Popular this week',
  },
]

const roomCards = [
  { id: 1, name: 'Private Room', location: 'Tembisa', rent: 'R3,500 / month', availability: 'AVAILABLE NOW', type: 'Private room', bath: 'Shared', wifi: 'Included', furnished: 'Furnished', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Bachelor Flat', location: 'Katlehong', rent: 'R4,200 / month', availability: 'AVAILABLE FROM', type: 'Bachelor', bath: 'Private', wifi: 'Included', furnished: 'Semi-furnished', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Back Room', location: 'Alexandra', rent: 'R2,950 / month', availability: 'UNAVAILABLE', type: 'Backroom', bath: 'Shared', wifi: 'Wi-Fi available', furnished: 'Unfurnished', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80' },
]

const messageRows = [
  { name: 'Lerato N.', message: 'Thanks for showing the room. I would like to view again this weekend.', time: '5m ago', unread: 2, online: true },
  { name: 'Sizwe M.', message: 'I have a few questions about the deposit and move-in date.', time: '1h ago', unread: 1, online: false },
  { name: 'Aisha K.', message: 'I can send my budget and preferred move-in window today.', time: 'Yesterday', unread: 0, online: true },
]

const viewingRows = [
  { tenant: 'Nandi', property: 'Oakview Homes', room: 'Private Room A', date: 'Tue, 1 Oct', time: '10:30', status: 'PENDING' },
  { tenant: 'Thabo', property: 'Mokoena Court', room: 'Bachelor Flat 2', date: 'Thu, 3 Oct', time: '14:00', status: 'ACCEPTED' },
  { tenant: 'Aisha', property: 'Soweto Family Flats', room: 'Room 4', date: 'Fri, 4 Oct', time: '09:15', status: 'RESCHEDULED' },
]

const referralHistory = [
  { name: 'Lwandle M.', status: 'Qualified', amount: 'R350', date: '28 Aug' },
  { name: 'Nokuthula S.', status: 'Pending', amount: 'R0', date: '20 Aug' },
  { name: 'Sipho P.', status: 'Paid', amount: 'R600', date: '03 Aug' },
]

const performance = [54, 60, 58, 76, 72, 88, 81, 95, 90, 100, 92, 98]

function StatusBadge({ value }) {
  const tone = {
    ACTIVE: 'success',
    DRAFT: 'neutral',
    PENDING: 'warning',
    ACCEPTED: 'success',
    RESCHEDULED: 'warning',
    PAID: 'success',
    QUALIFIED: 'success',
    PENDING_COMMISSION: 'neutral',
    UNAVAILABLE: 'muted',
    'AVAILABLE NOW': 'success',
    'AVAILABLE FROM': 'warning',
    'VERIFIED PROPERTY': 'success',
  }[value] || 'neutral'

  return <span className={`status-badge ${tone}`}>{value}</span>
}

function MetricCard({ title, value, subtitle, icon: Icon, accent }) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${accent}`}>
        <Icon size={18} />
      </div>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  )
}

function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <img src={property.image} alt={property.name} />
      <div className="property-card-body">
        <div className="property-card-top">
          <div>
            <h3>{property.name}</h3>
            <div className="meta-row"><MapPin size={14} /> {property.location}</div>
          </div>
          <StatusBadge value={property.status} />
        </div>
        <div className="property-stats">
          <span>{property.rooms} Rooms</span>
          <span>{property.available} Available</span>
        </div>
        <div className="property-price">{property.price}</div>
        <div className="property-footer">
          <span className="mini-badge"><ShieldCheck size={12} /> {property.badge}</span>
          <button className="text-button inline" type="button">Manage Property <ArrowRight size={14} /></button>
        </div>
      </div>
    </article>
  )
}

function RoomCard({ room }) {
  return (
    <article className="room-card">
      <img src={room.image} alt={room.name} />
      <div className="room-card-body">
        <div className="room-header-row">
          <div>
            <h3>{room.name}</h3>
            <div className="meta-row"><MapPin size={14} /> {room.location}</div>
          </div>
          <button className="icon-button subtle" type="button"><MoreHorizontal size={16} /></button>
        </div>
        <div className="room-price">{room.rent}</div>
        <div className="detail-row">
          <StatusBadge value={room.availability} />
          <span className="tiny-tag">{room.type}</span>
        </div>
        <div className="room-specs">
          <span>{room.bath}</span>
          <span>{room.wifi}</span>
          <span>{room.furnished}</span>
        </div>
        <div className="room-actions">
          <button className="ghost-button small" type="button">Edit</button>
          <button className="primary-button small" type="button">Manage</button>
        </div>
      </div>
    </article>
  )
}

function DashboardHome() {
  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">UMQASHO landlord</p>
          <h1>Good morning, Thabo</h1>
          <p className="subtle-copy">Here is what is happening with your properties.</p>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button">View Listings</button>
          <button className="primary-button" type="button"><Plus size={16} /> Add Property</button>
        </div>
      </div>

      <div className="verification-card">
        <div className="verification-icon"><BadgeCheck size={22} /></div>
        <div>
          <h3>Verified Landlord</h3>
          <p>Your identity and address have been verified by UMQASHO.</p>
        </div>
        <div className="verification-badges">
          <span><Check size={14} /> Identity</span>
          <span><Check size={14} /> Address</span>
        </div>
      </div>

      <div className="stats-grid">
        {metricCards.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <section className="panel chart-panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Listing performance</p>
            <h2>Listing views</h2>
          </div>
          <div className="chip-row">
            {['7 days', '30 days', '90 days', '12 months'].map((label) => (
              <button key={label} className={`filter-chip ${label === '30 days' ? 'active' : ''}`} type="button">
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="bar-chart" aria-label="Listing performance chart">
          {performance.map((bar, index) => (
            <div key={bar + index} className="chart-bar-wrap">
              <span className="chart-bar" style={{ height: `${bar}%` }} />
            </div>
          ))}
        </div>
        <div className="chart-meta">
          <span><TrendingUp size={14} /> Views</span>
          <span><MessageSquareText size={14} /> Enquiries</span>
          <span><CalendarDays size={14} /> Viewings</span>
          <span><Star size={14} /> Saves</span>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2>My Properties</h2>
          </div>
          <button className="primary-button" type="button"><Plus size={16} /> Add Property</button>
        </div>
        <div className="property-grid">
          {propertyCards.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <div className="lower-grid">
        <section className="panel">
          <div className="section-header compact">
            <div>
              <p className="eyebrow">Upcoming</p>
              <h2>Viewing requests</h2>
            </div>
            <button className="text-button inline" type="button">Manage all</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Property</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {viewingRows.map((row) => (
                  <tr key={`${row.tenant}-${row.date}`}>
                    <td>{row.tenant}</td>
                    <td>{row.property}</td>
                    <td>{row.date}</td>
                    <td>{row.time}</td>
                    <td><StatusBadge value={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="section-header compact">
            <div>
              <p className="eyebrow">Inbox</p>
              <h2>Recent messages</h2>
            </div>
            <button className="text-button inline" type="button">See all</button>
          </div>
          <div className="message-list">
            {messageRows.map((row) => (
              <div className="message-row" key={row.name}>
                <div className="avatar-row">
                  <div className="avatar small">{row.name.charAt(0)}</div>
                  {row.online && <span className="online-dot" />}
                </div>
                <div className="message-body">
                  <div className="message-topline">
                    <strong>{row.name}</strong>
                    <time>{row.time}</time>
                  </div>
                  <p>{row.message}</p>
                </div>
                {row.unread > 0 && <span className="unread-pill">{row.unread}</span>}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="lower-grid two-ups">
        <section className="panel compact-panel">
          <div className="section-header compact">
            <div>
              <p className="eyebrow">Subscription</p>
              <h2>Free trial</h2>
            </div>
            <button className="text-button inline" type="button">Manage</button>
          </div>
          <div className="feature-card">
            <div className="feature-top">
              <span className="mini-badge green"><CreditCard size={12} /> 3 month free trial</span>
              <strong>74 days remaining</strong>
            </div>
            <ul>
              <li>20 listings included</li>
              <li>Unlimited enquiries</li>
              <li>Property management</li>
            </ul>
          </div>
        </section>

        <section className="panel compact-panel">
          <div className="section-header compact">
            <div>
              <p className="eyebrow">Referral</p>
              <h2>Performance</h2>
            </div>
            <button className="text-button inline" type="button">Share link</button>
          </div>
          <div className="referral-summary">
            <div>
              <span className="label">Referrals</span>
              <strong>12</strong>
            </div>
            <div>
              <span className="label">Qualified</span>
              <strong>7</strong>
            </div>
            <div>
              <span className="label">Earnings</span>
              <strong>R1,250</strong>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function PropertiesPage() {
  return (
    <div className="full-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>My Properties</h1>
        </div>
        <button className="primary-button" type="button"><Plus size={16} /> Add Property</button>
      </div>
      <div className="property-grid large-grid">
        {propertyCards.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

function RoomsPage() {
  return (
    <div className="full-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Property mix</p>
          <h1>Rooms</h1>
        </div>
        <button className="primary-button" type="button"><Plus size={16} /> Add Room</button>
      </div>
      <div className="room-grid">
        {roomCards.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  )
}

function MessagesPage() {
  return (
    <div className="full-page chat-layout">
      <aside className="chat-list panel">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Inbox</p>
            <h2>Conversations</h2>
          </div>
        </div>
        {messageRows.map((row) => (
          <button key={row.name} className="conversation-item" type="button">
            <div className="avatar-row">
              <div className="avatar small">{row.name.charAt(0)}</div>
              {row.online && <span className="online-dot" />}
            </div>
            <div className="conversation-details">
              <div><strong>{row.name}</strong><time>{row.time}</time></div>
              <p>{row.message}</p>
            </div>
            {row.unread > 0 && <span className="unread-pill">{row.unread}</span>}
          </button>
        ))}
      </aside>

      <section className="chat-panel panel">
        <div className="chat-header">
          <div className="avatar-row">
            <div className="avatar">L</div>
            <div>
              <strong>Lerato N.</strong>
              <small>Responded 5 minutes ago</small>
            </div>
          </div>
        </div>
        <div className="chat-thread">
          <div className="bubble incoming">Hi Thabo, I loved the room and would like to schedule a viewing for Saturday.</div>
          <div className="bubble outgoing">Perfect. I can confirm Saturday at 11:00. Please share your preferred move in date.</div>
          <div className="bubble incoming">Great, I am hoping to move in by 1 October.</div>
        </div>
        <div className="composer">
          <input type="text" placeholder="Write a message..." />
          <button className="primary-button" type="button">Send</button>
        </div>
      </section>
    </div>
  )
}

function ViewingsPage() {
  return (
    <div className="full-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Bookings</p>
          <h1>Viewing requests</h1>
        </div>
      </div>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Property</th>
                <th>Room</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewingRows.map((row) => (
                <tr key={row.tenant + row.date}>
                  <td>{row.tenant}</td>
                  <td>{row.property}</td>
                  <td>{row.room}</td>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td><StatusBadge value={row.status} /></td>
                  <td><button className="ghost-button small" type="button">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SubscriptionPage() {
  return (
    <div className="full-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Plan</p>
          <h1>Subscription</h1>
        </div>
      </div>
      <div className="subscription-card panel">
        <div className="subscription-header">
          <div>
            <p className="eyebrow alt">UMQASHO landlord plan</p>
            <h2>Free trial</h2>
          </div>
          <span className="mini-badge green"><CreditCard size={12} /> 3 months free</span>
        </div>
        <div className="subscription-main">
          <div>
            <strong>74 days remaining</strong>
            <p>Plan active and ready for your next listing.</p>
          </div>
          <button className="primary-button" type="button">Manage Subscription</button>
        </div>
        <div className="feature-list">
          <div><Check size={16} /> 20 Listings</div>
          <div><Check size={16} /> Unlimited enquiries</div>
          <div><Check size={16} /> Property management</div>
          <div><Check size={16} /> Priority support</div>
        </div>
      </div>
    </div>
  )
}

function ReferralsPage() {
  return (
    <div className="full-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Grow your network</p>
          <h1>Referrals</h1>
        </div>
      </div>
      <div className="panel referral-panel">
        <div className="referral-header">
          <div>
            <p className="label muted">Your referral code</p>
            <h2>UQASHO-ABC123</h2>
          </div>
          <button className="primary-button" type="button">Copy Referral Link</button>
        </div>
        <div className="referral-summary bordered">
          <div>
            <span className="label">Referrals</span>
            <strong>12</strong>
          </div>
          <div>
            <span className="label">Qualified</span>
            <strong>7</strong>
          </div>
          <div>
            <span className="label">Available</span>
            <strong>R1,250</strong>
          </div>
          <div>
            <span className="label">Total earned</span>
            <strong>R3,500</strong>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {referralHistory.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td><StatusBadge value={row.status === 'Pending' ? 'PENDING_COMMISSION' : row.status} /></td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="full-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Profile</h1>
        </div>
      </div>
      <div className="profile-wrap">
        <section className="panel profile-panel">
          <div className="profile-header">
            <div className="avatar large">T</div>
            <div>
              <h2>Thabo Mokoena</h2>
              <p>Property owner helping people find affordable accommodation.</p>
              <div className="verification-badges compact-badges">
                <span><ShieldCheck size={14} /> Identity Verified</span>
                <span><ShieldCheck size={14} /> Address Verified</span>
              </div>
            </div>
          </div>
          <div className="profile-meta-grid">
            <div><span className="label">Location</span><strong>Tembisa, Gauteng</strong></div>
            <div><span className="label">Business</span><strong>Oakview Homes</strong></div>
            <div><span className="label">Email</span><strong>thabo@uqasho.co.za</strong></div>
            <div><span className="label">Phone</span><strong>+27 71 234 5678</strong></div>
          </div>
        </section>

        <section className="panel completion-panel">
          <p className="eyebrow">Profile completion</p>
          <h2>Profile 85% complete</h2>
          <div className="progress-bar"><span style={{ width: '85%' }} /></div>
          <ul className="check-list">
            <li><Check size={14} /> Add profile bio</li>
            <li><Check size={14} /> Add property</li>
            <li><Check size={14} /> Complete verification</li>
            <li><Check size={14} /> Add profile photo</li>
          </ul>
          <button className="primary-button full-btn" type="button">Complete Profile</button>
        </section>
      </div>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="full-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Settings</h1>
        </div>
      </div>
      <div className="settings-grid">
        <div className="panel settings-card">
          <h3>Notifications</h3>
          <ul className="settings-list">
            <li><span>New bookings</span><button className="toggle on" type="button">On</button></li>
            <li><span>Messages</span><button className="toggle on" type="button">On</button></li>
            <li><span>Trial reminder</span><button className="toggle off" type="button">Off</button></li>
          </ul>
        </div>
        <div className="panel settings-card">
          <h3>Security</h3>
          <ul className="settings-list">
            <li><span>Two-factor</span><button className="toggle off" type="button">Off</button></li>
            <li><span>Session timeout</span><button className="toggle on" type="button">On</button></li>
            <li><span>Device alerts</span><button className="toggle on" type="button">On</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const page = useMemo(() => {
    switch (activeView) {
      case 'properties':
        return <PropertiesPage />
      case 'rooms':
        return <RoomsPage />
      case 'messages':
        return <MessagesPage />
      case 'viewings':
        return <ViewingsPage />
      case 'subscription':
        return <SubscriptionPage />
      case 'referrals':
        return <ReferralsPage />
      case 'profile':
        return <ProfilePage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardHome />
    }
  }, [activeView])

  return (
    <div className="umqasho-shell">
      <aside className={`sidebar ${sidebarOpen ? 'is-open' : 'is-collapsed'}`}>
        <div className="sidebar-header">
          <div className="brand-lockup">
            <div className="brand-mark"><Home size={18} /></div>
            {sidebarOpen && <span>UMQASHO</span>}
          </div>
          <button className="collapse-button" aria-label="Toggle sidebar" type="button" onClick={() => setSidebarOpen((open) => !open)}>
            <Menu size={18} />
          </button>
        </div>

        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeView === id ? 'active' : ''}`}
              onClick={() => setActiveView(id)}
              type="button"
            >
              <Icon size={18} />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item footer-item" type="button">
            <Settings size={18} />
            {sidebarOpen && <span>Help & Support</span>}
          </button>
          <button className="nav-item footer-item danger" type="button">
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <label className="global-search" aria-label="Global search">
            <Search size={16} />
            <input type="text" placeholder="Search properties, rooms, tenants..." />
          </label>

          <div className="topbar-actions">
            <button className="icon-chip" aria-label="Notifications" type="button">
              <Bell size={18} />
              <span className="dot" />
            </button>
            <button className="icon-chip" aria-label="Messages" type="button">
              <Mail size={18} />
              <span className="dot" />
            </button>

            <div className="user-pill">
              <div className="avatar small dark">T</div>
              <div className="user-meta">
                <strong>Thabo</strong>
                <small>Landlord</small>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <main className="page-shell">{page}</main>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
"""

css_content = """:root {
  --umqasho-ink: #1a221d;
  --umqasho-muted: #5d6a63;
  --umqasho-line: #e7e0d8;
  --umqasho-paper: #f5f1eb;
  --umqasho-card: #fffdfb;
  --umqasho-green: #244d3e;
  --umqasho-green-soft: #edf5ed;
  --umqasho-gold: #d7b98b;
  --umqasho-clay: #c86d58;
  --umqasho-sage: #dfecc8;
  --umqasho-sand: #f1e8d7;
  --umqasho-shadow: 0 20px 48px rgba(34, 42, 36, 0.08);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-width: 320px;
  background: #f3efe9;
  color: var(--umqasho-ink);
  font-family: 'Segoe UI', sans-serif;
}
button, input, select, textarea {
  font: inherit;
}
button { cursor: pointer; border: none; background: none; }
img { display: block; max-width: 100%; }
#root { min-height: 100vh; }

.umqasho-shell {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(180deg, #f6f2eb 0%, #f3efe9 100%);
}

.sidebar {
  width: 260px;
  background: rgba(255, 253, 250, 0.9);
  border-right: 1px solid rgba(26, 34, 29, 0.06);
  padding: 22px 16px 18px;
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease;
}

.sidebar.is-collapsed { width: 88px; }
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 18px;
}
.brand-lockup {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: -0.08em;
}
.brand-mark {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: var(--umqasho-green);
  color: white;
}
.side-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  flex: 1;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border-radius: 12px;
  padding: 12px;
  color: var(--umqasho-muted);
  font-weight: 600;
  text-align: left;
}
.nav-item.active {
  background: rgba(36, 77, 62, 0.08);
  color: var(--umqasho-green);
}
.sidebar-footer {
  padding-top: 8px;
  border-top: 1px solid rgba(26, 34, 29, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.content-shell {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 18px 28px 16px;
  border-bottom: 1px solid rgba(26, 34, 29, 0.06);
  background: rgba(255, 253, 250, 0.8);
}
.global-search {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  max-width: 540px;
  background: #f7f1ea;
  border: 1px solid var(--umqasho-line);
  border-radius: 12px;
  min-height: 48px;
  padding: 0 16px;
  color: var(--umqasho-muted);
}
.global-search input {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--umqasho-ink);
  outline: none;
  font-size: 0.97rem;
}
.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.icon-chip {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  border: 1px solid var(--umqasho-line);
  background: var(--umqasho-card);
  color: var(--umqasho-ink);
}
.dot {
  position: absolute;
  top: 9px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--umqasho-clay);
  border: 2px solid white;
}
.user-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px 7px 8px;
  border-radius: 12px;
  border: 1px solid var(--umqasho-line);
  background: var(--umqasho-card);
}
.user-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.user-meta strong { font-size: 0.9rem; }
.user-meta small { color: var(--umqasho-muted); font-size: 0.72rem; }
.page-shell { padding: 28px; }
.full-page { display: flex; flex-direction: column; gap: 24px; }
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}
.page-header h1 {
  margin: 0;
  font-size: clamp(2.1rem, 3vw, 3.2rem);
  letter-spacing: -0.06em;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.73rem;
  font-weight: 700;
  color: var(--umqasho-clay);
}
.eyebrow.alt { color: var(--umqasho-green); }
.subtle-copy { margin: 10px 0 0; color: var(--umqasho-muted); }
.header-actions { display: flex; align-items: center; gap: 10px; }
.primary-button, .ghost-button, .text-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  font-weight: 700;
}
.primary-button {
  background: var(--umqasho-green);
  color: white;
  box-shadow: 0 12px 24px rgba(36, 77, 62, 0.18);
}
.primary-button.small, .ghost-button.small {
  min-height: 34px;
  padding: 0 12px;
  font-size: 0.82rem;
}
.ghost-button {
  background: rgba(255,255,255,0.75);
  border: 1px solid var(--umqasho-line);
  color: var(--umqasho-ink);
}
.text-button {
  background: transparent;
  color: var(--umqasho-green);
  padding: 0;
  min-height: auto;
}
.text-button.inline { font-size: 0.8rem; }
.verification-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  background: linear-gradient(180deg, rgba(36,77,62,0.06), rgba(255,255,255,0.5));
  border: 1px solid rgba(36,77,62,0.08);
  border-radius: 18px;
  padding: 18px 20px;
  margin-top: 18px;
}
.verification-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(36,77,62,0.1);
  color: var(--umqasho-green);
}
.verification-card h3 { margin: 0 0 4px; font-size: 1.1rem; }
.verification-card p { margin: 0; color: var(--umqasho-muted); }
.verification-badges { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.verification-badges span, .mini-badge, .tiny-tag, .status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 7px 10px;
}
.verification-badges span {
  background: rgba(36,77,62,0.08);
  color: var(--umqasho-green);
}
.mini-badge {
  background: rgba(36,77,62,0.08);
  color: var(--umqasho-green);
}
.mini-badge.green {
  background: rgba(64, 136, 84, 0.12);
  color: #2d7758;
}
.tiny-tag {
  background: #f1ece4;
  color: var(--umqasho-muted);
}
.status-badge {
  padding: 6px 10px;
  font-size: 0.68rem;
}
.status-badge.success { background: rgba(39, 129, 90, 0.10); color: #2a7b5c; }
.status-badge.warning { background: rgba(212, 140, 68, 0.12); color: #a76526; }
.status-badge.neutral { background: #f1efe9; color: var(--umqasho-muted); }
.status-badge.muted { background: rgba(122, 123, 115, 0.12); color: #5f625d; }
.stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 22px; }
.metric-card {
  display: grid;
  grid-template-columns: 44px 1fr;
  align-items: center;
  gap: 16px;
  padding: 18px;
  border-radius: 18px;
  background: var(--umqasho-card);
  border: 1px solid rgba(26, 34, 29, 0.06);
  box-shadow: 0 6px 18px rgba(21, 30, 26, 0.02);
}
.metric-card p { margin: 0; color: var(--umqasho-muted); font-size: 0.78rem; }
.metric-card strong { display: block; margin-top: 2px; font-size: clamp(1.6rem, 2vw, 2.2rem); letter-spacing: -0.05em; }
.metric-card small { color: var(--umqasho-muted); }
.metric-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
}
.metric-icon.green { background: rgba(36,77,62,0.10); color: var(--umqasho-green); }
.metric-icon.amber { background: rgba(215,185,139,0.18); color: #a57a2f; }
.metric-icon.sage { background: rgba(118,157,75,0.18); color: #4f6a32; }
.metric-icon.coral { background: rgba(200,109,88,0.10); color: #a45442; }
.panel {
  background: rgba(255,255,255,0.72);
  border: 1px solid rgba(26,34,29,0.06);
  border-radius: 22px;
  box-shadow: var(--umqasho-shadow);
  padding: 22px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 14px;
}
.section-header.compact { margin-bottom: 18px; }
.section-header h2 { margin: 0; font-size: 1.6rem; letter-spacing: -0.05em; }
.chip-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.filter-chip {
  border-radius: 999px;
  padding: 8px 12px;
  background: rgba(36,77,62,0.04);
  color: var(--umqasho-muted);
  font-size: 0.74rem;
  font-weight: 600;
}
.filter-chip.active { background: rgba(36,77,62,0.1); color: var(--umqasho-green); }
.bar-chart {
  height: 220px;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: end;
  gap: 10px;
  padding-top: 16px;
}
.chart-bar-wrap { display: flex; align-items: flex-end; height: 100%; }
.chart-bar {
  width: 100%;
  border-radius: 10px 10px 0 0;
  background: linear-gradient(180deg, rgba(153, 188, 120, 0.92), rgba(36,77,62,0.94));
}
.chart-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 16px;
  color: var(--umqasho-muted);
  font-size: 0.8rem;
}
.chart-meta span { display: inline-flex; align-items: center; gap: 6px; }
.property-grid, .room-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.large-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.property-card, .room-card {
  background: var(--umqasho-card);
  border: 1px solid rgba(26,34,29,0.06);
  border-radius: 18px;
  overflow: hidden;
}
.property-card img, .room-card img { width: 100%; height: 210px; object-fit: cover; }
.property-card-body, .room-card-body { padding: 16px; }
.property-card-top, .room-header-row { display: flex; justify-content: space-between; gap: 12px; }
.property-card-top h3, .room-header-row h3 { margin: 0 0 6px; font-size: 1.25rem; letter-spacing: -0.04em; }
.meta-row { display: inline-flex; align-items: center; gap: 6px; color: var(--umqasho-muted); font-size: 0.78rem; }
.property-stats {
  display: flex; gap: 12px; flex-wrap: wrap; margin-top: 14px; color: var(--umqasho-muted); font-size: 0.8rem;
}
.property-price, .room-price { margin-top: 16px; font-size: 1.15rem; font-weight: 800; letter-spacing: -0.04em; }
.property-footer, .room-actions { margin-top: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.detail-row { margin-top: 14px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.room-specs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.room-specs span { background: rgba(36,77,62,0.05); border-radius: 999px; padding: 7px 9px; color: var(--umqasho-muted); font-size: 0.74rem; }
.lower-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; margin-top: 20px; }
.two-ups { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 620px; }
thead th { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--umqasho-muted); text-align: left; padding: 0 12px 12px; }
tbody td { padding: 14px 12px; border-top: 1px solid rgba(26,34,29,0.06); font-size: 0.88rem; }
.message-list { display: flex; flex-direction: column; gap: 12px; }
.message-row, .conversation-item {
  display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px; border-radius: 14px; background: rgba(246,242,235,0.9); border: 1px solid rgba(26,34,29,0.04); text-align: left;
}
.avatar-row { position: relative; flex-shrink: 0; }
.avatar {
  width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: rgba(36,77,62,0.12); color: var(--umqasho-green); font-weight: 700;
}
.avatar.small { width: 30px; height: 30px; font-size: 0.8rem; }
.avatar.large { width: 76px; height: 76px; font-size: 1.7rem; }
.avatar.dark { background: var(--umqasho-green); color: white; }
.online-dot {
  position: absolute; right: 0; bottom: 0; width: 9px; height: 9px; border-radius: 50%; background: #4da56d; border: 2px solid white;
}
.message-body { flex: 1; min-width: 0; }
.message-topline { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 4px; }
.message-body p, .conversation-details p { margin: 0; color: var(--umqasho-muted); font-size: 0.8rem; }
.message-topline time, .conversation-details time { color: var(--umqasho-muted); font-size: 0.72rem; }
.unread-pill {
  min-width: 22px; height: 22px; border-radius: 999px; display: grid; place-items: center; background: var(--umqasho-clay); color: white; font-size: 0.74rem; font-weight: 700; padding: 0 7px;
}
.feature-card { border-radius: 16px; background: rgba(36,77,62,0.04); padding: 18px; }
.feature-top { display: flex; justify-content: space-between; gap: 10px; align-items: center; margin-bottom: 12px; }
.feature-card ul { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 10px; color: var(--umqasho-muted); }
.feature-card li { display: flex; align-items: center; gap: 8px; }
.referral-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-bottom: 16px; }
.referral-summary.bordered {
  background: rgba(36,77,62,0.04); border: 1px solid rgba(26,34,29,0.04); border-radius: 16px; padding: 14px;
}
.referral-summary > div { display: flex; flex-direction: column; gap: 6px; }
.label { display: block; color: var(--umqasho-muted); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
.referral-summary strong { font-size: 1.45rem; letter-spacing: -0.04em; }
.chat-layout { display: grid; grid-template-columns: 320px 1fr; gap: 20px; }
.chat-list { padding: 14px; }
.conversation-item { margin-bottom: 10px; background: #f7f1ea; }
.conversation-details { flex: 1; min-width: 0; }
.conversation-details div { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 4px; }
.chat-panel { display: flex; flex-direction: column; min-height: 560px; }
.chat-header {
  display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(26,34,29,0.06); padding-bottom: 12px;
}
.chat-header div { display: flex; align-items: center; gap: 12px; }
.chat-header small { color: var(--umqasho-muted); }
.chat-thread { display: flex; flex: 1; flex-direction: column; gap: 14px; padding: 18px 0; }
.bubble { max-width: 75%; padding: 12px 14px; border-radius: 16px; line-height: 1.5; font-size: 0.94rem; }
.bubble.incoming { background: #f4f0ea; border: 1px solid rgba(26,34,29,0.04); color: var(--umqasho-ink); }
.bubble.outgoing { background: var(--umqasho-green); color: white; margin-left: auto; }
.composer { display: flex; gap: 12px; border-top: 1px solid rgba(26,34,29,0.06); padding-top: 16px; }
.composer input {
  flex: 1; min-height: 46px; border-radius: 12px; border: 1px solid var(--umqasho-line); background: #faf7f3; padding: 0 14px; outline: none;
}
.subscription-card { padding: 30px 26px; }
.subscription-header, .subscription-main { display: flex; justify-content: space-between; align-items: center; gap: 18px; }
.subscription-main { margin-top: 18px; padding: 20px 0; border-top: 1px solid rgba(26,34,29,0.06); border-bottom: 1px solid rgba(26,34,29,0.06); }
.subscription-main strong { display: block; font-size: 1.8rem; letter-spacing: -0.06em; }
.subscription-main p { margin: 6px 0 0; color: var(--umqasho-muted); }
.feature-list {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 20px; margin-top: 18px; color: var(--umqasho-muted);
}
.feature-list div { display: flex; align-items: center; gap: 8px; }
.referral-panel { padding: 24px; }
.referral-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 22px; }
.referral-header h2 { margin: 6px 0 0; font-size: clamp(1.7rem, 2vw, 2.4rem); letter-spacing: -0.06em; }
.profile-wrap { display: grid; grid-template-columns: 1.5fr .8fr; gap: 18px; }
.profile-panel { padding: 26px; }
.profile-header { display: flex; gap: 18px; align-items: center; }
.profile-header h2 { margin: 0 0 6px; font-size: 1.9rem; letter-spacing: -0.05em; }
.profile-header p { margin: 0 0 12px; color: var(--umqasho-muted); }
.compact-badges { margin-top: 6px; }
.profile-meta-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 26px; }
.profile-meta-grid > div {
  padding: 16px; border-radius: 14px; background: rgba(36,77,62,0.04); border: 1px solid rgba(26,34,29,0.04);
}
.profile-meta-grid strong { display: block; margin-top: 8px; }
.completion-panel { padding: 26px; }
.completion-panel h2 { margin: 0 0 14px; font-size: 1.7rem; letter-spacing: -0.05em; }
.progress-bar {
  width: 100%; height: 12px; border-radius: 999px; background: rgba(26,34,29,0.08); overflow: hidden; margin-bottom: 18px;
}
.progress-bar span { display: block; height: 100%; background: linear-gradient(90deg, #234c3c, #7aa55c); border-radius: inherit; }
.check-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; color: var(--umqasho-muted); }
.check-list li { display: flex; align-items: center; gap: 8px; }
.full-btn { width: 100%; margin-top: 18px; }
.settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.settings-card h3 { margin: 0 0 16px; }
.settings-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.settings-list li { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 0; border-top: 1px solid rgba(26,34,29,0.06); }
.toggle { min-width: 56px; min-height: 30px; border-radius: 999px; padding: 0 12px; font-weight: 700; }
.toggle.on { background: rgba(36,77,62,0.10); color: var(--umqasho-green); }
.toggle.off { background: rgba(26,34,29,0.06); color: var(--umqasho-muted); }
.icon-button.subtle { width: 30px; height: 30px; border-radius: 10px; background: rgba(36,77,62,0.04); color: var(--umqasho-muted); }

@media (max-width: 1180px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .property-grid, .room-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 960px) {
  .umqasho-shell { flex-direction: column; }
  .sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(26, 34, 29, 0.06); padding-bottom: 12px; }
  .sidebar.is-collapsed { width: 100%; }
  .side-nav { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .page-shell { padding: 20px; }
  .lower-grid, .profile-wrap, .chat-layout, .settings-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .page-header, .section-header, .verification-card, .subscription-header, .subscription-main, .referral-header, .profile-header {
    flex-direction: column; align-items: flex-start;
  }
  .topbar { padding: 14px 18px; flex-wrap: wrap; }
  .global-search { max-width: none; width: 100%; }
  .header-actions, .topbar-actions { width: 100%; justify-content: space-between; }
  .stats-grid, .property-grid, .room-grid, .large-grid, .referral-summary, .feature-list, .profile-meta-grid { grid-template-columns: 1fr; }
  .page-shell { padding: 16px; }
  .panel { padding: 16px; }
  .user-pill { padding-right: 12px; }
}
"""

(root / 'src' / 'main.jsx').write_text(main_content, encoding='utf-8')
(root / 'src' / 'styles.css').write_text(css_content, encoding='utf-8')
print('written')
