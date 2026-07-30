import { supabase } from "../supabase/client";

export async function uploadCreatorImage(file, bucket, folder = "") {
  if (!file) return null;

  const extension = file.name.split(".").pop();
  const filename = `${Date.now()}.${extension}`;

  const path = folder
    ? `${folder}/${filename}`
    : filename;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}