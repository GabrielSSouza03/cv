import { describe, expect, it } from "vitest";
import { isLocale, localeFromAcceptLanguage, otherLocale } from "@/i18n/config";

describe("localeFromAcceptLanguage", () => {
  it.each([
    ["pt-BR,pt;q=0.9,en;q=0.8", "pt"],
    ["pt", "pt"],
    ["PT-pt", "pt"],
    ["en-US,en;q=0.9,pt;q=0.8", "en"],
    ["es-ES,pt;q=0.9", "en"],
    ["", "en"],
    [null, "en"],
    ["ptx", "en"],
  ] as const)("%j → %s", (header, expected) => {
    expect(localeFromAcceptLanguage(header)).toBe(expected);
  });
});

describe("locale helpers", () => {
  it("validates supported locales", () => {
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("returns the opposite locale", () => {
    expect(otherLocale("pt")).toBe("en");
    expect(otherLocale("en")).toBe("pt");
  });
});
