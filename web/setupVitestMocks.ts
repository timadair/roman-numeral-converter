// Runtime mock for CSS imports in Vitest
import { vi } from "vitest";
// 👇 Stub out CSS module imports (for Spectrum or other packages)
vi.mock("*.css", () => ({}));
require.extensions[".css"] = () => ({});
