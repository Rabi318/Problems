const url = require("url");
const querystring = require("querystring");

function parseUrl(inputUrl) {
  if (!inputUrl || typeof inputUrl !== "string") {
    return { error: "Invalid or Missing URL" };
  }
  try {
    const parsed = url.parse(inputUrl);
    const queryParams = querystring.parse(parsed.query);
    return {
      hostname: parsed.hostname,
      pathname: parsed.pathname,
      query: queryParams,
    };
  } catch (err) {
    return { error: "Error parsing URL." };
  }
}
