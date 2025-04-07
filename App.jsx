import { useEffect, useState } from 'react'

const API_BASE = "https://home-assistant-api.onrender.com"

export default function App() {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      setError("No access token found. Please sign in.")
      return
    }

    fetch(`${API_BASE}/calendar`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async res => {
        if (!res.ok) {
          const body = await res.json()
          throw new Error(body.detail || "Failed to fetch calendar")
        }
        return res.json()
      })
      .then(data => setEvents(data.events || []))
      .catch(err => setError(err.message))
  }, [])

  const handleLogin = () => {
    window.location.href = `${API_BASE}/auth`
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Family Calendar</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {events.length > 0 ? (
        <ul>
          {events.map((e, i) => (
            <li key={i}>{e.time} - {e.summary}</li>
          ))}
        </ul>
      ) : (
        <p>No calendar events loaded.</p>
      )}
    </div>
  )
}
