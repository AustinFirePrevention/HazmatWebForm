import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://595d590486cb0e7b15aa098be6555ce8@o4508502882975744.ingest.us.sentry.io/4508502889201664",
  maxBreadcrumbs: 50,
  integrations: [

    
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
});
