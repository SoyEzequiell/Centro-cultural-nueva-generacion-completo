# Centro Cultural Nueva Generación

Aplicación web con backend Node.js + Express + SQLite y frontend estático.

## Estructura
- `public/`: frontend (index.html, css, js, img, data)
- `server.js`: servidor Express y API de autenticación
- `database.js`: conexión SQLite (usa `DB_PATH` si existe)

## Ejecutar en local
```
npm install
npm start
```
Abrir http://localhost:3000

## Desplegar en Render
- Root Directory: (vacío)
- Build Command: `npm install`
- Start Command: `npm start`
- Opcional (Persistent Disk): variable `DB_PATH=/data/database.sqlite`

## Cuentas demo del frontend
Administración: admin / Admin123!  
Recepción: recepcion / Recepcion123!  
Profesor: profesor / Profesor123!  
Coordinación: coordinacion / Coordina123!  

Solo para demostración; no uses estas contraseñas en un sistema real.
