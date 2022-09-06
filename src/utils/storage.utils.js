import { STORAGE_LABELS, STORAGE_LOCALE } from "../constants/constants"

export function getInLocalStorage(key) {
  if (typeof window !== "undefined") return localStorage.getItem(key)
}

export function getLocaleInLocalStorage() {
  const storageLocale = getInLocalStorage(STORAGE_LOCALE)
  if (storageLocale) return JSON.parse(storageLocale)
}

export function getLabelsInLocalStorage() {
  const storageLabels = getInLocalStorage(STORAGE_LABELS)
  if (storageLabels) return JSON.parse(storageLabels)
}
