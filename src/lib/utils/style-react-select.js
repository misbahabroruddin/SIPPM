export const styles = (value) => {
  return {
    placeholder: (base) => ({
      ...base,
      paddingLeft: "2px",
      color: value ? "#333333 !important" : "#bdbdbd !important",
    }),
  };
};
