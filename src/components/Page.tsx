import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";

//@ts-ignore
export default function Page({ children }) {
  return <Paper elevation={0}>{children}</Paper>;
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
