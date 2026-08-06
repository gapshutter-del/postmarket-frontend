import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import api from "../../api/api";


export default function CampaignWorkspace() {
 
  const { campaignRef } = useParams();

  const [campaign, setCampaign] = useState(null);
 const [assets, setAssets] = useState([]);

 const [activity, setActivity] = useState([]);

 const [slots, setSlots] = useState([]);

 const [newSlot, setNewSlot] = useState({
  slot_number: 1,
  scheduled_at: "",
  execution_mode: "simultaneous",
});

const [creatingSlot, setCreatingSlot] = useState(false);

const [schedule, setSchedule] = useState({
  start_date: "",
  end_date: "",
  cadence: "weekly",
  weekdays: [],
  distribution: "simultaneous",
  windows: [],
});

const [generatedSchedule, setGeneratedSchedule] = useState([]);

const WINDOW_TEMPLATES = [
  {
    id: "brunch",
    name: "Brunch",
    slots: ["11:00", "11:15", "11:30", "11:45"],
  },
  {
    id: "business",
    name: "Close of Business",
    slots: ["17:00", "17:15", "17:30", "17:45"],
  },
  {
    id: "prime",
    name: "Prime Time",
    slots: ["20:00", "20:15", "20:30", "20:45"],
  },
];

const WEEKDAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

 const [roster, setRoster] = useState([]);
 const [selectedCreators, setSelectedCreators] = useState([]);

const [assigning, setAssigning] = useState(false);

const [uploading, setUploading] = useState(false);
  
useEffect(() => {
  async function loadCampaign() {
    try {
      const res = await api.get(`/campaigns/${campaignRef}`);

      setCampaign(res.data.data);

      function generateSchedule() {

  if (
    !schedule.start_date ||
    !schedule.end_date ||
    schedule.windows.length === 0
  ) {
    setGeneratedSchedule([]);
    return;
  }

  const events = [];

  const start = new Date(schedule.start_date);
  const end = new Date(schedule.end_date);

  const current = new Date(start);

  while (current <= end) {

    const weekday = current.toLocaleDateString(
      "en-US",
      { weekday: "short" }
    );

    if (
      schedule.cadence === "daily" ||
      schedule.weekdays.includes(weekday)
    ) {

      schedule.windows.forEach((windowId) => {

        const window = WINDOW_TEMPLATES.find(
          w => w.id === windowId
        );

        if (!window) return;

        window.slots.forEach((slot) => {

          events.push({
            date: current.toISOString().slice(0,10),
            time: slot,
            window: window.name,
          });

        });

      });

    }

    current.setDate(current.getDate() + 1);

  }

  setGeneratedSchedule(events);

}

const activityRes = await api.get(
  `/campaigns/${campaignRef}/activity`
);

setActivity(activityRes.data.data);

const slotRes = await api.get(
  `/campaigns/${campaignRef}/slots`
);

setSlots(slotRes.data.data || []);

const rosterRes = await api.get("/auth/favorites");

setRoster(
  (rosterRes.data.data || []).map(item => item.users)
);

    } catch (err) {
  console.error("Campaign load failed");
  console.error(err.response);
  console.error(err.response?.data);
  console.error(err.message);
}
  }

  loadCampaign();

}, [campaignRef]);



async function handleAssetUpload(e) {

  const file = e.target.files[0];

  if (!file) return;

  setUploading(true);

  try {

    const formData = new FormData();

    formData.append("file", file);

    const res = await api.post(

      `/campaigns/${campaignRef}/assets`,

      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

    );



    setAssets((prev) => [...prev, res.data.data]);

    const activityRes = await api.get(
  `/campaigns/${campaignRef}/activity`
);

setActivity(activityRes.data.data);

console.log(res.data.data);

  } catch (err) {

    console.error(err);

    alert("Upload failed.");

  }

  setUploading(false);

}

async function assignCreators() {

  if (selectedCreators.length === 0) {
    alert("Select at least one creator.");
    return;
  }

  try {

    setAssigning(true);

    await api.post(
      `/campaigns/${campaignRef}/assign`,
      {
        creator_refs: selectedCreators,
      }
    );


    const activityRes = await api.get(
      `/campaigns/${campaignRef}/activity`
    );

    setActivity(activityRes.data.data);

    alert("Creators invited.");

  } catch (err) {

    console.error(err);

    alert("Unable to assign creators.");

  } finally {

    setAssigning(false);

  }

}

async function createSlot() {

  try {

    setCreatingSlot(true);

    const res = await api.post(
      `/campaigns/${campaignRef}/slots`,
      newSlot
    );

    setSlots(prev => [...prev, res.data.data]);

    const activityRes = await api.get(
      `/campaigns/${campaignRef}/activity`
    );

    setActivity(activityRes.data.data);

    setNewSlot({
      slot_number: newSlot.slot_number + 1,
      scheduled_at: "",
      execution_mode: "simultaneous",
    });

  } catch (err) {

    console.error(err);

    alert("Unable to create slot.");

  } finally {

    setCreatingSlot(false);

  }

}

  return (
    <Layout>
      <PageHeader
        title="Campaign Workspace"
        subtitle="Everything about this campaign lives here."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
          maxWidth: 1200,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 24,
          }}
        >
          <Card>
  <h2>Campaign Brief</h2>

  <p>
    <strong>Title</strong>
    <br />
    {campaign?.title}
  </p>

  <p>
    <strong>Objective</strong>
    <br />
    {campaign?.objective}
  </p>

  <p>
    <strong>Caption</strong>
    <br />
    {campaign?.caption}
  </p>

  <p>
    <strong>Notes</strong>
    <br />
    {campaign?.notes}
  </p>
