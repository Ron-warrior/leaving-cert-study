# Chapter 8 — Software Development

## Definitions

| Term | Meaning |
|---|---|
| Software development process | The structured set of stages used to build software. |
| Agile | A flexible approach based on short iterations, working software and close cooperation with the client. |
| Waterfall | A formal, sequential approach where one stage finishes before the next begins. |
| Iteration | Repeating a stage or cycle to improve the product. |
| Client | The person or organisation commissioning the software. |
| User (end user) | The person who will actually use the software. |
| Scope | What the system will and will not do. |
| Requirements | The functions and constraints the software must satisfy. |
| Design | The plan for how the system will be built: interfaces, data and structure. |
| Test case | An input with an expected result, used to verify behaviour. |
| Documentation | Written material for users and for developers. |

## Two approaches

**Waterfall** proceeds in order: requirements, design, implementation, testing, deployment. Each stage is documented and signed off before the next begins. It suits large projects with stable requirements, because problems are found early and progress is easy to track. Its weakness is inflexibility: a late change is expensive, and the client may not see working software until the end.

**Agile** works in short iterations, producing working software early and refining it. Developers, clients and users communicate frequently, and the team reflects on and adjusts its process. It handles changing requirements well, but is less predictable for budgeting and can drift without discipline.

In practice, most projects combine the two: an overall plan with iterative delivery inside it.

## The stages used in this book

The book's model has five named stages with an **iterate** loop around them:

1. **Investigate.** Understand and define the problem. Identify the client, the users and their needs, the environment, and the scope. Gather information by observing the current system, interviewing users and collecting samples and documents.
2. **Plan.** Decide what will be built, in what order, with what resources and timescale. Requirements and success criteria are agreed.
3. **Design.** Specify how it will work: screen layouts, data storage, inputs and outputs, validation and the structure of the code.
4. **Create.** Implement the design, writing and testing code in small pieces.
5. **Evaluate.** Compare the finished system with the requirements and success criteria, get user feedback, and decide what to improve.

The **iterate** arrow matters: evaluation can send the team back to an earlier stage. Each stage may have a different name in another model — "Analyse" instead of "Investigate", for example.

## Testing

Testing runs the software against known inputs and compares the actual result with the expected result. Test cases should include normal values, boundary values and invalid values designed to break the program.

- **Unit testing** checks one component in isolation.
- **Integration testing** checks that components work together.
- **System testing** checks the whole system against requirements.
- **Acceptance testing** is carried out by or with the client to confirm it meets their needs.

Finding a fault early is much cheaper than finding it after deployment.

## Documentation

User documentation explains how to install and use the software. Technical documentation records the design, data structures and code for future developers. Both are part of a completed product, not an optional extra.

## Writing strong exam answers

- Compare agile and waterfall on flexibility, documentation and client involvement.
- Name a stage and describe what happens in it, using the scenario's details.
- Explain why evaluation may lead to another iteration.
- Give a test case with input, expected output and reason for choosing it.

## Example

A school asks for a system to book computer rooms. **Investigate:** the client is the principal, the users are teachers; the scope is booking a room for a period. **Plan:** build a room list and a booking form first. **Design:** decide the data (room, teacher, date, period) and validation (no double booking). **Create:** build and unit-test the booking function. **Evaluate:** teachers try it; they report that recurring weekly bookings are missing, so the team iterates back to design. That loop is the process working as intended, not a failure.

## Information systems and requirements

An **information system** takes data, processes it and produces useful information; it supports the day-to-day operation and decision-making of an organisation. Its components are **hardware, software, data, people and processes**.

Requirements are agreed before design:

- **Functional requirements** say what the system must *do*: allow an application, send a confirmation, store details, select winners, validate input.
- **Non-functional requirements** say *how well* it must do it: usability, response time, security, reliability, scalability, accessibility, legal compliance.

A requirement should be testable. "The system should be fast" is not testable; "the system should respond within two seconds for 500 users" is.

## Roles in a development team

| Role | Responsibility |
|---|---|
| System architect | Defines the overall structure, components, protocols and technology stack. |
| Business/systems analyst | Works with stakeholders to gather and document requirements, and communicates them to the team. |
| Designer | Produces designs: wireframes, flowcharts, pseudocode, database design, prototypes. |
| Software developer | Writes the code, implements designs, debugs and unit-tests. |
| Software tester | Plans and runs unit, system, functional and non-functional tests; records results. |
| UI/UX designer | Designs a usable, accessible interface and the user's journey through it. |
| IT support technician | Provides ongoing technical support and resolves issues for users. |

## Modular design

**Modular design** divides a large program into smaller, independent modules, each responsible for one task — orders, payments, accounts, reporting. Modules can be developed, tested and maintained separately, reused, and replaced without rewriting the whole system. The alternative, a single monolithic block of code, is harder to test, understand and change.

## Testing, precisely

- **Unit testing** checks one component in isolation; usually written by the developer.
- **Integration testing** checks that components work together.
- **System testing** checks the whole system end to end against requirements.
- **Acceptance testing** confirms with the client that it meets their needs.
- **Regression testing** confirms that a change has not broken existing features.
- **Functional testing** checks *what* the system does against requirements.
- **Non-functional testing** checks *how well* — performance, stress, usability, security, compatibility.

## Why a process matters

A structured process reduces complexity, improves quality and the chance of meeting requirements, limits budget and schedule overruns, makes better use of staff and encourages communication between stakeholders. The scheme awards a mark per distinct, explained benefit.

## How it's examined (2023–2026)

- **2023 Section A Q12 (6 marks):** two reasons an SDLC is important, and the distinction between functional and non-functional testing (4 marks).
- **2025 Section B Q13(a) (12 marks):** name roles and their responsibilities (6), name two methodologies (2), and justify waterfall or agile (4).
- **2026 Section A Q9 (6 marks):** explain modular design (3) and name three modules for a restaurant system (3).
- **2026 Section B Q13(a)(iii) (8 marks):** write functional and non-functional requirements for a lottery system — 3 marks for the best of each, 1 for the second.
- **2026 Section B Q15(c)(ii) (6 marks):** name testing stages for a greenhouse system — 4 marks for the best, 2 for the second.
- **2024 Section A Q6 (6 marks):** give a unit-test example and a system-test example for a social-media app — 3 marks each.

**Answer shape:** name the role/stage, say what it involves, and tie it to the scenario. "Unit testing checks the temperature-sensor code on its own" beats a generic definition.
