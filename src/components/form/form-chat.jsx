"use client";

import { ButtonSubmit } from "../button/button-submit";

export const FormChat = ({ onSubmit, register, disabled }) => {
  return (
    <form className="mt-3 flex flex-col gap-3" onSubmit={onSubmit}>
      <textarea
        className="w-full resize-none rounded-lg border p-2 focus:outline focus:outline-primary"
        name="chat"
        id="chat"
        cols="30"
        placeholder="Tulis pesan..."
        {...register("chat", {
          required: true,
        })}
      />
      <ButtonSubmit disabled={disabled} text="Kirim pesan" />
    </form>
  );
};