</Card>

<Card>

  <h2>Campaign Schedule</h2>

  <div
    style={{
      display: "grid",
      gap: 16,
    }}
  >

    <div>

      <label>Start Date</label>

      <input
        type="date"
        value={schedule.start_date}
        onChange={(e) =>
          setSchedule({
            ...schedule,
            start_date: e.target.value,
          })
        }
      />

    </div>

    <div>

      <label>End Date</label>

      <input
        type="date"
        value={schedule.end_date}
        onChange={(e) =>
          setSchedule({
            ...schedule,
            end_date: e.target.value,
          })
        }
      />

    </div>

    <div>

      <label>Cadence</label>

      <select
        value={schedule.cadence}
        onChange={(e) =>
          setSchedule({
            ...schedule,
            cadence: e.target.value,
          })
        }
      >

        <option value="daily">Daily</option>

        <option value="weekly">Weekly</option>

        <option value="custom">Custom</option>

      </select>

{schedule.cadence === "weekly" && (

  <div
    style={{
      marginTop: 16,
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
    }}
  >

    {WEEKDAYS.map((day) => (

      <label
        key={day}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >

        <input
          type="checkbox"
          checked={schedule.weekdays.includes(day)}
          onChange={(e) => {

            if (e.target.checked) {

              setSchedule({
                ...schedule,
                weekdays: [
                  ...schedule.weekdays,
                  day,
                ],
              });

            } else {

              setSchedule({
                ...schedule,
                weekdays: schedule.weekdays.filter(
                  d => d !== day
                ),
              });

            }

          }}
        />

        {day}

      </label>

    ))}

  </div>

)}

    </div>

    <div>

      <label>Distribution</label>

      <select
        value={schedule.distribution}
        onChange={(e) =>
          setSchedule({
            ...schedule,
            distribution: e.target.value,
          })
        }
      >

        <option value="simultaneous">
          Simultaneous
        </option>

        <option value="staggered">
          Staggered
        </option>

      </select>

    </div>

    <div>

      <strong>Posting Windows</strong>

      <div
        style={{
          display: "grid",
          gap: 10,
          marginTop: 10,
        }}
      >

        {WINDOW_TEMPLATES.map((window) => (

          <label key={window.id}>

            <input
              type="checkbox"
              checked={schedule.windows.includes(window.id)}
              onChange={(e) => {

                if (e.target.checked) {

                  setSchedule({
                    ...schedule,
                    windows: [
                      ...schedule.windows,
                      window.id,
                    ],
                  });

                } else {

                  setSchedule({
                    ...schedule,
                    windows: schedule.windows.filter(
                      w => w !== window.id
                    ),
                  });

                }

              }}
            />

            {" "}

            {window.name}

          </label>

        ))}

      </div>

    </div>

  </div>

