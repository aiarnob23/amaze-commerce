import Image from "next/image";
import Link from "next/link";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c963?w=400&h=400&fit=crop&crop=face",
      bio: "10+ years in e-commerce innovation"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Tech visionary driving our platform"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Creating beautiful user experiences"
    },
    {
      name: "David Kim",
      role: "VP of Operations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Ensuring seamless operations"
    }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Customer First",
      description: "Every decision we make puts our customers at the center, ensuring exceptional experiences."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation",
      description: "We constantly evolve and embrace new technologies to deliver cutting-edge solutions."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality",
      description: "We maintain the highest standards in everything we do, from products to service."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community",
      description: "Building strong relationships and giving back to the communities we serve."
    }
  ];

  const milestones = [
    { year: "2020", title: "Company Founded", description: "Started with a dream to revolutionize online shopping" },
    { year: "2021", title: "First Million Users", description: "Reached our first major milestone in customer growth" },
    { year: "2022", title: "Global Expansion", description: "Launched in 15 countries across 3 continents" },
    { year: "2023", title: "Sustainability Initiative", description: "Committed to carbon-neutral operations" },
    { year: "2024", title: "AI Integration", description: "Launched personalized shopping with AI technology" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Crafting the Future of
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> E-Commerce</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              We're not just another online store. We're a passionate team dedicated to creating exceptional shopping experiences that connect people with products they love, backed by innovation, quality, and genuine care.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                Join Our Journey
              </button>
              <button className="bg-white/80 backdrop-blur-sm border border-white/50 text-gray-800 px-8 py-4 rounded-xl hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                What started as a simple idea in 2020 has grown into a global platform serving millions of customers worldwide. We saw the need for a more personal, intuitive, and trustworthy online shopping experience.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                From our humble beginnings in a small office to becoming a leading e-commerce platform, we've never lost sight of our core mission: making online shopping delightful, accessible, and meaningful for everyone.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to be trusted by millions of customers who rely on us for quality products, exceptional service, and innovative solutions that make their lives better.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center"
                  alt="Our team working together"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do and shape the culture of our organization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 text-center group hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind our success, each bringing unique expertise and dedication to our mission.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 text-center group hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-indigo-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Journey</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Key milestones that have shaped our company and defined our path forward.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all duration-500">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the difference of shopping with a company that truly cares about you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/main/products/1">
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                  Start Shopping
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/30 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        </div>
      </div>
    </div>
  );
}