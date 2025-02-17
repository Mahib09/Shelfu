export const sendTokenToBackend = async (token) => {
  try {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
