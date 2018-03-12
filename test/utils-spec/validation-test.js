import { validateRefSearch } from '../../src/utils/validation';

describe("Validation tests", () => {
  it("handles edge case large input (21)", () => {
    const length = 21;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('error');
  });

  it("handles large input (50)", () => {
    const length = 50;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('error');
  });

  it("handles edge case small input (0)", () => {
    const length = 0;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('error');
  });

  it("handles edge case small input (2)", () => {
    const length = 2;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('error');
  });

  it("handles correct input edge case (4)", () => {
    const length = 4;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('success');
  });

  it("handles correct input edge case (12)", () => {
    const length = 12;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('success');
  });
});
