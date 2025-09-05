'use client'
import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion, arrayRemove
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Search, Grid3X3, List, Plus,Heart } from "lucide-react"
import ImageCard from "../components/ImageCard"
import UploadForm from "../components/UploadForm"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [editingImage, setEditingImage] = useState<any | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    const auth = getAuth()

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        const q = query(
          collection(db, "gallery"),
          where("userId", "==", currentUser.uid)
        )

        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setImages(data)
        })

        return () => unsubscribeFirestore()
      } else {
        setImages([])
      }
    })

    return () => unsubscribeAuth()
  }, [])

  // Toggle favorite for an image
  const handleToggleFavorite = async (image: any) => {
    if (!user) return alert("Login to favorite images!");
    const isFavorited = image.favoritedBy?.includes(user.uid);
    const imageRef = doc(db, "gallery", image.id);
    await updateDoc(imageRef, {
      favoritedBy: isFavorited
        ? arrayRemove(user.uid)
        : arrayUnion(user.uid),
    });
  };

  


  const handleEdit = (image: any) => {
    setEditingImage(image)
    setNewTitle(image.title)
    setNewDescription(image.description)
  }

  const handleSave = async () => {
    if (!editingImage) return

    await updateDoc(doc(db, "gallery", editingImage.id), {
      title: newTitle,
      description: newDescription,
    })

    setEditingImage(null)
    alert("Updated successfully!")
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteDoc(doc(db, "gallery", id))
    }
  }

 // Filter images for favorites if needed
  const filteredImages = images
    .filter((img) =>
      img.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((img) =>
      !favoritesOnly || (user && img.favoritedBy?.includes(user.uid))
    );
  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Upload button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between">
          <h1 className="text-3xl font-bold text-blue-900">My Gallery</h1>
          {user && (
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md transition"
            >
              <Plus className="h-5 w-5" />
              <span>Upload Images</span>
            </button>
          )}
        </div>
      </div>

      {/* Upload form */}
      {showUploadForm && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <UploadForm
              onSuccess={() => setShowUploadForm(false)}
              onCancel={() => setShowUploadForm(false)}
            />
          </div>
        </div>
      )}

      {/* Search + View toggle */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-white text-blue-600"
                  : "text-gray-500"
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-white text-blue-600"
                  : "text-gray-500"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-end">
        {user && (
          <button
            onClick={() => setFavoritesOnly((v) => !v)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${
              favoritesOnly
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Heart className="h-5 w-5 mr-2" />
            {favoritesOnly ? "Show All" : "View Favorites"}
          </button>
        )}
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredImages.length === 0 ? (
          <div className="text-center text-gray-500">No images found</div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredImages.map((item) => (
              <ImageCard
                key={item.id}
                image={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
                 isFavorited={user && item.favoritedBy?.includes(user.uid)}
                onToggleFavorite={() => handleToggleFavorite(item)}
              />
            ))}
          </div>
        )}
      </div>

      {editingImage && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md transform transition-all scale-100 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        ✏️ Edit Image
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Title"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none h-28"
          placeholder="Description"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditingImage(null)}
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium shadow-sm hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}


      
    </div>
  )
}