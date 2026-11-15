# Chapter 5 — A Brief History of Computing

## Definitions

| Term | Meaning |
|---|---|
| Computer | A device that can manipulate symbols by following instructions. |
| Programmable | Able to be given a new set of instructions without being rebuilt. |
| General purpose | Able to carry out many different tasks, not just one fixed job. |
| Digital | Representing information using a limited set of discrete values, typically 0 and 1. |
| Analog | Representing information continuously, such as a voltage that varies smoothly. |
| Electronic | Operating using the controlled flow of electrons, usually through semiconductors. |
| Semiconductor | A material whose ability to conduct can be controlled, used to build transistors. |
| Transistor | A tiny electronic switch; the basic building block of modern processors. |
| Integrated circuit | Many transistors and components fabricated on one chip. |
| Microprocessor | A complete CPU on a single chip, which made personal computers possible. |

## What counts as a computer

A computer manipulates symbols according to instructions. The **Antikythera Mechanism**, discovered in 1901 and dating from ancient Greece, used gears to model the movement of the sun and moon. It is often called the earliest computer, but it could not be programmed and could not be reused for another task: its behaviour was fixed by its construction.

The **abacus** is a calculating tool, not a computer. A person moves the beads and supplies the method; the device stores no program and performs no calculation by itself. A computer must be able to follow a stored sequence of instructions.

## Three properties of modern computers

- **Programmable.** It can be given new instructions, so the same machine can run a game, a spreadsheet or a browser.
- **General purpose.** It is not built for one job. A washing machine controller is a computer but not general purpose; a laptop is.
- **Digital and electronic.** It works with discrete binary values and uses electronic components, which makes it fast, reliable, cheap and portable.

Analog computers represent values continuously; digital computers represent them as bits. Digital signals are easier to store exactly, to copy without loss and to process with logic circuits, which is why digital computers replaced analog ones for most purposes.

## From counting to computing

Counting devices came first: stones, tally marks and the abacus. Mechanical calculators followed, then Charles Babbage's Difference and Analytical Engines, designed in the 19th century; Ada Lovelace described an algorithm for the Analytical Engine and is often called the first programmer. Punched cards, used by Hollerith for the US census, became a way to store and feed data.

In the 20th century, Alan Turing formalised what computation means with the idea of a universal machine. Electronic computers such as ENIAC used thousands of vacuum tubes, were enormous, and consumed large amounts of power.

## Generations of computers

| Generation | Technology | Effect |
|---|---|---|
| First | Vacuum tubes | Large, hot, unreliable machines. |
| Second | Transistors | Smaller, cooler, more reliable. |
| Third | Integrated circuits | Many components per chip; cheaper and faster. |
| Fourth | Microprocessors | A CPU on one chip; personal computers. |
| Fifth | Very large scale integration and beyond | Mobile devices, networks, AI and embedded systems. |

Each generation reduced size and cost while increasing speed and reliability. **Moore's law** describes the long-run trend of transistor counts roughly doubling at regular intervals.

## Writing strong exam answers

- Explain why the Antikythera Mechanism is not a computer: it was not programmable.
- Define programmable and general purpose, and give an example of a computer that is not general purpose.
- State two advantages of digital over analog representation.
- Link a generation to its technology and to one consequence, such as size or cost.

## Example

A modern smartphone and an abacus both help with calculation, but only the phone is a computer. The phone stores instructions, can be reprogrammed with new apps, and processes binary values electronically. The abacus has no stored program, no memory of instructions and no automatic processing; the user performs the method. That difference — stored, changeable instructions — is what defines a programmable computer.

## Turing machines

A **Turing machine** is an abstract model of computation, described by Alan Turing in 1936. It has:

- an infinite **tape** divided into cells, each holding a symbol;
- a **read/write head** that reads the symbol under it and can write a new one;
- a finite set of **states**, including a start state and a halt state;
- a **transition table**: for the current state and symbol, it says what to write, whether to move left or right, and which state to enter next.

The machine repeats this until no rule applies. Despite its simplicity, it can compute anything a modern computer can compute — this is the substance of the Church–Turing thesis. A **universal Turing machine** can read a description of another machine and simulate it, which is the idea behind the stored-program computer.

Turing machines also let computer scientists reason about **limits**: because some problems cannot be decided by any Turing machine (the halting problem is the standard example), they cannot be solved by any computer.

## The developments that shaped computing

The 2024 scheme asks for six, each with its impact:

| Development | Impact |
|---|---|
| Turing machines | First abstract model of computability; defined what can and cannot be computed. |
| Transistors | Replaced bulky, unreliable vacuum tubes; smaller, faster, cooler, more reliable computers. |
| Integrated circuits | Many components on one chip; dramatically lower cost and size, higher speed. |
| ARPANET | Forerunner of the internet; developed the protocols modern networks use. |
| Microprocessors | A CPU on a single chip; made personal computers and embedded devices possible. |
| Personal computers | Affordable computing for work, education and communication. |

## How it's examined (2023–2026)

- **2024 Section A Q5 (6 marks):** explain six developments — Turing machines, transistors, integrated circuits, ARPANET, microprocessors and personal computers. The scheme awards 6 for "very good explanation", 4 for good, 2 for fair; each item needs an impact, not just a name.
- **2026 Section A Q12 (6 marks):** (a) explain how a Turing machine's controller works: it follows the rules, writing a symbol, moving the head and changing state based on the current state and symbol, and halting when told to; (b) explain why Turing machines matter: they model what any computer can do and define the limits of computation.
- **2025 Section A Q12 (6 marks):** CPU components — ALU, control unit, registers, cache, program counter, clock — 1 mark for the name, 2 for the purpose.

**Answer shape:** name the development, then state the *change* it caused: "Transistors replaced vacuum tubes, making computers smaller, faster and more reliable."
