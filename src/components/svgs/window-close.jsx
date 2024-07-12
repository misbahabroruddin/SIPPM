import { twMerge } from "tailwind-merge";

export const WindowCloseIcon = ({
  height = 24,
  width = 24,
  color = "#666666",
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
          d="M18.5 5H5.5C4.65625 5 4 5.6875 4 6.5V17.5C4 18.3438 4.65625 19 5.5 19H18.5C19.3125 19 20 18.3438 20 17.5V6.5C20 5.6875 19.3125 5 18.5 5ZM18.5 17.3125C18.5 17.4375 18.4062 17.5 18.3125 17.5H5.6875C5.5625 17.5 5.5 17.4375 5.5 17.3125V6.6875C5.5 6.59375 5.5625 6.5 5.6875 6.5H18.3125C18.4062 6.5 18.5 6.59375 18.5 6.6875V17.3125ZM15.125 10.0938C15.2812 9.9375 15.2812 9.71875 15.125 9.5625L14.4375 8.875C14.2812 8.71875 14.0625 8.71875 13.9062 8.875L12 10.7812L10.0625 8.875C9.90625 8.71875 9.6875 8.71875 9.53125 8.875L8.84375 9.5625C8.6875 9.71875 8.6875 9.9375 8.84375 10.0938L10.75 12L8.84375 13.9375C8.6875 14.0938 8.6875 14.3125 8.84375 14.4688L9.53125 15.1562C9.6875 15.3125 9.9375 15.3125 10.0625 15.1562L12 13.25L13.9062 15.1562C14.0625 15.3125 14.2812 15.3125 14.4375 15.1562L15.125 14.4688C15.2812 14.3125 15.2812 14.0625 15.125 13.9375L13.2188 12L15.125 10.0938Z"
          fill={color}
        />
      </svg>
    </i>
  );
};
