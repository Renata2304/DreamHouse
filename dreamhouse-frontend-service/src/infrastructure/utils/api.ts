import { store } from '@application/store';

/**
 * Makes an authenticated API request with the current token
 * @param url The URL to make the request to
 * @param options Additional fetch options
 * @returns The fetch response
 */
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const state = store.getState();
    const token = state.profileReducer.token;

    if (!token) {
        throw new Error('No authentication token available');
    }

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(url, {
        ...options,
        headers
    });
};

/**
 * Makes an authenticated API request and returns the JSON response
 * @param url The URL to make the request to
 * @param options Additional fetch options
 * @returns The JSON response
 */
export const authenticatedFetchJson = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const response = await authenticatedFetch(url, options);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
}; 