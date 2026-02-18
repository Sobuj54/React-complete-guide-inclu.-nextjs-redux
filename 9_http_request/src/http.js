export async function fetchAvailablePlaces() {
  const res = await fetch("http://localhost:3000/places");
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch places.");
  }

  return data.places;
}

export async function fetchUserPlaces() {
  const res = await fetch("http://localhost:3000/user-places");
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch user places.");
  }

  return data.places;
}

export async function updateUserPlaces(places) {
  const res = await fetch("http://localhost:3000/user-places", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to update user data.");
  }

  return data.message;
}
