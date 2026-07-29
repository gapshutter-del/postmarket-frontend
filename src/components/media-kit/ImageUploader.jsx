import { uploadCreatorImage } from "../../api/storage";

export default function ImageUploader({
  label,
  folder,
  onUploaded,
}) {
  async function handleFile(event) {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const url = await uploadCreatorImage(file, folder);
      onUploaded(url);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {label}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
      />
    </div>
  );
}