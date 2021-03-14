import React from "react";

export function Button({ children, ...rest }) {
  return <button {...rest}>{children}</button>;
}
