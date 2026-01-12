/**
 * Type representing the different section types in a project evaluation.
 */
export type SectionType = 'critical' | 'mandatory' | 'bonus';

/**
 * Type representing the different view modes in the evaluation app.
 */
export type ViewMode = 'home' | 'evaluation';

/**
 * Interface representing a project in the 42/1337 Network evaluation system.
 */
export interface Project {
  /** Unique slug identifier for the project (e.g., 'python-module-01'). */
  id: string;
  /** Display name of the project. */
  name: string;
  /** Tier level of the project (0-6 rank level). */
  tier: number;
  /** Maximum possible score for the project (e.g., 100, 115, 125). */
  maxScore: number;
  /** Array of sections that make up the project evaluation. */
  sections: Section[];
}

/**
 * Interface representing a section within a project evaluation.
 */
export interface Section {
  /** Type of the section: critical, mandatory, or bonus. */
  type: SectionType;
  /** Title of the section. */
  title: string;
  /** Weight or point value for scoring this section. */
  weight: number;
  /** Array of checklist items within this section. */
  items: ChecklistItem[];
}

/**
 * Interface representing an individual checklist item in a section.
 */
export interface ChecklistItem {
  /** Unique identifier for the checklist item. */
  id: string;
  /** Label or requirement description for the item. */
  label: string;
  /** Optional additional information or description. */
  description?: string;
  /** Optional scale for rating (0-5 stars). */
  scale?: number;
}

/**
 * Interface representing the current state of an evaluation.
 */
export interface EvaluationState {
  /** Set of IDs of checked checklist items. */
  checkedItems: Set<string>;
  /** Record of ratings for scale-based items (0-5 scale). */
  ratings: Record<string, number>;
  /** Current total score. */
  score: number;
  /** Whether critical requirements have failed. */
  isCriticalFailed: boolean;
  /** Whether bonus sections can be accessed. */
  canAccessBonus: boolean;
  /** Score from mandatory sections. */
  mandatoryScore: number;
  /** Score from bonus sections. */
  bonusScore: number;
}

/**
 * Interface representing a breakdown of scores by section.
 */
export interface ScoreBreakdown {
  /** Name of the section. */
  section: string;
  /** Points earned in this section. */
  earned: number;
  /** Possible points in this section. */
  possible: number;
  /** Percentage score for this section. */
  percentage: number;
  /** Optional average rating for rated items in this section. */
  avgRating?: number;
}