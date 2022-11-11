import React from "react";
import { render, screen } from "@testing-library/react";
import MessageInputFooter from "./MessageInputFooter";

describe("Test messageInput", () => {
  test("Send button is disabled if input value is empty", () => {
    render(
      <MessageInputFooter
        text=""
        room={{ title: "test room" }}
        onChange={() => {}}
        onClick={() => {}}
      />
    );

    const sendButton = screen.getByTestId(
      "message-button"
    ) as HTMLButtonElement;

    expect(sendButton).toBeDisabled();
  });

  test("Text is shown in input element", () => {
    render(
      <MessageInputFooter
        text="test text"
        room={{ title: "test room" }}
        onChange={() => {}}
        onClick={() => {}}
      />
    );

    const messageInput = screen.getByTestId(
      "message-input"
    ) as HTMLInputElement;

    expect(messageInput.value).toBe("test text");
  });
});
