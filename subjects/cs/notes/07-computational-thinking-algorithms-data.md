# Chapter 7 — Computational Thinking, Algorithms and Data Representation

## Definitions

| Term | Meaning |
|---|---|
| Computational thinking | A way of approaching problems so that a computer can help solve them. |
| Abstraction | Removing unnecessary detail to focus on what matters for the problem. |
| Decomposition | Breaking a complex problem into smaller, manageable parts. |
| Pattern matching | Recognising similarities or repeated structures in problems or data. |
| Algorithm | A finite sequence of unambiguous steps that solves a problem. |
| Pseudocode | Structured English used to describe an algorithm without a specific language's syntax. |
| Linear search | Checking items one at a time until the target is found. |
| Binary search | Repeatedly halving a **sorted** list to find a target. |
| Sorting | Arranging items into order, such as ascending or descending. |
| Bit | A binary digit, 0 or 1. |
| Byte | Eight bits. |
| Denary | Base 10, the everyday number system. |
| Binary | Base 2, using only 0 and 1. |
| Hexadecimal | Base 16, using 0–9 and A–F; a compact way to write binary. |
| Character set | The set of characters a computer can represent, such as ASCII or Unicode. |

## Computational thinking

Computational thinking is not the same as programming; it is how the problem is approached before code is written. Its techniques work together:

- **Decomposition** splits a large problem into smaller ones that can be solved separately. A game might decompose into input, scoring and display.
- **Pattern matching** spots similarities. If one sum is double another, the same solution can be reused.
- **Abstraction** removes detail that is irrelevant to the question. A map is an abstraction of a city: it keeps roads and leaves out buildings.
- **Algorithm design** expresses the solution as clear, ordered steps.

Abstraction is a trade-off. Leaving out too little makes a problem unmanageable; leaving out something relevant makes the solution wrong for the real situation.

## Algorithms

An algorithm must be finite, unambiguous and effective: each step is clear, and the process ends. It can be written as pseudocode, a flowchart, or code. Pseudocode is useful in exams because it shows the logic without language details.

**Linear search** starts at the first item and checks each one until the target is found or the list ends. It works on any list, but on average it examines half the items, so it is slow for large lists.

**Binary search** works only on a **sorted** list. It checks the middle item: if it is the target, stop; if the target is smaller, search the lower half; otherwise search the upper half. Each comparison halves the remaining items, so it is much faster than linear search on large lists.

Sorting algorithms arrange data so it can be searched and displayed. **Bubble sort** repeatedly compares adjacent pairs and swaps them if they are in the wrong order, so large values "bubble" to the end; it is simple but slow on large lists. **Selection sort** repeatedly finds the smallest remaining item and places it next; **insertion sort** builds a sorted section one item at a time. Comparing algorithms uses time efficiency (number of comparisons or passes) and space.

## Representing data

Computers store everything as binary because electronic circuits reliably distinguish two states. Denary numbers are converted to binary by repeatedly dividing by 2 and reading the remainders upwards, or by placing place values (128, 64, 32, 16, 8, 4, 2, 1).

Hexadecimal is base 16. Each hex digit represents four bits, so binary is converted by grouping bits in fours from the right: `1011 1110` is `BE`. Hex is used because it is shorter and less error-prone than long binary strings, for example in colour codes and memory addresses.

A **character set** maps characters to numeric codes. **ASCII** uses 7 bits for 128 characters; **Unicode** uses more bits and covers far more characters, including languages beyond English and emoji.

Units build upwards: 8 bits = 1 byte, 1024 bytes = 1 kibibyte, and so on. The same binary can represent different things — a number, a character or part of an image — depending on how it is interpreted.

## Writing strong exam answers

- Define the four computational-thinking techniques and apply one to the scenario given.
- State that binary search requires a sorted list; this is a common mark.
- Show conversion working, not just the answer.
- Explain why hex is used rather than binary.

## Example

Convert 45 to binary: 32 fits (remainder 13), 8 fits (5), 4 fits (1), 1 fits, so `0010 1101`. Grouped in fours, `0010` is 2 and `1101` is D, so 45 is `2D` in hex.

Searching for 7 in the sorted list `[1, 3, 5, 7, 9, 11, 13]`: check the middle, 7 — found in one comparison. Linear search would have checked four items. If the list were unsorted, binary search could not be used at all.

## Complexity and efficiency

Complexity describes how the work grows as the input size *n* grows, written with big-O notation:

| Notation | Meaning | Example |
|---|---|---|
| O(1) | Constant: the same work whatever the size. | Accessing a list element by index; best case of a search. |
| O(log n) | Halves the problem each time. | Binary search. |
| O(n) | Linear: work grows with the number of items. | Linear search; one loop over a list. |
| O(n log n) | Better than quadratic for large n. | Quicksort, merge sort (average). |
| O(n²) | Quadratic: work grows with the square. | Bubble, selection and insertion sort. |

Best case is the least work (target found immediately, O(1)); worst case is the most (target last or absent). Binary search is O(log n) because each comparison halves the remaining items; linear search is O(n) because it may check every item.

Efficiency is not only speed: sorting costs time and memory, and if data is already sorted that cost may buy nothing.

## Graphs, paths and heuristics

A **graph** represents a problem as **vertices** (points) and **edges** (connections). A map can be abstracted to a graph: land areas become vertices, bridges or roads become edges, and distances or shapes are ignored because they do not affect the question.

The **degree** of a vertex is the number of edges connected to it. An **Euler path** crosses every edge exactly once and exists when either every vertex has even degree, or exactly two vertices have odd degree. This is why the Königsberg bridge problem has no solution: all four land areas have odd degree.

A **heuristic** is a rule of thumb that finds a good solution quickly when an exact method would take too long. "Always take the nearest unvisited city" is a heuristic for route planning: fast and usually good, but it can miss the optimal route.

## Logic gates and Boolean expressions

Gates combine binary inputs:

- **NOT** inverts: 0 becomes 1 and 1 becomes 0.
- **AND** outputs 1 only when both inputs are 1.
- **OR** outputs 1 when at least one input is 1.

A truth table lists every combination of inputs and the output. For `x AND y`, only the row `1, 1` gives 1; for `x OR y`, every row except `0, 0` gives 1. Circuits are built from these gates, and a Boolean expression can be simplified using the same rules.

## How it's examined (2023–2026)

- **2023 Section A Q3 (6 marks):** complete a truth table for `x > 0`, `y > 0` and `x > 0 and y > 0`, then write the expression for a described region.
- **2024 Section A Q1 (6 marks):** identify the logic gate from its input/output table.
- **2026 Section A Q3 (6 marks):** draw an AND gate and an OR gate and wire inputs to them correctly — 1 mark per correct gate, 1 per correct connection.
- **2023 Section B Q15(a)(iv)–(v) (6 marks):** best and worst case for linear and binary search (O(1), O(n), O(log n)) and explain what O(1) means.
- **2024 Section B Q14(c)(ii) (5 marks):** explain why bubble sort is O(n²): about n passes with n−1 comparisons each.
- **2026 Section A Q11 (6 marks):** explain what a heuristic is and why its answer may not be optimal.
- **2026 Section B Q14 (38 marks):** Euler paths, odd/even degree, abstraction of a map to a graph, and the bridge-crossing puzzle.

**Answer shape:** for complexity, give the notation and the reason ("binary search halves the list, so O(log n)"); for a graph, count the degree of each vertex before concluding.
