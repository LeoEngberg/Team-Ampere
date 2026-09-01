import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ProfileView from "./ProfileView.vue";
import * as api from "../services/api.js";

describe("ProfileView", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  // Regression test from debt.md: "Ingen validering av e-postfältet i ProfileView"
  it("should not save when the email field does not contain a valid email (regression)", async () => {
    vi.spyOn(api, "fetchUser").mockResolvedValue({
      name: "Anna Andersson",
      email: "anna@example.com",
      address: "Testgatan 1",
    });
    const saveSpy = vi.spyOn(api, "saveUser");

    const wrapper = mount(ProfileView);
    await flushPromises();

    const emailInput = wrapper.findAll("input")[1];
    await emailInput.setValue("Anna Andersson");

    await wrapper.find("button").trigger("click");

    expect(saveSpy).not.toHaveBeenCalled();
  });
});

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve));
}
