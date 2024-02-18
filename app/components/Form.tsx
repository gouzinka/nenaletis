"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";
import { screens } from "@/tailwindConfig";
import { debounce } from "@/utils/debounce";

const Form: React.FC = () => {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState<string>(
    "Zadejte adresu e-shopu, např. www.eshop.cz",
  );

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const domainNamePattern =
    /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\/?$/;

  const isValidUrl = (url: string): boolean => {
    return domainNamePattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputUrl.trim()) {
      setError("Prosím, zadejte URL, např. www.eshop.cz");
      return;
    }

    if (!isValidUrl(inputUrl)) {
      setError("Prosím, zadejte validní URL, např. www.eshop.cz");
      return;
    }

    const domainMatch = inputUrl.match(domainNamePattern);

    let urlSlug = "";
    if (domainMatch && domainMatch[1]) {
      urlSlug = domainMatch[1].toLowerCase().replace(/\./g, "-");
    }

    router.push(`/${config.URL_PREFIX}/${encodeURIComponent(urlSlug)}`);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // I normally wouldn't really do this, but I felt like not enough is happening :)
    if (window) {
      const updatePlaceholder = () => {
        const mdBreakpoint = parseInt(screens.md, 10);

        const newPlaceholder =
          window.innerWidth < mdBreakpoint
            ? "Např. www.eshop.cz"
            : "Zadejte adresu e-shopu, např. www.eshop.cz";
        setPlaceholder(newPlaceholder);
      };

      const debouncedUpdatePlaceholder = debounce(updatePlaceholder, 300);

      window.addEventListener("resize", debouncedUpdatePlaceholder);

      updatePlaceholder();

      return () =>
        window.removeEventListener("resize", debouncedUpdatePlaceholder);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-2 flex flex-col justify-center items-center">
        <div className="relative w-full mb-12">
          <label
            htmlFor="urlInput"
            className="block text-sm font-medium text-tertiary mb-2 md:sr-only"
          >
            Zadejte adresu e&#8209;shopu:
          </label>

          <input
            ref={inputRef}
            id="urlInput"
            aria-label="Zadejte adresu e-shopu"
            aria-invalid={!!error}
            type="text"
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value);
              if (error) setError(null);
            }}
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 focus-visible:ring-pink-500 focus-visible:border-pink-500"
            placeholder={placeholder}
          />

          {error && (
            <div
              role="alert"
              aria-live="assertive"
              data-testid="error-msg"
              className="absolute text-error text-xs -bottom-6"
            >
              {error}
            </div>
          )}
        </div>

        <button
          aria-label="Ověřit"
          data-testid="search-button"
          type="submit"
          className="font-bold md:text-md leading-6 tracking-wide uppercase text-white text-center rounded-tl-2xl rounded-br-2xl md:rounded-tl-3xl md:rounded-br-3xl flex justify-center items-center bg-gradient-linear hover:gradient-linear-hover h-12 w-full md:w-28"
        >
          Ověřit
        </button>
      </div>
    </form>
  );
};

export default Form;
