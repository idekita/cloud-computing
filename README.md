# API Endpoints Documentation

## Auth and User Endpoint
| Endpoint | Method | Authorization | Description |
|---------|---------|---------|---------|
| /login | POST | No | to authenticate a user based on the database |
| /register | POST | No | to register a new user |
| /profil/:username | GET | Yes | to get logged in user data |

## Category Endpoint
| Endpoint | Method | Authorization | Description |
|---------|---------|---------|---------|
| /kategori | GET | Yes | to get all category data |

## Project Endpoint
| Endpoint | Method | Authorization | Description |
|---------|---------|---------|---------|
| /proyek | POST | Yes | to create project |
| /proyek | GET | Yes | to get all project data with a logged-in username |
| /proyek/:id_proyek | GET | Yes | to get project data by project_id |


## Contribution Endpoint
| Endpoint | Method | Authorization | Description |
|---------|---------|---------|---------|
| /kontributor/:id_kontributor | PUT | Yes | to change the contributor status to accepted or not by id_kontributor |
| /kontributor/:id_proyek | GET | Yes | to get contributor data on the project by id_proyek |

## Rating Endpoint
| Endpoint | Method | Authorization | Description |
|---------|---------|---------|---------|
| /rating | POST | Yes | to do a rating based on id_proyek |
