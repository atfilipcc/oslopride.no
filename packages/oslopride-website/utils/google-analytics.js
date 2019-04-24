import ReactGA from "react-ga";

const GOOGLE_ANALYTICS_TRACKING_ID = "UA-54270444-1";

const isProd = () => {
  if (typeof window === "undefined") return false;
  // eslint-disable-next-line no-undef
  const { location: hostname } = window;
  return hostname === "www.oslopride.no" || hostname === "oslopride.no";
};

export const initializeGoogleAnalytics = () => {
  if (!isProd()) {
    // eslint-disable-next-line no-console
    console.debug("[GOOGLE ANALYTICS] Google Analytics is disabled");
    return;
  }

  // TODO: Remove debug option when we are sure this works
  ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID, { debug: true });
  ReactGA.set({ anonymizeIp: true });
};

export const logPageView = path => {
  if (!isProd()) {
    // eslint-disable-next-line no-console
    console.debug(`[GOOGLE ANALYTICS] Page View: ${path}`);
    return;
  }
  ReactGA.pageview(path);
};