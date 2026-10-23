# LaBen — web en desarrollo

Web estática hecha con HTML, CSS y JavaScript. No requiere Node.js ni compilación.

## Archivos principales
- `index.html`: contenido y estructura de la web. Incluye comentarios que indican dónde se conectarán el logo, las fotos y los audios.
- `styles.css`: apariencia visual.
- `script.js`: interacciones y secuenciador de prueba.
- `assets/`: logo, fotos y carpetas preparadas para demos y samples.

## Material recibido hasta ahora
- `assets/logo-laben.png`: logo con fondo transparente, preparado a partir del archivo enviado.
- `assets/photos/laben-en-vivo-01.jpg`: primera foto de LaBen recibida.

## Dónde poner el resto de las fotos y audios
1. En tu computadora, abrí la carpeta del proyecto.
2. Para fotos nuevas, copialas dentro de `assets/photos/`.
3. Para canciones o fragmentos de demos, copialos dentro de `assets/audio/demos/`.
4. Para sonidos individuales que quieras usar en el secuenciador, copialos dentro de `assets/audio/samples/`.
5. Poneles nombres simples, por ejemplo `demo-cotidiano.mp3`, `sample-bombo-01.wav` o `laben-ensayo-02.jpg`. Evitá tildes y espacios.
6. Guardar archivos en esas carpetas no basta para que aparezcan o suenen automáticamente: después hay que enlazarlos desde el HTML/JavaScript. Los comentarios en `index.html` marcan los lugares correspondientes.

## Cómo actualizar la web que ya está publicada
1. Entrá al repositorio `laben-web` en GitHub.
2. Elegí **Add file → Upload files**.
3. Arrastrá los archivos nuevos manteniendo sus carpetas (`assets/photos/...`, `assets/audio/demos/...`, etc.). Para reemplazar archivos del proyecto, subí también las versiones nuevas de `index.html`, `styles.css`, `script.js` o `README.md` si los modificamos.
4. Presioná **Commit changes**.
5. Cloudflare Pages debería desplegar los cambios automáticamente. Esperá a que termine y probá la web.

## Importante por ahora
- El secuenciador todavía genera tonos de prueba; aún no reproduce samples desde archivos.
- La galería de fotos todavía es una sección provisional; la foto recibida queda guardada en `assets/photos/` para integrarla al escritorio/archivo en el siguiente paso.
- Reemplazá `hola@laben.musica.ar` por un correo real antes de publicar; tener el dominio no crea un buzón automáticamente.
