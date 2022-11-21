import { mutations } from "../ui";
import type { IState as UiState } from "../ui";
import { describe, expect, test } from "vitest";

const mockState: UiState = {
  isCreateQuoteModalVisible: true,
  isEditQuoteModalVisible: true,
};

describe("ui store", () => {
  test("commit: setIsCreateQuoteModalVisible", () => {
    mutations.setIsCreateQuoteModalVisible(mockState, false);

    expect(mockState.isCreateQuoteModalVisible).toEqual(false);

    mutations.setIsCreateQuoteModalVisible(mockState, true);

    expect(mockState.isCreateQuoteModalVisible).toEqual(true);
  });

  test("commit: isEditQuoteModalVisible", () => {
    mutations.setIsEditQuoteModalVisible(mockState, false);

    expect(mockState.isEditQuoteModalVisible).toEqual(false);

    mutations.setIsEditQuoteModalVisible(mockState, true);

    expect(mockState.isEditQuoteModalVisible).toEqual(true);
  });
});
