import { useState, useCallback, useRef, useEffect } from 'react';


const useTechnologiesApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortControllerRef = useRef(null);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const fetchRoadmap = useCallback(async (url) => {
    cancelRequest();
    setIsLoading(true);
    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
      return json;
    } catch (err) {
      if (err.name === 'AbortError') {
        return null;
      }
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cancelRequest]);

  const loadFromFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Файл не выбран'));
        return;
      }

      if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        reject(new Error('Пожалуйста, выберите JSON файл'));
        return;
      }

      setIsLoading(true);
      setError(null);

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setData(json);
          setIsLoading(false);
          resolve(json);
        } catch (err) {
          const error = new Error('Ошибка парсинга JSON файла: ' + err.message);
          setError(error.message);
          setIsLoading(false);
          reject(error);
        }
      };

      reader.onerror = () => {
        const error = new Error('Ошибка чтения файла');
        setError(error.message);
        setIsLoading(false);
        reject(error);
      };

      reader.readAsText(file);
    });
  }, []);

  const debounceRef = useRef(null);
  const debouncedSearch = useCallback((query, callback, delay = 300) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      callback(query);
    }, delay);
  }, []);

  useEffect(() => {
    return () => {
      cancelRequest();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [cancelRequest]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return {
    isLoading,
    error,
    data,
    fetchRoadmap,
    loadFromFile,
    debouncedSearch,
    cancelRequest,
    clearError,
    clearData
  };
};

export default useTechnologiesApi;
