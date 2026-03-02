interface S3UrlResponse {
  url: string;
}

function getRestApiBase() {
  const base = process.env.NEXT_PUBLIC_REST_API;
  if (!base) {
    throw new Error("Missing NEXT_PUBLIC_REST_API");
  }
  return base.replace(/\/+$/, "");
}

export async function uploadImageToS3(photoId: string, file: File): Promise<string> {
  const baseUrl = getRestApiBase();

  const signedUrlRes = await fetch(`${baseUrl}/s3Url/${photoId}`);
  if (!signedUrlRes.ok) {
    throw new Error(`Failed to get upload URL (${signedUrlRes.status})`);
  }

  const { url } = (await signedUrlRes.json()) as S3UrlResponse;
  if (!url) {
    throw new Error("Invalid upload URL response");
  }

  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error(`Failed to upload file (${uploadRes.status})`);
  }

  return url.split("?")[0];
}
