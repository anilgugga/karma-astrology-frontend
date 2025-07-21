// src/components/BirthInputForm.test.js
import { render, screen } from "@testing-library/react";
import BirthInputForm from "./BirthInputForm"; // ✅ FIXED import path

test("renders input fields", () => {
  render(<BirthInputForm />);
  expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
});
