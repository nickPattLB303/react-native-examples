---
name: "Communication Channels Integration"
version: "1.1"
description: "Guidelines for integrating Webex chat channel with course materials and facilitating collaborative learning"
priority: "medium"
type: "Core"
globs: 
  - "docs/**/*.md"
  - "docs/slides/**/*.html"
triggers:
  - file_change
  - file_open
alwaysApply: false
---

# Communication Channels Integration

[README.md](mdc:README.md)
[README.md](mdc:docs/README.md)
[Cursor Rules README](mdc:.cursor/README.md)

This rule provides guidelines for integrating the Webex chat channel with the React Native Training Course materials, ensuring seamless communication and collaboration between the repository content, Articulate e-learning modules, and live discussions.

## Single Channel Management

Initially, the course will utilize a single Webex channel for all communications. This approach requires careful organization to maintain clarity and accessibility:

1. **Message Threading**: Utilize Webex's threading feature extensively:
   - Create parent threads for each module/topic
   - Use emoji reactions to categorize questions (🐞 for bugs, 🤔 for conceptual questions)
   - Pin critical threads for easy reference

2. **Topic Tagging System**: Implement a consistent tagging system in message prefixes:
   ```
   [M1] React Native Fundamentals question
   [M2] Component Props issue
   [SETUP] Environment configuration
   [CHALLENGE] Module 1 challenge clarification
   ```

3. **Time-Based Organization**: Structure the channel with time-based markers:
   - Morning check-ins with daily goals
   - End-of-day summaries and next-day preparation
   - Scheduled "office hours" for focused Q&A

4. **Search-Optimized Messages**: Format important announcements and resources for easy searching:
   ```
   RESOURCE: React Native Navigation Documentation
   ANNOUNCEMENT: Module 2 Challenge Due Date
   FAQ: Common Props Errors
   ```

5. **Visual Organization**: Use consistent formatting to create visual hierarchy:
   - Bold text for announcements
   - Code blocks for all code snippets
   - Bulleted lists for multi-step instructions
   - Horizontal lines to separate major discussion topics

## Transitioning to Multiple Channels

As the course progresses, prepare for a smooth transition to multiple channels:

1. **Channel Growth Plan**: Document a clear progression for channel expansion:
   ```
   Phase 1: Single channel with tagging (Weeks 1-2)
   Phase 2: Add #resources channel (Week 3)
   Phase 3: Add module-specific channels (Week 4+)
   ```

2. **Migration Strategy**: Prepare participants for channel expansion:
   - Announce changes 3-5 days in advance
   - Provide clear instructions for new channel purposes
   - Pin migration announcements in the original channel
   - Cross-post important content during transition period

3. **Channel Purpose Documentation**: Create a channel guide document that evolves with the channel structure:
   - Update with each new channel addition
   - Include search tips for finding historical content
   - Provide examples of appropriate content for each channel

4. **Content Preservation**: Ensure valuable discussions aren't lost during transitions:
   - Create summary documents of key discussions before channel expansion
   - Use Webex's export features to archive important threads
   - Establish a process for migrating pinned content to new channels

## Webex Channel Integration

### Question Handling

Design course materials with the Webex channel in mind:

1. **Anticipated Questions**: At the end of each major section, include an "FAQ Preview" that lists common questions participants might have, providing instructors with prepared answers.

2. **Question Routing**: Include clear indicators for when questions should be:
   - Answered immediately during sessions
   - Posted to the Webex channel for deeper discussion
   - Researched and answered in a follow-up session

3. **Code Question Protocol**: Establish a format for code-related questions in Webex:
   ```
   [Module 2.3] Component Props Question
   
   My code:
   ```jsx
   const MedicationItem = ({ medication }) => {
     // Code with issue
   }
   ```
   
   Expected behavior: Medication name should display in bold
   Actual behavior: Getting undefined error
   ```

