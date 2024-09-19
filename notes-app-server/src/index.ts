import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
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

    if(pageInt > totalPages) {
      return res.status(404).json({message: "Page not found"}); // Return error if page exceeds total
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



app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;

  // Input validation
  if (!title || !content) {
    return res.status(400).send("title and content fields required");
  }

  try {
    const note = await prisma.note.create({
      data: { title, content },
    });
    res.json(note);
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});



app.put("/api/notes/:id", async (req, res) => {
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




app.delete("/api/notes/:id", async (req, res) => {
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