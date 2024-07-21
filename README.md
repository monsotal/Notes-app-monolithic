# Notes App: A full-stack web application for managing personal notes

This project is a simple yet functional where you can create, edit, and delete notes. 
Plus, there's validation on both the UI and the backend


## Key features:
- Create and store personal notes
- View a list of all notes
- Edit existing notes
- Delete unwanted notes

## Tech Stack:
- Frontend: React.js with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL

## Prerequisites
- Node.js, npm, 
- PostgreSQL server

## Installation & Usage 
### Set up SSH for GitHub (if not already done)
- Check for existing SSH keys , then place the keys in ~/.ssh dir
- Test the SSH connection : `ssh -T git@github.com`
- Clone the repo : `git clone git@github.com:monsotal/notes-app.git`

### Environment Variables
- Create a `.env` file in the `notes-app-server` directory
- Add necessary variables 
     `DATABASE_URL=postgresql://<user>:<password>@<ip>:5432/notes_db?schema=public`

### Database Setup
- Ensure PostgreSQL is installed running and available
- Synchronize your Prisma schema with the database schema:
     `cd notes-app-server/`
      `npx prisma db push`


### Run the backend server 
- `cd notes-app-server`
- Install dependencies: `npm install`
- run the server: `npm start`

### start the front-end development server:
- `cd notes-app-ui`
- Install dependencies: `npm install`
- run the server: `npm start`


## Project Structure
The application is structured with separate frontend (notes-app-ui) and backend (notes-app-server) directories,
 allowing for independent development and easy deployment.