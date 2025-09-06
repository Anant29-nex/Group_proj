"use client";
import { useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { db } from "@/lib/firebase";
=======
import { db } from "../../lib/firebase";
>>>>>>> 9479df7829897ca99595e12ae251705d58994c09
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Upload, X } from "lucide-react";
import { getAuth } from "firebase/auth";

export default function UploadForm({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to upload!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

<<<<<<< HEAD
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
=======
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
>>>>>>> 9479df7829897ca99595e12ae251705d58994c09

      const imageUrl = res.data.secure_url;
      const fileSizeInMB = (res.data.bytes / (1024 * 1024)).toFixed(2);
      const uploadedDate = new Date(res.data.created_at).toLocaleString();

      await addDoc(collection(db, "gallery"), {
        title,
        description,
        imageUrl,
        fileSizeInMB,
        uploadedDate,
        createdAt: serverTimestamp(),
        userId: user.uid, 
      });

      alert("Uploaded successfully!");

      setTitle("");
      setDescription("");
      setFile(null);

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 border-2 rounded-2xl bg-white shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-900 mb-10">Upload Image</h1>
      <form onSubmit={handleUpload} className="space-y-4 text-gray-900">
         <label className="text-xl text-blue-900 mb-5">Title</label> 
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

<<<<<<< HEAD
        <div className="max-w-lg mx-auto p-6 border-2 rounded-2xl">
            <h1 className="text-2xl font-bold mb-4 text-black">Upload Image</h1>
            <form onSubmit={handleUpload} className="space-y-4 text-gray-900">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setFile(file);
                    }}
                    required
                    className="cursor"
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded "
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
=======
        <label className="text-xl text-blue-900 mb-5">Description</label> 
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Custom File Upload Box */}
        <div className="w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) setFile(selectedFile);
            }}
          />
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-blue-900 hover:underline">
              {file ? file.name : "Click to choose file or drag & drop"}
            </span>
          </label>
>>>>>>> 9479df7829897ca99595e12ae251705d58994c09
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded flex items-center"
          >
            <X className="h-4 w-4 mr-1" /> Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}