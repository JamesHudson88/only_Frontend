import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, GraduationCap, Mail, Phone, Linkedin, Globe, User, Award, ChevronRight, X, Building2 } from 'lucide-react';

interface Alumni {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  graduationYear: number;
  degreeProgram: string;
  currentPosition?: string;
  currentLocation?: string;
  company?: string;
  membershipType: string;
  bio?: string;
  achievements?: string[];
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  profilePicture?: string;
  willingToMentor?: boolean;
}

const AlumniDirectory: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: '',
    degreeProgram: '',
    location: '',
    membershipType: '',
    willingToMentor: false
  });
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  // Enhanced sample alumni data with achievements and mentoring status
  const sampleAlumni: Alumni[] = [
    {
      _id: '1',
      firstName: 'Ahmed',
      lastName: 'Khan',
      email: 'ahmed.khan@techcorp.com',
      phone: '+92 300 1234567',
      graduationYear: 2018,
      degreeProgram: 'BS Computer Science',
      currentPosition: 'Senior Software Engineer',
      currentLocation: 'Lahore, Pakistan',
      company: 'TechCorp Solutions',
      membershipType: 'Premium',
      bio: 'Passionate software engineer with 6+ years of experience in full-stack development. Currently leading a team of developers building enterprise solutions.',
      achievements: [
        'Recipient of the Tech Excellence Award 2022',
        'Published research on AI applications in healthcare',
        'Speaker at multiple international tech conferences'
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Machine Learning'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ahmed-khan',
        github: 'https://github.com/ahmedkhan'
      },
      profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: true
    },
    {
      _id: '2',
      firstName: 'Sarah',
      lastName: 'Ahmed',
      email: 'sarah.ahmed@digitalmarketing.com',
      phone: '+92 321 9876543',
      graduationYear: 2019,
      degreeProgram: 'BBA Marketing',
      currentPosition: 'Marketing Director',
      currentLocation: 'Karachi, Pakistan',
      company: 'Digital Marketing Pro',
      membershipType: 'Premium',
      bio: 'Marketing strategist with expertise in digital campaigns and brand development. Helping businesses establish strong online presence and customer engagement.',
      achievements: [
        'Increased company revenue by 200% through digital campaigns',
        'Featured in Forbes 30 Under 30 Marketing Professionals',
        'Established award-winning social media strategies'
      ],
      skills: ['Digital Marketing', 'Brand Strategy', 'SEO', 'Content Creation', 'Data Analytics'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarah-ahmed',
        website: 'https://sarahmarketing.com'
      },
      profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: true
    },
    {
      _id: '3',
      firstName: 'Ali',
      lastName: 'Hassan',
      email: 'ali.hassan@investcorp.com',
      phone: '+92 333 5555555',
      graduationYear: 2020,
      degreeProgram: 'BS Electrical Engineering',
      currentPosition: 'Financial Analyst',
      currentLocation: 'Islamabad, Pakistan',
      company: 'InvestCorp Bank',
      membershipType: 'Premium',
      bio: 'Financial analyst with expertise in investment research and portfolio management. Passionate about sustainable finance and technology investments.',
      achievements: [
        'Developed investment strategy with 25% annual returns',
        'Certified Financial Analyst (CFA)',
        'Published research on emerging markets'
      ],
      skills: ['Financial Analysis', 'Portfolio Management', 'Excel', 'Python', 'Data Visualization'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ali-hassan'
      },
      profilePicture: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: false
    },
    {
      _id: '4',
      firstName: 'Fatima',
      lastName: 'Malik',
      email: 'fatima.malik@healthtech.com',
      phone: '+92 300 8765432',
      graduationYear: 2017,
      degreeProgram: 'BS Biomedical Engineering',
      currentPosition: 'Product Manager',
      currentLocation: 'Rawalpindi, Pakistan',
      company: 'HealthTech Innovations',
      membershipType: 'Lifetime',
      bio: 'Experienced product manager driving innovation in healthcare technology. Specializing in medical device development and user-centered design.',
      achievements: [
        'Launched award-winning health monitoring device',
        'Patented wearable technology for patient care',
        'Mentored 10+ startups in health tech'
      ],
      skills: ['Product Management', 'Biomedical Engineering', 'UX Design', 'Agile Methodologies'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/fatima-malik',
        website: 'https://fatimamalik.com'
      },
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: true
    },
    {
      _id: '5',
      firstName: 'Usman',
      lastName: 'Siddiqui',
      email: 'usman.siddiqui@fintech.com',
      phone: '+92 321 4567890',
      graduationYear: 2021,
      degreeProgram: 'BS Computer Science',
      currentPosition: 'Blockchain Developer',
      currentLocation: 'Karachi, Pakistan',
      company: 'CryptoSecure',
      membershipType: 'Basic',
      bio: 'Blockchain enthusiast developing secure decentralized applications. Passionate about financial inclusion through technology.',
      achievements: [
        'Developed smart contract for secure transactions',
        'Contributed to open-source blockchain projects'
      ],
      skills: ['Solidity', 'Ethereum', 'JavaScript', 'Smart Contracts', 'Web3'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/usman-siddiqui',
        github: 'https://github.com/usmansiddiqui'
      },
      profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: false
    },
    {
      _id: '6',
      firstName: 'Ayesha',
      lastName: 'Raza',
      email: 'ayesha.raza@consulting.com',
      phone: '+92 333 1231234',
      graduationYear: 2016,
      degreeProgram: 'BBA Management',
      currentPosition: 'Strategy Consultant',
      currentLocation: 'Lahore, Pakistan',
      company: 'GlobalConsult Partners',
      membershipType: 'Lifetime',
      bio: 'Strategy consultant helping organizations optimize operations and achieve sustainable growth. Expert in change management and process improvement.',
      achievements: [
        'Led transformation project for Fortune 500 client',
        'Certified Lean Six Sigma Black Belt',
        'Published in Harvard Business Review'
      ],
      skills: ['Strategic Planning', 'Change Management', 'Lean Six Sigma', 'Business Analysis'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ayesha-raza'
      },
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: true
    },
    {
      _id: '7',
      firstName: 'Zain',
      lastName: 'Malik',
      email: 'zain.malik@datasci.com',
      phone: '+92 300 9876543',
      graduationYear: 2022,
      degreeProgram: 'BS Data Science',
      currentPosition: 'Data Scientist',
      currentLocation: 'Islamabad, Pakistan',
      company: 'DataInsights Inc.',
      membershipType: 'Basic',
      bio: 'Data scientist focused on predictive modeling and big data analytics. Passionate about leveraging data for business impact.',
      achievements: [
        'Built predictive model with 95% accuracy',
        'Winner of regional data science hackathon'
      ],
      skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/zain-malik',
        github: 'https://github.com/zainmalik'
      },
      profilePicture: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: false
    },
    {
      _id: '8',
      firstName: 'Hina',
      lastName: 'Saeed',
      email: 'hina.saeed@edtech.com',
      phone: '+92 321 5556666',
      graduationYear: 2015,
      degreeProgram: 'BS Education Technology',
      currentPosition: 'EdTech Entrepreneur',
      currentLocation: 'Peshawar, Pakistan',
      company: 'LearnEasy Solutions',
      membershipType: 'Premium',
      bio: 'Founder of an EdTech startup revolutionizing online learning in Pakistan. Committed to accessible education for all.',
      achievements: [
        'Raised $2M in seed funding for EdTech startup',
        'Recognized as Top EdTech Innovator 2024',
        'Scaled platform to 100,000+ users'
      ],
      skills: ['Entrepreneurship', 'EdTech', 'Product Development', 'Leadership'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/hina-saeed',
        website: 'https://learneasysolutions.com'
      },
      profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: true
    },
    {
      _id: '9',
      firstName: 'Omar',
      lastName: 'Farooq',
      email: 'omar.farooq@energy.com',
      phone: '+92 333 7778888',
      graduationYear: 2019,
      degreeProgram: 'BS Mechanical Engineering',
      currentPosition: 'Renewable Energy Engineer',
      currentLocation: 'Faisalabad, Pakistan',
      company: 'GreenEnergy Co.',
      membershipType: 'Basic',
      bio: 'Engineer focused on sustainable energy solutions. Working on solar and wind energy projects to promote clean energy adoption.',
      achievements: [
        'Designed solar plant reducing carbon emissions by 20%',
        'Received Green Energy Innovation Award'
      ],
      skills: ['Renewable Energy', 'Solar Design', 'Project Management', 'CAD'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/omar-farooq'
      },
      profilePicture: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: false
    },
    {
      _id: '10',
      firstName: 'Sana',
      lastName: 'Iqbal',
      email: 'sana.iqbal@nonprofit.org',
      phone: '+92 300 2223333',
      graduationYear: 2018,
      degreeProgram: 'BS Social Sciences',
      currentPosition: 'NGO Program Director',
      currentLocation: 'Multan, Pakistan',
      company: 'Hope Foundation',
      membershipType: 'Lifetime',
      bio: 'Dedicated to social impact through education and community development programs. Leading initiatives for underprivileged communities.',
      achievements: [
        'Impacted 50,000+ lives through education programs',
        'Received Social Impact Leader Award 2023',
        'Expanded NGO operations to 5 cities'
      ],
      skills: ['Program Management', 'Community Development', 'Fundraising', 'Public Speaking'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sana-iqbal',
        website: 'https://hopefoundation.org'
      },
      profilePicture: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400',
      willingToMentor: true
    }
  ];

  useEffect(() => {
    // Simulate API call with sample data
    setAlumni(sampleAlumni);
    setLoading(false);
  }, []);

  useEffect(() => {
    filterAlumni();
  }, [alumni, searchTerm, filters]);

  const filterAlumni = () => {
    let filtered = alumni;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(person =>
        `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.currentPosition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.currentLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.degreeProgram.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply all other filters
    if (filters.graduationYear) {
      filtered = filtered.filter(person => person.graduationYear.toString() === filters.graduationYear);
    }
    if (filters.degreeProgram) {
      filtered = filtered.filter(person => person.degreeProgram === filters.degreeProgram);
    }
    if (filters.location) {
      filtered = filtered.filter(person => 
        person.currentLocation?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.membershipType) {
      filtered = filtered.filter(person => person.membershipType === filters.membershipType);
    }
    if (filters.willingToMentor) {
      filtered = filtered.filter(person => person.willingToMentor);
    }

    setFilteredAlumni(filtered);
  };

  const getUniqueValues = (key: keyof Alumni) => {
    return [...new Set(alumni.map(person => person[key]).filter(Boolean))];
  };

  const getGraduationYears = () => {
    return [...new Set(alumni.map(person => person.graduationYear))].sort((a, b) => b - a);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
          <p className="mt-4 text-gray-600">Loading alumni directory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Alumni Directory</h1>
            <p className="text-xl">Connect with our global network of accomplished Namal alumni for mentorship, career guidance, and professional opportunities.</p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, position, company, location, or program..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.graduationYear}
                onChange={(e) => setFilters({ ...filters, graduationYear: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Years</option>
                {getGraduationYears().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                value={filters.degreeProgram}
                onChange={(e) => setFilters({ ...filters, degreeProgram: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Programs</option>
                {getUniqueValues('degreeProgram')
                  .filter((program): program is string | number => typeof program === 'string' || typeof program === 'number')
                  .map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
              </select>

              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <select
                value={filters.membershipType}
                onChange={(e) => setFilters({ ...filters, membershipType: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Members</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Lifetime">Lifetime</option>
              </select>

              <label className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md">
                <input
                  type="checkbox"
                  checked={filters.willingToMentor}
                  onChange={(e) => setFilters({ ...filters, willingToMentor: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Mentors Only</span>
              </label>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAlumni.length} of {alumni.length} alumni
            {filters.willingToMentor && ' (mentors only)'}
          </div>
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No alumni found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlumni.map(person => (
              <div key={person._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {person.profilePicture ? (
                      <img 
                        src={person.profilePicture} 
                        alt={`${person.firstName} ${person.lastName}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-green-800" />
                      </div>
                    )}
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {person.firstName} {person.lastName}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          person.membershipType === 'Lifetime' ? 'bg-purple-100 text-purple-800' :
                          person.membershipType === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {person.membershipType}
                        </span>
                        {person.willingToMentor && (
                          <span className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Mentor
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span className="text-sm">{person.degreeProgram} • {person.graduationYear}</span>
                    </div>
                    
                    {person.currentPosition && (
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="text-sm">{person.currentPosition}</span>
                      </div>
                    )}
                    
                    {person.company && (
                      <div className="flex items-center text-gray-600">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">{person.company}</span>
                      </div>
                    )}
                    
                    {person.currentLocation && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{person.currentLocation}</span>
                      </div>
                    )}
                  </div>

                  {person.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{person.bio}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <a 
                        href={`mailto:${person.email}`}
                        className="p-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
                        title="Send Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      
                      {person.phone && (
                        <a 
                          href={`tel:${person.phone}`}
                          className="p-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                          title="Call"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                      
                      {person.socialLinks?.linkedin && (
                        <a 
                          href={person.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedAlumni(person)}
                      className="flex items-center px-3 py-1 bg-green-800 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                      View <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alumni Profile Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  {selectedAlumni.profilePicture ? (
                    <img 
                      src={selectedAlumni.profilePicture} 
                      alt={`${selectedAlumni.firstName} ${selectedAlumni.lastName}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-green-800" />
                    </div>
                  )}
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedAlumni.firstName} {selectedAlumni.lastName}
                    </h2>


                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedAlumni.firstName} {selectedAlumni.lastName}
                    </h2>
                    <div className="flex items-center mt-2">
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        selectedAlumni.membershipType === 'Lifetime' ? 'bg-purple-100 text-purple-800' :
                        selectedAlumni.membershipType === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedAlumni.membershipType} Member
                      </span>
                      {selectedAlumni.willingToMentor && (
                        <span className="ml-2 inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                          Available for Mentorship
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAlumni(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <GraduationCap className="h-5 w-5 text-green-700 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Education</p>
                          <p className="text-gray-600">{selectedAlumni.degreeProgram}</p>
                          <p className="text-gray-500 text-sm">Class of {selectedAlumni.graduationYear}</p>
                        </div>
                      </div>
                      
                      {selectedAlumni.currentPosition && (
                        <div className="flex items-start">
                          <Briefcase className="h-5 w-5 text-green-700 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-700">Current Position</p>
                            <p className="text-gray-600">{selectedAlumni.currentPosition}</p>
                            {selectedAlumni.company && (
                              <p className="text-gray-600 font-medium">{selectedAlumni.company}</p>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {selectedAlumni.currentLocation && (
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-green-700 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-700">Location</p>
                            <p className="text-gray-600">{selectedAlumni.currentLocation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedAlumni.skills && selectedAlumni.skills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedAlumni.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div>
                  {selectedAlumni.bio && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Bio</h3>
                      <p className="text-gray-600">{selectedAlumni.bio}</p>
                    </div>
                  )}

                  {selectedAlumni.achievements && selectedAlumni.achievements.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Notable Achievements</h3>
                      <ul className="space-y-2">
                        {selectedAlumni.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                            <span className="text-gray-600">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Email</h4>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-2" />
                      <a href={`mailto:${selectedAlumni.email}`} className="text-green-700 hover:underline">
                        {selectedAlumni.email}
                      </a>
                    </div>
                  </div>
                  
                  {selectedAlumni.phone && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Phone</h4>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-500 mr-2" />
                        <a href={`tel:${selectedAlumni.phone}`} className="text-green-700 hover:underline">
                          {selectedAlumni.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {selectedAlumni.socialLinks?.linkedin && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">LinkedIn</h4>
                      <div className="flex items-center">
                        <Linkedin className="h-5 w-5 text-gray-500 mr-2" />
                        <a 
                          href={selectedAlumni.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-700 hover:underline"
                        >
                          {selectedAlumni.socialLinks.linkedin.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {selectedAlumni.socialLinks?.website && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Website</h4>
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-gray-500 mr-2" />
                        <a 
                          href={selectedAlumni.socialLinks.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-700 hover:underline"
                        >
                          {selectedAlumni.socialLinks.website.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <a
                  href={`mailto:${selectedAlumni.email}`}
                  className="px-6 py-3 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors text-center font-medium"
                >
                  Send Message
                </a>
                {selectedAlumni.phone && (
                  <a
                    href={`tel:${selectedAlumni.phone}`}
                    className="px-6 py-3 border border-green-800 text-green-800 rounded-md hover:bg-green-50 transition-colors text-center font-medium"
                  >
                    Call Now
                  </a>
                )}
                <button
                  onClick={() => setSelectedAlumni(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniDirectory;