import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar/Navbar";
import { vi } from "vitest";

test("wysyła onSearch z SZUKAJ", async () => {
  const user = userEvent.setup();
  const onSearch = vi.fn();

  render(<Navbar onSearch={onSearch} isDisabled={false} />);

  const input = screen.getByRole("textbox");
  await user.type(input, "bar");
  await user.click(screen.getByRole("button", { name: /szukaj/i }));

  expect(onSearch).toHaveBeenCalledWith("bar");
});

test("blokuje submit, gdy isDisabled", async () => {
  const user = userEvent.setup();
  const onSearch = vi.fn();

  render(<Navbar onSearch={onSearch} isDisabled />);

  await user.click(screen.getByRole("button", { name: /szukaj/i }));
  expect(onSearch).not.toHaveBeenCalled();
});

test("wysyła po naciśnięciu Enter w input", async () => {
  const user = userEvent.setup();
  const onSearch = vi.fn();

  render(<Navbar onSearch={onSearch} isDisabled={false} />);

  const input = screen.getByRole("textbox");
  await user.type(input, "bar{Enter}");

  expect(onSearch).toHaveBeenCalledWith("bar");
});
