import { twMerge } from "tailwind-merge";

export const UploadIcon = ({
  height = 24,
  width = 24,
  color = "white",
  ...props
}) => {
  return (
    <i
      className={twMerge("block cursor-pointer", props.className)}
      onClick={props.onClick}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5 13H15V12H17C18.3125 12 19 10.4062 18.0312 9.46875L13.0312 4.46875C12.4688 3.875 11.5 3.875 10.9375 4.46875L5.9375 9.46875C4.96875 10.4062 5.65625 12 7 12H9V13H4.5C3.65625 13 3 13.6875 3 14.5V18.5C3 19.3438 3.65625 20 4.5 20H19.5C20.3125 20 21 19.3438 21 18.5V14.5C21 13.6875 20.3125 13 19.5 13ZM7 10.5L12 5.5L17 10.5H13.5V15.5H10.5V10.5H7ZM19.5 18.5H4.5V14.5H9V15.5C9 16.3438 9.65625 17 10.5 17H13.5C14.3125 17 15 16.3438 15 15.5V14.5H19.5V18.5ZM18.25 16.5C18.25 16.0938 17.9062 15.75 17.5 15.75C17.0625 15.75 16.75 16.0938 16.75 16.5C16.75 16.9375 17.0625 17.25 17.5 17.25C17.9062 17.25 18.25 16.9375 18.25 16.5Z"
          fill={color}
        />
      </svg>
    </i>
  );
};
