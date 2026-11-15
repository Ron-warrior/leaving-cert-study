# Chapter 2 — The BBC micro:bit

## Definitions

| Term | Meaning |
|---|---|
| Embedded system | A computer built into a device to perform a dedicated job, rather than a general-purpose PC. |
| Microcontroller | The chip on the micro:bit that runs the program and controls its components. |
| MakeCode | The online block-based IDE used to program the micro:bit. |
| Simulator | An on-screen copy of the micro:bit used to test a program without the physical device. |
| Input | A signal or value coming into the system, such as a button press or sensor reading. |
| Output | A result produced by the system, such as an LED pattern or a radio message. |
| Sensor | A component that measures something in the environment, such as acceleration, light or temperature. |
| Event | Something that happens which the program responds to, such as a button being pressed. |
| Variable | A named store for a value, such as a score or a step count. |
| Radio | The micro:bit's built-in wireless communication, used to send messages between boards. |

## What the micro:bit is

The BBC micro:bit is an **embedded system**: a single board containing a processor, memory and built-in components, programmed to do a specific job. Its hardware includes:

- a 5 × 5 grid of 25 LEDs, used for output and also as a light sensor;
- two buttons, A and B;
- an accelerometer, which detects movement and tilt;
- a compass (magnetometer);
- a temperature sensor;
- a radio and Bluetooth, for communication;
- an edge connector with pins for external devices, plus micro-USB and battery power.

Because the components are built in, projects can combine sensing, output and communication without extra hardware.

## The MakeCode editor

Programs are written in MakeCode, a block-based IDE. The screen has three parts: a **simulator** on the left, an **instructions** menu in the middle, and the **code** area on the right. Blocks are dragged from the menu into the code area and snapped together; blocks can be removed by dragging them back to the menu. MakeCode can also show the equivalent JavaScript or Python.

The simulator runs the program and lets the buttons, pins and sensors be tested before downloading. The finished program is downloaded as a `.hex` file and copied to the micro:bit, which appears as a USB drive.

## `on start` and `forever`

Two blocks control when code runs:

- **`on start`** runs once, when the program begins or the board is reset. It is used to set up variables, radio groups and an initial display.
- **`forever`** repeats continuously while the board is powered. It is used for anything that must keep checking, such as reading a sensor.

This is the micro:bit's version of iteration, and the distinction matters in exam answers: setup in `on start`, repeated behaviour in `forever`.

## Inputs, outputs and events

An input block such as `on button A pressed` runs its code when the event happens. Typical outputs are `show string`, `show leds` and `show number`. A program can pause with `pause`, which is measured in milliseconds, so `pause(500)` waits half a second.

Variables store readings: a step counter adds 1 each time the accelerometer detects a shake, then displays the total. Conditionals (`if`) let the program react differently to different readings, for example showing a sun when the light level is high.

## Radio and communication

Two micro:bits can communicate if they are in the same **radio group**. One sends a string or number; the other receives it with `on radio received` and can display it. This allows projects such as a remote sensor or a two-way message link. Bluetooth serves a similar purpose when connecting to a phone or computer.

## Writing strong exam answers

- Define an embedded system and give the micro:bit as an example, naming built-in components.
- Explain the difference between `on start` and `forever`, with an example of each.
- Identify the input, the processing and the output in a described project.
- Explain why the simulator is useful: it allows testing and debugging before downloading.

## Example

A step counter uses a variable `steps`, set to 0 in `on start`. In `forever`, if the accelerometer detects a shake, `steps` increases by 1 and the total is shown on the LEDs. The input is movement, the processing is the increment, and the output is the LED display. Testing in the simulator means the logic can be checked before the `.hex` file is copied to the board.

## Digital and analogue sensors

A **digital sensor** produces a discrete value — open/closed, detected/not detected, on/off. A **analogue sensor** produces a continuously varying value, such as temperature, humidity or light level. Analogue readings give more detail, but they must be converted to digital values (using an ADC) before the processor can use them.

A greenhouse controller might use digital door and motion sensors and analogue temperature, humidity and light sensors. Outputs are actuators: a fan, a heater, a window opener, blinds or a buzzer. Storing readings over time allows patterns to be found — for example, that the temperature peaks at midday — and faults to be detected, such as a fan running without the temperature falling.

## How it's examined (2023–2026)

- **2023 Section A Q6 (6 marks):** name two smart-home embedded systems and give two characteristics that distinguish embedded systems from general computers. The scheme explicitly rejects the micro:bit and Raspberry Pi as examples — use a washing machine, heating system, alarm or smart speaker.
- **2026 Section B Q15 (38 marks):** a greenhouse system — classify digital versus analogue sensors (first correct of each type 2 marks, second 1 mark), describe the difference (4 marks), identify a logic flaw where the fan switches on and off (6 marks), state a rule to maintain conditions (2 marks), explain the benefit of storing sensor data (3 marks), list embedded-system characteristics with justifications (4 marks) and name testing stages (6 marks).
- **2025 Section B Q13(c) (6 marks):** assistive technology — screen reader, voice recognition, Braille display — 1 mark for the name, 2 for the explanation.

**Answer shape:** name the sensor, say whether it is digital or analogue, and say what value it produces. For an embedded-system characteristic, add the justification: "low power, because it runs continuously and must not waste energy".
