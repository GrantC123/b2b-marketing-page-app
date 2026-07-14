/**
 * Download Figma MCP asset URLs to public/marketing/enterprise/
 * (Run after get_design_context — URLs expire after ~7 days.)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/marketing/enterprise");

const ASSETS = {
  "hero-portrait.png": "https://www.figma.com/api/mcp/asset/e7c45dee-7298-4f51-8180-99acb2e32e42",
  "hero-union-blob.svg": "https://www.figma.com/api/mcp/asset/425dc5ac-a72b-4ff3-9cd4-60f25c8ad3ac",
  "hero-underline.svg": "https://www.figma.com/api/mcp/asset/c9c3e68f-2f63-4383-ab9f-60fc1da19673",
  "hero-sparkline.svg": "https://www.figma.com/api/mcp/asset/85683c5d-aaf7-4db9-ac7b-1f300306181c",
  "hero-monthly-badge.svg": "https://www.figma.com/api/mcp/asset/dbd98098-0352-43fb-8e6a-f1d4c5164d75",
  "hero-sparkle-green.svg": "https://www.figma.com/api/mcp/asset/c9d151e6-17c4-4d9e-9c8d-861724776959",
  "hero-sparkle-yellow.svg": "https://www.figma.com/api/mcp/asset/6f2e1695-25f9-4677-937d-fa98a2f28874",
  "hero-sparkle-purple.svg": "https://www.figma.com/api/mcp/asset/9a0e0885-f88c-495a-ab1f-5be2251d6d55",
  "stat-plus.svg": "https://www.figma.com/api/mcp/asset/6567b78b-befb-4d36-a8ea-6d9bdf9cbc73",
  "nav-logo.svg": "https://www.figma.com/api/mcp/asset/9c1b5ee3-2267-417b-9e37-44ff8a23b8fb",
  "footer-house.svg": "https://www.figma.com/api/mcp/asset/8fe08350-54db-4796-8f25-5c98525365c0",
  "case-study-amazon.svg": "https://www.figma.com/api/mcp/asset/9e361a80-65fd-4d8a-bb1e-a8f5b3218b27",
  "benefits-decor.svg": "https://www.figma.com/api/mcp/asset/0e3d8f04-0a2a-4900-9113-82234aeb1a69",
  "benefits-underline.svg": "https://www.figma.com/api/mcp/asset/242d8334-1f13-4e31-8f7a-4d71a7f88548",
  "mission-photo-1.png": "https://www.figma.com/api/mcp/asset/2d6e0ba3-21a7-4085-a328-32c467d76f74",
  "mission-photo-2.png": "https://www.figma.com/api/mcp/asset/ba792e33-06d8-41af-8c42-8847191b74a8",
  "mission-photo-3.png": "https://www.figma.com/api/mcp/asset/f4708aa0-7750-41cc-ac25-c9dc3f921805",
  "mission-photo-4.png": "https://www.figma.com/api/mcp/asset/1dae4a11-3987-4aab-a2fe-e58a397a0c78",
  "footer-logo.svg": "https://www.figma.com/api/mcp/asset/5d74fe3e-5be9-4d4b-b1e5-b6e3b30382e4",
  "social-facebook.svg": "https://www.figma.com/api/mcp/asset/12f1befb-6fa2-4d14-bbad-723b5604f591",
  "social-instagram.svg": "https://www.figma.com/api/mcp/asset/a031bc19-9911-4ac9-9362-1cee4ad41e8b",
  "social-x.svg": "https://www.figma.com/api/mcp/asset/56aa7b26-0902-449a-8d53-3e0bb2927c8a",
  "social-linkedin.svg": "https://www.figma.com/api/mcp/asset/b69da4a4-8dd1-440e-91e9-8c631a7b4ac0",
  "social-youtube.svg": "https://www.figma.com/api/mcp/asset/6e0374fe-5053-45c4-910c-2747ccd4f997",
};

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  let ok = 0;
  for (const [filename, url] of Object.entries(ASSETS)) {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`✗ ${filename}: HTTP ${res.status}`);
      continue;
    }
    await fs.writeFile(path.join(OUT_DIR, filename), Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${filename}`);
    ok += 1;
  }
  console.log(`\nDownloaded ${ok}/${Object.keys(ASSETS).length} assets`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
