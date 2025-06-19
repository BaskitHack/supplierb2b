import React from 'react';
import { Search, Bot, Users, CheckCircle, ArrowRight, Zap, Target, Shield } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Submit Your Request",
      description: "Tell us what products you need, your quantity requirements, preferred platforms, and delivery timeline.",
      details: ["Product specifications", "Quantity and units", "Target pricing", "Delivery preferences"]
    },
    {
      icon: Bot,
      title: "AI-Powered Matching",
      description: "Our advanced AI analyzes thousands of suppliers across multiple platforms to find the best matches for your needs.",
      details: ["Real-time price comparison", "Quality score analysis", "Delivery time optimization", "Platform reputation check"]
    },
    {
      icon: Users,
      title: "Review & Compare",
      description: "Get a curated list of verified suppliers with detailed comparisons, ratings, and direct contact options.",
      details: ["Side-by-side comparison", "Supplier verification status", "Customer reviews & ratings", "Direct communication tools"]
    },
    {
      icon: CheckCircle,
      title: "Connect & Purchase",
      description: "Contact suppliers directly, negotiate terms, and complete your purchase with confidence.",
      details: ["WhatsApp & email integration", "Negotiation support", "Purchase order generation", "Transaction tracking"]
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get supplier matches in under 30 seconds with our AI-powered search engine."
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "95% accuracy rate in matching your requirements with the right suppliers."
    },
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "All suppliers are pre-verified for quality, reliability, and business legitimacy."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How SupplierScout Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-powered platform revolutionizes supplier discovery, 
            making procurement faster, smarter, and more efficient than ever before.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-gray-600">
              From request to purchase in minutes, not days
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                        Step {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
                      <div className="aspect-video bg-gradient-to-br from-orange-100 to-teal-100 rounded-xl flex items-center justify-center">
                        <step.icon className="w-16 h-16 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-12">
                    <ArrowRight className="w-8 h-8 text-orange-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose SupplierScout?
            </h2>
            <p className="text-lg text-gray-600">
              Built for modern businesses that demand efficiency and results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-teal-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Procurement?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of businesses already saving time and money with SupplierScout
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Finding Suppliers
          </button>
        </div>
      </div>
    </div>
  );
}