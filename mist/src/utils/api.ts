const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        let errorMessage = "API request failed";

        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (err) {
            console.error("Failed to parse error response", err);
        }

        throw new Error(errorMessage);
    }

    return response.json();
}
