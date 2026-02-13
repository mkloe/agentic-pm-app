# Q1 2026 — Goals & Roadmap

## Theme: "From MVP to Beta"
Ship the features needed to move from single-user local tool to a real multi-user product that 10 beta teams can use daily.

## Must-Have (P0)

### 1. User Authentication
- Email/password + Google OAuth
- User roles: Owner, Admin, Member, Viewer
- Why: blocker for everything multi-user
- Effort: ~2 weeks
- Owner: Aisha (BE)

### 2. Cloud Database Migration
- Move from local JSON to PostgreSQL (Supabase)
- Data migration script from db.json
- Why: local storage doesn't work for multi-user
- Effort: ~1 week
- Owner: Aisha (BE)

### 3. Real-time Collaboration
- WebSocket for board updates (task moves, edits)
- Presence indicators (who's viewing the board)
- Why: core value prop for team use
- Effort: ~2 weeks
- Owner: Marcus (FE) + Elena (Full-Stack)

## Should-Have (P1)

### 4. Notification System
- In-app notifications for: task assigned to you, task status changed, due date approaching
- Email digest (daily/weekly)
- Why: teams need to stay in sync without checking the board constantly
- Effort: ~1.5 weeks
- Owner: Elena (Full-Stack)

### 5. Reduce Overdue Task Ratio
- Add due date warnings (3 days, 1 day, overdue) with color coding
- Add "overdue" filter to backlog
- Dashboard: highlight overdue count more prominently
- Target: 22% → under 15%
- Owner: Tom (Design) + Marcus (FE)

## Nice-to-Have (P2)

### 6. MCP Integration (Notion + Slack)
- Notion MCP: sync project docs bidirectionally
- Slack MCP: create tasks from Slack messages, post status updates to channel
- Why: reduces context-switching for the team
- Effort: ~2 weeks
- Owner: Elena (Full-Stack)

### 7. Task Comments & Activity Log
- Comment thread on each task
- Activity log: "Marcus moved task to In Progress", "Sarah changed priority to Urgent"
- Why: context for async teams
- Effort: ~1 week
- Owner: Marcus (FE)

## Timeline

| Week | Focus |
|------|-------|
| W1-2 | Auth + database migration |
| W3-4 | Real-time collaboration |
| W5-6 | Notifications + overdue improvements |
| W7-8 | MCP integrations |
| W9-10 | Task comments + polish |
| W11-12 | Beta onboarding (10 teams) |

## Success Criteria (end of Q1)
- 10 beta teams actively using the tool
- Overdue ratio under 15%
- Auth + real-time working in production
- At least 2 MCP integrations live
