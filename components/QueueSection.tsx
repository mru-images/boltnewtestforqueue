import React from 'react'
import { X, GripVertical, Music } from 'lucide-react'
import { QueueItem } from '@/hooks/useQueue'
import { useTheme } from '@/components/ThemeContext'

interface QueueSectionProps {
  queue: QueueItem[]
  onRemoveFromQueue: (itemId: string) => void
  onSongPlay: (song: any) => void
  imageUrls: Record<string, string>
}

const QueueSection: React.FC<QueueSectionProps> = ({
  queue,
  onRemoveFromQueue,
  onSongPlay,
  imageUrls
}) => {
  const { isDarkMode } = useTheme()

  if (queue.length === 0) {
    return null
  }

  return (
    <div className="mt-8 px-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
          <ListPlus size={24} className="mr-2 text-purple-400" />
          Next in Queue
        </h3>
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} bg-purple-500/20 px-3 py-1 rounded-full font-medium`}>
          {queue.length} song{queue.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
        {queue.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center p-4 ${
              isDarkMode ? 'bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50' : 'bg-white/80 hover:bg-white border border-gray-200'
            } rounded-xl transition-all group shadow-sm hover:shadow-md`}
          >
            {/* Queue Position Number */}
            <div className="flex items-center justify-center mr-4 w-8 h-8">
              <span className={`text-sm font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} bg-purple-500/20 rounded-full w-6 h-6 flex items-center justify-center`}>
                {index + 1}
              </span>
            </div>

            {/* Song Image */}
            <img
              src={imageUrls[item.song.id] || '/placeholder.png'}
              alt={item.song.name}
              className="w-14 h-14 rounded-xl object-cover mr-4 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              onClick={() => onSongPlay(item.song)}
            />

            {/* Song Info */}
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSongPlay(item.song)}>
              <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate text-base mb-1`}>
                {item.song.name}
              </h4>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm truncate`}>
                {item.song.artist}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemoveFromQueue(item.id)}
              className={`p-1 ${
                isDarkMode ? 'hover:bg-red-600/20 text-red-400 hover:text-red-300' : 'hover:bg-red-500/20 text-red-500 hover:text-red-600'
              } rounded-full transition-all opacity-0 group-hover:opacity-100 p-2`}
              title="Remove from queue"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Queue Actions */}
      <div className="mt-4 pt-4 border-t border-gray-700/30">
        <div className="flex justify-center">
          <button
            onClick={() => {
              queue.forEach(item => onRemoveFromQueue(item.id));
            }}
            className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded-lg transition-colors text-sm font-medium flex items-center`}
          >
            <X size={16} className="mr-2" />
            Clear Queue
          </button>
        </div>
      </div>
    </div>
  )
}

export default QueueSection