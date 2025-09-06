'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Image from "next/image";

export default function ImageDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!id) return;
      const docRef = doc(db, "gallery", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImage({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchImage();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!image) return <div className="text-center py-20">Image not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <Image
          src={image.imageUrl}
          alt={image.title}
          width={800}
          height={600}
          className="w-full h-auto rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2 text-blue-900">{image.title}</h1>
        <p className="text-gray-700 mb-4">{image.description}</p>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>Uploaded: {image.uploadedDate || "Unknown"}</span>
          <span>Size: {image.fileSizeInMB || "?"} MB</span>
        </div>
      </div>
      <button
        onClick={() => router.back()}
        className="mt-15 mb-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600 text-gray-700"
      >
        Back to Gallery
      </button>
    </div>
  );
}