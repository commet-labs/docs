# Commet Library Documentation Guidelines

## Voice & Tone

### Core Principles
- **Technical yet Direct**: Like Better Auth - no fluff, straight to the point
- **Developer-First**: Assume readers are experienced developers
- **Confidence without Arrogance**: We know our stuff, but we're helpful
- **Action-Oriented**: Every section should lead to something the developer can do

### Writing Style
- **Imperative mood**: "Install the SDK" not "You can install the SDK"
- **Present tense**: "The SDK handles retries" not "The SDK will handle retries"
- **Active voice**: "Configure your client" not "Your client can be configured"
- **Positive language**: "Use environment variables" not "Don't expose your API key"
- **Focus on capabilities**: "The SDK automatically retries" not "The SDK won't fail on network errors"
- **Concise sentences**: Max 20 words per sentence when possible
- **Progressive disclosure**: Show basic usage first, advanced options later
- **Scannable text**: Use bullets, short paragraphs, clear headings
- **Reduce cognitive load**: One concept per section, logical flow

### Tone Examples

✅ **Good (Commet Style)**
```markdown
# Track Usage Events

Send usage data for accurate billing calculations.

```typescript
await commet.usage.create({
  eventType: 'api_call',
  quantity: 1
})
```

**Parameters:**
- `eventType`: Event identifier string
- `quantity`: Usage amount (integer)

**Security:** Store your API key in environment variables for production use.
```

❌ **Avoid (Negative/Verbose)**
```markdown
# How to Track Usage Events (Don't make this mistake!)

In this section, we'll walk you through the process of tracking usage events. Don't worry, it's not complicated, but you shouldn't expose your API keys or you'll have security issues.

```typescript
// Don't forget to handle errors - the SDK won't work if you don't
await commet.usage.create({
  eventType: 'api_call', // Don't use invalid event types
  quantity: 1 // Don't pass negative numbers here
})
```

**Warning: Don't do these things:**
- Don't expose your API key in client code
- Don't forget to handle errors
- Don't pass invalid parameters
```

### Language Guidelines

**Use:**
- "Configure" instead of "set up"
- "Initialize" instead of "create" (for clients)
- "Send" instead of "submit" (for data)
- "Handle" instead of "manage" (for errors)
- "Track" instead of "record" (for events)

**Advanced Principles:**
- **Inverted Pyramid**: Most important info first (like journalism)
- **Parallel Structure**: Consistent formatting in lists and steps
- **Chunking**: Group related information together
- **White Space**: Use spacing to reduce visual clutter
- **Frontloading**: Put keywords at start of sentences/headings

**Technical Terms:**
- Always use `camelCase` for parameters
- Always use `kebab-case` for file names
- Use "method" not "function" for SDK methods
- Use "endpoint" not "route" for API references

## Content Structure

### Page Anatomy
Every documentation page should follow this structure:

1. **Frontmatter** (title, description)
2. **Brief intro** (1-2 sentences max)
3. **Prerequisites** (if any, as Callout)
4. **Main content** (Steps, code examples, explanations)
5. **What's next** (related topics, 2-3 links max)

### Code Examples Standards

**Always include:**
- Complete, runnable examples
- Error handling where relevant
- TypeScript types
- Comments only when necessary for clarity

**Example format:**
```typescript
// Brief context comment if needed
const result = await commet.usage.create({
  eventType: 'api_call',
  customerId: 'cus_1234567890',
  quantity: 1,
})

// Handle the response
if (result.success) {
  console.log('Event tracked:', result.data.id)
}
```

### Callout Usage

- **Info**: Prerequisites, important context
- **Warning**: Security concerns, breaking changes
- **Tip**: Pro tips, performance notes
- **Error**: Common mistakes, troubleshooting

## Content Organization

### Section Definitions

#### `/quickstart`
**Purpose**: Get developers productive in <5 minutes
**Content**: Install → Initialize → First success
**Tone**: Fastest path to success
**Length**: 4-6 steps maximum

#### `/installation`
**Purpose**: Framework-specific setup guides
**Content**: Detailed setup for Next.js, Node.js, etc.
**Tone**: Step-by-step, thorough but concise
**Length**: 8-12 steps per framework

#### `/core-concepts`
**Purpose**: Fundamental SDK concepts developers must understand
**Content**: Authentication, error handling, idempotency, dev mode
**Tone**: Educational but practical
**Length**: Concept explanation + practical examples

#### `/features`
**Purpose**: Deep dives into main SDK capabilities
**Content**: Usage events, seat management, customers, webhooks
**Tone**: Comprehensive but scannable
**Length**: Complete feature coverage with multiple examples

#### `/reference`
**Purpose**: Complete method and type documentation
**Content**: All methods, parameters, return types, examples
**Tone**: Precise, comprehensive, searchable
**Length**: Complete coverage, organized by resource

### Content Hierarchy Rules

**Information Flow:**
1. What (brief explanation)
2. Why (when to use it)
3. How (code example)
4. What's next (related concepts)

**Code-to-Text Ratio:**
- Quickstart: 70% code, 30% text
- Installation: 60% code, 40% text  
- Core Concepts: 50% code, 50% text
- Features: 60% code, 40% text
- Reference: 80% code, 20% text

## Quality Standards

### Before Publishing Checklist

**Content:**
- [ ] All code examples are tested and work
- [ ] No more than 2 concepts per page
- [ ] Each page has clear "What's next" section
- [ ] Screenshots are crisp and up-to-date (if any)
- [ ] F-pattern readability (scannable headings and bullets)

**Writing:**
- [ ] No passive voice in instructions
- [ ] No sentences over 25 words
- [ ] Technical terms are consistent
- [ ] Tone matches guidelines
- [ ] Keywords frontloaded in headings
- [ ] Parallel structure in all lists

**UX Principles:**
- [ ] Progressive disclosure applied (basic → advanced)
- [ ] Cognitive load minimized (one concept per section)
- [ ] White space used effectively
- [ ] Information hierarchy is clear

**Structure:**
- [ ] Proper frontmatter (title, description)
- [ ] Logical information hierarchy
- [ ] Appropriate callouts used
- [ ] Related links are working

### Inspiration Sources

**Copy patterns from:**
- **Stripe**: Technical precision, comprehensive examples
- **Vercel**: Clean structure, developer-focused
- **Resend**: Perfect quickstarts, clear steps
- **Better Auth**: Direct tone, no-nonsense approach

**Avoid patterns from:**
- Overly academic documentation
- Marketing-heavy copy
- Verbose explanations
- Incomplete code examples

## Maintenance

### Regular Reviews
- Monthly: Check all code examples still work
- Quarterly: Review tone consistency
- Per release: Update affected documentation immediately

### Translation Notes
- Keep technical terms in English (eventType, customerId, etc.)
- Preserve code examples exactly
- Maintain the same structure and callout types
- Ensure translated tone matches English directness

---

This document should be referenced before writing any new documentation. When in doubt, prioritize clarity and developer productivity over completeness.
