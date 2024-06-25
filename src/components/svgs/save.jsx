import { twMerge } from "tailwind-merge";

export const SaveIcon = ({
  height = 24,
  width = 24,
  color = "#10487A",
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
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6641 8.69141L16.0703 6.09766C15.7891 5.81641 15.4141 5.62891 15.0078 5.62891H6.63281C5.78906 5.62891 5.13281 6.31641 5.13281 7.12891V18.1289C5.13281 18.9727 5.78906 19.6289 6.63281 19.6289H17.6328C18.4453 19.6289 19.1328 18.9727 19.1328 18.1289V9.75391C19.1328 9.34766 18.9453 8.97266 18.6641 8.69141ZM13.6328 7.12891V9.62891H9.63281V7.12891H13.6328ZM17.4453 18.1289H6.82031C6.69531 18.1289 6.63281 18.0664 6.63281 17.9414V7.31641C6.63281 7.22266 6.69531 7.12891 6.82031 7.12891H8.13281V10.3789C8.13281 10.8164 8.44531 11.1289 8.88281 11.1289H14.3828C14.7891 11.1289 15.1328 10.8164 15.1328 10.3789V7.25391L17.5703 9.72266C17.6016 9.75391 17.6328 9.78516 17.6328 9.84766V17.9414C17.6328 18.0664 17.5391 18.1289 17.4453 18.1289ZM12.1328 11.8789C10.6016 11.8789 9.38281 13.1289 9.38281 14.6289C9.38281 16.1602 10.6016 17.3789 12.1328 17.3789C13.6328 17.3789 14.8828 16.1602 14.8828 14.6289C14.8828 13.1289 13.6328 11.8789 12.1328 11.8789ZM12.1328 15.8789C11.4141 15.8789 10.8828 15.3477 10.8828 14.6289C10.8828 13.9414 11.4141 13.3789 12.1328 13.3789C12.8203 13.3789 13.3828 13.9414 13.3828 14.6289C13.3828 15.3477 12.8203 15.8789 12.1328 15.8789Z"
          fill={color}
        />
      </svg>
    </i>
  );
};
