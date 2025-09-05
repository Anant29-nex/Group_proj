'use client'
import { useState } from 'react'
import { MoreVertical, Eye } from 'lucide-react'

export default function ImageCard({ image, onEdit, onDelete }: any) {
  const [showActions, setShowActions] = useState(false)



  return (
    <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image?.imageUrl || '/placeholder-image.jpg'}
          alt={image?.title || 'Image'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

       

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>View</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
              {image?.title || 'Untitled Image'}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {image?.description || 'No description available'}
            </p>
          </div>

          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <span>{image?.uploadedDate || 'Unknown date'}</span>
          <span>{image?.fileSizeInMB || 'Unknown size'} MB</span>
        </div>

        {image?.tags && image.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {image.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {image.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{image.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      {showActions && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[160px]">
          <button
            onClick={onEdit}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-lime-400 transition-colors duration-200"
          >
            Edit Details
          </button>
          <hr className="my-2" />
          <button
            onClick={onDelete}
            className="w-full text-left px-4 py-2 text-sm text-black hover:bg-red-400 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
