---
name: tdd
description: "Test-Driven Development workflow with Minitest Red-Green-Refactor cycle for ufohunters-site (Rails 8 + Mongoid 9)."
allowed-tools: Read, Grep, Glob, Bash
---
# TDD Workflow — ufohunters-site

## Purpose

Enforce a disciplined Test-Driven Development workflow for **ufohunters-site**
(Rails 8 / Ruby 3.2.8 / Mongoid 9.0) using **Minitest** with `ActiveSupport::TestCase`.
Every feature, bug fix, and enhancement follows the RED-GREEN-REFACTOR cycle.

## Critical: Minitest + Mongoid Rules

Before any TDD session, internalize these constraints:

1. **No fixtures** — Mongoid does not support Rails YAML fixtures. Use `create_dummy_*` helpers.
2. **Always teardown** — Mongoid does not roll back between tests. Add `teardown { delete_all }`.
3. **No ActiveRecord** — Use Mongoid criteria: `.where(field: value)`, not `.where("field = ?", value)`.
4. **No migration files** — Schema changes go in model files (`field :name, type: Type`).

## The TDD Cycle

```
    +-------+
    |  RED  |  Write a failing Minitest test
    +---+---+
        |
        v
    +-------+
    | GREEN |  Write minimal Mongoid/Rails code to pass
    +---+---+
        |
        v
    +----------+
    | REFACTOR |  Improve code, keep tests green
    +----------+
        |
        v
    (repeat)
```

## Phase 1: RED — Write a Failing Test

### Rules

1. Write exactly ONE test that describes the desired behavior.
2. The test MUST fail when you run it.
3. The test should fail for the RIGHT reason — the feature is missing.
4. Name the test to describe the behavior, not the implementation.

### Test Naming Convention (Minitest)

```ruby
# Good: descriptive behavior statement
test "requires location to be present for a report to be valid" do
  ...
end

test "published scope returns only reports with status published" do
  ...
end

test "redirects to login when unauthenticated user tries to create a report" do
  ...
end

# Bad: method name style
test "test_location_validation" do
  ...
end
```

### Writing the Failing Test

```ruby
# test/models/report_test.rb
require 'test_helper'

class ReportTest < ActiveSupport::TestCase
  teardown { Report.delete_all }

  test "requires description for validity" do
    report = Report.new(location: 'Phoenix, AZ', shape: 'triangle')
    assert_not report.valid?, "Expected report to be invalid without description"
    assert_includes report.errors[:description], "can't be blank"
  end
end
```

### Commit at RED

```bash
bundle exec rails test test/models/report_test.rb
# -> FAIL (expected)

git add test/models/report_test.rb
git commit -m "test: add failing test for Report description validation"
```

## Phase 2: GREEN — Write Minimal Code to Pass

### Rules

1. Write the MINIMUM Mongoid/Rails code needed to make the test pass.
2. Do not optimize, do not generalize, do not add features.
3. Run ALL related tests to ensure nothing else broke.

### What "Minimal" Means for Mongoid

```ruby
# If the test expects a field to be validated:
validates :description, presence: true
# That's it. Don't add more validations yet.

# If the test expects a scope:
scope :published, -> { where(status: 'published') }
# Return exact criteria. No optimization yet.

# If the test expects a field to exist:
field :description, type: String
# Add the field. Nothing else.
```

### Commit at GREEN

```bash
bundle exec rails test test/models/report_test.rb
# -> PASS

bundle exec rails test  # Run ALL tests
# -> ALL PASS

git add app/models/report.rb
git commit -m "feat: add description presence validation to Report"
```

## Phase 3: REFACTOR — Improve with Confidence

### Rules

1. ALL tests must pass before refactoring.
2. Run tests after every small refactoring step.
3. Do not add new behavior during refactoring.

### Common Refactoring Targets for This Codebase

```ruby
# Extract long Mongoid query chains into named scopes
scope :recent_published, -> { where(status: 'published').order_by(created_at: :desc) }

# Extract repeated validation sets into shared modules/concerns
module Reportable
  extend ActiveSupport::Concern
  included do
    validates :location, presence: true
    validates :description, presence: true
  end
end

# Extract controller setup into before_actions
before_action :set_report, only: [:show, :edit, :update, :destroy]
private
def set_report
  @report = Report.find(params[:id])
end
```

### Commit at REFACTOR

```bash
bundle exec rails test
# -> ALL PASS

git add app/models/report.rb
git commit -m "refactor: extract published scope into named scope"
```

## Framework-Specific Test Patterns

### Mongoid Model Tests (Arrange-Act-Assert)

```ruby
class ReportTest < ActiveSupport::TestCase
  teardown { Report.delete_all }

  test "stores and retrieves geospatial coordinates" do
    # Arrange
    coords = [-118.2437, 34.0522]  # [longitude, latitude] — GeoJSON order!

    # Act
    report = create_dummy_report(coord: coords)

    # Assert
    assert_equal coords, report.reload.coord
  end
end
```

### Controller Tests (Given-When-Then style)

```ruby
class ReportsControllerTest < ActionDispatch::IntegrationTest
  teardown { Report.delete_all; User.delete_all }

  test "redirects unauthenticated user away from report creation" do
    # Given: user is not authenticated

    # When: they visit new report page
    get new_report_url

    # Then: they are redirected to login
    assert_redirected_to login_url
  end
end
```

## What to Test

| Always Test                                      | Skip Testing                           |
|--------------------------------------------------|----------------------------------------|
| Mongoid field validations (presence, format)     | Mongoid internals (field storage)      |
| Custom scopes and criteria                       | Rails/Mongoid framework behavior       |
| Controller access control (auth guards)          | Getter/setter methods with no logic    |
| Service object outcomes (success/failure)        | External API responses (mock these)    |
| Error paths (what happens with invalid input)    | View rendering details (test behavior) |
| Authentication flow (login/logout)               | Generated code                         |
| Geospatial coordinate handling                   |                                        |

## Coverage Expectations

- **New Mongoid fields with validations**: Must be tested (valid + invalid)
- **New scopes**: Must be tested with at least 2 documents (one matching, one not)
- **New controller actions**: Must test success, auth failure, and validation failure
- **Bug fixes**: Must include a test that reproduces the bug before fixing it
- **New service objects**: Must test success and failure paths

## TDD Session Workflow

1. Start with a clear, small requirement.
2. Write the test (RED). Commit.
3. Make it pass (GREEN). Commit.
4. Clean up (REFACTOR). Commit.
5. Pick the next small requirement. Repeat.

### Session Checklist

- [ ] Each cycle produced 2-3 commits (test, feat/fix, optional refactor).
- [ ] All test classes have `teardown { delete_all }` for Mongoid cleanup.
- [ ] No test uses `fixtures` (Mongoid incompatible).
- [ ] All tests pass after every commit: `bundle exec rails test`.
- [ ] No debug artifacts (`binding.pry`, `puts`) in committed code.
