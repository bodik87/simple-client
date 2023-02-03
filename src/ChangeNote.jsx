import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from "./store/notesApi";

export const ChangeNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetNoteQuery(id);
  const [deleteNote, result] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const [text, setText] = useState(data?.text);

  const submitHandler = async () => {
    try {
      if (text) {
        await updateNote({ text, id }).unwrap();
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const formHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <h1 className="mb-4 font-semibold text-xl text-center">
        Изменить заметку
      </h1>
      <form onSubmit={formHandler} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="rounded-xl p-4"
          cols="30"
          rows="10"
        />
        <button
          onClick={submitHandler}
          className="bg-blue-600 max-w-[220px] w-full mx-auto py-2 rounded-md"
        >
          Изменить
        </button>
        <button
          onClick={removeNoteHandler}
          className="bg-red-600 max-w-[120px] w-full mx-auto py-1 rounded-md"
        >
          Удалить
        </button>
      </form>
    </div>
  );
};
