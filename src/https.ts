import { TOKEN_KEY } from './context/auth-context';
import token from './token';

const baseUrl = import.meta.env.VITE_BACKEND_URL || '';

export let getAuthToken: (() => string | null) | null = null;

export function setAuthTokenGetter(getter: () => string | null) {
  getAuthToken = getter;
}

export class ApiError extends Error {
  status: number;
  errors?: string[];

  constructor(status: number, message: string, errors?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

async function handleErrors(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const res = await response.json();

  if (!response.ok) {
    if (
      res.errors &&
      typeof res.errors === 'object' &&
      !Array.isArray(res.errors)
    ) {
      const errors = (
        Object.values(res.errors) as unknown[]
      ).flat() as string[];
      throw new ApiError(response.status, 'Validation failed', errors);
    }

    const message: string =
      typeof res.message === 'string'
        ? res.message
        : typeof res.errors === 'string'
          ? res.errors
          : typeof res.error === 'string'
            ? res.error
            : response.status === 500
              ? 'Internal Server error'
              : `HTTP Error: ${response.status}`;

    throw new ApiError(response.status, message);
  }

  return res;
}

function setHeaders(config: {
  headers?: Record<string, string>;
  formData?: boolean;
}): Record<string, string> {
  const apiToken = token.get(TOKEN_KEY);

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...config.headers,
  };

  if (apiToken) {
    headers['Authorization'] = `Bearer ${apiToken}`;
  }

  if (!config.formData) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

const get = async <T = unknown>(
  url: string,
  config: RequestInit = {},
  params?: Record<string, unknown>,
  options: { headers?: Record<string, string>; formData?: boolean } = {},
): Promise<T> => {
  let newUrl = `${url}`;
  if (params) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    }

    if (queryParams.toString()) {
      newUrl += `?${queryParams.toString()}`;
    }
  }

  const response = await fetch(`${baseUrl}/${newUrl}`, {
    method: 'GET',
    headers: setHeaders(options),
    ...config,
  });
  return handleErrors(response) as T;
};

const post = async <T = unknown>(
  url: string,
  data: unknown,
  options: { headers?: Record<string, string>; formData?: boolean } = {},
  config: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'POST',
    headers: setHeaders(options),
    body: options.formData ? (data as BodyInit) : JSON.stringify(data),
    ...config,
  });
  return handleErrors(response) as T;
};

const update = async <T = unknown>(
  url: string,
  data: unknown,
  options: { headers?: Record<string, string>; formData?: boolean } = {},
  config: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'PUT',
    headers: setHeaders(options),
    body: options.formData ? (data as BodyInit) : JSON.stringify(data),
    ...config,
  });

  return handleErrors(response) as T;
};

const destroy = async <T = unknown>(
  url: string,
  data: unknown,
  options: { headers?: Record<string, string>; formData?: boolean } = {},
  config: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'DELETE',
    headers: setHeaders(options),
    body: JSON.stringify(data),
    ...config,
  });

  return handleErrors(response) as T;
};

export default {
  post,
  get,
  update,
  destroy,
};
