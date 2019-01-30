/* @jsx jsx */
import React from "react";
import Link from "next/link";
import { jsx, css } from "@emotion/core";

const header = css`
  grid-row: 1 / 2;
  grid-column: 1 / 5;
`;

const Navbar = () => {
  return (
    <div css={header}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/expenses">
        <a>Expenses</a>
      </Link>
    </div>
  );
};

export default Navbar;
