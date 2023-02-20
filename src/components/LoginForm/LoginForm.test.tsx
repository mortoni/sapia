import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("submits form data when the submit button is clicked", async () => {
    const onCancel = jest.fn();
    jest.spyOn(global, "fetch");

    render(<LoginForm onCancel={onCancel} />);

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByText("Submit");
    const email = "user@example.com";
    const password = "password123";

    fireEvent.change(usernameInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith(
      "https://fake-endpoint.com/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      }
    );

    expect(onCancel).not.toHaveBeenCalled();
  });

  it("should call onCancel when cancel button is clicked", () => {
    const mockCancel = jest.fn();

    render(<LoginForm onCancel={mockCancel} />);
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(mockCancel).toHaveBeenCalled();
  });
});
