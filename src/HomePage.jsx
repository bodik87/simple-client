import React from "react";
import { Link } from "react-router-dom";
import { useGetAllNotesQuery } from "./store/notesApi";
import { format } from "date-fns";
import uk from "date-fns/locale/uk";

export const HomePage = () => {
  const { data: notes = [], error, isLoading } = useGetAllNotesQuery();

  if (isLoading) return <h1>Завантаження...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="flex flex-col gap-2">
      {notes.map((note) => (
        <Link
          to={note._id}
          key={note._id}
          className="flex flex-col bg-yellow-400 dark:bg-yellow-400 text-black p-4 rounded-xl w-full"
        >
          <h1 className="font-semibold text-xl">{note.title}</h1>
          <h2 className="mt-2">{note.text}</h2>
          <p className="text-right mt-4">
            Змiнено:{" "}
            {format(Date.parse(note.updatedAt), "d MMMM Y - HH:mm", {
              locale: uk,
            })}
          </p>
        </Link>
      ))}
    </div>
  );
};
