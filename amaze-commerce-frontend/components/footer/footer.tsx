import { 
  Mail, 
  MapPin, 
  Phone, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram,
  ArrowRight,
  Heart,
  Sparkles,
  Zap,
  Shield,
  Award,
  Headphones
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Branding", icon: Sparkles },
    { name: "Design", icon: Award },
    { name: "Marketing", icon: Zap },
    { name: "Advertisement", icon: Shield }
  ];

  const company = [
    { name: "About us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Jobs", href: "/jobs" },
    { name: "Press kit", href: "/press" }
  ];

  const socialLinks = [
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com", 
      icon: Linkedin,
      color: "hover:text-blue-600 hover:bg-blue-50"
    },
    { 
      name: "Facebook", 
      href: "https://www.facebook.com", 
      icon: Facebook,
      color: "hover:text-blue-700 hover:bg-blue-50"
    },
    { 
      name: "Twitter", 
      href: "https://www.twitter.com", 
      icon: Twitter,
      color: "hover:text-sky-500 hover:bg-sky-50"
    },
    { 
      name: "Instagram", 
      href: "https://www.instagram.com", 
      icon: Instagram,
      color: "hover:text-pink-600 hover:bg-pink-50"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-100 mt-16">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold text-gradient">
                Amaze<span className="text-yellow-500">Com</span>
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Transforming ideas into exceptional digital experiences. We're passionate about creating innovative solutions that make a difference.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Mail size={16} className="text-indigo-600" />
                </div>
                <a href="mailto:aiarnob23@gmail.com" className="hover:text-indigo-600 transition-colors duration-200">
                  aiarnob23@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Phone size={16} className="text-purple-600" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <MapPin size={16} className="text-pink-600" />
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Headphones size={20} className="mr-2 text-indigo-500" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <li key={service.name}>
                    <a
                      href="#"
                      className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-all duration-200 group"
                    >
                      <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-200">
                        <IconComponent size={14} className="group-hover:text-indigo-600" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {service.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Award size={20} className="mr-2 text-purple-500" />
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-all duration-200 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Sparkles size={20} className="mr-2 text-pink-500" />
              Stay Connected
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 pr-12"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Follow us</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-600 transition-all duration-200 hover:border-transparent hover:scale-110 hover:shadow-lg ${social.color}`}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600">
              <span>© {currentYear} AmazeCom. Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>in Bangladesh</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-yellow-500/10 rounded-full blur-2xl"></div>
    </footer>
  );
}