4. **Knowledge Base Building**: Structure the Webex channel to accumulate a searchable knowledge base:
   - Use threaded replies for each question
   - Add tags/hashtags for categorization (#components, #state, #navigation)
   - Pin exemplary solutions

### Collaborative Exercises

Design exercises with collaboration in mind:

1. **Pair Programming**: Include specific pair programming exercises with role assignments:
   - Navigator: Reads instructions and guides implementation
   - Driver: Writes the code
   - Both roles should switch halfway through

2. **Code Reviews**: After individual exercises, build in peer code review cycles:
   - Post screenshots/snippets to designated Webex threads
   - Provide a code review checklist specific to each exercise
   - Require at least two constructive comments per review

3. **Group Challenges**: Design pharmacy-themed challenges that require 3-4 person teams:
   - Assign specific roles (UI, data management, navigation)
   - Include Webex coordination checkpoints
   - Provide collaborative workspace links (e.g., Expo Snack team mode)

4. **Asynchronous Collaboration**: Not all collaboration will happen in real-time:
   - Create "overnight challenges" posted in Webex
   - Encourage morning solution sharing
   - Structure incremental project work with check-ins

## Repository-Webex Connections

Connect the repository content directly to Webex communications:

1. **Module-Specific Channels**: Create a channel organization recommendation:
   ```
   #general - Course-wide announcements
   #module1 - React Native Fundamentals questions
   #module2 - Components and Props discussions
   #challenges - All coding challenges
   #resources - Useful links and tools
   ```

2. **GitHub Integration**: Suggest webhook setup between GitHub and Webex:
   - New example code pushes trigger notifications
   - Issue tracking for identified errors in materials
   - Automatic daily summaries of repository updates

3. **Resource Linking**: Include standardized links to specific Webex resources:
   - Deep links to channel threads for extended examples
   - Links to facilitator profiles for direct questions
   - Code sample threads for reference

## Documentation for Instructors

Include instructor-specific notes regarding Webex usage:

1. **Channel Moderation**: Guidelines for keeping discussions focused:
   - Sample response templates for common questions
   - Escalation paths for complex issues
   - Scheduled topic focus times

2. **Daily Digests**: Template for daily summaries:
   ```
   Today's Key Learnings:
   - Components: [Concept], [Common Issue]
   - Hooks: [Concept], [Common Issue]
   
   Tomorrow's Focus:
   - Navigation fundamentals
   - Preparation: Review X and Y examples
   
   Outstanding Questions:
   - [Question 1] - Will address tomorrow
   - [Question 2] - Resources posted in #resources
   ```

3. **Progress Tracking**: Use Webex for tracking participant progress:
   - Daily check-in prompts
   - Challenge completion tracking
   - Knowledge gap identification

## Articulate-Webex Connections

When creating Articulate content, consider these Webex integration points:

1. **Discussion Prompts**: Include specific slides with discussion prompts for Webex:
   ```
   [Discussion] Share in Webex #module2:
   - One challenge you faced with component props
   - One technique you found helpful
   - One question you still have
   ```

2. **Extended Examples**: For complex topics:
   - Place core concepts in Articulate
   - Indicate "Extended examples available in Webex #examples channel"
   - Provide slide-specific hashtags for finding relevant discussions

3. **Follow-up Activities**: Design activities that bridge Articulate content and Webex:
   - "After completing this module, post your component solution to #module2"
   - "Find a peer in Webex for code review using the review checklist"

## Sample Webex Interaction Patterns

### Daily Structure
```
[09:00] Instructor posts daily agenda
[16:30] Next day preparation resources posted
```

### Question Handling Flow
```
1. Participant posts question to appropriate channel
2. If simple clarification:
   - Direct answer provided
3. If conceptual issue:
   - Instructor points to relevant documentation section
   - Schedules for group discussion if common
4. If code-specific:
   - Request formatted code sample
   - Suggest debugging steps
   - Offer 1:1 help if needed
5. Follow-up check to ensure resolution
```

## Cross-Platform Knowledge Management

Ensure knowledge transfers effectively between platforms:

1. **FAQ Collection**: Compile common Webex questions into:
   - Repository documentation updates
   - Future Articulate content improvements
   - Reference cheat sheets

2. **Exemplary Solutions**: Process for elevating excellent work:
   - Participant permission workflow
   - Code cleanup and standardization
   - Integration into repository examples
   - Attribution tracking

3. **Feedback Loop**: Structured process for using Webex feedback:
   - Weekly content improvement task based on discussions
   - Categorizing identified documentation gaps
   - Prioritization of clarification topics

## Webex Quality Assurance Integration

Incorporate Webex channel feedback into the quality assurance process:

1. **Real-time Feedback Collection**: During course delivery:
   - Create a dedicated feedback thread for each module
   - Use emoji reactions to gauge understanding (👍, 👎, 🤔)
   - Track recurring questions as indicators of content gaps

2. **Post-Module Review**: After each module:
   - Analyze Webex discussions for common pain points
   - Identify concepts that generated the most questions
   - Document successful explanations and approaches

3. **Content Improvement Workflow**:
   ```
   1. Collect Webex feedback during module delivery
   2. Categorize issues (content gaps, unclear explanations, technical issues)
   3. Prioritize improvements based on impact
   4. Update course materials
   5. Document changes in release notes
   6. Test improvements in next course iteration
   ```

4. **QA Checklist Addition**: Add to the quality assurance checklist:
   - [ ] Webex discussion points integrated into FAQ sections
   - [ ] Common misconceptions addressed in updated content
   - [ ] Successful explanations from Webex incorporated into materials
   - [ ] Technical issues identified in Webex resolved

By aligning the course materials with these Webex integration patterns, participants will experience a seamless learning journey across the repository content, Articulate modules, and collaborative discussions. The single channel approach provides a foundation that can grow with the course, ensuring communication remains effective throughout the training experience. 