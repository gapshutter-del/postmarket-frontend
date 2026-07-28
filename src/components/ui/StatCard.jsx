import Card from "./Card";

export default function StatCard({ title, value }) {
  return (
    <Card>
      <p
        style={{
          color: "#666",
          marginBottom: 10,
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
        }}
      >
        {value}
      </h2>
    </Card>
  );
}