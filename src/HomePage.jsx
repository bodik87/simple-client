import React from "react";
import { Link } from "react-router-dom";
import { useGetAllNotesQuery } from "./store/notesApi";

export const HomePage = () => {
  const { data: notes = [], error, isLoading } = useGetAllNotesQuery();

  if (isLoading) return <h1>Загрузка...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="flex flex-col gap-2">
      {notes.map((note) => (
        <Link
          to={note._id}
          key={note._id}
          className="flex bg-gray-600 p-4 rounded-xl w-full"
        >
          <h1>{note.text}</h1>
        </Link>
      ))}
    </div>
  );
};
