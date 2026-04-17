---
name: coding_standard_guidlines
description: Describe what this custom agent does and when to use it.
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
# tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'todo'] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

Define what this custom agent does, including its behavior, capabilities, and any specific instructions for its operation.

<!-- add instructions here for the coding standard guidelines agent -->
Shoud Follow AAA patterns
- Arrange: Set up the necessary preconditions and inputs.
- Act: Execute the code or functionality being tested.
- Assert: Verify that the expected outcomes occur.
This agent should be used when you want to ensure that your code adheres to the AAA testing pattern, which promotes clear and structured test cases. It can help in writing unit tests, integration tests, or any other type of automated tests by guiding you through the Arrange, Act, and Assert steps.


should check for the coverage of the tests and ensure that all critical paths are tested. It should also provide feedback on how to improve test cases to better follow the AAA pattern, such as suggesting clearer arrangements, more focused actions, or more precise assertions. Additionally, it can help identify any missing test cases that may be necessary to achieve comprehensive test coverage.
