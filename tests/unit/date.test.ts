import { describe, expect, it } from "vitest";
import { formatDuration, formatYearMonth, monthsBetween } from "@/lib/date";

const units = { year: { one: "yr", other: "yrs" }, month: { one: "mo", other: "mos" } };

describe("formatYearMonth", () => {
  it("formats per locale without trailing dots", () => {
    expect(formatYearMonth({ year: 2024, month: 9 }, "en")).toBe("Sep 2024");
    expect(formatYearMonth({ year: 2024, month: 9 }, "pt")).toBe("set 2024");
  });
});

describe("monthsBetween", () => {
  it("counts both ends like LinkedIn", () => {
    expect(monthsBetween({ year: 2024, month: 9 }, { year: 2025, month: 12 })).toBe(16);
    expect(monthsBetween({ year: 2026, month: 7 }, { year: 2026, month: 9 })).toBe(3);
    expect(monthsBetween({ year: 2026, month: 1 }, { year: 2026, month: 7 })).toBe(7);
  });
});

describe("formatDuration", () => {
  it("combines years and months with plurals", () => {
    expect(formatDuration(16, units)).toBe("1 yr 4 mos");
    expect(formatDuration(1, units)).toBe("1 mo");
    expect(formatDuration(24, units)).toBe("2 yrs");
  });
});
