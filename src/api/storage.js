import { supabase } from "../supabase/client";

export async function uploadCreatorImage(file, folder) {
  if (!file) return null;

  const extension = file.name.split(".").pop();
  const filename = `${Date.now()}.${extension}`;
  const path = `${folder}/${filename}`;

  const { error } = await supabase.storage
    .from("creator-media")
    .upload(path, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("creator-media")
    .getPublicUrl(path);

  return data.publicUrl;
}