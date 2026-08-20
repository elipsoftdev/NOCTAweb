# NOCTA Guard — demo interactivo aislado

URL pública: `https://elipsoftdev.github.io/NOCTAweb/demo/guard/`

## Uso local

Desde la raíz de `NOCTAweb`:

```powershell
python -m http.server 8080
```

Abre `http://127.0.0.1:8080/demo/guard/`.

## Escenarios

- QR de visitante válido, vencido, revocado e inválido.
- QR de credencial personal de residente.
- Registro manual con autorización documentada: llamada telefónica, autorizado por admin, prelista o excepcional con nota.
- Visitante dentro, salida y bitácora.
- Modo sin conexión, persistencia en `localStorage` y conciliación local visible: pendiente, sincronizando y sincronizado.

El botón **Reiniciar demo** restaura todos los fixtures ficticios. Los datos
están en `data/demo-data.js`; la interfaz y el motor de estados están en
`app.js`. No se realizan llamadas HTTP de aplicación, ni se incluyen tokens,
secretos, QR válidos o datos operativos.

## Arquitectura

Es HTML, CSS y JavaScript ES Modules sin dependencias ni backend, compatible
con GitHub Pages. `app.js` mantiene un estado local persistido con
`localStorage`; el modo online concilia los eventos pendientes de forma local.

## Integración en la landing

```html
<iframe
  src="./demo/guard/"
  title="Demo interactivo NOCTA Guard"
  loading="lazy"
></iframe>
```
