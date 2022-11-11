import { render, screen } from "@testing-library/react";
import MessageList from "./MessageList";

describe("Test for MessageList component", () => {
  test("If MessageList contains any messages", () => {
    const mockMessages = [
      {
        id: 1,
        text: "Test message 1",
        author: "Test suite",
      },
      {
        id: 2,
        text: "Test message 2",
        author: "Test suite",
      },
      {
        id: 3,
        text: "Test message 3",
        author: "Test suite",
      },
    ];
    const testUser = { id: 1, username: "test user" };
    render(<MessageList messages={mockMessages} user={testUser} />);
    const messages = screen.getAllByText(/Message/i);
    expect(messages.length).toBe(mockMessages.length);
    expect(messages[0].innerHTML).toBe("Test message 1");
  });
});
