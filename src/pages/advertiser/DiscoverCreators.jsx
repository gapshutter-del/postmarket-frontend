import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function DiscoverCreators() {
  const [creators, setCreators] = useState([]);
const [roster, setRoster] = useState(new Set());

  useEffect(() => {
    async function loadCreators() {
  try {

   const res = await api.get("/auth/creators");

const allCreators = res.data.data || [];

    const rosterRes = await api.get("/auth/favorites");

    const rosterIds = new Set(
  (rosterRes.data.data || []).map(
    favorite => favorite.creator_ref
  )
);

setRoster(rosterIds);

const availableCreators = allCreators.filter(
  creator => !rosterIds.has(creator.ref)
);

setCreators(availableCreators);

  } catch (err) {
    console.error(err);
  }
}

    loadCreators();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Discover Creators</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(320px,1fr))",
          gap: 20,
          marginTop: 30,
        }}
      >
        {creators.map((creator) => {

  const inRoster = roster.has(creator.ref);

  return (
          <div
            key={creator.ref}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <img
              src={
                creator.cover_photo ||
                "https://placehold.co/800x220"
              }
              alt=""
              style={{
                width: "100%",
                height: 170,
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 20 }}>
              <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>

  <h3>{creator.name}</h3>

  {inRoster && (
    <span
      style={{
        background: "#dcfce7",
        color: "#166534",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: "bold"
      }}
    >
      ✓ In Roster
    </span>
  )}

</div>

              <p>{creator.niche}</p>

              <p>
                Reach:{" "}
                {creator.total_reach?.toLocaleString()}
              </p>

              <p>
                From R{creator.rate}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {creator.platforms?.map((platform) => (
                  <span
                    key={platform}
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: 12,
                    }}
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <div
  style={{
    display: "flex",
    gap: 10,
    marginTop: 20,
  }}
>

  <Link to={`/creator/${creator.ref}`}>
    <button>
      View Media Kit
    </button>
  </Link>

  <button
  onClick={async () => {

    try {

      if (inRoster) {

        await api.delete(`/auth/favorites/${creator.ref}`);

        const updated = new Set(roster);
        updated.delete(creator.ref);
        setRoster(updated);

      } else {

        await api.post("/auth/favorites", {
          creator_ref: creator.ref
        });

        const updated = new Set(roster);
        updated.add(creator.ref);
        setRoster(updated);

        setCreators(
  current =>
    current.filter(
      c => c.ref !== creator.ref
    )
);

      }

    } catch (err) {

      console.error(err);

    }

  }}
>

  {inRoster ? "Remove from Roster" : "Save Creator"}

</button>


</div>
            </div>
                    </div>

        );

      })}

      </div>

    </div>
  );
}