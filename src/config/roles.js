/**
 * =========================
 * Application Role Definitions
 * =========================
 */

/**
 * Contextual roles (Organization / Project)
 */
const ROLES = Object.freeze({
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
});

/**
 * Role values (for validation & UI)
 */
export const ROLE_VALUES = Object.freeze(
  Object.values(ROLES)
);

/**
 * Explicit role hierarchy
 * Higher number = higher privilege
 */
export const ROLE_LEVEL = Object.freeze({
  MEMBER: 1,
  ADMIN: 2,
  OWNER: 3,
});

/**
 * Helper for role comparison
 */
export const hasRequiredRole = (userRole, requiredRole) => {
  return (
    ROLE_LEVEL[userRole] >= ROLE_LEVEL[requiredRole]
  );
};

export default ROLES;
