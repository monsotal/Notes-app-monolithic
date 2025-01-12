## How to prepare your local environment for debugging / development
### Set up SSH for GitHub (if not already done)
- Check for existing SSH keys , then place the keys in ~/.ssh dir
- Test the SSH connection : `ssh -T git@github.com`
- Clone the repo : `git clone git@github.com:monsotal/Notes-app-monolithic.git`

### Prerequisites
- Node.js, npm, 
- PostgreSQL server with DB named "notes_db"

### Environment Variables
- Create `.env` file in `notes-app-server` dir and add necessary environment variables  
`DATABASE_URL=postgresql://<user>:<password>@<ip>:5432/notes_db?schema=public`  
`JWT_SECRET=<secret_key>`

### Run the backend server 
- `cd notes-app-server`
- Install dependencies: `npm install`
- run the server: `npm start`

### Database Setup
- Ensure PostgreSQL is installed running and available
- Synchronize your Prisma schema with the database schema:

`cd notes-app-server`  
`npx prisma db push`

### start the front-end development server:

- `cd notes-app-ui`
- Install dependencies: `npm install`
- run the server: `npm start`