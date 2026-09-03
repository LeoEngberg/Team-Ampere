import { describe, it, expect } from "vitest";
import { invoiceStatus } from "./invoiceStatus";

describe("invoiceStatus", () => {
  it('should return "Betald" if the invoice status is "Betald"', () => {
    const invoice = { status: "Betald", due: "2026-07-01" };
    const today = new Date("2026-08-27T15:30:00");
    expect(invoiceStatus(invoice, today)).toBe("Betald");
  });

  it('should return "Förfallen" if the invoice is past due and not paid', () => {
    const invoice = { status: "Obetald", due: "2026-07-01" };
    const today = new Date("2026-08-27T15:30:00");
    expect(invoiceStatus(invoice, today)).toBe("Förfallen");
  });

  it('should return "Obetald" if the invoice is not yet due and not paid', () => {
    const invoice = { status: "Obetald", due: "2026-09-01" };
    const today = new Date("2026-08-27T15:30:00");
    expect(invoiceStatus(invoice, today)).toBe("Obetald");
  });
});
