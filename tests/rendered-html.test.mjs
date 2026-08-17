import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

test("renders development preview metadata", async () => {
  const worker = await loadWorker();

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("redirects the www hostname to the canonical apex domain", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://www.anspruchscheck.de/check?from=www"),
    env,
    ctx,
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "https://anspruchscheck.de/check?from=www",
  );
});

test("renders canonical and complete social metadata", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://anspruchscheck.de/", {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/anspruchscheck\.de\/["']/i,
  );
  assert.match(
    html,
    /<meta[^>]+property=["']og:image["'][^>]+content=["']https:\/\/anspruchscheck\.de\/og-image\.png["']/i,
  );
  assert.match(
    html,
    /<meta[^>]+name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i,
  );
});
