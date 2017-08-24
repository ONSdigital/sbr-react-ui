import { countStatus, countStatusBetween, getDestination, formatResultsTable, getValueByKey } from '../../src/utils/helperMethods';

describe("Count Status tests", () => {
  it("counts number of 200 HTTPCode's correctly", () => {
    const history = [
      { HTTPCode: 200 },
      { HTTPCode: 200 },
      { HTTPCode: 200 },
      { HTTPCode: 404 },
      { HTTPCode: 500 },
    ];
    const numStatus = countStatus(history,200);
    expect(numStatus).toBe(3);
  });

  it("counts number of 404 HTTPCode's correctly", () => {
    const history = [
      { HTTPCode: 404 },
      { HTTPCode: 404 },
      { HTTPCode: 200 },
      { HTTPCode: 404 },
      { HTTPCode: 500 },
    ];
    const numStatus = countStatus(history,404);
    expect(numStatus).toBe(3);
  });

  it("counts number of 500 to 600 HTTPCode's correctly", () => {
    const history = [
      { HTTPCode: 200 },
      { HTTPCode: 501 },
      { HTTPCode: 501 },
      { HTTPCode: 503 },
      { HTTPCode: 503 },
    ];
    const status = { min: 500, max: 600 };
    const numStatus = countStatusBetween(history,status);
    expect(numStatus).toBe(4);
  });
});

describe("Format Results Table tests", () => {
  it("changes businessName to name correctly for VAT", () => {
    const results = [
      { source: 'Enterprise', name: 'test' },
      { source: 'VAT', businessName: 'test 123' },
    ];
    const correct = [
      { source: 'Enterprise', name: 'test' },
      { source: 'VAT', businessName: 'test 123', name: 'test 123' },
    ];
    const formatted = formatResultsTable(results);
    expect(JSON.stringify(formatted)).toBe(JSON.stringify(correct));
  });

  it("changes businessName to name correctly for Legal Unit", () => {
    const results = [
      { source: 'Enterprise', name: 'test' },
      { source: 'Legal Unit', businessName: 'test 123' },
    ];
    const correct = [
      { source: 'Enterprise', name: 'test' },
      { source: 'Legal Unit', businessName: 'test 123', name: 'test 123' },
    ];
    const formatted = formatResultsTable(results);
    expect(JSON.stringify(formatted)).toBe(JSON.stringify(correct));
  });
});

describe("Get value by key tests", () => {
  it("returns the value for a key that is present", () => {
    const results = {
      name: 'Jon Doe',
      age: 55
    };
    const value = getValueByKey(results,'name');
    expect(value).toBe(results.name);
  });

  it("returns an empty string for a non-present key", () => {
    const results = {
      name: 'Jon Doe',
      age: 55
    };
    const value = getValueByKey(results,'lastName');
    expect(value).toBe('');
  });
});
