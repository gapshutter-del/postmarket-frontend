import { uploadCreatorImage } from "../../api/storage";

export default function ImageUploader({
  label,
  bucket,
  folder,
  onUploaded,
}) {
  async function handleFile(event) {
    const file = event.target.files[0];

    if (!file) return;

    try {
       console.log("bucket =", bucket);
console.log("folder =", folder);
console.log("file =", file.name);

      const url = await uploadCreatorImage(
        file,
        bucket,
        folder
      );

      onUploaded(url);

    } catch (err) {

      console.error(err);
      alert("Upload failed.");

    }
  }

 return (
  <div
    style={{
      marginBottom: 20,
      textAlign: "center",
    }}
  >
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 16px",
        background: "#A56A43",
        color: "#fff",
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 14,
        transition: "0.2s",
      }}
    >
      {label.replace("Upload", "Update")}

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />
    </label>
  </div>
);
}