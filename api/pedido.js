const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbxY61sFgOQ6udjXE58B1_DfJFG5GDmxDCnep5o8MqIDQyiqCMZVeZtv-60ItWg8Lq2Y/exec";

export default async function handler(req, res) {
  // CORS para que funcione desde cualquier dispositivo
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const r = await fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      redirect: "follow",
    });

    const text = await r.text();
    return res.status(200).json({ ok: true, google: text });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
