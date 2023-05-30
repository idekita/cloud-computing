# API Endpoints Documentation

## Auth and User Endpoint

### 1. Register
- **Endpoint:** `/register`
- **Method:** `POST`
- **Authorization:** No
- **Description:** Register a new user.
- **Request Body:**
  - username as string, must be unique
  - password as string
  - name as string
  - email as string

- **Response:**
  ```JSON
  {
    "status": "success",
    "message": "Registrasi berhasil",
    "user": {
    "id": 4,
    "username": "user",
    "password": "$2b$10$2ZS4DPxagGU./Nr2IlsNR.p7SwYq8FFvicxxOqui2tY7tKmgtG/.W",
    "name": "User Baru",
    "email": "user@gmail.com"
    }
  }
  ```

### 2. Login
- **Endpoint:** `/login`
- **Method:** `POST`
- **Authorization:** No
- **Description:** authenticate a user based on the database.
- **Request Body:**
  - username as string
  - password as string

- **Response:**
  ```JSON
  {
    "status": "success",
    "message": "Login berhasil",
    "user": {
    "username": "user",
    "name": "User Baru",
    "email": "user@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2ODU0MDgxMTYsImV4cCI6MTY4NTQxMTcxNn0.eRwhWf2DgSOgc-W4HeY1tbjyrOa82M24zowUsMs9aZQ"
  }
  ```

### 3. Profil
- **Endpoint:** `/profil/:username`
- **Method:** `GET`
- **Authorization:** Yes
- **Description:** to get logged in user data.
- **Request Body:**
  - username as string
  - password as string

- **Header:**
  - Authorization: Bearer {token}

- **Parameters:**
  - username as string, required

- **Response:**
  ```JSON
  {
    "status": "success",
    "message": "Username berhasil ditemukan",
    "user": {
    "id": 4,
    "username": "user",
    "name": "User Baru",
    "email": "user@gmail.com",
    "last_login": "2023-05-30T07:55:16.459Z"
    }
  }
  ```

## Category Endpoint

|No| Endpoint  | Method | Authorization | Description              |
| --- |--------- | ------ | ----------- | ------------------------ |
| 1 |/kategori | GET    | Yes           | to get all category data |

### 1. Kategori

- Header:
  - Authorization: Bearer {token}

- Response:
  ```JSON
  {
    "status": "success",
    "message": "Daftar kategori berhasil ditemukan",
    "categories": [
      {
      "id": 1,
      "nm_kategori": "Sosial"
      },
      {
      "id": 2,
      "nm_kategori": "Pendidikan"
      },
      {
      "id": 3,
      "nm_kategori": "Kesehatan"
      },
      {
      "id": 4,
      "nm_kategori": "Budaya"
      },
      {
      "id": 5,
      "nm_kategori": "Politik"
      }
    ]
  }
  ```

## Project Endpoint

|No| Endpoint           | Method | Authorization | Description                       |
|---| ------------------ | ------ | ---------- | --------------------------------- |
|1| /proyek              | POST   | Yes        | to create project                 |
|2| /proyek              | GET    | Yes        | to get all created project data   |
|3| /proyek/:id_proyek   | GET    | Yes        | to get project data by id project |

## Contribution Endpoint

|No| Endpoint                     | Method | Authorization | Description                                                   |
|---| ---------------------------- | ------ | ------------- | ------------------------------------------------------------- |
| 1 | /kontributor                 | POST   | Yes           | to register contribute     |
| 2 | /kontributor/:id_kontributor | PUT    | Yes           | to change the contributor status to accepted or not by id, to update it must be the creator project     |
| 3 | /kontributor/:id_proyek      | GET    | Yes           | to get contributor data on the project where status = diterima|
| 4 | /kontributor/menunggu/:id_proyek      | GET    | Yes           | to get contributor data on the project where status = menunggu |

### 1. Register Contribut
  
- Header:
  - Authorization: Bearer <token>

- Request Body:
  - id_proyek as int, required

- Response:
  ```JSON
  {
    "status": "success",
    "message": "Kontributor Berhasil Mendaftar",
    "contributor": {
        "role": "-",
        "status_lamaran": "menunggu",
        "id": 7,
        "id_proyek": 1,
        "username": "user"
    }
  }
  ```

### 2. Change/Update Contributor Status
  
- Header:
  - Authorization: Bearer <token>
  
- Parameters:
  - id_kontributor as int, required

- Request Body:
  - status_lamaran as enum ['menunggu'(default), 'ditolak', 'diterima'], required
  - role as string, optional

- Response:
  ```JSON
  {
    "status": "success",
    "message": "Lamaran berhasil diterima!"
  }
  ```
  
### 3. Get Contributors by Id Project
  
- Header:
  - Authorization: Bearer <token>

- Parameters:
  - id_proyek as int, required

- Response:
  ```JSON
  {
    "status": "success",
    "message": "Daftar Kontributor berhasil ditemukan",
    "contributors": [
        {
            "username": "zul",
            "name": "zul fiandi",
            "role": "Frontend Developer"
        },
        {
            "username": "user",
            "name": "User Baru",
            "role": "Backend Developer"
        }
    ]
  }
  ```
  
  ### 4. Get Contributors Where Status Waiting
  
- Header:
  - Authorization: Bearer <token>

- Parameters:
  - id_proyek as int, required

- Response:
  ```JSON
  {
    "status": "success",
    "message": "Daftar Kontributor berhasil ditemukan",
    "contributors": [
        {
            "id": 3,
            "id_proyek": 3,
            "username": "deo",
            "role": "-",
            "status_lamaran": "menunggu"
        },
        {
            "id": 8,
            "id_proyek": 3,
            "username": "user",
            "role": "-",
            "status_lamaran": "menunggu"
        }
    ]
  }
  ```


## Rating Endpoint

|No| Endpoint | Method | Authorization | Description    |
|---| -------- | ------ | ------------- | -------------- |
| 1 | /rating  | POST   | Yes           | to do a rating |

### 1. Create Rating
  
- Header:
  - Authorization: Bearer <token>

- Request Body:
  - id_proyek as int, required
  - password as int (1 - 5), required

- Response:
  ```JSON
  {
    "status": "success",
    "message": "Berhasil melakukan rating",
    "rating": {
        "id": 7,
        "id_proyek": 2,
        "username": "user",
        "nilai": 4
    }
  }
  ```
