export default async (url, options) => {
  const res = await fetch(url, {
    ...options,
    credentials: "same-origin",
  });

  return res.json();
};
