import type { HighYieldSeed } from '../types';

/**
 * ICT 0417 — the question forms that recur in Paper 1 (Theory).
 *
 * Papers 2 and 3 are marked on files produced in real software, so they are not
 * represented here. Written from the syllabus objectives; none of this is
 * past-paper text.
 */
export const ictHighYield: HighYieldSeed[] = [
  {
    subject: 'ict',
    subtopic: '18.2',
    rank: 1,
    trap: 'Saying validation checks that data is "correct". Validation only checks that data is *reasonable*; only verification checks it matches the source.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Explain the difference between validation and verification.\n(b) Name and describe three different validation checks, giving an example of data each would reject.\n(c) Describe two methods of verification.',
      answer:
        '(a) Validation is an automatic check by the computer that entered data is sensible and within acceptable limits. Verification checks that data has been entered accurately, matching the original source. (b) Range check — rejects a month of 13; type/character check — rejects letters in an age field; length check — rejects a 5-digit phone number where 11 are required; presence check — rejects a blank required field; format check — rejects a date typed as 32/13/2026. (c) Double entry — the data is typed twice and the computer compares the two versions. Visual check (proofreading) — a person compares the entered data on screen against the original document.',
      markScheme: [
        '(a) Validation: computer checks data is reasonable / within limits (1)',
        '(a) Verification: checks data matches the original source / was entered accurately (1)',
        '(b) Three named checks (1 each, max 3)',
        '(b) A suitable rejected example for each (1 each, max 3)',
        '(c) Double entry, with the computer comparing the two copies (1)',
        '(c) Visual check / proofreading against the original (1)',
      ],
      marks: 10,
      explanation:
        'This is the highest-value distinction in the whole theory paper because it recurs almost every series. The key point is that validation cannot detect a correctly formatted but wrong value — typing the wrong date of birth in the right format passes every validation check, and only verification would catch it.',
      hint: 'Sensible versus accurate. Those two words carry the answer.',
    },
  },
  {
    subject: 'ict',
    subtopic: '8.1',
    rank: 2,
    trap: 'Describing phishing and pharming as the same thing. Phishing needs the user to click something; pharming redirects them without any action on their part.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Describe what is meant by phishing and state one way a user can protect against it.\n(b) Describe what is meant by pharming and explain how it differs from phishing.\n(c) Explain how a firewall helps protect a computer system.\n(d) Explain why a strong password alone does not protect against all security threats.',
      answer:
        '(a) A fraudulent email or message pretending to be from a legitimate organisation, designed to trick the user into revealing personal details. Protect by not clicking links in unexpected emails and by checking the sender address. (b) Malicious code redirects a user from a genuine website to a fake one even when the correct address is typed. It differs because no action by the user is needed — the redirection happens automatically. (c) It monitors traffic entering and leaving the network against a set of rules and blocks anything unauthorised. (d) Threats such as pharming, key-logging spyware and viruses do not depend on guessing the password, so a strong password gives no protection against them.',
      markScheme: [
        '(a) Fake email/message imitating a legitimate organisation (1) to obtain personal or financial details (1)',
        '(a) Any valid protection, e.g. do not click links in unexpected emails (1)',
        '(b) Redirection to a fake website by malicious code, despite typing the correct address (1)',
        '(b) Requires no action by the user, unlike phishing which needs a click / reply (1)',
        '(c) Examines incoming and outgoing traffic against rules (1) and blocks unauthorised traffic (1)',
        '(d) Names a threat that bypasses passwords, e.g. spyware/key-logger capturing it as typed (1)',
      ],
      marks: 7,
      explanation:
        'Security questions are marked on precision. Both phishing and pharming end with the user on a fake page, so the mark comes from the mechanism: one is a lure that must be taken, the other is a redirect that happens regardless.',
      hint: 'Did the user have to do something? That is what separates them.',
    },
  },
  {
    subject: 'ict',
    subtopic: '20.1',
    rank: 3,
    trap: 'Forgetting the dollar signs when a formula is to be replicated. A relative reference shifts when copied; only an absolute reference stays put.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A spreadsheet holds item prices in column B and quantities in column C. Cell F1 holds a tax rate.\n\n(a) Explain the difference between a relative and an absolute cell reference.\n(b) Write a formula for cell D2 that calculates the total cost of the item including tax, in a form that can be replicated down column D.\n(c) Name the function that would count how many items in column C have a quantity greater than 10, and write it.\n(d) State one reason for using a named range instead of a cell reference.',
      answer:
        '(a) A relative reference changes when the formula is copied to another cell; an absolute reference, written with dollar signs, stays fixed. (b) =B2*C2*(1+$F$1). (c) COUNTIF — =COUNTIF(C2:C100,">10"). (d) It makes formulae easier to read and understand, and reduces the chance of referring to the wrong cell.',
      markScheme: [
        '(a) Relative reference changes when replicated (1)',
        '(a) Absolute reference is fixed by $ signs and does not change (1)',
        '(b) =B2*C2*(1+$F$1) — correct arithmetic (1) with $F$1 absolute (1)',
        '(c) COUNTIF (1), correctly written with range and criterion (1)',
        '(d) Any valid reason, e.g. easier to read / less error-prone (1)',
      ],
      marks: 7,
      explanation:
        'The examiner is testing whether you can see which reference must not move. The tax rate lives in one cell for the whole sheet, so it is absolute; the price and quantity are on the same row as the formula, so they are relative and should shift as it is copied.',
      hint: 'Ask of each reference: when this formula moves down a row, should this change?',
    },
  },
  {
    subject: 'ict',
    subtopic: '3.1',
    rank: 4,
    trap: 'Confusing storage media with storage devices, and claiming solid-state storage has "no moving parts and therefore unlimited life". It has a finite number of write cycles.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Explain the difference between a storage device and storage media.\n(b) Describe how data is stored on magnetic, optical and solid-state media.\n(c) Give two advantages and one disadvantage of solid-state storage compared with magnetic hard disks.',
      answer:
        '(a) The device is the hardware that reads and writes the data; the media is the material the data is actually stored on. (b) Magnetic: the surface is magnetised in one of two directions to represent 0 and 1. Optical: a laser burns pits into the reflective surface, and the difference between pits and lands is read as data. Solid-state: data is held as electrical charge trapped in transistors, with no moving parts. (c) Advantages: much faster access because there are no moving parts, and more robust and shock-resistant; also lower power consumption. Disadvantage: higher cost per gigabyte, and a limited number of write cycles.',
      markScheme: [
        '(a) Device reads/writes the data (1); media is what the data is stored on (1)',
        '(b) Magnetic: surface magnetised in two directions (1)',
        '(b) Optical: laser burns pits and lands, read by reflection (1)',
        '(b) Solid-state: charge held in transistors, no moving parts (1)',
        '(c) Two valid advantages (2)',
        '(c) One valid disadvantage (1)',
      ],
      marks: 8,
      explanation:
        'A hard disk drive is a device; the platters inside are the media. For a DVD the drive is the device and the disc is the media — which is why optical media are removable and internal hard disks generally are not. Keep the comparison in (c) genuinely comparative: "it is fast" is not a comparison, "it is faster than a hard disk because it has no moving parts" is.',
      hint: 'One you plug in, the other holds the bits.',
    },
  },
  {
    subject: 'ict',
    subtopic: '4.1',
    rank: 5,
    trap: 'Using "the internet" and "the World Wide Web" interchangeably. The internet is the network infrastructure; the web is one service that runs on it.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Explain the difference between the internet and the World Wide Web.\n(b) Explain the difference between a LAN and a WAN, giving an example of each.\n(c) State the function of a router.\n(d) Give two advantages and two disadvantages of connecting computers in a network.',
      answer:
        '(a) The internet is the global network of interconnected computer networks. The World Wide Web is the collection of web pages and other resources accessed over the internet using HTTP. (b) A LAN covers a small geographical area such as one school or office building; a WAN covers a large geographical area, often connecting LANs, such as a bank\'s branch network or the internet itself. (c) A router directs data packets between networks and connects a LAN to a WAN. (d) Advantages: files and peripherals such as printers can be shared, and users can communicate and access their files from any workstation. Disadvantages: malware can spread across the network, and if the server or the network fails, all users are affected.',
      markScheme: [
        '(a) Internet = global network of networks / infrastructure (1)',
        '(a) WWW = the pages and resources accessed over it (1)',
        '(b) LAN covers a small area, e.g. one building (1); WAN covers a large area, e.g. the internet (1)',
        '(c) Directs data packets between networks / connects LAN to WAN (1)',
        '(d) Two valid advantages (2); two valid disadvantages (2)',
      ],
      marks: 9,
      explanation:
        'The internet still exists when no web page is loaded — email and file transfer run over the same infrastructure without touching the web. That distinction is worth a mark on its own and is one of the most reliable questions in the paper.',
      hint: 'One is the roads, the other is the shops you drive to.',
    },
  },
  {
    subject: 'ict',
    subtopic: '2.1',
    rank: 6,
    trap: 'Naming a device without justifying it. "Justify" and "give reasons for" questions award marks for the reasoning, not the choice.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A supermarket is installing new self-service checkouts.\n\n(a) Name a suitable input device for reading product codes and justify your choice.\n(b) Name a suitable direct data entry device for taking payment and justify your choice.\n(c) Name a suitable output device for giving the customer a receipt and justify your choice.\n(d) Explain one advantage to the supermarket of using direct data entry rather than keyboard entry.',
      answer:
        '(a) A barcode scanner — it reads the product code quickly and accurately without typing, reducing errors and queue times. (b) A chip and PIN reader or contactless card reader — it reads the card details directly and securely without the customer entering long numbers. (c) A thermal receipt printer — it produces a hard copy quickly and quietly with no ink cartridges to replace. (d) Data is entered faster and with far fewer transcription errors, so stock records stay accurate and customers are served more quickly.',
      markScheme: [
        '(a) Barcode scanner (1) with valid justification, e.g. fast and avoids typing errors (1)',
        '(b) Chip and PIN / contactless reader (1) with valid justification (1)',
        '(c) Receipt / thermal printer (1) with valid justification (1)',
        '(d) Faster entry and fewer errors than typing (1), with a consequence such as accurate stock records (1)',
      ],
      marks: 8,
      explanation:
        'Scenario questions like this are marked as a pair every time: the named device, then the reason it suits *this* scenario. A justification that would apply to any shop anywhere tends not to score — tie it to speed of service, accuracy of stock, or customer security.',
      hint: 'Every named device needs a "because" tied to this specific situation.',
    },
  },
  {
    subject: 'ict',
    subtopic: '7.1',
    rank: 7,
    trap: 'Describing parallel running and phased implementation as the same. Parallel running operates both systems fully at once; phased introduces the new system one part at a time.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Name the four methods of implementing a new system and describe each in one sentence.\n(b) A hospital is replacing its patient records system. Recommend a method of implementation and justify your recommendation.\n(c) Explain the difference between normal, abnormal and extreme test data, giving an example of each for a field that accepts an age between 11 and 18.',
      answer:
        '(a) Direct changeover — the old system is stopped and the new one starts immediately. Parallel running — both systems run fully side by side until the new one is trusted. Phased implementation — the new system is introduced one part at a time. Pilot running — the new system is used fully in one department or branch first. (b) Parallel running, because patient records are safety-critical: if the new system fails, the old one is still fully operational and no data is lost. (c) Normal — data that should be accepted, e.g. 15. Extreme — data at the edge of acceptability, e.g. 11 or 18. Abnormal — data that should be rejected, e.g. 25 or "seventeen".',
      markScheme: [
        '(a) Four methods named (2) and correctly described (2)',
        '(b) Parallel running recommended (1) with a justification based on the risk of data loss / patient safety (1)',
        '(c) Normal with example (1); extreme with example (1); abnormal with example (1)',
      ],
      marks: 9,
      explanation:
        'Implementation questions are almost always scenario-based, and the justification must fit the risk. Safety-critical systems point to parallel running; large organisations with many branches point to pilot running. Note that extreme data is *accepted* — it sits at the boundary — while abnormal data is rejected.',
      hint: 'Extreme data is still valid. That is what makes it different from abnormal.',
    },
  },
  {
    subject: 'ict',
    subtopic: '21.1',
    rank: 8,
    trap: 'Putting presentation into the HTML. The examinable principle is that HTML defines structure and content while CSS defines presentation — mixing them loses marks.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Explain the difference between the structure and the presentation layers of a web page, naming the language used for each.\n(b) Explain two advantages of using an external stylesheet rather than inline styles.\n(c) State what is meant by a "table" in HTML and give one reason it should not be used purely for page layout.',
      answer:
        '(a) Structure is the content and its organisation — headings, paragraphs, tables, lists — defined in HTML. Presentation is how it looks — colours, fonts, sizes, positioning — defined in CSS. (b) One change to the stylesheet updates every page that links to it, saving time and ensuring consistency; and the pages themselves are smaller and quicker to load. (c) A table arranges data in rows and columns. Using it for layout mixes presentation into the structure, which makes the page harder to maintain and harder for screen readers to interpret.',
      markScheme: [
        '(a) Structure = content and organisation, in HTML (1)',
        '(a) Presentation = appearance, in CSS (1)',
        '(b) One change updates all linked pages, giving consistency (1)',
        '(b) Smaller page files / faster loading / easier maintenance (1)',
        '(c) A table displays data in rows and columns (1)',
        '(c) Using it for layout confuses structure with presentation / harms accessibility (1)',
      ],
      marks: 6,
      explanation:
        'The separation of structure from presentation is the organising idea of this whole topic, and almost every question in it is an application of that one principle. If you can say which layer a thing belongs to, you can usually answer the question.',
      hint: 'Ask which layer each thing belongs to: what it is, or how it looks.',
    },
  },
  {
    subject: 'ict',
    subtopic: '5.1',
    rank: 9,
    trap: 'Giving only health effects when the question asks for effects on working patterns, or vice versa. Read which is asked for.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'FOUNDATION',
      stem:
        '(a) Describe three health problems associated with prolonged computer use and state one way of preventing each.\n(b) Explain what is meant by flexible working and give one advantage to the employee and one to the employer.\n(c) Explain how the introduction of computerised systems can both create and remove jobs.',
      answer:
        '(a) Repetitive strain injury — use a wrist rest and take regular breaks. Eye strain and headaches — use an anti-glare screen, adjust lighting and look away regularly. Back and neck problems — use an adjustable chair with good support and sit at the correct height. (b) Flexible working means the employee can vary when and where they work rather than keeping fixed hours at a fixed office. Advantage to the employee: no commuting and easier balancing of family commitments. Advantage to the employer: lower office costs and a wider pool of applicants. (c) Jobs are removed where tasks are automated, such as manual assembly or routine data entry. Jobs are created in areas such as system maintenance, network management and software development, and in the industries that build and support the technology.',
      markScheme: [
        '(a) Three named health problems (3) each with a valid prevention (3)',
        '(b) Definition of flexible working (1)',
        '(b) One employee advantage (1); one employer advantage (1)',
        '(c) Jobs lost through automation of routine tasks (1); jobs created in technical and support roles (1)',
      ],
      marks: 11,
      explanation:
        'These are recall marks, given away every series, and the structure is always problem-plus-prevention or advantage-plus-whose. Pair each point with whose benefit it is — an answer that lists advantages without saying whether they fall to the employee or the employer will lose half the marks.',
      hint: 'Every point needs its partner: the problem and the fix, the benefit and whose it is.',
    },
  },
  {
    subject: 'ict',
    subtopic: '18.1',
    rank: 10,
    trap: 'Choosing a numeric field type for things like telephone numbers or reference codes. If you will never do arithmetic on it, and leading zeros matter, it is text.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A school stores student records in a database.\n\n(a) State the most appropriate data type for each of the following fields and justify each choice: date of birth, telephone number, whether the student has paid a trip fee, number of siblings.\n(b) Explain what is meant by a primary key and state why student name would be unsuitable as one.\n(c) Explain one advantage of storing the data in a relational database rather than a single flat file.',
      answer:
        '(a) Date of birth — date/time, so it can be sorted and used to calculate age. Telephone number — text, because leading zeros must be preserved and no arithmetic is done on it. Trip fee paid — Boolean/yes-no, because there are only two possible values. Number of siblings — numeric (integer), because it is a count that may be used in calculations. (b) A primary key is a field that uniquely identifies each record in a table. Student name is unsuitable because two students may share the same name, so it would not be unique. (c) Data is stored once and linked between tables, so there is less duplication, less wasted storage, and no risk of the same fact being updated in one place but not another.',
      markScheme: [
        '(a) Four correct data types (2) with valid justifications (2)',
        '(b) Uniquely identifies each record (1)',
        '(b) Names can be duplicated, so uniqueness is not guaranteed (1)',
        '(c) Reduces data duplication / redundancy (1) and avoids inconsistent updates (1)',
      ],
      marks: 8,
      explanation:
        'The telephone number is the discriminating mark almost every time: storing it as a number silently strips the leading zero, which is why it must be text. The general test for a numeric field is whether adding, averaging or subtracting the values would ever be meaningful.',
      hint: 'Would you ever add two of these together? If not, it is probably text.',
    },
  },
];
