import Link from 'next/link';

const ServicesPage = () => {
  const services = [
    {
      name: "AI Models",
      href: "/services/ai-models",
      description: "Custom AI model development and implementation",
      icon: "🤖",
      featured: true
    },
    {
      name: "App Development",
      href: "/services/app-development",
      description: "Mobile and web application development",
      icon: "📱"
    },
    {
      name: "Content Writing",
      href: "/services/content-writing",
      description: "Professional content creation and copywriting",
      icon: "✍️"
    },
    {
      name: "Cyber Security",
      href: "/services/cyber-security",
      description: "Security audits and protection solutions",
      icon: "🔒"
    },
    {
      name: "Game Development",
      href: "/services/game-development",
      description: "Interactive game design and development",
      icon: "🎮"
    },
    {
      name: "Graphics Design",
      href: "/services/graphics-design",
      description: "Visual design and branding solutions",
      icon: "🎨"
    },
    {
      name: "SEO Optimisation",
      href: "/services/seo-optimisation",
      description: "Search engine optimization and digital marketing",
      icon: "📈"
    },
    {
      name: "UI/UX Design",
      href: "/services/uiux-design",
      description: "User interface and experience design",
      icon: "💻"
    },
    // {
    //   name: "Video Editing",
    //   href: "/services/video-editing",
    //   description: "Professional video production and editing",
    //   icon: "🎬"
    // },
    {
      name: "Website Development",
      href: "/services/website-development",
      description: "Custom website design and development",
      icon: "🌐"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business grow and succeed in the modern digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className={`group block p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                service.featured
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className={`text-xl font-semibold mb-3 ${
                service.featured 
                  ? 'text-white' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {service.name}
              </h3>
              <p className={`${
                service.featured 
                  ? 'text-purple-100' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}>
                {service.description}
              </p>
              <div className={`mt-4 inline-flex items-center text-sm font-medium ${
                service.featured 
                  ? 'text-white' 
                  : 'text-purple-600 dark:text-purple-400'
              }`}>
                Learn more &rarr;
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and find the perfect solution for your business needs.
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl shadow-lg text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:scale-105"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;