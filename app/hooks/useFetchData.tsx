import { useState, useEffect } from "react";

interface FetchState {
  data: string | null;
  isLoading: boolean;
  error: string | null;
}

const cacheDurationMs = 24 * 60 * 60 * 1000; // 1 day

export default function useFetchData(url: string) {
  const [state, setState] = useState<FetchState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `fetchData_${encodeURIComponent(url)}`;
      let cachedData = localStorage.getItem(cacheKey);

      try {
        let data: string | null = null;

        if (cachedData) {
          const cached = JSON.parse(cachedData);
          if (Date.now() - cached.cachedAt < cacheDurationMs) {
            data = cached.data;
          }
        } else {
          const response = await fetch(url);
          if (!response.ok)
            throw new Error(`Chyba při načítání: ${response.statusText}`);

          const buffer = await response.arrayBuffer();
          const textDecoder = new TextDecoder("windows-1250");
          data = textDecoder.decode(buffer);

          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data, cachedAt: Date.now() }),
          );
        }

        setState({ data, isLoading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : "Neočekávaná chyba",
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
}
