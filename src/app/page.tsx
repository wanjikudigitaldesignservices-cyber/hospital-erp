import Link from 'next/link';

export default function HospitalWebsite() {
  const services = [
    { icon: '🫀', name: 'Cardiology', desc: 'Advanced cardiac care with state-of-the-art catheterization lab and ICU monitoring.' },
    { icon: '🤰', name: 'Maternity', desc: 'Comprehensive antenatal, delivery, and postnatal care in our luxury birthing suites.' },
    { icon: '👶', name: 'Pediatrics', desc: 'Specialized children&apos;s healthcare from neonatal intensive care to adolescent medicine.' },
    { icon: '🦴', name: 'Orthopedics', desc: 'Joint replacements, sports medicine, and trauma surgery by leading specialists.' },
    { icon: '🔬', name: 'Oncology', desc: 'Full-spectrum cancer care including chemotherapy, radiation therapy, and surgical oncology.' },
    { icon: '🧠', name: 'Neurology', desc: 'Expert diagnosis and treatment of neurological disorders with advanced imaging.' },
    { icon: '🦷', name: 'Dental Care', desc: 'Cosmetic dentistry, orthodontics, and oral surgery in our modern dental wing.' },
    { icon: '💊', name: 'Pharmacy', desc: '24/7 in-house pharmacy with comprehensive medication management and counseling.' },
  ];

  const stats = [
    { value: '50,000+', label: 'Patients Served Annually' },
    { value: '120+', label: 'Specialist Doctors' },
    { value: '3', label: 'Branches in Nairobi' },
    { value: '24/7', label: 'Emergency Services' },
  ];

  const branches = [
    { name: 'MedCore Karen', address: 'Karen Road, off Langata Road, Nairobi', phone: '+254 700 100 200', hours: 'Open 24/7' },
    { name: 'MedCore Kitisuru', address: 'Kitisuru Road, Westlands, Nairobi', phone: '+254 700 100 300', hours: 'Open 24/7' },
    { name: 'MedCore Ruaka', address: 'Limuru Road, Ruaka Town, Kiambu', phone: '+254 700 100 400', hours: '6:00 AM - 10:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              <span className="text-xl font-bold text-slate-900">MedCore<span className="text-emerald-600"> Hospital</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">Services</a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">About Us</a>
              <a href="#branches" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">Our Branches</a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="tel:+254700100100" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                <span>📞</span> +254 700 100 100
              </a>
              <Link
                href="/login"
                className="px-5 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-semibold mb-6">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Nairobi&apos;s Leading Private Hospital Group
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  World-Class
                  <span className="text-emerald-400"> Healthcare</span>
                  <br />Right Here in Nairobi
                </h1>
                <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
                  At MedCore Hospital, we combine cutting-edge medical technology with compassionate care. 
                  Our team of over 120 specialist doctors is dedicated to providing you and your family 
                  with the highest standard of healthcare across our three modern facilities.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#contact" className="px-8 py-3.5 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-500 shadow-xl shadow-emerald-600/30 transition-all active:scale-95">
                    Book Appointment
                  </a>
                  <a href="#services" className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all">
                    Our Services
                  </a>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="w-full h-[420px] bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-3xl border border-emerald-500/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-8xl">🏥</div>
                    <p className="text-emerald-300 font-medium">MedCore Hospital Group</p>
                    <p className="text-slate-400 text-sm">Caring for Kenya Since 2015</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Medical Services</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              Comprehensive healthcare services delivered by Kenya&apos;s finest medical professionals using internationally certified equipment and protocols.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-emerald-100 transition">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Choose <span className="text-emerald-600">MedCore</span>?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Founded in 2015, MedCore Hospital has grown from a single clinic in Karen to become 
                one of Nairobi&apos;s most trusted private hospital networks. We are committed to making 
                world-class healthcare accessible to every Kenyan family.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'JCI Accredited Standards', desc: 'Internationally recognized quality and safety benchmarks.' },
                  { title: 'NHIF &amp; Major Insurance Partners', desc: 'Seamless processing with Jubilee, AAR, Britam, Madison, CIC, and more.' },
                  { title: 'State-of-the-Art Equipment', desc: 'MRI, CT Scan, Digital X-Ray, Ultrasound, and fully equipped theatres.' },
                  { title: 'M-Pesa &amp; Card Payments', desc: 'Flexible payment options including mobile money and insurance billing.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 lg:p-12 border border-emerald-200">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚕️</div>
                  <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                  <p className="text-slate-600 mt-3 leading-relaxed">
                    To provide accessible, affordable, and world-class healthcare to the people of East Africa 
                    through innovation, compassion, and medical excellence.
                  </p>
                </div>
                <div className="text-center pt-6 border-t border-emerald-200">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                  <p className="text-slate-600 mt-3 leading-relaxed">
                    To become Africa&apos;s most trusted healthcare brand, setting new standards for 
                    patient-centered care across the continent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Branches</h2>
            <p className="mt-4 text-slate-500">Conveniently located across Nairobi to serve you better.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branches.map((branch, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-5xl mb-2">🏥</div>
                    <p className="font-bold text-lg">{branch.name}</p>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">📍</span>
                    <p className="text-sm text-slate-600">{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📞</span>
                    <a href={`tel:${branch.phone}`} className="text-sm text-emerald-600 font-medium hover:underline">{branch.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🕐</span>
                    <p className="text-sm text-slate-600">{branch.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Whether you need to book an appointment, inquire about our services, or have an emergency,
                our team is here for you around the clock.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">📞</div>
                  <div>
                    <p className="text-sm text-slate-400">Emergency Hotline</p>
                    <a href="tel:+254700100100" className="font-semibold text-emerald-400 hover:underline">+254 700 100 100</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">📧</div>
                  <div>
                    <p className="text-sm text-slate-400">General Inquiries</p>
                    <a href="mailto:info@medcore.co.ke" className="font-semibold text-emerald-400 hover:underline">info@medcore.co.ke</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">💬</div>
                  <div>
                    <p className="text-sm text-slate-400">WhatsApp</p>
                    <a href="https://wa.me/254700100100" className="font-semibold text-emerald-400 hover:underline">Chat with us</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
              <h3 className="text-xl font-bold mb-6">Book an Appointment</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                <input type="tel" placeholder="Phone Number (e.g. 0712 345 678)" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option value="">Select Department</option>
                  <option>Cardiology</option>
                  <option>Maternity</option>
                  <option>Pediatrics</option>
                  <option>Orthopedics</option>
                  <option>Oncology</option>
                  <option>Dental Care</option>
                  <option>General Consultation</option>
                </select>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option value="">Select Branch</option>
                  <option>MedCore Karen</option>
                  <option>MedCore Kitisuru</option>
                  <option>MedCore Ruaka</option>
                </select>
                <textarea placeholder="Additional notes or symptoms..." rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none" />
                <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/30 transition-all active:scale-[0.98]">
                  Request Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🏥</span>
                <span className="text-lg font-bold text-white">MedCore</span>
              </div>
              <p className="text-sm leading-relaxed">Nairobi&apos;s most trusted private hospital group, providing world-class healthcare since 2015.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-emerald-400 transition">Our Services</a></li>
                <li><a href="#about" className="hover:text-emerald-400 transition">About Us</a></li>
                <li><a href="#branches" className="hover:text-emerald-400 transition">Branches</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Insurance Partners</h4>
              <ul className="space-y-2 text-sm">
                <li>NHIF / SHA</li>
                <li>Jubilee Insurance</li>
                <li>AAR Healthcare</li>
                <li>Britam, Madison, CIC</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Emergency</h4>
              <p className="text-sm mb-2">Available 24/7</p>
              <a href="tel:+254700100100" className="text-emerald-400 font-bold text-lg hover:underline">+254 700 100 100</a>
              <p className="text-xs mt-4 text-slate-500">Licensed by the Kenya Medical Practitioners and Dentists Council</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MedCore Hospital Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
