import type { Section, ScoreBreakdown, EvaluationState } from '../types/index';

/**
 * Calculates the evaluation score based on sections, checked items, and ratings.
 *
 * @param sections - Array of sections in the project
 * @param checkedItems - Set of checked item IDs
 * @param ratings - Record of ratings for items (boolean for checkboxes, number for scaled items)
 * @returns The complete evaluation state
 *
 * @example
 * ```typescript
 * const state = calculateScore(sections, new Set(['item1', 'item2']), { 'item3': 4 });
 * console.log(state.score); // Total score
 * ```
 */
export function calculateScore(
  sections: Section[],
  checkedItems: Set<string>,
  ratings: Record<string, number | boolean>
): EvaluationState {
  // Check critical sections
  let isCriticalFailed = false;
  for (const section of sections) {
    if (section.type === 'critical') {
      for (const item of section.items) {
        if (!checkedItems.has(item.id)) {
          isCriticalFailed = true;
          break;
        }
      }
      if (isCriticalFailed) break;
    }
  }

  if (isCriticalFailed) {
    return {
      checkedItems,
      ratings: ratings as Record<string, number>,
      score: 0,
      isCriticalFailed: true,
      canAccessBonus: false,
      mandatoryScore: 0,
      bonusScore: 0,
    };
  }

  // Calculate mandatory score
  let mandatoryScore = 0;
  let totalMandatoryWeight = 0;

  for (const section of sections) {
    if (section.type === 'mandatory') {
      totalMandatoryWeight += section.weight;
      const sectionScore = calculateSectionScore(section, checkedItems, ratings);
      mandatoryScore += sectionScore;
    }
  }

  const mandatoryPercentage = totalMandatoryWeight > 0 ? (mandatoryScore / totalMandatoryWeight) * 100 : 100;
  const canAccessBonus = mandatoryPercentage >= 100;

  // Calculate bonus score
  let bonusScore = 0;
  if (canAccessBonus) {
    for (const section of sections) {
      if (section.type === 'bonus') {
        const sectionScore = calculateSectionScore(section, checkedItems, ratings);
        bonusScore += sectionScore;
      }
    }
  }

  const score = mandatoryScore + bonusScore;

  return {
    checkedItems,
    ratings: ratings as Record<string, number>,
    score,
    isCriticalFailed: false,
    canAccessBonus,
    mandatoryScore,
    bonusScore,
  };
}

/**
 * Calculates the score for a single section.
 *
 * @param section - The section to calculate score for
 * @param checkedItems - Set of checked item IDs
 * @param ratings - Record of ratings for items
 * @returns The score for the section
 */
function calculateSectionScore(
  section: Section,
  checkedItems: Set<string>,
  ratings: Record<string, number | boolean>
): number {
  const checkboxItems = section.items.filter((item) => !item.scale);
  const ratedItems = section.items.filter((item) => item.scale);

  // Checkbox score: (checked_count / total_items) * weight
  const checkedCount = checkboxItems.filter((item) => checkedItems.has(item.id)).length;
  const checkboxScore = checkboxItems.length > 0 ? (checkedCount / checkboxItems.length) * section.weight : 0;

  // Rated score: (average_rating / 5) * weight
  let ratedScore = 0;
  if (ratedItems.length > 0) {
    const ratingsSum = ratedItems.reduce((sum, item) => {
      const rating = ratings[item.id];
      return sum + (typeof rating === 'number' ? rating : 0);
    }, 0);
    const avgRating = ratingsSum / ratedItems.length;
    ratedScore = (avgRating / 5) * section.weight;
  }

  return checkboxScore + ratedScore;
}

/**
 * Calculates the score breakdown for each section.
 *
 * @param sections - Array of sections in the project
 * @param ratings - Record of ratings for items
 * @returns Array of score breakdowns per section
 *
 * @example
 * ```typescript
 * const breakdowns = calculateBreakdown(sections, { 'item1': true, 'item2': 4 });
 * console.log(breakdowns[0].percentage); // Percentage for first section
 * ```
 */
export function calculateBreakdown(
  sections: Section[],
  ratings: Record<string, number | boolean>
): ScoreBreakdown[] {
  const breakdowns: ScoreBreakdown[] = [];

  for (const section of sections) {
    const checkboxItems = section.items.filter((item) => !item.scale);
    const ratedItems = section.items.filter((item) => item.scale);

    // Checkbox score
    const checkedCount = checkboxItems.filter((item) => ratings[item.id] === true).length;
    const checkboxScore = checkboxItems.length > 0 ? (checkedCount / checkboxItems.length) * section.weight : 0;

    // Rated score and average
    let ratedScore = 0;
    let avgRating: number | undefined;
    if (ratedItems.length > 0) {
      const ratingsSum = ratedItems.reduce((sum, item) => {
        const rating = ratings[item.id];
        return sum + (typeof rating === 'number' ? rating : 0);
      }, 0);
      avgRating = ratingsSum / ratedItems.length;
      ratedScore = (avgRating / 5) * section.weight;
    }

    const earned = checkboxScore + ratedScore;
    const possible = section.weight;
    const percentage = possible > 0 ? (earned / possible) * 100 : 0;

    breakdowns.push({
      section: section.title,
      earned,
      possible,
      percentage,
      avgRating,
    });
  }

  return breakdowns;
}

/**
 * Calculates the completion percentage for a section based on checked items.
 *
 * @param section - The section to calculate completion for
 * @param checkedItems - Set of checked item IDs
 * @returns Completion percentage (0-100)
 *
 * @example
 * ```typescript
 * const percentage = getCompletionPercentage(section, new Set(['item1']));
 * console.log(percentage); // 50 if section has 2 items
 * ```
 */
export function getCompletionPercentage(section: Section, checkedItems: Set<string>): number {
  if (section.items.length === 0) return 100;
  const checkedCount = section.items.filter((item) => checkedItems.has(item.id)).length;
  return (checkedCount / section.items.length) * 100;
}