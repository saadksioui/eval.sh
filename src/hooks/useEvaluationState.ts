import type { Project, EvaluationState } from '../types';
import { calculateScore } from '../utils/scoreCalculator';
import { useState, useMemo } from 'react';

/**
 * Custom hook for managing evaluation state in the 42/1337 simulator.
 *
 * @param project - The project to evaluate
 * @returns Object containing state, functions, and computed values
 */
export function useEvaluationState(project: Project) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [ratings, setRatings] = useState<Record<string, number | boolean>>({});

  /**
   * Toggles the checked state of a checklist item.
   *
   * @param itemId - The ID of the item to toggle
   */
  const toggleItem = (itemId: string): void => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  /**
   * Sets the rating for a scaled item.
   *
   * @param itemId - The ID of the item to rate
   * @param value - The rating value (0-5)
   */
  const rateItem = (itemId: string, value: number): void => {
    setRatings((prev) => ({ ...prev, [itemId]: value }));
  };

  /**
   * Resets all evaluation state to initial values.
   */
  const reset = (): void => {
    setCheckedItems(new Set());
    setRatings({});
  };

  /**
   * Computed evaluation state based on current checked items and ratings.
   */
  const scoreData: EvaluationState = useMemo(
    () => calculateScore(project.sections, checkedItems, ratings),
    [project.sections, checkedItems, ratings]
  );

  /**
   * Overall completion percentage across all sections.
   */
  const completionPercentage: number = useMemo(() => {
    let totalItems = 0;
    let checkedCount = 0;
    for (const section of project.sections) {
      totalItems += section.items.length;
      checkedCount += section.items.filter((item) => checkedItems.has(item.id)).length;
    }
    return totalItems > 0 ? (checkedCount / totalItems) * 100 : 100;
  }, [project.sections, checkedItems]);

  return {
    toggleItem,
    rateItem,
    reset,
    ...scoreData,
    completionPercentage,
  };
}