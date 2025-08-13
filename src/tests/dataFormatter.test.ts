import { formatDate } from "../utils/dataFormatter";

describe("formatDate", () => {
  it("should format the date correctly", () => {
    expect(formatDate("2017-03-01T00:00:00Z")).toBe("01-03-2017");
  });
  it("should handle invalid date", () => {
    expect(formatDate("")).toBe("");
  });
});
