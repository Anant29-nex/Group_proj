'use client'
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Search, Grid3X3, List, Plus } from "lucide-react"
import ImageCard from "../components/ImageCard"
import UploadForm from "../components/Uploadform"
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

  useEffect(() => {
    const auth = getAuth()

    // Track logged-in user
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

  const filteredImages = images.filter((img) =>
    img.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Upload button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Gallery</h1>
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
              className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white text-blue-600" : "text-gray-500"}`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${viewMode === "list" ? "bg-white text-blue-600" : "text-gray-500"}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
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
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
