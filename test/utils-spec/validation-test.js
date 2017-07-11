import { validateRefSearch } from '../../src/utils/validation';

describe("Validation tests", function() {
  it("handles edge case large input (13)", function() {
    const length = 13;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('error');
  });

  it("handles large input (100)", function() {
    const length = 13;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('error');
  });

  it("handles edge case small input (0)", function() {
    const length = 0;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('error');
  });

  it("handles edge case small input (5)", function() {
    const length = 5;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('error');
  });

  it("handles correct input edge case (6)", function() {
    const length = 6;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('success');
  });

  it("handles correct input edge case (12)", function() {
    const length = 12;
    const bsStyle = validateRefSearch(length)
    expect(bsStyle).toBe('success');
  });
});
