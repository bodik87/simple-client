import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNoteMutation } from "./store/notesApi";

export const AddNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [addNote, result] = useCreateNoteMutation();

  const submitHandler = async () => {
    try {
      if ((title, text)) {
        await addNote({ title, text }).unwrap();
        setText("");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (result.isLoading) return <h1>Загрузка...</h1>;
  if (result.error) return <h1>{error}</h1>;

  return (
    <div>
      <h1 className="mb-4 font-semibold text-xl text-center">Додати запис</h1>
      <form className="flex flex-col gap-4">
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
          placeholder="Додайте текст"
          cols="30"
          rows="10"
        />
        <button
          type="submit"
          onClick={submitHandler}
          className="bg-green-600 text-white max-w-[220px] w-full mx-auto py-2 rounded-md"
        >
          Додати
        </button>
      </form>
    </div>
  );
};
