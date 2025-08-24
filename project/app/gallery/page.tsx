'use client'
import { useState } from 'react'
import { Search, Filter, Grid3X3, List, Plus } from 'lucide-react'
import ImageCard from '../components/ImageCard'
import UploadForm from '../components/UploadForm'

interface Image {
  id: number
  url: string
  title: string
  description: string
  uploadDate: string
  fileSize: string
  tags: string[]
  category: string
  isLiked: boolean
}

interface Category {
  id: string
  name: string
}

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false)

  // Sample images - replace with actual data from your backend
  const [images] = useState<Image[]>([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      title: 'Mountain Landscape',
      description: 'Beautiful mountain view at sunset',
      uploadDate: '2 days ago',
      fileSize: '2.4 MB',
      tags: ['nature', 'landscape', 'mountains'],
      category: 'nature',
      isLiked: false
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
      title: 'Forest Path',
      description: 'Peaceful forest trail in autumn',
      uploadDate: '1 week ago',
      fileSize: '1.8 MB',
      tags: ['nature', 'forest', 'autumn'],
      category: 'nature',
      isLiked: true
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      title: 'Ocean Waves',
      description: 'Crashing waves on rocky shore',
      uploadDate: '3 days ago',
      fileSize: '3.1 MB',
      tags: ['ocean', 'waves', 'nature'],
      category: 'nature',
      isLiked: false
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      title: 'City Skyline',
      description: 'Modern cityscape at night',
      uploadDate: '5 days ago',
      fileSize: '2.7 MB',
      tags: ['city', 'urban', 'night'],
      category: 'urban',
      isLiked: false
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
      title: 'Portrait',
      description: 'Professional headshot',
      uploadDate: '1 day ago',
      fileSize: '1.5 MB',
      tags: ['portrait', 'people', 'professional'],
      category: 'people',
      isLiked: true
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      title: 'Abstract Art',
      description: 'Colorful abstract composition',
      uploadDate: '4 days ago',
      fileSize: '2.1 MB',
      tags: ['abstract', 'art', 'colorful'],
      category: 'art',
      isLiked: false
    }
  ])

  const categories: Category[] = [
    { id: 'all', name: 'All Images' },
    { id: 'nature', name: 'Nature' },
    { id: 'urban', name: 'Urban' },
    { id: 'people', name: 'People' },
    { id: 'art', name: 'Art' }
  ]

  // Filter images based on search query and category
  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Gallery</h1>
              <p className="text-gray-600 mt-1">
                {filteredImages.length} of {images.length} images
              </p>
            </div>
            
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Upload Images</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <UploadForm />
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredImages.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
