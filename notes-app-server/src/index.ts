import { PrismaClient } from "@prisma/client";
import express from "express";
import { Request, Response, NextFunction } from 'express';
import cors from "cors";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';


const app = express();
const prisma = new PrismaClient();
const JWTSECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());
dotenv.config();

if (!JWTSECRET) {
  throw new Error("JWTSECRET is not defined in environment variables");
}



// User Registration endpoint
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.json({ message: "user registered successfully" });
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});


//User Login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials"});
    }

    //Generates a JWT token and sends it back to the client
    const token = jwt.sign({ userId: user.id }, JWTSECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in"});
  }
});


//Middleware function
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Use optional chaining

  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }

  jwt.verify(token, JWTSECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    next(); // Proceed to the next middleware or route handler
  });
};


//Get notes endpoint
app.get("/api/notes", authenticateToken, async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query; // Default page 1, page size 10

  const pageInt = parseInt(page as string);
  const pageSizeInt = parseInt(pageSize as string);

  try {
    const notes = await prisma.note.findMany({
      skip: (pageInt - 1) * pageSizeInt,
      take: pageSizeInt,
    });

    const totalNotes = await prisma.note.count(); // To get the total count of notes for calculating total pages
    const totalPages = Math.ceil(totalNotes / pageSizeInt);

    if (pageInt > totalPages) {
      return res.status(404).json({ message: "Page not found" }); // Return error if page exceeds total
    }


    res.json({
      notes,
      currentPage: pageInt,
      totalPages,
    });
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});


//Create note endpoint
app.post("/api/notes", authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  // Input validation
  if (!title || !content) {
    return res.status(400).send("title and content fields required");
  }

  try {
    const note = await prisma.note.create({
      data:
        { title, content ,
        },
    });
    res.json(note);
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});


//Update note endpoint
app.put("/api/notes/:id", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!title || !content) {
    return res.status(400).send("title and content fields required");
  }

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be a valid number");
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});



//Delete note endpoint
app.delete("/api/notes/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID field required");
  }

  try {
    await prisma.note.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});




app.listen(5000, () => {
  console.log("server running on localhost:5000");
});