# LaBen — web inicial

Primera versión de la web de LaBen: HTML, CSS y JavaScript sin dependencias ni proceso de compilación.

## Archivos
- `index.html`: estructura, contenido y secciones bilingües.
- `styles.css`: diseño adaptable, estética industrial y componentes visuales.
- `script.js`: cambio de idioma, navegación móvil, secuenciador de 16 pasos y pads de audio sintetizado.

## Probar en tu computadora
La forma más simple es abrir `index.html` en un navegador. Para probar el audio, hacé clic en un pad o en INICIAR; los navegadores requieren una interacción del usuario para habilitar el audio.

## Antes de publicar
1. Reemplazar `hola@laben.musica.ar` por un correo real de contacto.
2. Reemplazar el texto de presentación por la biografía definitiva.
3. Incorporar fotos, videos y audios originales de la banda.
4. Probar los controles en celular y computadora.

## Publicar con GitHub + Cloudflare Pages
1. Crear un repositorio nuevo en GitHub, por ejemplo `laben-web`.
2. Subir estos archivos a la raíz del repositorio (`index.html`, `styles.css`, `script.js` y `README.md`).
3. En Cloudflare: **Workers & Pages → Create application → Pages → Connect to Git**.
4. Autorizar GitHub y elegir `laben-web`.
5. Configuración de build:
   - Framework preset: `None` (o `No framework`)
   - Build command: dejar vacío
   - Build output directory: `/` o `.` según lo que acepte el formulario. Si no acepta ninguno, consultá la ayuda de Cloudflare Pages antes de continuar.
6. Iniciar el despliegue. Cloudflare entregará una URL `*.pages.dev`.

No conectes aún el dominio de NIC Argentina. Primero confirmá que el sitio se publique correctamente en la URL temporal. Luego se configura el dominio personalizado.

## Notas técnicas
- No requiere Node.js, npm, React ni compilación.
- El secuenciador y los pads generan tonos de prueba mediante Web Audio API; todavía no reproducen samples grabados de LaBen.
- No hay backend ni recopilación de datos.
- El correo de contacto es un marcador de posición; la dirección no se crea automáticamente por tener el dominio.
