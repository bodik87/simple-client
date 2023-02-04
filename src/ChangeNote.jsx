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

  const [title, setTitle] = useState(data?.title);
  const [text, setText] = useState(data?.text);

  const submitHandler = async () => {
    try {
      if (text) {
        await updateNote({ title, text, id }).unwrap();
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

  if (result.isLoading) return <h1>Завантаження...</h1>;
  if (result.error) return <h1>{error}</h1>;

  const formHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 className="mb-4 font-semibold text-xl text-center">Змiнити запис</h1>
      <form onSubmit={formHandler} className="flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl p-4 border border-black"
          placeholder="Додайте назву"
          type="text"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="rounded-xl p-4 border border-black"
          cols="30"
          rows="10"
        />
        <button
          onClick={submitHandler}
          className="bg-blue-600 text-white max-w-[220px] w-full mx-auto py-2 rounded-md"
        >
          Змiнити
        </button>
        <button
          onClick={removeNoteHandler}
          className="bg-red-600 text-white max-w-[120px] w-full mx-auto py-1 rounded-md"
        >
          Видалити
        </button>
      </form>
    </div>
  );
};
