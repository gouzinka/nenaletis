import React from "react";
import { act, render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import config from "@/config";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
describe("Form Component", () => {
  test("focuses on the input on load", () => {
    render(<Form />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();
  });
});

describe("Form Component Placeholder", () => {
  const resizeWindow = (width: number, height: number): void => {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event("resize"));
  };

  test("changes placeholder based on window width", async () => {
    const { rerender, findByPlaceholderText } = render(<Form />);
    jest.useFakeTimers();

    resizeWindow(350, 800);
    act(() => {
      jest.runAllTimers();
    });

    let input = await findByPlaceholderText("Např. www.eshop.cz");
    expect(input).toBeInTheDocument();

    resizeWindow(1024, 768);
    act(() => {
      jest.runAllTimers();
    });

    rerender(<Form />);
    input = await findByPlaceholderText(
      "Zadejte adresu e-shopu, např. www.eshop.cz",
    );
    expect(input).toBeInTheDocument();
  });
});

describe("Form Input Validation", () => {
  test("displays an error when the input field is empty", () => {
    render(<Form />);
    fireEvent.click(screen.getByTestId("search-button"));
    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
  });

  test("displays an error for an invalid URL input", () => {
    render(<Form />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "invalid-url" },
    });
    fireEvent.click(screen.getByTestId("search-button"));
    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
  });
});

describe("Form Submission and Navigation", () => {
  test.each([
    ["http://www.example.com", "example-com"],
    ["https://sub.example.com/path", "example-com"],
    ["sub.example.com", "example-com"],
    ["sub.example.com/", "example-com"],
    ["http://sub.example.com", "example-com"],
    ["http://www.sub.example.com", "example-com"],
    ["https://sub.example.com", "example-com"],
    ["https://www.sub.example.com", "example-com"],
    ["www.example.com?query=string", "example-com"],
  ])(
    'redirects to the correct page on valid URL input "%s"',
    (inputUrl, expectedSlug) => {
      render(<Form />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: inputUrl },
      });
      fireEvent.submit(screen.getByTestId("search-button"));

      const expectedPath = `/${config.URL_PREFIX}/${encodeURIComponent(expectedSlug)}`;
      const push = require("next/navigation").useRouter().push;
      expect(push).toHaveBeenCalledWith(expectedPath);
    },
  );
});
