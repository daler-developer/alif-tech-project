import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Container from "../Container.vue";

describe("<Container />", () => {
  test("slot is rendered", () => {
    const wrapper = mount(Container, {
      slots: {
        default: "Hello",
      },
    });

    expect(wrapper.get("[data-test='container']").text()).toContain("Hello");
  });
});
