# API Server for To-Do Application

This repository contains the API server necessary for running a To-Do list application. The server handles CRUD operations for to-do items and manages user authentication and authorization.

## Features

- **To-Do Item Data Model:** A simple data model for creating and managing to-do items.
- **CRUD Operations:**
  - `GET /todo`: Retrieves a list of all to-do items.
  - `POST /todo`: Adds a new to-do item.
  - `PUT /todo`: Updates an existing to-do item (e.g., marking as complete).
  - `DELETE /todo/:id`: Deletes a to-do item by ID.
- **Authentication Server:**
  - `/signup`: Register a new user account.
  - `/signin`: Login for existing users.
  - **Bearer Token Authorization:** Secure endpoints using bearer token strategy.
  - **Access Control List (ACL):** Implements user roles and permissions.
