export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const pedido = req.body;

    const url = "https://script.google.com/macros/s/AKfycbxY61sFgOQ6udjXE58B1_DfJFG5GDmxDCnep5o8MqIDQyiqCMZVeZtv-60ItWg8Lq2Y/exec";

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });

    const text = await r.text();
    return res.status(200).json({ ok: true, google: text });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
