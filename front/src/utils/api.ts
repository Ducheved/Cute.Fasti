import { ShortenRequest, ShortenResponse } from '../types/types';

const apiUrl = import.meta.env.VITE_API_URL;

export const shortenUrl = async (data: ShortenRequest): Promise<ShortenResponse> => {
  const response = await fetch(`${apiUrl}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to shorten URL');
  }

  return response.json();
};
