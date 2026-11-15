# Chapter 10 — JavaScript

## Definitions

| Term | Meaning |
|---|---|
| JavaScript | A programming language that runs in the browser and makes web pages interactive. |
| DOM | Document Object Model: the browser's tree representation of the page, which JavaScript can read and change. |
| Event | An action the page can respond to, such as a click, key press or page load. |
| Event handler | Code that runs when a particular event occurs. |
| `getElementById()` | A DOM method that finds an element by its unique id. |
| `.value` | The property holding the text a user has entered in an input. |
| `.innerHTML` | The HTML content inside an element; reading or setting it changes what is displayed. |
| `.style` | The property used to change an element's CSS from JavaScript. |
| Variable | A named store for a value, declared with `let`, `const` or `var`. |
| Validation | Checking that input is acceptable before using it. |

## What JavaScript adds

HTML gives a page structure and CSS gives it appearance; JavaScript gives it **behaviour**. When the browser loads a page it builds the **DOM**, a tree of objects representing every element. JavaScript can find nodes in that tree, read their values, change their content and respond to events.

JavaScript is usually included with a `<script>` tag, either in the head or near the end of the body, or in an external `.js` file.

## Events

An event is something that happens: a click, a key press, the page finishing loading, or a form being submitted. An **event handler** connects the event to code. For a button:

```html
<button onclick="greet()">Click me</button>
```

```javascript
function greet() {
  alert("Hello");
}
```

The handler runs when the event fires, which is why JavaScript is described as **event-driven**: the page waits, then reacts.

## Reading input

Elements need an `id` so they can be found:

```html
<input id="name" />
<button onclick="show()">Show</button>
<p id="out"></p>
```

```javascript
function show() {
  let name = document.getElementById("name").value;
  document.getElementById("out").innerHTML = "Hello " + name;
}
```

`.value` returns what the user typed, as a string. `.innerHTML` sets the content of the paragraph, so the result appears on the page. `.innerHTML +=` appends rather than replaces.

## Changing appearance

`.style` exposes CSS properties, written in camelCase:

```javascript
document.getElementById("out").style.backgroundColor = "lightgreen";
document.getElementById("out").style.color = "black";
```

This is how a validation message can turn green or red without reloading the page.

## Variables and types

`let` declares a variable that can change, `const` declares one that cannot be reassigned, and `var` is the older form. JavaScript values include strings, numbers and Booleans. `+` joins strings and adds numbers, so converting input with `Number()` matters when doing arithmetic. `==` compares after converting types, while `===` compares value and type; `===` is safer.

## Validation

Validation checks input before it is used — for example, that a name field is not empty or that an age is a number within range. On a web page it improves the user experience, but it is **not a security measure**: JavaScript can be bypassed, so a server must validate again.

## JavaScript and Python compared

Both use variables, conditionals, loops and functions, but the syntax differs: JavaScript uses braces `{}` for blocks and semicolons to end statements, while Python uses indentation. JavaScript runs in the browser and can change the page; Python typically runs on a computer or server. Both are widely used, often together.

## Writing strong exam answers

- Describe the DOM as the browser's representation of the page that JavaScript can modify.
- Name the event and the handler in the scenario.
- Explain `.value` (reading input) versus `.innerHTML` (writing output).
- State why client-side validation alone is not enough.

## Example

A form asks for a name and shows a greeting when a button is clicked. The click event calls `show()`, which reads `document.getElementById("name").value`, builds the string `"Hello " + name`, and assigns it to the paragraph's `innerHTML`. If the field is empty, an `if` statement sets the paragraph to "Please enter a name" and changes its colour to red — validation and feedback without a page reload.

## Validation and verification

These are different, and the schemes test the difference:

- **Validation** checks that input is acceptable before it is used: presence (not blank), range (18–120), type (numbers only), format (an `@` in an email), length (a phone number has the right number of digits).
- **Verification** checks that data has been entered or transferred correctly: double entry (type the email twice and compare), visual check (review a confirmation screen), or a confirmation email the user must check.

Validation cannot prove data is true — a valid-looking email may still be wrong — which is why verification exists. Client-side JavaScript validation improves the user experience and gives instant feedback, but it can be bypassed, so a server must validate again.

## How it's examined (2023–2026)

- **2026 Section B Q13(b)(ii) (9 marks):** two validation checks and one verification method for a lottery application — 5 marks for the best check, 2 marks for the other, 2 for the verification.
- **2026 Section B Q13(c)(i) (4 marks):** compare a mobile app and a responsive website for user experience (2) and accessibility (2).
- **2026 Section A Q10 (6 marks):** apply universal-design principles to a learning app.
- **2025 Section B Q13(c)(i) (6 marks):** assistive technologies and how they help.

**Answer shape:** name the check, say what it prevents, and apply it to the field: "A range check on age prevents impossible values such as 200, which would break the eligibility rule."
