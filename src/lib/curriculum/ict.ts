import type { SyllabusSeed } from './types';

/**
 * Cambridge IGCSE Information and Communication Technology 0417.
 *
 * Structured like the science syllabuses so every existing feature — practice,
 * exam mode, flashcards, progress tracking — works unchanged. The practical
 * chapters (documents, spreadsheets, databases, website authoring) are taught
 * here as principles and exam technique; they still require hands-on work in
 * real software, which this platform does not attempt to replace.
 */
export const ict0417: SyllabusSeed = {
  subject: {
    code: '0417',
    slug: 'ict',
    name: 'ICT',
    tagline: 'Hardware, networks, safety and the practical skills behind documents, data and the web.',
    accent: 'ict',
  },
  version: {
    code: '0417-2023-2025',
    label: 'ICT 0417 (for examination 2023-2025)',
    examFrom: 2023,
    examTo: 2025,
    provenance: 'TEACHER_MAPPED',
    sourceNote:
      'Chapter structure paraphrased from the published Cambridge IGCSE ICT 0417 specification. Not official Cambridge wording — always check the syllabus document.',
  },
  topics: [
    {
      number: '1',
      slug: 'types-and-components-of-computer-systems',
      title: 'Types and components of computer systems',
      summary: 'Hardware, software, the main components, and types of computer.',
      subtopics: [
        {
          number: '1.1',
          slug: 'hardware-and-software',
          title: 'Hardware, software and main components',
          summary: 'The difference between hardware and software, and what the CPU, RAM and ROM do.',
          objectives: [
            { code: '1.1.1', statement: 'Define hardware and software and identify the main components of a computer system.', tier: 'CORE' },
            { code: '1.1.2', statement: 'Describe the difference between RAM and ROM and the role of the CPU.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'hardware-and-software',
              title: 'Hardware, software and main components',
              readingMinutes: 5,
              body: `### Hardware and software
**Hardware** is the physical components of a computer system — things you can touch, such as the keyboard, monitor and hard disk.
**Software** is the programs that control the computer and tell the hardware what to do. It has no physical form.
Software splits into two kinds:
- **System software** — runs the computer itself: the operating system, device drivers, utilities and compilers.
- **Application software** — lets the user do a task: word processors, spreadsheets, browsers, games.
### The main internal components
- **CPU (central processing unit)** — processes data and executes instructions. Often called the "brain", it fetches, decodes and executes each instruction in turn.
- **RAM (random access memory)** — holds the data and programs **currently in use**. It is **volatile**: switch the power off and the contents are lost. RAM can be **read from and written to**.
- **ROM (read only memory)** — holds the start-up instructions (the bootstrap/BIOS). It is **non-volatile**: contents survive power loss. As the name says, it is normally only read from.
### Input, process, output, storage
Every system follows the same model: data is **input**, the CPU **processes** it, results are **output**, and data is kept in **storage** for later. Recognising which stage a device belongs to answers a lot of exam questions on its own.`,
              analogy: 'RAM is your desk and ROM is the instruction card screwed to the wall. You spread out whatever you are working on across the desk, and clearing the desk at the end of the day loses it — but the card on the wall is still there tomorrow to tell you how to start.',
              misconceptions: [
                'Calling RAM "memory" and the hard disk "storage" as if only one holds data. Both store data; the difference is volatility and speed.',
                'Thinking more RAM makes the CPU faster. More RAM lets more programs run at once without slowing down, but does not increase processing speed itself.',
                'Believing ROM and a hard disk are the same because both are non-volatile. ROM holds the fixed start-up instructions; the hard disk holds the user\'s files and installed programs.',
              ],
              examTips: [
                'When comparing RAM and ROM, give three contrasts: volatile vs non-volatile, read/write vs read-only, and what each holds (current work vs start-up instructions).',
                'If asked to classify software, say whether it is system or application software **and** give the reason — "it controls the hardware" or "it performs a task for the user".',
              ],
              workedExamples: [
                {
                  prompt: 'A computer loses all unsaved work when the power fails, but still starts up normally afterwards. Explain this using RAM and ROM.',
                  steps: ['Unsaved work is held in RAM while it is being used.', 'RAM is volatile, so its contents are lost when power is removed — hence the lost work.', 'The start-up instructions are held in ROM, which is non-volatile, so they survive and the machine can boot.'],
                  answer: 'The unsaved work was in volatile RAM, which loses its contents without power. The start-up instructions are in non-volatile ROM, which retains them, so the computer still boots.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define hardware.', back: 'The physical components of a computer system that you can touch.', difficulty: 'EASY' },
            { front: 'Define software.', back: 'The programs that control the computer and instruct the hardware what to do.', difficulty: 'EASY' },
            { front: 'Give two differences between RAM and ROM.', back: 'RAM is volatile and can be read from and written to; ROM is non-volatile and normally only read from.', difficulty: 'MEDIUM' },
            { front: 'What does the CPU do?', back: 'Processes data and executes program instructions by fetching, decoding and executing them.', difficulty: 'MEDIUM' },
            { front: 'Difference between system and application software?', back: 'System software runs the computer itself (e.g. the operating system); application software performs a task for the user (e.g. a word processor).', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain two differences between RAM and ROM. [2]',
              answer:
                'RAM is volatile, meaning its contents are lost when the power is switched off, whereas ROM is non-volatile and keeps its contents. RAM can be both read from and written to, whereas ROM is normally only read from.',
              markScheme: [
                'RAM is volatile / loses contents without power; ROM is non-volatile (1)',
                'RAM can be written to and read from; ROM is read-only (1)',
              ],
              marks: 2,
              explanation:
                'A third valid contrast is content: RAM holds programs and data currently in use, while ROM holds the start-up instructions the computer needs before anything is loaded.',
            },
          ],
        },
      ],
    },
    {
      number: '2',
      slug: 'input-and-output-devices',
      title: 'Input and output devices',
      summary: 'Choosing the right device for a task, and justifying it.',
      subtopics: [
        {
          number: '2.1',
          slug: 'input-and-output-devices',
          title: 'Input and output devices',
          summary: 'Common devices, direct data entry, and how to justify a choice.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '2.1.1', statement: 'Identify input and output devices and describe their uses.', tier: 'CORE' },
            { code: '2.1.2', statement: 'Justify the choice of device for a given application, including direct data entry.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'input-and-output-devices',
              title: 'Input and output devices',
              readingMinutes: 5,
              body: `### Input devices
Devices that put data **into** the system: keyboard, mouse, touchpad, scanner, digital camera, microphone, sensors, and direct data entry devices.
**Direct data entry (DDE)** devices read data automatically without typing, which makes them fast and accurate:
- **Barcode reader** — supermarket checkouts and stock control.
- **OMR (optical mark reader)** — reads pencil marks on multiple-choice answer sheets and questionnaires.
- **OCR (optical character recognition)** — converts printed or written text into editable text.
- **MICR (magnetic ink character recognition)** — reads the numbers on the bottom of cheques; very hard to forge.
- **RFID** — contactless tags for stock, passports and payment cards.
**Sensors** input physical data continuously: temperature, pressure, light, motion, humidity, pH. They are essential in monitoring and control systems.
### Output devices
Devices that present results: monitor, printer (laser for speed and volume, inkjet for low-cost colour photos, 3D for prototypes), speakers, projectors, and **actuators** such as motors and buzzers in control systems.
### Justifying a choice
This is where marks are won. Never just name the device — say **why** it suits the situation:
- Barcode reader at a checkout: **fast** and **fewer errors** than typing a product code.
- Touchscreen at an information kiosk: **intuitive**, needs no separate keyboard, **robust** in public use.
- Laser printer in an office: **fast**, **high volume**, **low cost per page**.`,
              analogy: 'Choosing an input device is like choosing a tool to open a bottle. A screwdriver might eventually work, but the question is never "can it?" — it is "which is fastest, most accurate, and suited to who is using it?"',
              misconceptions: [
                'Thinking a touchscreen is only an input device. It is **both** input and output, which is exactly why it is used where space is limited.',
                'Confusing OMR and OCR. OMR reads the *position* of marks; OCR recognises the *shapes* of characters as text.',
                'Naming a device without justification. Exam marks for device questions are almost always for the reason, not the name.',
              ],
              examTips: [
                'Answer "give a suitable device and justify your choice" in two parts: the device, then at least two reasons tied to that specific scenario (speed, accuracy, cost, durability, ease of use).',
                'For sensor questions, name the specific sensor type — "temperature sensor", not just "a sensor".',
              ],
              workedExamples: [
                {
                  prompt: 'A supermarket wants to record which items customers buy at the checkout. Name a suitable input device and justify your choice.',
                  steps: ['The items already carry printed barcodes, so a barcode reader can read them directly.', 'Reading is much faster than typing a product code by hand.', 'It also avoids typing errors, so stock records and prices stay accurate.'],
                  answer: 'A barcode reader — it reads the existing barcode automatically, which is far faster than keying in codes and greatly reduces data entry errors.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does OMR stand for and what does it read?', back: 'Optical mark reader — reads the position of pencil marks, e.g. on multiple-choice answer sheets.', difficulty: 'MEDIUM' },
            { front: 'What does OCR do?', back: 'Optical character recognition converts printed or handwritten text into editable digital text.', difficulty: 'MEDIUM' },
            { front: 'Where is MICR used and why?', back: 'On cheques — the magnetic ink characters are very difficult to forge and can be read reliably.', difficulty: 'HARD' },
            { front: 'Give two advantages of direct data entry.', back: 'It is much faster than typing, and it greatly reduces data entry errors.', difficulty: 'MEDIUM' },
            { front: 'Name an output device used in a control system.', back: 'An actuator such as a motor, buzzer, heater or valve.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which input device is most suitable for automatically marking multiple-choice examination answer sheets?',
              options: [
                { id: 'a', text: 'OMR (optical mark reader)', why: '' },
                { id: 'b', text: 'MICR', why: 'MICR reads magnetic ink characters on cheques, not pencil marks.' },
                { id: 'c', text: 'Barcode reader', why: 'A barcode reader reads barcodes, not marks in answer boxes.' },
                { id: 'd', text: 'Keyboard', why: 'Typing every answer manually would be slow and error-prone, defeating the purpose of automation.' },
              ],
              answer: 'a',
              markScheme: ['OMR / optical mark reader (1)'],
              marks: 1,
              explanation:
                'OMR detects the position of pencil marks on a pre-printed sheet, so thousands of papers can be marked quickly and consistently without human reading.',
            },
          ],
        },
      ],
    },
    {
      number: '3',
      slug: 'storage-devices-and-media',
      title: 'Storage devices and media',
      summary: 'Magnetic, optical and solid-state storage, and backups.',
      subtopics: [
        {
          number: '3.1',
          slug: 'storage-devices',
          title: 'Storage devices, media and backups',
          summary: 'The three storage types, how they compare, and why backups matter.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '3.1.1', statement: 'Describe magnetic, optical and solid-state storage and compare their characteristics.', tier: 'CORE' },
            { code: '3.1.2', statement: 'Explain the purpose of backups and appropriate backup media.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'storage-devices',
              title: 'Storage devices, media and backups',
              readingMinutes: 5,
              body: `### The three technologies
**Magnetic** — hard disk drives (HDD), magnetic tape. Data is stored as magnetised patterns on a spinning platter or tape. Very large capacity and low cost per gigabyte, but contains **moving parts**, so it is slower and vulnerable to physical shock.
**Optical** — CD, DVD, Blu-ray. Data is read by a laser detecting pits and lands. Cheap and portable, but comparatively small capacity and easily scratched.
**Solid state** — SSD, USB flash drive, memory card. Data is stored electronically in flash memory with **no moving parts**, so it is fast, silent, robust and power-efficient. The trade-off is a higher cost per gigabyte and a finite number of write cycles.
### Choosing between them
Match the property to the need: an SSD in a laptop for **speed and durability**; a large HDD or tape for **cheap bulk storage** and archiving; optical discs for **distributing** software or films cheaply.
### Backups
A **backup** is a second copy of data kept so it can be restored if the original is lost through hardware failure, accidental deletion, theft, fire or a malware attack.
Good practice: keep backups **off-site** or in the cloud so one fire or burglary cannot destroy both copies, back up **regularly and automatically**, and occasionally **test** that a restore actually works.
Note the distinction from an archive: a **backup** duplicates data still in use, whereas an **archive** moves data that is no longer needed day to day into long-term storage.`,
              analogy: 'A backup kept next to the computer is like a spare key kept in the same pocket as the original. It solves the problem of losing one key, but not the problem of losing the pocket.',
              misconceptions: [
                'Thinking a backup on the same hard disk counts. If the disk fails, both copies go — a backup must be on separate media.',
                'Believing SSDs are simply "better". They are faster and more robust, but cost more per gigabyte, which is why bulk archives still use magnetic media.',
                'Confusing backup with archive. Backups are copies of live data; archives are long-term storage of data no longer in active use.',
              ],
              examTips: [
                'When comparing storage, use the standard criteria: capacity, speed, cost per gigabyte, portability and durability. Answering across those five reliably earns the marks.',
                'For backup questions, always include where the backup is kept — "off-site or in the cloud" is frequently a separate marking point.',
              ],
              workedExamples: [
                {
                  prompt: 'A company stores customer records on a server in its office. Explain why it should keep a backup off-site.',
                  steps: ['A backup protects against data loss from hardware failure, deletion or malware.', 'If the backup is kept in the same building, a fire, flood or theft would destroy both the original and the backup.', 'Keeping it off-site or in the cloud means the data survives an event affecting the office.'],
                  answer: 'Because a fire, flood or theft at the office would destroy the original and an on-site backup together. An off-site or cloud backup survives such an event, so the records can still be restored.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Name the three main storage technologies.', back: 'Magnetic (HDD, tape), optical (CD/DVD/Blu-ray) and solid state (SSD, flash drive).', difficulty: 'EASY' },
            { front: 'Give two advantages of an SSD over an HDD.', back: 'Faster access and no moving parts, so it is more robust, quieter and uses less power.', difficulty: 'MEDIUM' },
            { front: 'Give one disadvantage of an SSD.', back: 'Higher cost per gigabyte (and a finite number of write cycles).', difficulty: 'MEDIUM' },
            { front: 'Why should backups be stored off-site?', back: 'So a fire, flood or theft at the main site cannot destroy the original and the backup together.', difficulty: 'MEDIUM' },
            { front: 'Difference between a backup and an archive?', back: 'A backup is a copy of data still in use; an archive is long-term storage of data no longer needed day to day.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A laptop manufacturer replaces hard disk drives with solid state drives. Give two advantages and one disadvantage of this change. [3]',
              answer:
                'Advantages: an SSD has no moving parts so it is much more resistant to damage if the laptop is dropped, and it accesses data far faster so the laptop starts up and loads files more quickly. Disadvantage: SSDs cost more per gigabyte, so the laptop either costs more or offers less storage capacity.',
              markScheme: [
                'Advantage — no moving parts, so more durable/robust (or quieter, lower power) (1)',
                'Advantage — faster access/read-write speeds (1)',
                'Disadvantage — higher cost per gigabyte / smaller capacity for the same price (1)',
              ],
              marks: 3,
              explanation:
                'Durability is the strongest argument specifically for a *laptop*, because portable devices get knocked about — tying the advantage to the context is what lifts an answer.',
            },
          ],
        },
      ],
    },
    {
      number: '4',
      slug: 'networks',
      title: 'Networks and the effects of using them',
      summary: 'LANs and WANs, network hardware, and the internet.',
      subtopics: [
        {
          number: '4.1',
          slug: 'networks-and-network-hardware',
          title: 'Networks, network hardware and the internet',
          summary: 'LAN versus WAN, the devices that connect them, and intranet versus internet.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '4.1.1', statement: 'Describe LANs, WLANs and WANs and the hardware needed to build a network.', tier: 'CORE' },
            { code: '4.1.2', statement: 'Distinguish between the internet, an intranet and an extranet.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'networks-and-network-hardware',
              title: 'Networks, network hardware and the internet',
              readingMinutes: 6,
              body: `### Types of network
- **LAN (local area network)** — covers a small geographical area such as one building or site, typically owned by one organisation.
- **WLAN** — a wireless LAN, using radio rather than cables.
- **WAN (wide area network)** — covers a large geographical area, often connecting LANs in different cities or countries. The internet is the largest WAN.
### Network hardware
- **NIC (network interface card)** — lets a device connect to a network; each has a unique **MAC address**.
- **Switch** — connects devices within a LAN and sends data **only to the intended recipient**, using MAC addresses.
- **Router** — connects **different networks** together and directs data between them using IP addresses. It is the device that joins a home LAN to the internet.
- **Hub** — an older device that broadcasts data to **every** connected device, which wastes bandwidth and is less secure than a switch.
- **Modem** — converts digital signals to analogue and back for transmission over telephone lines.
- **WAP (wireless access point)** — allows wireless devices to join a wired network.
### Internet, intranet and extranet
- **Internet** — the global public network of interconnected networks, open to everyone.
- **Intranet** — a **private** network within one organisation, using the same web technologies but accessible only to its members. Used for internal notices, documents and systems.
- **Extranet** — an intranet extended to allow controlled access by selected outsiders, such as suppliers or customers.
### Wired versus wireless
**Wired** is generally faster, more reliable and more secure, as an intruder needs physical access. **Wireless** offers mobility and avoids cabling costs, but signals can be intercepted and are weakened by distance and walls.`,
              analogy: 'A switch is a postal sorter that reads each envelope and delivers only to the right door; a hub is someone reading every letter aloud in the corridor. Both get the message through — one of them tells everybody.',
              misconceptions: [
                'Using "internet" and "World Wide Web" as synonyms. The internet is the global network infrastructure; the web is one service running on it, alongside email and file transfer.',
                'Confusing switch and router. A switch connects devices *within* one network; a router connects *between* networks.',
                'Thinking an intranet is simply "a small internet". It is private and restricted to one organisation, which is the defining feature.',
              ],
              examTips: [
                'For "give two differences between a LAN and a WAN", contrast geographical area covered and ownership, and optionally transmission speed and cost.',
                'Security questions about wireless expect a specific mitigation — encryption, a strong password, WPA, or MAC address filtering — not just "make it secure".',
              ],
              workedExamples: [
                {
                  prompt: 'A school wants staff to access internal documents and policies, but not allow the public to see them. Which type of network should it use, and why?',
                  steps: ['The requirement is access limited to members of one organisation.', 'An intranet is a private network using web technologies, accessible only within the organisation.', 'The internet would make the documents publicly available, which is not wanted.'],
                  answer: 'An intranet — it uses familiar web technology but is private to the school, so only staff can reach the documents while the public cannot.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Difference between a LAN and a WAN?', back: 'A LAN covers a small area such as one site; a WAN covers a large geographical area, often connecting LANs across cities or countries.', difficulty: 'MEDIUM' },
            { front: 'What does a router do?', back: 'Connects different networks together and directs data between them using IP addresses.', difficulty: 'MEDIUM' },
            { front: 'Difference between a switch and a hub?', back: 'A switch sends data only to the intended recipient; a hub broadcasts it to every connected device.', difficulty: 'HARD' },
            { front: 'What is an intranet?', back: 'A private network within one organisation, using web technologies but accessible only to its members.', difficulty: 'MEDIUM' },
            { front: 'Give two advantages of a wired network over wireless.', back: 'Generally faster and more reliable, and more secure since physical access is needed to intercept data.', difficulty: 'MEDIUM' },
            { front: 'What is a MAC address?', back: 'A unique identifier assigned to a network interface card.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain two differences between an intranet and the internet. [2]',
              answer:
                'An intranet is private and can only be accessed by members of one organisation, whereas the internet is public and can be accessed by anyone. An intranet contains information relevant to that organisation only, while the internet contains information published worldwide by many organisations and individuals.',
              markScheme: [
                'Intranet is private/restricted to one organisation; internet is public/open to all (1)',
                'Intranet holds internal organisational information; internet holds globally published information (1)',
              ],
              marks: 2,
              explanation:
                'A further valid difference is control: an organisation controls and can moderate everything on its intranet, whereas no single body controls the content of the internet.',
            },
          ],
        },
      ],
    },
    {
      number: '5',
      slug: 'effects-of-using-it',
      title: 'The effects of using IT',
      summary: 'Effects on employment, working patterns and health.',
      subtopics: [
        {
          number: '5.1',
          slug: 'effects-on-work-and-health',
          title: 'Effects on employment, working patterns and health',
          summary: 'How IT changes jobs and how to work safely.',
          objectives: [
            { code: '5.1.1', statement: 'Describe the effects of IT on employment and working patterns.', tier: 'CORE' },
            { code: '5.1.2', statement: 'Describe health issues associated with IT use and how to reduce them.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'effects-on-work-and-health',
              title: 'Effects on employment, working patterns and health',
              readingMinutes: 5,
              body: `### Effects on employment
IT **removes** some jobs — particularly repetitive manual and clerical roles replaced by robots and automated systems — while **creating** others: network managers, programmers, technicians, data analysts and web designers.
The result is not simply "fewer jobs" but a **shift** in the skills demanded, which is why retraining matters so much. Workers displaced by automation often cannot move directly into the new roles without it.
### Changing working patterns
- **Teleworking (working from home)** — saves commuting time and cost and offers flexibility, but can be isolating, blurs work and home life, and needs self-discipline and reliable equipment.
- **Flexible hours, part-time and job sharing** — made practical by shared systems that let several people work on the same files at different times.
- **Compressed hours** — the same weekly hours worked in fewer, longer days.
For employers, teleworking cuts office costs; against that, it is harder to supervise staff and to build a team culture.
### Health issues and their prevention
Each health risk pairs with a specific, examinable prevention:
| Problem | Cause | Prevention |
|---|---|---|
| **RSI** (repetitive strain injury) | prolonged typing/mouse use | wrist rest, ergonomic keyboard, regular breaks |
| **Back and neck pain** | poor posture, bad seating | adjustable chair, correct screen height, footrest |
| **Eye strain / headaches** | staring at a screen, glare | anti-glare screen, regular breaks, look at distant objects, good lighting |
| **Deep vein thrombosis** | sitting still for long periods | get up and move regularly |
Note that **safety** issues are different from health issues: trailing cables (trip hazard), overloaded sockets (fire), and drinks near equipment (electrocution) are safety risks, and exam questions often ask specifically for one or the other.`,
              analogy: 'Automation moves the workforce rather than shrinking it, much as the car did to the horse trade: far fewer stable hands, but a whole new industry of mechanics — no comfort at all to a stable hand who cannot retrain.',
              misconceptions: [
                'Claiming IT only destroys jobs. It removes some categories while creating others, and the real issue is the mismatch in skills.',
                'Mixing up health and safety. Health issues develop over time from how you work (RSI, eye strain); safety issues are immediate physical dangers (trip hazards, fire, electrocution).',
                'Giving vague prevention such as "sit properly". Name the measure: an adjustable chair, a footrest, an anti-glare filter.',
              ],
              examTips: [
                'Pair each health problem with a specific prevention. A list of problems alone typically scores half the available marks.',
                'For evaluation questions on teleworking, give the employee view and the employer view — they are different, and questions often specify which.',
              ],
              workedExamples: [
                {
                  prompt: 'An office worker develops repetitive strain injury. Explain the likely cause and give two ways it could have been prevented.',
                  steps: ['RSI is caused by repeated small movements over long periods, such as continuous typing and mouse use without rest.', 'Taking regular breaks allows the muscles and tendons to recover.', 'Using a wrist rest and an ergonomic keyboard supports the wrists in a natural position, reducing strain.'],
                  answer: 'It is caused by prolonged repetitive typing and mouse use. It could be prevented by taking regular breaks, and by using a wrist rest and ergonomic keyboard to support correct wrist posture.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give one advantage and one disadvantage of teleworking for the employee.', back: 'Advantage: no commuting and flexible hours. Disadvantage: isolation and difficulty separating work from home life.', difficulty: 'MEDIUM' },
            { front: 'What causes RSI and how is it prevented?', back: 'Prolonged repetitive typing or mouse use; prevented by regular breaks, wrist rests and ergonomic keyboards.', difficulty: 'MEDIUM' },
            { front: 'How can eye strain be reduced?', back: 'Use an anti-glare screen, take regular breaks, look at distant objects, and ensure suitable lighting.', difficulty: 'MEDIUM' },
            { front: 'Give two safety (not health) risks in a computer room.', back: 'Trailing cables causing trips, and overloaded sockets causing fire (also drinks near equipment causing electrocution).', difficulty: 'HARD' },
            { front: 'Name two jobs created by increased use of IT.', back: 'Any two of: network manager, programmer, technician, web designer, data analyst.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Describe two health problems caused by prolonged computer use and state how each can be prevented. [4]',
              answer:
                'Repetitive strain injury is caused by long periods of repetitive typing and mouse use; it can be prevented by taking regular breaks and using a wrist rest or ergonomic keyboard. Eye strain and headaches are caused by staring at a screen for long periods and by glare; these can be prevented by using an anti-glare filter, ensuring good lighting, and taking regular breaks to focus on distant objects.',
              markScheme: [
                'Health problem 1 identified with its cause, e.g. RSI from repetitive typing (1)',
                'Valid prevention for problem 1, e.g. regular breaks / wrist rest (1)',
                'Health problem 2 identified with its cause, e.g. eye strain from screen glare (1)',
                'Valid prevention for problem 2, e.g. anti-glare screen / regular breaks (1)',
              ],
              marks: 4,
              explanation:
                'Each problem must be paired with its own prevention. Listing four problems and no preventions, or vice versa, halves the mark.',
              hint: 'Structure it as problem — cause — prevention, twice.',
            },
          ],
        },
      ],
    },
    {
      number: '6',
      slug: 'ict-applications',
      title: 'ICT applications',
      summary: 'Communication, modelling, control systems, banking and expert systems.',
      subtopics: [
        {
          number: '6.1',
          slug: 'control-and-monitoring-systems',
          title: 'Monitoring, measurement and control systems',
          summary: 'How sensors, microprocessors and actuators work together.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '6.1.1', statement: 'Describe monitoring and control systems using sensors and microprocessors.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'control-and-monitoring-systems',
              title: 'Monitoring, measurement and control systems',
              readingMinutes: 5,
              body: `Both kinds of system read the physical world with **sensors**. The difference is what happens next.
### Monitoring versus control
In a **monitoring** system the computer records and reports the readings, but **takes no action** — a weather station, or a hospital monitor displaying a patient's heart rate and sounding an alarm for a nurse.
In a **control** system the computer compares readings to preset values and **acts automatically** through **actuators** — a central heating system switching a boiler on, or a greenhouse opening a window.
The distinction is the exam question: monitoring reports; control changes something.
### How a control system works
1. **Sensors** continuously measure a physical quantity, e.g. temperature.
2. The reading is analogue, so an **ADC (analogue-to-digital converter)** turns it into digital data the microprocessor can use.
3. The **microprocessor** compares the value with the stored **preset value**.
4. If the value is outside the acceptable range, the microprocessor sends a signal to an **actuator** — a heater, motor, valve or buzzer — to correct it.
5. The process repeats **continuously** in a loop.
### Why it is better than a person doing it
It runs **continuously**, day and night without tiring; it responds **faster** and more consistently; readings are **more accurate**; and it can operate in environments dangerous to humans.
Against that, it is expensive to install, and a sensor fault or power failure can cause the whole system to fail.`,
              analogy: 'A monitoring system is a thermometer; a control system is a thermostat. One tells you the room is cold, the other does something about it — and only the second closes the loop.',
              misconceptions: [
                'Saying a monitoring system "controls" something. If no actuator acts on the result, it is monitoring only.',
                'Forgetting the ADC. Sensors produce analogue signals and computers need digital data, so the conversion step is a genuine marking point.',
                'Describing the process as happening once. Control systems run in a continuous loop, constantly re-reading and re-comparing.',
              ],
              examTips: [
                'Describe control systems as a numbered loop: sensor reads → ADC converts → microprocessor compares with preset value → actuator acts → repeat. Include the word "continuously".',
                'Name the specific sensor and the specific actuator for the scenario given — "temperature sensor" and "heater", not "a sensor" and "a device".',
              ],
              workedExamples: [
                {
                  prompt: 'Describe how a computerised system keeps a greenhouse at a constant temperature.',
                  steps: ['A temperature sensor continuously measures the air temperature inside the greenhouse.', 'The analogue reading is converted to digital by an ADC and sent to the microprocessor.', 'The microprocessor compares the value with the stored preset temperature.', 'If the temperature is too high it signals an actuator to open a window or start a fan; if too low it switches on a heater.', 'The cycle repeats continuously so the temperature is held near the preset value.'],
                  answer: 'A temperature sensor reads the air temperature, an ADC converts it to digital, the microprocessor compares it with a preset value, and it signals actuators (heater, fan or window motor) to correct any difference — repeating continuously.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Difference between a monitoring and a control system?', back: 'Monitoring records and reports readings but takes no action; control compares readings with preset values and acts automatically via actuators.', difficulty: 'HARD' },
            { front: 'Why is an ADC needed in a control system?', back: 'Sensors produce analogue signals, but the microprocessor can only process digital data.', difficulty: 'HARD' },
            { front: 'What is an actuator?', back: 'An output device that performs a physical action, such as a motor, heater, valve or buzzer.', difficulty: 'MEDIUM' },
            { front: 'Give two advantages of computer control over human control.', back: 'It runs continuously without tiring and responds faster and more consistently, with more accurate readings.', difficulty: 'MEDIUM' },
            { front: 'What does the microprocessor compare the sensor reading with?', back: 'A stored preset value (or acceptable range).', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'A system uses sensors to record air quality in a city and displays the readings on a website. No equipment is switched on or off. What type of system is this?',
              options: [
                { id: 'a', text: 'A monitoring system', why: '' },
                { id: 'b', text: 'A control system', why: 'A control system acts automatically through actuators; here nothing is switched on or off.' },
                { id: 'c', text: 'An expert system', why: 'An expert system uses a knowledge base and inference engine to give advice, not sensor readings.' },
                { id: 'd', text: 'A batch processing system', why: 'Batch processing runs collected jobs together later; this system reports readings continuously.' },
              ],
              answer: 'a',
              markScheme: ['Monitoring system (1)'],
              marks: 1,
              explanation:
                'The defining test is whether an actuator acts on the result. Readings are recorded and displayed but nothing is physically changed, so it monitors rather than controls.',
            },
          ],
        },
      ],
    },
    {
      number: '7',
      slug: 'systems-life-cycle',
      title: 'The systems life cycle',
      summary: 'Analysis, design, development, testing, implementation and documentation.',
      subtopics: [
        {
          number: '7.1',
          slug: 'systems-life-cycle',
          title: 'Stages of the systems life cycle',
          summary: 'How a new system is analysed, built, tested and introduced.',
          objectives: [
            { code: '7.1.1', statement: 'Describe the stages of the systems life cycle, including methods of implementation and testing.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'systems-life-cycle',
              title: 'Stages of the systems life cycle',
              readingMinutes: 6,
              body: `### The stages
1. **Analysis** — study the current system and identify what the new one must do. Methods of collecting information: **observation**, **interviews**, **questionnaires** and **examining existing documents**.
2. **Design** — plan the data capture forms, screen layouts, report layouts, file/data structures, validation rules and system flowcharts.
3. **Development and testing** — build it and test with three deliberate categories of test data.
4. **Implementation** — introduce the new system.
5. **Documentation** — write the user and technical guides.
6. **Evaluation and maintenance** — check it meets the requirements and fix problems as they arise.
### Test data — a guaranteed exam question
- **Normal data** — values that should be **accepted**, e.g. age 25 where the valid range is 0-100.
- **Abnormal (erroneous) data** — values that should be **rejected**, e.g. age 150 or the word "cat".
- **Extreme (boundary) data** — the values at the very edge of the valid range that should be accepted, e.g. exactly 0 and exactly 100.
Extreme data is the one candidates forget, and it is where off-by-one errors actually hide.
### Methods of implementation
- **Direct changeover** — stop the old system, start the new one immediately. Fast and cheap, but if the new system fails there is nothing to fall back on.
- **Parallel running** — run both systems together for a period. Safe, since results can be compared and the old system is a fallback, but expensive and duplicates work.
- **Phased implementation** — introduce the new system one part at a time. Problems affect only one part, but takes longer.
- **Pilot running** — introduce it fully in one branch or department first. Problems affect only that site, but that site carries the risk.
### Documentation
**User documentation** helps the person operating the system: how to load it, input data, print reports, and troubleshoot.
**Technical documentation** helps whoever maintains it: program listings, file structures, flowcharts, validation routines and hardware requirements.`,
              analogy: 'Choosing an implementation method is like changing a bridge. Direct changeover demolishes the old bridge on the same day the new one opens; parallel running keeps both standing until you are certain the new one holds.',
              misconceptions: [
                'Thinking extreme data means invalid data. Extreme data sits **on the boundary** and should be **accepted**; abnormal data should be rejected.',
                'Confusing user and technical documentation. User documentation is for operating the system; technical documentation is for maintaining it.',
                'Assuming parallel running is always best. It is the safest but the most expensive, and questions usually reward the trade-off, not a fixed answer.',
              ],
              examTips: [
                'For any test data question, give an actual example value for each of the three categories and say whether it should be accepted or rejected.',
                'When asked to justify an implementation method, tie it to the risk in that scenario — a hospital or bank would never use direct changeover, because failure is unacceptable.',
              ],
              workedExamples: [
                {
                  prompt: 'A field accepts a percentage mark from 0 to 100. Give an example of normal, abnormal and extreme test data.',
                  steps: ['Normal data is a typical value inside the range that should be accepted, such as 57.', 'Abnormal data should be rejected — either outside the range, such as 150, or the wrong data type, such as "abc".', 'Extreme data is at the boundary of the accepted range and should be accepted: 0 and 100.'],
                  answer: 'Normal: 57 (accepted). Abnormal: 150 or "abc" (rejected). Extreme: 0 and 100 (accepted, as they are the boundary values).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Name four methods of collecting information during analysis.', back: 'Observation, interviews, questionnaires, and examining existing documents.', difficulty: 'MEDIUM' },
            { front: 'What is extreme test data?', back: 'Data at the boundary of the acceptable range, which should be accepted (e.g. 0 and 100 for a 0-100 field).', difficulty: 'HARD' },
            { front: 'What is abnormal test data?', back: 'Data outside the acceptable range or of the wrong type, which should be rejected.', difficulty: 'MEDIUM' },
            { front: 'Give one advantage and one disadvantage of parallel running.', back: 'Advantage: the old system is a fallback and results can be compared. Disadvantage: expensive, as work is duplicated.', difficulty: 'HARD' },
            { front: 'Give one risk of direct changeover.', back: 'If the new system fails there is no old system to fall back on, so operations could stop entirely.', difficulty: 'MEDIUM' },
            { front: 'What goes in technical documentation?', back: 'Program listings, file structures, flowcharts, validation routines and hardware requirements — for whoever maintains the system.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A hospital is replacing its patient records system. Explain why parallel running would be more suitable than direct changeover. [3]',
              answer:
                'In parallel running both the old and new systems operate together for a period, so if the new system fails or produces errors the old system is still available and patient records remain accessible. The outputs of the two systems can be compared to check the new one is working correctly before relying on it. With direct changeover the old system stops immediately, so any failure would leave the hospital with no access to patient records, which could endanger patients.',
              markScheme: [
                'Both systems run together, so the old system acts as a fallback if the new one fails (1)',
                'Outputs can be compared to verify the new system is correct (1)',
                'Direct changeover risks total loss of access to records, which is unacceptable in a hospital (1)',
              ],
              marks: 3,
              explanation:
                'The context drives the answer. Parallel running costs more and duplicates work, but where failure risks lives that cost is clearly justified — an answer that ignores the hospital setting misses the point.',
              hint: 'What happens in each method if the new system fails on day one?',
            },
          ],
        },
      ],
    },
    {
      number: '8',
      slug: 'safety-and-security',
      title: 'Safety and security',
      summary: 'Physical safety, e-safety, data protection and security threats.',
      subtopics: [
        {
          number: '8.1',
          slug: 'security-threats-and-protection',
          title: 'Security threats and protection',
          summary: 'Malware, phishing, hacking, and how data is kept safe.',
          prerequisites: ['4.1'],
          objectives: [
            { code: '8.1.1', statement: 'Describe security threats including malware, phishing, pharming and hacking.', tier: 'CORE' },
            { code: '8.1.2', statement: 'Describe methods of protecting data, including encryption, firewalls and authentication.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'security-threats-and-protection',
              title: 'Security threats and protection',
              readingMinutes: 6,
              body: `### The threats
- **Virus** — a program that replicates itself and can corrupt or delete files. It needs a host file and usually a user action to spread.
- **Spyware / key-logging software** — secretly records keystrokes to capture passwords and card numbers.
- **Phishing** — a **fake email or message** pretending to be from a legitimate organisation, tricking the user into clicking a link and entering personal details.
- **Pharming** — **malicious code redirects** the user to a fake website even when they type the correct address. It is more dangerous than phishing because the user does nothing wrong.
- **Hacking** — gaining unauthorised access to a computer system.
- **Spam** — unsolicited bulk email; mostly a nuisance, but a common carrier for the above.
The phishing/pharming distinction is examined constantly: **phishing needs you to take the bait; pharming redirects you without your involvement.**
### Protection methods
- **Firewall** — monitors incoming and outgoing traffic and blocks anything not meeting the security rules; sits between the network and the outside world.
- **Anti-virus / anti-spyware software** — scans for known malware and quarantines or removes it. Must be **kept up to date** to recognise new threats.
- **Encryption** — scrambles data so that if it is intercepted it cannot be understood without the key. Note carefully: encryption does **not stop** interception, it makes intercepted data useless.
- **Authentication** — proving who you are: strong passwords, **biometrics** (fingerprint, retina, face), **two-factor authentication**, and physical tokens.
- **Access rights** — limiting each user to only the data their role requires, so a breach of one account exposes less.
### Strong passwords
Long, mixing upper and lower case, digits and symbols, avoiding dictionary words and personal information, changed regularly and never reused across sites.`,
              analogy: 'Encryption is writing your diary in a private code. It does not stop someone taking the diary — it stops the theft mattering, which is precisely the point when data travels across networks you do not control.',
              misconceptions: [
                'Saying encryption "stops hackers accessing data". It does not prevent access or interception; it makes the intercepted data unreadable.',
                'Confusing phishing and pharming. Phishing requires the victim to respond to a fake message; pharming redirects them automatically via malicious code.',
                'Believing a firewall removes viruses. A firewall filters network traffic; anti-virus software detects and removes malware already present.',
              ],
              examTips: [
                'Define phishing and pharming by their *mechanism*, not just "a scam". The marks are for the fake email versus the automatic redirection.',
                'When asked how to keep data safe, give a mix of technical measures (firewall, encryption, anti-virus) and human ones (strong passwords, staff training, access rights).',
              ],
              workedExamples: [
                {
                  prompt: 'A bank encrypts customer data sent over the internet. Explain how this protects the customer if the data is intercepted.',
                  steps: ['Encryption scrambles the data into a form that cannot be understood without the decryption key.', 'If a hacker intercepts the transmission, they receive only the scrambled version.', 'Without the key they cannot convert it back into meaningful information, so the customer\'s details remain private.'],
                  answer: 'The data is scrambled before transmission, so an interceptor obtains only meaningless ciphertext. Without the decryption key it cannot be read, so the customer\'s details stay secure even though the data was intercepted.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is phishing?', back: 'A fake email or message pretending to be from a legitimate organisation, tricking the user into revealing personal details.', difficulty: 'MEDIUM' },
            { front: 'What is pharming?', back: 'Malicious code that redirects a user to a fake website even when the correct address is typed.', difficulty: 'HARD' },
            { front: 'What does a firewall do?', back: 'Monitors incoming and outgoing network traffic and blocks anything that does not meet the security rules.', difficulty: 'MEDIUM' },
            { front: 'Does encryption prevent data being intercepted?', back: 'No — it makes intercepted data unreadable without the decryption key.', difficulty: 'HARD' },
            { front: 'Give three features of a strong password.', back: 'Long, mixes upper and lower case with digits and symbols, and avoids dictionary words or personal information.', difficulty: 'MEDIUM' },
            { front: 'What is two-factor authentication?', back: 'Proving identity using two separate methods, e.g. a password plus a code sent to a phone.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain the difference between phishing and pharming. [2]',
              answer:
                'In phishing, the user receives a fake email or message appearing to come from a legitimate organisation, and is tricked into clicking a link and entering personal details. In pharming, malicious code installed on the computer or server redirects the user to a fake website automatically, even when they type the correct web address themselves.',
              markScheme: [
                'Phishing — a fake email/message tricks the user into giving details (1)',
                'Pharming — malicious code redirects the user to a fake site without them responding to a message (1)',
              ],
              marks: 2,
              explanation:
                'Pharming is the more dangerous of the two precisely because the user behaves correctly — they type the real address and are still sent to the fraudulent site.',
            },
          ],
        },
      ],
    },
    {
      number: '9',
      slug: 'audience-and-communication',
      title: 'Audience',
      summary: 'Audience appreciation, copyright, and communicating appropriately.',
      subtopics: [
        {
          number: '9.1',
          slug: 'audience-and-copyright',
          title: 'Audience, copyright and software licensing',
          summary: 'Designing for the right audience, and respecting copyright.',
          objectives: [
            { code: '9.1.1', statement: 'Explain the importance of audience appreciation when creating an ICT solution.', tier: 'CORE' },
            { code: '9.1.2', statement: 'Describe copyright legislation and types of software licensing.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'audience-and-copyright',
              title: 'Audience, copyright and software licensing',
              readingMinutes: 5,
              body: `### Audience appreciation
Before creating anything, identify who will use it — their **age**, **prior knowledge**, **interests**, **reading level** and any **accessibility needs**. Everything then follows:
- A presentation for young children needs **large text**, **bright colours**, **simple language** and plenty of images.
- The same content for professionals needs **precise terminology**, **detailed data**, and a restrained, formal style.
Ignoring the audience is the most common reason a technically competent solution fails: it may be accurate and still unusable.
### Accessibility
Consider users with visual impairments (large fonts, high contrast, screen-reader compatibility, **alt text** on images), hearing impairments (subtitles on video), and motor difficulties (keyboard navigation, large click targets).
### Copyright
**Copyright** protects the creator's work — software, images, music, text — from being copied or used without permission. Under copyright legislation it is illegal to:
- copy software, music or films without permission;
- use someone's images or text in your own work without permission or attribution;
- share licensed software with others or use one licence on more machines than allowed.
Material found through a web search is **not** free to use simply because it is visible. Use images licensed for reuse, or your own, and acknowledge sources.
### Software licensing
- **Commercial / proprietary** — paid for, with restrictions on copying and installation.
- **Freeware** — free to use, but the source code is not available and it remains copyrighted.
- **Shareware** — free to try for a limited period or with limited features; payment is required for the full version.
- **Open source** — the source code is available and may be modified and redistributed under the licence terms.
Note the distinction candidates most often miss: **freeware is free but closed**; **open source is about access to the code**, not merely price.`,
              analogy: 'Publishing without considering the audience is cooking a meal without asking who is eating. The food may be excellent and still be wrong — too spicy for a child, too plain for a critic.',
              misconceptions: [
                'Thinking anything on the internet is free to copy. Visibility is not permission; copyright applies unless the licence says otherwise.',
                'Treating freeware and open source as the same. Freeware costs nothing but hides its source code; open source publishes the source code and allows modification.',
                'Believing a copyright notice is required for protection. Work is protected automatically on creation.',
              ],
              examTips: [
                'For audience questions, name a specific design feature and tie it to a specific audience characteristic — "large text because young children are still learning to read".',
                'Learn the four licence types with one distinguishing feature each; questions frequently ask you to identify which suits a scenario.',
              ],
              workedExamples: [
                {
                  prompt: 'A charity is producing a web page about healthy eating for primary school children. Describe two design decisions they should make and justify each.',
                  steps: ['The audience is young children with limited reading ability and short attention spans.', 'Use large, simple text and short sentences, because children are still developing reading skills.', 'Use bright colours and plenty of images or cartoons, because visual content holds young attention and conveys ideas without reliance on text.'],
                  answer: 'Use large, simple text with short sentences, since young children have limited reading ability; and use bright colours with plenty of images, since visual content engages them and communicates without heavy reading.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Why is audience appreciation important?', back: 'The content, language, layout and style must suit the users\' age, knowledge and needs, or the solution will not communicate effectively.', difficulty: 'MEDIUM' },
            { front: 'What is copyright?', back: 'Legal protection giving the creator control over the copying and use of their work.', difficulty: 'EASY' },
            { front: 'Difference between freeware and open source?', back: 'Freeware is free to use but the source code is not available; open source publishes the source code and allows modification and redistribution.', difficulty: 'HARD' },
            { front: 'What is shareware?', back: 'Software free to try for a limited period or with limited features, requiring payment for the full version.', difficulty: 'MEDIUM' },
            { front: 'Give two accessibility features for visually impaired users.', back: 'Large fonts with high contrast, and alt text on images for screen readers.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'A company distributes software free of charge, but does not release the source code and does not allow modification. Which licence type is this?',
              options: [
                { id: 'a', text: 'Freeware', why: '' },
                { id: 'b', text: 'Open source', why: 'Open source requires that the source code is available and may be modified.' },
                { id: 'c', text: 'Shareware', why: 'Shareware is only free for a trial period or with limited features, after which payment is required.' },
                { id: 'd', text: 'Commercial software', why: 'Commercial software must be paid for.' },
              ],
              answer: 'a',
              markScheme: ['Freeware (1)'],
              marks: 1,
              explanation:
                'Free of charge but closed source is precisely freeware. The word "free" refers to price only — open source is about freedom to see and change the code.',
            },
          ],
        },
      ],
    },
    {
      number: '16',
      slug: 'graphs-and-charts',
      title: 'Graphs and charts',
      summary: 'Choosing the right chart type for the data and labelling it correctly.',
      subtopics: [
        {
          number: '16.1',
          slug: 'graphs-and-charts',
          title: 'Graphs and charts',
          summary: 'Choosing the right chart type and labelling it properly.',
          objectives: [
            { code: '16.1.1', statement: 'Select and create appropriate chart types and label them correctly.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'graphs-and-charts',
              title: 'Graphs and charts',
              readingMinutes: 4,
              body: `Choosing the wrong chart type is the fastest way to lose marks in the practical papers, and the rules are simple.
### Which chart for which job
- **Pie chart** — showing the **proportions of a whole**, e.g. the percentage of sales by product. Only sensible when the segments add to 100% and there are not too many of them.
- **Bar chart** — **comparing** separate categories, e.g. sales in each shop.
- **Line graph** — showing a **trend over time**, e.g. temperature across a year.
- **Scatter graph** — showing the **relationship between two variables**, e.g. revision hours against exam score.
The test is what the data *is*: parts of a whole, separate categories, change over time, or a relationship.
### Labelling — where the marks are
Every chart needs:
- A meaningful **title** describing what it shows;
- **Axis labels** with **units** where relevant;
- A **legend/key** when more than one data series is plotted (and none when only one, since it adds clutter);
- **Category labels** on the correct axis;
- **Segment labels or percentages** on a pie chart.
### A common trap
Using a pie chart for data that does not form a whole — such as comparing the populations of five unrelated countries — is wrong, because the segments do not represent parts of a single total. Use a bar chart instead.`,
              analogy: 'Chart choice is like choosing a sentence structure: the facts may be right, but a question mark on a statement misleads the reader. A pie chart on non-proportional data misleads in exactly the same way.',
              misconceptions: [
                'Using a pie chart for any comparison. Pie charts only work for parts of a single whole.',
                'Omitting axis labels and units. These are separate marking points in practical assessments and are lost constantly.',
                'Including a legend for a single data series, which adds clutter without adding information.',
              ],
              examTips: [
                'Decide the chart type from the wording of the question: "proportion" or "percentage of total" → pie; "compare" → bar; "over time" → line; "relationship between" → scatter.',
                'Before submitting any chart, check the title, both axis labels with units, and the legend. That checklist recovers marks reliably.',
              ],
              workedExamples: [
                {
                  prompt: 'A shop wants to show how its total monthly sales changed across a year. State the most suitable chart type and justify your choice.',
                  steps: ['The data is a single measurement recorded at regular time intervals.', 'The purpose is to show how it changes over time, i.e. a trend.', 'A line graph joins the points, making the trend and any seasonal pattern visible.'],
                  answer: 'A line graph, because it shows how a value changes over time and makes the trend across the twelve months clearly visible.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'When should you use a pie chart?', back: 'When showing proportions of a single whole, where the segments total 100%.', difficulty: 'MEDIUM' },
            { front: 'Which chart shows a trend over time?', back: 'A line graph.', difficulty: 'EASY' },
            { front: 'Which chart shows the relationship between two variables?', back: 'A scatter graph.', difficulty: 'MEDIUM' },
            { front: 'Name four things every chart needs.', back: 'A meaningful title, labelled axes with units, a legend when there is more than one series, and category labels.', difficulty: 'MEDIUM' },
            { front: 'Why is a pie chart wrong for comparing unrelated totals?', back: 'The segments would not be parts of a single whole, so the proportions would be meaningless.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'A school wants to display what percentage of its students choose each of four option subjects. Which chart type is most appropriate?',
              options: [
                { id: 'a', text: 'Pie chart', why: '' },
                { id: 'b', text: 'Line graph', why: 'Line graphs show change over time, and there is no time variable here.' },
                { id: 'c', text: 'Scatter graph', why: 'Scatter graphs show the relationship between two numeric variables.' },
                { id: 'd', text: 'Flowchart', why: 'A flowchart shows a process, not numerical data.' },
              ],
              answer: 'a',
              markScheme: ['Pie chart (1)'],
              marks: 1,
              explanation:
                'The four options together account for all students, so the data forms parts of a single whole totalling 100% — exactly what a pie chart represents.',
            },
          ],
        },
      ],
    },
    {
      number: '17',
      slug: 'document-production',
      title: 'Document production',
      summary: 'Formatting text, page layout, consistent styles and proofing.',
      subtopics: [
        {
          number: '17.1',
          slug: 'document-production',
          title: 'Document production, styles and proofing',
          summary: 'Formatting text, using styles consistently, and proofing techniques.',
          objectives: [
            { code: '17.1.1', statement: 'Format text and organise page layout, including margins, columns and tables.', tier: 'CORE' },
            { code: '17.1.2', statement: 'Use consistent styles and apply proofing techniques including spell check and proofreading.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'document-production',
              title: 'Document production, styles and proofing',
              readingMinutes: 5,
              body: `### Page layout
Control **margins**, **orientation** (portrait or landscape), **page size**, **columns**, **headers and footers** (for page numbers, filenames and dates), and **page breaks** to place content deliberately rather than letting it fall where it happens to.
Use **tables** to organise data in rows and columns, and **widow/orphan control** to stop a single line of a paragraph being stranded on its own page.
### Styles
A **style** is a named set of formatting — font, size, colour, spacing — applied to text. Using styles rather than manual formatting means:
- The document is **consistent** throughout;
- Changing the style **updates every instance at once**, saving considerable time;
- Heading styles allow an automatic **table of contents** and improve accessibility for screen readers.
Corporate house styles work precisely this way, which is why professional documents look uniform.
### Text formatting basics
**Serif** fonts (with small strokes on letter ends) are traditional for printed body text; **sans-serif** fonts are cleaner on screen. Whichever you choose, be consistent, and use **alignment** (left, centre, right, justified) purposefully — justified text gives straight edges on both sides but can create uneven word spacing.
### Proofing
- **Spell check** catches misspelt words, but **not** words spelt correctly and used wrongly — "their" for "there", or "form" for "from", both pass.
- **Grammar check** flags likely grammatical errors, though it is unreliable and sometimes wrong.
- **Proofreading** by a human is the only way to catch context errors, wrong facts and awkward phrasing.
The exam point: **a spell check is not sufficient on its own**, and questions often ask exactly why.`,
              analogy: 'A style is a uniform rather than dressing each person individually. When the uniform changes, everyone changes at once — which is why editing one style beats editing two hundred headings by hand.',
              misconceptions: [
                'Believing a spell check makes proofreading unnecessary. It cannot detect a correctly spelt wrong word, which is the most common real error.',
                'Formatting each heading manually instead of using styles, then finding that a design change means editing everything by hand.',
                'Thinking justified text is always best. It creates rivers of white space in narrow columns and can be harder to read.',
              ],
              examTips: [
                'When asked why styles should be used, give consistency **and** the ability to update all instances at once. The second is the stronger, more technical point.',
                'For proofing questions, always give an example of an error a spell check would miss — "form" instead of "from" makes the point instantly.',
              ],
              workedExamples: [
                {
                  prompt: 'A student runs a spell check on an essay and finds no errors, but their teacher still finds mistakes. Explain how this is possible.',
                  steps: ['A spell check compares each word against a dictionary and flags words not found in it.', 'A word that is spelt correctly but used in the wrong context still exists in the dictionary, so it is not flagged.', 'Examples include "their" for "there", or "form" for "from" — and grammar or factual errors are also missed.'],
                  answer: 'A spell check only detects words that are not in its dictionary. Correctly spelt but wrongly used words such as "their" for "there" pass unnoticed, so human proofreading is still needed.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is a style in a word processor?', back: 'A named set of formatting (font, size, colour, spacing) that can be applied to text and updated everywhere at once.', difficulty: 'MEDIUM' },
            { front: 'Give two advantages of using styles.', back: 'Consistency throughout the document, and changing the style updates every instance at once.', difficulty: 'MEDIUM' },
            { front: 'What error can a spell check not detect?', back: 'A correctly spelt word used in the wrong context, e.g. "their" instead of "there".', difficulty: 'MEDIUM' },
            { front: 'What goes in a header or footer?', back: 'Repeating information such as page numbers, dates, filenames or the document title.', difficulty: 'EASY' },
            { front: 'Difference between serif and sans-serif fonts?', back: 'Serif fonts have small strokes on the ends of letters and suit printed body text; sans-serif fonts have none and are cleaner on screen.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A company wants all its reports to look the same. Explain how using styles helps achieve this, and give one further advantage. [2]',
              answer:
                'Applying the same named styles to headings and body text in every report ensures the font, size, colour and spacing are identical throughout and across documents, giving a consistent corporate appearance. A further advantage is that if the company decides to change its house font, editing the style updates every instance automatically instead of reformatting each document by hand.',
              markScheme: [
                'Styles apply identical formatting throughout, giving consistency (1)',
                'Changing the style updates all text using it automatically, saving time (1)',
              ],
              marks: 2,
              explanation:
                'Automatic updating is the advantage that scales: for a hundred-page report, manual reformatting is not merely tedious but a reliable source of inconsistency.',
            },
          ],
        },
      ],
    },
    {
      number: '18',
      slug: 'databases',
      title: 'Databases',
      summary: 'Database structure, field types, validation and verification.',
      subtopics: [
        {
          number: '18.1',
          slug: 'databases',
          title: 'Database structure and field types',
          summary: 'Records, fields, keys, and choosing the right data type.',
          objectives: [
            { code: '18.1.1', statement: 'Describe the structure of a database including records, fields and primary keys.', tier: 'CORE' },
            { code: '18.1.2', statement: 'Select appropriate data types and describe relational database structure.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'databases',
              title: 'Database structure and field types',
              readingMinutes: 5,
              body: `### Structure
- A **file/table** holds all the data about one kind of thing, e.g. Students.
- A **record** is all the data about **one** individual — one row.
- A **field** is one item of data within a record — one column, e.g. Surname.
- A **primary key** is a field that **uniquely identifies each record**, e.g. StudentID. No two records may share it, and it cannot be empty.
- A **foreign key** is a field in one table that refers to the primary key of another, which is how tables are linked.
### Flat file versus relational
A **flat file** database holds everything in a single table. It is simple but leads to **data redundancy** — the same information repeated in many records — which wastes space and, more seriously, allows **inconsistency** when one copy is updated and another is not.
A **relational** database splits data into linked tables. Each fact is stored **once**, so redundancy is reduced and updating is reliable.
### Data types
Choosing correctly is a common exam question:
| Type | Use for | Example |
|---|---|---|
| Text/alphanumeric | letters, or numbers not used in calculations | name, phone number |
| Numeric (integer) | whole numbers | quantity in stock |
| Numeric (real/decimal) | numbers with decimals | price |
| Date/time | dates and times | date of birth |
| Boolean/logical | two states only | paid? yes/no |
The classic trap: a **telephone number** is stored as **text**, not numeric, because it may begin with a leading zero (which a numeric field would drop) and is never used in calculations.`,
              analogy: 'A primary key is a passport number. Two people can share a name, a birthday and a town, but the number belongs to exactly one person — which is the only reliable way to tell records apart.',
              misconceptions: [
                'Storing a phone number as a numeric field. Leading zeros are lost and no arithmetic is ever performed on it, so text is correct.',
                'Confusing a record with a field. A record is the whole row about one entity; a field is one column within it.',
                'Thinking a primary key can repeat "as long as the rest differs". It must be unique for every record, without exception.',
              ],
              examTips: [
                'When choosing a data type, justify it — "text, because the code contains letters" or "Boolean, because there are only two possible values".',
                'For questions on why a relational database is better, name both consequences: reduced data redundancy **and** improved consistency when data is updated.',
              ],
              workedExamples: [
                {
                  prompt: 'A school database stores StudentID, Name, DateOfBirth, TelephoneNumber and FeesPaid. State a suitable data type for each and justify the choice for TelephoneNumber.',
                  steps: ['StudentID uniquely identifies each record, so it is the primary key, stored as text or numeric.', 'Name is letters, so text; DateOfBirth is a date/time field; FeesPaid has two states, so Boolean.', 'TelephoneNumber may start with a leading zero, which a numeric field would remove, and it is never used in calculations.'],
                  answer: 'StudentID: text/numeric (primary key). Name: text. DateOfBirth: date. FeesPaid: Boolean. TelephoneNumber: text, because it may begin with a zero that a numeric field would drop, and no arithmetic is done on it.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is a record?', back: 'All the data about one individual item or person — one row in a table.', difficulty: 'EASY' },
            { front: 'What is a primary key?', back: 'A field that uniquely identifies each record in a table.', difficulty: 'MEDIUM' },
            { front: 'Why store a telephone number as text?', back: 'It may begin with a leading zero that a numeric field would remove, and it is never used in calculations.', difficulty: 'HARD' },
            { front: 'What is data redundancy?', back: 'The same data stored repeatedly in a database, wasting space and risking inconsistency.', difficulty: 'HARD' },
            { front: 'What is a foreign key?', back: 'A field in one table that refers to the primary key of another table, linking the two.', difficulty: 'HARD' },
            { front: 'Which data type suits a yes/no field?', back: 'Boolean (logical).', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why a relational database is usually better than a flat file database for storing school data. [2]',
              answer:
                'A relational database stores data in linked tables so each item of data is stored only once, which reduces data redundancy and saves storage space. It also means that when data changes it only needs updating in one place, so the data stays consistent rather than having different values in different records.',
              markScheme: [
                'Reduces data redundancy — data stored once rather than repeated (1)',
                'Improves consistency — updating in one place avoids conflicting copies (1)',
              ],
              marks: 2,
              explanation:
                'The consistency point is the stronger of the two in practice: duplicated data does not merely waste space, it eventually disagrees with itself, and then nobody knows which copy is right.',
            },
          ],
        },
        {
          number: '18.2',
          slug: 'validation-and-verification',
          title: 'Validation and verification',
          summary: 'Two different checks on data entry, and the types of validation check.',
          prerequisites: ['18.1'],
          objectives: [
            { code: '18.2.1', statement: 'Distinguish between validation and verification and describe the main validation checks.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'validation-and-verification',
              title: 'Validation and verification',
              readingMinutes: 5,
              body: `These two are constantly confused, and the distinction is simple once stated precisely.
### Validation
**Validation** is an automatic check by the computer that data entered is **reasonable and sensible** — that it *could* be right. It cannot tell whether the data is actually correct.
The main checks:
- **Range check** — the value lies between limits, e.g. a month between 1 and 12.
- **Type check** — the data is the right type, e.g. only digits in an age field.
- **Length check** — the right number of characters, e.g. a password of at least 8.
- **Presence check** — a required field is not left blank.
- **Format check** — the data matches a pattern, e.g. a date as dd/mm/yyyy.
- **Check digit** — an extra digit calculated from the others, used on barcodes and ISBNs to detect mistyping.
- **Lookup check** — the value is one of a permitted list, e.g. a valid subject code.
### Verification
**Verification** checks that data has been **copied or entered accurately** from the source. Two methods:
- **Double entry** — the data is entered twice and the computer compares the two versions, e.g. typing a new password twice.
- **Visual (proofreading)** — a human compares the entered data with the original document.
### The distinction that earns marks
A date of birth of 01/01/1990 for someone born 02/02/1991 is **valid** — it passes every check — but it is **wrong**. Validation cannot catch this; only verification against the source can.
So: **validation asks "is this sensible?"; verification asks "is this what was on the form?"**`,
              analogy: 'Validation is a bouncer checking you look old enough; verification is checking your ID against the guest list. The first rejects the obviously implausible, the second confirms you are actually who you claim.',
              misconceptions: [
                'Saying validation ensures data is correct. It only ensures data is reasonable — a plausible but wrong value passes easily.',
                'Listing "double entry" as a validation check. It is verification, because it compares two copies rather than testing reasonableness.',
                'Confusing a format check with a type check. Format is about the pattern (dd/mm/yyyy); type is about the kind of data (numeric, text).',
              ],
              examTips: [
                'If asked for a validation check, name the check **and** give an example rule for the specific field in the question — "range check: the mark must be between 0 and 100".',
                'Never offer a validation check as the answer to "how can you make sure the data matches the paper form" — that question requires verification.',
              ],
              workedExamples: [
                {
                  prompt: 'A student types their date of birth incorrectly but the system accepts it. Explain why validation did not detect the error, and state what would.',
                  steps: ['Validation checks only whether the data is reasonable — a valid date in the correct format within an acceptable range.', 'The mistyped date still satisfies all of these, so it is accepted as sensible.', 'Only verification, comparing the entry against the original source document, can reveal that it is not the correct date.'],
                  answer: 'The mistyped date was still sensible and correctly formatted, so it passed validation. Only verification — proofreading against the original form, or double entry — could detect that it does not match the source.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define validation.', back: 'An automatic computer check that data entered is reasonable and sensible.', difficulty: 'MEDIUM' },
            { front: 'Define verification.', back: 'A check that data has been accurately copied or entered from the original source.', difficulty: 'MEDIUM' },
            { front: 'Name four validation checks.', back: 'Any four of: range, type, length, presence, format, check digit, lookup.', difficulty: 'MEDIUM' },
            { front: 'Name the two methods of verification.', back: 'Double entry (entering twice and comparing) and visual checking (proofreading against the source).', difficulty: 'MEDIUM' },
            { front: 'Can validation detect a plausible but wrong value?', back: 'No — it only checks reasonableness. Verification against the source is needed.', difficulty: 'HARD' },
            { front: 'What is a check digit used for?', back: 'An extra digit calculated from the others to detect mistyping, used on barcodes and ISBNs.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A hospital records patient ages. Describe one validation check and one verification method that should be used, and explain why both are needed. [4]',
              answer:
                'A range check should be used so that only ages between, for example, 0 and 120 are accepted, rejecting impossible values such as 300. Verification should be carried out by double entry or by proofreading the entered age against the patient\'s admission form. Both are needed because validation only proves the age is sensible — an age of 45 typed instead of 54 is entirely reasonable and would be accepted — so verification against the original document is required to confirm the value is actually the right one.',
              markScheme: [
                'Names a suitable validation check with a sensible rule, e.g. range check 0-120 (1)',
                'Names a verification method, e.g. double entry or proofreading against the source (1)',
                'Validation only shows the data is reasonable, not correct (1)',
                'Verification detects transcription errors that are plausible and so pass validation (1)',
              ],
              marks: 4,
              explanation:
                'The final two marks are for the reasoning, not the checks. This is the question that separates candidates who have memorised the list from those who understand what each type of check can and cannot do.',
              hint: 'Think of a wrong age that would still pass every automatic check.',
            },
          ],
        },
      ],
    },
    {
      number: '20',
      slug: 'spreadsheets',
      title: 'Spreadsheets',
      summary: 'Formulae, functions, absolute and relative references, and what-if modelling.',
      subtopics: [
        {
          number: '20.1',
          slug: 'spreadsheets',
          title: 'Formulae, functions and cell references',
          summary: 'Building a working model and referencing cells correctly.',
          objectives: [
            { code: '20.1.1', statement: 'Create formulae and use functions including SUM, AVERAGE, IF, COUNTIF and VLOOKUP.', tier: 'CORE' },
            { code: '20.1.2', statement: 'Explain the difference between absolute and relative cell references and use spreadsheets for modelling.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'spreadsheets',
              title: 'Formulae, functions and cell references',
              readingMinutes: 6,
              body: `### Formulae and functions
Every formula begins with **=**. A **formula** is your own calculation, such as \`=B2*C2\`. A **function** is a built-in operation:
- \`=SUM(B2:B10)\` — adds a range.
- \`=AVERAGE(B2:B10)\` — the mean.
- \`=MAX(...)\` / \`=MIN(...)\` — largest and smallest.
- \`=COUNT(...)\` — how many numeric entries; \`=COUNTIF(range, criterion)\` — how many meet a condition.
- \`=IF(condition, value_if_true, value_if_false)\` — e.g. \`=IF(B2>=50,"Pass","Fail")\`.
- \`=VLOOKUP(value, table, column, FALSE)\` — finds a value in a lookup table, used for prices and grades.
### Relative and absolute references — the critical idea
A **relative reference** (\`B2\`) **changes** when the formula is copied: copied one row down it becomes \`B3\`. This is usually what you want.
An **absolute reference** (\`$B$2\`) **stays fixed** when copied. The **$** signs lock the column and row.
Use absolute referencing whenever a formula must always refer to **one particular cell** — a VAT rate, an exchange rate, or a lookup table. If you use \`B2\` where \`$B$2\` is needed, copying the formula shifts the reference onto an empty cell and produces zeros or errors down the column.
This single mistake accounts for more lost practical marks than any other.
### Modelling and "what if"
A spreadsheet model represents a real situation with formulae. Because the formulae recalculate automatically, you can change one input and immediately see the effect — **"what if" analysis**.
Advantages of modelling rather than testing reality: it is **cheaper**, **faster**, and **safe** — you can model a bridge failing or a business going bankrupt at no cost. The limitation is that a model is only as good as the assumptions and formulae behind it.`,
              analogy: 'A relative reference is "the cell three to my left", which stays true wherever you stand. An absolute reference is a street address — it points to the same building no matter where you move.',
              misconceptions: [
                'Forgetting the \`=\` at the start, so the spreadsheet stores text rather than calculating.',
                'Using a relative reference for a fixed value such as a tax rate, so copying the formula silently breaks it — the most common practical error in the whole syllabus.',
                'Thinking a model must be complicated to be useful. A three-formula model that recalculates correctly is a genuine model.',
              ],
              examTips: [
                'Whenever you write a formula that will be copied, ask which references must stay fixed and add the \`$\` signs before copying, not after discovering the errors.',
                'For "advantages of a computer model" questions, give cheaper, faster and safer, and mention that inputs can be changed easily to test scenarios.',
              ],
              workedExamples: [
                {
                  prompt: 'Cell B1 holds a VAT rate. Column C holds prices from C2 downwards, and column D should show the VAT for each price. Write the formula for D2 that can be copied down, and explain the referencing.',
                  steps: ['The price changes for each row, so the reference to C2 must be relative — it should become C3, C4 and so on.', 'The VAT rate is always in B1, so that reference must be absolute and stay fixed when copied.', 'Combining these gives =C2*$B$1.'],
                  answer: '=C2*$B$1 — C2 is relative so it moves down with each row, while $B$1 is absolute so every copied formula still uses the single VAT rate in B1.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What must every spreadsheet formula start with?', back: 'An equals sign (=).', difficulty: 'EASY' },
            { front: 'What is an absolute cell reference and how is it written?', back: 'A reference that does not change when copied, written with dollar signs, e.g. $B$2.', difficulty: 'MEDIUM' },
            { front: 'When must you use an absolute reference?', back: 'When a formula must always refer to one fixed cell, such as a tax rate, exchange rate or lookup table.', difficulty: 'HARD' },
            { front: 'What does =IF(B2>=50,"Pass","Fail") do?', back: 'Displays "Pass" if the value in B2 is 50 or more, otherwise "Fail".', difficulty: 'MEDIUM' },
            { front: 'What does COUNTIF do?', back: 'Counts how many cells in a range meet a given condition.', difficulty: 'MEDIUM' },
            { front: 'Give three advantages of computer modelling.', back: 'It is cheaper, faster and safer than testing the real situation, and inputs can be changed easily to see the effect.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A student writes =C2*B1 in cell D2 to calculate VAT, where B1 contains the VAT rate, then copies it down column D. Explain what goes wrong and how to fix it. [3]',
              answer:
                'Both references are relative, so when the formula is copied down, B1 changes to B2, B3 and so on. These cells do not contain the VAT rate — they are empty or hold other data — so the calculated VAT is zero or incorrect for every row after the first. The fix is to make the VAT rate reference absolute by writing =C2*$B$1, so that the reference to B1 stays fixed while C2 still changes correctly with each row.',
              markScheme: [
                'B1 is relative, so it changes to B2, B3 etc. when copied down (1)',
                'Those cells do not hold the VAT rate, so results are wrong or zero (1)',
                'Fix by using an absolute reference: =C2*$B$1 (1)',
              ],
              marks: 3,
              explanation:
                'Note that C2 should remain relative — the error is not "use absolute references everywhere" but knowing which single reference must be locked.',
              hint: 'What happens to each of the two cell references when the formula moves down a row?',
            },
          ],
        },
      ],
    },
    {
      number: '21',
      slug: 'website-authoring',
      title: 'Website authoring',
      summary: 'HTML structure, CSS presentation, and the separation of the two.',
      subtopics: [
        {
          number: '21.1',
          slug: 'html-and-css',
          title: 'HTML structure and CSS presentation',
          summary: 'Why content and presentation are kept separate, and the basics of each.',
          prerequisites: ['9.1'],
          objectives: [
            { code: '21.1.1', statement: 'Describe the use of HTML for structure and CSS for presentation, and explain the benefits of separating them.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'html-and-css',
              title: 'HTML structure and CSS presentation',
              readingMinutes: 5,
              body: `A web page is built from two layers with two distinct jobs.
### HTML — content and structure
**HTML (hypertext markup language)** defines **what** is on the page and what each part *is*: headings, paragraphs, lists, tables, images and hyperlinks. Content is placed between **tags**, e.g. \`<h1>\` for a main heading and \`<p>\` for a paragraph.
Structural elements include headings \`<h1>\` to \`<h6>\`, paragraphs \`<p>\`, lists \`<ul>\` and \`<ol>\`, tables \`<table>\`, images \`<img>\` (which should carry **alt text** for accessibility), and links \`<a>\`.
### CSS — presentation and style
**CSS (cascading style sheets)** defines **how** it looks: fonts, colours, sizes, spacing, borders and positioning.
CSS can be applied three ways: **inline** (on a single element), **internal** (in the page's head), or **external** (a separate .css file linked to many pages). **External** is strongly preferred.
### Why separate them — the exam question
Keeping structure and presentation apart means:
- One external stylesheet controls **many pages**, so the whole site's appearance changes by editing **one file**;
- The site stays **consistent** across every page;
- HTML files are **smaller** and load faster, since styling is not repeated in each one;
- The **same content** can be presented differently for screen, print or mobile;
- Accessibility improves, because meaningful structure helps screen readers.
It is the same argument as using styles in a word processor, applied to a whole website.`,
              analogy: 'HTML is the skeleton and CSS is the clothing. You can change the outfit completely without rebuilding the skeleton — and one wardrobe can dress a hundred identical mannequins at once.',
              misconceptions: [
                'Using HTML to control appearance, e.g. choosing a heading tag because it "looks big". Heading levels convey structure; size is CSS\'s job.',
                'Thinking inline styles are simplest and therefore best. They defeat the whole purpose, since each element must then be edited individually.',
                'Believing CSS holds content. CSS never contains page content; it only describes presentation.',
              ],
              examTips: [
                'For "why separate content and presentation", give at least two of: one edit changes the whole site, consistent appearance, smaller/faster pages, and easier adaptation for different devices.',
                'Remember alt text on images as an accessibility point — it is a reliable mark in questions about visually impaired users.',
              ],
              workedExamples: [
                {
                  prompt: 'A website has 50 pages, all using one external stylesheet. The owner wants to change the heading colour on every page. Explain why this is quick.',
                  steps: ['The heading colour is defined once in the external CSS file, not in each HTML page.', 'All 50 pages link to that same stylesheet.', 'Editing the single colour rule in the CSS file therefore changes the appearance of every page immediately.'],
                  answer: 'Because the styling is held in one external stylesheet shared by all 50 pages, changing the heading colour rule once in that file updates every page at once, rather than editing 50 separate files.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does HTML define?', back: 'The content and structure of a web page — headings, paragraphs, lists, tables, images and links.', difficulty: 'EASY' },
            { front: 'What does CSS define?', back: 'The presentation — fonts, colours, sizes, spacing, borders and positioning.', difficulty: 'EASY' },
            { front: 'Name the three ways CSS can be applied.', back: 'Inline, internal (in the page head) and external (a separate linked .css file).', difficulty: 'MEDIUM' },
            { front: 'Give two benefits of an external stylesheet.', back: 'One edit changes every linked page, and pages stay consistent while loading faster.', difficulty: 'MEDIUM' },
            { front: 'Why is alt text on images important?', back: 'Screen readers read it aloud, making images accessible to visually impaired users (and it displays if the image fails to load).', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain two advantages of using an external stylesheet rather than inline styles on a large website. [2]',
              answer:
                'An external stylesheet is linked by every page, so changing one rule in that single file updates the appearance of the whole website at once, instead of editing every element on every page. It also keeps the HTML files smaller, since the styling is not repeated in each page, so pages download and display more quickly.',
              markScheme: [
                'One change to the stylesheet updates all linked pages / ensures consistency (1)',
                'HTML files are smaller so pages load faster (or styling is reusable and easier to maintain) (1)',
              ],
              marks: 2,
              explanation:
                'The maintenance argument is the decisive one: with inline styles, a redesign of a 50-page site means editing thousands of individual elements, and any missed one produces an inconsistency.',
            },
          ],
        },
      ],
    },
  ],
};
