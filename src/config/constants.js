/**
 * =========================
 * Task Status
 * =========================
 */
export const TASK_STATUS = Object.freeze({
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
});

export const TASK_STATUS_VALUES = Object.freeze(
  Object.values(TASK_STATUS)
);

/**
 * Explicit workflow ordering
 * Useful for sorting & analytics
 */
export const TASK_STATUS_ORDER = Object.freeze({
  TODO: 1,
  IN_PROGRESS: 2,
  DONE: 3,
});

/**
 * =========================
 * Task Priority
 * =========================
 */
export const TASK_PRIORITY = Object.freeze({
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
});

export const TASK_PRIORITY_VALUES = Object.freeze(
  Object.values(TASK_PRIORITY)
);

/**
 * Explicit priority weight
 * Higher = more important
 */
export const TASK_PRIORITY_WEIGHT = Object.freeze({
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
});
