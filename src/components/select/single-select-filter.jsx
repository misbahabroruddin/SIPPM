import React, { useState } from "react";
import ReactSelect, { components } from "react-select";

const countries = [
  { value: "MG", label: "Madagascar" },
  { value: "UE", label: "Union Européenne" },
];

// const Option = (props) => (
//   <components.Option {...props} className="country-option">
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M14 7.75C14 8.03125 13.75 8.25 13.5 8.25H11.5C11.2188 8.25 11 8.03125 11 7.75V7.25C11 7 11.2188 6.75 11.5 6.75H13.5C13.75 6.75 14 7 14 7.25V7.75ZM9.125 16V16.0312C9.3125 16.0312 9.5 16.1875 9.5 16.4062C9.5 16.5 9.4375 16.5938 9.375 16.6562L7.25 18.9062C7.1875 18.9688 7.09375 19.0312 7 19.0312C6.875 19.0312 6.78125 18.9688 6.71875 18.9062L4.59375 16.6562C4.53125 16.5938 4.46875 16.5 4.46875 16.375C4.46875 16.1875 4.65625 16 4.84375 16H4.875H6.25V5.5C6.25 5.25 6.46875 5 6.75 5H7.25C7.5 5 7.75 5.25 7.75 5.5V16H9.125ZM18 13.75C18 14.0312 17.75 14.25 17.5 14.25H11.5C11.2188 14.25 11 14.0312 11 13.75V13.25C11 13 11.2188 12.75 11.5 12.75H17.5C17.75 12.75 18 13 18 13.25V13.75ZM20 16.75C20 17.0312 19.75 17.25 19.5 17.25H11.5C11.2188 17.25 11 17.0312 11 16.75V16.25C11 16 11.2188 15.75 11.5 15.75H19.5C19.75 15.75 20 16 20 16.25V16.75ZM16 10.75C16 11.0312 15.75 11.25 15.5 11.25H11.5C11.2188 11.25 11 11.0312 11 10.75V10.25C11 10 11.2188 9.75 11.5 9.75H15.5C15.75 9.75 16 10 16 10.25V10.75Z" fill="#666666"/>
// </svg>
//     {props.data.label}
//   </components.Option>
// );

export const SelectFilter = () => {
  const [selectedCountry, setSelectedCountry] = useState({});

  const handleChange = (value) => {
    setSelectedCountry(value);
  };

  const Control = ({ children, ...props }) => (
    <components.Control {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 7.75C14 8.03125 13.75 8.25 13.5 8.25H11.5C11.2188 8.25 11 8.03125 11 7.75V7.25C11 7 11.2188 6.75 11.5 6.75H13.5C13.75 6.75 14 7 14 7.25V7.75ZM9.125 16V16.0312C9.3125 16.0312 9.5 16.1875 9.5 16.4062C9.5 16.5 9.4375 16.5938 9.375 16.6562L7.25 18.9062C7.1875 18.9688 7.09375 19.0312 7 19.0312C6.875 19.0312 6.78125 18.9688 6.71875 18.9062L4.59375 16.6562C4.53125 16.5938 4.46875 16.5 4.46875 16.375C4.46875 16.1875 4.65625 16 4.84375 16H4.875H6.25V5.5C6.25 5.25 6.46875 5 6.75 5H7.25C7.5 5 7.75 5.25 7.75 5.5V16H9.125ZM18 13.75C18 14.0312 17.75 14.25 17.5 14.25H11.5C11.2188 14.25 11 14.0312 11 13.75V13.25C11 13 11.2188 12.75 11.5 12.75H17.5C17.75 12.75 18 13 18 13.25V13.75ZM20 16.75C20 17.0312 19.75 17.25 19.5 17.25H11.5C11.2188 17.25 11 17.0312 11 16.75V16.25C11 16 11.2188 15.75 11.5 15.75H19.5C19.75 15.75 20 16 20 16.25V16.75ZM16 10.75C16 11.0312 15.75 11.25 15.5 11.25H11.5C11.2188 11.25 11 11.0312 11 10.75V10.25C11 10 11.2188 9.75 11.5 9.75H15.5C15.75 9.75 16 10 16 10.25V10.75Z"
          fill="#666666"
        />
      </svg>
      {children}
    </components.Control>
  );

  return (
    <ReactSelect
      options={countries}
      onChange={handleChange}
      theme={(theme) => ({
        ...theme,
        borderRadius: 7,
        colors: {
          ...theme.colors,
          primary25: "#eee",
          primary: "#333333",
        },
      })}
      styles={{
        control: (base) => ({
          ...base,
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
        }),
      }}
      components={{
        Control,
      }}
      classNamePrefix="react-select"
      placeholder="Sort by"
    />
  );
};
