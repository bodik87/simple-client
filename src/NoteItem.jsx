import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteNoteMutation, useGetNoteQuery } from "./store/notesApi";

export const NoteItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetNoteQuery(id);

  const [deleteNote, result] = useDeleteNoteMutation();

  const removeNoteHandler = async () => {
    try {
      await deleteNote({ id }).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (result.isLoading) return <h1>Загрузка...</h1>;
  if (result.error) return <h1>{error}</h1>;

  return (
    <div>
      <h1 className="mb-4 font-semibold text-xl text-center">Заметка</h1>
      <p className="pb-8">{data?.text}</p>
      <div className="flex flex-col gap-4">
        <Link
          to={`/${id}/edit`}
          className="bg-yellow-600 max-w-[220px] w-full mx-auto py-2 rounded-md text-center"
        >
          Изменить
        </Link>
        <button
          onClick={removeNoteHandler}
          className="bg-red-600 max-w-[120px] w-full mx-auto py-1 rounded-md"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
