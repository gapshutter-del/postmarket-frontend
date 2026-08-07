import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

import api from "../../api/api";

export default function CampaignWorkspace() {

  const { campaignRef } = useParams();

  const [campaign, setCampaign] = useState(null);

const [schedule, setSchedule] = useState({
  start_date: "",
  end_date: "",
  cadence: "weekly",
  weekdays: [],
});

  useEffect(() => {

    async function loadWorkspace() {

      try {

        const res = await api.get(`/campaigns/${campaignRef}`);

        setCampaign(res.data.data);

      } catch (err) {

        console.error(err);

      }

    }

    loadWorkspace();

  }, [campaignRef]);

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

    {campaign?.title || "-"}

  </p>

  <p>

    <strong>Objective</strong>

    <br />

    {campaign?.objective || "-"}

  </p>

  <p>

    <strong>Caption</strong>

    <br />

    {campaign?.caption || "-"}

  </p>

  <p>

    <strong>Notes</strong>

    <br />

    {campaign?.notes || "-"}

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

  </div>

</Card>

        </div>

        <div
          style={{
            display: "grid",
            gap: 24,
          }}
        >

        </div>

      </div>

    </Layout>

  );

}