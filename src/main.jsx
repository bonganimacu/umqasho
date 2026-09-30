import { StrictMode, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Building2,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  CreditCard,
  FileText,
  Grid2x2,
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
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react'
import './styles.css'

const landlordSteps = ['Account', 'Verification', 'Property', 'Rooms', 'Photos', 'Review']
const tenantNavItems = [
  { id: 'discover', label: 'Discover', icon: Grid2x2 },
  { id: 'saved', label: 'Saved', icon: Star },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'messages', label: 'Messages', icon: MessageSquareText },
  { id: 'account', label: 'Profile & privacy', icon: UserRound },
]

const tenantMetrics = [
  { title: 'Saved Rooms', value: '06', subtitle: '3 matches this week', icon: Star, accent: 'amber' },
  { title: 'Applications', value: '02', subtitle: '1 response pending', icon: FileText, accent: 'green' },
  { title: 'Budget', value: 'R4,500', subtitle: 'Monthly target', icon: Wallet, accent: 'sage' },
  { title: 'Visits', value: '03', subtitle: '2 confirmed this week', icon: CalendarDays, accent: 'coral' },
]

const propertyMatches = [
  { name: 'The Willows', location: 'Bonaero Park', rent: 'R3,800', tag: 'Verified' },
  { name: 'Blueberry House', location: 'Benoni East', rent: 'R3,200', tag: 'New' },
  { name: 'Cedar Court', location: 'Akasia', rent: 'R4,100', tag: 'Top match' },
]

const landlordPropertyCards = [
  { id: 1, name: 'Oakview Homes', location: 'Tembisa, Gauteng', rooms: 8, status: 'DRAFT', price: 'R3,200 - R4,500 / month' },
  { id: 2, name: 'Mokoena Court', location: 'Katlehong, Gauteng', rooms: 6, status: 'VERIFIED', price: 'R2,800 - R3,900 / month' },
]

