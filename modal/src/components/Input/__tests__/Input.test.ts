import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "../Input.vue";

describe("Input", () => {
  it("should render input element", () => {
    const wrapper = mount(Input);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("should have default type as text", () => {
    const wrapper = mount(Input);
    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe("text");
  });

  it("should accept custom type prop", () => {
    const wrapper = mount(Input, {
      props: {
        type: "password",
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe("password");
  });

  it("should display placeholder when provided", () => {
    const placeholder = "Enter your text here";
    const wrapper = mount(Input, {
      props: {
        placeholder,
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(placeholder);
  });

  it("should handle v-model correctly", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "initial value",
      },
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe("initial value");

    await input.setValue("new value");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["new value"]);
  });

  it("should update modelValue when input changes", async () => {
    const wrapper = mount(Input);
    const input = wrapper.find("input");

    await input.setValue("test input");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["test input"]);
  });

  it("should have correct CSS classes", () => {
    const wrapper = mount(Input);
    const input = wrapper.find("input");

    expect(input.classes()).toContain("w-full");
    expect(input.classes()).toContain("py-1");
    expect(input.classes()).toContain("px-2");
    expect(input.classes()).toContain("outline-none");
    expect(input.classes()).toContain("border");
    expect(input.classes()).toContain("rounded-md");
  });

  it("should handle multiple value changes", async () => {
    const wrapper = mount(Input);
    const input = wrapper.find("input");

    await input.setValue("first");
    await input.setValue("second");
    await input.setValue("third");

    expect(wrapper.emitted("update:modelValue")).toHaveLength(3);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["first"]);
    expect(wrapper.emitted("update:modelValue")?.[1]).toEqual(["second"]);
    expect(wrapper.emitted("update:modelValue")?.[2]).toEqual(["third"]);
  });

  it("should work with empty string", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "initial",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([""]);
  });

  it("should handle special characters", async () => {
    const wrapper = mount(Input);
    const input = wrapper.find("input");

    const specialValue = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    await input.setValue(specialValue);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([specialValue]);
  });
});
