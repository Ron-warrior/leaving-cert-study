# Chapter 3 — Analytics

## Definitions

| Term | Meaning |
|---|---|
| Analytics | Processing data to discover useful information and support decisions. |
| Data | Raw facts and figures, before they have been interpreted. |
| Pre-processing | Converting raw data into a clean, usable form. |
| Outlier | A value that is unusually far from the rest of the data. |
| Missing data | Values that were not recorded or were lost. |
| Sorting | Arranging data in order, such as ascending or descending, to make it easier to search and analyse. |
| Visualisation | Presenting data graphically, for example as a bar chart or line graph. |
| Analysis | Examining data with calculations or algorithms to find patterns and measures. |
| Information | Data that has been processed and given meaning. |

## The stages of analytics

Analytics follows a sequence: **access** the data, **pre-process** it, **analyse** it, then **visualise** the results. The order matters — analysing uncleaned data produces misleading results, and a graph of poor data is still poor.

## Accessing data

Data can come from sensors, surveys, logs, transactions or existing files. It is often stored as text files or **CSV** (comma-separated values), where each line is a record and commas separate the fields. The first line may hold the attribute names, which makes the file self-describing.

## Pre-processing

Raw data is rarely ready to use. Pre-processing includes:

- **Checking for outliers.** An outlier may be a recording error or a genuine extreme case. It should be investigated, not automatically deleted, because removing a real value distorts the result.
- **Handling missing data.** Missing values can be removed, replaced with an average, or flagged. Each choice affects the conclusion, so it should be stated.
- **Sorting.** Sorted data is easier to search, compare and display, and makes duplicates and gaps visible.
- **Standardising.** Units, formats and spellings are made consistent so values can be compared.

## Analysis

Analysis turns clean data into information. Simple measures include totals, averages, maximum and minimum, counts and percentages. Algorithms can go further: finding the most common value, grouping records, or detecting a trend over time. A calculation such as an average summarises many values in one number, which is useful but hides the spread.

## Visualisation

Charts make patterns easier to see. A bar chart compares categories, a line graph shows change over time, a pie chart shows parts of a whole, and a scatter graph shows the relationship between two variables.

Graphs have limitations. They summarise, so detail is lost; the scale can exaggerate or hide a change; and a pattern in a graph does **not** prove cause. The graph must be read with the data behind it.

## Using Python

Data is usually read into a **list**, one item or one row per element. A text file is opened with `open()`, read with `readlines()` or a loop, and split into fields with `.split(",")`; the `csv` module handles quoting and commas inside fields. Once in a list, the data can be sorted, searched, counted and averaged with loops. Results can be written back to a file with `write()`.

## Writing strong exam answers

- Name the stage being described and say what happens in it.
- Explain why pre-processing is needed, using an example such as an outlier or a missing value.
- Describe a trend using a figure from the graph or table, not just "it goes up".
- State a limitation of the visualisation, such as a misleading scale or lost detail.

## Example

A hospital records heart rates. One reading of 300 bpm is far above the rest; it is an outlier, probably a sensor error, and should be checked before averaging because it would raise the mean. After removing or correcting it, the average is calculated and a line graph shows how the rate changes over a day. The graph shows the pattern, but the average alone would hide the peaks — which is why both are reported.

## From data to decisions

Analytics answers a question with data: *what happened, how often, and what does it suggest?* The process is only as good as its weakest stage — a clean analysis of biased data is still biased.

When reading a table or graph in an exam, look for:

- **patterns** — a trend, a cluster, a repeated value;
- **outliers** — a value far from the rest, which may be an error or a genuine extreme;
- **missing variables** — a factor that affects the outcome but was not recorded, such as weather or time of day;
- **correlation versus cause** — two values moving together does not prove one causes the other.

Recording sensor readings over time turns them into a dataset: patterns can be found, faults diagnosed, and decisions justified with evidence.

## How it's examined (2023–2026)

- **2025 Section B Q15(a) (11 marks):** identify input and output variables from a table, describe two patterns (4 marks), and suggest two variables missing from the data (4 marks). Patterns must be stated with figures or comparisons — "younger drivers have higher failure rates" — not "the graph goes up".
- **2026 Section B Q15(b)(iii) (6 marks):** explain why storing sensor readings and fan states is useful: identify patterns, and detect faults (3 marks each).
- **2023 Section B Q13(a)(ii) (3 marks):** name a data item that could inform a model (population, housing, broadband) and justify it — 1 mark for the item, 2 for the justification.
- **2026 Section A Q5 (6 marks):** advantages and disadvantages of cloud storage — accessibility, backups, scalability versus connectivity, control, cost.

**Answer shape:** state the pattern, quote the evidence, then say what it implies. For missing data, name the variable and say what it would change.
