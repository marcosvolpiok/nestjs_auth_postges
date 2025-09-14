# 🚀 Backend de Autenticación y Autorización (ABAC-lite)

## 📖 Introducción
¡Bienvenido a este bello **Backend**!  
Aquí encontrarás una demostración de un sistema de **autenticación** junto con un sistema de **autorización basado en atributos (ABAC-lite)**.  

Las tecnologías principales utilizadas son:  
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)  
- [JWT](https://jwt.io/)  
- [Docker](https://www.docker.com/)  

---

## ▶️ Cómo ejecutar el backend

Ejecutá los siguientes comandos desde la raíz del proyecto:

```bash
docker-compose build
docker-compose up
```

## 🧪 Probar el backend

Para simplificar las pruebas, en el directorio **`postman/`** encontrarás:  
- Una colección con todos los requests.  
- Variables de entorno preconfiguradas.  

En este backend se manejan **3 tipos de endpoints** y **2 roles de usuario**:  

- **Roles disponibles**:  
  - `USER`  
  - `ADMIN`  

Cada rol tiene permisos diferentes basados en su nivel de acceso.  

---

## 🔑 Endpoints y permisos

<div align="center">
  <img width="303" height="294" alt="Diagrama de roles y permisos" src="https://github.com/user-attachments/assets/3e3cfcb9-5ac4-4875-9808-61e0ab84d951" />
</div>

### 👤 Endpoints de `User`
- Acceso: **público**.  
- Permiten:  
  - Crear un usuario (`sign-up`).  
  - Iniciar sesión (`login`).  

### 📇 Endpoints de `Contact`
- Acceso: **requiere estar logueado** (`USER` o `ADMIN`).  
- Permiten:  
  - Crear contactos.  
  - Listar contactos.  
    - Si sos `USER`, solo verás **nombre** e **ID**.  
    - Si sos `ADMIN`, también verás el **email**.  

### 🛡️ Endpoints de `Admin`
- Acceso: **solo usuarios con rol ADMIN**.  
- Permiten:  
  - Listar todos los usuarios.  
  - Cambiar el rol de un usuario (`ADMIN` ⇆ `USER`).  

⚠️ **Nota importante:**  
Al crearse un usuario, por defecto se asigna el rol `USER`.  
Si querés crear un usuario con rol `ADMIN`, es necesario modificarlo directamente en la base de datos.  

---

## 🗄️ Configuración de la base de datos (valores por defecto)

- **Base de datos**: `volsmart_db`  
- **Host**: `localhost`  
- **Usuario**: `volsmart_user`  
- **Contraseña**: `volsmart_password`  
- **Puerto**: `5433`

## ✅ Tareas pendientes
Me quedaron tareas pendientes en el desarrollo de esta demostración, como todo programa en la ingeniería de software, las mejoras son incrementales y sería genial implementarlas en versiones futuras.  
👉 Podés ver un listado de estas en los [issues de GitHub](https://github.com/marcosvolpiok/nestjs_auth_postges/issues).

