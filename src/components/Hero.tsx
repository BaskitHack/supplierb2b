import React from 'react';
import { ArrowRight, Zap, TrendingUp, Users, Clock } from 'lucide-react';

interface HeroProps {
  onSearchSubmit: (query: string) => void;
}

export default function Hero({ onSearchSubmit }: HeroProps) {
  const handleFindSuppliers = () => {
    onSearchSubmit('find suppliers');
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden min-h-screen">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-200/40 to-orange-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-1/3 w-4 h-4 bg-orange-400/60 rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-teal-500/60 rounded-full animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-6 h-6 border-2 border-orange-300/50 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-8 bg-teal-300/40 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
        
        {/* Moving Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200/50 to-transparent animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        </div>
        
        {/* Subtle Grid Pattern with Movement */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animationDuration: '10s'
            }}
          ></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/5 left-1/6 w-1 h-1 bg-orange-400/70 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-3/5 right-1/6 w-1 h-1 bg-teal-500/70 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/5 left-2/5 w-1 h-1 bg-orange-500/60 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10 relative">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 bg-green-50/80 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200/50 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              AI-Powered Supplier Matching
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find the{' '}
                <span className="text-teal-600 relative">
                  Right Supplier
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full opacity-30"></div>
                </span>{' '}
                Fast and Smart
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Simplify your internal procurement workflow with AI recommendations. 
                Match with trusted suppliers, compare based on delivery and pricing, 
                and create POs directly from one place.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleFindSuppliers}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group hover:scale-105 transform"
              >
                Find Suppliers
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group">
                <div className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">500+</div>
                <div className="text-sm text-gray-600 font-medium">Verified Suppliers</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">95%</div>
                <div className="text-sm text-gray-600 font-medium">Match Accuracy</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">2.5x</div>
                <div className="text-sm text-gray-600 font-medium">Faster Procurement</div>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative z-10">
            {/* Main Dashboard Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:shadow-3xl border border-white/20">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-orange-50/80 text-orange-600 px-3 py-1 rounded-full text-sm font-medium border border-orange-200/50">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  Live
                </div>
              </div>

              {/* Procurement Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Procurement</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">Rp3,726,045</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 animate-bounce" style={{ animationDuration: '2s' }} />
                  12% from last month
                </div>
              </div>

              {/* Supplier List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors duration-200 group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                      T
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">TechnoSupply Co.</div>
                      <div className="text-xs text-gray-600">Electronics • 5-7 days</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">Rp36,750</div>
                    <div className="text-xs text-orange-600 font-medium">AI Match</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors duration-200 group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                      G
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Global Parts Ltd.</div>
                      <div className="text-xs text-gray-600">Hardware • 3-5 days</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">Rp32,700</div>
                    <div className="text-xs text-green-600 font-medium">Best Price</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-teal-600 text-white p-3 rounded-full shadow-lg animate-bounce border-4 border-white/20 backdrop-blur-sm" style={{ animationDuration: '2s' }}>
              <Zap className="w-5 h-5" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100/50 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-orange-500 animate-pulse" />
                <span className="font-medium text-gray-900">2,000+ businesses</span>
              </div>
            </div>

            {/* Additional floating particles around dashboard */}
            <div className="absolute top-1/4 -left-8 w-2 h-2 bg-orange-400/60 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-1/4 -right-8 w-2 h-2 bg-teal-500/60 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}