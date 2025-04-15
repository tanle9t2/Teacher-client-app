import React from "react";

function Form({ children, onSubmit }) {
  return (
    <form className="w-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
