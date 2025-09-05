'use client'
import { useEffect, useState } from "react";
import { db } from "lib/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import ImageCard from "../components/ImageCard";
import UploadForm from "app/components/UploadForm";
import { Search, Filter, Grid3X3, List, Plus } from 'lucide-react'
export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [editingImage, setEditingImage] = useState<any | null>(null); // track current editing image
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false)

  const handleEdit = (image: any) => {
    setEditingImage(image);
    setNewTitle(image.title);
    setNewDescription(image.description);
  };

  const handleSave = async () => {
    if (!editingImage) return;

    await updateDoc(doc(db, "gallery", editingImage.id), {
      title: newTitle,
      description: newDescription,
    });

    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === editingImage.id ? { ...img, title: newTitle, description: newDescription } : img
      )
    );

    setEditingImage(null);
    alert("Updated successfully!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteDoc(doc(db, "gallery", id));
      setImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-15 text-center ">My Gallery</h1>
              
            </div>
            
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="mt-10 btn-primary flex items-center space-x-2"
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
            <UploadForm onCancel={() => setShowUploadForm(false)}/>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((item) => (
          <ImageCard
            key={item.id}
            image={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Image</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingImage(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
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
    </div>
  );
}