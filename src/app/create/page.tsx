"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { CREATE_PHOTO } from "@/graphql/mutations";
import { uploadImageToS3 } from "@/lib/upload";

const TYPES = ["Photograph", "Painting", "Digital Art", "Drawing"];
const STATUSES = ["Published", "Draft"];
const LICENSES = ["Free to Use", "CC0", "CC BY", "CC BY-SA", "CC BY-NC", "All Rights Reserved"];

export default function CreatePage() {
  const router = useRouter();
  const [createPhoto, { loading }] = useMutation(CREATE_PHOTO);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Photograph",
    status: "Published",
    license: "Free to Use",
    allowDownload: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Check auth
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Redirect if not authenticated
  if (!token) {
    if (typeof window !== "undefined") {
      router.push("/signin");
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!imageFile) {
      setError("Please select an image");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a title");
      return;
    }

    try {
      setUploading(true);
      if (!userId) {
        throw new Error("Missing user id");
      }

      const photoId = `${userId}-${crypto.randomUUID().slice(0, 8)}`;
      const imageUrl = await uploadImageToS3(photoId, imageFile);

      await createPhoto({
        variables: {
          photoId,
          title: formData.title,
          description: formData.description || undefined,
          year: new Date().getFullYear(),
          type: formData.type,
          status: formData.status,
          license: formData.license,
          allowDownload: formData.allowDownload,
          imageUrl,
        },
      });

      router.push(`/${localStorage.getItem("username") || ""}`);
    } catch (err) {
      console.error("Create error:", err);
      setError("Failed to create artwork. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const isLoading = loading || uploading;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Artwork</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image *
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              imagePreview ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {imagePreview ? (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="mx-auto max-h-64 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <svg className="mx-auto w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-gray-600">Drag and drop an image, or click to select</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.type === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex gap-2">
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFormData({ ...formData, status })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.status === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* License */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License{" "}
            <a href="/license" target="_blank" className="text-blue-600 hover:underline text-xs">
              (Info)
            </a>
          </label>
          <select
            value={formData.license}
            onChange={(e) => setFormData({ ...formData, license: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LICENSES.map((license) => (
              <option key={license} value={license}>
                {license}
              </option>
            ))}
          </select>
        </div>

        {/* Allow Download */}
        <div className="flex items-center gap-2">
          <input
            id="allowDownload"
            type="checkbox"
            checked={formData.allowDownload}
            onChange={(e) => setFormData({ ...formData, allowDownload: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="allowDownload" className="text-sm text-gray-700">
            Allow download
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !imageFile}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Creating...
            </span>
          ) : (
            "Create Artwork"
          )}
        </button>
      </form>
    </div>
  );
}
