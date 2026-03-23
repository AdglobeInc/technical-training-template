import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  test("children を表示する", () => {
    render(<Button type="button">送信</Button>);

    expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
  });
});
