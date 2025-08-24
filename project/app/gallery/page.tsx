'use client'
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection,query,onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore"
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



useEffect(() => {
  const q = query(collection(db, "gallery"))

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setImages(data);
  });

  return () => unsubscribe(); 
}, []);

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

    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === editingImage.id
          ? { ...img, title: newTitle, description: newDescription }
          : img
      )
    )

    setEditingImage(null)
    alert("Updated successfully!")
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteDoc(doc(db, "gallery", id))
      setImages((prev) => prev.filter((img) => img.id !== id))
    }
  }

  const filteredImages = images.filter((img) =>
    img.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md transition"
            >
              <Plus className="h-5 w-5" />
              <span>Upload Images</span>
            </button>

          </div>
        </div>
      </div>

      {showUploadForm && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <UploadForm onSuccess={() => setShowUploadForm(false)} onCancel={()=>setShowUploadForm(false)} />

          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>



            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors duration-200 ${viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors duration-200 ${viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
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

      {editingImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Edit Image</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border rounded p-2 mb-4 text-gray-800"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full border rounded p-2 mb-4 text-gray-800"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingImage(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
