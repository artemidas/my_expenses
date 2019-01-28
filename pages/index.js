import React from "react";
import Link from "next/link";

class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Artem</h1>
        <Link href="/expenses">
          <a>Expenses</a>
        </Link>
      </div>
    );
  }
}

export default Index;
