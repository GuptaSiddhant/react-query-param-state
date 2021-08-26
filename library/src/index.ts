import { useState, useEffect } from "react";

/**
 * Hook to sync single search param with the URL.
 *
 * Initialise the hook by providing the param-name (key)
 * and it will try to get the corresponding value from
 * the URL if available.
 *
 * Use setter function to update the value and same should
 * be reflected in the URL. Setting empty value will remove
 * the param from the URL.
 *
 * @param paramName Key used for referring the value.
 * @param fallbackParamValue Value assigned to param if not already set.
 * @returns [value, setValue]
 *
 * @example
 * ```
 * const [userId, setUserId] = useSearchParamState("userId");
 * ```
 */
export default function useSearchParamState(
  paramName: string,
  fallbackParamValue?: string | undefined | null
) {
  const getDefaultParamValue = () =>
    getURLSearchParams().get(paramName) || (fallbackParamValue ?? null);

  const state = useState<string | undefined | null>(() =>
    getDefaultParamValue()
  );

  useEffect(() => {
    const urlSearchParams = getURLSearchParams();
    const newValue = state[0] || fallbackParamValue;

    if (newValue) urlSearchParams.set(paramName, newValue);
    else urlSearchParams.delete(paramName);

    replaceUrlWithNewSearchParams(urlSearchParams);
  }, [paramName, state[0], fallbackParamValue]);

  return state;
}

function getURLSearchParams() {
  const urlSearchString =
    typeof window !== "undefined" ? window.location.search : "";
  return new URLSearchParams(urlSearchString);
}

function replaceUrlWithNewSearchParams(urlSearchParams: URLSearchParams) {
  const searchParamsString = urlSearchParams.toString();
  const newUrl =
    getCurrentUrl(false) + (searchParamsString ? `?${searchParamsString}` : "");

  if (typeof window !== "undefined") {
    window.history.replaceState?.(undefined, window.document.title, newUrl);
  }
}

function getCurrentUrl(withSearchParams: boolean = true) {
  if (withSearchParams) return window.location.href;

  if (typeof window !== "undefined") {
    let url = window.location.origin + window.location.pathname;
    if (window.location.hash) url += window.location.hash;
    return url;
  }

  return "";
}
