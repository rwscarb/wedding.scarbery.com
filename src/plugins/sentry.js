import Vue from "vue";

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";


if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    Vue: Vue,
    dsn: process.env.SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}
