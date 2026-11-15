# Chapter 9 — More About Python

## Definitions

| Term | Meaning |
|---|---|
| Nested conditional | An `if` statement placed inside another `if` statement. |
| Boolean operator | `and`, `or`, `not`, used to combine or reverse conditions. |
| Nested loop | A loop placed inside another loop. |
| Unit test | A test that checks one small piece of code in isolation. |
| Recursion | A function that calls itself to solve a smaller version of the same problem. |
| Base case | The condition that stops a recursive function calling itself again. |
| Linear search | Checking items one by one until the target is found. |
| Binary search | Halving a sorted list repeatedly to find a target. |
| Selection sort | Repeatedly selecting the smallest remaining item and placing it in order. |
| Insertion sort | Building a sorted section by inserting each new item into its correct place. |
| Bubble sort | Repeatedly swapping adjacent items that are out of order. |
| Quicksort | A divide-and-conquer sort that partitions around a pivot (HL). |

## Nested conditionals

A nested conditional tests a second condition only when the first is true. The driving-licence example checks age first, then, inside that branch, whether the applicant has a provisional licence. The outer condition is evaluated first; the inner one only matters if the outer branch is taken. Each level must be indented consistently.

Nesting can usually be simplified with Boolean operators, which is often clearer and less error-prone.

## Boolean operators with conditionals

`and` requires both conditions to be true, `or` requires at least one, and `not` reverses a condition. For example, a car might be high-pollution if it is old **and** petrol. Combining conditions reduces the number of nested branches:

```python
if age >= 17 and has_licence:
    print("Eligible")
```

Parentheses make the intended grouping explicit when `and` and `or` are mixed.

## Nested loops

A nested loop runs the inner loop completely for each iteration of the outer loop. A grid is the standard example: the outer loop runs once per row, the inner loop once per column. The total number of iterations is the product, so nesting multiplies the work — an important efficiency point.

Tracing nested loops requires recording both loop variables at each step, not just the output. A table with a column per variable is the reliable way to do it.

## Unit testing

A unit test checks one function with known inputs and an expected output. In Python, `assert` states what must be true:

```python
assert area(3, 4) == 12
```

If the assertion fails, the program stops and reports it. Unit tests should cover typical inputs, boundary values and invalid inputs. Testing each unit separately makes faults easier to locate than testing only the finished program.

## Recursion (HL)

A recursive function solves a problem by calling itself on a smaller input, with a **base case** that stops the process. Factorial is the standard example: `factorial(n) = n * factorial(n - 1)`, with `factorial(0) = 1` as the base case.

Every recursive call must move towards the base case, or the recursion never ends and the call stack overflows. Recursion can express some algorithms, such as tree traversal and quicksort, more naturally than loops, but each call uses memory.

## Searching

**Linear search** checks each item in turn. It works on unsorted data, but on average it examines half the list.

**Binary search** requires a **sorted** list. It checks the middle item and discards half the remaining items each time. For large lists it is far faster, but it cannot be used until the data is sorted, and sorting itself costs time.

## Sorting

- **Selection sort:** find the smallest item in the unsorted section, swap it into the next position. Simple, but always makes many comparisons.
- **Insertion sort:** take the next item and insert it into the correct place in the already-sorted section. Efficient for small or nearly sorted lists.
- **Bubble sort:** compare adjacent pairs and swap when out of order; repeat passes until no swaps occur. Easy to trace, but slow on large lists.
- **Quicksort (HL):** choose a pivot, partition items into smaller and larger, then sort each part recursively. Fast on average, but performance depends on the pivot.

## Writing strong exam answers

- Trace loops with a table showing every variable at each iteration.
- State the base case whenever recursion is discussed.
- State that binary search needs sorted data.
- Compare sorts by number of comparisons or passes, not just by name.

## Example

Bubble sort on `[4, 2, 7, 1]`. Pass 1: compare 4 and 2 — swap → `[2, 4, 7, 1]`; compare 4 and 7 — no swap; compare 7 and 1 — swap → `[2, 4, 1, 7]`. The largest value, 7, is now in its final position. Pass 2 sorts `[2, 4, 1]` → `[2, 1, 4, 7]`; pass 3 gives `[1, 2, 4, 7]`, and a final pass with no swaps confirms the list is sorted.

## Lists in detail

A **list** is an ordered collection. Operations that appear in the schemes:

| Operation | Example | Result |
|---|---|---|
| Index | `values[0]` | First element. |
| Negative index | `values[-1]` | Last element. |
| Length | `len(values)` | Number of elements. |
| Slice | `values[2:4]` | Elements at index 2 and 3 (the end index is excluded). |
| Append | `values.append(70)` | Adds to the end. |
| Remove | `values.remove(30)` | Removes the first occurrence. |

Accessing an index that does not exist, such as `values[5]` in a list of length 5, raises an **index error** at runtime: the code is syntactically valid but fails when it runs.

## Recursion in exam terms

A recursive function has three properties the scheme looks for:

1. **It calls itself**, and each call is placed on the call stack.
2. **It has a base case** — the smallest version of the problem, solved directly, which stops the recursion.
3. **It progresses towards the base case** — each call reduces the problem, for example by passing `mid - 1` or `mid + 1`.

Advantages: concise, elegant, and natural for problems that decompose into similar subproblems, such as quicksort and tree traversal. Disadvantages: each call uses stack memory, so deep recursion can cause a **stack overflow**; and the overhead can make it slower than a loop. A loop reuses the same variables, so its memory use stays constant.

## Quicksort (HL)

Quicksort chooses a **pivot**, partitions the list into values below and above it, then sorts each part recursively. Pivot choice matters:

- first, last or middle element;
- median of the first, middle and last;
- random;
- median of medians.

If the pivot splits the list evenly, the recursion tree has about log n levels and the cost is **O(n log n)**. If the pivot is always the smallest or largest — for example, the first element of an already-sorted list — each split leaves n−1 items on one side, giving n levels and **O(n²)**.

Bubble sort can be improved: reduce the comparisons by one each pass (the largest item is already in place), and stop early if a pass makes no swaps.

## How it's examined (2023–2026)

- **2023 Section B Q15 (38 marks):** choose linear or binary search with justification, trace a sorted-list search, give best/worst complexity, explain O(1), identify the lines of a binary-search loop, explain `return` and the `-1` sentinel, and state the three properties of recursion with advantages and disadvantages.
- **2024 Section B Q14(b)–(c) (20 marks):** list data type, index, `len`, slicing, index error, sorting advantages/disadvantages, bubble-sort passes, why bubble sort is O(n²), and two enhancements.
- **2025 Section B Q14 (38 marks):** trace a `while` loop, explain why the number of iterations is unknown, define base and recursive cases, explain arguments, compare recursion with iteration, quicksort partition and recursion, pivot strategies, and best/worst complexity.
- **2026 Section A Q7 (6 marks):** complete bubble-sort passes and explain insertion sort.
- **2026 Section B Q14 (38 marks):** Euler paths and graph reasoning, plus the bridge-crossing puzzle.

**Answer shape:** always trace with a table. For complexity, name the notation and say why; for recursion, name the base case in the code.
