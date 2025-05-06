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

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(data?.error || response.statusText);
  }
  return data;
}