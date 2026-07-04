const API_BASE_URL = "http://localhost:5001";

export async function getSessions() {
  const response = await fetch(`${API_BASE_URL}/sessions`);

  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }

  return response.json();
}

export async function getSessionById(sessionId) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }

  return response.json();
}

export async function updatePlayerScore(sessionId, playerId, score) {
  const response = await fetch(
    `${API_BASE_URL}/sessions/${sessionId}/players/${playerId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update player score");
  }

  return response.json();
}