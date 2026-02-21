# Test Suite for @brequet/ai-setup

This directory contains tests for the CLI, focused on **critical paths only** - no over-rigid, fragile tests.

## Philosophy

- ✅ **Test what matters**: Core functionality like catalog operations and skill installation
- ✅ **Fully isolated**: All tests run in temp directories, no network required
- ✅ **Flexible**: Tests won't break with refactoring - they test behavior, not implementation
- ❌ **No BS tests**: No testing framework code, no mocking everything, no 100% coverage obsession

## Structure

```
tests/
├── fixtures/           # Minimal test catalogs
│   ├── catalog-a/      # Valid catalog with 2 skills
│   └── catalog-b/      # Valid catalog with overlapping skills (for collision testing)
├── helpers/            # Test utilities
│   ├── test-env.ts     # Creates isolated temp directories for each test
│   ├── fixtures.ts     # Fixture path helpers
│   └── mock-prompts.ts # Prompt mocking utilities (unused - we use yes:true instead)
├── integration/        # Integration tests (80% of value)
│   ├── catalog-add.test.ts      # Adding catalogs
│   ├── skill-installation.test.ts # Installing skills to OpenCode folder
│   └── collision.test.ts         # Handling skill conflicts
└── unit/              # Unit tests (20% of value)
    ├── validation.test.ts # Pure validation logic
    └── config.test.ts     # Pure config functions
```

## Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# With UI
pnpm test:ui
```

## Test Isolation

Tests use `__setTestPaths()` in `src/utils/paths.ts` to redirect:
- Skills directory → temp directory per test
- Config directory → temp directory per test

This allows testing **real file operations** without touching your actual OpenCode folder.

## What We Test

### Integration Tests (Critical Paths)
- ✅ Adding local catalogs
- ✅ Installing skills to isolated directory
- ✅ Collision detection & handling
- ✅ Config tracking of installed skills
- ✅ Priority ordering

### Unit Tests (Stable Business Logic)
- ✅ Validation functions (pure logic)
- ✅ Config pure functions (getNextPriority, getActiveCatalogs, etc.)

## What We DON'T Test

- ❌ Git operations (complex, low value for now)
- ❌ Logger output (cosmetic, changes frequently)
- ❌ CLI argument parsing (commander handles it)
- ❌ Interactive prompts (we use `yes: true` to skip them)
- ❌ Error messages verbatim (brittle)

## Adding New Tests

When adding tests, ask yourself:

1. **Does this test critical behavior?** (catalog operations, skill installation)
2. **Will it survive refactoring?** (tests behavior, not implementation details)
3. **Is it isolated?** (no network, uses temp directories)

If yes to all three, add the test. Otherwise, skip it.

## Test Fixtures

Fixture catalogs are **minimal** and **valid**:
- `catalog-a`: 2 skills (skill-alpha, skill-beta)
- `catalog-b`: 2 skills (skill-alpha, skill-gamma) - for collision testing

All SKILL.md files have valid frontmatter:
- `name`: lowercase-with-hyphens (matches directory name)
- `description`: Simple description
- `version`: Semantic version

## Notes

- Tests mock `@inquirer/prompts` to avoid interactive input
- All commands use `yes: true` option to skip prompts in tests
- Each test gets a fresh isolated environment via `createTestEnv()`
- Tests clean up temp directories after completion
