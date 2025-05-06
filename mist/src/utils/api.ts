export interface ApiRequestOptions extends RequestInit {
  skipAuth?: boolean;
  headers?: HeadersInit;
}

export async function apiRequest(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<any> {
  const { skipAuth, headers: customHeaders, ...fetchOpts } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(customHeaders as Record<string, string>),
  };

  if (!skipAuth) {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(endpoint, {
    ...fetchOpts,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  // If error status, throw before parsing
  if (!response.ok) {
    // if JSON, pull the error field; otherwise pass the raw text
    if (contentType.includes("application/json")) {
      const errData = JSON.parse(text);
      throw new Error(errData.error || JSON.stringify(errData));
    } else {
      throw new Error(text || response.statusText);
    }
  }

  // success: if JSON, parse it; otherwise return raw text
  if (contentType.includes("application/json")) {
    return JSON.parse(text);
  }
  return text;
}