const roomCards = [
  { id: 1, title: 'Room 1', rent: 'R3,500', status: 'Available', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80' },
  { id: 2, title: 'Room 2', rent: 'R3,800', status: 'Available', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80' },
  { id: 3, title: 'Room 3', rent: 'R3,500', status: 'Rented', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80' },
  { id: 4, title: 'Room 4', rent: 'R3,600', status: 'Available', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80' },
  { id: 5, title: 'Room 5', rent: 'R3,700', status: 'Available', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80' },
  { id: 6, title: 'Room 6', rent: 'R3,900', status: 'Available', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80' },
]

const publicListings = [
  { id: 'tembisa-room-1', property: "Thabo's Tembisa Home", room: 'Private Room 1', area: 'Tembisa', city: 'Ekurhuleni', rent: 3500, deposit: 3500, availability: 'Available now', type: 'Private Room', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', photos: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'], landlord: 'Thabo Mokoena', profile: 'Verified property owner in Tembisa. Focused on secure, well-maintained accommodation.' },
  { id: 'benoni-studio-1', property: 'Blueberry House', room: 'Garden Bachelor Flat', area: 'Benoni East', city: 'Ekurhuleni', rent: 4200, deposit: 4200, availability: 'Available from 15 October', type: 'Bachelor Flat', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80', photos: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'], landlord: 'Aisha Khan', profile: 'Independent rental agent serving Benoni and surrounding Ekurhuleni suburbs.' },
  { id: 'alexandra-room-1', property: 'Maseko Family Home', room: 'Furnished Back Room', area: 'Alexandra', city: 'Johannesburg', rent: 2950, deposit: 2950, availability: 'Available now', type: 'Back Room', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'], landlord: 'Lerato Ndlovu', profile: 'Local homeowner offering affordable accommodation close to transport and shops.' },
]

const propertyAmenities = ['Wi-Fi', 'Parking', 'Security', 'Water', 'Electricity', 'Prepaid Electricity', 'Shared Kitchen', 'Private Kitchen', 'Garden', 'Laundry', 'CCTV', 'Access Control', 'Backup Water', 'Backup Power']

const stepMap = {
  0: 'account',
  1: 'verification',
  2: 'property',
  3: 'rooms',
  4: 'publish',
}

function ProgressSteps({ currentStep }) {
  return (
    <div className="progress-steps" aria-label="Onboarding progress">
      {landlordSteps.map((step, index) => (
        <div key={step} className={`step-indicator ${index <= currentStep ? 'active' : ''}`}>
          <span>{index + 1}</span>
          <small>{step}</small>
        </div>
      ))}
    </div>
  )
}

function StrengthMeter({ value }) {
  const labels = ['Weak', 'Medium', 'Strong']
  return (
    <div className="strength-wrap">
      <div className="strength-row">
        {labels.map((label, index) => (
          <span key={label} className={`strength-pill ${index <= value ? 'filled' : ''}`}>{label}</span>
        ))}
      </div>
    </div>
  )
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

function RegisterStep({ onContinue, form, setForm, error, submitting }) {
  const passwordStrength = form.password.length >= 12 ? 2 : form.password.length >= 8 ? 1 : 0

  return (
    <div className="onboarding-card">
      <div className="card-header header-block">
        <div>
          <p className="eyebrow">Create an account</p>
          <h2>Create your UMQASHO account</h2>
        </div>
        <div className="badge-pill premium">
          <BadgeCheck size={14} /> Trusted by landlords
        </div>
      </div>

      <ProgressSteps currentStep={0} />

      <div className="form-layout">
        <section className="form-section">
          <div className="section-title-row">
            <h3>Personal details</h3>
          </div>
          <div className="two-column-grid">
            <label className="field">
              <span>First Name *</span>
              <input required autoComplete="given-name" type="text" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} />
            </label>
            <label className="field">
              <span>Last Name *</span>
              <input required autoComplete="family-name" type="text" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-title-row">
            <h3>Contact details</h3>
          </div>
          <div className="two-column-grid">
            <label className="field">
              <span>Email *</span>
              <input required autoComplete="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </label>
            <label className="field">
              <span>Phone Number *</span>
              <input required autoComplete="tel" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
            </label>
          </div>
          <p className="helper-text">These details are private. They are not shown to tenants.</p>
        </section>

        <section className="form-section">
          <div className="section-title-row">
            <h3>Password</h3>
          </div>
          <div className="two-column-grid">
            <label className="field">
              <span>Password *</span>
              <input required autoComplete="new-password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            </label>
            <label className="field">
              <span>Confirm Password *</span>
              <input required autoComplete="new-password" type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} />
            </label>
          </div>
          <StrengthMeter value={passwordStrength} />
        </section>

        <section className="form-section">
          <p className="helper-text">This creates your account. Identity documents are not uploaded by this form; an administrator must verify your details before approval.</p>
        </section>

        <section className="form-section">
          <label className="checkbox-row">
            <input type="checkbox" checked={form.agreed} onChange={(event) => setForm({ ...form, agreed: event.target.checked })} />
            <span>I agree to the UMQASHO Terms and Privacy Policy.</span>
          </label>
        </section>
      </div>

      <div className="sticky-footer">
        {error && <p className="location-error" role="alert">{error}</p>}
        <button className="primary-button" type="button" disabled={submitting} onClick={onContinue}>{submitting ? 'Creating account...' : 'Create Account'}</button>
      </div>
    </div>
  )
}

function AccountSuccessStep({ onContinue, firstName }) {
  return (
    <div className="success-wrap onboarding-card">
      <div className="success-icon"><CheckCircle2 size={64} /></div>
      <p className="eyebrow">Account created</p>
      <h2>Welcome to UMQASHO, {firstName}.</h2>
      <p className="lead-copy">Your account has been created and is awaiting admin verification.</p>
      <div className="check-list-row">
        <span><Check size={14} /> Account saved</span>
        <span><Check size={14} /> Landlord role assigned</span>
        <span className="pending"><Check size={14} /> Verification pending</span>
      </div>
      <button className="primary-button" type="button" onClick={onContinue}>Continue</button>
    </div>
  )
}

function VerificationStep({ onContinue }) {
  return (
    <div className="onboarding-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Verification</p>
          <h2>Let&apos;s verify your account</h2>
        </div>
        <span className="badge-pill warning">PENDING REVIEW</span>
      </div>

      <ProgressSteps currentStep={1} />

      <div className="info-box">
        <ShieldCheck size={18} />
        <p>Your registration is in the admin queue. Identity documents are not collected in this version, so approval must follow an independent verification.</p>
      </div>

      <div className="sticky-footer">
        <button className="ghost-button" type="button">Save draft</button>
        <button className="primary-button" type="button" onClick={onContinue}>Continue setup</button>
      </div>
    </div>
  )
}

const suggestedPropertyAreas = [
  { area: 'Tembisa', city: 'Ekurhuleni', province: 'Gauteng', latitude: -25.996, longitude: 28.226 },
  { area: 'Benoni', city: 'Ekurhuleni', province: 'Gauteng', latitude: -26.188, longitude: 28.320 },
  { area: 'Alexandra', city: 'Johannesburg', province: 'Gauteng', latitude: -26.103, longitude: 28.100 },
  { area: 'Soweto', city: 'Johannesburg', province: 'Gauteng', latitude: -26.248, longitude: 27.854 },
  { area: 'Katlehong', city: 'Ekurhuleni', province: 'Gauteng', latitude: -26.334, longitude: 28.150 },
]

function PropertyLocationPicker({ form, setForm }) {
  const searchRef = useRef(null)
  const mapElementRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const formRef = useRef(form)
  formRef.current = form
  const [query, setQuery] = useState(form.confirmedAddress || `${form.area}, ${form.city}, ${form.province}`)
  const [location, setLocation] = useState(form.locationConfirmed ? {
    area: form.area,
    city: form.city,
    province: form.province,
    latitude: form.latitude,
    longitude: form.longitude,
    address: form.confirmedAddress,
  } : null)
  const [mapsState, setMapsState] = useState('fallback')
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    if (!apiKey) return undefined
    let active = true
    let autocompleteListener
    let mapListener
    let dragListener
    const initMap = () => {
      if (!active || !window.google?.maps || !searchRef.current || !mapElementRef.current) return
      const maps = window.google.maps
      const defaultCenter = { lat: -25.996, lng: 28.226 }
      const map = new maps.Map(mapElementRef.current, { center: defaultCenter, zoom: 13, mapTypeControl: false, streetViewControl: false, fullscreenControl: false })
      const marker = new maps.Marker({ map, position: defaultCenter, draggable: true })
      const autocomplete = new maps.places.Autocomplete(searchRef.current, { componentRestrictions: { country: 'za' }, fields: ['address_components', 'formatted_address', 'geometry'] })
      mapRef.current = map
      markerRef.current = marker
      autocompleteListener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (!place.geometry?.location) return
        const components = place.address_components || []
        const findComponent = (type) => components.find((component) => component.types.includes(type))?.long_name
        const next = {
          area: findComponent('sublocality') || findComponent('locality') || place.formatted_address,
          city: findComponent('administrative_area_level_2') || findComponent('locality') || form.city,
          province: findComponent('administrative_area_level_1') || form.province,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address,
        }
        setLocation(next)
        setQuery(next.address)
        map.setCenter(place.geometry.location)
        marker.setPosition(place.geometry.location)
      })
      mapListener = map.addListener('click', (event) => {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        marker.setPosition(event.latLng)
        setLocation((current) => {
          const currentForm = formRef.current
          const address = current?.address || currentForm.confirmedAddress || searchRef.current?.value.trim() || 'Selected map location'
          return {
            area: current?.area || currentForm.area || 'Selected map area',
            city: current?.city || currentForm.city,
            province: current?.province || currentForm.province,
            address,
            latitude: lat,
            longitude: lng,
          }
        })
      })
      dragListener = marker.addListener('dragend', (event) => {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        setLocation((current) => {
          const currentForm = formRef.current
          return {
            area: current?.area || currentForm.area || 'Selected map area',
            city: current?.city || currentForm.city,
            province: current?.province || currentForm.province,
            address: current?.address || currentForm.confirmedAddress || `Map location (${lat.toFixed(5)}, ${lng.toFixed(5)})`,
            latitude: lat,
            longitude: lng,
          }
        })
      })
      setMapsState('ready')
    }
    if (window.google?.maps?.places) {
      initMap()
    } else {
      const existingScript = document.querySelector('script[data-umqasho-google-maps]')
      const script = existingScript || document.createElement('script')
      if (!existingScript) {
        script.dataset.umqashoGoogleMaps = 'true'
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&callback=umqashoMapsReady`
        script.async = true
        document.head.appendChild(script)
      }
      window.umqashoMapsReady = initMap
      script.onerror = () => setMapsState('error')
      if (existingScript) script.addEventListener('load', initMap, { once: true })
    }
    return () => {
      active = false
      autocompleteListener?.remove()
      mapListener?.remove()
      dragListener?.remove()
      if (window.umqashoMapsReady === initMap) delete window.umqashoMapsReady
    }
  }, [apiKey])

  const suggestions = suggestedPropertyAreas.filter((item) => `${item.area} ${item.city} ${item.province}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
  const selectArea = (item) => {
    const next = { ...item, address: `${item.area}, ${item.city}, ${item.province}` }
    setLocation(next)
    setQuery(next.address)
    mapRef.current?.setCenter({ lat: next.latitude, lng: next.longitude })
    markerRef.current?.setPosition({ lat: next.latitude, lng: next.longitude })
  }
  const confirmLocation = () => {
    if (!location) return
    setForm((current) => ({ ...current, area: location.area, city: location.city, province: location.province, latitude: location.latitude, longitude: location.longitude, confirmedAddress: location.address, locationConfirmed: true }))
  }

  return (
    <div className="map-card">
      <div className="map-topbar location-search-row">
        <label className="field location-search-field"><span>Search location</span><input ref={searchRef} value={query} onChange={(event) => { setQuery(event.target.value); setLocation(null); setForm((current) => ({ ...current, locationConfirmed: false, confirmedAddress: '', latitude: null, longitude: null })) }} placeholder="Search area, city or address" autoComplete="off" /></label>
        <a className="ghost-button small maps-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location?.address || query)}`} target="_blank" rel="noreferrer">Open Google Maps</a>
      </div>
      {mapsState !== 'ready' && suggestions.length > 0 && <div className="location-suggestions" role="listbox">{suggestions.map((item) => <button type="button" role="option" key={item.area} onClick={() => selectArea(item)}><MapPin size={15} /><span><strong>{item.area}</strong><small>{item.city}, {item.province}</small></span></button>)}</div>}
      {mapsState === 'ready' ? <div className="map-surface google-map-surface" ref={mapElementRef} aria-label="Google map with draggable property marker" /> : <div className="map-surface" aria-label="Property location map"><div className="map-pin"><MapPin size={22} /></div></div>}
      {mapsState === 'error' && <p className="helper-text">Google Maps could not load. Select a suggested area to set the approximate map marker.</p>}
      {!apiKey && <p className="helper-text">Google Maps Places autocomplete activates when VITE_GOOGLE_MAPS_API_KEY is configured. Area suggestions are available now.</p>}
      {location && <div className="location-confirm-row"><div><strong>{location.area}</strong><span>{location.address}</span><small>{location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}</small></div><button className="primary-button small" type="button" onClick={confirmLocation}>{form.locationConfirmed && form.confirmedAddress === location.address ? 'Location saved' : 'Confirm location'}</button></div>}
      <div className="two-column-grid map-meta-grid"><label className="field"><span>Area</span><input readOnly value={location?.area || form.area} /></label><label className="field"><span>City</span><input readOnly value={location?.city || form.city} /></label></div>
      {form.locationConfirmed && <p className="location-saved-note"><CheckCircle2 size={15} /> Confirmed: {form.confirmedAddress}</p>}
    </div>
  )
}

function PropertyStep({ onContinue, form, setForm }) {
  const [locationError, setLocationError] = useState('')
  const savePropertyAndContinue = () => {
    if (!form.locationConfirmed) {
      setLocationError('Confirm the property location before saving.')
      return
    }
    setLocationError('')
    onContinue()
  }
  return (
    <div className="onboarding-card">
      <div className="card-header header-block">
        <div>
          <p className="eyebrow">Property</p>
          <h2>Add your first property</h2>
        </div>
        <p className="subtle-lead">Tell tenants about the property you are renting out.</p>
      </div>

      <ProgressSteps currentStep={2} />

      <div className="form-layout">
        <section className="form-section">
          <div className="section-title-row">
            <h3>Property details</h3>
          </div>
          <div className="two-column-grid">
            <label className="field full-span">
              <span>Property Name *</span>
              <input type="text" value={form.propertyName} onChange={(event) => setForm({ ...form, propertyName: event.target.value })} />
            </label>
            <label className="field">
              <span>Property Type *</span>
              <select value={form.propertyType} onChange={(event) => setForm({ ...form, propertyType: event.target.value })}>
                <option>Rooming House</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Flat</option>
                <option>Cottage</option>
                <option>Backroom</option>
                <option>Student Accommodation</option>
                <option>Other</option>
              </select>
            </label>
            <label className="field">
              <span>Location Visibility</span>
              <select value={form.locationVisibility} onChange={(event) => setForm({ ...form, locationVisibility: event.target.value })}>
                <option>Approximate location</option>
                <option>Exact location</option>
              </select>
            </label>
          </div>
          <label className="field full-span">
            <span>Property Description *</span>
            <textarea rows="6" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </label>
        </section>

        <section className="form-section">
          <div className="section-title-row">
            <h3>Property location</h3>
          </div>
          <PropertyLocationPicker form={form} setForm={setForm} />
          {locationError && <p className="location-error" role="alert">{locationError}</p>}
          <p className="helper-text">Approximate location protects the privacy of residential properties while still helping tenants understand the area.</p>
        </section>

        <section className="form-section">
          <div className="section-title-row">
            <h3>Nearby information</h3>
          </div>
          <div className="tag-list">
            {['Taxi Rank', 'Train Station', 'Bus Station', 'Gautrain', 'Mall', 'School', 'University', 'Hospital', 'Shopping Centre', 'Work / business area', 'Other'].map((item) => (
              <button key={item} type="button" aria-pressed={form.nearbyInformation.includes(item)} className={`tag-pill ${form.nearbyInformation.includes(item) ? 'selected' : ''}`} onClick={() => setForm((current) => ({ ...current, nearbyInformation: current.nearbyInformation.includes(item) ? current.nearbyInformation.filter((entry) => entry !== item) : [...current.nearbyInformation, item] }))}>{item}</button>
            ))}
          </div>
        </section>

        <section className="form-section">
          <div className="section-title-row">
            <h3>Property amenities</h3>
          </div>
          <div className="tag-list large-list">
            {propertyAmenities.map((item) => (
              <button key={item} type="button" className={`tag-pill ${form.amenities.includes(item) ? 'selected' : ''}`} onClick={() => setForm({ ...form, amenities: form.amenities.includes(item) ? form.amenities.filter((entry) => entry !== item) : [...form.amenities, item] })}>
                {item}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="sticky-footer">
        <button className="ghost-button" type="button">Back</button>
        <button className="primary-button" type="button" onClick={savePropertyAndContinue}>Save & Continue</button>
      </div>
    </div>
  )
}

function PropertyPhotosStep({ onContinue, photos, setPhotos }) {
  const addPhotos = (files) => setPhotos(Array.from(files || [], (file) => ({ name: file.name, url: URL.createObjectURL(file) })))
  return (
    <div className="onboarding-card">
      <div className="card-header header-block">
        <div>
          <p className="eyebrow">Photos</p>
          <h2>Show tenants what your property looks like</h2>
        </div>
        <p className="subtle-lead">Your cover photo will be the first image tenants see.</p>
      </div>

      <ProgressSteps currentStep={4} />

      <div className="upload-zone">
        <Camera size={38} />
        <h3>Upload Photos</h3>
        <p>Drag and drop on desktop. Gallery upload on mobile.</p>
        <label className="primary-button photo-upload-button"><Upload size={16} /> Upload Photos<input type="file" accept="image/*" multiple onChange={(event) => addPhotos(event.target.files)} /></label>
      </div>

      <div className="image-grid">
        {(photos.length ? photos : ['Exterior', 'Entrance', 'Garden', 'Common area'].map((name, idx) => ({ name, url: `https://images.unsplash.com/photo-${idx === 0 ? '1568605114967-8130f3a36994' : idx === 1 ? '1494526585095-c41746248156' : idx === 2 ? '1502672260266-1c1ef2d93688' : '1505693416388-ac5ce068fe85'}?auto=format&fit=crop&w=800&q=80` }))).map((photo, idx) => (
          <div className="image-card" key={`${photo.name}-${idx}`}>
            <div className="placeholder-image" style={{ backgroundImage: `url(${photo.url})` }} />
            <div className="image-caption">
              <strong>{photo.name}</strong>
              <button className="text-button inline" type="button" onClick={() => setPhotos((current) => current.map((item, index) => ({ ...item, cover: index === idx })))}>Set cover</button>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky-footer">
        <button className="ghost-button" type="button">Back</button>
        <button className="primary-button" type="button" onClick={onContinue}>Continue</button>
      </div>
    </div>
  )
}

function RoomsStep({ onContinue, setCurrentStep, propertyName, rooms, setRooms }) {
  const blankRoom = {
    name: '', type: 'Private Room', description: '', rent: '', deposit: '',
    bathroom: 'Shared', kitchen: 'Shared', furnished: 'Unfurnished',
    electricity: 'Prepaid', water: 'Included', wifi: 'Not included',
    parking: 'Not included', photos: [], availability: 'Available now',
  }
  const [draft, setDraft] = useState(blankRoom)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const editRoom = (room) => {
    setDraft({ ...room, rent: String(room.rent), deposit: String(room.deposit) })
    setEditingId(room.id)
    setShowForm(true)
  }

  const saveRoom = (event) => {
    event.preventDefault()
    const saved = { ...draft, name: draft.name.trim(), rent: Number(draft.rent), deposit: Number(draft.deposit) }
    setRooms((current) => editingId
      ? current.map((room) => room.id === editingId ? saved : room)
      : [...current, { ...saved, id: Date.now() }])
    setShowForm(false)
    setEditingId(null)
    setDraft(blankRoom)
  }

  return (
    <div className="onboarding-card">
      <div className="card-header header-block">
        <div>
          <p className="eyebrow">Rooms</p>
          <h2>Rooms for {propertyName}</h2>
        </div>
        <button className="primary-button" type="button" onClick={() => { setDraft(blankRoom); setEditingId(null); setShowForm(true) }}><Plus size={16} /> Add Room</button>
      </div>

      <ProgressSteps currentStep={3} />

      <div className="property-room-tree"><Building2 size={18} /><strong>{propertyName}</strong><span>{rooms.length} rooms</span></div>

      {showForm && (
        <form className="room-editor form-section" onSubmit={saveRoom}>
          <div className="section-title-row"><h3>{editingId ? `Edit ${draft.name}` : 'Add room'}</h3><button className="text-button inline" type="button" onClick={() => setShowForm(false)}>Cancel</button></div>
          <div className="two-column-grid">
            <label className="field"><span>Room name *</span><input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. Room 7" /></label>
            <label className="field"><span>Room type *</span><select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })}><option>Private Room</option><option>Shared Room</option><option>Bachelor Flat</option><option>Back Room</option><option>Cottage</option><option>Other</option></select></label>
          </div>
          <label className="field room-description-field"><span>Description</span><textarea rows="3" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label>
          <div className="two-column-grid">
            <label className="field"><span>Monthly rent (R) *</span><input required type="number" min="0" value={draft.rent} onChange={(event) => setDraft({ ...draft, rent: event.target.value })} /></label>
            <label className="field"><span>Deposit (R) *</span><input required type="number" min="0" value={draft.deposit} onChange={(event) => setDraft({ ...draft, deposit: event.target.value })} /></label>
            <label className="field"><span>Bathroom</span><select value={draft.bathroom} onChange={(event) => setDraft({ ...draft, bathroom: event.target.value })}><option>Private</option><option>Shared</option><option>None</option></select></label>
            <label className="field"><span>Kitchen</span><select value={draft.kitchen} onChange={(event) => setDraft({ ...draft, kitchen: event.target.value })}><option>Private</option><option>Shared</option><option>None</option></select></label>
            <label className="field"><span>Furnished</span><select value={draft.furnished} onChange={(event) => setDraft({ ...draft, furnished: event.target.value })}><option>Unfurnished</option><option>Part furnished</option><option>Furnished</option></select></label>
            <label className="field"><span>Electricity</span><select value={draft.electricity} onChange={(event) => setDraft({ ...draft, electricity: event.target.value })}><option>Prepaid</option><option>Included</option><option>Separate meter</option></select></label>
            <label className="field"><span>Water</span><select value={draft.water} onChange={(event) => setDraft({ ...draft, water: event.target.value })}><option>Included</option><option>Shared cost</option><option>Separate meter</option></select></label>
            <label className="field"><span>Wi-Fi</span><select value={draft.wifi} onChange={(event) => setDraft({ ...draft, wifi: event.target.value })}><option>Included</option><option>Available</option><option>Not included</option></select></label>
            <label className="field"><span>Parking</span><select value={draft.parking} onChange={(event) => setDraft({ ...draft, parking: event.target.value })}><option>Included</option><option>Available</option><option>Not included</option></select></label>
            <label className="field"><span>Availability</span><select value={draft.availability} onChange={(event) => setDraft({ ...draft, availability: event.target.value })}><option>Available now</option><option>Available from</option><option>Unavailable</option><option>Rented</option></select></label>
          </div>
          {draft.availability === 'Available from' && <label className="field room-date-field"><span>Available date *</span><input required type="date" value={draft.availableFrom || ''} onChange={(event) => setDraft({ ...draft, availableFrom: event.target.value })} /></label>}
          <label className="field room-photo-field"><span>Room photos</span><input type="file" accept="image/*" multiple onChange={(event) => setDraft({ ...draft, photos: Array.from(event.target.files || [], (file) => file.name) })} /><small>{draft.photos.length ? draft.photos.join(', ') : 'Choose one or more photos'}</small></label>
          <div className="room-editor-actions"><button className="primary-button" type="submit">Save Room</button></div>
        </form>
      )}

      <div className="room-card-list">
        {rooms.map((room) => (
          <div className="room-compact-card" key={room.id}>
            <div className="room-compact-body">
              <div className="room-compact-header">
                <div><strong>{room.name}</strong><p>{room.type} · R{Number(room.rent).toLocaleString()} / month · R{Number(room.deposit).toLocaleString()} deposit</p></div>
                <span className={`status-tag ${room.availability === 'Unavailable' || room.availability === 'Rented' ? 'warning' : 'success'}`}>{room.availability === 'Available from' ? `Available from ${room.availableFrom || 'date not set'}` : room.availability}</span>
              </div>
              <p className="room-summary">Bathroom {room.bathroom.toLowerCase()} · Kitchen {room.kitchen.toLowerCase()} · {room.furnished} · Electricity {room.electricity} · Water {room.water} · Wi-Fi {room.wifi} · Parking {room.parking}</p>
              <div className="room-actions-row"><span className="room-photo-count">{room.photos.length} photos</span><button className="ghost-button small" type="button" onClick={() => editRoom(room)}>Edit room</button></div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky-footer">
        <button className="ghost-button" type="button" onClick={() => setCurrentStep(3)}>Back</button>
        <button className="primary-button" type="button" onClick={onContinue}>Continue to photos</button>
      </div>
    </div>
  )
}

function PublishStep({ onPublish, onReturnDashboard, propertyName, form, rooms }) {
  return (
    <div className="onboarding-card publish-card">
      <p className="eyebrow">Ready to publish</p>
      <h2>Review your property</h2>
      <ProgressSteps currentStep={5} />

      <div className="review-summary">
        <div className="review-image" />
        <div className="review-copy">
          <h3>{propertyName}</h3>
          <p>{form.area}, {form.city}, {form.province}</p>
          <div className="review-badges">
            <span className="badge-pill">{form.propertyType}</span>
            <span className="badge-pill">{rooms.length} rooms</span>
            <span className="badge-pill">Draft</span>
          </div>
        </div>
      </div>

      <div className="checklist-panel">
        <h3>Checklist</h3>
        <ul>
          <li><Check size={14} /> Account</li>
          <li><Check size={14} /> Property</li>
          <li><Check size={14} /> Location</li>
          <li><Check size={14} /> Property photos</li>
          <li><Check size={14} /> Room</li>
          <li><Check size={14} /> Room photos</li>
          <li><Check size={14} /> Price</li>
          <li><Check size={14} /> Availability</li>
        </ul>
      </div>

      <div className="sticky-footer">
        <button className="ghost-button" type="button" onClick={onReturnDashboard}>Back</button>
        <button className="primary-button" type="button" onClick={onPublish}>Publish Property</button>
      </div>
    </div>
  )
}

function PublishedSuccess({ onReturnDashboard }) {
  return (
    <div className="success-wrap onboarding-card">
      <div className="success-icon green"><CheckCircle2 size={64} /></div>
      <p className="eyebrow">Property published</p>
      <h2>Your property is now live.</h2>
      <p className="lead-copy">Tenants can now discover your available rooms on UMQASHO.</p>
      <div className="cta-row">
        <button className="primary-button" type="button" onClick={onReturnDashboard}>View Listing</button>
        <button className="ghost-button" type="button" onClick={onReturnDashboard}>Manage Property</button>
      </div>
    </div>
  )
}

function TenantDashboardPage({ allowLandlordContact, onToggleLandlordContact, savedListingIds }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="umqasho-shell">
      <aside className={sidebarOpen ? 'sidebar' : 'sidebar is-collapsed'}>
        <div className="sidebar-header">
          <div className="brand-lockup">
            <img className="brand-lockup-logo" src="/umqasho-logo-transparent.png" alt="UMQASHO logo" />
            {sidebarOpen && <span>UMQASHO</span>}
          </div>
          <button className="collapse-button" type="button" onClick={() => setSidebarOpen((current) => !current)} aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}>
            <Menu size={18} />
          </button>
        </div>
        <nav className="side-nav">
          {tenantNavItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${id === 'discover' ? 'active' : ''}`} type="button">
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item footer-item" type="button"><Settings size={18} /><span>Help & Support</span></button>
          <button className="nav-item footer-item danger" type="button"><LogOut size={18} /><span>Logout</span></button>
        </div>
      </aside>
      <div className="content-shell">
        <header className="topbar">
          <label className="global-search">
            <Search size={16} />
            <input type="text" placeholder="Search properties, rooms, tenants..." />
          </label>
          <div className="topbar-actions">
            <button className="icon-chip" type="button"><Bell size={18} /><span className="dot" /></button>
            <button className="icon-chip" type="button"><Mail size={18} /><span className="dot" /></button>
            <div className="user-pill">
              <div className="avatar small dark">A</div>
              <div className="user-meta">
                <strong>Aphiwe</strong>
                <small>Tenant</small>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <main className="page-shell">
          <div className="page-header">
            <div>
              <p className="eyebrow">Tenant portal</p>
              <h1>Find a room that fits your life</h1>
            </div>
            <button className="primary-button" type="button"><Plus size={16} /> Apply now</button>
          </div>

          <div className="stats-grid">
            {tenantMetrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>

          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">Recommended</p>
                <h2>Matching properties</h2>
              </div>
              <button className="ghost-button" type="button">View all</button>
            </div>
            <div className="tenant-match-grid">
              {propertyMatches.map((item) => (
                <div className="tenant-match-card" key={item.name}>
                  <div className="match-topline">
                    <span className="badge-pill">{item.tag}</span>
                    <button className="icon-button subtle" type="button"><Star size={14} /></button>
                  </div>
                  <h3>{item.name}</h3>
                  <div className="meta-row"><MapPin size={14} /> {item.location}</div>
                  <div className="tenant-card-row">
                    <strong>{item.rent} / month</strong>
                    <button className="primary-button small" type="button">Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel tenant-privacy-panel">
            <div><p className="eyebrow">Privacy control</p><h2>Interested room contact</h2><p>Choose whether landlords can see your public rental profile after you save one of their rooms. Your private contact details and documents are never shared here.</p></div>
            <label className="consent-toggle"><input type="checkbox" checked={allowLandlordContact} onChange={(event) => onToggleLandlordContact(event.target.checked)} /><span>{allowLandlordContact ? 'Allow contact' : "Don't allow contact"}</span></label>
            <div className="tenant-saved-summary"><strong>{savedListingIds.length} saved rooms</strong><span>{allowLandlordContact ? 'New saves can be shared with the listing landlord.' : 'Your saves remain private from landlords.'}</span></div>
          </section>
        </main>
      </div>
    </div>
  )
}

function InterestedTenantsDashboard({ interests, onBack, onStatusChange }) {
  const [filter, setFilter] = useState('All')
  const [profileId, setProfileId] = useState(null)
  const [messageId, setMessageId] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [sentMessages, setSentMessages] = useState([])
  const filters = ['All', 'New', 'Contacted', 'Viewing Requested']
  const visibleInterests = interests.filter((item) => filter === 'All'
    || (filter === 'New' && item.status === 'INTERESTED')
    || (filter === 'Contacted' && item.status === 'CONTACTED')
    || (filter === 'Viewing Requested' && item.status === 'VIEWING_REQUESTED'))

  const sendMessage = (interest) => {
    if (!messageText.trim()) return
    setSentMessages((current) => [...current, { tenant: interest.tenantName, text: messageText.trim() }])
    onStatusChange(interest.id, 'CONTACTED')
    setMessageId(null)
    setMessageText('')
  }

  return (
    <div className="interested-tenants-page">
      <header className="guest-header landlord-interest-header"><a className="guest-brand" href="#dashboard" onClick={(event) => { event.preventDefault(); onBack() }}><img className="umqasho-logo" src="/umqasho-logo-transparent.png" alt="UMQASHO - Find your next home" /></a><button className="ghost-button" type="button" onClick={onBack}>Back to landlord setup</button></header>
      <main className="interested-tenants-main">
        <div className="page-header"><div><p className="eyebrow">Two-way marketplace</p><h1>Interested Tenants</h1><p>Only tenants who allow landlord contact appear here.</p></div><strong className="interest-count">{interests.length} interested {interests.length === 1 ? 'tenant' : 'tenants'}</strong></div>
        <div className="interest-filter-row" role="tablist" aria-label="Filter interested tenants">{filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? 'active' : ''} type="button" onClick={() => setFilter(item)}>{item}</button>)}</div>
        {visibleInterests.length ? <div className="interest-list">{visibleInterests.map((interest) => (
          <article className="interest-row" key={interest.id}>
            <div className="interest-person"><img src={interest.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'} alt="" /><div><strong>{interest.tenantName}</strong><span>{interest.occupation} · {interest.location}</span><small>Interested in {interest.roomName} · {interest.area}</small></div></div>
            <div className="interest-facts"><span><small>Budget</small><strong>{interest.budget}</strong></span><span><small>Move-in</small><strong>{interest.moveIn}</strong></span><span className={`interest-status ${interest.status.toLowerCase().replaceAll('_', '-')}`}>{interest.status.replaceAll('_', ' ')}</span></div>
            <div className="interest-actions"><button className="ghost-button small" type="button" onClick={() => setProfileId(profileId === interest.id ? null : interest.id)}>{profileId === interest.id ? 'Hide profile' : 'View profile'}</button><button className="primary-button small" type="button" onClick={() => { setMessageId(messageId === interest.id ? null : interest.id); setMessageText(`Hi ${interest.tenantName.split(' ')[0]}, I noticed you're interested in ${interest.roomName}. Would you like to arrange a viewing?`) }}>Message</button></div>
            {profileId === interest.id && <div className="tenant-public-profile"><h3>{interest.tenantName}</h3><p>{interest.bio}</p><dl><div><dt>Occupation</dt><dd>{interest.occupation}</dd></div><div><dt>General location</dt><dd>{interest.location}</dd></div><div><dt>Occupants</dt><dd>{interest.occupants}</dd></div><div><dt>Preferred areas</dt><dd>{interest.preferredAreas}</dd></div><div><dt>Room type</dt><dd>{interest.roomType}</dd></div><div><dt>Budget range</dt><dd>{interest.budget}</dd></div><div><dt>Move-in</dt><dd>{interest.moveIn}</dd></div><div><dt>Furnishing</dt><dd>{interest.furnishing}</dd></div><div><dt>Required amenities</dt><dd>{interest.amenities.join(', ')}</dd></div></dl><p className="private-data-note"><ShieldCheck size={14} /> Private email, phone, ID documents, and account details are not shared.</p></div>}
            {messageId === interest.id && <form className="interest-message-form" onSubmit={(event) => { event.preventDefault(); sendMessage(interest) }}><label htmlFor={`interest-message-${interest.id}`}>UMQASHO message to {interest.tenantName}</label><textarea id={`interest-message-${interest.id}`} required value={messageText} onChange={(event) => setMessageText(event.target.value)} /><button className="primary-button small" type="submit">Send message</button></form>}
          </article>
        ))}</div> : <div className="interest-empty"><Users size={24} /><h2>No tenants in this view</h2><p>When tenants save a room and allow landlord contact, they will appear here.</p></div>}
        {sentMessages.length > 0 && <section className="internal-message-log"><h2>Recent internal messages</h2>{sentMessages.slice(-3).map((message, index) => <p key={`${message.tenant}-${index}`}><MessageSquareText size={14} /> To {message.tenant}: {message.text}</p>)}</section>}
      </main>
    </div>
  )
}

function PublicHome({ onOpenListing, onAction, onLogin, onRegister, onLandlordLogin }) {
  const [query, setQuery] = useState('')
  const [roomType, setRoomType] = useState('Any room type')
  const [maxRent, setMaxRent] = useState('6000')
  const [sortOrder, setSortOrder] = useState('Recommended')
  const [currentPage, setCurrentPage] = useState(1)
  const popularAreas = ['Tembisa', 'Benoni East', 'Alexandra', 'Soweto']
  const pageSize = 10
  const filteredListings = publicListings
    .filter((listing) => `${listing.area} ${listing.city} ${listing.property}`.toLowerCase().includes(query.toLowerCase()))
    .filter((listing) => roomType === 'Any room type' || listing.type === roomType)
    .filter((listing) => listing.rent <= Number(maxRent || Infinity))
    .sort((left, right) => sortOrder === 'Lowest rent' ? left.rent - right.rent : 0)
  const totalPages = Math.max(1, Math.ceil(filteredListings.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const visibleListings = filteredListings.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize)

  useEffect(() => {
    setCurrentPage(1)
  }, [query, roomType, maxRent, sortOrder])

  return (
    <div className="guest-shell">
      <header className="guest-header">
        <a className="guest-brand" href="#home" aria-label="UMQASHO home">
          <img className="umqasho-logo" src="/umqasho-logo-transparent.png" alt="UMQASHO logo" />
        </a>
        <nav aria-label="Guest navigation">
          <a href="#homes">Find a room</a>
          <a href="#popular-areas">Explore areas</a>
          <button type="button" onClick={() => setScreen('about')}>About us</button>
          <button type="button" onClick={onLandlordLogin}>For landlords</button>
        </nav>
        <div className="guest-auth-actions"><button className="ghost-button" type="button" onClick={onLogin}>Log in</button><button className="primary-button" type="button" onClick={onRegister}>Create account</button></div>
      </header>

      <main id="home" className="guest-main">
        <section className="guest-hero">
          <div className="guest-hero-copy"><p className="eyebrow">ROOMS ACROSS GAUTENG</p><h1>A place to call yours.</h1><p>Find a room that fits your life, your plans and your budget.</p><span className="guest-hero-trust"><ShieldCheck size={15} /> Browse freely. Connect securely.</span></div>
          <span className="guest-hero-caption">A fresh start begins at home.</span>
        </section>

        <section className="guest-search" aria-label="Search rooms">
          <label className="guest-search-location"><span>Where</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Area, suburb or city" /></label>
          <label><span>Room type</span><select value={roomType} onChange={(event) => setRoomType(event.target.value)}><option>Any room type</option><option>Private Room</option><option>Bachelor Flat</option><option>Back Room</option></select></label>
          <label><span>Monthly budget</span><select value={maxRent} onChange={(event) => setMaxRent(event.target.value)}><option value="3000">Up to R3,000</option><option value="4000">Up to R4,000</option><option value="5000">Up to R5,000</option><option value="6000">Any budget</option></select></label>
          <button className="primary-button" type="button" onClick={() => document.getElementById('homes')?.scrollIntoView({ behavior: 'smooth' })}><Search size={16} /> Find a room</button>
        </section>

        <section id="popular-areas" className="popular-areas" aria-label="Popular areas"><span>Popular areas</span>{popularAreas.map((area) => <button key={area} className={query === area ? 'selected' : ''} type="button" onClick={() => setQuery(area)}>{area}<MapPin size={13} /></button>)}</section>

        <section id="homes" className="guest-results">
          <div className="guest-results-head"><div><p className="eyebrow">A GOOD PLACE TO START</p><h2>Rooms you can make your own</h2><p>{filteredListings.length} available spaces across Gauteng</p></div><label className="sort-control"><span>Sort by</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option>Recommended</option><option>Lowest rent</option></select></label></div>
          {filteredListings.length ? (
            <>
              <div className="guest-listing-grid">{visibleListings.map((listing) => (
                <article className="guest-listing-card" key={listing.id}>
                  <button className="guest-listing-image" type="button" onClick={() => onOpenListing(listing.id)}><img src={listing.image} alt={`${listing.room} at ${listing.property}`} /><span>{listing.availability}</span></button>
                  <div className="guest-listing-copy"><div className="guest-listing-kicker"><p className="eyebrow">{listing.type}</p><span><ShieldCheck size={13} /> Identity checked</span></div><h3>{listing.room}</h3><p className="guest-property-name">{listing.property}</p><p className="guest-location"><MapPin size={14} /> {listing.area}, {listing.city}</p><div className="guest-price-row"><strong>R{listing.rent.toLocaleString()} <small>/ month</small></strong><button className="icon-button" type="button" aria-label="Save room" onClick={() => onAction('SAVE', listing.id)}><Star size={17} /></button></div><button className="ghost-button guest-view-button" type="button" onClick={() => onOpenListing(listing.id)}>View room <span aria-hidden="true">↗</span></button></div>
                </article>
              ))}</div>
              {filteredListings.length > pageSize && (
                <div className="guest-pagination" aria-label="Room pagination">
                  <button type="button" className="ghost-button" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={safeCurrentPage === 1}>Previous</button>
                  <span>Page {safeCurrentPage} of {totalPages}</span>
                  <button type="button" className="primary-button" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={safeCurrentPage >= totalPages}>Next 10</button>
                </div>
              )}
            </>
          ) : <div className="guest-empty-state"><Search size={22} /><h3>No rooms match these filters</h3><p>Try another area or widen your monthly budget.</p></div>}
        </section>
      </main>
      <footer className="guest-footer">
        <div className="guest-footer-main">
          <div className="guest-footer-brand">
            <a href="#home">UMQASHO</a>
            <p>Find your next home.</p>
            <span>Browse freely. Connect securely.</span>
            <div className="guest-footer-social" aria-label="Social media links">
              <a href="https://www.instagram.com/umqasho" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="https://cdn.simpleicons.org/instagram/ffffff?size=18" alt="Instagram" /></a>
              <a href="https://www.facebook.com/umqasho" target="_blank" rel="noreferrer" aria-label="Facebook"><img src="https://cdn.simpleicons.org/facebook/ffffff?size=18" alt="Facebook" /></a>
              <a href="https://www.linkedin.com/company/umqasho" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img src="https://cdn.simpleicons.org/linkedin/ffffff?size=18" alt="LinkedIn" /></a>
            </div>
          </div>
          <div className="guest-footer-column"><h2>Explore</h2>{popularAreas.map((area) => <button key={area} type="button" onClick={() => { setQuery(area); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) }}>{area}</button>)}</div>
          <div className="guest-footer-column"><h2>Your account</h2><button type="button" onClick={onLogin}>Log in</button><button type="button" onClick={onRegister}>Create tenant account</button><button type="button" onClick={onLandlordLogin}>List a property</button></div>
        </div>
        <div className="guest-footer-bottom"><span>© {new Date().getFullYear()} UMQASHO</span><span>Thoughtful rentals for South African communities.</span></div>
      </footer>
    </div>
  )
}

function AboutUsPage({ onBack, onLogin, onRegister }) {
  return (
    <div className="guest-shell">
      <header className="guest-header">
        <a className="guest-brand" href="#home" aria-label="UMQASHO home" onClick={(event) => { event.preventDefault(); onBack() }}>
          <img className="umqasho-logo" src="/umqasho-logo-transparent.png" alt="UMQASHO logo" />
        </a>
        <nav aria-label="Guest navigation">
          <button type="button" onClick={onBack}>Home</button>
          <button type="button" onClick={() => document.getElementById('about-umqasho')?.scrollIntoView({ behavior: 'smooth' })}>About us</button>
          <button type="button" onClick={() => document.getElementById('homes')?.scrollIntoView({ behavior: 'smooth' })}>Find a room</button>
        </nav>
        <div className="guest-auth-actions"><button className="ghost-button" type="button" onClick={onLogin}>Log in</button><button className="primary-button" type="button" onClick={onRegister}>Create account</button></div>
      </header>

      <main id="about-umqasho" className="guest-main about-page">
        <section className="about-hero">
          <p className="eyebrow">ABOUT UMQASHO</p>
          <h1>Premium homes, trusted connections.</h1>
          <p>UMQASHO is a South African rental marketplace built to make the search, trust, and communication process easier for tenants, landlords, and admins alike.</p>
        </section>

        <section className="guest-trust-panel" aria-label="Why choose UMQASHO">
          <div className="guest-trust-header">
            <p className="eyebrow">WHY UMQASHO</p>
            <h2>Thoughtful renting, made simpler.</h2>
          </div>
          <div className="guest-trust-metrics">
            <div className="guest-metric-card">
              <strong>1,200+</strong>
              <span>Verified rooms</span>
            </div>
            <div className="guest-metric-card">
              <strong>4.9/5</strong>
              <span>Renter satisfaction</span>
            </div>
            <div className="guest-metric-card">
              <strong>24h</strong>
              <span>Average response time</span>
            </div>
          </div>
          <div className="guest-feature-grid">
            <article className="guest-feature-card">
              <div className="feature-icon"><ShieldCheck size={18} /></div>
              <h3>Verified homes</h3>
              <p>Only listings with clear details, landlord checks, and safer inquiry flows make it to the platform.</p>
            </article>
            <article className="guest-feature-card">
              <div className="feature-icon"><Search size={18} /></div>
              <h3>Faster matching</h3>
              <p>Search by area, budget, and room type to find homes that fit your routine and lifestyle.</p>
            </article>
            <article className="guest-feature-card">
              <div className="feature-icon"><Bell size={18} /></div>
              <h3>Secure communication</h3>
              <p>Tenants can securely express interest while landlords review and respond in a controlled flow.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="guest-footer">
        <div className="guest-footer-main">
          <div className="guest-footer-brand">
            <a href="#home">UMQASHO</a>
            <p>Find your next home.</p>
            <span>Browse freely. Connect securely.</span>
            <div className="guest-footer-social" aria-label="Social media links">
              <a href="https://www.instagram.com/umqasho" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="https://cdn.simpleicons.org/instagram/ffffff?size=18" alt="Instagram" /></a>
              <a href="https://www.facebook.com/umqasho" target="_blank" rel="noreferrer" aria-label="Facebook"><img src="https://cdn.simpleicons.org/facebook/ffffff?size=18" alt="Facebook" /></a>
              <a href="https://www.linkedin.com/company/umqasho" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img src="https://cdn.simpleicons.org/linkedin/ffffff?size=18" alt="LinkedIn" /></a>
            </div>
          </div>
          <div className="guest-footer-column"><h2>Explore</h2><button type="button" onClick={onBack}>Home</button><button type="button" onClick={() => document.getElementById('about-umqasho')?.scrollIntoView({ behavior: 'smooth' })}>About us</button></div>
          <div className="guest-footer-column"><h2>Your account</h2><button type="button" onClick={onLogin}>Log in</button><button type="button" onClick={onRegister}>Create tenant account</button></div>
        </div>
        <div className="guest-footer-bottom"><span>© {new Date().getFullYear()} UMQASHO</span><span>Thoughtful rentals for South African communities.</span></div>
      </footer>
    </div>
  )
}

function PublicListingDetail({ listing, onBack, onAction, authenticated, initialAction, onClearAction, allowLandlordContact }) {
  const [action, setAction] = useState(initialAction)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => setAction(initialAction), [initialAction, listing.id])

  const requestAction = (nextAction) => {
    if (!authenticated) {
      onAction(nextAction, listing.id)
      return
    }
    setAction(nextAction)
    setSent(false)
  }

  return (
    <div className="guest-shell guest-detail-shell">
      <header className="guest-header"><a className="guest-brand" href="#home" onClick={(event) => { event.preventDefault(); onBack() }}><img className="umqasho-logo" src="/umqasho-logo-transparent.png" alt="UMQASHO - Find your next home" /></a><button className="ghost-button" type="button" onClick={onBack}>Back to results</button></header>
      <main className="guest-detail-main">
        <div className="guest-gallery">{listing.photos.map((photo, index) => <img className={index === 0 ? 'guest-gallery-main' : ''} key={photo} src={photo} alt={`${listing.room} photo ${index + 1}`} />)}</div>
        <div className="guest-detail-layout">
          <section className="guest-detail-content">
            <p className="eyebrow">{listing.type} · {listing.property}</p><h1>{listing.room}</h1><p className="guest-location"><MapPin size={15} /> {listing.area}, {listing.city}</p>
            <div className="guest-facts"><div><span>Monthly rent</span><strong>R{listing.rent.toLocaleString()}</strong></div><div><span>Deposit</span><strong>R{listing.deposit.toLocaleString()}</strong></div><div><span>Availability</span><strong>{listing.availability}</strong></div></div>
            <section className="guest-info-section"><h2>About this room</h2><p>Comfortable, well-kept accommodation in a convenient location, with access to local transport and everyday amenities.</p></section>
            <section className="guest-info-section"><h2>Location</h2><p>{listing.area}, {listing.city}, Gauteng</p><a className="ghost-button maps-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${listing.area}, ${listing.city}, Gauteng`)}`} target="_blank" rel="noreferrer"><MapPin size={15} /> View general area on Google Maps</a></section>
            <section className="guest-public-profile"><img className="landlord-profile-photo" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80" alt={`${listing.landlord} profile`} /><div className="landlord-profile-copy"><p className="eyebrow">Public profile</p><div className="landlord-profile-heading"><h2>{listing.landlord}</h2><div className="landlord-rating" aria-label="No landlord reviews yet">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} />)}<span>Not rated yet</span></div></div><p>{listing.profile}</p><span className="verification-badge"><ShieldCheck size={13} /> Identity verified</span></div><button className="text-button inline" type="button" onClick={() => setIsProfileOpen((open) => !open)}>{isProfileOpen ? 'Hide profile' : 'View profile'}</button></section>
            {isProfileOpen && <div className="guest-info-section public-profile-expanded"><h2>{listing.landlord}</h2><p>{listing.profile}</p><p>Member since 2024 · Gauteng</p><p>Contact details remain private until you connect through UMQASHO.</p></div>}
            {action === 'MESSAGE_LANDLORD' && <form className="guest-action-panel" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><h2>Message {listing.landlord}</h2>{sent ? <p>Message sent. The landlord can reply in your UMQASHO inbox.</p> : <><textarea required defaultValue={`Hi, I am interested in ${listing.room}. Is it still available?`} /><button className="primary-button" type="submit">Send message</button></>}</form>}
            {action === 'REQUEST_VIEWING' && <form className="guest-action-panel" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><h2>Request a viewing</h2>{sent ? <p>Viewing request submitted. You can track the response in your account.</p> : <><label><span>Preferred date</span><input required type="date" /></label><label><span>Preferred time</span><input required type="time" /></label><label><span>Message</span><textarea defaultValue="I would like to view this room. Please let me know what times work for you." /></label><button className="primary-button" type="submit">Submit request</button></>}</form>}
            {action === 'SAVE' && <div className="guest-action-panel"><h2>Room saved</h2><p>{allowLandlordContact ? 'Your interest has been shared with the landlord. They can view your public rental profile and message you here.' : 'Your save is private. Turn on “Allow landlords to contact me” in Profile & privacy if you want to share interest.'}</p><button className="text-button inline" type="button" onClick={() => { setAction(null); onClearAction() }}>Continue browsing this room</button></div>}
          </section>
          <aside className="guest-contact-panel"><span className="status-tag success">{listing.availability}</span><strong>R{listing.rent.toLocaleString()} <small>/ month</small></strong><button className="primary-button" type="button" onClick={() => requestAction('MESSAGE_LANDLORD')}>Message landlord</button><button className="ghost-button" type="button" onClick={() => requestAction('REQUEST_VIEWING')}>Request viewing</button><button className="text-button inline" type="button" onClick={() => requestAction('SAVE')}><Star size={15} /> Save room</button><button className="text-button inline" type="button" onClick={() => requestAction('COMPARE')}>Compare room</button><p>Contact details stay private. Connect securely through UMQASHO.</p></aside>
        </div>
      </main>
    </div>
  )
}

function GuestAuthGate({ action, onLogin, onRegister, onClose }) {
  if (!action) return null
  const actionCopy = action === 'SAVE' ? 'save this room' : action === 'REQUEST_VIEWING' ? 'request a viewing' : action === 'COMPARE' ? 'compare rooms' : 'message this landlord'
  return <div className="guest-gate-backdrop" onClick={onClose}><section className="guest-gate" role="dialog" aria-modal="true" aria-labelledby="gate-title" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" aria-label="Close" onClick={onClose}>×</button><p className="eyebrow">Your next step</p><h2 id="gate-title">Create a free account to {actionCopy}.</h2><p>We’ll return you to this same room and continue what you started.</p><button className="primary-button" type="button" onClick={onRegister}>Create free account</button><button className="ghost-button" type="button" onClick={onLogin}>Log in</button><button className="text-button inline" type="button" onClick={onClose}>Continue browsing</button></section></div>
}

function TenantRegistration({ onSubmit, onLogin, onBrowse }) {
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitRegistration = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await onSubmit(new FormData(event.currentTarget))
    } catch (registrationError) {
      setError(registrationError.message || 'Unable to create your account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="tenant-register-page">
      <form className="tenant-register-card" onSubmit={submitRegistration}>
        <button className="text-button inline" type="button" onClick={onBrowse}>← Back to browsing</button>
        <p className="eyebrow">Tenant account</p>
        <h1>Create your free account</h1>
        <div className="two-column-grid">
          <label className="field"><span>First name *</span><input required name="firstName" autoComplete="given-name" /></label>
          <label className="field"><span>Last name *</span><input required name="lastName" autoComplete="family-name" /></label>
          <label className="field"><span>Email *</span><input required name="email" type="email" autoComplete="email" /></label>
          <label className="field"><span>Phone *</span><input required name="phone" type="tel" pattern="^(?:\\+?27\\s?0?[6-8](?:[0-9][\\s-]?){7}[0-9]|0[6-8](?:[0-9][\\s-]?){7}[0-9])$" title="Enter a valid South African mobile number, for example 071 234 5678 or +27 71 234 5678" autoComplete="tel" /></label>
          <label className="field"><span>Password *</span><input required name="password" type="password" minLength="8" maxLength="72" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,72}" title="Use 8-72 characters with uppercase, lowercase, number, and symbol" autoComplete="new-password" /></label>
        </div>
        <p className="helper-text">Your account details are saved now. Rental preferences can be added after profile setup is available.</p>
        <label className="checkbox-row tenant-terms"><input type="checkbox" required /><span>I accept the Terms and Privacy Policy.</span></label>
        {error && <p className="location-error" role="alert">{error}</p>}
        <button className="primary-button auth-button" type="submit" disabled={submitting}>{submitting ? 'Creating account...' : 'Create account'}</button>
        <p className="tenant-register-login">Already registered? <button className="text-button inline" type="button" onClick={onLogin}>Log in</button></p>
      </form>
    </div>
  )
}

function AdminSubscriptionsPanel({ API_BASE_URL, authHeader }) {
  const [plans, setPlans] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [users, setUsers] = useState([])
  const [roleFilter, setRoleFilter] = useState('LANDLORD')
  const [search, setSearch] = useState('')
  const [planName, setPlanName] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [form, setForm] = useState({ name: '', price: '', billingCycle: 'MONTHLY', description: '' })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const loadPlansAndSubscriptions = async () => {
    const [plansResponse, subscriptionsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/admin/subscriptions/plans`, { headers: { Authorization: authHeader } }),
      fetch(`${API_BASE_URL}/api/admin/subscriptions`, { headers: { Authorization: authHeader } }),
    ])
    if (!plansResponse.ok || !subscriptionsResponse.ok) throw new Error('Unable to load subscription data.')
    const [plansData, subscriptionsData] = await Promise.all([plansResponse.json(), subscriptionsResponse.json()])
    setPlans(plansData)
    setSubscriptions(subscriptionsData)
    setPlanName((current) => current || plansData[0]?.name || '')
  }

  const loadUsers = async (role = roleFilter, query = search) => {
    const params = new URLSearchParams({ role })
    if (query.trim()) params.set('search', query.trim())
    const response = await fetch(`${API_BASE_URL}/api/admin/users?${params}`, { headers: { Authorization: authHeader } })
    if (!response.ok) throw new Error('Unable to search platform users.')
    const userData = await response.json()
    setUsers(userData)
    setSelectedUserId((current) => userData.some((user) => user.id === current) ? current : userData[0]?.id || '')
  }

  useEffect(() => {
    Promise.all([loadPlansAndSubscriptions(), loadUsers()])
      .catch((loadError) => setError(loadError.message || 'Unable to load subscription management.'))
      .finally(() => setLoading(false))
  }, [API_BASE_URL, authHeader])

  const createPlan = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')
    setSubmitting(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/subscriptions/plans`, {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      })
      if (!response.ok) throw new Error(response.status === 409 ? 'A plan with this name already exists.' : 'Could not create the subscription plan. Check the name, price, and description.')
      const created = await response.json()
      setForm({ name: '', price: '', billingCycle: 'MONTHLY', description: '' })
      setPlanName(created.name)
      setNotice('Subscription plan created.')
      await loadPlansAndSubscriptions()
    } catch (submitError) {
      setError(submitError.message || 'Could not create the subscription plan.')
    } finally {
      setSubmitting(false)
    }
  }

  const assignPlan = async (event) => {
    event.preventDefault()
    if (!selectedUserId || !planName) return
    setError('')
    setNotice('')
    setSubmitting(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/subscriptions/users/${selectedUserId}/assign?planName=${encodeURIComponent(planName)}`, {
        method: 'POST',
        headers: { Authorization: authHeader },
      })
      if (!response.ok) throw new Error('Could not assign this plan. Refresh the user and plan lists, then try again.')
      setNotice('Subscription assigned.')
      await loadPlansAndSubscriptions()
    } catch (submitError) {
      setError(submitError.message || 'Could not assign this plan.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-grid two-up">
      <section className="admin-panel">
        <div className="section-header compact-header"><div><p className="eyebrow">Billing controls</p><h2>Create a plan</h2></div></div>
        <form className="form-layout" onSubmit={createPlan}>
          <label className="field"><span>Plan name *</span><input required maxLength="120" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <div className="two-column-grid">
            <label className="field"><span>Price (ZAR) *</span><input required type="number" min="0.01" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label>
            <label className="field"><span>Billing cycle *</span><select value={form.billingCycle} onChange={(event) => setForm({ ...form, billingCycle: event.target.value })}><option value="MONTHLY">Monthly</option><option value="YEARLY">Yearly</option></select></label>
          </div>
          <label className="field"><span>Description *</span><textarea required maxLength="500" rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          <button className="primary-button" type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Create plan'}</button>
        </form>
        <div className="table-card">
          <table><thead><tr><th>Plan</th><th>Price</th><th>Cycle</th></tr></thead><tbody>
            {plans.map((plan) => <tr key={plan.id}><td>{plan.name}</td><td>R{Number(plan.price).toLocaleString('en-ZA')}</td><td>{plan.billingCycle}</td></tr>)}
            {plans.length === 0 && <tr><td colSpan="3">No plans have been created.</td></tr>}
          </tbody></table>
        </div>
      </section>

      <section className="admin-panel">
        <div className="section-header compact-header"><div><p className="eyebrow">Account management</p><h2>Assign a subscription</h2></div></div>
        <form className="form-layout" onSubmit={assignPlan}>
          <div className="two-column-grid">
            <label className="field"><span>Account type</span><select value={roleFilter} onChange={(event) => { setRoleFilter(event.target.value); loadUsers(event.target.value, search).catch((loadError) => setError(loadError.message)) }}><option value="LANDLORD">Landlords</option><option value="TENANT">Tenants</option></select></label>
            <label className="field"><span>Search name or email</span><input value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          </div>
          <button className="ghost-button" type="button" onClick={() => loadUsers().catch((loadError) => setError(loadError.message))}>Find accounts</button>
          <label className="field"><span>Account *</span><select required value={selectedUserId} onChange={(event) => setSelectedUserId(event.target.value)}><option value="">Select an account</option>{users.map((user) => <option key={user.id} value={user.id}>{user.firstName} {user.lastName} · {user.email} · {user.status}</option>)}</select></label>
          <label className="field"><span>Plan *</span><select required value={planName} onChange={(event) => setPlanName(event.target.value)}><option value="">Select a plan</option>{plans.map((plan) => <option key={plan.id} value={plan.name}>{plan.name} · R{Number(plan.price).toLocaleString('en-ZA')} / {plan.billingCycle.toLowerCase()}</option>)}</select></label>
          <button className="primary-button" type="submit" disabled={submitting || !plans.length || !selectedUserId}>{submitting ? 'Assigning...' : 'Assign plan'}</button>
        </form>
        <div className="table-card">
          <table><thead><tr><th>Account ID</th><th>Plan</th><th>Status</th><th>Started</th></tr></thead><tbody>
            {subscriptions.map((subscription) => <tr key={subscription.id}><td>{subscription.userId}</td><td>{subscription.planName}</td><td>{subscription.status}</td><td>{new Date(subscription.startedAt).toLocaleDateString('en-ZA')}</td></tr>)}
            {subscriptions.length === 0 && <tr><td colSpan="4">No subscriptions have been assigned.</td></tr>}
          </tbody></table>
        </div>
      </section>
      {loading && <div className="empty-state compact"><p>Loading subscription data...</p></div>}
      {error && <p className="location-error" role="alert">{error}</p>}
      {notice && <p role="status">{notice}</p>}
    </div>
  )
}

function AdminDashboardPage({ onLogout, adminCredentials }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082'
  const password = adminCredentials?.password || 'Password@123'
  const authHeader = `Basic ${btoa(`admin:${password}`)}`
  const [dashboard, setDashboard] = useState(null)
  const [verifications, setVerifications] = useState([])
  const [selectedLandlord, setSelectedLandlord] = useState(null)
  const [decisionReason, setDecisionReason] = useState('')
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const loadAdminData = async () => {
    const [dashboardResponse, verificationResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/admin/dashboard`, { headers: { Authorization: authHeader } }),
      fetch(`${API_BASE_URL}/api/admin/verifications`, { headers: { Authorization: authHeader } }),
    ])
    if (!dashboardResponse.ok || !verificationResponse.ok) throw new Error('Unable to load admin data. Check the admin credentials and backend connection.')
    const [dashboardData, verificationData] = await Promise.all([dashboardResponse.json(), verificationResponse.json()])
    setDashboard(dashboardData)
    setVerifications(verificationData || [])
    setSelectedLandlord((current) => verificationData?.find((item) => item.id === current?.id) || verificationData?.[0] || null)
    setError('')
  }

  useEffect(() => {
    loadAdminData()
      .catch((fetchError) => setError(fetchError.message || 'We could not load the admin dashboard.'))
      .finally(() => setLoading(false))
  }, [API_BASE_URL, authHeader])

  const submitDecision = async (landlordId, decision, reason) => {
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/verifications/${landlordId}`, {
        method: 'PUT',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, reason: reason || '' }),
      })
      if (!response.ok) throw new Error(response.status === 400 ? 'Add a reason before rejecting a landlord.' : 'Decision could not be saved.')
      await loadAdminData()
      setDecisionReason('')
    } catch (decisionError) {
      setError(decisionError.message || 'The verification decision could not be saved.')
    } finally {
      setSubmitting(false)
    }
  }

  const metrics = [
    { label: 'Total users', value: dashboard?.totalUsers ?? 0 },
    { label: 'Tenants', value: dashboard?.totalTenants ?? 0 },
    { label: 'Landlords', value: dashboard?.totalLandlords ?? 0 },
    { label: 'Verified landlords', value: dashboard?.verifiedLandlords ?? 0 },
    { label: 'Pending review', value: dashboard?.pendingVerifications ?? 0 },
    { label: 'Rejected applications', value: dashboard?.rejectedVerifications ?? 0 },
  ]

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-brand-lockup" aria-label="UMQASHO admin system logo">
          <img className="admin-system-logo" src="/umqasho-logo-transparent.png" alt="UMQASHO system logo" />
        </div>
        <div className="admin-topbar-actions">
          <button className="ghost-button small" type="button" disabled={loading} onClick={() => { setLoading(true); loadAdminData().catch((fetchError) => setError(fetchError.message)).finally(() => setLoading(false)) }}>Refresh</button>
          <button className="ghost-button" type="button" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="admin-main">
        <div className="page-header admin-header-row">
          <div><p className="eyebrow">Platform control</p><h1>UMQASHO admin dashboard</h1><p>Live user counts, landlord verification, and subscription controls.</p></div>
        </div>

        <nav className="admin-primary-nav" aria-label="Admin sections">
          {['Dashboard', 'Verification', 'Subscriptions'].map((item) => (
            <button key={item} className={`admin-nav-item ${activeSection === item ? 'active' : ''}`} type="button" onClick={() => setActiveSection(item)}>{item}</button>
          ))}
        </nav>

        {loading && <div className="empty-state compact"><p>Loading platform data...</p></div>}
        {error && <p className="location-error" role="alert">{error}</p>}

        {!loading && activeSection === 'Dashboard' && (
          <>
            <section className="admin-metrics" aria-label="Platform summary metrics">
              {metrics.map((metric) => <article key={metric.label} className="admin-metric-card"><span>{metric.label}</span><strong>{metric.value}</strong></article>)}
            </section>
            <section className="admin-panel">
              <div className="section-header compact-header"><div><p className="eyebrow">Action required</p><h2>Landlord verification</h2></div><button className="ghost-button small" type="button" onClick={() => setActiveSection('Verification')}>Open review queue ({verifications.length})</button></div>
              {verifications.length === 0 ? <div className="empty-state"><p>No landlord verification requests are waiting for review.</p></div> : (
                <div className="table-card"><table><thead><tr><th>Name</th><th>Email</th><th>Submitted</th></tr></thead><tbody>
                  {verifications.slice(0, 5).map((item) => <tr key={item.id}><td>{item.firstName} {item.lastName}</td><td>{item.email}</td><td>{new Date(item.submittedAt || item.createdAt).toLocaleDateString('en-ZA')}</td></tr>)}
                </tbody></table></div>
              )}
            </section>
            <section className="admin-panel"><div className="section-header compact-header"><div><p className="eyebrow">Subscription operations</p><h2>Plans and account assignments</h2></div><button className="ghost-button small" type="button" onClick={() => setActiveSection('Subscriptions')}>Manage subscriptions</button></div><p>Review existing plans, create new plans, and assign them to a tenant or landlord account.</p></section>
          </>
        )}

        {!loading && activeSection === 'Verification' && (
          <section className="admin-panel">
            <div className="section-header compact-header"><div><p className="eyebrow">Verification queue</p><h2>Landlord approvals</h2></div></div>
            {verifications.length === 0 ? <div className="empty-state"><p>No landlord verification requests at the moment.</p></div> : (
              <div className="admin-queue-layout">
                <div className="table-card"><table><thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Submitted</th></tr></thead><tbody>
                  {verifications.map((verification) => <tr key={verification.id} className={selectedLandlord?.id === verification.id ? 'selected-review-row' : ''} onClick={() => setSelectedLandlord(verification)}><td>{verification.firstName} {verification.lastName}</td><td>{verification.email}</td><td><span className="status-tag warning">{verification.status}</span></td><td>{new Date(verification.submittedAt || verification.createdAt).toLocaleDateString('en-ZA')}</td></tr>)}
                </tbody></table></div>
                {selectedLandlord && <div className="admin-verification-panel"><h3>{selectedLandlord.firstName} {selectedLandlord.lastName}</h3><p>{selectedLandlord.email}</p><p className="helper-text">Submitted on {new Date(selectedLandlord.submittedAt || selectedLandlord.createdAt).toLocaleDateString('en-ZA')}</p><label className="field"><span>Decision note</span><textarea rows="4" value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} placeholder="A reason is required when rejecting." /></label><div className="admin-review-actions"><button className="primary-button" type="button" disabled={submitting} onClick={() => submitDecision(selectedLandlord.id, 'APPROVE', '')}>Approve</button><button className="ghost-button" type="button" disabled={submitting} onClick={() => submitDecision(selectedLandlord.id, 'REJECT', decisionReason)}>Reject</button></div></div>}
              </div>
            )}
          </section>
        )}

        {!loading && activeSection === 'Subscriptions' && <AdminSubscriptionsPanel API_BASE_URL={API_BASE_URL} authHeader={authHeader} />}
      </main>
    </div>
  )
}

function LandlordVerificationStatus({ status, reason, onBack }) {
  return <div className="account-screen"><section className="account-panel"><button className="text-button inline back-link" type="button" onClick={onBack}>← Back to property setup</button><p className="eyebrow">Landlord verification</p><h2>{status === 'VERIFIED' ? 'Your account is verified' : status === 'REJECTED' ? 'Changes requested' : 'Your account is awaiting review'}</h2><p className="verification-status-copy">{status === 'VERIFIED' ? 'An administrator approved your landlord account.' : status === 'REJECTED' ? 'An administrator requested changes to your verification.' : 'Your landlord account is in the admin verification queue.'}</p><div className={`verification-result ${status.toLowerCase()}`}><ShieldCheck size={22} /><strong>{status}</strong></div>{status === 'REJECTED' && <div className="rejection-reason"><strong>Admin review reason</strong><p>{reason || 'Contact UMQASHO support for next steps.'}</p></div>}<p className="helper-text">Identity document uploads are not available in this version. Do not treat an account as verified until an administrator confirms it.</p></section></div>
}

function LandlordFlow({ initialStep = 0, onOpenVerification, onOpenInterestedTenants, interestCount, verificationStatus, verificationReason, onRegistrationComplete }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082'
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isPublished, setIsPublished] = useState(false)
  const [propertyPhotos, setPropertyPhotos] = useState([])
  const [rooms, setRooms] = useState([])
  const [registrationError, setRegistrationError] = useState('')
  const [registering, setRegistering] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    province: '',
    city: '',
    area: '',
    agreed: false,
    propertyName: '',
    propertyType: 'House',
    description: '',
    locationVisibility: 'Approximate location',
    latitude: null,
    longitude: null,
    confirmedAddress: '',
    locationConfirmed: false,
    nearbyInformation: [],
    amenities: ['Wi-Fi', 'Parking', 'Security', 'Water', 'Electricity'],
  })

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, 6))
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleRegisterLandlord = async () => {
    setRegistrationError('')
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim() || !form.password) {
      setRegistrationError('Complete all required account fields.')
      return
    }

    if (!form.agreed) {
      setRegistrationError('Accept the Terms and Privacy Policy before creating your account.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setRegistrationError('Passwords do not match.')
      return
    }

    const cleanPhone = form.phone.replace(/[\s-]/g, '')
    if (!/^(?:\+?27\s?0?[6-8](?:[0-9][\s-]?){7}[0-9]|0[6-8](?:[0-9][\s-]?){7}[0-9])$/.test(form.phone.trim())) {
      setRegistrationError('Enter a valid South African mobile number, for example 071 234 5678 or +27 71 234 5678.')
      return
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,72}$/.test(form.password)) {
      setRegistrationError('Use a password of 8-72 characters with uppercase, lowercase, number, and symbol.')
      return
    }

    setRegistering(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register/landlord`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: cleanPhone,
          password: form.password,
        }),
      })

      if (!response.ok) {
        throw new Error(response.status === 409
          ? 'An account with this email already exists. Log in or use a different email.'
          : response.status === 400
            ? 'Check your details. Use a valid South African phone number and a strong password.'
            : 'Unable to create the landlord account. Please try again.')
      }

      const createdUser = await response.json()
      onRegistrationComplete(createdUser)
      if (createdUser?.email) {
        setForm((current) => ({ ...current, email: createdUser.email }))
      }
      goNext()
    } catch (error) {
      setRegistrationError(error.message || 'Unable to create the landlord account. Please try again.')
    } finally {
      setRegistering(false)
    }
  }

  const renderStep = () => {
    if (isPublished) {
      return <PublishedSuccess onReturnDashboard={() => setCurrentStep(6)} />
    }

    switch (currentStep) {
      case 0:
        return <RegisterStep onContinue={handleRegisterLandlord} form={form} setForm={setForm} error={registrationError} submitting={registering} />
      case 1:
        return <AccountSuccessStep onContinue={goNext} firstName={form.firstName} />
      case 2:
        return <VerificationStep onContinue={goNext} />
      case 3:
        return <PropertyStep onContinue={goNext} form={form} setForm={setForm} />
      case 4:
        return <RoomsStep onContinue={goNext} setCurrentStep={setCurrentStep} propertyName={form.propertyName} rooms={rooms} setRooms={setRooms} />
      case 5:
        return <PropertyPhotosStep onContinue={goNext} photos={propertyPhotos} setPhotos={setPropertyPhotos} />
      case 6:
        return <PublishStep onPublish={() => setIsPublished(true)} onReturnDashboard={() => setCurrentStep(5)} propertyName={form.propertyName} form={form} rooms={rooms} />
      default:
        return <PropertyStep onContinue={goNext} form={form} setForm={setForm} />
    }
  }

  return (
    <div className="landlord-shell">
      <div className="landlord-hero">
        <div className="hero-copy">
          <div className="brand-lockup landlord-brand-lockup">
            <img className="brand-lockup-logo" src="/umqasho-logo-transparent.png" alt="UMQASHO logo" />
            <p className="eyebrow">UMQASHO</p>
          </div>
          <h1>Find your next home.</h1>
          <p>Premium landlord onboarding made simple, secure, and trust-building from the first step.</p>
        </div>
        <div className="hero-badges">
          <span><ShieldCheck size={14} /> {verificationStatus === 'VERIFIED' ? 'Verified' : 'Verification pending'}</span>
          <span><Sparkles size={14} /> Premium flow</span>
          <button className="ghost-button small" type="button" onClick={onOpenInterestedTenants}><Star size={14} /> Interested Tenants ({interestCount})</button>
          <button className="ghost-button small" type="button" onClick={onOpenVerification}>Verification status: {verificationStatus}</button>
        </div>
      </div>
      <div className="journey-wrap">
        {renderStep()}
      </div>
    </div>
  )
}

