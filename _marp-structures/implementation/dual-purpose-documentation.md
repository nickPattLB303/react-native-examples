# Requirements for dual-purpose documentation/slides

- Use strict, specific, and clearly defined terminology consistently.
- content should go above and beyond best practices for BOTH markdown documentation and slide presentations
    - Prioritize comprehensive explanations and completeness over conciseness. It’s ok to have slides with more detailed descriptions just make sure they are properly formatted and broken apart
    - Use proper markdown heading structure organization and stylizing
- Always use the latest official documentation as a source
    - Structure materials in a similar fashion as the official documentation
    - Content should essentially be a clone of official documentation that has been expertly adjusted to fit the exact needs of the course
    - Use links to official docs for topics that are not exhaustedly covered in the course
- Slides must have a specific limit to the number of lines and words to ensure content fits on the slides
- Slides with educational information (ie. Anything outside of title slides, overviews, summaries, etc.) must have presenter notes
    - Presenter notes must be such that a novice can easily understand and explain in detail all concepts conveyed in the slides
    - Presenter notes will be visible to all learners, so they should be worded and formatted in a similar manner as the rest of the content. NEVER include presenter specific language or notes ALWAYS write them as general purpose.
    - Although presenter notes are visible to all learners, they are not as easily accessible as other content. For this reason, avoid introducing information or concepts in them that are not included in the more easily accessible elements of the course. They should simply be more verbose explanations of content in a slide
- Slides can have small to medium code examples by using the standard markdown syntax (triple backtick and language identifier)
    - Slides with small to medium code examples should be limited to 25 lines of code or less. Larger code examples are still an option but should be done as an embedded codesandbox or expo snack
    - Make sure to use the proper language identifier in markdown following the triple backtick in markdown. Most examples should be jsx or tsx
    - Slides with code examples larger than 5 lines should have at least 200 words of presenter notes. They should follow the same rules as the presenter notes above. The presenter notes should do nothing more than explain each line of code in detail and summarize the logic functionality and concepts displayed
    - Slides with code examples should never be accompanied by any more than a title and a single sentence. They should only be included as part of a pattern that includes a slide before or after that explains the concepts conveyed in the example. A single code example slide is not sufficient for explaining a concept
- Slides with large code examples of more than 25 lines of code should use an embedded code sandbox or expo snack
    - CodeSandbox should be used for all large html, css, javascript and react code examples over 25 lines.
    - Expo Snack should be used for all React Native code examples over 25 lines.
    - Slides with code examples larger than 5 lines should have at least 200 words of presenter notes. They should follow the same rules as the presenter notes above. The presenter notes should do nothing more than explain each line of code in detail and summarize the logic functionality and concepts displayed
    - Slides with code examples should never be accompanied by any more than a title and a single sentence. They should only be included as part of a pattern that includes a slide before or after that explains the concepts conveyed in the example. A single code example slide is not sufficient for explaining a concept
    - All large code examples must have code comments and js doc documentation that goes above and beyond best practices.
- All diagrams should be created with mermaid
    - Slides with diagrams should never be accompanied by any more than a title and a single sentence. They should only be included as part of a pattern that includes a slide before or after that explains the concepts conveyed in the diagram. A single diagram slide is not sufficient for explaining a concept
- Slides with tables should never be accompanied by any more than a title and a single sentence. They should only be included as part of a pattern that includes a slide before or after that explains the concepts conveyed in the table. A single table slide is not sufficient for explaining a concept
- Callout boxes should fully explain concepts in detail. Something like “This is similar to x in swift” is not sufficient. If a callout box explains a topic it must be fully explained. Something like “StyleSheet is similar to css but has many key differences due to the fact that react native is based on native ui elements. Because of this… [full detailed explanation] …” is more appropriate. It is however acceptable to have short concise callouts as long as they include links to trustworthy sources that fully explain the concepts.
- For any and all course elements, any concept discussed must be either exhaustedly covered or provide a link to a trusted source with exhausted coverage. For example “React Native’s key core components are View, Text, and Button” is not sufficient. The content must include all core components in full detail or provide a link to the specific react native docs. “For now we are focusing on the core components View, Text, and Button. See (url) for the full list and details” is better. The links should be directly related to the content. In some cases it may be best to include multiple very specific links.
- The course content should look exactly the same for all learning paths, but it should be created in such a way that it is friendly to all learning paths. So it should be effective as both a linear learner and an async learner. Callouts can be used throughout the course to add key context for different learners.
 ## Detailed explanation of presenter notes
Always ensure the language for the presenter notes is general purpose and NOT directed specifically to the presenter. 

Something like ...
❌
```<!-- Presenter Notes:
Explicitly state that this module focuses purely on JavaScript fundamentals as required before diving into TypeScript or React Native specifics.
Manage expectations: TypeScript's benefits (type safety) and React Native's accessibility requirements will be covered thoroughly later.
This ensures learners aren't confused by the absence of types or accessibility props in these initial examples.
-->``` 

... is no good, but 

✅
``` <!-- 

In this code example:
1.  We declare medication details (`medicationName`, `dosageForm`, `prescriptionId`) using `const` because these identifiers are unlikely to change for a specific prescription record.
2.  We declare `stockLevel` using `let` because the inventory count is expected to change frequently (e.g., receiving shipments, dispensing medication).
3.  We log the initial stock, then update the `stockLevel` variable by reassigning it (`stockLevel = stockLevel + 100`), demonstrating `let`'s mutability.
4.  A commented-out line shows that attempting to reassign `prescriptionId` (a `const`) would result in a `TypeError`. This enforces the immutability of the constant's binding.
5.  Crucially, the example shows that if a `const` variable holds an object (like `patientInfo`), the *properties* of that object (`patientInfo.name`) *can* be modified. The `const` keyword only prevents the variable `patientInfo` from being reassigned to point to a completely *different* object. The final commented-out line illustrates this forbidden reassignment.

-->```

Is perfectly fine and in fact critical to the course. They should be written for all audiences, NOT just the presenter.