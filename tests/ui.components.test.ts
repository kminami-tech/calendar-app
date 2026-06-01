import assert from "node:assert/strict";
import { test } from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Home from "../app/page";

void test("home page renders the event form entry point with shadcn ui components", () => {
  const html = renderToStaticMarkup(createElement(Home));

  assert.match(html, /予定管理/);
  assert.match(html, /新しい予定/);
});
