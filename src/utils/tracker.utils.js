export const EVENT_CLICK = "Click"

export const trackerClick = (page, eventName, name) => {
  if (process.env.NEXT_PUBLIC_MATOMO_ENABLED === "true")
    _paq.push(["trackEvent", page, eventName, name])
}
