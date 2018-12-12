const noCache = "public, no-cache, no-store, must-revalidate";
const reactCDN = "https://unpkg.com/react@16/umd/react";
const reactDomCDN = "https://unpkg.com/react-dom@16/umd/react-dom";
const staticContentTypes: { [url: string]: string } = {
  "/": "",
};

const Config: IAppConfig = {
  browserURL: "main.js",
  cacheControl: (prod, days) => !prod || days === 0 ? noCache : `public, max-age=${days * 24 * 60 * 60}`,
  contentTypes: (url) => staticContentTypes[url] ? staticContentTypes[url] : "",
  propsURL: "",
  reactDomURL: (prod) => reactDomCDN + (prod ? ".prodution.js" : ".development.js"),
  reactURL: (prod) => reactCDN + (prod ? ".production.js" : ".development.js"),
  rootContainer: "main",
};

export default Config;
