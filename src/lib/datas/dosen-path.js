const DOSEN_PATHS = [
  "/proposal/penelitian/tambah",
  /^\/proposal\/penelitian\/edit\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  /^\/proposal\/pengabdian\/edit\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  /^\/proposal\/penelitian\/track\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  /^\/proposal\/pengabdian\/track\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  "/laporan-hasil",
];

export function matchesDosenPath(path) {
  for (const route of DOSEN_PATHS) {
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
