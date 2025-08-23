"use client";
import { useState } from "react";
import axios from "axios";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


export default function UploadForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e: any) => {
        e.preventDefault();
        if (!file) return alert("Please select an image!");

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

            const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );

            const imageUrl = res.data.secure_url;

            await addDoc(collection(db, "gallery"), {
                title,
                description,
                imageUrl,
                createdAt: serverTimestamp(),
            });

            alert("Uploaded successfully!");
            setTitle("");
            setDescription("");
            setFile(null);
        } catch (error) {
            console.error(error);
            alert("Upload failed!");
        } finally {
            setLoading(false);
        }
    };
    return (


        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
            <form onSubmit={handleUpload} className="space-y-4">
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
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>


    )
}