function LoginScreen({ role, setRole, credentials, onFieldChange, onLogin, onCreateAccount, onGuestBrowse }) {
  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <div className="auth-brand">
          <img className="auth-brand-logo" src="/umqasho-logo-transparent.png" alt="UMQASHO - Find your next home" />
          <div>
            <p className="eyebrow">UMQASHO</p>
            <h1>Sign in to your account</h1>
          </div>
        </div>

        <div className="role-switcher" aria-label="Account type selection">
          <button className={role === 'landlord' ? 'active' : ''} type="button" onClick={() => setRole('landlord')}>Landlord</button>
          <button className={role === 'tenant' ? 'active' : ''} type="button" onClick={() => setRole('tenant')}>Tenant</button>
          <button className={role === 'admin' ? 'active' : ''} type="button" onClick={() => setRole('admin')}>Admin</button>
        </div>

        <form className="auth-form" onSubmit={onLogin}>
          <label>
            <span>Email address</span>
            <input
              type="email"
              value={credentials.email}
              onChange={(event) => onFieldChange('email', event.target.value)}
              placeholder={role === 'landlord' ? 'thabo@uqasho.co.za' : role === 'admin' ? 'admin' : 'tenant@example.com'}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={credentials.password}
              onChange={(event) => onFieldChange('password', event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          <div className="remember-row">
            <label className="checkbox-row"><input type="checkbox" defaultChecked /> Keep me signed in</label>
            <button className="text-button inline" type="button">Forgot password?</button>
          </div>

          <button className="primary-button auth-button" type="submit">{role === 'landlord' ? 'Open landlord dashboard' : role === 'admin' ? 'Open admin dashboard' : 'Open tenant dashboard'}</button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>

        <div className="social-row">
          <button type="button" className="ghost-button social-button">Google</button>
          <button type="button" className="ghost-button social-button">Apple</button>
        </div>

        <p className="auth-footer">Need a new account? <button className="text-button inline" type="button" onClick={onCreateAccount}>Create account</button></p>
        <button className="text-button inline" type="button" onClick={onGuestBrowse}>Browse without an account</button>
      </div>

      <div className="auth-visual">
        <div className="visual-card bright">
          <div className="brand-mark small"><Sparkles size={18} /></div>
          <h2>Premium property access</h2>
          <p>Match verified landlords with tenants faster and simpler.</p>
          <div className="list-inline">
            <span><ShieldCheck size={14} /> Verified listings</span>
            <span><CalendarDays size={14} /> Viewings booked</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082'
  const [screen, setScreen] = useState('public')
  const [role, setRole] = useState('tenant')
  const [authenticated, setAuthenticated] = useState(false)
  const [landlordInitialStep, setLandlordInitialStep] = useState(0)
  const [selectedListingId, setSelectedListingId] = useState(publicListings[0].id)
  const [pendingAction, setPendingAction] = useState(null)
  const [resumeAction, setResumeAction] = useState(null)
  const [authGate, setAuthGate] = useState(null)
  const [loginForm, setLoginForm] = useState({ email: 'tenant-login@example.com', password: 'Password@123' })
  const [verificationStatus, setVerificationStatus] = useState('PENDING')
  const [verificationReason, setVerificationReason] = useState('')
  const [allowLandlordContact, setAllowLandlordContact] = useState(false)
  const [savedListingIds, setSavedListingIds] = useState([])
  const [interestedTenants, setInterestedTenants] = useState([])
  const tenantPublicProfile = {
    tenantName: 'Aphiwe Mokoena',
    occupation: 'Healthcare assistant',
    location: 'Tembisa, Gauteng',
    occupants: '1 person',
    preferredAreas: 'Tembisa, Kempton Park',
    roomType: 'Private room',
    budget: 'R2,500–R3,000',
    moveIn: '1 Oct 2026',
    furnishing: 'Furnished preferred',
    amenities: ['Wi-Fi', 'Private bathroom'],
    bio: 'Working professional looking for a quiet, secure room near public transport.',
    photo: '',
  }

  const saveListingInterest = (listingId) => {
    setSavedListingIds((current) => current.includes(listingId) ? current : [...current, listingId])
    if (!allowLandlordContact) return
    const listing = publicListings.find((item) => item.id === listingId)
    if (!listing) return
    setInterestedTenants((current) => {
      const existing = current.find((item) => item.listingId === listingId && item.tenantName === tenantPublicProfile.tenantName)
      const interest = { ...tenantPublicProfile, id: existing?.id || `${tenantPublicProfile.tenantName}-${listingId}`, listingId, roomName: listing.room, area: listing.area, status: 'INTERESTED' }
      return existing ? current.map((item) => item.id === interest.id ? interest : item) : [...current, interest]
    })
  }

  const updateLandlordContactConsent = (allowed) => {
    setAllowLandlordContact(allowed)
    if (!allowed) {
      setInterestedTenants((current) => current.filter((item) => item.tenantName !== tenantPublicProfile.tenantName))
    }
  }

  const openAuth = (action, listingId) => {
    setSelectedListingId(listingId)
    if (!authenticated) {
      setPendingAction(action)
      setAuthGate(action)
      return
    }
    setResumeAction(action)
    if (action === 'SAVE') saveListingInterest(listingId)
  }

  const completeTenantAuth = () => {
    setAuthenticated(true)
    if (pendingAction) {
      if (pendingAction === 'SAVE') saveListingInterest(selectedListingId)
      setResumeAction(pendingAction)
      setPendingAction(null)
      setScreen('public-detail')
      return
    }
    setScreen('tenant-dashboard')
  }

  const handleTenantRegistration = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/tenant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.get('firstName')?.toString().trim(),
        lastName: formData.get('lastName')?.toString().trim(),
        email: formData.get('email')?.toString().trim(),
        phone: formData.get('phone')?.toString().replace(/[\s-]/g, ''),
        password: formData.get('password')?.toString(),
      }),
    })

    if (!response.ok) {
      const message = response.status === 409
        ? 'An account with this email already exists. Log in or use a different email.'
        : response.status === 400
          ? 'Check your details. Use a valid South African phone number and a password with uppercase, lowercase, number, and symbol.'
          : 'Unable to create your account. Please try again.'
      throw new Error(message)
    }

    const user = await response.json()
    if (user.role !== 'TENANT') {
      throw new Error('The account was created, but tenant access could not be confirmed. Please log in.')
    }

    setRole('tenant')
    completeTenantAuth()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    if (role === 'landlord') {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginForm.email.trim(),
            password: loginForm.password,
          }),
        })

        if (!response.ok) {
          const errorBody = await response.text()
          throw new Error(errorBody || 'Landlord login failed')
        }

        const user = await response.json()
        if (!user || !user.email || user.role !== 'LANDLORD') {
          throw new Error('This account is not available for landlord access.')
        }

        setVerificationStatus(user.status === 'ACTIVE' ? 'VERIFIED' : 'PENDING')
        setVerificationReason('')
        setLandlordInitialStep(3)
        setAuthenticated(true)
        setScreen('landlord-flow')
        return
      } catch (error) {
        alert(error.message || 'Unable to log in as landlord. Please check your credentials and try again.')
        return
      }
    }

    if (role === 'admin') {
      const username = role === 'admin' ? 'admin' : (loginForm.email || 'admin').trim() || 'admin'
      const password = loginForm.password || 'Password@123'
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
        })

        if (!response.ok) {
          throw new Error('Invalid admin credentials')
        }

        setAuthenticated(true)
        setScreen('admin-dashboard')
        return
      } catch (error) {
        alert(error.message || 'Unable to sign in as admin.')
        return
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginForm.email.trim(),
          password: loginForm.password,
        }),
      })

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(errorBody || 'Login failed')
      }

      const user = await response.json()
      if (!user || !user.email || user.role !== 'TENANT') {
        throw new Error('This account is not available for tenant access.')
      }

      setAuthenticated(true)
      if (pendingAction) {
        completeTenantAuth()
        return
      }
      setScreen('tenant-dashboard')
    } catch (error) {
      alert(error.message || 'Unable to log in. Please check your credentials and try again.')
    }
  }

  if (screen === 'public') {
    return <PublicHome onOpenListing={(id) => { setSelectedListingId(id); setResumeAction(null); setScreen('public-detail') }} onAction={openAuth} onLogin={() => { setRole('tenant'); setScreen('login') }} onRegister={() => { setRole('tenant'); setScreen('tenant-register') }} onLandlordLogin={() => { setRole('landlord'); setScreen('login') }} onAbout={() => setScreen('about')} />
  }

  if (screen === 'about') {
    return <AboutUsPage onBack={() => setScreen('public')} onLogin={() => { setRole('tenant'); setScreen('login') }} onRegister={() => { setRole('tenant'); setScreen('tenant-register') }} />
  }

  if (screen === 'public-detail') {
    const listing = publicListings.find((item) => item.id === selectedListingId) || publicListings[0]
    return <><PublicListingDetail listing={listing} authenticated={authenticated} initialAction={resumeAction} allowLandlordContact={allowLandlordContact} onClearAction={() => setResumeAction(null)} onBack={() => { setResumeAction(null); setScreen('public') }} onAction={openAuth} /><GuestAuthGate action={authGate} onClose={() => setAuthGate(null)} onLogin={() => { setAuthGate(null); setRole('tenant'); setScreen('login') }} onRegister={() => { setAuthGate(null); setRole('tenant'); setScreen('tenant-register') }} /></>
  }

  if (screen === 'tenant-register') {
    return <TenantRegistration onSubmit={handleTenantRegistration} onLogin={() => { setRole('tenant'); setScreen('login') }} onBrowse={() => setScreen(pendingAction ? 'public-detail' : 'public')} />
  }

  if (screen === 'login') {
    return <LoginScreen
      role={role}
      setRole={setRole}
      credentials={loginForm}
      onFieldChange={(field, value) => setLoginForm((current) => ({ ...current, [field]: value }))}
      onLogin={handleLogin}
      onCreateAccount={() => { if (role === 'landlord') setLandlordInitialStep(0); setScreen(role === 'landlord' ? 'landlord-flow' : 'tenant-register') }}
      onGuestBrowse={() => setScreen('public')}
    />
  }

  if (screen === 'tenant-dashboard') {
    return <TenantDashboardPage allowLandlordContact={allowLandlordContact} onToggleLandlordContact={updateLandlordContactConsent} savedListingIds={savedListingIds} />
  }

  if (screen === 'landlord-interests') {
    return <InterestedTenantsDashboard interests={interestedTenants} onBack={() => setScreen('landlord-flow')} onStatusChange={(interestId, status) => setInterestedTenants((current) => current.map((item) => item.id === interestId ? { ...item, status } : item))} />
  }

  if (screen === 'admin-dashboard') {
    return <AdminDashboardPage adminCredentials={loginForm} onLogout={() => { setRole('tenant'); setScreen('public') }} />
  }

  if (screen === 'landlord-verification') {
    return <LandlordVerificationStatus status={verificationStatus} reason={verificationReason} onBack={() => setScreen('landlord-flow')} />
  }

  return <LandlordFlow initialStep={landlordInitialStep} onOpenVerification={() => setScreen('landlord-verification')} onOpenInterestedTenants={() => setScreen('landlord-interests')} interestCount={interestedTenants.length} verificationStatus={verificationStatus} verificationReason={verificationReason} onRegistrationComplete={(user) => { setVerificationStatus(user.status === 'ACTIVE' ? 'VERIFIED' : 'PENDING'); setVerificationReason('') }} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
