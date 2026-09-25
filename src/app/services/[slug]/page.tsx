import Link from 'next/link';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return [
    { slug: 'cardiology' },
    { slug: 'maternity' },
    { slug: 'pediatrics' },
    { slug: 'orthopedics' },
    { slug: 'oncology' },
    { slug: 'neurology' },
    { slug: 'dental' },
    { slug: 'pharmacy' },
  ];
};

const departments: Record<string, any> = {
  cardiology: {
    name: 'Cardiology',
    desc: 'Advanced cardiac care with state-of-the-art catheterization lab and ICU monitoring.',
    image: '/images/cardiology.jpg',
    longDesc: 'Our Cardiology department offers comprehensive services for the diagnosis, treatment, and prevention of heart diseases. Equipped with a state-of-the-art catheterization lab, we perform life-saving interventions 24/7.',
    doctors: [
      { name: 'Dr. James Kariuki', role: 'Head of Cardiology', credentials: 'MBChB, MMed, FACC' },
      { name: 'Dr. Sarah Onyango', role: 'Interventional Cardiologist', credentials: 'MBChB, MRCP' },
    ]
  },
  maternity: {
    name: 'Maternity',
    desc: 'Comprehensive antenatal, delivery, and postnatal care in our luxury birthing suites.',
    image: '/images/maternity-ward.jpg',
    longDesc: 'Experience the joy of motherhood in our luxury maternity suites. We provide full-spectrum care from antenatal classes to safe deliveries (normal and CS), supported by a fully equipped Neonatal ICU.',
    doctors: [
      { name: 'Dr. Amina Hassan', role: 'Lead Obstetrician & Gynecologist', credentials: 'MBChB, MMed (Obs/Gyn)' },
      { name: 'Dr. Grace Mutua', role: 'Fetal Medicine Specialist', credentials: 'MBChB, FRCOG' },
    ]
  },
  pediatrics: {
    name: 'Pediatrics',
    desc: 'Specialized children\'s healthcare from neonatal intensive care to adolescent medicine.',
    image: '/images/pediatrics.jpg',
    longDesc: 'We provide specialized, child-friendly care for infants, children, and adolescents. Our pediatrics wing is designed to be welcoming and less intimidating, ensuring your child receives the best care comfortably.',
    doctors: [
      { name: 'Dr. Peter Otieno', role: 'Consultant Pediatrician', credentials: 'MBChB, MMed (Paed)' },
      { name: 'Dr. Linet Wanjiku', role: 'Neonatologist', credentials: 'MBChB, Fellowship Neonatology' },
    ]
  },
  orthopedics: {
    name: 'Orthopedics',
    desc: 'Joint replacements, sports medicine, and trauma surgery by leading specialists.',
    image: '/images/orthopedics.jpg',
    longDesc: 'Our Orthopedics department specializes in the diagnosis and treatment of conditions involving the musculoskeletal system. We offer advanced joint replacements, arthroscopic surgeries, and dedicated physiotherapy.',
    doctors: [
      { name: 'Dr. David Kiprop', role: 'Orthopedic Surgeon', credentials: 'MBChB, MMed (Ortho)' },
      { name: 'Dr. John Ndungu', role: 'Sports Medicine Specialist', credentials: 'MBChB, MSc Sports Med' },
    ]
  },
  oncology: {
    name: 'Oncology',
    desc: 'Full-spectrum cancer care including chemotherapy, radiation therapy, and surgical oncology.',
    image: '/images/oncology.jpg',
    longDesc: 'We provide compassionate, comprehensive cancer care using the latest treatment protocols. Our facility houses advanced linear accelerators for precise radiation therapy and a comfortable chemotherapy lounge.',
    doctors: [
      { name: 'Dr. Florence Mutuku', role: 'Medical Oncologist', credentials: 'MBChB, MMed, ESMO' },
      { name: 'Dr. Robert Omondi', role: 'Radiation Oncologist', credentials: 'MBChB, FC Rad Onc (SA)' },
    ]
  },
  neurology: {
    name: 'Neurology',
    desc: 'Expert diagnosis and treatment of neurological disorders with advanced imaging.',
    image: '/images/neurology.jpg',
    longDesc: 'Our Neurology team is equipped to handle complex disorders of the brain, spinal cord, and nerves. Supported by advanced MRI and CT imaging, we provide accurate diagnosis and effective management plans.',
    doctors: [
      { name: 'Dr. Catherine Njuguna', role: 'Consultant Neurologist', credentials: 'MBChB, MMed, PhD' },
      { name: 'Dr. Edwin Mwangi', role: 'Neurosurgeon', credentials: 'MBChB, FCS (ECSA) Neuro' },
    ]
  },
  dental: {
    name: 'Dental Care',
    desc: 'Cosmetic dentistry, orthodontics, and oral surgery in our modern dental wing.',
    image: '/images/dental.jpg',
    longDesc: 'Achieve a healthy, beautiful smile in our sparkling clean dental clinic. We offer a full range of services from routine checkups to complex oral surgeries, implants, and orthodontic treatments.',
    doctors: [
      { name: 'Dr. Samuel Kiptoo', role: 'Consultant Dentist', credentials: 'BDS, MDS' },
      { name: 'Dr. Maryanne Njeri', role: 'Orthodontist', credentials: 'BDS, MOrth' },
    ]
  },
  pharmacy: {
    name: 'Pharmacy',
    desc: '24/7 in-house pharmacy with comprehensive medication management and counseling.',
    image: '/images/pharmacy-lab.jpg',
    longDesc: 'Our fully stocked, 24/7 pharmacy ensures that you have immediate access to prescribed medications. Our pharmacists are always available to provide counseling on dosage, interactions, and side effects.',
    doctors: [
      { name: 'Dr. Kelvin Ochieng', role: 'Chief Pharmacist', credentials: 'BPharm, MPharm (Clin)' },
      { name: 'Dr. Alice Wangari', role: 'Clinical Pharmacist', credentials: 'BPharm' },
    ]
  }
};

export default function DepartmentPage({ params }: { params: { slug: string } }) {
  const dept = departments[params.slug];
  
  if (!dept) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Navigation (simplified for inner pages) */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-slate-900">MedCore<span className="text-emerald-600"> Hospital</span></span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/#services" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition">&larr; Back to Services</Link>
              <Link href="/login" className="px-5 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition">
                Staff Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Department</span>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">{dept.name}</h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">{dept.longDesc}</p>
              <a href="/#contact" className="px-8 py-3.5 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30 inline-block">
                Book an Appointment
              </a>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={dept.image} alt={dept.name} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">👨‍⚕️</span>
            Available Specialists in {dept.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dept.doctors.map((doc: any, i: number) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition bg-white">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-2xl border-2 border-emerald-100">
                    {dept.name === 'Pharmacy' ? '💊' : '🩺'}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{doc.name}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{doc.role}</p>
                    <p className="text-slate-500 text-xs mt-2">{doc.credentials}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
