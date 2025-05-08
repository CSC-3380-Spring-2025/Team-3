
export interface ApiRequestOptions extends RequestInit {
  skipAuth?: boolean;
  headers?: HeadersInit;
}


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Sends an API request with optional auth token and JSON handling.
 * @param endpoint - API route (e.g. "/api/users/register")
 * @param options - fetch options with optional skipAuth and custom headers
 * @returns Parsed response body or raw text
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { skipAuth, headers: customHeaders, ...fetchOpts } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (customHeaders && typeof customHeaders === "object" && !Array.isArray(customHeaders)) {
    Object.assign(headers, customHeaders);
  }

  if (!skipAuth) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOpts,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!response.ok) {
    if (contentType.includes("application/json")) {
      const errData = JSON.parse(text);
      throw new Error(errData.error || JSON.stringify(errData));
    } else {
      throw new Error(text || response.statusText);
    }
  }

  return contentType.includes("application/json") ? JSON.parse(text) : (text as unknown as T);
}