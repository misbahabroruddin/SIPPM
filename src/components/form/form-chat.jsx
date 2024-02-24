"use client";

import { ButtonSubmit } from "../button/button-submit";

export const FormChat = ({ onSubmit, register, disabled }) => {
  return (
    <form className='flex flex-col gap-3 mt-3' onSubmit={onSubmit}>
      <textarea
        className='w-full border rounded-lg p-2 resize-none focus:outline focus:outline-primary'
        name='chat'
        id='chat'
        cols='30'
        placeholder='Tulis pesan...'
        {...register("chat", {
          required: true,
        })}
      />
      <ButtonSubmit disabled={disabled} />
    </form>
  );
};
