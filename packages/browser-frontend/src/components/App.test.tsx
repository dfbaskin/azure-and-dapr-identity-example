import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders learn react link", () => {
  render(<App />);
  const headerElement = screen.getByText(/example/i);
  expect(headerElement).toBeInTheDocument();
});
