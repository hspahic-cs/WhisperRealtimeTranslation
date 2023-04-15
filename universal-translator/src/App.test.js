import { render, screen } from "@testing-library/react";
import App from "./App";

test("upload image is displayed", () => {
  render(<App />);
  const uploadImage = screen.getByAltText("upload");
  expect(uploadImage).toBeInTheDocument();
});
