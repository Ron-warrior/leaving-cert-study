# Chapter 14 — Ethics and Computing

## Definitions

| Term | Meaning |
|---|---|
| Ethics | Principles for deciding what is right and wrong in a situation. |
| Data protection | Rules and practices for handling personal data lawfully and fairly. |
| GDPR | General Data Protection Regulation: EU law governing the processing of personal data. |
| Consent | Permission from a person for their data to be used, given with understanding. |
| Transparency | Being open about how a system works, what data it uses and how decisions are made. |
| Bias | A systematic unfairness that produces worse outcomes for some groups. |
| Algorithmic decision-making | Using a computer system to make or recommend decisions about people. |
| Fairness | Treating people justly, without irrelevant characteristics affecting outcomes. |
| Socio-technical system | A system combining technology, people, organisations and rules; all of them shape the outcome. |

## Privacy and data protection

Much of computing is data-driven, and much of that data is personal: where we go, what we buy, what we search for. It fuels personalised advertising and is valuable to companies. Data processing is therefore regulated.

In the EU, **GDPR** sets rules: personal data must be processed lawfully and fairly, collected for specified purposes, kept accurate and no longer than necessary, and protected. People have rights to access their data and to have it corrected or erased. In the US, protection is more fragmented, and in a global network data can cross jurisdictions, so protections are uneven.

Consent is central but easily weakened by long terms and conditions that few read. A person can only consent meaningfully if they understand what they are agreeing to.

## Transparency in AI

AI is used to decide who gets a loan, which patients are prioritised and what content people see. Each use raises ethical questions: is the decision explainable, is it accurate, and does the person affected know a model was involved?

Health data is especially sensitive. Few machine-learning models are approved for clinical use, partly because approval requires evidence that the model works across different populations. Training data may over-represent some conditions and under-represent others, so a model can be less accurate for groups that were rarely included. Approving a model is not only a technical question; it is a question of how it will be used and how transparent that process is.

## Bias in image and facial recognition

Machine learning learns from labelled examples. **ImageNet**, a large database of labelled images, was used to train many systems. The labels themselves carry assumptions: describing a person means classifying by characteristics, and different people describe the same image differently.

Facial recognition systems trained on unrepresentative data perform worse for some groups. Joy Buolamwini's research at the MIT Media Lab measured much higher error rates for darker-skinned faces and for women, because the training sets contained fewer of those faces. The consequence is not neutral: these systems are used by governments and companies for identification and surveillance, so errors fall unevenly on already vulnerable people.

In 2020, several major technology companies paused or restricted sales of facial recognition to police, citing concerns about bias and misuse.

## Fairness and justice

Car insurance quotes were once calculated from factors such as the car, address and accident history. Machine learning can add many more variables, and some may act as **proxies** for characteristics that would be unfair to use directly, such as income or ethnicity.

**COMPAS**, a risk-assessment tool used by courts in some US states, produced risk scores for defendants. An investigation found that the system appeared to make different kinds of error for different racial groups: it over-predicted reoffending for Black defendants and under-predicted it for white defendants. The data used to calculate risk reflected existing policing patterns, so the model reproduced them.

This is why algorithmic decisions need scrutiny. Accuracy overall is not enough if the errors are distributed unfairly; the system must be evaluated by group, and the humans using it must understand its limits.

## Socio-technical systems

A socio-technical system includes the technology, the people who use it, the organisation that deploys it and the rules that govern it. Changing the algorithm alone does not fix an unfair process; training, oversight, appeal routes and regulation matter as much as the code. Ethics is therefore about design choices and accountability, not only about intentions.

## Writing strong exam answers

- Name a specific system and describe the ethical issue with an example.
- Explain why bias arises from training data, not only from malicious intent.
- State what GDPR requires of an organisation processing personal data.
- Argue both sides of a case, then state a justified conclusion.

## Example

A court uses a risk-score tool to help decide bail. The model was trained on arrest data, and policing in some areas is denser, so the data reflects existing patterns. The score is accurate on average but over-predicts risk for one group. The ethical problem is not that a computer made a decision, but that a human may treat the score as objective. A fair process would disclose the tool's use, test its errors by group, allow the defendant to challenge it, and treat the score as one input among several.

## Arguing an ethical question

The schemes award 3 marks per developed argument, usually capped at two per side, then expect a judgement. A developed argument has three parts:

1. **The point** — what is at stake.
2. **The consequence** — who is affected and how.
3. **The safeguard or trade-off** — what would reduce the harm, or why the benefit is worth it.

"Weak" answers name an issue ("privacy") without saying who is harmed or how. "Strong" answers say: location data identifies individuals, it can be retained indefinitely, and retention should be limited by GDPR and access rules.

## Recurring debates

**Facial recognition in public spaces.** For: faster identification, crime detection, existing CCTV infrastructure, codes of practice can constrain misuse. Against: mass surveillance, mistaken identity, bias against under-represented groups, unclear ownership and retention of data.

**Pausing advanced AI.** For: time to align systems with human values, protect jobs, assess security risks and unintended consequences. Against: slows beneficial innovation in health and climate, creates competitive disadvantage, and may not prevent others from proceeding.

**Targeted political advertising.** For: relevant content, informed voters, engagement, efficient campaigning. Against: echo chambers, spread of misinformation, manipulation, privacy loss.

**Algorithmic risk scores (COMPAS).** A model trained on arrest data reproduces policing patterns; it over-predicts reoffending for one group and under-predicts for another. Accuracy overall is not fairness: the errors must be examined by group, the tool's use must be disclosed, and a human must retain responsibility.

## Data protection

**GDPR** requires that personal data be processed lawfully and fairly, collected for specified purposes, adequate and relevant, accurate, kept no longer than necessary, and secured. People have rights of access, correction and erasure. Consent must be informed; long terms and conditions undermine it. In a global network, data crosses jurisdictions, so protection is uneven.

## Socio-technical systems

Technology is only one part of a system. The people who use it, the organisation that deploys it, the rules that govern it and the appeal routes available all shape the outcome. A fair algorithm inside an unfair process is still unfair. Ethics is therefore about design, disclosure, oversight and accountability — not only about intent.

## How it's examined (2023–2026)

- **2023 Section B Q13(c) (12 marks):** argue for and against facial recognition — 3 marks per developed argument.
- **2024 Section B Q13(c) (12 marks):** argue for and against pausing advanced AI.
- **2024 Section A Q12 (6 marks):** explain "if you are not paying, you are the product" and its implications for privacy and attention.
- **2025 Section A Q11 (6 marks):** advantages and risks of targeted political advertising.
- **2026 Section B Q14(c) (10 marks):** positive and negative impacts of a route-planning system — 5 marks per side.
- **2023 Section B Q13(a)(iii) (8 marks):** assistive technology and accessibility.

**Answer shape:** two developed points per side, each with a consequence, then a short judgement: "On balance, the benefit is real but conditional on disclosure and an appeal route."
