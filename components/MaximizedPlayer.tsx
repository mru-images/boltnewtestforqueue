import React, { useState } from 'react';
import { ChevronDown, MoreHorizontal, Heart, Share2, Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Plus, Eye } from 'lucide-react';
import { Song } from '@/types';
import { useTheme } from '@/components/ThemeContext';
import QueueSection from './QueueSection';
import { QueueItem } from '@/hooks/useQueue';

interface MaximizedPlayerProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onMinimize: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleLike: () => void;
  formatNumber: (num: number) => string;
  onAddToPlaylist: () => void;
  imageUrl?: string;
  currentTime: number;
  duration: number;
  setCurrentTime: (time: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isSeeking: boolean;
setIsSeeking: (value: boolean) => void;
  queue?: QueueItem[];
  onRemoveFromQueue?: (itemId: string) => void;
  onSongPlay?: (song: Song) => void;
  imageUrls?: Record<string, string>;

}

const MaximizedPlayer: React.FC<MaximizedPlayerProps> = ({
  song,
  isPlaying,
  onTogglePlay,
  onMinimize,
  onPrevious,
  onNext,
  onToggleLike,
  formatNumber,
  onAddToPlaylist,
  imageUrl,
  currentTime,
  duration,
  setCurrentTime,
  volume,
  setVolume,
  setIsSeeking,
  isSeeking,
  queue = [],
  onRemoveFromQueue,
  onSongPlay,
  imageUrls = {}
}) => {
  const { isDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [localSeekTime, setLocalSeekTime] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};


  const progressPercentage = (currentTime / duration) * 100;

  const handleLike = () => {
    onToggleLike();
  };

  return (
    <div className={`fixed inset-0 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200'} z-50 flex flex-col safe-top safe-bottom`}>
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 pt-8 sm:pt-12 flex-shrink-0">
        <button 
          onClick={onMinimize} 
          className={`mobile-button p-3 ${isDarkMode ? 'active:bg-gray-800' : 'active:bg-gray-200'} rounded-full transition-colors`}
        >
          <ChevronDown size={26} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
        </button>
        <div className="text-center flex-1">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>Playing from</p>
          <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium text-sm sm:text-base`}>Trending Now</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`mobile-button p-3 ${isDarkMode ? 'active:bg-gray-800' : 'active:bg-gray-200'} rounded-full transition-colors`}
          >
            <MoreHorizontal size={26} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
          </button>
          
          {/* Dropdown Menu */}
          {showMenu && (
            <div className={`absolute right-0 top-14 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-2 w-48 z-10 mobile-slide-up`}>
              <button 
                onClick={() => {
                  onAddToPlaylist();
                  setShowMenu(false);
                }}
                className={`w-full text-left px-4 py-3 ${isDarkMode ? 'active:bg-gray-700 text-white' : 'active:bg-gray-100 text-gray-900'} flex items-center transition-colors min-h-[44px]`}
              >
                <Plus size={18} className="mr-3" />
                Add to Playlist
              </button>
              <button className={`w-full text-left px-4 py-3 ${isDarkMode ? 'active:bg-gray-700 text-white' : 'active:bg-gray-100 text-gray-900'} flex items-center transition-colors min-h-[44px]`}>
                <Share2 size={18} className="mr-3" />
                Share
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content Area - Properly contained */}
      <div className="flex-1 overflow-y-auto px-4 mobile-scroll">
        <div className="max-h-full">
          {/* Album Art - Smaller and centered */}
          <div className="flex justify-center py-4 sm:py-6">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <img
                src={imageUrl || song.image}
                alt={song.name}
                className="w-full h-full rounded-xl sm:rounded-2xl object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl"></div>
            </div>
          </div>

          {/* Song Info */}
          <div className="text-center mb-4 sm:mb-6 px-4">
            <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 leading-tight`}>{song.name}</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg`}>{song.artist}</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} text-xs sm:text-sm px-3 py-1 rounded-full`}>
                {song.language}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-1">
                <Eye size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>{formatNumber(song.views)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart size={14} className={`${song.isLiked ? 'text-red-500 fill-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>{formatNumber(song.likes)}</span>
              </div>
            </div>
          </div>

                      {/* Progress Bar with Time */}
          <div className="mb-6 sm:mb-8 px-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono mb-3">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {formatTime(currentTime)}
              </span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {formatTime(duration)}
              </span>
            </div>

           <input
  type="range"
  min={0}
  max={duration}
  step={0.1}
  value={isSeeking && localSeekTime !== null ? localSeekTime : currentTime}
  onChange={(e) => {
    const newTime = Number(e.target.value);
    setIsSeeking(true);
    setLocalSeekTime(newTime); // ✅ Set directly
  }}
  onMouseUp={() => {
    if (localSeekTime !== null) {
      setIsSeeking(false);
      setCurrentTime(localSeekTime); // ✅ Triggers audioRef seek in parent
      setLocalSeekTime(null);
    } else {
      console.warn('[MouseUp] localSeekTime was null');
    }
  }}
  onTouchEnd={() => {
    if (localSeekTime !== null) {
      setIsSeeking(false);
      setCurrentTime(localSeekTime); // ✅ Triggers audioRef seek in parent
      setLocalSeekTime(null);
    } else {
      console.warn('[TouchEnd] localSeekTime was null');
    }
  }}
  className="w-full h-2 appearance-none bg-gray-300 rounded-full cursor-pointer"
  style={{ accentColor: '#a855f7' }}
/>

          </div>


          {/* Main Controls */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <button className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
                <Shuffle size={22} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
              
              <button 
                onClick={onPrevious}
                className={`mobile-button p-3 ${isDarkMode ? 'active:bg-gray-800' : 'active:bg-gray-200'} rounded-full transition-colors`}
              >
                <SkipBack size={26} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
              </button>
              
              <button
                onClick={onTogglePlay}
                className="mobile-button p-4 bg-purple-500 active:bg-purple-700 rounded-full transition-colors shadow-lg"
              >
                {isPlaying ? (
                  <Pause size={30} className="text-white" />
                ) : (
                  <Play size={30} className="text-white" fill="white" />
                )}
              </button>
              
              <button 
                onClick={onNext}
                className={`mobile-button p-3 ${isDarkMode ? 'active:bg-gray-800' : 'active:bg-gray-200'} rounded-full transition-colors`}
              >
                <SkipForward size={26} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
              </button>
              
              <button className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
                <Repeat size={22} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
          </div>

          {/* Bottom Section with Like Button and Volume - Final section */}
          <div className="pb-6 sm:pb-8 px-2">
            <div className="flex items-center justify-between space-x-4">
              {/* Like Button - Bottom Left */}
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-3 ${song.isLiked ? 'bg-red-500 active:bg-red-700' : isDarkMode ? 'bg-gray-700 active:bg-gray-600' : 'bg-gray-200 active:bg-gray-300'} rounded-full transition-colors min-h-[44px]`}
              >
                <Heart size={16} className={`${song.isLiked ? 'text-white fill-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                <span className={`text-xs sm:text-sm font-medium ${song.isLiked ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {song.isLiked ? 'Liked' : 'Like'}
                </span>
              </button>
              
              {/* Volume Control */}
              {/* Volume Control */}
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 max-w-28 sm:max-w-32">
                <Volume2 size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer mobile-input"
                  style={{ accentColor: '#a855f7' }}
                />
              </div>

            </div>
          </div>
        </div>
          {/* Queue Section */}
          {queue.length > 0 && onRemoveFromQueue && onSongPlay && (
            <QueueSection
              queue={queue}
              onRemoveFromQueue={onRemoveFromQueue}
              onSongPlay={onSongPlay}
              imageUrls={imageUrls}
            />
          )}
      </div>
    </div>
  );
};

export default MaximizedPlayer; 

