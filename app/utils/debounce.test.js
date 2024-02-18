import { debounce } from "./debounce";

jest.useFakeTimers();

describe("debounce", () => {
  let func;
  let debouncedFunc;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 1000);
  });

  test("executes the function just once", async () => {
    // Simulate rapid calls
    for (let i = 0; i < 5; i++) {
      debouncedFunc(i);
      jest.advanceTimersByTime(500);
    }

    jest.advanceTimersByTime(1000);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(4);
  });
});
