'use client'
import Link from 'next/link'
import { Camera, Upload, Shield, Zap, Users, Star, ArrowRight, Play } from 'lucide-react'
import ImageCard from './components/ImageCard'
import UploadForm from './components/UploadForm'
import { useEffect, useState } from "react";
import { db } from "lib/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "./context/AuthContext";
import { query, where } from "firebase/firestore";

interface SampleImage {
  id: number
  url: string
  title: string
  description: string
  uploadDate: string
  fileSize: string
  tags: string[]
  isLiked: boolean
}

export default function HomePage() {
  // // Sample images for the gallery preview
  // const sampleImages: SampleImage[] = [
  //   {
  //     id: 1,
  //     url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
  //     title: 'Mountain Landscape',
  //     description: 'Beautiful mountain view at sunset',
  //     uploadDate: '2 days ago',
  //     fileSize: '2.4 MB',
  //     tags: ['nature', 'landscape', 'mountains'],
  //     isLiked: false
  //   },
  //   {
  //     id: 2,
  //     url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
  //     title: 'Forest Path',
  //     description: 'Peaceful forest trail in autumn',
  //     uploadDate: '1 week ago',
  //     fileSize: '1.8 MB',
  //     tags: ['nature', 'forest', 'autumn'],
  //     isLiked: true
  //   },
  //   {
  //     id: 3,
  //     url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
  //     title: 'Ocean Waves',
  //     description: 'Crashing waves on rocky shore',
  //     uploadDate: '3 days ago',
  //     fileSize: '3.1 MB',
  //     tags: ['ocean', 'waves', 'nature'],
  //     isLiked: false
  //   }
  // ]

  const { user } = useAuth(); // Get current user from AuthContext
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      let q;
      if (user) {
        // Only fetch images uploaded by the logged-in user
        q = query(collection(db, "gallery"), where("userId", "==", user.uid));
      } else {
        // Fetch all images (default)
        q = collection(db, "gallery");
      }
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(data);
    };
    fetchImages();
  }, [user]); // Refetch when user changes




  return (
    <div className="min-h-screen">

      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-black to-primary-400 text-white overflow-hidden min-h-screen flex items-center justify-center py-16">
          {/* Photo Collage Background */}
          <div className="absolute inset-0 z-0">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 p-8 opacity-100">
              {/* These divs represent abstract "photo cards" */}
              <div className="col-span-2 row-span-2 w-full h-48 bg-white/5 rounded-xl transform rotate-3 "></div>
              <div className="col-span-3 h-32 bg-white/5 rounded-xl transform -rotate-2 backdrop-blur-sm"></div>
              <div className="col-span-1 h-24 bg-white/5 rounded-xl transform rotate-6 backdrop-blur-sm"></div>
              <div className="col-span-2 h-40 bg-white/5 rounded-xl transform rotate-4 backdrop-blur-sm"></div>
              <div className="col-span-2 h-36 bg-white/5 rounded-xl transform -rotate-1 backdrop-blur-sm"></div>
              <div className="col-span-3 h-52 bg-white/5 rounded-xl transform rotate-2 backdrop-blur-sm"></div>
              <div className="col-span-2 h-32 bg-white/5 rounded-xl transform -rotate-3 backdrop-blur-sm"></div>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center z-10">
            <div className="inline-flex items-center space-x-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 transition-all duration-300 hover:scale-105">
              <Camera className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">ImageVault</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-family: var(--font-sans) ">
              Your Photos,
              <span className="block text-purple-50 font-family: var(--font-sans) font-style: italic">Beautifully Organized</span>
            </h1>

            <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
              Upload, organize, and share your precious memories with ImageVault.
              A modern, secure platform designed for photographers and memory keepers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/signup" className="bg-white text-blue-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center">
                Get Started  <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/gallery" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 backdrop-blur-sm flex items-center justify-center">
                View Gallery
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Stats
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10M+</div>
                <div className="text-primary-200 text-sm">Images Stored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500K+</div>
                <div className="text-primary-200 text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-primary-200 text-sm">Uptime</div>
              </div>
            </div>
          </div> */}



      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Why Choose ImageVault?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technology and user experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <Camera className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">High Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload images in full resolution with zero compression. Your memories stay crystal clear.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <Upload className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy Upload</h3>
              <p className="text-gray-600 leading-relaxed">
                Drag and drop or click to upload. Support for bulk uploads and multiple formats.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <Shield className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Storage</h3>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade security with end-to-end encryption. Your photos are safe with us.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <Zap className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized for speed with CDN distribution. Load your gallery in milliseconds.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Gallery Preview Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Beautiful Gallery Experience
            </h2>
            <p className="text-xl text-blue-400 max-w-2xl mx-auto">
              See how your images will look in our modern, responsive gallery
            </p>
          </div>

          {/* ✅ Dynamic Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {images.slice(0, 3).map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-blue-900 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>


      {/* Upload Demo Section
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Simple Upload Process
            </h2>
            <p className="text-xl text-blue-400 max-w-2xl mx-auto">
              Try our intuitive upload interface with drag and drop functionality
            </p>
          </div>
          
          <UploadForm />
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Loved by Photographers Worldwide
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what our community has to say about ImageVault
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &quot;ImageVault has completely transformed how I organize my photography business.
                The interface is intuitive and the upload speeds are incredible.&quot;
              </p>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-gray-400 text-sm">Professional Photographer</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &quot;The security features give me peace of mind knowing my client photos are safe.
                Plus, the sharing options are perfect for collaboration.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Mike Chen</div>
                  <div className="text-gray-400 text-sm">Wedding Photographer</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                &quot;As a travel blogger, I need to manage thousands of photos.
                ImageVault makes it effortless to organize and showcase my work.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Emma Rodriguez</div>
                  <div className="text-gray-400 text-sm">Travel Blogger</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-50 bg-gradient-to-br from-primary-800 to-primary-200">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to organize your memories?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Join thousands of photographers and memory keepers who trust ImageVault with their precious photos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-blue-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Your Gallery Today
            </Link>
            <Link href="/gallery" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 backdrop-blur-sm">
              Take a Tour
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
