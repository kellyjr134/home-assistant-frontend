import { useEffect, useState } from 'react'

const API_BASE = "https://home-assistant-api-unjt.onrender.com"

export default function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/calendar`)
      .then(res => res.json())
      .then(data => setEvents(data.events || []))
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Family Calendar</h1>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{e.time} - {e.summary}</li>
        ))}
      </ul>
    </div>
  )
}
