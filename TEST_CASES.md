# Velozient – booking form Test Cases

## Objective

Criar casos de teste para o Booking form.

## Scope

The test cases cover:

- Units page access
- Unit read permissions
- Unit create permissions
- Unit edit permissions
- Unit delete permissions
- Admin full access
- Read-only access
- Users without permissions
- Facility-level data restrictions
- Direct URL access to restricted resources
- Permission bypass attempts through browser developer tools
- API authentication and authorization
- Invalid and unauthenticated sessions
- Permission changes while the user remains logged in
- Automatic session invalidation after permission changes
- User deactivation and active-session invalidation
- Creation of new users
- Creation and assignment of new roles
- Restoration of modified test data after execution

---

# TC-001 – Verify Unit View Permission (`_unitsReadOnly`)

**Priority:** Critical

## Objective

Verify that a user assigned to the `_unitsReadOnly` role can view Units but cannot create, change the status of, or delete Units.

## Preconditions

- The `_unitsReadOnly` role exists.
- The role has the following Units permissions:

| Permission | Value |
| ---------- | ----- |
| View       | ✅    |
| Create     | ❌    |
| Edit       | ❌    |
| Delete     | ❌    |

- An active test user is assigned to the `_unitsReadOnly` role.
- The user has access to at least one Facility.
- At least one vacant Unit exists.

## Test Steps

1. Log in with the `_unitsReadOnly` user.
2. Verify that the **Units** menu is visible.
3. Open the **Units** page.
4. Verify that the Units page loads successfully.
5. Verify that the Units table is displayed.
6. Verify that the **Add Unit** button is not displayed.
7. Open an existing vacant Unit.
8. Verify that the Unit details page is displayed.
9. Open the **More Actions** menu.
10. Verify that **Change Unit Status** is disabled.
11. Verify that **Delete Unit** is disabled.

## Expected Results

- The user can access the Units page.
- The Units table is displayed.
- The user can open and view Unit details.
- The **Add Unit** action is unavailable.
- The **Change Unit Status** action is disabled.
- The **Delete Unit** action is disabled.
- The user cannot modify or delete Unit data.

---
