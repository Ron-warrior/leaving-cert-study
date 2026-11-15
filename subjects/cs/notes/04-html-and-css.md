# Chapter 4 — HTML and CSS

## Definitions

| Term | Meaning |
|---|---|
| Web page | A document containing content, stored on a server and viewed in a browser. |
| Website | A collection of related web pages. |
| URL | Uniform Resource Locator: the unique address of a resource on the web. |
| Web browser | Software that requests web pages and displays them. |
| Web server | A computer dedicated to storing web pages and sending them when requested. |
| HTTP | Hypertext Transfer Protocol: the rules used for requests and responses between browser and server. |
| HTML | The language used to describe and structure the content of a web page. |
| CSS | The language used to control the presentation and layout of a web page. |
| Tag | A markup instruction such as `<p>`; most come in pairs with a closing tag. |
| Element | A complete tag pair and the content between them. |
| Attribute | Extra information inside an opening tag, such as `href` or `src`. |
| Selector | The part of a CSS rule that chooses which elements are styled. |

## How the web works

A browser sends a **request** to a web server using HTTP, and the server sends back a **response** containing the page. The default page returned for a folder is usually `index.html`. A URL identifies the resource: the protocol, the domain, and the path to the page.

HTML describes **what the content is**; CSS describes **how it looks**. Keeping them separate means the same content can be restyled without rewriting it, and it makes pages easier to maintain.

## HTML structure

A page has a `<!DOCTYPE html>` declaration, then `<html>`, which contains `<head>` (information about the page, such as `<title>`) and `<body>` (the visible content).

Common elements:

- headings `<h1>` to `<h6>`, with `<h1>` as the main heading;
- paragraphs `<p>`;
- lists `<ul>`, `<ol>` and `<li>`;
- links `<a href="page.html">text</a>`;
- images `<img src="photo.jpg" alt="description">`;
- line breaks `<br>`, and containers `<div>` (block) and `<span>` (inline);
- emphasis `<strong>` and `<em>`.

Every image needs an `alt` description for accessibility. Tags should be closed in the correct order, and elements nested properly.

## CSS

A CSS rule has a **selector** and a block of **declarations**:

```css
p {
  color: #333333;
  font-size: 16px;
}
```

Selectors can target an element (`p`), a class (`.note`) or an id (`#header`). Classes can be reused; ids should be unique. Common properties include `color`, `background-color`, `font-family`, `font-size`, `margin`, `padding`, `border` and `width`.

The **box model** treats every element as a box: content, padding, border and margin. Padding is inside the border; margin is outside it. Understanding this explains most spacing problems.

CSS can be **inline** (a `style` attribute), **internal** (a `<style>` block in the head) or **external** (a separate `.css` file linked with `<link rel="stylesheet" href="style.css">`). External CSS is preferred because one file styles every page.

## Writing strong exam answers

- State the division of labour: HTML for content and structure, CSS for presentation.
- Describe the request–response cycle, naming the browser, server and HTTP.
- Explain why external CSS is better than inline styles.
- Name the parts of a CSS rule and give a short example.

## Example

```html
<h1>School Notice</h1>
<p class="note">The library closes at 4 pm on Friday.</p>
```

```css
.note {
  color: #b00020;
  border-left: 3px solid #b00020;
  padding-left: 8px;
}
```

The HTML gives the content meaning: a main heading and a paragraph. The CSS class `.note` changes only the appearance, and could be reused on any other paragraph without touching the HTML.

## Wireframes, UX and accessibility

A **wireframe** is a low-detail sketch of a screen: boxes for headings, images and controls, with notes on behaviour. It is used during design to agree layout and flow before any code is written, so changes are cheap.

**User experience (UX)** is about how easily and pleasantly a task can be completed: clear navigation, obvious controls, fast feedback and error prevention. **Accessibility** is about making the same task possible for users with visual, auditory, motor or cognitive impairments.

A responsive website adjusts to screen size and runs in a browser with no installation; a mobile app is installed, can use device features such as notifications and touch, and may feel smoother — but it needs storage, a compatible device and updates. Neither is automatically more accessible: the web is available on any device, while an app can offer voice input, larger text and screen-reader support.

### Principles of universal design

1. **Equitable use** — the same design is usable by people with different abilities.
2. **Flexibility in use** — more than one way to interact, such as touch or voice.
3. **Simple and intuitive use** — clear, consistent layout that needs no training.
4. **Perceptible information** — information given in more than one way: text, audio, high contrast.
5. **Tolerance for error** — confirmation, undo and clear messages.
6. **Low physical effort** — large targets, no precise movements required.
7. **Size and space for approach and use** — reachable controls, room for mobility aids.

## How it's examined (2023–2026)

- **2024 Section A Q10 (6 marks):** name two principles of universal design and explain how each would be applied to a self-service kiosk. One mark for the name, two for the application.
- **2026 Section A Q10 (6 marks):** the same principles applied to a learning app — 2 marks for the name, 1 for the description.
- **2026 Section B Q13(c) (13 marks):** compare a mobile app with a responsive website on user experience and accessibility (2 + 2 marks), then give two validation checks and one verification method (5 + 2 + 2).
- **2025 Section B Q13(c)(i) (6 marks):** identify assistive technologies (screen reader, voice recognition, Braille display) and explain how each helps — 1 mark name, 2 marks explanation.
- **2023 Section A Q4 (6 marks):** define a user interface, then name and describe two types (GUI, CLI, menu-driven, touch, natural language).

**Answer shape:** HTML and CSS are rarely examined as code. The marks are in design language: name the principle or technology, say how it is applied, and say who benefits.
