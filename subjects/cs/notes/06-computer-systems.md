# Chapter 6 — Computer Systems

## Definitions

| Term | Meaning |
|---|---|
| Computer system | A combination of connected parts — hardware, software, data and people — working together to process data. |
| Architecture | The specification of how a computer's components are arranged and connected. |
| Von Neumann architecture | A design in which program instructions and data share the same memory. |
| CPU | Central Processing Unit: the part that fetches, decodes and executes instructions. |
| ALU | Arithmetic Logic Unit: performs calculations and logical comparisons. |
| Control unit | Directs the flow of data and signals inside the CPU and coordinates the fetch–execute cycle. |
| Register | Very fast temporary storage inside the CPU. |
| Bus | A set of connections that carries data, addresses and control signals between components. |
| RAM | Random Access Memory: volatile working memory holding programs and data in use. |
| ROM | Read Only Memory: non-volatile memory whose contents remain when power is off. |
| Cache | Small, fast memory close to the CPU that holds frequently used instructions and data. |
| Volatile | Loses its contents when power is removed. |
| Fetch–execute cycle | The repeated process of fetching an instruction, decoding it and executing it. |
| Clock | A signal that synchronises the CPU's operations. |
| Secondary storage | Non-volatile storage such as an SSD or hard disk, used to keep files and programs. |

## A system of parts

A computer system is more than a processor. It includes hardware (CPU, memory, storage, input and output devices), software (operating system and applications), data and the people who use it. Connecting a laptop to a network extends the system further. Each part depends on the others: a fast CPU is limited by slow memory or storage.

## Von Neumann architecture

Most computers follow the von Neumann design. Instructions and data are stored together in memory, and the CPU fetches them one at a time. The main parts are:

- the **control unit**, which coordinates the cycle and sends control signals;
- the **ALU**, which does arithmetic and logical operations;
- **registers**, which hold the current instruction, operands, results and addresses;
- **memory**, holding both the program and its data;
- **buses**, carrying data, addresses and control signals between them.

Because instructions and data share one memory and one bus, the CPU cannot fetch an instruction and read data at exactly the same moment. This is sometimes called the von Neumann bottleneck.

## Memory

- **Registers** are inside the CPU and are the fastest storage, but there are very few of them.
- **Cache** is small and fast, holding recently or frequently used items to avoid slower memory access.
- **RAM** holds the operating system, running programs and their data. It is **volatile**: contents are lost when power goes off.
- **ROM** is **non-volatile** and holds fixed start-up instructions (the firmware or BIOS).
- **Secondary storage** is non-volatile and much larger but slower; it keeps files and programs permanently.

The hierarchy trades speed for capacity: registers, cache, RAM, then secondary storage, with cost per byte falling and access time rising.

## The fetch–execute cycle

1. **Fetch:** the address in the program counter is placed on the address bus; the instruction is read from memory into the instruction register.
2. **Decode:** the control unit interprets the binary instruction and works out what operation is required.
3. **Execute:** the operation is carried out — the ALU calculates, or data is moved — and the result is stored in a register or memory.
4. The program counter is updated, and the cycle repeats with the next instruction.

The **clock** paces this cycle. A higher clock speed means more cycles per second, but performance also depends on cache size, the number of cores and the instruction mix.

## Input, output and the operating system

Input devices bring data in; output devices present results; secondary storage keeps them. The **operating system** manages memory, schedules processes, handles input and output, and provides a file system, so application programs do not have to control the hardware directly.

## Writing strong exam answers

- Describe the fetch–execute cycle in order, naming the registers and buses involved.
- Explain why cache improves performance: it reduces the time the CPU waits for memory.
- Compare RAM and ROM on volatility, contents and purpose.
- Explain why registers are needed even though RAM exists: speed.

## Example

An instruction to add two numbers might be `ADD R1, R2`. The CPU fetches it from the address in the program counter, decodes it as an addition, and the ALU adds the contents of registers R1 and R2, storing the result in a register. The program counter moves to the next instruction. If the values were in RAM, they would first be loaded into registers, because the ALU operates on registers, not directly on memory.

## Networks and the TCP/IP model

Data is sent over a network in **packets**. The TCP/IP model describes the layers that handle it:

| Layer | Function |
|---|---|
| Application | Encodes and decodes the message using protocols such as HTTP, FTP and SMTP. |
| Transport | Breaks the message into packets, numbers them and records the total; the receiver reassembles them in order and detects missing packets. |
| Network (internet) | Adds the sender's and receiver's IP addresses so packets can be routed across networks. |
| Data link | Handles the physical transfer of packets between nodes, and between one network and another. |

Some textbooks use the older seven-layer OSI model (application, presentation, session, transport, network, data link, physical); either is accepted if the layers are named and described.

**IP** is the general protocol for sending any data as packets across the internet. **VoIP** (Voice over IP) is a specific application of IP for voice and video calls. IP carries the packets; VoIP is what those packets are used for.

## Operating systems

The operating system manages the computer's resources so that programs do not have to:

- **Resource management** — allocates CPU time, memory, storage and input/output devices between processes.
- **File management** — organises files and folders, tracks where data is stored, and handles creating, reading, writing and deleting.
- **Process scheduling** — decides which process runs next and for how long.
- **Memory management** — allocates RAM, and moves data to virtual memory when RAM is full.
- **Security and access control** — manages users, permissions and protection.
- **Input/output and error handling** — provides drivers and reports hardware errors.
- **User interface** — provides a GUI or command line.

**Virtual memory** is an area of secondary storage used by the operating system when RAM is full. Access is much slower than RAM, so heavy use of virtual memory slows the computer.

## Memory and storage comparisons

| Pair | Difference |
|---|---|
| Cache vs RAM | Both are volatile and hold working data. Cache is smaller, faster and closer to the CPU, holding frequently reused instructions and data; RAM is larger and holds the programs and data currently in use. |
| RAM vs ROM | RAM is volatile and holds running programs and data; ROM is non-volatile and holds firmware such as the BIOS and bootstrap programs. |
| SSD vs HDD | SSD is faster, quieter, has no moving parts, uses less power and is more durable; HDD is cheaper per gigabyte, available in larger capacities, and can be overwritten more freely. |

**Cloud storage** offers access from anywhere, automatic backup, collaboration and low setup cost, but depends on connectivity, gives limited control, can incur ongoing costs and raises data-protection questions.

## How it's examined (2023–2026)

- **2023 Section A Q5 (6 marks):** name two TCP/IP layers and describe them — 2 marks for the names, 4 for the descriptions.
- **2025 Section A Q8 (6 marks):** distinguish IP from VoIP — 1 mark each for correct names, the rest for the distinction.
- **2025 Section A Q4 (6 marks):** explain two operating-system functions (resource management, file management) — 3 marks each.
- **2026 Section A Q2 (6 marks):** compare cache and RAM on purpose and speed — 3 marks per feature.
- **2024 Section A Q8 (6 marks):** give examples of what is stored in RAM and in ROM — 3 marks each.
- **2023 Section B Q14 (38 marks):** output devices, decode/execute, PC vs accumulator, ALU and control unit, CPU performance factors, SSD vs HDD, virtual memory, cloud advantages and disadvantages, business-analyst activities.
- **2025 Section A Q12 (6 marks):** CPU components and purposes.

**Answer shape:** name the layer/component, state its job, then say what would go wrong without it. For comparisons, give one difference in *purpose* and one in *performance*.
