import React, { useState } from 'react';
import { Search, Award, Briefcase, GraduationCap, Filter } from 'lucide-react';
import StoryModal from '../components/StoryModal';

type Story = {
  id: number;
  title: string;
  category: string;
  preview: string;
  profilePic: string;
  fullStory: string;
};

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
  // Example story data structure with profile pictures and detailed stories
  const stories: Story[] = [
    {
      id: 1,
      title: "From Graduate to Tech Lead",
      category: "Career Growth",
      preview: "A journey of determination and growth in the tech industry...",
      profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fullStory: "Starting as a curious student at Namal University in 2015, Ahmed Khan was fascinated by coding. With limited resources, he taught himself Python and participated in university hackathons. After graduating in 2019 with a degree in Computer Science, he joined a local startup as a junior developer. His dedication led him to innovate a new data processing algorithm, earning him a promotion to Tech Lead within three years. Today, he leads a team of 15 at a multinational tech firm, mentoring young coders and contributing to cutting-edge AI projects."
    },
    {
      id: 2,
      title: "Pioneering Academic Excellence",
      category: "Academic Achievement",
      preview: "A tale of academic brilliance and perseverance...",
      profilePic: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fullStory: "Sara Ahmed enrolled at Namal University in 2016, driven by a passion for physics. Balancing part-time work and studies, she excelled, publishing her first research paper on renewable energy in her second year. Graduating with top honors in 2020, she pursued a PhD at MIT on a full scholarship. Now, in 2025, she’s a leading researcher in sustainable technology, inspiring students worldwide with her journey from a small town to global academia."
    },
    {
      id: 3,
      title: "Award-Winning Entrepreneur",
      category: "Recognition",
      preview: "Turning a university project into a global business...",
      profilePic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fullStory: "Ali Rizwan started his entrepreneurial journey at Namal University in 2017 with a small e-commerce idea. His final-year project, an online marketplace for local artisans, won the university innovation award. After graduating in 2021, he bootstrapped the venture, growing it into a million-dollar business by 2024. In 2025, he received the Young Entrepreneur Award, crediting Namal for his problem-solving skills and network."
    },
    {
      id: 4,
      title: "From Intern to CEO",
      category: "Career Growth",
      preview: "A remarkable rise in the corporate world...",
      profilePic: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fullStory: "Hassan Iqbal joined Namal University in 2014, majoring in Business Administration. His internship at a local firm in 2018 turned into a full-time role after graduation in 2018. Climbing the ranks with strategic insights, he became CEO of the company by 2023. In 2025, he attributes his success to the leadership training and alumni mentorship he received at Namal."
    },
    {
      id: 5,
      title: "Scholarship Success Story",
      category: "Academic Achievement",
      preview: "Overcoming odds to achieve academic heights...",
      profilePic: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fullStory: "Fatima Zahra faced financial challenges when she joined Namal University in 2015. Through hard work and a merit scholarship, she completed her degree in Electrical Engineering by 2019. Her senior project on solar energy solutions won a national competition, leading to a scholarship for a Master’s at Stanford. In 2025, she’s a renewable energy consultant, proud of her Namal roots."
    },
    {
      id: 6,
      title: "Innovator of the Year",
      category: "Recognition",
      preview: "Revolutionizing healthcare with innovative tech...",
      profilePic: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fullStory: "Omar Farooq, a 2016 Namal graduate in Biomedical Engineering, developed a low-cost diagnostic device during his studies. After graduating in 2020, he founded a startup that scaled the product globally. In 2024, he was named Innovator of the Year, with his device saving thousands of lives. In 2025, he continues to innovate, inspired by Namal’s hands-on learning environment."
    },
    {
      id: 7,
      title: "Global Leadership Role",
      category: "Career Growth",
      preview: "Leading international teams with Namal skills...",
      profilePic: "https://images.pexels.com/photos/1181398/pexels-photo-1181398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fullStory: "Zainab Malik graduated from Namal University in 2017 with a degree in International Relations. Her leadership in student organizations caught the eye of a global NGO, where she started as a coordinator. By 2023, she was leading projects across Asia. In 2025, as Regional Director, she credits Namal for her communication and strategic skills."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591210002927-7f7f3f1e8b1b?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
          <p className="text-xl">Celebrating the inspiring journeys of Namal alumni who have excelled in their fields.</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search success stories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            <span>Filter Stories</span>
          </button>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center gap-2 text-green-700 mb-4">
                {story.category === "Career Growth" && <Briefcase className="w-5 h-5" />}
                {story.category === "Academic Achievement" && <GraduationCap className="w-5 h-5" />}
                {story.category === "Recognition" && <Award className="w-5 h-5" />}
                <span className="text-sm font-medium">{story.category}</span>
              </div>
              <img src={story.profilePic} alt={`${story.title} profile`} className="w-16 h-16 rounded-full mb-4 object-cover" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
              <p className="text-gray-600 mb-4">{story.preview}</p>
              <button 
                onClick={() => setSelectedStory(story)}
                className="px-4 py-2 bg-green-800 hover:bg-green-700 text-white font-bold rounded-md transition-colors"
              >
                Read Full Story
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};

export default SuccessStories;