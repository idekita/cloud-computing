# API Endpoints Documentation

### Endpoint
`https://idekita-ttdc4jg2wq-et.a.run.app`, may be replaced
- [3. Project Endpoint](#project)


## Auth and User Endpoint

### 1. Register
- **URL:** 
  - `/register`
- **Method:** 
  - `POST`
- **Description:** 
  - Register a new user.
- **Request Body:**
  - `username` as `string`, must be unique
  - `password` as `string`
  - `name` as `string`
  - `email` as `string`

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
- **URL:** 
  - `/login`
- **Method:** 
  - `POST`
- **Description:** 
  - authenticate a user based on the database.
- **Request Body:**
  - `username` as `string`
  - `password` as `string`

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
- **URL:** 
  - `/profil/:username`
- **Method:** 
  - `GET`
- **Description:** 
  - to get logged in user data.
- **Request Body:**
  - `username` as `string`
  - `password` as `string`

- **Header:**
  - `Authorization`: `Bearer {token}`

- **Parameters:**
  - `username` as `string`, required

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
### 1. Kategori
- **URL:** 
  - `/kategori`
- **Method:** 
  - `GET`
- **Description:** 
  - to get all category data
- **Header:**
  - `Authorization`: `Bearer {token}`

- **Response:**
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

## Project Endpoint {#project}
### 1. Create Project
- **URL:** 
  - `/proyek`
- **Method:** 
  - `POST`
- **Description:** 
  - to create project
- **Header:**
  - `Authorization`: `Bearer {token}`
- **Request Body:**
  - `username` as `string`, must be unique
  - `id_kategori` as `int`
  - `tanggal_mulai` as `date`
  - `tanggal_selesai` as `string`
  - `file` as `file`, must be a valid image file, max size 2mb
  
- **Response:**
  ```JSON
  {
    "status": "success",
    "message": "Project berhasil dibuat",
    "project": {
        "status": "terbuka",
        "total_rate": 0,
        "jumlah_raters": 0,
        "mean_rate": 0,
        "id": 4,
        "creator": "deo",
        "nm_proyek": "Platform E-Learning",
        "id_kategori": 1,
        "deskripsi": "ini adalah aplikasi elearning ruangbelajar",
        "gambar": "LV60Ui1ndSLAOw1q3tTnU.png",
        "tanggal_mulai": "2023-05-29T00:00:00.000Z",
        "tanggal_selesai": "2023-07-29T00:00:00.000Z"
    }
  }
  ```
  
### 2. Get All Projects
- **URL:** 
  - `/proyek`
- **Method:** 
  - `GET`
- **Description:** 
  - to get all created project data order by tanggal_mulai ascending
- **Header:**
  - `Authorization`: `Bearer {token}`
- **Response:**
  ```JSON
  {
    "status": "success",
    "message": "Daftar Project berhasil ditemukan",
    "projects": [
        {
            "id": 2,
            "creator": "deo",
            "nm_proyek": "Platform Mengumpulkan Ide",
            "id_kategori": 1,
            "deskripsi": "ini adalah aplikasi mirip idekita hehe",
            "gambar": "LV60Ui1ndSLAOw1q3tTnU.png",
            "tanggal_mulai": "2023-05-23",
            "tanggal_selesai": "2023-08-24",
            "status": "terbuka",
            "total_rate": 4,
            "jumlah_raters": 1,
            "mean_rate": 4,
            "category": {
                "nm_kategori": "Sosial"
            }
        },
        {
            "id": 1,
            "creator": "deo",
            "nm_proyek": "Platform Crowdsourcing untu Masyarakat Jawa",
            "id_kategori": 1,
            "deskripsi": "ini adalah aplikasi mirip idekita hehe",
            "gambar": "LV60Ui1ndSLAOw1q3tTnU.png",
            "tanggal_mulai": "2023-05-22",
            "tanggal_selesai": "2023-08-22",
            "status": "selesai",
            "total_rate": 12,
            "jumlah_raters": 3,
            "mean_rate": 4,
            "category": {
                "nm_kategori": "Sosial"
            }
        }
    ]
  }
  ```

### 3. Detail Project
- **URL:** 
  - `/proyek/:id_proyek`
- **Method:** 
  - `GET`
- **Description:** 
  - to get project data by id project
- **Header:**
  - `Authorization`: `Bearer {token}`
- **Parameters:**
  - `id_proyek` as `int`, required
- **Response:**
  ```JSON
  {
    "status": "success",
    "message": "Daftar Project berhasil ditemukan",
    "projects": [
        {
            "id": 4,
            "creator": "deo",
            "nm_proyek": "Platform E-Learning",
            "id_kategori": 1,
            "deskripsi": "ini adalah aplikasi elearning ruangbelajar",
            "gambar": "LV60Ui1ndSLAOw1q3tTnU.png",
            "tanggal_mulai": "2023-05-29",
            "tanggal_selesai": "2023-07-29",
            "status": "terbuka",
            "total_rate": 0,
            "jumlah_raters": 0,
            "mean_rate": 0,
            "category": {
                "nm_kategori": "Sosial"
            }
        }
    ]
  }
  ```
  
  ### 4. Get Project By Category
- **URL:** 
  - `/proyek/kategori/:kategori`
- **Method:** 
  - `GET`
- **Description:** 
  - to get project based on category
- **Header:**
  - `Authorization`: `Bearer {token}`
- **Parameters:**
  - `kategori` as `string`, required
- **Response:**
  ```JSON
  {
    "status": "success",
    "message": "Daftar Project berhasil ditemukan",
    "projects": [
        {
            "id": 1,
            "creator": "deo",
            "nm_proyek": "Platform Crowdsourcing untuk Masyarakat",
            "id_kategori": 1,
            "deskripsi": "ini adalah aplikasi mirip idekita hehe",
            "gambar": "LV60Ui1ndSLAOw1q3tTnU.png",
            "tanggal_mulai": "2023-05-22",
            "tanggal_selesai": "2023-08-22",
            "status": "selesai",
            "total_rate": 12,
            "jumlah_raters": 3,
            "mean_rate": 4
        },
        {
            "id": 2,
            "creator": "deo",
            "nm_proyek": "Platform Mengumpulkan Ide",
            "id_kategori": 1,
            "deskripsi": "ini adalah aplikasi mirip idekita hehe",
            "gambar": "LV60Ui1ndSLAOw1q3tTnU.png",
            "tanggal_mulai": "2023-05-23",
            "tanggal_selesai": "2023-08-24",
            "status": "terbuka",
            "total_rate": 4,
            "jumlah_raters": 1,
            "mean_rate": 4
        }
    ]
  }
  ```
### 5. Get My Project Based on Status
- **URL:** 
  - `/proyek/kategori/:kategori`
- **Method:** 
  - `GET`
- **Description:** 
  - to get project where status is in progress or status is done
- **Header:**
  - `Authorization`: `Bearer {token}`
- **Parameters:**
  - `status` as `string`, `valid` : `'berlangsung'`,`'selesai'` ,required
- **Response:** this is just an example for status = 'in progress'
  ```JSON
  {
    "status": "success",
    "message": "Daftar Project berhasil ditemukan",
    "projects": [
        {
            "id": 2,
            "creator": "deo",
            "nm_proyek": "Platform Mengumpulkan Ide",
            "id_kategori": 1,
            "deskripsi": "ini adalah aplikasi mirip idekita hehe",
            "gambar": "LV60Ui1ndSLAOw1q3tTnU.png",
            "tanggal_mulai": "2023-05-23",
            "tanggal_selesai": "2023-08-24",
            "status": "berlangsung",
            "total_rate": 4,
            "jumlah_raters": 1,
            "mean_rate": 4,
            "contributors": [
                {
                    "id": 2,
                    "id_proyek": 2,
                    "username": "zul",
                    "role": "Beban",
                    "status_lamaran": "diterima"
                }
            ],
            "category": {
                "nm_kategori": "Sosial"
            }
        }
    ]
  }
  ```
  
### 6. Update Project Status
- **URL:** 
  - `/proyek/:id_proyek`
- **Method:** 
  - `PUT`
- **Description:** 
  - to change the project status 
- **Header:**
  - `Authorization`: `Bearer {token}`
  
- **Parameters:**
  - `id_proyek` as `int`, required

- **Request Body:**
  - `status` as `enum` ['terbuka'(default), 'berlangsung', 'selesai'], required

- Response:
  ```JSON
    {
    "status": "success",
    "message": "Berhasil merubah status proyek"
    }
  ```
  
### 7. Delete Project
- **URL:** 
  - `/proyek/:id_proyek`
- **Method:** 
  - `DELETE`
- **Description:** 
  - to delete a project
- **Header:**
  - `Authorization`: `Bearer {token}`
- **Parameters:**
  - `id_proyek` as `int`, required
- **Response:**
  ```JSON
    {
    "status": "success",
    "message": "Proyek berhasil dihapus"
    }
  ```  

## Contribution Endpoint
### 1. Register Contribute
- **URL:** 
  - `/kontributor`
- **Method:** 
  - `POST`
- **Description:** 
  - to register contribute
- **Header:**
  - `Authorization`: `Bearer {token}`

- **Request Body:**
  - `id_proyek` as `int`, required

- **Response:**
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
- **URL:** 
  - `/kontributor/:id_kontributor`
- **Method:** 
  - `PUT`
- **Description:** 
  - to change the contributor status to accepted or not by id, to update it must be the creator project
- **Header:**
  - `Authorization`: `Bearer {token}`
  
- **Parameters:**
  - `id_kontributor` as `int`, required

- **Request Body:**
  - `status_lamaran` as `enum` ['menunggu'(default), 'ditolak', 'diterima'], required
  - `role` as `string`, optional

- Response:
  ```JSON
  {
    "status": "success",
    "message": "Lamaran berhasil diterima!"
  }
  ```
  
### 3. Get Contributors by Id Project
- **URL:** 
  - `/kontributor/:id_proyek`
- **Method:** 
  - `GET`
- **Description:** 
  - to get contributor data on the project where status = diterima
- **Header:**
  - `Authorization`: `Bearer {token}`

- **Parameters:**
  - `id_proyek` as `int`, required

- **Response:**
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
  
- **URL:** 
  - `/kontributor/menunggu/:id_proyek`
- **Method:** 
  - `GET`
- **Description:** 
  - to get contributor data on the project where status = menunggu
- **Header:**
  - `Authorization`: `Bearer {token}`

- **Parameters:**
  - `id_proyek` as `int`, required

- **Response:**
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
### 1. Create Rating
- **URL:** 
  - `/rating`
- **Method:** 
  - `POST`
- **Description:** 
  - to do a rating
- **Header:**
  - `Authorization`: `Bearer {token}`

- **Request Body:**
  - id_proyek as int, required
  - password as int (1 - 5), required

- **Response:**
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
  
### 2. Update Rating
- **URL:** 
  - `/rating/:id_rating`
- **Method:** 
  - `POST`
- **Description:** 
  - to update a rating
- **Header:**
  - `Authorization`: `Bearer {token}`
- **Parameters:**
  - `id_rating` as `int`, required
- **Request Body:**
  - id_proyek as int, required
  - password as int (1 - 5), required

- **Response:**
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

