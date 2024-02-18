import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "jest-fetch-mock";
import useFetchData from "./useFetchData";

global.TextDecoder = require("util").TextDecoder;

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("useFetchData", () => {
  it("fetches data successfully", async () => {
    const mockData = { key: "value" };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchData("https://example.com/data"),
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(JSON.stringify(mockData));
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
  });

  it("handles fetch error", async () => {
    const errorMessage = "Failed to fetch";
    fetchMock.mockRejectOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchData("https://example-w-error.com/data"),
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isLoading).toBeFalsy();
  });
});
