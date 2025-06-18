import React, { useEffect } from 'react';

interface StoryModalProps {
  story: {
    title?: string;
    profilePic?: string;
    fullStory?: string;
    [key: string]: unknown;
  } | null;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Fallback for missing data
  if (!story) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg transition-opacity duration-300">
        <h2 id="modal-title" className="text-2xl font-bold mb-4">{story.title || 'Untitled Story'}</h2>
        <img
          src={story.profilePic || 'https://via.placeholder.com/100'}
          alt={`${story.title || 'Profile'} profile`}
          className="w-24 h-24 rounded-full mb-4 object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100'; }}
        />
        <p className="text-gray-700 mb-4">{story.fullStory || 'No story available.'}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-800 hover:bg-green-700 text-white font-bold rounded-md transition-colors"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StoryModal;