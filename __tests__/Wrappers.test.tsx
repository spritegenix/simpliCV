import Wrapper from "@/components/Wrappers";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import React from "react";

// mock next/image since Jest doesn't handle it well
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img src={typeof src === "string" ? src : "mock.png"} alt="mock-image" />
    );
  },
}));

describe("Wrapper", () => {
  it("renders children correctly", () => {
    render(
      <Wrapper>
        <p>Test content</p>
      </Wrapper>,
    );
    expect(screen.getByText(/Test content/i)).toBeInTheDocument(); // i for case insensitive
  });
  it("should have a heading", () => {
    render(
      // ARRANGE
      <Wrapper>
        <h1>Test content</h1>
      </Wrapper>,
    );
    // ACT
    const myEle = screen.getByRole("heading", {
      name: "Test content",
    });
    expect(myEle).toBeInTheDocument(); // ASSERT
  });
});
