import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, Calendar, Award, Briefcase, Heart } from 'lucide-react';

interface MembershipProps {
  onRegister: () => void;
}

const Membership: React.FC<MembershipProps> = ({ onRegister }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the Namal Alumni Network</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Connect with fellow graduates, access exclusive opportunities, and contribute to the growth of our community.
            </p>
            <button 
              onClick={onRegister}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors text-lg"
            >
              Become a Member
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Membership Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enjoy exclusive access to resources, events, and networking opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Networking Opportunities</h3>
              <p className="text-gray-600">Connect with thousands of alumni worldwide through our exclusive events and online platform.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Exclusive Events</h3>
              <p className="text-gray-600">Access to member-only events, workshops, and professional development seminars.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Briefcase className="text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Career Services</h3>
              <p className="text-gray-600">Access to job postings, career counseling, and mentorship programs.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Recognition Programs</h3>
              <p className="text-gray-600">Opportunities to be featured in alumni publications and receive awards for achievements.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Give Back</h3>
              <p className="text-gray-600">Opportunities to mentor current students and contribute to university development.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Lifetime Access</h3>
              <p className="text-gray-600">Once a member, always a member. Enjoy lifelong access to our community and resources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Membership Options</h2>
            <p className="text-xl text-gray-600">Choose the membership level that works best for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Membership */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Basic Member</h3>
              <p className="text-4xl font-bold text-green-800 mb-6">Free</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={20} />
                  <span>Access to alumni directory</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={20} />
                  <span>Monthly newsletter</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={20} />
                  <span>Basic event invitations</span>
                </li>
              </ul>
              <button 
                onClick={onRegister}
                className="w-full px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-bold rounded-md transition-colors"
              >
                Join Free
              </button>
            </div>
            
            {/* Premium Membership */}
            <div className="bg-green-800 text-white p-8 rounded-lg relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-green-900 px-4 py-2 rounded-bl-lg rounded-tr-lg font-bold">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Member</h3>
              <p className="text-4xl font-bold mb-6">$50<span className="text-lg">/year</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-yellow-400 mr-3 flex-shrink-0" size={20} />
                  <span>All Basic benefits</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-yellow-400 mr-3 flex-shrink-0" size={20} />
                  <span>Exclusive networking events</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-yellow-400 mr-3 flex-shrink-0" size={20} />
                  <span>Career services access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-yellow-400 mr-3 flex-shrink-0" size={20} />
                  <span>Mentorship program</span>
                </li>
              </ul>
              <button 
                onClick={onRegister}
                className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors"
              >
                Join Premium
              </button>
            </div>
            
            {/* Lifetime Membership */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Lifetime Member</h3>
              <p className="text-4xl font-bold text-green-800 mb-6">$500<span className="text-lg">/once</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={20} />
                  <span>All Premium benefits</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={20} />
                  <span>VIP event access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={20} />
                  <span>Recognition plaque</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={20} />
                  <span>Lifetime directory listing</span>
                </li>
              </ul>
              <button 
                onClick={onRegister}
                className="w-full px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-bold rounded-md transition-colors"
              >
                Join Lifetime
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">What Our Members Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 italic">
                "The alumni network has been instrumental in my career growth. The connections I've made have opened doors I never imagined."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-800 font-bold">SA</span>
                </div>
                <div>
                  <h4 className="font-bold text-green-800">Sarah Ahmad</h4>
                  <p className="text-gray-500">Class of 2015</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 italic">
                "Being part of this community has given me opportunities to give back and mentor the next generation of students."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-800 font-bold">MK</span>
                </div>
                <div>
                  <h4 className="font-bold text-green-800">Muhammad Khan</h4>
                  <p className="text-gray-500">Class of 2012</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 italic">
                "The professional development workshops and networking events have been invaluable for my career advancement."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-800 font-bold">FM</span>
                </div>
                <div>
                  <h4 className="font-bold text-green-800">Fatima Malik</h4>
                  <p className="text-gray-500">Class of 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8">
            Take the first step towards connecting with thousands of Namal alumni worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onRegister}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors text-lg"
            >
              Join Now
            </button>
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-transparent hover:bg-green-700 border-2 border-yellow-400 text-yellow-400 font-bold rounded-md transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;