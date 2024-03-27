export const createSession = async (tokens) => {
  const formData = new FormData();
  formData.append("access_token", tokens.access_token);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/session`,
    { method: "POST", body: formData },
  );

  const res = await response.json();

  return res;
};
