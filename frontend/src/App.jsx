import { useState, useEffect, useRef } from 'react'
import { 
  Menu, MessageCircle, Phone, Home, Clock, CreditCard, 
  Car, Users, Award, PlayCircle, CheckCircle, ArrowRight,
  ChevronRight, Sparkles, MapPin, X
} from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('')
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const heroImages = [
    '/poster/p1.webp',
    '/poster/p2.webp',
    '/poster/p3.webp',
    '/poster/p4.webp'
  ]

  // Hero image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    carModel: '',
    address: '',
    landmark: '',
    plan: '',
    date: '',
    time: ''
  })

  // Count-up animation for stats
  const [hasAnimated, setHasAnimated] = useState(false)
  const [counts, setCounts] = useState({ customers: 0, cars: 0, years: 0 })
  const statsRef = useRef(null)

  // Services scroll animation
  const [visibleServices, setVisibleServices] = useState([])
  const servicesRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 3000
          const steps = 60
          const interval = duration / steps
          const targets = { customers: 800, cars: 10450, years: 3 }
          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = step / steps
            setCounts({
              customers: Math.floor(targets.customers * progress),
              cars: Math.floor(targets.cars * progress),
              years: Math.floor(targets.years * progress)
            })
            if (step >= steps) {
              clearInterval(timer)
              setCounts(targets)
            }
          }, interval)
        }
      },
      { threshold: 0.5 }
    )
    if (statsRef.current) {
      observer.observe(statsRef.current)
    }
    return () => observer.disconnect()
  }, [hasAnimated])

  // Services scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-service-index'))
            if (!visibleServices.includes(index)) {
              setVisibleServices(prev => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.2 }
    )
    
    const serviceCards = document.querySelectorAll('[data-service-index]')
    serviceCards.forEach(card => observer.observe(card))
    
    return () => observer.disconnect()
  }, [visibleServices])

  const handleBookClick = (packageName = '') => {
    setSelectedPackage(packageName)
    if (packageName) {
      setFormData(prev => ({ ...prev, plan: packageName }))
    }
    setIsBookingOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const planValue = selectedPackage || formData.plan
    if (!formData.name || !formData.number || !formData.carModel || !planValue || !formData.date || !formData.time || !formData.address || !formData.landmark) {
      alert('Please fill in all fields before submitting.')
      return
    }
    
    // Fire Meta Pixel Lead event
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead');
    }
    
    // Send data to backend
    try {
      const response = await fetch('http://localhost:3000/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.number,
          carModel: formData.carModel,
          plan: formData.plan,
          date: formData.date,
          time: formData.time,
          address: formData.address,
          landmark: formData.landmark,
        }),
      })
      const result = await response.json()
      if (!result.success) {
        console.error('Failed to save lead:', result.error)
      }
    } catch (error) {
      console.error('Error sending to backend:', error)
    }
    
    const phoneNumber = '9685661519'
    const message = `Hello Shree Car Wash,\n\nI would like to book the ${selectedPackage || formData.plan || 'Service'}.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.number}\n*Car Model:* ${formData.carModel}\n*Plan:* ${formData.plan}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Address:* ${formData.address}\n*Landmark:* ${formData.landmark}\n\nPlease confirm my booking.`
    
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setIsBookingOpen(false)
    setSelectedPackage('')
    setFormData({ name: '', number: '', carModel: '', address: '', landmark: '', plan: '', date: '', time: '' })
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-body">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-900/60 backdrop-blur-xl shadow-2xl shadow-black/20">
        <div className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img 
              src="/logo/logo.png" 
              alt="Shree Car Wash Logo" 
              className="h-10 md:h-12 w-auto"
            />
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-colors" href="#services">Services</a>
            <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-colors" href="#pricing">Pricing</a>
            <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-colors" href="#stories">Stories</a>
            <button onClick={() => handleBookClick()} className="cta-gradient text-on-primary font-bold px-6 py-2.5 rounded-full scale-95 active:scale-90 transition-transform">
              WhatsApp Booking
            </button>
          </div>
          {/* Mobile Menu Icon */}
          <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 px-8 py-4 flex flex-col gap-4">
            <a className="text-zinc-400 font-medium" href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a className="text-zinc-400 font-medium" href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a className="text-zinc-400 font-medium" href="#stories" onClick={() => setIsMenuOpen(false)}>Stories</a>
            <button onClick={() => handleBookClick()} className="cta-gradient text-on-primary font-bold px-6 py-2.5 rounded-full">
              WhatsApp Booking
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[60vh] md:h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-40 transition-opacity duration-700" 
            alt="Car showcase" 
            src={heroImages[currentHeroIndex]} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 md:pt-0">
          <div className="max-w-2xl">
            <span className="uppercase tracking-[0.2em] text-primary font-bold mb-2 md:mb-4 block text-xs font-label">Raipur's #1 Detailing Studio</span>
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter mb-3 md:mb-6 leading-[1.1]">
              Ab aapki car hogi <span className="text-primary">chamakdar</span>, ghar baithe!
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl text-on-surface-variant font-light mb-4 md:mb-8 max-w-lg">
              Trusted Doorstep Car Wash in Raipur. We bring the showroom shine to your driveway.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              <button onClick={() => handleBookClick()} className="cta-gradient text-on-primary font-bold px-4 md:px-10 py-2 md:py-5 rounded-full text-xs md:text-lg shadow-2xl shadow-primary/10 transition-all hover:brightness-110 flex items-center justify-center gap-2">
                <MessageCircle className="w-3 h-3 md:w-5 md:h-5" />
                Book Now on WhatsApp
              </button>
              <button 
                onClick={() => window.open('tel:9685661519')}
                className="bg-surface-container-high border border-outline-variant/30 text-on-surface font-semibold px-4 md:px-10 py-2 md:py-5 rounded-full text-xs md:text-lg transition-all hover:bg-surface-variant flex items-center justify-center gap-2"
              >
                <Phone className="w-3 h-3 md:w-5 md:h-5" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section className="py-12 md:py-16 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-12">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                Welcome to <span className="text-primary font-bold">Shree Car Wash & Detailing</span>, Raipur's premier doorstep car cleaning service. 
                We bring professional showroom-quality car care directly to your location - whether it's your home, office, or any convenient spot.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                Our expert team uses premium products and advanced techniques to ensure your vehicle gets the royal treatment it deserves. 
                From basic wash to premium detailing, we offer a range of services tailored to your needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary w-5 h-5" />
                  <span className="text-zinc-300">Professional Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary w-5 h-5" />
                  <span className="text-zinc-300">Premium Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary w-5 h-5" />
                  <span className="text-zinc-300">Doorstep Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary w-5 h-5" />
                  <span className="text-zinc-300">Affordable Pricing</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-zinc-800 max-w-md mx-auto md:max-w-none">
              <video 
                className="w-full h-full object-contain"
                src="/our_videos/vid 2.mp4" 
                controls
                playsInline
                autoPlay
                muted
                loop
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section ref={statsRef} className="py-8 md:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 max-w-lg mx-auto">
            {/* Stat Card 1 */}
            <div className="bg-surface-container-high p-4 md:p-8 rounded-lg flex flex-col items-center text-center">
              <Users className="text-primary text-2xl md:text-4xl mb-2 md:mb-4" />
              <h3 className="text-2xl md:text-4xl font-black text-on-surface">{counts.customers}+</h3>
              <p className="text-on-surface-variant font-medium text-xs md:text-sm">Happy Customers</p>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-surface-container-high p-4 md:p-8 rounded-lg flex flex-col items-center text-center">
              <Car className="text-primary text-2xl md:text-4xl mb-2 md:mb-4" />
              <h3 className="text-2xl md:text-4xl font-black text-on-surface">{counts.cars.toLocaleString()}+</h3>
              <p className="text-on-surface-variant font-medium text-xs md:text-sm">Cars Washed</p>
            </div>
          </div>
          <div className="mt-4 md:mt-8 max-w-lg mx-auto">
            {/* Stat Card 3 - Centered below */}
            <div className="bg-surface-container-high p-4 md:p-8 rounded-lg flex flex-col items-center text-center">
              <Award className="text-primary text-2xl md:text-4xl mb-2 md:mb-4" />
              <h3 className="text-2xl md:text-4xl font-black text-on-surface">{counts.years}+</h3>
              <p className="text-on-surface-variant font-medium text-xs md:text-sm">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-8 md:py-16 bg-surface-container-low" id="services">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Service 1 - Foam Washing */}
            <div 
              data-service-index="0"
              className={`p-4 md:p-8 rounded-lg hover:bg-surface-container-highest transition-colors relative overflow-hidden group ${visibleServices.includes(0) ? 'animate-slide-left' : 'opacity-0'}`}
              style={{ backgroundImage: `url('/card photo/foam wash.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
              <div className="relative z-10">
                <Sparkles className="text-primary text-3xl md:text-4xl mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Foam Washing</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Thick snow foam treatment jo bina scratches ke mitti aur dust ko nikal deta hai.</p>
              </div>
            </div>
            {/* Service 2 - Tyre Cleaning */}
            <div 
              data-service-index="1"
              className={`p-4 md:p-8 rounded-lg hover:bg-surface-container-highest transition-colors relative overflow-hidden group ${visibleServices.includes(1) ? 'animate-slide-right' : 'opacity-0'}`}
              style={{ backgroundImage: `url('/card photo/tyre cleaning.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
              <div className="relative z-10">
                <Car className="text-primary text-3xl md:text-4xl mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Tyre Cleaning & Polishing</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Mud ki deep cleaning aur tyres ko ek naye jaisi glossy black finish dena.</p>
              </div>
            </div>
            {/* Service 3 - Interior Deep Vacuum */}
            <div 
              data-service-index="2"
              className={`p-4 md:p-8 rounded-lg hover:bg-surface-container-highest transition-colors relative overflow-hidden group ${visibleServices.includes(2) ? 'animate-slide-left' : 'opacity-0'}`}
              style={{ backgroundImage: `url('/card photo/deep interior cleaning.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
              <div className="relative z-10">
                <Home className="text-primary text-3xl md:text-4xl mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Interior Deep Vacuum Cleaning</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Seats, carpets aur har chote kone se dhool aur kachre ki complete safai.</p>
              </div>
            </div>
            {/* Service 4 - Exterior Waxing */}
            <div 
              data-service-index="3"
              className={`p-4 md:p-8 rounded-lg hover:bg-surface-container-highest transition-colors relative overflow-hidden group ${visibleServices.includes(3) ? 'animate-slide-right' : 'opacity-0'}`}
              style={{ backgroundImage: `url('/card photo/exteriro waxing.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
              <div className="relative z-10">
                <Award className="text-primary text-3xl md:text-4xl mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Exterior Waxing</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Gadi ki body par ek protective layer jo paint ko chamkaati hai aur dhoop se bachati hai.</p>
              </div>
            </div>
            {/* Service 5 - Gentle Machine Rubbing */}
            <div 
              data-service-index="4"
              className={`p-4 md:p-8 rounded-lg hover:bg-surface-container-highest transition-colors relative overflow-hidden group ${visibleServices.includes(4) ? 'animate-slide-left' : 'opacity-0'}`}
              style={{ backgroundImage: `url('/card photo/gentle machine rubbing.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
              <div className="relative z-10">
                <Clock className="text-primary text-3xl md:text-4xl mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Gentle Machine Rubbing</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Professional machine se halke scratches hatana aur paint ki original shine wapas lana.</p>
              </div>
            </div>
            {/* Service 6 - Glass Cleaning */}
            <div 
              data-service-index="5"
              className={`p-4 md:p-8 rounded-lg hover:bg-surface-container-highest transition-colors relative overflow-hidden group ${visibleServices.includes(5) ? 'animate-slide-right' : 'opacity-0'}`}
              style={{ backgroundImage: `url('/card photo/glass cleaning.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
              <div className="relative z-10">
                <CreditCard className="text-primary text-3xl md:text-4xl mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Glass Cleaning</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Windows aur windshield ki streak-free safai taaki driving ke waqt crystal clear vision mile.</p>
              </div>
            </div>
            {/* Service 7 - Gentle Finish */}
            <div 
              data-service-index="6"
              className={`p-4 md:p-8 rounded-lg hover:bg-surface-container-highest transition-colors relative overflow-hidden group ${visibleServices.includes(6) ? 'animate-slide-left' : 'opacity-0'}`}
              style={{ backgroundImage: `url('/card photo/gentle wash.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
              <div className="relative z-10">
                <Sparkles className="text-primary text-3xl md:text-4xl mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Gentle Finish</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Microfiber se final touch-up taaki gadi par ek bhi paani ka daag na rahe.</p>
              </div>
            </div>
            {/* Service 8 - Doorstep Service */}
            <div 
              data-service-index="7"
              className={`p-4 md:p-8 rounded-lg hover:bg-surface-container-highest transition-colors relative overflow-hidden group ${visibleServices.includes(7) ? 'animate-slide-right' : 'opacity-0'}`}
              style={{ backgroundImage: `url('/card photo/door step service.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
              <div className="relative z-10">
                <Users className="text-primary text-3xl md:text-4xl mb-4 md:mb-6" />
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Doorstep Service</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">Hum aapke ghar ya office pe aapke convenient time pe pahuchte hain.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-12 md:py-24 bg-surface" id="pricing">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Price Plans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-stretch">
            {/* Plan 1 */}
            <div className="bg-surface-container-low p-10 rounded-xl flex flex-col">
              <h3 className="text-2xl font-bold mb-2">BASIC WASH</h3>
              <div className="text-4xl font-black text-primary mb-6">₹349</div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Foam Wash
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Tyre Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Glass Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Interior Wipe
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Gentle Finish
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Foot Mat Wash
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Interior Vacuum
                </li>
              </ul>
              <button onClick={() => handleBookClick('BASIC WASH - ₹349')} className="w-full py-3 md:py-4 rounded-full border border-outline-variant text-on-surface font-bold hover:bg-surface-variant transition-colors text-sm md:text-base">
                Book Basic
              </button>
            </div>
            {/* Plan 2 (Most Popular) */}
            <div className="bg-surface-container-high p-6 md:p-10 rounded-xl flex flex-col relative transform scale-100 md:scale-105 border border-primary/20 shadow-2xl shadow-primary/5">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">SUPER WASH</h3>
              <div className="text-3xl md:text-4xl font-black text-primary mb-4 md:mb-6">₹449</div>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10 flex-grow text-sm">
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Foam Washing
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Tyre Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Tyre Polishing
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Vacuum Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Exterior Waxing
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Glass Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Gentle Finish
                </li>
              </ul>
              <button onClick={() => handleBookClick('SUPER WASH - ₹449')} className="w-full py-3 md:py-4 rounded-full cta-gradient text-on-primary font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-sm md:text-base">
                Book Super
              </button>
            </div>
            {/* Plan 3 */}
            <div className="bg-surface-container-low p-6 md:p-10 rounded-xl flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold mb-2">PREMIUM DELUXE WASH</h3>
              <div className="text-3xl md:text-4xl font-black text-primary mb-4 md:mb-6">₹649</div>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10 flex-grow text-sm">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Foam Washing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Tyre Cleaning & Polishing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Interior Deep Vacuum Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Exterior Waxing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Gentle Machine Rubbing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Glass Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Gentle Finish
                </li>
              </ul>
              <button onClick={() => handleBookClick('PREMIUM DELUXE WASH - ₹649')} className="w-full py-3 md:py-4 rounded-full border border-outline-variant text-on-surface font-bold hover:bg-surface-variant transition-colors text-sm md:text-base">
                Book Deluxe
              </button>
            </div>
            {/* Plan 4 - SUV/MUV/XUV */}
            <div className="bg-surface-container-low p-6 md:p-10 rounded-xl flex flex-col border-2 border-primary/30">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                For Big Vehicles
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">PREMIUM DELUXE WASH</h3>
              <p className="text-primary text-sm mb-2">SUV / MUV / XUV WASH</p>
              <div className="text-3xl md:text-4xl font-black text-primary mb-4 md:mb-6">₹750</div>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10 flex-grow text-sm">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Foam Washing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Tyre Cleaning & Polishing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Interior Deep Vacuum Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Exterior Waxing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Gentle Machine Rubbing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Glass Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Gentle Finish
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Extra Interior Cleaning
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> All Season Matts
                </li>
              </ul>
              <button onClick={() => handleBookClick('SUV / MUV / XUV WASH - ₹750')} className="w-full py-3 md:py-4 rounded-full cta-gradient text-on-primary font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-sm md:text-base">
                Book SUV/MUV/XUV
              </button>
            </div>
          </div>
          <div className="mt-8 md:mt-12 text-center p-4 md:p-6 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
            <p className="text-on-surface-variant text-sm">Note: Customer needs to provide Water Supply and Power Supply for all services</p>
          </div>
        </div>
      </section>

      {/* Our Detailing Process */}
      <section className="py-12 md:py-24 bg-surface-container-low" id="stories">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-12">Our Detailing Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <video 
                className="w-full h-full object-cover"
                src="/our_videos/vid 1.mp4" 
                controls
                playsInline
              />
            </div>
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <video 
                className="w-full h-full object-cover"
                src="/our_videos/vid 3.mp4" 
                controls
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 md:py-24 bg-surface" id="reviews">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <video 
                className="w-full h-full object-cover"
                src="/customer video/review 1.mp4" 
                controls
                playsInline
              />
            </div>
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <video 
                className="w-full h-full object-cover"
                src="/customer video/review 2.mp4" 
                controls
                playsInline
              />
            </div>
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <video 
                className="w-full h-full object-cover"
                src="/customer video/review 3.mp4" 
                controls
                playsInline
              />
            </div>
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <video 
                className="w-full h-full object-cover"
                src="/customer video/review 4.mp4" 
                controls
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="p-6 bg-surface-container-high rounded-lg text-center">
              <Home className="text-primary text-4xl mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-2">Doorstep Service</h4>
              <p className="text-on-surface-variant text-sm">Experience ultimate convenience as our mobile units reach your home or office.</p>
            </div>
            <div className="p-6 bg-surface-container-high rounded-lg text-center">
              <Clock className="text-primary text-4xl mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-2">On-Time Guarantee</h4>
              <p className="text-on-surface-variant text-sm">We value your time. Our detailers arrive exactly when scheduled, every single time.</p>
            </div>
            <div className="p-6 bg-surface-container-high rounded-lg text-center">
              <Sparkles className="text-primary text-4xl mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-2">Professional Cleaning</h4>
              <p className="text-on-surface-variant text-sm">Using pH-neutral foams and premium waxes for a swirl-free, factory finish.</p>
            </div>
            <div className="p-6 bg-surface-container-high rounded-lg text-center">
              <CreditCard className="text-primary text-4xl mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-2">Affordable Pricing</h4>
              <p className="text-on-surface-variant text-sm">Premium results without the premium markup. Transparent pricing for everyone.</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button onClick={() => handleBookClick()} className="cta-gradient text-on-primary font-bold px-8 py-4 rounded-full text-lg shadow-2xl shadow-primary/20 hover:brightness-110 transition-all flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full rounded-t-[2rem] md:rounded-t-[3rem] mt-12 md:mt-20 bg-zinc-950 flex flex-col items-center justify-center py-8 md:py-12 px-4 md:px-6 text-center max-w-7xl mx-auto gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <img 
            src="/logo/logo.png" 
            alt="Shree Car Wash Logo" 
            className="h-8 md:h-10 w-auto"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base">
          <a className="text-zinc-500 hover:text-yellow-400 transition-colors" href="#services">Services</a>
          <a className="text-zinc-500 hover:text-yellow-400 transition-colors" href="#pricing">Pricing</a>
          <a className="text-zinc-500 hover:text-yellow-400 transition-colors" href="#stories">Stories</a>
        </div>
        <div className="h-[1px] w-full max-w-md bg-white/10 my-2 md:my-4"></div>
        <div className="text-xs md:text-sm text-zinc-500">
          © 2024 SHREE CAR WASH & DETAILING. All rights reserved.
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500">
          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
          Raipur, Chhattisgarh
        </div>
      </footer>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsBookingOpen(false)}></div>
          <div className="relative bg-surface-container-low p-6 md:p-8 rounded-2xl max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setIsBookingOpen(false)} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-2">Book Your Service</h2>
            {selectedPackage && (
              <p className="text-primary font-semibold mb-6">{selectedPackage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Customer Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-surface-container-high rounded-lg text-on-surface placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Customer Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 bg-surface-container-high rounded-lg text-on-surface placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Car Model</label>
                  <input 
                    type="text" 
                    required
                    value={formData.carModel}
                    onClick={() => setFormData({...formData, carModel: ''})}
                    onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                    placeholder="e.g., Honda City, Swift, Creta"
                    className="w-full px-4 py-3 bg-surface-container-high rounded-lg text-on-surface placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Select Plan</label>
                  <select 
                    required
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    disabled={!!selectedPackage}
                    className={`w-full px-4 py-3 bg-surface-container-high rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary ${selectedPackage ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <option value="">Select a plan</option>
                    <option value="BASIC WASH - ₹349">BASIC WASH - ₹349</option>
                    <option value="SUPER WASH - ₹449">SUPER WASH - ₹449</option>
                    <option value="PREMIUM DELUXE WASH - ₹649">PREMIUM DELUXE WASH - ₹649</option>
                  <option value="SUV / MUV / XUV WASH - ₹750">Suv/Xuv/Muv - ₹750</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-container-high rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Time</label>
                  <input 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-container-high rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Address</label>
                <input 
                  type="text" 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter your full address"
                  className="w-full px-4 py-3 bg-surface-container-high rounded-lg text-on-surface placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Landmark</label>
                <input 
                  type="text" 
                  required
                  value={formData.landmark}
                  onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                  placeholder="e.g., Near City Hospital"
                  className="w-full px-4 py-3 bg-surface-container-high rounded-lg text-on-surface placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button 
                type="submit" 
                className="w-full cta-gradient text-on-primary font-bold py-4 rounded-full mt-6 hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Submit via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
