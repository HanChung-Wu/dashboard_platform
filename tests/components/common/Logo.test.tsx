import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import Logo from "../../../src/components/common/Logo";
import React from "react";

test("renders name", async () => {
  const { getByText } = render(<Logo />);

  await expect.element(getByText("MyDashboard")).toBeInTheDocument();
});
