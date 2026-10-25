const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const fs = require('fs');

// Ruta de la base de datos. En Render con Persistent Disk define DB_PATH=/data/database.sqlite
const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'database.sqlite');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear tablas e insertar roles por defecto
db.serialize(() => {
    // Tabla de roles
    db.run(`CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT UNIQUE NOT NULL
    )`, (err) => {
        if (!err) {
            const rolesIniciales = ['admin', 'coordinador', 'profesor', 'recepcionista'];
            rolesIniciales.forEach(rol => {
                db.run(`INSERT OR IGNORE INTO roles (nombre) VALUES (?)`, [rol]);
            });
        }
    });

    // Tabla de usuarios
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT,
        google_id TEXT UNIQUE,
        rol_id INTEGER NOT NULL,
        activo INTEGER DEFAULT 1,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (rol_id) REFERENCES roles(id)
    )`);
});

module.exports = db;
