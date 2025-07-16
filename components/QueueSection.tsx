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
    <div className="mt-4 sm:mt-6 px-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Next in Queue
        </h3>
        <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {queue.length} song{queue.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto mobile-scroll">
        {queue.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center p-3 ${
              isDarkMode ? 'bg-gray-800/50 active:bg-gray-800' : 'bg-gray-100/50 active:bg-gray-100'
            } rounded-lg transition-colors group mobile-card`}
          >
            <div className="flex items-center mr-3 text-xs sm:text-sm font-mono w-6">
              <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {index + 1}
              </span>
            </div>

            <img
              src={imageUrls[item.song.id] || '/placeholder.png'}
              alt={item.song.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover mr-3 cursor-pointer"
              onClick={() => onSongPlay(item.song)}
            />

            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSongPlay(item.song)}>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate text-xs sm:text-sm`}>
                {item.song.name}
              </h4>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm truncate`}>
                {item.song.artist}
              </p>
            </div>

            <button
              onClick={() => onRemoveFromQueue(item.id)}
              className={`p-1 ${
                isDarkMode ? 'active:bg-gray-700' : 'active:bg-gray-200'
              } rounded-full transition-colors opacity-0 group-active:opacity-100 mobile-button`}
            >
              <X size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QueueSection