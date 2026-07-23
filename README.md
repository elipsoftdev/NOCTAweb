# NOCTA Presentation

Presentación web interactiva de NOCTA, lista para GitHub Pages.

## Uso local

Abre `index.html` directamente o sirve la carpeta con:

```bash
python -m http.server 8080
```

## GitHub Pages

1. Crea un repositorio nuevo.
2. Sube todos los archivos de esta carpeta a la raíz del repositorio.
3. Ve a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona `main` y `/ (root)`.
6. Guarda y espera el despliegue.

La web usa rutas relativas, por lo que funciona correctamente en GitHub Pages sin modificar `base`.
