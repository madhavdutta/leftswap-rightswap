import React, { useState, useEffect } from 'react'
import { Heart, X, RotateCcw, Info } from 'lucide-react'

interface ImageData {
  id: number
  url: string
  title: string
  photographer: string
}

function App() {
  const [images, setImages] = useState<ImageData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedImages, setLikedImages] = useState<number[]>([])
  const [passedImages, setPassedImages] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)

  // Curated high-quality Unsplash images
  const imageUrls = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
      title: 'Mountain Lake',
      photographer: 'John Doe'
    },
    {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop',
      title: 'Forest Path',
      photographer: 'Jane Smith'
    },
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1200&fit=crop',
      title: 'Sunset Valley',
      photographer: 'Mike Johnson'
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
      title: 'Ocean Waves',
      photographer: 'Sarah Wilson'
    },
    {
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=1200&fit=crop',
      title: 'Desert Dunes',
      photographer: 'Alex Brown'
    },
    {
      url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=1200&fit=crop',
      title: 'Misty Lake',
      photographer: 'Emma Davis'
    },
    {
      url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=1200&fit=crop',
      title: 'Mountain Peak',
      photographer: 'Chris Lee'
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
      title: 'Tropical Beach',
      photographer: 'Lisa Garcia'
    },
    {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop',
      title: 'City Skyline',
      photographer: 'Tom Anderson'
    },
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1200&fit=crop',
      title: 'Northern Lights',
      photographer: 'Anna Martinez'
    }
  ]

  useEffect(() => {
    const shuffledImages = imageUrls
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({
        id: index,
        ...img
      }))
    setImages(shuffledImages)
  }, [])

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating || currentIndex >= images.length) return

    setIsAnimating(true)
    setSwipeDirection(direction)

    const currentImageId = images[currentIndex].id

    if (direction === 'right') {
      setLikedImages(prev => [...prev, currentImageId])
    } else {
      setPassedImages(prev => [...prev, currentImageId])
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setIsAnimating(false)
      setSwipeDirection(null)
    }, 300)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setLikedImages([])
    setPassedImages([])
    setIsAnimating(false)
    setSwipeDirection(null)
    
    // Reshuffle images
    const shuffledImages = imageUrls
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({
        id: index,
        ...img
      }))
    setImages(shuffledImages)
  }

  const currentImage = images[currentIndex]
  const isComplete = currentIndex >= images.length

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading amazing images...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 text-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold">ImageSwipe</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm opacity-75">
            {currentIndex + 1} / {images.length}
          </div>
          <button
            onClick={handleReset}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {isComplete ? (
          <div className="text-center text-white space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold">All Done!</h2>
            <p className="text-lg opacity-75">
              You've swiped through all {images.length} images
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{likedImages.length}</div>
                <div className="opacity-75">Liked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{passedImages.length}</div>
                <div className="opacity-75">Passed</div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
            >
              Start Over
            </button>
          </div>
        ) : (
          <div className="relative w-full max-w-sm">
            {/* Card Stack */}
            <div className="relative h-[600px]">
              {/* Next card (background) */}
              {currentIndex + 1 < images.length && (
                <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl transform scale-95 opacity-50">
                  <img
                    src={images[currentIndex + 1].url}
                    alt={images[currentIndex + 1].title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              )}
              
              {/* Current card */}
              <div
                className={`absolute inset-0 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
                  isAnimating
                    ? swipeDirection === 'right'
                      ? 'transform translate-x-full rotate-12 opacity-0'
                      : 'transform -translate-x-full -rotate-12 opacity-0'
                    : 'transform translate-x-0 rotate-0 opacity-100'
                }`}
              >
                <div className="relative h-full">
                  <img
                    src={currentImage.url}
                    alt={currentImage.title}
                    className="w-full h-4/5 object-cover rounded-t-2xl"
                  />
                  
                  {/* Image Info */}
                  <div className="p-4 h-1/5 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-800">{currentImage.title}</h3>
                    <p className="text-sm text-gray-600">by {currentImage.photographer}</p>
                  </div>

                  {/* Swipe Indicators */}
                  {isAnimating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                          swipeDirection === 'right'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {swipeDirection === 'right' ? '❤️' : '✕'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-8 mt-8">
              <button
                onClick={() => handleSwipe('left')}
                disabled={isAnimating}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-all transform hover:scale-110 disabled:opacity-50 disabled:transform-none"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={() => handleSwipe('right')}
                disabled={isAnimating}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all transform hover:scale-110 disabled:opacity-50 disabled:transform-none"
              >
                <Heart className="w-8 h-8" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      {!isComplete && (
        <div className="p-6 text-white">
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>{likedImages.length} liked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>{passedImages.length} passed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
