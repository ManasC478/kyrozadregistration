// returns the application url
export default () => {
  const url =
    process?.env?.APP_URL && process.env.APP_URL !== ""
      ? process.env.APP_URL
      : "http://localhost:3001";
  return url.includes("http") ? url : `https://${url}`;
};
