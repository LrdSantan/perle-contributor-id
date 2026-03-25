import type { VercelRequest, VercelResponse } from "@vercel/node";
import https from "https";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { username } = req.query;
  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Missing username" });
  }

  const url = `https://unavatar.io/twitter/${username}`;

  https.get(url, (proxyRes) => {
    res.setHeader("Content-Type", proxyRes.headers["content-type"] || "image/jpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400");
    proxyRes.pipe(res);
  }).on("error", () => {
    res.status(500).json({ error: "Failed to fetch avatar" });
  });
}
