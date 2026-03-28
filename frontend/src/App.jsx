import { useState } from 'react'
import { 
  Menu, MessageCircle, Phone, Home, Clock, CreditCard, 
  Car, Users, Award, PlayCircle, CheckCircle, ArrowRight,
  ChevronRight, Sparkles, MapPin
} from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-on-surface font-body">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-900/60 backdrop-blur-xl shadow-2xl shadow-black/20">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-black tracking-tighter text-zinc-100 font-headline">
            SHREE CAR WASH & DETAILING
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-colors" href="#services">Services</a>
            <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-colors" href="#pricing">Pricing</a>
            <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-colors" href="#stories">Stories</a>
            <button className="cta-gradient text-on-primary font-bold px-6 py-2.5 rounded-full scale-95 active:scale-90 transition-transform">
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
            <button className="cta-gradient text-on-primary font-bold px-6 py-2.5 rounded-full">
              WhatsApp Booking
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-40" 
            alt="close-up of a high-end luxury sports car in a dark professional studio with cinematic rim lighting and reflections" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMzzSO4ZARtFPeh-sMU7YuLghrCJ8SxOXORwfwNvvQu3EARBUr9pfJUjo5p8U4pzIjPRH_usuQrhMwZLc_uf1Dybkrr2KYaixuN3PczcKyoFixKe6MUXCPf49eTkK0bsZI378pNbKBTgA_p8SliTwvIoju8h80JQoKtIxtly0RqFInTtdReBJ8ycmfbk2LZj1ahTNgLzKtlZEtzlXwJOVYa_tI5a07nk3EBcil61cOCArJ0z7t54d9lOgbzPeNYTyMDXzL65KntQ" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="uppercase tracking-[0.2em] text-primary font-bold mb-6 block text-sm font-label">Raipur's #1 Detailing Studio</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
              Ab aapki car hogi <span className="text-primary">chamakdar</span>, ghar baithe!
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant font-light mb-10 max-w-lg">
              Trusted Doorstep Car Wash in Raipur. We bring the showroom shine to your driveway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="cta-gradient text-on-primary font-bold px-10 py-5 rounded-full text-lg shadow-2xl shadow-primary/10 transition-all hover:brightness-110 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Book Now on WhatsApp
              </button>
              <button className="bg-surface-container-high border border-outline-variant/30 text-on-surface font-semibold px-10 py-5 rounded-full text-lg transition-all hover:bg-surface-variant flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Stats */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat Card 1 */}
            <div className="bg-surface-container-high p-10 rounded-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              <Users className="text-primary text-5xl mb-4" />
              <h3 className="text-4xl font-black text-on-surface mb-2">800+</h3>
              <p className="text-on-surface-variant font-medium">Happy Customers</p>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-surface-container-high p-10 rounded-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              <Car className="text-primary text-5xl mb-4" />
              <h3 className="text-4xl font-black text-on-surface mb-2">10450+</h3>
              <p className="text-on-surface-variant font-medium">Cars Washed</p>
            </div>
            {/* Stat Card 3 */}
            <div className="bg-surface-container-high p-10 rounded-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              <Award className="text-primary text-5xl mb-4" />
              <h3 className="text-4xl font-black text-on-surface mb-2">3 Years</h3>
              <p className="text-on-surface-variant font-medium">Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-surface-container-low" id="services">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Precision in Every Polish</h2>
              <p className="text-on-surface-variant text-lg">Why car enthusiasts in Raipur trust SHREE for their prized possessions.</p>
            </div>
            <div className="h-1 w-24 bg-primary mb-2 hidden md:block"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-8 bg-surface-container-high rounded-lg hover:bg-surface-container-highest transition-colors">
              <Home className="text-primary text-4xl mb-6" />
              <h4 className="text-xl font-bold mb-3">Doorstep Service</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Experience ultimate convenience as our mobile units reach your home or office.</p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-surface-container-high rounded-lg hover:bg-surface-container-highest transition-colors">
              <Clock className="text-primary text-4xl mb-6" />
              <h4 className="text-xl font-bold mb-3">On-Time Guarantee</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">We value your time. Our detailers arrive exactly when scheduled, every single time.</p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-surface-container-high rounded-lg hover:bg-surface-container-highest transition-colors">
              <Sparkles className="text-primary text-4xl mb-6" />
              <h4 className="text-xl font-bold mb-3">Professional Cleaning</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Using pH-neutral foams and premium waxes for a swirl-free, factory finish.</p>
            </div>
            {/* Feature 4 */}
            <div className="p-8 bg-surface-container-high rounded-lg hover:bg-surface-container-highest transition-colors">
              <CreditCard className="text-primary text-4xl mb-6" />
              <h4 className="text-xl font-bold mb-3">Affordable Pricing</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Premium results without the premium markup. Transparent pricing for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-surface" id="pricing">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Select Your Shine</h2>
            <p className="text-on-surface-variant">Tailored detailing packages for every need.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1 */}
            <div className="bg-surface-container-low p-10 rounded-xl flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Basic Wash</h3>
              <div className="text-4xl font-black text-primary mb-6">₹349</div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Exterior Foam Wash
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Tyre Dressing
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Glass Cleaning
                </li>
              </ul>
              <button className="w-full py-4 rounded-full border border-outline-variant text-on-surface font-bold hover:bg-surface-variant transition-colors">
                Book Basic
              </button>
            </div>
            {/* Plan 2 (Most Popular) */}
            <div className="bg-surface-container-high p-10 rounded-xl flex flex-col relative transform scale-105 border border-primary/20 shadow-2xl shadow-primary/5">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Super Wash</h3>
              <div className="text-4xl font-black text-primary mb-6">₹449</div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Basic Wash +
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Interior Vacuuming
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Dashboard Polishing
                </li>
                <li className="flex items-center gap-3 text-on-surface">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Floor Mat Cleaning
                </li>
              </ul>
              <button className="w-full py-4 rounded-full cta-gradient text-on-primary font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                Book Super
              </button>
            </div>
            {/* Plan 3 */}
            <div className="bg-surface-container-low p-10 rounded-xl flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Premium Deluxe Wash</h3>
              <div className="text-4xl font-black text-primary mb-6">₹649</div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Super Wash +
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Liquid Wax Coating
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> Underbody Wash
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" /> AC Vent Sanitization
                </li>
              </ul>
              <button className="w-full py-4 rounded-full border border-outline-variant text-on-surface font-bold hover:bg-surface-variant transition-colors">
                Book Deluxe
              </button>
            </div>
          </div>
          <div className="mt-12 text-center p-6 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
            <p className="text-primary font-bold">SUV / MUV / XUV range starts from ₹750 onwards.</p>
            <p className="text-on-surface-variant text-sm mt-2">Note: Customer needs to provide Water Supply and Power Supply.</p>
          </div>
        </div>
      </section>

      {/* Detailing Process (Video Placeholders) */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-extrabold mb-12 text-center">Our Detailing Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <img 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" 
                alt="detailer using high-pressure foam cannon on a black luxury sedan in a dark garage" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwPSH9XULYK53i9Hz5SZSWd-HHG8Hcs28zg6zUcLS2NAqCndgw91_cpG1qt19hd5GgVzCAXkgT9twH8YqJRITCkSWyTkwSlge-VWN45aaqOrUJp6GGO3s7DxfNrU7ps7KPq7sQ-pCfiV-5sNF6ndgmCt2za94g5AeVwbUThZaoAuNZSuGlEQ1Por5Smi4Tw4aTY9BPLkNt_y203E8t9rSSos1ANZgYd8h4rzgY4SzrIchEID8-CwMrltRcxWCH6NHmCREVfrs6yw" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="text-white text-5xl opacity-80" />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <img 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" 
                alt="close-up of a professional orbital polisher tool on a glossy car hood with bright light reflections" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnQ9DTnXN-r6jer08kLtkWr3gyusmwpyLM4rkh69wMkFJweJi48UTBZlw6l7IDnRHaQlRCZh2OTxH3_4i-KLsR1k5eKfIEczGDeW3JYnhIeil20Y8N_lgTzHp5htQTi_6_ncfehJc9uU4JwEOWoGPp5y7ew73zmbNr3dL0KwEMx8vIoopX1uTKki1hbTPjPhd8K0bDs5RjOq0bArdPb6MG_PQUrZsUK5mMb9-Mce9diU8-bUc4Ts1dHEex3LseEmrz55H-A5XsQQ" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="text-white text-5xl opacity-80" />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <img 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" 
                alt="extreme close-up of car wheels being scrubbed with a professional brush and specialized cleaner" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKDiC13AR6jBkQfKK7pt4hjwAkxdbOXCz9saP-M4HqaMUHRAKAo-R-Zf8oQ89QwWZ99q2Nn9ovzN_ZUr9SJxuMccFFj-92hl2dOqQ8wOca_Um-sZ9BpCkOyrX3KiQGqN8biRAN0uXlq1tFSFiVfkKRBL--FkLlgiQkvH2GXWZbs5wHgef4XgItQoxaHFT-YdmJQsCp3LwZUt9OrS5JP8EH94eaPm9xjfY_riRVpbCabvoaFFN3my44O6JP2FwkqirDigtaViLl4w" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="text-white text-5xl opacity-80" />
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer bg-zinc-800">
              <img 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" 
                alt="detailer vacuuming the premium leather interior of a high-end luxury car" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8-ntm4XDpdLpMsDH6FGamAVXu_XFsA82OFjntg44mti4PmLBaUVwdrNG0s3NbqYY84Tsj-vh2VmI1RUJnrTND2khWIXxLGFH3BXVtaibE7b_qOZ6Um2euH3V1jNRVFuZMZ3IRVylh2OENVkbWZIOqpdtxbIBJ1xtc9YUMiDAh0-NStKTCgAD_Tdxy4FqvV3rI7fP7D6tJSDId9bFsg9Ie6K6SKDdd_Y2Hg0X6-Kdw0kJHJIi2tpnkvfRyx3ZvSdwix73ZNySAZg" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="text-white text-5xl opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-24 bg-surface" id="stories">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-extrabold mb-12">Customer Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial Video 1 */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
              <img 
                className="w-full h-full object-cover" 
                alt="smiling car owner giving a thumbs up next to their gleaming clean luxury car in a residential driveway" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbNxSEQc-uGH3os0RlLDmJ3Rc20N_o3fVAY16wp8k4pg8uVoL4KSwdI6m8AiKyfOWQqc7l5GHCGbOSpEKEorWbv07ewy7Bc2WaEG6OI9nWHMm9Cx-QAjCTuEauq5Fv7-W2CgcBLRbxBPQ5iurQnZuaO-vjjYZuV4mypdFJFcmTRVrBH96L8jZBQTe8IIbSpFNO6XStAb5rPfvITEDaza-nlghJV85hKz5XWGwJa3OBaiLIGK7uCQemiTzMFn_p-QHH9R7c_Z0Y6g" 
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <div className="bg-primary/90 p-4 rounded-full transition-transform group-hover:scale-110">
                  <PlayCircle className="text-on-primary text-4xl" />
                </div>
                <p className="mt-4 font-bold text-white text-lg">"The best doorstep service in Raipur!"</p>
              </div>
            </div>
            {/* Testimonial Video 2 */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
              <img 
                className="w-full h-full object-cover" 
                alt="clean luxury SUV parked outside a modern home with soft evening lighting" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBXCRLhvp3BJtfUhfGIRw5VqmT8oEuC40smx00-kM1PrsuwxhGHIkcyr2LGp9VbPe7SSDnwq0TkqkWLRRzuLtZ45Na150i27PRDu3UlXQYQxCsFKwvqC1cou7NUIu2h7a07HCrO0qbwkfUBGu7OmNX6s--0xu5iGFIQUVGFJkrA9jOWkXkMld0337lqEeLH7zfScJuqm5StXCGKRFbEfJa3wivHVk-0x3RChVCZSUqL89Wc5zjA9LfNkIofEg1HqHM74lPyH0PQA" 
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <div className="bg-primary/90 p-4 rounded-full transition-transform group-hover:scale-110">
                  <PlayCircle className="text-on-primary text-4xl" />
                </div>
                <p className="mt-4 font-bold text-white text-lg">"Saved me hours of waiting at a garage."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] mt-20 bg-zinc-950 flex flex-col items-center justify-center py-12 px-6 text-center max-w-7xl mx-auto gap-6">
        <div className="text-lg font-bold text-zinc-100 font-headline tracking-tighter">
          SHREE CAR WASH & DETAILING
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-zinc-500 hover:text-yellow-400 transition-colors" href="#services">Services</a>
          <a className="text-zinc-500 hover:text-yellow-400 transition-colors" href="#pricing">Pricing</a>
          <a className="text-zinc-500 hover:text-yellow-400 transition-colors" href="#stories">Stories</a>
          <a className="text-zinc-500 hover:text-yellow-400 transition-colors" href="#">WhatsApp Booking</a>
        </div>
        <div className="h-[1px] w-full max-w-md bg-white/10 my-4"></div>
        <div className="font-manrope text-sm text-zinc-500">
          © 2024 SHREE CAR WASH & DETAILING. All rights reserved.
        </div>
        <div className="flex items-center gap-2 text-zinc-500">
          <MapPin className="w-4 h-4" />
          Raipur, Chhattisgarh
        </div>
      </footer>
    </div>
  )
}

export default App
