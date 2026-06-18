# Grupo Scout Zenta — Landing (scoutzenta.com)

Sitio público estático del **Grupo Scout Zenta** (Orán, Salta). Más de medio
siglo de aventura scout. Desplegado en **Vercel** con dominio `scoutzenta.com`.

## Estructura

```
scoutzenta-web/
├── index.html          ← inicio (hero, nosotros, ramas, historia, contacto, mapa)
├── historia.html       ← historia completa
├── galeria.html        ← galería de recuerdos (lightbox)
├── eventos.html
├── faq.html
├── glosas.html
├── recursos.html       ← documentos PDF descargables
├── assets/
│   ├── css/zenta.css
│   ├── js/zenta.js
│   ├── img/recuerdos/  ← fotos de la galería
│   ├── docs/           ← PDFs (fichas, autorizaciones)
│   ├── logo.png
│   └── logosf.png
└── vercel.json         ← cabeceras de seguridad + caché
```

## Cómo se publica

Es un sitio **100% estático**, sin build. Vercel sirve los archivos tal cual.

1. Cambios → `git commit` → `git push`.
2. Vercel redeploya solo en cada push a `main`.

## Formulario de contacto

Usa una función serverless de Vercel (`api/contacto.js`) que envía el correo con
[Resend](https://resend.com). Los mensajes llegan a `gscoutzenta@gmail.com`
(el email público mostrado en el sitio sigue siendo `scout.zenta@gmail.com`).

Variables de entorno en Vercel (Settings → Environment Variables):

| Variable | Valor | Obligatoria |
|---|---|---|
| `RESEND_API_KEY` | la API key de Resend (`re_...`) | sí |
| `MAIL_TO` | `gscoutzenta@gmail.com` | no (default) |
| `MAIL_FROM` | `Grupo Scout Zenta <contacto@scoutzenta.com>` | no (default: `onboarding@resend.dev`) |

Para enviar desde `@scoutzenta.com` hay que verificar el dominio en Resend
(agregar los registros DNS que indique, en IONOS).

## Agregar fotos a la galería

1. Copiá las imágenes a `assets/img/recuerdos/`.
2. Agregá el número/nombre del archivo al array `PHOTOS` en `galeria.html`.
3. `git commit` + `git push`.

---

Desarrollado por Valentina Baudino · *Siempre Listos* 🔥
