export function createRouter() {
  const routes = new Map();
  const listeners = new Set();
  let currentRoute = "";

  function normalize(route) {
    return String(route || "").replace(/^#\/?/, "").replace(/^\//, "");
  }

  function render(route) {
    const nextRoute = normalize(route);
    const handler = routes.get(nextRoute);
    if (!handler) return false;
    currentRoute = nextRoute;
    handler();
    listeners.forEach(listener => listener(nextRoute));
    return true;
  }

  function navigate(route, { replace = false } = {}) {
    const nextRoute = normalize(route);
    if (!routes.has(nextRoute)) return false;
    const nextHash = `#/${nextRoute}`;
    if (window.location.hash === nextHash) return render(nextRoute);
    if (replace) window.history.replaceState(null, "", nextHash);
    else window.location.hash = nextHash;
    if (replace) render(nextRoute);
    return true;
  }

  return {
    register(route, handler) {
      const normalizedRoute = normalize(route);
      if (!normalizedRoute || typeof handler !== "function") throw new Error("路由配置无效");
      if (routes.has(normalizedRoute)) throw new Error(`路由重复：${normalizedRoute}`);
      routes.set(normalizedRoute, handler);
    },
    navigate,
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    start(defaultRoute) {
      window.addEventListener("hashchange", () => {
        if (!render(window.location.hash)) navigate(defaultRoute, { replace: true });
      });
      if (!render(window.location.hash)) navigate(defaultRoute, { replace: true });
    },
    getCurrentRoute() {
      return currentRoute;
    },
  };
}
