import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

test("renders dashboard title", () => {
  render(<Dashboard />);
  const titleElement = screen.getByText("Dashboard");
  expect(titleElement).toBeInTheDocument();
});
