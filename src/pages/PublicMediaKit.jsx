import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/api";

export default function PublicMediaKit() {
  const { ref } = useParams();

  const [creator, setCreator] = useState(null);

  useEffect(() => {
    async function loadCreator() {
      try {
        const res = await api.get(`/auth/creators/${ref}`);
        setCreator(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCreator();
  }, [ref]);

  if (!creator) {
    return <p style={{ padding: 40 }}>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>

      <div
  style={{
    position: "relative",
    marginBottom: 80,
  }}
>

  <img
    src={
      creator.cover_photo ||
      "https://placehold.co/1200x300"
    }
    alt=""
    style={{
      width: "100%",
      height: 260,
      objectFit: "cover",
    }}
  />

  <img
    src={
      creator.profile_photo ||
      "https://placehold.co/220"
    }
    alt=""
    style={{
      width: 170,
      height: 170,
      borderRadius: "50%",
      objectFit: "cover",
      border: "6px solid white",
      position: "absolute",
      left: 40,
      bottom: -70,
      background: "#fff",
    }}
  />

</div>

      <div
  style={{
    padding: "0 40px 40px",
  }}
>

        <h1
  style={{
    marginBottom: 8,
  }}
>
  {creator.name}
</h1>

<h3
  style={{
    color: "#666",
    marginBottom: 20,
  }}
>
  {creator.niche}
</h3>

<p
  style={{
    fontSize: 18,
    maxWidth: 700,
    lineHeight: 1.6,
  }}
>
  {creator.audience_desc}
</p>

   <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 20,
    marginTop: 40,
    marginBottom: 40,
  }}
>

  <div
    style={{
      padding: 25,
      border: "1px solid #ddd",
      borderRadius: 12,
      textAlign: "center",
    }}
  >
    <h4>Total Reach</h4>

    <h2>
      {creator.total_reach?.toLocaleString()}
    </h2>
  </div>

  <div
    style={{
      padding: 25,
      border: "1px solid #ddd",
      borderRadius: 12,
      textAlign: "center",
    }}
  >
    <h4>Starting Rate</h4>

    <h2>
      R{creator.rate}
    </h2>
  </div>

  <div
    style={{
      padding: 25,
      border: "1px solid #ddd",
      borderRadius: 12,
      textAlign: "center",
    }}
  >
    <h4>Platforms</h4>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        flexWrap: "wrap",
        marginTop: 15,
      }}
    >
      {creator.platforms?.map((platform) => (
        <span
          key={platform}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 13,
          }}
        >
          {platform}
        </span>
      ))}
    </div>

  </div>

</div>

<hr style={{ margin: "40px 0" }} />

<h2>Portfolio</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: 20,
    marginTop: 20,
  }}
>

  {[1,2,3].map((item) => (

    <div
      key={item}
      style={{
        height: 180,
        borderRadius: 12,
        background: "#efefef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#777",
      }}
    >
      Portfolio Coming Soon
    </div>

  ))}

</div>

<div
  style={{
    marginTop: 50,
    textAlign: "center",
  }}
>

  <button
    style={{
      padding: "14px 40px",
      fontSize: 18,
      cursor: "pointer",
    }}
  >
    Invite Creator
  </button>

</div>

      </div>

    </div>
  );
}