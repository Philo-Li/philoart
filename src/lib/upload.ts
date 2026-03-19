export interface UploadResponse {
  imageKey: string;
  original: string;
  large: string;
  small: string;
  tiny: string;
}

function getRestApiBase() {
  const base = process.env.NEXT_PUBLIC_REST_API;
  if (!base) {
    throw new Error("Missing NEXT_PUBLIC_REST_API");
  }
  return base.replace(/\/+$/, "");
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function uploadImageToServer(
  photoId: string,
  file: File
): Promise<UploadResponse> {
  const baseUrl = getRestApiBase();
  const token = getAuthToken();

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${baseUrl}/upload/${photoId}`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Upload failed" }));
    throw new Error(error.error || `Upload failed (${res.status})`);
  }

  return res.json();
}
