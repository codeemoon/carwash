import { useState, useEffect, useRef } from 'react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPoster, setCurrentPoster] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [counts, setCounts] = useState({ customers: 0, cars: 0, years: 0 })
  const statsRef = useRef(null)

  // Auto-rotate poster carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Count-up animation for stats (only once using Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          // Animate counts over 3 seconds
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

  return (
    <div className="min-h-screen bg-background text-on-surface font-body">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <img 
              src="/logo/ChatGPT Image Mar 27, 2026, 05_31_27 PM.png" 
              alt="Shree Car Wash Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight text-lg">
            <a className="text-slate-600 dark:text-slate-400 hover:text-amber-600 transition-colors hover:scale-105 transition-transform duration-300" href="#services">Services</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-amber-600 transition-colors hover:scale-105 transition-transform duration-300" href="#pricing">Pricing</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-amber-600 transition-colors hover:scale-105 transition-transform duration-300" href="#stories">Stories</a>
          </div>
          
          <a className="gold-gradient text-white px-6 py-2.5 rounded-md font-headline font-bold shadow-md hover:scale-105 transition-all active:scale-95 hidden md:inline-block" href="https://wa.me/91XXXXXXXXXX">
            Book on WhatsApp
          </a>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 px-8 py-4 shadow-lg">
            <div className="flex flex-col gap-4 font-headline font-bold">
              <a className="text-slate-600 dark:text-slate-400 hover:text-amber-600" href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a className="text-slate-600 dark:text-slate-400 hover:text-amber-600" href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
              <a className="text-slate-600 dark:text-slate-400 hover:text-amber-600" href="#stories" onClick={() => setIsMenuOpen(false)}>Stories</a>
              <a className="gold-gradient text-white px-6 py-2.5 rounded-md font-headline font-bold text-center" href="https://wa.me/91XXXXXXXXXX">
                Book on WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Auto-rotating Poster Carousel */}
      <div className="relative w-full h-[220px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden mt-0 md:mt-2">
        {['p1.webp', 'p2.webp', 'p3.webp', 'p4.webp', 'p5.webp'].map((poster, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentPoster === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={`/poster/${poster}`}
              alt={`Poster ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentPoster(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentPoster === index ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      <main className="">
        {/* Hero Section */}
        <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[870px] flex items-start md:items-center pt-8 md:pt-0 overflow-hidden bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-extrabold text-on-surface leading-tight tracking-tight text-left">
                Ab aapki car hogi <span className="text-primary">chamakdar</span>, ghar baithe!
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-secondary max-w-lg leading-relaxed text-left mt-2">
                Trusted Doorstep Car Wash in Raipur. Experience showroom-level shine at your convenience without leaving your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3">
                <a className="gold-gradient text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-headline font-extrabold text-sm sm:text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2" href="https://wa.me/91XXXXXXXXXX">
                  <span className="material-symbols-outlined text-xl">chat</span>
                  Book Now on WhatsApp
                </a>
                <a className="bg-white border-2 border-outline-variant text-on-surface px-6 sm:px-8 py-3 sm:py-4 rounded-md font-headline font-extrabold text-sm sm:text-lg hover:bg-surface-container transition-all flex items-center justify-center gap-2" href="tel:+91XXXXXXXXXX">
                  <span className="material-symbols-outlined text-xl">call</span>
                  Call Now
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 relative hidden md:block">
              <div className="absolute -inset-4 bg-primary-container/20 rounded-xl blur-3xl -z-10 animate-pulse"></div>
              <img 
                alt="Premium Detailing" 
                className="rounded-xl shadow-2xl w-full object-cover aspect-[4/3] transform hover:rotate-1 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU6OGvqqyWdEmbfrVSNtxzphwzxyTBip_VSy9koh5no9kJXw5eU_4fvGBf8DsT17kefMZfDpdYCteuV_CONWR1wwQS-IGxBmUkf9gXAu66ksI1lPqb77sY_-LcLEXYTRPsOXpSd6Cynft-HGJMc1LGxfkS2BJAwaJNGAwkmtCJbpvdZ4lj68DZ_Dscaia3xW8O0vV2gjNU3h-VjynvF4s2IiBHAd_Ewe92igVQWiOlVfKNLIIiA-iGCTVWzNRuBLWS06N4qwN8Xg"
              />
            </div>
          </div>
          {/* Asymmetric Background Element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -skew-x-12 translate-x-1/2 -z-0"></div>
        </section>

        {/* Trust Stats Section */}
        <section ref={statsRef} className="bg-surface py-12 sm:py-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-lg ghost-border flex items-center gap-6 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl">groups</span>
              </div>
              <div>
                <div className="text-3xl font-headline font-extrabold text-on-surface">{counts.customers}+</div>
                <div className="text-secondary font-medium">Happy Customers</div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg ghost-border flex items-center gap-6 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl">directions_car</span>
              </div>
              <div>
                <div className="text-3xl font-headline font-extrabold text-on-surface">{counts.cars.toLocaleString()}+</div>
                <div className="text-secondary font-medium">Cars Washed</div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg ghost-border flex items-center gap-6 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl">verified</span>
              </div>
              <div>
                <div className="text-3xl font-headline font-extrabold text-on-surface">{counts.years}+</div>
                <div className="text-secondary font-medium">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 bg-surface-container-low" id="services">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-4 sm:mb-8">
              <span className="text-xl sm:text-2xl md:text-3xl text-primary font-bold tracking-widest uppercase font-headline">Why Choose Us</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <div className="bg-surface-container-lowest p-3 sm:p-6 md:p-8 rounded-lg group hover:bg-primary-container transition-all duration-500 cursor-pointer">
                <span className="material-symbols-outlined text-2xl sm:text-4xl text-primary mb-2 sm:mb-4 group-hover:text-white transition-colors">home_pin</span>
                <h3 className="text-xs sm:text-lg font-headline font-bold mb-1 sm:mb-2 group-hover:text-white">Doorstep Service</h3>
                <p className="text-xs sm:text-sm text-secondary group-hover:text-white/80 transition-colors hidden md:block">We come to you, anywhere in Raipur.</p>
              </div>
              <div className="bg-surface-container-lowest p-3 sm:p-6 md:p-8 rounded-lg group hover:bg-primary-container transition-all duration-500 cursor-pointer">
                <span className="material-symbols-outlined text-2xl sm:text-4xl text-primary mb-2 sm:mb-4 group-hover:text-white transition-colors">schedule</span>
                <h3 className="text-xs sm:text-lg font-headline font-bold mb-1 sm:mb-2 group-hover:text-white">On-Time Guarantee</h3>
                <p className="text-xs sm:text-sm text-secondary group-hover:text-white/80 transition-colors hidden md:block">Precision timing because we value your schedule.</p>
              </div>
              <div className="bg-surface-container-lowest p-3 sm:p-6 md:p-8 rounded-lg group hover:bg-primary-container transition-all duration-500 cursor-pointer">
                <span className="material-symbols-outlined text-2xl sm:text-4xl text-primary mb-2 sm:mb-4 group-hover:text-white transition-colors">clean_hands</span>
                <h3 className="text-xs sm:text-lg font-headline font-bold mb-1 sm:mb-2 group-hover:text-white">Professional Cleaning</h3>
                <p className="text-xs sm:text-sm text-secondary group-hover:text-white/80 transition-colors hidden md:block">Trained experts using eco-friendly products.</p>
              </div>
              <div className="bg-surface-container-lowest p-3 sm:p-6 md:p-8 rounded-lg group hover:bg-primary-container transition-all duration-500 cursor-pointer">
                <span className="material-symbols-outlined text-2xl sm:text-4xl text-primary mb-2 sm:mb-4 group-hover:text-white transition-colors">payments</span>
                <h3 className="text-xs sm:text-lg font-headline font-bold mb-1 sm:mb-2 group-hover:text-white">Affordable Pricing</h3>
                <p className="text-xs sm:text-sm text-secondary group-hover:text-white/80 transition-colors hidden md:block">Transparent, flat-rate prices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 bg-surface-container-lowest" id="pricing">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-4 sm:mb-8">
              <span className="text-xl sm:text-2xl md:text-3xl text-primary font-bold tracking-widest uppercase font-headline">Our Packages</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Basic Wash */}
              <div className="relative bg-surface p-6 sm:p-10 rounded-lg ghost-border flex flex-col hover:shadow-2xl transition-all duration-500">
                <div className="mb-4 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-headline font-bold text-on-surface mb-2">BASIC WASH – ₹349</h3>
                </div>
                <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-10 flex-grow text-sm sm:text-base">
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Foam Wash
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Tyre Cleaning
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Glass Cleaning
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Interior Wipe
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Gentle Finish
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Foot Mat Wash
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Interior Vacuum
                  </li>
                </ul>
                <a className="gold-gradient text-white text-center py-3 sm:py-4 rounded-md font-headline font-bold hover:scale-105 transition-all" href="https://wa.me/91XXXXXXXXXX">Book Now</a>
              </div>

              {/* Super Wash */}
              <div className="relative bg-surface-container-low p-6 sm:p-10 rounded-lg border-2 border-primary-container flex flex-col md:scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 gold-gradient text-white px-4 sm:px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
                <div className="mb-4 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-headline font-bold text-on-surface mb-2">SUPER WASH – ₹449</h3>
                </div>
                <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-10 flex-grow text-sm sm:text-base">
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Foam Washing
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Tyre Cleaning
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Tyre Polishing
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Vacuum Cleaning
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Exterior Waxing
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Glass Cleaning
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Gentle Finish
                  </li>
                </ul>
                <a className="gold-gradient text-white text-center py-3 sm:py-4 rounded-md font-headline font-bold hover:scale-105 transition-all" href="https://wa.me/91XXXXXXXXXX">Book Now</a>
              </div>

              {/* Premium Deluxe */}
              <div className="relative bg-surface p-6 sm:p-10 rounded-lg ghost-border flex flex-col hover:shadow-2xl transition-all duration-500">
                <div className="mb-4 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-headline font-bold text-on-surface mb-2">PREMIUM DELUXE – ₹649</h3>
                </div>
                <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-10 flex-grow text-sm sm:text-base">
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Foam Washing
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Tyre Cleaning & Polishing
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Interior Deep Vacuum
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Exterior Waxing
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Gentle Machine Rubbing
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Glass Cleaning
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-secondary">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl">check_circle</span>
                    Gentle Finish
                  </li>
                </ul>
                <a className="gold-gradient text-white text-center py-3 sm:py-4 rounded-md font-headline font-bold hover:scale-105 transition-all" href="https://wa.me/91XXXXXXXXXX">Book Now</a>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Stories Section */}
        <section className="py-24 px-8 bg-surface-container-low" id="stories">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">Customer Stories</span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface">Hear from Our Happy Clients</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="group relative aspect-video bg-surface-container-highest rounded-lg overflow-hidden shadow-lg border border-outline-variant/30 cursor-pointer">
                <img 
                  alt="Customer Testimonial 1" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcLWWqRlo9Gs7hdG8N1bAAxizyuqiJnA4YP7RA0s6n7EfTIXUmPJvrHigPcGRL3lDj9dnWbfWz4cDxT63hqD9NAMRIo16ry9IkO2APIL6zTsEKTim6X5w-7BJDIoNrxCMbWuh0Md46c3LxrFuqmMCuaYOXLcVqVr27n_1sHD-W52zz02No3vHkXzsJu0VnejhiVrWY8kO94UqMHyk9mVVTvb4i7YKw7D2mXMCQhZeW3eZMNIY4Lz_aNOz-98t2ZHTu9sdTqMQgHA"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/30">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-5xl fill-1">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-headline font-bold text-lg">"The best doorstep service in Raipur!"</p>
                  <p className="text-sm opacity-90">— Rahul S., SUV Owner</p>
                </div>
              </div>
              <div className="group relative aspect-video bg-surface-container-highest rounded-lg overflow-hidden shadow-lg border border-outline-variant/30 cursor-pointer">
                <img 
                  alt="Customer Testimonial 2" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1vSelZpyyWkiplMFivHxyG25hXunyrwfSf5DqhV4PjahUwzLerMWI0itNw8hVlDgUivZZlkrrL8i2HIZfSePeTD6E3vfeRjqvf_VU_4A74Ue_fy2S5jAB5Lm76GLvvw9G89MVMG3Sc7riP1bnLYMRo9O5WTYVw_wsZg1HODggXpFM6bWQshkBYX_VF9LuBSpaSZ7RVuID7-pbJSCWvq6W9IY3L4cjKFZyAqFetkVYbWVkI3FWetMgACYYSwd2jvnEUWpa5M2voA"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/30">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-5xl fill-1">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-headline font-bold text-lg">"Dashboard polish is exceptional."</p>
                  <p className="text-sm opacity-90">— Priya K., Luxury Sedan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* See Us in Action Section */}
        <section className="py-24 px-8 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">See Us in Action</span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface">Our Detailing Process</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative aspect-[9/16] bg-surface rounded-lg overflow-hidden shadow-md border border-outline-variant/20 cursor-pointer">
                <img 
                  alt="Detailing Action 1" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdhpdA-6AWBcBtHI1icYFH6pjg9I2yVr6r0haYj7ELcEE2TUXimDQNHPiQAxnlJqKm3D3NXToROIpTTCYS_KvO6cNnFCxaSPpNopPPbsHbNnOB5fUlmbj32fDdF1vxcRqc_9iUPcs-apKrdHgYnb7zK5sWTHbNaQhIt-YJMH0174oWi-h0A4McA6EFPXFPUNHmxjrWeujaftkVlhJAGLEqA_JOJzdZvk7d69w3lYxyozbz9P6H_KR6pZ9u7nULx7_cdNyRpUaJWQ"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl opacity-80 group-hover:scale-125 transition-transform">play_circle</span>
                </div>
              </div>
              <div className="group relative aspect-[9/16] bg-surface rounded-lg overflow-hidden shadow-md border border-outline-variant/20 cursor-pointer">
                <img 
                  alt="Detailing Action 2" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfgb3PHjdeKBnacB_cEAcR3Ne47AMOIZ94QoGQRXS5fs4lPrJdqsX-m0MRxvHxPg5vaGWEOsW5xkTJMFd9bQyTYCKgeF6IfYwZ7ZWMMJf4CNxt3e0bgPWFTQoMjNCZpT0TuCjNN6EZur5B6JHNv4kSw7Q2kd3zABHIV9AqToqm9cWs04MOopVW5EimQjqL6m294I84pvaNcTPHhLSu_HI3PQLi8B2B2cJMWFMjizJw1v5rhSV1zf4iur4UlhJE_WDWwYuwLGGN8Q"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl opacity-80 group-hover:scale-125 transition-transform">play_circle</span>
                </div>
              </div>
              <div className="group relative aspect-[9/16] bg-surface rounded-lg overflow-hidden shadow-md border border-outline-variant/20 cursor-pointer">
                <img 
                  alt="Detailing Action 3" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_u2uzAweViSK6L1lLlbTSUYaeyautyqYsrjnaNB59qhTsts70wvLEzeAl8vtahiTprkIED_i9E5Qe0C1oHH-83kDDFTuEgwGbdwkMOa_1OIhsIyE-su8eIMhs5FXkKvEcXyzJNoPrM6s4ilJf2AQv4ZngtYxhsBXn4CL9I5vZ004dk58i_6pa6zQO585k-WK1j5TKF5WbDDHgHawfV9F5kjsDz6Yt3mWpgQneXwfPKNxG3tiv6QNPuzMNbHM6iZzcqcSswKjmZg"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl opacity-80 group-hover:scale-125 transition-transform">play_circle</span>
                </div>
              </div>
              <div className="group relative aspect-[9/16] bg-surface rounded-lg overflow-hidden shadow-md border border-outline-variant/20 cursor-pointer">
                <img 
                  alt="Detailing Action 4" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKlMN_brLmp0cdInRHmGB-eQ4eJsQHsHqbLgo5rcy0uwCdvEutGyPvlna1HPivGE0XXgoCCsKGTaCEKDSX9ZP2m7ib7oV9kZGQPJ1hcCl8WKnlRjqh5x9l-_B7WCS_ix4hgx1vNjuyg_t6Ul0IKzZeoDzL0g3dMZOhznAOiHUQSog6b4WP4gNci72MxLt3ZnCkdP0D2S3Ps8lSW1bEkl9kc3PuXtEHDwh4prOuIatfbkErmJdz8yH0PVHT8C68EgA3IHCv5P8JTw"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl opacity-80 group-hover:scale-125 transition-transform">play_circle</span>
                </div>
              </div>
            </div>
            <div className="mt-16 text-center">
              <a className="gold-gradient text-white px-10 py-5 rounded-md font-headline font-extrabold text-xl shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3" href="https://wa.me/91XXXXXXXXXX">
                <span className="material-symbols-outlined">rocket_launch</span>
                Transform Your Car Today
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-manrope font-black text-slate-900 dark:text-white text-2xl mb-2">SHREE CAR WASH</h2>
            <p className="text-slate-500 font-inter text-sm max-w-xs">
              Premium doorstep detailing services in Raipur. We bring the sparkle back to your driveway.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-8">
              <a className="text-slate-400 hover:text-slate-900 dark:hover:text-white hover:underline decoration-amber-500 underline-offset-4 transition-all" href="#">Privacy Policy</a>
              <a className="text-slate-400 hover:text-slate-900 dark:hover:text-white hover:underline decoration-amber-500 underline-offset-4 transition-all" href="#">Terms of Service</a>
              <a className="text-slate-400 hover:text-slate-900 dark:hover:text-white hover:underline decoration-amber-500 underline-offset-4 transition-all" href="#">Contact Us</a>
            </div>
            <div className="flex items-center gap-2 text-amber-600 font-semibold">
              <span className="material-symbols-outlined">location_city</span>
              Raipur, Chhattisgarh.
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="font-inter text-sm text-slate-500">© 2024 Shree Car Wash & Detailing. Raipur, Chhattisgarh. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
