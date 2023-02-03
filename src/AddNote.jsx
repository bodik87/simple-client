import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNoteMutation } from "./store/notesApi";

export const AddNote = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const [addNote, result] = useCreateNoteMutation();

  const submitHandler = async () => {
    try {
      if (text) {
        await addNote({ text }).unwrap();
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
      <h1 className="mb-4 font-semibold text-xl text-center">
        Добавить заметку
      </h1>
      <form className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="rounded-xl p-4"
          cols="30"
          rows="10"
        />
        <button
          type="submit"
          onClick={submitHandler}
          className="bg-green-600 max-w-[220px] w-full mx-auto py-2 rounded-md"
        >
          Создать
        </button>
      </form>
    </div>
  );
};