</Card>

<Card>

  <h2>Schedule Preview</h2>

  {generatedSchedule.length === 0 ? (

  <p>No schedule generated.</p>

) : (

  generatedSchedule.map((item, index) => (

    <div
      key={index}
      style={{
        padding: "10px 0",
        borderBottom: "1px solid #eee",
      }}
    >

      <strong>{item.date}</strong>

      <br />

      {item.window}

      <br />

      {item.time}

    </div>

  ))

)}

</Card>

          <Card>

  <h2>Campaign Assets</h2>

  <input

    type="file"

    onChange={handleAssetUpload}

  />

  {uploading && (

    <p>Uploading...</p>

  )}

  {assets.length === 0 ? (

    <p>No assets uploaded.</p>

  ) : (

    assets.map((asset) => (

      <div

        key={asset.id}

        style={{
          padding: "12px 0",
          borderBottom: "1px solid #eee",
        }}

      >

        <strong>{asset.file_name}</strong>

        <br />

        {(asset.file_size / 1024).toFixed(1)} KB

      </div>

    ))

  )}

</Card>

          <Card>

  <h2>Campaign Timeline</h2>

  {activity.length === 0 ? (

    <p>No activity yet.</p>

  ) : (

    activity.map((item) => (

      <div
        key={item.id}
        style={{
          padding: "12px 0",
          borderBottom: "1px solid #eee",
        }}
      >

        <strong>{item.activity_type}</strong>

        <br />

        {item.message}

        <br />

        <small>
          {new Date(item.created_at).toLocaleString()}
        </small>

      </div>

    ))

  )}

</Card>





        </div>

        <div
          style={{
            display: "grid",
            gap: 24,
          }}
        >
          <Card>
  <h2>Campaign Summary</h2>

  <p>
    <strong>Reference</strong>
    <br />
    {campaign?.campaign_ref}
  </p>

  <p>
    <strong>Status</strong>
    <br />
    {campaign?.status}
  </p>

  <p>
    <strong>Created</strong>
    <br />
    {campaign?.created_at
      ? new Date(campaign.created_at).toLocaleDateString()
      : "-"}
  </p>

 <div>
  <strong>Creator</strong>

  <br />

  {campaign?.creator_ref ? (

    <>
      {campaign.creator_ref}
      <br />
      <small>{campaign.creator_status}</small>
    </>

  ) : (

    <>
      
      <div
  style={{
    display: "grid",
    gap: 8,
    marginTop: 8,
  }}
>

  {roster.map((creator) => (

    <label
      key={creator.ref}
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        checked={selectedCreators.includes(creator.ref)}
        onChange={(e) => {

          if (e.target.checked) {

            setSelectedCreators(prev => [
              ...prev,
              creator.ref,
            ]);

          } else {

            setSelectedCreators(prev =>
              prev.filter(ref => ref !== creator.ref)
            );

          }

        }}
      />

      {creator.name}

    </label>

  ))}

  <button
    onClick={assignCreators}
    disabled={assigning}
  >
    Invite Selected Creators
  </button>

</div>

      {assigning && (
        <p>Assigning...</p>
      )}

    </>

  )}

</div>

</Card>

          <Card>
            <h2>Posting Windows</h2>

            <p>No posting windows selected.</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}