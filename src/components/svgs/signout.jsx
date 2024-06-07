import { twMerge } from "tailwind-merge";

export const SignOutIcon = ({ height = 24, width = 24, ...props }) => {
  return (
    <i
      className={twMerge("block cursor-pointer", props.className)}
      onClick={props.onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 6C5.34375 6 4 7.34375 4 9V15C4 16.6562 5.34375 18 7 18H9.625C9.8125 18 10 17.8438 10 17.625V16.875C10 16.6875 9.8125 16.5 9.625 16.5H7C6.15625 16.5 5.5 15.8438 5.5 15V9C5.5 8.1875 6.15625 7.5 7 7.5H9.625C9.8125 7.5 10 7.34375 10 7.125V6.375C10 6.1875 9.8125 6 9.625 6H7ZM14.2188 6.625L13.5938 7.25C13.4375 7.375 13.4375 7.625 13.5938 7.78125L17.125 11.1875H9.375C9.15625 11.1875 9 11.375 9 11.5625V12.4375C9 12.6562 9.15625 12.8125 9.375 12.8125H17.125L13.5938 16.25C13.4375 16.4062 13.4375 16.6562 13.5938 16.7812L14.2188 17.4062C14.3438 17.5625 14.5938 17.5625 14.75 17.4062L19.875 12.2812C20.0312 12.125 20.0312 11.9062 19.875 11.75L14.75 6.625C14.5938 6.46875 14.3438 6.46875 14.2188 6.625Z"
          fill="#000000"
        />
      </svg>
    </i>
  );
};
