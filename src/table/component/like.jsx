import React from "react";
// Input liked: boolean
const Like = props => {
  let classes;
  if (!props.liked) classes = "far fa-heart";
  else {
    classes = "fa fa-heart";
  }
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
