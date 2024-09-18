import { useEffect, useState } from "react";
import "./MainApp.css";
import { useNavigate } from "react-router-dom";



const MainApp = () => {

  type Note = {
    id: number;
    title: string;
    content: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Add current page state
  const [totalPages, setTotalPages] = useState(1); // Add total pages state

  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Good day');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good morning');
    }
    else if (currentHour < 18) {
      setGreeting('Good afternoon');
    }
    else {
      setGreeting('Good evening');
    }
  }, []);


  useEffect(() => {
    const fetchNotes = async (page = 1) => {
      try {
        const response = await fetch(`http://localhost:5000/api/notes?page=${page}&pageSize=10`);
        const data = await response.json();
        setNotes(data.notes);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes(currentPage);  // Fetch notes based on the current page
  }, [currentPage]);          // Add currentPage as a dependency


  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    }

    catch (e) {
      console.log(e);
    }
  }


  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title)
    setContent(note.content);
  }



  const handleUpdateNote = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (selectedNote) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/notes/${selectedNote.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              content,
            }),
          }
        );

        const updatedNote = await response.json();

        const updatedNotesList = notes.map((note) =>
          (note.id === selectedNote?.id ? updatedNote : note));

        setNotes(updatedNotesList);

        setTitle("");
        setContent("");
        setSelectedNote(null);

      } catch (e) {
        console.log(e);
      }

    }
    else {
      console.error("No note selected for update");
    }

  };



  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );

      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);

    } catch (error) {
      console.log(error);
    }
  };



  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null)
  }


  const handleStocksClick = () => {
    navigate('/stocks');
  }


  const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.setItem("isAuthenticated", "false");
    navigate('/login');
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      <div className="app-container">
        <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
        <h1 className="headline">{greeting}</h1>
        <form className="note-form" onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
          ></input>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Content"
            rows={10}
            required
          ></textarea>
          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-item" onClick={() => handleNoteClick(note)}>
              <div className="notes-header">
                <button onClick={(event) => deleteNote(event, note.id)}>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
        {/* Pagination controls */}
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <div>
        <hr className="custom-hr" />
      </div>
      <footer className="bottom-nav">
        <button className="nav-item" onClick={handleStocksClick}>Stocks</button>
      </footer>
    </>
  );
};

export default MainApp;