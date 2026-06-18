// Función serverless (Vercel) — recibe el formulario de contacto y envía el
// correo con Resend. La API key vive como variable de entorno (RESEND_API_KEY),
// nunca en el HTML público.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }

  // Body (Vercel suele parsear JSON; si no, lo leemos del stream)
  let data = req.body;
  if (!data || typeof data === 'string') {
    try {
      const raw = await new Promise((resolve, reject) => {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => resolve(b));
        req.on('error', reject);
      });
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = {};
    }
  }

  const nombre = (data.nombre || '').toString().trim();
  const email = (data.email || '').toString().trim();
  const telefono = (data.telefono || '').toString().trim();
  const mensaje = (data.mensaje || '').toString().trim();
  const honey = (data._honey || '').toString().trim();

  // Honeypot anti-spam: si viene completo, lo tratamos como éxito y descartamos
  if (honey) return res.status(200).json({ ok: true });

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ ok: false, error: 'Faltan datos obligatorios.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: 'El servidor no tiene configurada la API key.' });
  }

  const TO = process.env.MAIL_TO || 'gscoutzenta@gmail.com';
  const FROM = process.env.MAIL_FROM || 'Grupo Scout Zenta <onboarding@resend.dev>';

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html =
    `<h2 style="font-family:sans-serif;color:#0b2b5d;">Nuevo mensaje desde scoutzenta.com</h2>` +
    `<table style="font-family:sans-serif;font-size:15px;line-height:1.6;">` +
    `<tr><td><strong>Nombre:</strong></td><td>${esc(nombre)}</td></tr>` +
    `<tr><td><strong>Email:</strong></td><td>${esc(email)}</td></tr>` +
    `<tr><td><strong>Teléfono:</strong></td><td>${esc(telefono) || '—'}</td></tr>` +
    `</table>` +
    `<p style="font-family:sans-serif;font-size:15px;"><strong>Mensaje:</strong></p>` +
    `<p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;">${esc(mensaje)}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Web Zenta · mensaje de ${nombre}`,
        html,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ ok: false, error: 'No se pudo enviar el correo.', detail });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Error de conexión con el proveedor de correo.' });
  }
};
