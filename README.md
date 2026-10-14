# Portafolio - César Luis Viña Bonillo

Portafolio web (sitio estático) del CV de **César Luis Viña Bonillo**, Ingeniero de Sistemas y Desarrollador Web Full Stack.

## Contenido

- `index.html` — estructura y contenido del portafolio.
- `styles.css` — estilos, diseño responsive y tema claro/oscuro.
- `script.js` — menú móvil, cambio de tema y animaciones.
- `assets/CV_Cesar_Vina.pdf` — CV descargable.
- `render.yaml` — configuración de despliegue en Render (sitio estático).

## Desarrollo local

Solo abre `index.html` en el navegador, o levanta un servidor local:

```bash
python -m http.server 8080
# luego abre http://localhost:8080
```

## Despliegue en Render

Este repositorio incluye `render.yaml`, por lo que puedes desplegarlo como **Blueprint**:

1. Entra a [render.com](https://render.com) e inicia sesión con GitHub.
2. Clic en **New +** → **Blueprint**.
3. Selecciona este repositorio.
4. Render detecta `render.yaml` y crea el sitio estático. Acepta y despliega.
5. En unos segundos tendrás una URL tipo `https://portafolio-cesar-vina.onrender.com`.

### Alternativa (Static Site manual)

1. **New +** → **Static Site**.
2. Conecta el repositorio.
3. Configura: **Build Command** vacío, **Publish Directory**: `.`
4. **Create Static Site**.

Cada `push` a la rama `main` vuelve a desplegar automáticamente.

## Personalización

- Actualiza enlaces de LinkedIn/GitHub en `index.html` (sección Contacto).
- Reemplaza `assets/CV_Cesar_Vina.pdf` cuando actualices tu currículum.
