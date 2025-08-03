export async function signup(username: string, password: string) {
  const res = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function signin(username: string, password: string) {
  const res = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getProfile(token: string) {
  const res = await fetch("http://localhost:8000/api/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
