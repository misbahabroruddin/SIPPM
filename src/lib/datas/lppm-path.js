const LPPM_PATHS = [
  /^\/proposal\/penelitian\/detail\/lppm\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  /^\/proposal\/penelitian\/detail\/lppm\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
];

export function matchesLppmPath(path) {
  for (const route of LPPM_PATHS) {
    if (typeof route === "string") {
      if (route.endsWith("/*")) {
        if (path.startsWith(route.slice(0, -1))) {
          return true;
        }
      } else if (route === path) {
        return true;
      }
    } else if (route instanceof RegExp) {
      if (route.test(path)) {
        return true;
      }
    }
  }
  return false;
}
