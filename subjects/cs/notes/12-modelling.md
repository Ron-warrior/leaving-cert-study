# Chapter 12 — Modelling and Simulation

## Definitions

| Term | Meaning |
|---|---|
| Model | A simplified representation of a real system using selected variables, relationships and rules. |
| Simulation | Running a model under chosen conditions to examine possible behaviour or outcomes. |
| Input variable | A value supplied to the model that may affect its result, such as crowd size. |
| Output variable | A result produced by the model, such as total evacuation time. |
| Scenario | A particular set of input values and conditions being tested. |
| Assumption | Something treated as true to make the model manageable; it may differ from reality. |
| Abstraction | Keeping details relevant to the question and leaving out less relevant details. |
| Agent | An individual entity in a simulation with its own state and rules for behaviour. |
| Emergent behaviour | An overall pattern arising from agents interacting, without a rule directly specifying that pattern. |

## Building and testing a model

1. **Start with a question.** For example: how might gate capacity affect the time to evacuate a concert venue?
2. **Choose inputs and outputs.** Inputs could include crowd size, number of exits and gate capacity. Outputs could include clearance time and maximum queue length.
3. **Set rules and assumptions.** A simple model might assume everyone walks at the same speed. State assumptions because they affect the result.
4. **Compare scenarios fairly.** Change one input, such as gate capacity, while keeping every other condition the same.
5. **Repeat runs if chance is involved.** Random variation means one run is not enough to judge a scenario.
6. **Modify and compare.** Change a rule or input, run again, and compare the output with the original using the same measure of success.
7. **Interpret results.** Describe a pattern using figures where provided. A prediction depends on the model's data, rules and assumptions.

## Simple calculations and interacting agents

A calculation can give a quick estimate of exit time from crowd size and gate capacity, but it assumes a steady flow. In an **agent-based simulation**, each person follows decision rules, moves and responds to nearby people. Their interactions can create queues and bottlenecks that an average cannot show.

In an epidemic model, each person can be an agent with a state such as susceptible, infectious or recovered. Rules control movement, contacts and possible transmission. Infection clusters can **emerge** from many local contacts, even though no rule directly tells the model to form a cluster.

**Benefit:** it can reveal effects of individual interactions, such as bottlenecks or infection clusters, that a simple average may hide. **Limitation:** its results depend on how well agent behaviour and starting conditions reflect reality.

## Evaluating results

- **Data quality.** When a model uses real data, check that there are enough observations and that they represent the situation being modelled. Missing or biased data can distort outputs.
- **Validation.** Compare model outputs with observed outcomes or with data not used to build the model. Revise it if it performs poorly.
- **Sensitivity.** Check whether a small change in an input or assumption causes a large change in the output.
- **Specific limitation.** A model that assumes identical walking speeds may underestimate evacuation time for a crowd with different mobility needs.
- **Caution.** A simulation explores possible outcomes; it does not prove what will happen. A pattern alone does not prove a cause.

## Examples from the book

- **Thermostat model.** Inputs are the target temperature and the current temperature; the rule switches the heating on below the target and off above it. Test cases compare expected and actual behaviour, including the boundary where the temperatures are equal.
- **Compound interest model.** A function takes the principal, interest rate and number of years, applies `P * (1 + interest) ** years`, and returns the amount. Evaluating it means checking units and output format, then comparing with a hand calculation.
- **Loan approval.** A bank's software uses a monthly repayment model; if the repayment is less than 30% of net salary, the loan is approved. Scenarios with different salaries and rates are run and the decisions compared.

## Writing strong exam answers

- Name the input and output variables.
- Describe a trend using a figure or comparison from the question.
- Explain how an assumption or omitted factor (abstraction) might affect the result.
- For an agent-based question, identify the agents, their states or rules, their interactions and the overall pattern that emerges.

## Example

For 12,000 people and gates handling 100 people per minute each, the simple model predicts 60 minutes with two gates and 40 minutes with three. That is a 20-minute reduction under the steady-flow assumption. The model does not prove the real evacuation will take 40 minutes: if one gate is blocked, or people move at different speeds, the actual time will differ. The value of the model is the comparison between scenarios, not the exact number.

## Why models are useful — and where they fail

**Benefits:** models make complex systems easier to understand; they reveal patterns and relationships; they allow predictions within a stated scope; and they let decision-makers test scenarios cheaply and safely — a traffic simulation can compare signal timings without closing a city.

**Limitations:** every model is an abstraction, so it omits detail; its assumptions may not hold in reality; its data may be biased, incomplete or out of date; it can be expensive to build; and it raises ethical questions about privacy and accountability.

**Abstraction** is what makes a model usable: keeping the variables that affect the question and discarding the rest. A map that kept every building would be useless for routing; a model that kept every personal detail of a crowd would be both unusable and unethical. The limitation is that anything discarded cannot influence the result — so the choice of what to omit must be justified.

## Applications

- **Education** — simulate teaching methods or classroom interaction to see which improves engagement.
- **Mental wellbeing** — model stress, social contact and lifestyle to predict outcomes and target support.
- **Environment** — model climate, ecosystems or emissions to compare policy options.
- **Traffic** — simulate vehicle flow to find congestion points and test signal timings.
- **Epidemiology** — model infection spread between agents to test distancing, masks or vaccination.

In an epidemic agent-based model, each student or teacher is an agent with attributes (vaccinated or not, infected or not) and rules for contact. **Emergent behaviour** appears as clusters of infection in corridors or at sports, or as a slowdown once enough people recover. Success is measured by comparing infection rates before and after an intervention, and by how long the outbreak takes to decline.

## How it's examined (2023–2026)

- **2025 Section B Q15 (38 marks):** identify input/output variables, describe patterns, suggest missing variables; give model limitations and benefits (4 + 4), explain why abstraction matters (4), describe modelling applications (8), and build an agent-based epidemic model with emergent behaviour and success measures (3 + 2 + 6).
- **2023 Section B Q13(a) (19 marks):** models for a rural digital hub — support/against arguments, data items that would inform the model, and accessibility technology.
- **2023 Section B Q13(b) (7 marks):** abstract a map to a graph, state what is ignored, and explain a heuristic.
- **2026 Section B Q14(b) (12 marks):** abstraction of a city map to a graph and the limitations of that abstraction.

**Answer shape:** name the input, the output and one assumption; then say what the assumption would change if it were wrong. For an agent-based question, name the agents, their states, their interaction rule and the emergent pattern.
