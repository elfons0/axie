Pasos para poner nuestra app react en github pages

### Paso 1 
Vas a necesitar crear un repositorio en tu github\

### Paso 2
Tener un proyecto o crear uno, para ello puede utilizar la herramienta `create-react-app`

### Paso 3
Instalar la siguiente dependencia en nuestro proyecto `gh-pages`, desde el terminal:

`PS > npm i gh-pages`

### Paso 4
Configurar nuestro archivo `Package.json` con lo siguiente:

#### 4.1 homepage
Agregar un nuevo elemento homepage para colocar la ubicación donde estará alojado nuestro sitio (URL completa de github)

`  "homepage":"https://elfons0.github.io/axie",`

#### 4.2 predeploy y deploy
Agregar nuevos elementos en la sección de script, esto para ejecutar nuestro build y nuestro deploy desde consola

`  "scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build", ...`

### Paso 5
Todo listo para hacer el despliegue en react hacia github pages.

`PS > npm run predeploy`

`PS > npm run deploy`