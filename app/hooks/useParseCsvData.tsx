import { useState, useEffect } from "react";
import Papa from "papaparse";

interface ParseOptions {
  delimiter?: string;
  skipEmptyLines?: boolean;
}

export default function useParseCsvData<T>(
  content: string | null,
  parseFunction: (record: any[]) => T,
  { delimiter = ";", skipEmptyLines = true }: ParseOptions = {},
) {
  const [parsedData, setParsedData] = useState<T[] | null>(null);

  useEffect(() => {
    if (content) {
      Papa.parse(content, {
        complete: (result) => {
          const data = result.data.map((record: any) => parseFunction(record));
          setParsedData(data);
        },
        delimiter,
        skipEmptyLines,
      });
    }
  }, [content, parseFunction, delimiter, skipEmptyLines]);

  return parsedData;
}
