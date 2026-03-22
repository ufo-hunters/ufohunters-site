---
name: refactoring
description: "Safe refactoring practices with Minitest protection and Rails/Mongoid-specific patterns for ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
---
# Safe Refactoring — ufohunters-site

## Purpose

Guide safe, systematic refactoring for **ufohunters-site** (Rails 8 / Ruby 3.2.8 / Mongoid 9.0).
Every refactoring must preserve existing behavior while improving internal code structure.
Tests must pass before and after every step.

## Prerequisites: Before You Refactor

### Mandatory Checks

1. **All tests pass.** Run the full test suite:
   ```bash
   bundle exec rails test
   ```
   If any test fails, fix it FIRST.

2. **Working on a clean branch:**
   ```bash
   git checkout -b refactor/<description>
   ```

3. **Understand the code.** Read the code, its callers, and its tests before touching anything.

4. **Have a clear goal.** State what you are improving: readability, maintainability, removing duplication. "Making it better" is not specific enough.

## Refactoring Techniques for Rails + Mongoid

### Extract Method / Private Method

**When:** A method is too long (>20 lines), or a block of code has a logical name.

```ruby
# Before: Long controller action mixing concerns
def create
  @report = Report.new(report_params)
  @report.status = 'pending'
  @report.submitted_by = current_user&.id
  @report.coord = [@report.coordinates[1], @report.coordinates[0]] if @report.coordinates
  if @report.save
    NotificationMailer.new_report(@report).deliver_later
    redirect_to reports_path, notice: 'Report submitted!'
  else
    render :new
  end
end

# After: Thin action with extracted concerns
def create
  result = ReportSubmissionService.new.call(report_params, user: current_user)
  if result.success?
    redirect_to reports_path, notice: 'Report submitted!'
  else
    @report = result.report
    render :new
  end
end
```

### Extract Service Object (Mongoid-specific)

**When:** A controller action or model callback does too much work.

```ruby
# app/services/report_submission_service.rb
class ReportSubmissionService
  Result = Struct.new(:success?, :report, :errors, keyword_init: true)

  def call(params, user:)
    report = Report.new(params.merge(
      status: 'pending',
      submitted_by: user&.id
    ))
    normalize_coordinates!(report)

    if report.valid? && report.save
      NotificationMailer.new_report(report).deliver_later
      Result.new(success?: true, report: report, errors: [])
    else
      Result.new(success?: false, report: report, errors: report.errors.full_messages)
    end
  end

  private

  def normalize_coordinates!(report)
    return unless report.coordinates.present?
    # Ensure [longitude, latitude] order for 2dsphere
    report.coord = [report.coordinates[0], report.coordinates[1]]
  end
end
```

### Extract Mongoid Scope

**When:** The same Mongoid criteria appears in multiple places.

```ruby
# Before: Duplicated criteria
def index
  @reports = Report.where(status: 'published').order_by(created_at: :desc).limit(20)
end

def map_json
  @reports = Report.where(status: 'published').where(:coord.exists => true)
end

# After: Named scopes
# app/models/report.rb
scope :published, -> { where(status: 'published') }
scope :recent,    -> { order_by(created_at: :desc) }
scope :geolocated, -> { where(:coord.exists => true) }

# Controllers become clean
@reports = Report.published.recent.limit(20)
@reports = Report.published.geolocated
```

### Rename with Safety

**When:** A name does not clearly communicate intent.

**Steps:**
1. Search ALL references:
   ```bash
   grep -rn "old_name" app/ test/ config/routes.rb
   ```
2. Check for Mongoid field name references (stored in MongoDB — renaming requires data migration)
3. Check view templates for method calls
4. Rename in all locations
5. Run tests

**Warning for Mongoid field renames:** Renaming a Mongoid `field :name` does NOT rename the MongoDB field in existing documents. You need a data migration script.

### Simplify Mongoid Conditionals

```ruby
# Before: Complex nested conditions
def status_label
  if @report.status == 'published'
    if @report.coord.present?
      'Published with location'
    else
      'Published'
    end
  elsif @report.status == 'pending'
    'Pending review'
  else
    'Unknown'
  end
end

# After: Guard clauses + extracted method
def status_label
  return 'Published with location' if @report.status == 'published' && @report.coord.present?
  return 'Published' if @report.status == 'published'
  return 'Pending review' if @report.status == 'pending'
  'Unknown'
end
```

### Remove Duplication in Test Helpers

```ruby
# Before: Duplicated report creation in multiple test files
class ReportTest < ActiveSupport::TestCase
  setup do
    @report = Report.create!(
      location: 'Phoenix, AZ', shape: 'triangle',
      description: 'Bright lights', status: 'published'
    )
  end
end

class SightingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @report = Report.create!(
      location: 'Phoenix, AZ', shape: 'triangle',
      description: 'Bright lights', status: 'published'
    )
  end
end

# After: Shared helper in test_helper.rb
def create_dummy_report(attrs = {})
  Report.create!({
    location: 'Phoenix, AZ', shape: 'triangle',
    description: 'Bright lights', status: 'published'
  }.merge(attrs))
end
```

## Commit Strategy

```bash
# After each successful refactoring step
git add <changed-files>
git commit -m "refactor: extract ReportSubmissionService from ReportsController

- Moves report creation logic into dedicated service object
- Handles coordinate normalization in service layer
- All tests pass, no behavior change"
```

## Common Refactoring Anti-Patterns in This Codebase

### Moving Business Logic to Callbacks (DO NOT DO)

```ruby
# WRONG: Side effects in Mongoid callbacks
after_create :send_notification_email   # Don't do this

# RIGHT: Use service object
class ReportSubmissionService
  def call(params, user:)
    # ... save report ...
    NotificationMailer.new_report(report).deliver_later
  end
end
```

### Raw MongoDB Queries in Views (DO NOT DO)

```erb
<!-- WRONG: Database query in view -->
<% Report.where(status: 'published').limit(5).each do |r| %>

<!-- RIGHT: Query in controller, assign to @variable -->
```

### Big Bang Refactoring

Never rewrite a large section of code in one step. Take many small steps, each independently committable and tested.

## Refactoring Checklist

Before starting:
- [ ] All tests pass
- [ ] On a clean branch
- [ ] Goal clearly stated

During refactoring:
- [ ] Taking small, incremental steps
- [ ] Running `bundle exec rails test` after each step
- [ ] Committing after each successful step
- [ ] Not mixing in behavior changes
- [ ] Mongoid teardown still present in all test files

After refactoring:
- [ ] All tests still pass
- [ ] No new debug artifacts introduced
- [ ] Code is measurably improved
- [ ] No dead code left behind
- [ ] PR description explains the motivation and approach
