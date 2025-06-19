import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for small businesses getting started",
      icon: Star,
      features: [
        "Up to 5 supplier requests per month",
        "Basic AI matching",
        "Email support",
        "Standard supplier database",
        "Basic comparison tools"
      ],
      limitations: [
        "Limited to 3 platforms",
        "No priority support",
        "Basic analytics"
      ],
      cta: "Get Started Free",
      popular: false,
      color: "gray"
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "Ideal for growing businesses with regular procurement needs",
      icon: Zap,
      features: [
        "Unlimited supplier requests",
        "Advanced AI matching with 95% accuracy",
        "Priority email & chat support",
        "Access to all platforms (Alibaba, Shopee, Tokopedia, etc.)",
        "Advanced comparison & analytics",
        "Bulk request processing",
        "Custom supplier scoring",
        "Export to PDF/Excel",
        "Team collaboration tools"
      ],
      limitations: [],
      cta: "Start 14-Day Free Trial",
      popular: true,
      color: "orange"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with complex procurement workflows",
      icon: Crown,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations & API access",
        "White-label solutions",
        "Advanced security & compliance",
        "Custom supplier onboarding",
        "Procurement workflow automation",
        "Advanced reporting & insights",
        "SLA guarantees",
        "24/7 phone support"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      color: "teal"
    }
  ];

  const faqs = [
    {
      question: "How does the free plan work?",
      answer: "Our free plan gives you 5 supplier requests per month with basic AI matching. It's perfect for testing our platform and small procurement needs."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees."
    },
    {
      question: "What platforms do you search?",
      answer: "We search across major B2B platforms including Alibaba, Shopee Business, Tokopedia B2B, and many others. Professional and Enterprise plans get access to all platforms."
    },
    {
      question: "How accurate is your AI matching?",
      answer: "Our AI matching has a 95% accuracy rate for Professional and Enterprise plans, and 85% for the free Starter plan."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment."
    }
  ];

  const getColorClasses = (color: string, popular: boolean = false) => {
    if (popular) {
      return {
        border: "border-orange-500",
        bg: "bg-orange-50",
        button: "bg-orange-500 hover:bg-orange-600 text-white",
        icon: "bg-orange-500",
        badge: "bg-orange-500 text-white"
      };
    }
    
    switch (color) {
      case "orange":
        return {
          border: "border-orange-200",
          bg: "bg-white",
          button: "bg-orange-500 hover:bg-orange-600 text-white",
          icon: "bg-orange-500"
        };
      case "teal":
        return {
          border: "border-teal-200",
          bg: "bg-white",
          button: "bg-teal-500 hover:bg-teal-600 text-white",
          icon: "bg-teal-500"
        };
      default:
        return {
          border: "border-gray-200",
          bg: "bg-white",
          button: "bg-gray-800 hover:bg-gray-900 text-white",
          icon: "bg-gray-500"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. Start free and scale as you grow.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            14-day free trial • No credit card required
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const colors = getColorClasses(plan.color, plan.popular);
              
              return (
                <div key={index} className={`relative ${colors.bg} rounded-2xl shadow-xl ${colors.border} border-2 p-8 ${plan.popular ? 'transform scale-105' : ''}`}>
                  {plan.popular && (
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${colors.badge} px-6 py-2 rounded-full text-sm font-semibold`}>
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${colors.icon} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="text-gray-600 ml-2">/{plan.period}</span>}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${colors.button}`}>
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">2,000+</div>
              <div className="text-gray-600">Active Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">500K+</div>
              <div className="text-gray-600">Supplier Matches</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Match Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">$50M+</div>
              <div className="text-gray-600">Procurement Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of businesses saving time and money on procurement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-200">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}