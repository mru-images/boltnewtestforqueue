import React from 'react';
import { Play, Heart, Eye, MoreHorizontal, Plus, X, ListPlus } from 'lucide-react';
import { Song } from '@/types';
import { useTheme } from '@/components/ThemeContext';
import { useState } from 'react';

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  formatNumber: (num: number) => string;
  onAddToPlaylist?: (song: Song) => void;
  onAddToQueue?: (song: Song) => void;
  showRemoveButton?: boolean;
  onRemove?: () => void;
  cachedImageUrl: string;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  onPlay, 
  formatNumber, 
  onAddToPlaylist,
  onAddToQueue,
  showRemoveButton = false,
  onRemove,
  cachedImageUrl
}) => {
  const { isDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const handleContainerClick = () => {
    onPlay(song);
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div 
      onClick={handleContainerClick}
      className={`flex items-center p-3 sm:p-4 ${isDarkMode ? 'bg-gray-800/50 active:bg-gray-800' : 'bg-white/50 active:bg-white border border-gray-200'} rounded-lg transition-all group cursor-pointer mobile-card`}
    >
      <div className="relative mr-3">
        <img
          src={cachedImageUrl}
          alt={song.name}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
        />
        <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity">
          <Play className="text-white" size={18} fill="white" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>{song.name}</h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm truncate`}>{song.artist}</p>
        <div className="flex items-center space-x-3 sm:space-x-4 mt-1">
          <div className="flex items-center space-x-1">
            <Eye size={10} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs`}>{formatNumber(song.views)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart size={10} className={`${song.isLiked ? 'text-red-500 fill-red-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs`}>{formatNumber(song.likes)}</span>
          </div>
          <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs hidden sm:inline`}>{song.language}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-3">
        {showRemoveButton && onRemove && (
          <button 
            onClick={(e) => handleButtonClick(e, onRemove)}
            className={`mobile-button p-2 ${isDarkMode ? 'active:bg-gray-700' : 'active:bg-gray-200'} rounded-full transition-colors text-red-400 active:text-red-300`}
          >
            <X size={18} />
          </button>
        )}
        {onAddToPlaylist && (
          <button 
            onClick={(e) => handleButtonClick(e, () => onAddToPlaylist(song))}
            className={`mobile-button p-2 ${isDarkMode ? 'active:bg-gray-700' : 'active:bg-gray-200'} rounded-full transition-colors`}
          >
            <Plus size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        )}
        <div className="relative">
          <button 
            onClick={(e) => handleButtonClick(e, () => setShowMenu(!showMenu))}
            className={`mobile-button p-2 ${isDarkMode ? 'active:bg-gray-700' : 'active:bg-gray-200'} rounded-full transition-colors`}
          >
            <MoreHorizontal size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
          
          {showMenu && (
            <div className={`absolute right-0 top-12 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-2 w-44 z-20 mobile-slide-up`}>
              {onAddToQueue && (
                <button
                  onClick={(e) => {
                    handleButtonClick(e, () => {
                      onAddToQueue(song);
                      setShowMenu(false);
                    });
                  }}
                  className={`w-full text-left px-4 py-3 ${isDarkMode ? 'active:bg-gray-700 text-white' : 'active:bg-gray-100 text-gray-900'} flex items-center transition-colors min-h-[44px]`}
                >
                  <ListPlus size={18} className="mr-3" />
                  Add to Queue
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongCard;