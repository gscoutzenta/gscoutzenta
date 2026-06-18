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

Usa [FormSubmit](https://formsubmit.co) (sin backend). Los mensajes llegan a
`scout.zenta@gmail.com`. **La primera vez** que alguien envía el formulario,
FormSubmit manda un email de confirmación a esa casilla: hay que hacer clic
una sola vez para activarlo.

## Agregar fotos a la galería

1. Copiá las imágenes a `assets/img/recuerdos/`.
2. Agregá el número/nombre del archivo al array `PHOTOS` en `galeria.html`.
3. `git commit` + `git push`.

---

Desarrollado por Valentina Baudino · *Siempre Listos* 🔥
