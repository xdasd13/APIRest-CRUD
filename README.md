 ### API REST - Gestión de Vehículos

API simple para gestionar vehículos con Node.js, Express y MySQL.

---
 
### 📦 Instalación

```
npm install express mysql2 dotenv nodemon
```
```IMPORTANTE``` Crear la Base de Datos
```sql
CREATE DATABASE tiendaveh;
USE tiendaveh;

CREATE TABLE vehiculos (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    marca   VARCHAR(30) NOT NULL,
    modelo  VARCHAR(30) NOT NULL,
    color   VARCHAR(30) NOT NULL,
    precio  DECIMAL(9,2) NOT NULL,
    placa   CHAR(7) NOT NULL UNIQUE
);
```
---

### ⚙️ Configuración
Crear archivo .env:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tiendaveh
```
---

### 📡 Endpoints



- ```GET /vehiculos``` 
Lista todos los vehículos

- ```GET /vehiculos/buscar/:placa``` 
Busca vehículo por placa

- ```POST /vehiculos``` 
Crea nuevo vehículo

json de ejemplo
```
{
  "marca": "Nissan",
  "modelo": "Frontier", 
  "color": "gris",
  "precio": 145000,
  "placa": "ABC-123"
}
```
- ```PUT /vehiculos/:id```
Actualiza vehículo

- ```DELETE /vehiculos/:id```
Elimina vehículo

---
### 🚀 Uso
```
nodemon app
```
Servidor disponible en: http://localhost:3000

---

 ### 🛑 Detener servidor
```Presiona Ctrl + C en la terminal```