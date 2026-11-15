# Chapter 1 — Getting Started with Python

## Definitions

| Term | Meaning |
|---|---|
| Program | A set of instructions that a computer carries out. |
| IDE | Integrated Development Environment: software for writing, saving and running code. |
| Output | What a program produces, such as text on the screen. |
| String | Text written inside quotation marks. |
| Variable | A named store for a value. |
| Comment | A note in the code, starting with `#`, that Python ignores. |
| Syntax error | A rule of the language is broken, so the program will not run. |
| Logic error (bug) | The program runs but produces the wrong result. |
| Boolean | A value that is either `True` or `False`. |
| Selection | Choosing which code runs, using `if` / `elif` / `else`. |
| Iteration | Repeating code using `while` or `for`. |
| Test case | An input and its expected output, used to check a program. |

## Writing and running a program

Python is a general-purpose, open-source language: it is not tied to one kind of problem, it is concise, and it comes with a large library. A program is written in an IDE, saved as a `.py` file and then run. `print("Hello world!")` calls the `print` function with a string; the text inside the quotation marks is the output.

The quotation marks are not printed. They mark where the string starts and ends, which is why `print(Hello)` without them is a syntax error.

## Errors

There are two types of error.

- **Syntax errors** break the rules of the language — a missing bracket or quote, or a keyword spelled wrongly. Python reports the line and the program does not run.
- **Logic errors (bugs)** let the program run but produce the wrong answer, for example using `+` where `*` was needed. There is no error message, so the program must be tested.

## Variables and input

A variable is assigned with `=`: `age = 15`. The name goes on the left, the value on the right. Names may contain letters, digits and underscores, cannot begin with a digit, and are case-sensitive.

`input()` always returns a **string**, even when the user types digits. Convert it before doing arithmetic:

```python
age = int(input("Enter your age: "))
```

Use `int()` for whole numbers and `float()` for decimals. Comments, starting with `#`, explain why code does something; they are ignored when the program runs.

## Strings in detail

Strings can use single or double quotation marks, as long as they match. Special characters include `\n` for a new line and `\t` for a tab. Strings can be joined with `+`, and `len()` returns the number of characters. `print()` also takes arguments: `sep=` sets what goes between items and `end=` sets what is printed after them, so `end=""` keeps the next output on the same line.

## Boolean logic and conditionals

A Boolean is `True` or `False`. Comparisons produce Booleans: `==`, `!=`, `<`, `>`, `<=`, `>=`. They can be combined with `and`, `or` and `not`. Selection uses:

```python
if score >= 80:
    print("Excellent")
elif score >= 50:
    print("Pass")
else:
    print("Repeat")
```

The indented block belongs to the branch above it. **Indentation is part of Python's syntax**, not decoration: inconsistent indentation is an error.

## Iteration

`while` repeats while a condition remains true; something inside the loop must change or it never ends. `for i in range(5)` repeats five times, with `i` taking the values 0 to 4. `range(start, stop, step)` gives more control. Loops are used to process every item in a list or every line in a file.

## Testing

A test table records the input, the expected output and the actual output, then marks pass or fail. Good tests include typical values, **boundary values** (0, the largest allowed, exactly on a threshold) and invalid values such as text where a number is expected.

## Writing strong exam answers

- Define syntax and logic errors and give one example of each.
- Trace code line by line and write the output exactly, including line breaks.
- Explain why `input()` must be converted before arithmetic.
- State that indentation defines blocks in Python, so it changes what the program does.

## Example

A program asks for an age and prints `Adult` when the age is 18 or over, otherwise `Minor`.

```python
age = int(input("Age: "))
if age >= 18:
    print("Adult")
else:
    print("Minor")
```

With input `18` the output is `Adult`; with `17` it is `Minor`. Testing 18 matters because it is the boundary: using `>` instead of `>=` would give `Minor` at 18, a logic error the test would catch.

## Data types in Python

Every value has a type, and the type decides what can be done with it.

| Type | Example | Use |
|---|---|---|
| `str` | `"Ciara"`, `"083-1234567"` | Text: names, phone numbers, addresses, anything with letters or symbols. |
| `int` | `255`, `-4` | Whole numbers: counts, ages, years. |
| `float` / `real` | `-99.99`, `1.5` | Numbers with a decimal part: measurements, prices. |
| `bool` | `True`, `False` | Conditions and yes/no flags. |
| `list` | `[1.5, 1.7, 1.2]` | An ordered collection of values. |

`input()` always returns a **string**, so a number typed by the user must be converted with `int()` or `float()` before arithmetic. Choosing the right type matters: a phone number stored as an `int` loses its leading zero, and a price stored as an `int` loses its cents.

## How it's examined (2023–2026)

- **2023 Section A Q1 (6 marks):** a table of values — `"Ciara"`, `255`, `"083-1234567"`, `[1.5, 1.7, 1.2, 0.9, 1.3]`, `False`, `-99.99` — asking for the data type of each. One mark per correct type; no explanation required. Learn the six types by sight.
- **2026 Section B Q13(b)(i) (6 marks):** name a string, an integer and a Boolean field from a lottery form, and **justify** each choice. Example: "Age is an integer because it is a whole number"; "Agree to terms is a Boolean because there are only two possible values". One mark for the example, one for the justification.
- **2023 Section A Q11 (6 marks):** explain string slicing and concatenation in a username algorithm — 2 marks for identifying the steps, 2 marks for explaining what slicing extracts (first two characters, the four-digit year), 2 marks for concatenation.
- **2024 Section B Q14(b) (14 marks):** list indexing, `len()`, slicing `values[2:4]`, and why `values[5]` raises an index error.

**Answer shape:** name the type, then give the reason in terms of what the value contains. "String, because it contains letters and may include spaces" is a full-mark answer; "String" alone is one mark.
