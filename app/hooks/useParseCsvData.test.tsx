import { renderHook } from "@testing-library/react-hooks";
import useParseCsvData from "./useParseCsvData";
import * as Papa from "papaparse";

jest.mock("papaparse", () => ({
  parse: jest.fn(),
}));

beforeEach(() => {
  (Papa.parse as jest.Mock).mockClear();

  (Papa.parse as jest.Mock).mockImplementation((content, options) => {
    const mockData = {
      data: [
        [
          "malza.cz",
          "Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu.",
        ],
      ],
    };

    setTimeout(() => options.complete(mockData), 0);
  });
});

describe("useParseCsvData", () => {
  it("parses CSV content and returns transformed data", async () => {
    const mockParseFunction = jest.fn((record) => ({
      domainName: record[0],
      riskStatus: record[1],
    }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useParseCsvData(
        "malza.cz;Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu.",
        mockParseFunction,
        {
          delimiter: ";",
        },
      ),
    );

    await waitForNextUpdate({ timeout: 3000 });

    expect(result.current).toEqual([
      {
        domainName: "malza.cz",
        riskStatus:
          "Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu.",
      },
    ]);
    expect(mockParseFunction).toHaveBeenCalled();
  });

  it("returns null for null content", () => {
    const { result } = renderHook(() => useParseCsvData(null, jest.fn()));

    expect(result.current).toBeNull();
  });
});
