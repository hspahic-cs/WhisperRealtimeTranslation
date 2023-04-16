import { render, screen } from "@testing-library/react";
import App from "./App";

test("translate button is disabled on page load", () => {
  render(<App />);
  const translateButton = screen.getByText("Translate");
  expect(translateButton).toBeDisabled();
});
