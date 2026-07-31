import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function formatReach(value) {
  if (!value) return "0";

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }

  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }

  return value.toString();
}

export default function MyRoster() {

  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadRoster() {

      try {

        const res = await api.get("/auth/favorites");

        setCreators(res.data.data || []);

      } catch (err) {

        console.error("ROSTER ERROR:");
        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadRoster();

  }, []);
async function removeCreator(creatorRef) {

  try {

    await api.delete(`/auth/favorites/${creatorRef}`);

    setCreators(current =>
      current.filter(
        creator => creator.creator_ref !== creatorRef
      )
    );

  } catch (err) {

    console.error("REMOVE ERROR:");
    console.error(err);

    alert("Unable to remove creator.");

  }

}

  return (
    <div style={{ padding: 30 }}>

      <h1>My Roster</h1>

      {loading && <p>Loading...</p>}

      {!loading && creators.length === 0 && (

  <div style={{ marginTop: 40 }}>

    <h2>Your roster is empty.</h2>

    <p>
      Browse creators and build your preferred roster.
    </p>

    <Link to="/advertiser/discover">
      Discover Creators
    </Link>

  </div>

)}

      {!loading &&
        creators.map((favorite) => (

          <div
            key={favorite.id}
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 20,
              marginBottom: 20
            }}
          >

            <img
              src={
                favorite.users?.profile_photo ||
                "https://placehold.co/120x120?text=Creator"
              }
              alt={favorite.users?.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />

            <div style={{ flex: 1 }}>

              <h2 style={{ margin: 0 }}>
                {favorite.users?.name || "Unnamed Creator"}
              </h2>

              <p>
                <strong>Niche:</strong> {favorite.users?.niche}
              </p>

              <p>
                👥 {formatReach(favorite.users?.total_reach)}
              </p>

              <p
                style={{
                  color: "#0a7",
                  fontWeight: "bold"
                }}
              >
                R {favorite.users?.rate}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 15
                }}
              >

                <Link to={`/creator/${favorite.creator_ref}`}>
                  View Media Kit
                </Link>

                <button
                  onClick={() => removeCreator(favorite.creator_ref)}
                >
                  Remove
                </button>

              </div>

            </div>

          </div>

        ))}

    </div>
  );

}