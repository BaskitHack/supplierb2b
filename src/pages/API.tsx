import React from 'react';
import { Code, Key, Zap, Shield, Globe, BarChart3 } from 'lucide-react';

export default function API() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times with global CDN distribution"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption with SOC 2 Type II compliance"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access suppliers from 50+ countries and 20+ platforms"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track usage, performance, and ROI with detailed insights"
    }
  ];

  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/search",
      description: "Search for suppliers based on product requirements",
      example: `{
  "products": [
    {
      "name": "Wireless Headphones",
      "quantity": 1000,
      "unit": "pieces"
    }
  ],
  "platforms": ["alibaba", "shopee"],
  "location": "Southeast Asia"
}`
    },
    {
      method: "GET",
      endpoint: "/api/v1/suppliers/{id}",
      description: "Get detailed information about a specific supplier",
      example: `{
  "id": "supplier_123",
  "name": "TechSupply Co.",
  "rating": 4.8,
  "location": "Guangzhou, China",
  "verified": true
}`
    },
    {
      method: "POST",
      endpoint: "/api/v1/compare",
      description: "Compare multiple suppliers side by side",
      example: `{
  "supplier_ids": ["sup_1", "sup_2", "sup_3"],
  "criteria": ["price", "lead_time", "rating"]
}`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              SupplierScout API
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Integrate our powerful supplier discovery engine directly into your applications. 
              Access real-time supplier data, AI-powered matching, and comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                Get API Key
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Developers
            </h2>
            <p className="text-lg text-gray-600">
              RESTful API with comprehensive documentation and SDKs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key API Endpoints
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to integrate supplier discovery into your workflow
            </p>
          </div>

          <div className="space-y-8">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                    endpoint.method === 'POST' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-lg font-mono text-gray-800">
                    {endpoint.endpoint}
                  </code>
                </div>
                <p className="text-gray-600 mb-4">
                  {endpoint.description}
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{endpoint.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              API Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Transparent, usage-based pricing that scales with your business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">Free</span>
                <span className="text-gray-600 ml-2">up to 1,000 requests/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">1,000 API calls/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Basic support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Standard rate limits</span>
                </li>
              </ul>
              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition-colors">
                Get Started
              </button>
            </div>

            <div className="bg-blue-50 rounded-xl shadow-lg border-2 border-blue-500 p-8 transform scale-105">
              <div className="text-center mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">$0.01</span>
                <span className="text-gray-600 ml-2">per request after free tier</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Unlimited API calls</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Higher rate limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Advanced analytics</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Start Free Trial
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">Custom</span>
                <span className="text-gray-600 ml-2">volume pricing</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Custom rate limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">SLA guarantees</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Custom integrations</span>
                </li>
              </ul>
              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Key className="w-8 h-8 text-blue-200" />
            <Code className="w-8 h-8 text-blue-200" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Building Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get your API key and start integrating in minutes with our comprehensive documentation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200">
              Get API Key
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              View Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}