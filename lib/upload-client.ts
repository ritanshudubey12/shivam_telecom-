export async function uploadBlogImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/blog/upload", { method: "POST", body: formData });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Upload failed");
  }

  return json.url as string;
}
