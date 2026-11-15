# Chapter 11 — Databases

## Definitions

| Term | Meaning |
|---|---|
| Database | An organised collection of related data. |
| Flat file database | A database stored as a single table, often in a text or CSV file. |
| Record | One complete row of a database, describing one item or person. |
| Attribute (field) | One column of a record, describing one property. |
| CSV | Comma-separated values: a plain-text format with one record per line and commas between attributes. |
| Primary key | An attribute (or combination) that uniquely identifies each record. |
| Cloud database | A database hosted on a remote server and accessed over the internet. |
| Firebase | A cloud database service used in the book to store and retrieve records. |
| Authentication | Verifying who a user is, usually with a username and password. |

## Flat file databases

A flat file database holds one table. Each **record** is a row and each **attribute** is a column. A clinic might store first name, last name, phone number, date of birth and age. The first line of a CSV file usually holds the attribute names, which makes the file self-describing and lets code refer to columns by position.

A **primary key** uniquely identifies a record — a patient number rather than a name, because two people can share a name. Without a unique key, records cannot be reliably updated or deleted.

CSV is common because it is simple, readable and portable between programs. Its limitations are that it stores no data types, no validation and no relationships, and a comma inside a value needs quoting.

## Using Python with a flat file

The `csv` module reads and writes rows without having to split strings manually:

```python
import csv

with open("patients.csv", newline="") as f:
    for row in csv.reader(f):
        print(row)
```

`csv.writer` writes rows, and opening a file in append mode (`"a"`) adds a record without erasing the rest. Data read from a file is text, so numbers must be converted before calculation. A menu-driven program can combine reading, searching, adding and displaying records in a loop.

## Problems with shared flat files

If several users each keep a copy, the copies diverge: a change made by one is invisible to the others, and two people can edit the same record. There is no central control, no concurrency handling and often no authentication. Merging copies is error-prone, and the larger the file the slower searching becomes.

## Cloud databases

A cloud database solves the sharing problem by keeping one authoritative copy on a server. Clients read and write over the internet, so every user sees the same data. **Firebase** is one example: records are stored under keys, written with a set or update operation, and read back with a query. Firebase can also push changes to connected clients in real time.

Cloud databases introduce their own considerations: an internet connection is required, access must be controlled with authentication and rules, and the data is held by a third party, which raises privacy and data-protection questions.

## Writing strong exam answers

- Distinguish record (row) from attribute (column), and give an example of each.
- Explain why a primary key is needed, using the duplicate-name problem.
- State two advantages of a cloud database over shared CSV copies.
- State one disadvantage of a cloud database, such as dependence on a connection or third-party storage.

## Example

A clinic stores patients in `patients.csv`, one record per line:

```text
id,first,last,phone
1,Ada,Lovelace,0871234567
2,Alan,Turing,0867654321
```

`id` is the primary key. A program reads the file with `csv.reader`, prints the records, and appends a new patient with `csv.writer`. If two receptionists each keep a copy, one may add a patient the other never sees; moving the table to Firebase gives both a single shared copy, at the cost of needing a connection and access rules.

## Why a database, not a spreadsheet

A flat file is simple, but as data grows it causes **redundancy** (the same value stored many times), **inconsistency** (copies disagree), **difficulty sharing** (each user has a copy), weak **security** (no access control) and slow searching. A database management system centralises the data, enforces data types and keys, controls concurrent access, provides backup and allows queries without rewriting the file.

A **primary key** uniquely identifies a record, so it must be unique and never null. A patient number works; a name does not, because two patients can share one. A **foreign key** in one table refers to a primary key in another, which is how relational databases link records without duplication.

## Database use cases

In a deposit-return scheme, separate databases might hold:

- **Machine details** — location, installation date, last emptied, status.
- **Container tracking** — a unique identifier per container, when it entered the system, whether it was recycled or reused.
- **Finance** — deposits paid, refunds given, transaction reports.

Splitting data into related tables avoids repeating machine and finance details for every container.

## Cloud databases

Firebase and similar services keep one authoritative copy on a server, accessible from any client. Benefits: a single shared version, real-time updates, automatic backup and no server maintenance. Costs: dependence on connectivity, vendor lock-in, ongoing subscription, and data-protection responsibility — the data is held by a third party, so access rules and GDPR obligations still apply.

## How it's examined (2023–2026)

- **2025 Section B Q13(b)(iii) (4 marks):** suggest two database use cases for a deposit-return scheme and explain each — 2 marks per use case.
- **2026 Section B Q13(b)(i) (6 marks):** choose and justify data types for name, email, age, ticket count and a Boolean field — 1 mark for the example, 1 for the justification.
- **2026 Section B Q13(c)(ii) (9 marks):** validation and verification for a form.
- **2023 Section B Q13(a)(ii) (3 marks):** name a data item for a model and justify it.

**Answer shape:** name the table or field, say what it stores, and say why it is separate: "A container-tracking table uses a unique ID so each container's history can be followed without repeating the machine details."
