import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders the app with menu and login form", () => {
  render(<App />);

  const menu1Item = screen.getByText("Menu 1");
  const menu2Item = screen.getByText("Menu 2");
  const loginForm = screen.queryByRole("form");

  expect(menu1Item).toBeInTheDocument();
  expect(menu2Item).toBeInTheDocument();
  expect(loginForm).not.toBeInTheDocument();
});

test("opens login form on menu item click", () => {
  render(<App />);

  const menu1Item = screen.getByText("Menu 1");
  fireEvent.click(menu1Item);

  const loginForm = screen.getByTestId("loginForm");
  expect(loginForm).toBeInTheDocument();
});

test("cancels login form on cancel button click", () => {
  render(<App />);

  const menu1Item = screen.getByText("Menu 1");
  fireEvent.click(menu1Item);

  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  fireEvent.click(cancelButton);

  const loginForm = screen.queryByTestId("loginForm");

  expect(loginForm).not.toBeInTheDocument();
});
