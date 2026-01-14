export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const url = "https://script.google.com/macros/s/AKfycbxY61sFgOQ6udjXE58B1_DfJFG5GDmxDCnep5o8MqIDQyiqCMZVeZtv-60ItWg8Lq2Y/exec";
    const r = await fetch(url);
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ ok:false, error: String(e) });
  }
}
