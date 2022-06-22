module.exports = {
    defaultBrowser: "Safari",
    options: {
        hideIcon: true,
    },
    rewrite: [
      {
        // Redirect all urls to use https
        match: ({ url }) => url.protocol === "http",
        url: { protocol: "https" }
      }
    ],
    handlers: [
      {
        // These websites don't work as well in Safari
        match: ["meet.google.com/*", "*.sharepoint.com/*", "calendar.google.com/*"],
        browser: "Google Chrome"
      }
    ]
  };
