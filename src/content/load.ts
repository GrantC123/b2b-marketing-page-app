import fs from "node:fs";
import path from "node:path";

import { parse as parseYaml } from "yaml";

const contentRoot = path.join(process.cwd(), "content");

/** Read and parse a YAML file from the `content/` directory. */
export function loadYaml<T>(relativePath: string): T {
  const filePath = path.join(contentRoot, relativePath);
  const source = fs.readFileSync(filePath, "utf8");
  return parseYaml(source) as T;
}
