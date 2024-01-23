export const logout = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.log("Don´t Logout");
    } else {
      const json = await response.json();
      console.log(json);
    }
  } catch (error) {
    console.error("Logout Issue:", error);
  }
};
