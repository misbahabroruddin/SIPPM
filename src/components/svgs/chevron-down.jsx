import { twMerge } from "tailwind-merge";

export const ChevronDown = ({ height = 24, width = 24, ...props }) => {
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
          d="M11.7188 14.875C11.875 15.0312 12.0938 15.0312 12.25 14.875L16.875 10.2812C17.0312 10.1562 17.0312 9.90625 16.875 9.75L16.25 9.15625C16.125 9 15.875 9 15.7188 9.15625L12 12.8438L8.25 9.15625C8.09375 9 7.875 9 7.71875 9.15625L7.09375 9.75C6.9375 9.90625 6.9375 10.1562 7.09375 10.2812L11.7188 14.875Z"
          fill="#333333"
        />
      </svg>
    </i>
  );
};
