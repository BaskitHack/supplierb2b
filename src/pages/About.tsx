import React from 'react';
import { Users, Target, Award, Globe, Heart, Lightbulb } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former procurement director at Fortune 500 companies with 15+ years of supply chain experience."
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "AI/ML expert with previous roles at Google and Microsoft, specializing in recommendation systems."
    },
    {
      name: "Priya Patel",
      role: "Head of Product",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Product strategist with deep expertise in B2B platforms and user experience design."
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Full-stack engineer with expertise in scalable systems and data infrastructure."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Precision First",
      description: "We believe in delivering accurate, relevant results that save our customers time and money."
    },
    {
      icon: Heart,
      title: "Customer Obsessed",
      description: "Every decision we make is driven by what's best for our customers and their success."
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "We continuously push the boundaries of what's possible with AI and technology."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "We're building bridges between businesses worldwide, fostering global trade and collaboration."
    }
  ];

  const stats = [
    { number: "2021", label: "Founded" },
    { number: "2,000+", label: "Active Businesses" },
    { number: "50+", label: "Countries Served" },
    { number: "$50M+", label: "Procurement Value" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About SupplierScout
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize B2B procurement by making supplier discovery 
              faster, smarter, and more efficient for businesses worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-xl leading-relaxed mb-8">
              SupplierScout was born from a simple frustration: finding the right suppliers 
              shouldn't take weeks of manual research across dozens of platforms.
            </p>
            
            <p className="leading-relaxed mb-8">
              Our founders, Sarah and Marcus, experienced this pain firsthand while working 
              at large corporations. Sarah spent countless hours as a procurement director 
              manually searching through supplier databases, while Marcus saw how AI could 
              solve this problem at scale.
            </p>

            <p className="leading-relaxed mb-8">
              In 2021, they joined forces to create an AI-powered platform that would 
              revolutionize how businesses discover and connect with suppliers. Today, 
              SupplierScout helps over 2,000 businesses save time and money on procurement, 
              processing millions of supplier matches with 95% accuracy.
            </p>

            <p className="leading-relaxed">
              We're just getting started. Our vision is to become the global standard for 
              B2B supplier discovery, connecting businesses worldwide and fostering 
              international trade through technology.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The passionate people behind SupplierScout
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recognition & Awards
            </h2>
            <p className="text-lg text-gray-600">
              Honored to be recognized by industry leaders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                TechCrunch Disrupt Winner
              </h3>
              <p className="text-gray-600">
                Best B2B Startup 2023
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Award className="w-12 h-12 text-teal-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Forbes 30 Under 30
              </h3>
              <p className="text-gray-600">
                Enterprise Technology 2024
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AI Excellence Award
              </h3>
              <p className="text-gray-600">
                Best AI Application in B2B
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-teal-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Help us revolutionize B2B procurement and connect businesses worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200">
              Start Using SupplierScout
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}