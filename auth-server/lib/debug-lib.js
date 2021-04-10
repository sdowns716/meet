import util from "util";
import AWS from "aws-sdk";
import * as Sentry from "@sentry/browser";

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({ dsn: "https://296f8918647445f094990a0395e2f162@o561027.ingest.sentry.io/5697434@sentry.io/123456" });
}

export function logError(error, errorInfo = null) {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

let logs;

// Log AWS SDK calls
AWS.config.logger = { log: debug };

export default function debug() {
  logs.push({
    date: new Date(),
    string: util.format.apply(null, arguments),
  });
}

export function init(event, context) {
  logs = [];

  // Log API event
  debug("API event", {
    body: event.body,
    pathParameters: event.pathParameters,
    queryStringParameters: event.queryStringParameters,
  });
}

export function flush(e) {
  logs.forEach(({ date, string }) => console.debug(date, string));
  console.error(e);
}