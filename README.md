# Piloto Playwright para TestHub

Suite de ejemplo contra https://demo.playwright.dev/todomvc/. La primera prueba crea una tarea y la completa. La segunda busca una tarea inexistente a propósito. Se espera **una correcta y una fallida**. El fallo genera una captura del paso y una traza.

## Ejecutar directamente para comprobar el código

Con Node.js 24, abre una terminal en esta carpeta:

```sh
npm ci
npx playwright install chromium
npm test
npx playwright show-report
```

Puedes ejecutar solo el caso correcto con `npm run test:ok` o solo el fallo con `npm run test:fallo`. El comando `npm test` termina con código 1 porque la suite incluye un fallo intencionado.

## Probar desde TestHub publicado

1. Sube estos archivos a la raíz de un repositorio público de GitHub o GitLab y publica una rama.
2. En TestHub, abre **Conectar proyecto**, pega la URL del repositorio y guarda la ficha.
3. Desde la ficha, pulsa **Preparar ejecución**, elige la rama y Chromium. Puedes dejar vacío el filtro para ejecutar ambas pruebas o escribir `Fallo intencionado` para ejecutar solo esa.
4. Pulsa **Lanzar en remoto**. El repositorio incluye el helper que envía imágenes por paso al visor de TestHub. La captura del fallo aparecerá en el detalle con el título **Comprobar una tarea que no existe**.

La web de TodoMVC ya es pública. El repositorio con esta suite debe publicarse por separado para que TestHub pueda obtenerlo. Mientras el ejecutor remoto de TestHub no esté conectado, la prueba quedará en cola. Quien lanza desde TestHub no necesita instalar nada.

Para apuntar el código a otra instancia de TodoMVC compatible, ajusta `BASE_URL` conservando la barra final. Si cambias a otra aplicación, adapta también los pasos y los selectores.

Para comprobar el selector de TestHub, pulsa **Actualizar ramas** en el lanzador y elige `develop`, la rama de trabajo del piloto.
