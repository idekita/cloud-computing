# API Endpoints Documentation

## Auth and User Endpoint

|No| Endpoint          | Method | Authorization | Description                                  |
|---|------------------ | ------ | ----------- | -------------------------------------------- |
|1| /register         | POST   | No            | to register a new user                       |
|2| /login            | POST   | No            | to authenticate a user based on the database |
|3| /profil/:username | GET    | Yes           | to get logged in user data                   |

### 1. Register

- Request Body:
  - username as string, must be unique
  - password as string
  - name as string
  - email as string

- Response:
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

- Request Body:

  - username as string
  - password as string

- Response:
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

- Header:

  - Authorization: Bearer {token}

- Parameters:

  - username as string, required

- Response:
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

| Endpoint  | Method | Authorization | Description              |
| --------- | ------ | ------------- | ------------------------ |
| /kategori | GET    | Yes           | to get all category data |

### 1. Kategori

- Header:

  - Authorization: Bearer <token>

- Response:
  ```
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

| Endpoint           | Method | Authorization | Description                       |
| ------------------ | ------ | ------------- | --------------------------------- |
| /proyek            | POST   | Yes           | to create project                 |
| /proyek            | GET    | Yes           | to get all created project data   |
| /proyek/:id_proyek | GET    | Yes           | to get project data by id project |

## Contribution Endpoint

| Endpoint                     | Method | Authorization | Description                                                   |
| ---------------------------- | ------ | ------------- | ------------------------------------------------------------- |
| /kontributor/:id_kontributor | PUT    | Yes           | to change the contributor status to accepted or not by id     |
| /kontributor/:id_proyek      | GET    | Yes           | to get contributor data on the project where status = waiting |

## Rating Endpoint

| Endpoint | Method | Authorization | Description    |
| -------- | ------ | ------------- | -------------- |
| /rating  | POST   | Yes           | to do a rating |
