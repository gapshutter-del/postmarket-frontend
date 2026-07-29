export default function CoverEditor({ src }) {
  return (
    <div
      style={{
        height: 220,
        borderRadius: 16,
        background: src
          ? `url(${src}) center/cover`
          : "linear-gradient(135deg,#2563eb,#7c3aed)",
      }}
    />
  );
}