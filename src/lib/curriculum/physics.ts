import type { SyllabusSeed } from './types';

/**
 * Cambridge IGCSE Physics 0625 — topic structure.
 *
 * The topic and subtopic numbering follows the published 0625 specification for
 * first examination 2023. Learning-objective *statements* below are teacher
 * phrasing, not verbatim Cambridge text: they are seeded with `verified: false`
 * and the UI labels them as a working map until an administrator checks them
 * against the official syllabus document and marks them verified.
 */
export const physics0625: SyllabusSeed = {
  subject: {
    code: '0625',
    slug: 'physics',
    name: 'Physics',
    tagline: 'Motion, energy, waves, electricity and the universe.',
    accent: 'physics',
  },
  version: {
    code: '0625-2023-2025',
    label: 'Physics 0625 — for examination 2023–2025',
    examFrom: 2023,
    examTo: 2025,
    provenance: 'TEACHER_MAPPED',
    sourceNote:
      'Structure mapped from the Cambridge IGCSE Physics 0625 specification (first examination 2023). Objective wording is a teaching paraphrase — check against the official syllabus PDF before relying on it for exam preparation.',
  },
  topics: [
    {
      number: '1',
      slug: 'motion-forces-energy',
      title: 'Motion, forces and energy',
      summary:
        'How objects move, what changes their motion, and how energy is stored, transferred and conserved.',
      subtopics: [
        {
          number: '1.1',
          slug: 'physical-quantities-and-measurement',
          title: 'Physical quantities and measurement techniques',
          summary:
            'SI units and prefixes, measuring length, volume and time, and the difference between scalars and vectors.',
          objectives: [
            { code: '1.1.1', statement: 'Describe how to measure length, volume and time intervals, including the use of multiple readings to improve accuracy.', tier: 'CORE' },
            { code: '1.1.2', statement: 'Understand that a scalar quantity has magnitude only and a vector quantity has both magnitude and direction.', tier: 'CORE' },
            { code: '1.1.3', statement: 'Determine the resultant of two vectors at right angles, graphically or by calculation.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'units-prefixes-and-vectors',
              title: 'Units, prefixes and vectors',
              readingMinutes: 7,
              body: `Every physical quantity is a **number and a unit**. Drop the unit and the number means nothing — an answer of "12" is worth zero marks.

### The SI base units you need
- metre (m) for length
- kilogram (kg) for mass
- second (s) for time
- ampere (A) for current
- kelvin (K) for temperature

Everything else is built from these. A newton, for example, is really \`kg m/s²\`.

### Prefixes
Prefixes scale a unit by a power of ten. The ones that appear in 0625 papers are:

- nano (n) = ×10⁻⁹
- micro (µ) = ×10⁻⁶
- milli (m) = ×10⁻³
- centi (c) = ×10⁻²
- kilo (k) = ×10³
- mega (M) = ×10⁶
- giga (G) = ×10⁹

The single most common mark loss in the whole paper is converting these the wrong way. Ask yourself: is the new number bigger or smaller than the old one? 5 km must be **5000** m, not 0.005 m.

### Scalars and vectors
A **scalar** has size only: distance, speed, mass, time, energy.
A **vector** has size *and* direction: displacement, velocity, acceleration, force, momentum, weight.

Two vectors at right angles combine with Pythagoras for the magnitude and trigonometry for the direction. Two vectors along the same line simply add, taking one direction as positive.

### Measuring well
- Take several readings and average them.
- For a small length (like the thickness of paper), measure many together and divide.
- For a pendulum, time 20 swings and divide by 20 — this reduces the effect of your reaction time.`,
              analogy:
                'Speed is "how fast" — velocity is "how fast, and which way". A car going round a roundabout at a steady 20 km/h has constant speed but constantly changing velocity.',
              misconceptions: [
                'Thinking distance and displacement are the same. Walk 3 m east then 3 m west: distance is 6 m, displacement is 0.',
                'Multiplying instead of dividing when converting prefixes. Always sanity-check whether the number should get bigger or smaller.',
                'Treating mass and weight as the same quantity — mass is a scalar in kg, weight is a vector in N.',
              ],
              examTips: [
                'Write the unit on every line of working, not just the final answer.',
                'If a question says "state", one short sentence is enough — no marks for extra prose.',
                'When asked to improve accuracy, "repeat and average" and "measure a larger quantity and divide" are the two standard answers.',
              ],
              workedExamples: [
                {
                  prompt: 'A student measures the time for 20 swings of a pendulum as 31.4 s. Find the time for one swing.',
                  steps: [
                    'The time for one swing (the period) is the total time divided by the number of swings.',
                    'T = 31.4 / 20',
                  ],
                  answer: 'T = 1.57 s',
                },
                {
                  prompt: 'A force of 3.0 N acts north and 4.0 N acts east on the same object. Find the resultant.',
                  steps: [
                    'The forces are perpendicular, so use Pythagoras for the magnitude.',
                    'R = √(3.0² + 4.0²) = √25',
                    'Direction: tan θ = 4.0 / 3.0, so θ = 53° east of north.',
                  ],
                  answer: '5.0 N at 53° east of north',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define a scalar quantity.', back: 'A quantity that has magnitude (size) only.', difficulty: 'EASY' },
            { front: 'Define a vector quantity.', back: 'A quantity that has both magnitude and direction.', difficulty: 'EASY' },
            { front: 'How many metres in 2.5 km?', back: '2500 m', difficulty: 'EASY' },
            { front: 'Name three vector quantities.', back: 'Any of: force, weight, velocity, acceleration, momentum, displacement.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which of these is a vector quantity?',
              options: [
                { id: 'a', text: 'Speed', why: 'Speed has magnitude only — it tells you how fast, not which way.' },
                { id: 'b', text: 'Mass', why: 'Mass is a scalar measured in kilograms.' },
                { id: 'c', text: 'Weight', why: '' },
                { id: 'd', text: 'Energy', why: 'Energy is a scalar — it has no direction.' },
              ],
              answer: 'c',
              markScheme: ['Weight (1)'],
              marks: 1,
              explanation:
                'Weight is a force — the gravitational pull on a mass — so it has both magnitude and direction (downwards). Speed, mass and energy are all scalars.',
              hint: 'Which one is a force?',
            },
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A wire has a diameter of 0.45 mm. Express this diameter in metres, in standard form.',
              answer: '4.5 × 10⁻⁴ m',
              markScheme: ['Converts mm to m by dividing by 1000 (1)', 'Answer 4.5 × 10⁻⁴ m (1)'],
              marks: 2,
              explanation:
                '1 mm = 10⁻³ m, so 0.45 mm = 0.45 × 10⁻³ m = 4.5 × 10⁻⁴ m. The number gets smaller because a metre is a bigger unit than a millimetre.',
            },
          ],
        },
        {
          number: '1.2',
          slug: 'motion',
          title: 'Motion',
          summary:
            'Speed, velocity and acceleration, distance–time and speed–time graphs, and motion under gravity.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '1.2.1', statement: 'Define speed as distance travelled per unit time and calculate it using v = s / t.', tier: 'CORE' },
            { code: '1.2.2', statement: 'Define velocity as speed in a given direction, and acceleration as change of velocity per unit time.', tier: 'CORE' },
            { code: '1.2.3', statement: 'Interpret distance–time and speed–time graphs, including gradient and area.', tier: 'CORE' },
            { code: '1.2.4', statement: 'Describe the motion of objects falling with and without air resistance, including terminal velocity.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['projectile-motion', 'motion-graphs'],
          lessons: [
            {
              slug: 'speed-velocity-acceleration',
              title: 'Speed, velocity and acceleration',
              readingMinutes: 8,
              body: `### The three quantities
**Speed** is how much distance is covered per second: \`v = s / t\`, measured in m/s.

**Velocity** is speed in a stated direction. A velocity of −5 m/s means 5 m/s in the negative direction.

**Acceleration** is how quickly velocity changes: \`a = Δv / t\`, measured in m/s². A negative acceleration (deceleration) means the object is slowing down, *or* speeding up in the negative direction — read the question carefully.

### Reading graphs
This is where most marks are won and lost.

On a **distance–time graph**:
- a horizontal line means stationary
- a straight sloping line means constant speed
- the **gradient** is the speed
- a curve means the speed is changing

On a **speed–time graph**:
- a horizontal line means constant speed
- the **gradient** is the acceleration
- the **area under the line** is the distance travelled

That last point is worth memorising as a single sentence: *gradient gives acceleration, area gives distance.*

### Falling objects
Near the Earth's surface, an object in free fall accelerates at about **9.8 m/s²** (often taken as 10 m/s² in calculations).

With air resistance, the story changes:
1. At the start, speed is zero, so air resistance is zero and acceleration is maximum.
2. As the object speeds up, air resistance grows.
3. When air resistance equals weight, the resultant force is zero, so acceleration is zero.
4. The object then falls at a constant **terminal velocity**.

Note that it keeps falling — it does not stop. Terminal velocity means constant speed, not zero speed.`,
              analogy:
                'A speed–time graph is like a bank statement of motion: the height tells you the current rate, and the area you have "accumulated" tells you the total distance.',
              misconceptions: [
                'Reading a distance–time graph as if it were a speed–time graph. A horizontal line on the first means "not moving"; on the second it means "moving at a steady speed".',
                'Believing that at terminal velocity the object stops falling. It falls at a constant speed because the resultant force is zero.',
                'Assuming heavier objects always fall faster. Without air resistance they accelerate identically.',
              ],
              examTips: [
                'For "describe the motion" questions, work through the graph section by section and use the words: constant speed, accelerating, decelerating, stationary.',
                'When finding distance from a speed–time graph, split the area into triangles and rectangles and show each area separately.',
                'Always state the direction when a question asks for velocity rather than speed.',
              ],
              workedExamples: [
                {
                  prompt: 'A car accelerates uniformly from rest to 24 m/s in 8.0 s. Calculate the acceleration and the distance travelled.',
                  steps: [
                    'Acceleration: a = Δv / t = (24 − 0) / 8.0 = 3.0 m/s²',
                    'Distance = area under the speed–time graph = ½ × base × height',
                    'Distance = ½ × 8.0 × 24 = 96 m',
                  ],
                  answer: 'a = 3.0 m/s², s = 96 m',
                },
                {
                  prompt: 'A cyclist travels 450 m in 30 s. Calculate the average speed.',
                  steps: ['v = s / t', 'v = 450 / 30'],
                  answer: 'v = 15 m/s',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does the gradient of a distance–time graph represent?', back: 'Speed.', difficulty: 'EASY' },
            { front: 'What does the area under a speed–time graph represent?', back: 'The distance travelled.', difficulty: 'MEDIUM' },
            { front: 'What does the gradient of a speed–time graph represent?', back: 'Acceleration.', difficulty: 'EASY' },
            { front: 'Explain terminal velocity.', back: 'The constant velocity reached when air resistance equals weight, so the resultant force — and therefore the acceleration — is zero.', difficulty: 'HARD' },
            { front: 'Define acceleration.', back: 'The change in velocity per unit time.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'A speed–time graph shows a horizontal line at 12 m/s lasting 5.0 s. What does the graph tell you?',
              options: [
                { id: 'a', text: 'The object is stationary.', why: 'A horizontal line at 12 m/s means the speed is 12 m/s, not zero.' },
                { id: 'b', text: 'The object travels 60 m at constant speed.', why: '' },
                { id: 'c', text: 'The object accelerates at 12 m/s².', why: 'Acceleration is the gradient, which is zero here.' },
                { id: 'd', text: 'The object travels 12 m in total.', why: 'Distance is the area, 12 × 5.0 = 60 m.' },
              ],
              answer: 'b',
              markScheme: ['The object travels 60 m at constant speed (1)'],
              marks: 1,
              explanation:
                'A horizontal line on a speed–time graph means constant speed (zero acceleration). The distance is the area under the line: 12 × 5.0 = 60 m.',
              hint: 'Gradient gives acceleration; area gives distance.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A skydiver jumps from a plane and eventually falls at a constant speed. Explain, in terms of the forces acting, why the skydiver reaches a constant speed.',
              answer:
                'As speed increases, air resistance increases. When air resistance equals weight the resultant force is zero, so there is no acceleration and the speed stays constant.',
              markScheme: [
                'Air resistance increases as speed increases (1)',
                'Air resistance becomes equal to weight (1)',
                'Resultant force is zero, so acceleration is zero / speed is constant (1)',
              ],
              marks: 3,
              explanation:
                'The chain of reasoning the examiner wants is: speed ↑ → air resistance ↑ → air resistance = weight → resultant force = 0 → acceleration = 0 → constant (terminal) velocity. Saying only "the forces balance" usually scores 1 of 3.',
              hint: 'Name both forces, then say what happens to each one as speed changes.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A train decelerates uniformly from 30 m/s to 6.0 m/s in 12 s. Calculate (a) the deceleration and (b) the distance travelled while decelerating.',
              answer: '(a) 2.0 m/s²  (b) 216 m',
              markScheme: [
                'a = (6.0 − 30) / 12 = −2.0 m/s², i.e. deceleration of 2.0 m/s² (2)',
                'Distance = area = ½ × (30 + 6.0) × 12 (1)',
                'Distance = 216 m (1)',
              ],
              marks: 4,
              explanation:
                'The area under a speed–time graph for uniform deceleration is a trapezium: ½ × (first speed + last speed) × time. That gives ½ × 36 × 12 = 216 m.',
              hint: 'The shape under the graph is a trapezium.',
            },
          ],
        },
        {
          number: '1.3',
          slug: 'mass-and-weight',
          title: 'Mass and weight',
          summary:
            'Mass as the quantity of matter, weight as the force of gravity on a mass, and gravitational field strength.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '1.3.1', statement: 'Distinguish between mass and weight, and state that weight is a gravitational force.', tier: 'CORE' },
            { code: '1.3.2', statement: 'Recall and use W = mg and understand g as gravitational field strength.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'mass-and-weight',
              title: 'Mass and weight',
              readingMinutes: 5,
              body: `Mass and weight are mixed up constantly in everyday speech, and separating them properly is worth several marks in every paper.

### Mass
**Mass** is the amount of matter in an object, measured in kilograms. It does not depend on location — take an object to the Moon and its mass is unchanged, because it is still made of the same amount of stuff.

### Weight
**Weight** is the force of gravity acting on that mass: \`W = mg\`, measured in newtons. Because it is a force, weight is a vector, and it depends on where you are.

### Gravitational field strength
**g**, gravitational field strength, is the weight per unit mass at a location, in N/kg. On Earth, g ≈ 9.8 N/kg (often taken as 10 N/kg). On the Moon, g is only about 1.6 N/kg, because the Moon has far less mass than the Earth.

A 70 kg astronaut has the same mass on the Moon as on Earth, but weighs roughly six times less there, because g is roughly six times smaller.

### How to measure each
Mass is measured with a balance, comparing against known masses. Weight is measured with a newtonmeter (spring balance), which measures the force stretching a spring.`,
              analogy:
                'Mass is how much "stuff" is in your backpack — it does not change no matter where you carry it. Weight is how hard gravity pulls on that backpack, which is why the same backpack would feel lighter on the Moon.',
              misconceptions: [
                'Saying an astronaut is "weightless" because they have no mass in space. Their mass is unchanged; their weight is very small (or effectively zero in free fall) because they are far from a large gravitational source.',
                'Using "weight" and "mass" interchangeably, and their units (kg for weight) as a result — weight is always in newtons.',
                'Assuming g is a universal constant. It depends on the mass of the nearby planet or moon, so it is different everywhere.',
              ],
              examTips: [
                'A question that gives a mass in kg and asks for a "weight" wants an answer in newtons, using W = mg — check units before submitting.',
                'If asked to explain why an astronaut weighs less on the Moon, the answer must reference gravitational field strength, not simply "there is less gravity" without saying why that changes weight but not mass.',
              ],
              workedExamples: [
                {
                  prompt: 'An object has a mass of 8.0 kg. Calculate its weight on Earth (g = 9.8 N/kg) and on the Moon (g = 1.6 N/kg).',
                  steps: [
                    'W = mg',
                    'On Earth: W = 8.0 × 9.8',
                    'On the Moon: W = 8.0 × 1.6',
                  ],
                  answer: 'Earth: 78.4 N. Moon: 12.8 N. Mass is 8.0 kg in both cases.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define weight.', back: 'The force acting on an object due to a gravitational field, W = mg, measured in newtons.', difficulty: 'MEDIUM' },
            { front: 'What is gravitational field strength on Earth?', back: 'About 9.8 N/kg (often used as 10 N/kg).', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'FOUNDATION',
              stem: 'Calculate the weight of a 6.0 kg object where g = 9.8 N/kg.',
              answer: '59 N',
              markScheme: ['W = mg (1)', 'W = 6.0 × 9.8 = 58.8 ≈ 59 N (1)'],
              marks: 2,
              explanation: 'Weight is mass × gravitational field strength: 6.0 × 9.8 = 58.8 N, which rounds to 59 N to 2 significant figures.',
            },
          ],
        },
        {
          number: '1.4',
          slug: 'density',
          title: 'Density',
          summary: 'Density as mass per unit volume, measuring it for regular and irregular solids and for liquids, and floating.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '1.4.1', statement: 'Define density and recall and use ρ = m / V.', tier: 'CORE' },
            { code: '1.4.2', statement: 'Describe how to determine the density of a liquid, a regularly shaped solid and an irregularly shaped solid.', tier: 'CORE' },
            { code: '1.4.3', statement: 'Predict whether an object will float based on density data.', tier: 'CORE' },
          ],
          simulations: ['density-lab'],
          lessons: [
            {
              slug: 'density',
              title: 'Density',
              readingMinutes: 6,
              body: `**Density** is mass per unit volume: \`ρ = m / V\`, usually in kg/m³ or g/cm³ (1 g/cm³ = 1000 kg/m³).

### Measuring density
The method depends on the shape:

**Regular solid** (a cube, cylinder): measure the mass with a balance. Measure the dimensions with a ruler or vernier calipers and calculate the volume from the shape's formula. Then ρ = m / V.

**Irregular solid** (a stone): measure the mass with a balance. Find the volume by **displacement** — lower the object into a partly filled measuring cylinder and read the rise in water level, or use a displacement can and collect and measure the overflow.

**Liquid**: measure the mass of an empty measuring cylinder, then the mass with a known volume of liquid in it. Subtract to find the mass of the liquid, and divide by the volume.

### Predicting floating
An object floats in a fluid if its density is **less than** the density of the fluid, and sinks if its density is **greater**. Ice (about 0.92 g/cm³) floats on water (1.0 g/cm³) because it is less dense — this is why icebergs float with most of their bulk underwater.`,
              analogy:
                'Density is how "packed" something is, not how big it is. A large beach ball and a small pebble can have very different densities even though the ball is bigger — it is mass squeezed into space that matters, not size alone.',
              misconceptions: [
                'Confusing density with mass or weight. A large but low-density object (polystyrene) can have less mass than a small, dense one (a lead ball).',
                'Forgetting to subtract the empty measuring cylinder\'s mass when finding the density of a liquid.',
                'Assuming all solids sink and all gases float — it depends entirely on comparing the two densities involved, not the state of matter.',
              ],
              examTips: [
                'State the displacement method precisely: "the volume of water displaced equals the volume of the object" is the key sentence markers look for.',
                'Always check your units are consistent — mixing g and kg, or cm³ and m³, is the most common way to lose an otherwise correct density calculation.',
              ],
              workedExamples: [
                {
                  prompt: 'An irregular rock has a mass of 156 g. When lowered into a measuring cylinder, the water level rises from 40 cm³ to 80 cm³. Calculate the density of the rock.',
                  steps: [
                    'Volume of rock = volume displaced = 80 − 40 = 40 cm³',
                    'ρ = m / V',
                    'ρ = 156 / 40',
                  ],
                  answer: 'ρ = 3.9 g/cm³',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define density.', back: 'Mass per unit volume.', difficulty: 'EASY' },
            { front: 'How do you find the volume of an irregular solid?', back: 'Displacement: lower it into a measuring cylinder (or displacement can) of water and measure the volume of water displaced.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A block of metal has a mass of 810 g and a volume of 300 cm³. Calculate its density in g/cm³ and state whether it would float in water (density 1.0 g/cm³).',
              answer: '2.7 g/cm³; it sinks',
              markScheme: ['ρ = m / V (1)', 'ρ = 810 / 300 = 2.7 g/cm³ (1)', 'Sinks, because its density is greater than that of water (1)'],
              marks: 3,
              explanation:
                'Density = 810 / 300 = 2.7 g/cm³. Anything denser than the liquid it is placed in will sink, so this block sinks in water.',
            },
          ],
        },
        {
          number: '1.5',
          slug: 'forces',
          title: 'Forces',
          summary:
            'Resultant force and Newton\'s laws, friction, springs and Hooke\'s law, circular motion, turning effect and equilibrium, and centre of gravity.',
          prerequisites: ['1.2', '1.3'],
          objectives: [
            { code: '1.5.1', statement: 'Describe the effects of forces on shape and motion, and determine the resultant of forces acting along the same line.', tier: 'CORE' },
            { code: '1.5.2', statement: 'Recall and use F = ma.', tier: 'CORE' },
            { code: '1.5.3', statement: 'Describe the extension of a spring and interpret load–extension graphs, including the limit of proportionality.', tier: 'CORE' },
            { code: '1.5.4', statement: 'Calculate the moment of a force about a pivot and apply the principle of moments to a balanced system.', tier: 'CORE' },
            { code: '1.5.5', statement: 'Describe motion in a circle as requiring a resultant force directed towards the centre.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['forces-lab', 'moments-balance'],
          lessons: [
            {
              slug: 'resultant-force-and-newtons-laws',
              title: 'Resultant force and Newton\'s laws',
              readingMinutes: 8,
              body: `A **force** is a push or a pull. It can change an object's speed, its direction, or its shape.

### Resultant force
When several forces act on an object, only the **resultant** matters. Along a straight line, choose one direction as positive and add them with signs.

Newton's laws in the language 0625 uses:

1. **If the resultant force is zero**, a stationary object stays stationary and a moving object keeps moving at constant velocity.
2. **If the resultant force is not zero**, the object accelerates in the direction of that force, with \`F = ma\`.
3. Forces come in pairs: if A pushes B, B pushes A with an equal force in the opposite direction.

### Friction and drag
Friction opposes motion between surfaces in contact. Air resistance (drag) is friction with a fluid and grows with speed. Both transfer energy to the internal (thermal) store of the surroundings.

### Springs and Hooke's law
For a spring, extension is directly proportional to load — up to the **limit of proportionality**. On a load–extension graph this is the point where the straight line starts to curve. Beyond the elastic limit the spring will not return to its original length.

Be precise: the graph is a straight line *through the origin* while the spring obeys the law.

### Turning effects
The **moment** of a force about a pivot is \`moment = force × perpendicular distance from the pivot\`, in N m.

For a body in equilibrium, two conditions hold at once:
- the resultant force is zero
- the sum of clockwise moments equals the sum of anticlockwise moments about any point

That second statement is the **principle of moments**, and it solves almost every beam question in the paper.`,
              analogy:
                'A moment is why a long spanner loosens a bolt that a short one cannot: the same push, applied further from the pivot, produces a bigger turning effect.',
              misconceptions: [
                'Thinking a moving object needs a constant force to keep moving. With zero resultant force it keeps moving at constant velocity.',
                'Using the distance along the beam rather than the perpendicular distance from the pivot when the force is at an angle.',
                'Confusing the limit of proportionality with the elastic limit — they are different points on the graph.',
              ],
              examTips: [
                'For balanced-beam questions, always write "clockwise moments = anticlockwise moments" as your first line. It is often a mark on its own.',
                'Moments are in N m — do not convert distances to centimetres and forget to change back.',
                'When a question says "explain in terms of forces", name each force and say whether it is bigger, smaller or equal to the others.',
              ],
              workedExamples: [
                {
                  prompt: 'A 1200 kg car experiences a resultant forward force of 3000 N. Calculate its acceleration.',
                  steps: ['F = ma, so a = F / m', 'a = 3000 / 1200'],
                  answer: 'a = 2.5 m/s²',
                },
                {
                  prompt: 'A uniform beam is pivoted at its centre. A 20 N weight sits 0.30 m to the left of the pivot. How far to the right must a 12 N weight be placed to balance it?',
                  steps: [
                    'Principle of moments: clockwise moments = anticlockwise moments',
                    '20 × 0.30 = 12 × d',
                    '6.0 = 12d, so d = 0.50 m',
                  ],
                  answer: 'd = 0.50 m from the pivot',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the equation linking force, mass and acceleration.', back: 'F = ma (force in N, mass in kg, acceleration in m/s²).', difficulty: 'EASY' },
            { front: 'Define the moment of a force.', back: 'Force × perpendicular distance from the pivot.', difficulty: 'MEDIUM' },
            { front: 'State the principle of moments.', back: 'For a body in equilibrium, the sum of the clockwise moments about any point equals the sum of the anticlockwise moments about that point.', difficulty: 'HARD' },
            { front: 'What is the limit of proportionality?', back: 'The point beyond which extension is no longer directly proportional to load.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A spanner 0.25 m long is used to apply a force of 60 N perpendicular to its handle. Calculate the moment about the bolt.',
              answer: '15 N m',
              markScheme: ['Moment = force × perpendicular distance (1)', 'Moment = 60 × 0.25 = 15 N m (1)'],
              marks: 2,
              explanation: 'Moment = F × d = 60 × 0.25 = 15 N m. The unit is newton metre, written N m.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A uniform metre rule of weight 1.2 N is pivoted at the 40 cm mark. A weight of 2.0 N hangs at the 10 cm mark. Determine whether the rule balances, and if not, state which way it turns.',
              answer:
                'Anticlockwise moment = 2.0 × 0.30 = 0.60 N m. The rule\'s weight acts at the 50 cm mark: clockwise moment = 1.2 × 0.10 = 0.12 N m. The moments are unequal, so the rule turns anticlockwise (towards the 2.0 N weight).',
              markScheme: [
                'Identifies that the weight of a uniform rule acts at its centre, the 50 cm mark (1)',
                'Anticlockwise moment = 2.0 × 0.30 = 0.60 N m (1)',
                'Clockwise moment = 1.2 × 0.10 = 0.12 N m (1)',
                'Concludes not balanced, turns anticlockwise (1)',
              ],
              marks: 4,
              explanation:
                'The hidden step is remembering that a uniform rule has its centre of gravity at the 50 cm mark, so its own weight produces a moment about a pivot that is not at the centre. Distances must be measured from the pivot at 40 cm.',
              hint: 'Where does the weight of a uniform rule act?',
            },
          ],
        },
        {
          number: '1.6',
          slug: 'momentum',
          title: 'Momentum',
          summary: 'Momentum as mass × velocity, impulse, and conservation of momentum in collisions.',
          prerequisites: ['1.5'],
          objectives: [
            { code: '1.6.1', statement: 'Define momentum as p = mv and impulse as Ft = Δ(mv).', tier: 'SUPPLEMENT' },
            { code: '1.6.2', statement: 'Apply the principle of conservation of momentum to one-dimensional collisions.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'momentum',
              title: 'Momentum and conservation of momentum',
              readingMinutes: 7,
              body: `**Momentum** is the product of mass and velocity: \`p = mv\`, measured in kg m/s. Because velocity is a vector, momentum is a vector too, and direction matters.

### Conservation of momentum
In a closed system, with no external resultant force, **total momentum before an event equals total momentum after it**. This applies to collisions and explosions alike.

The method for every momentum question is the same: work out the total momentum before (adding with signs, since direction matters), set it equal to the total momentum after, and solve for the unknown.

### Momentum and Newton's laws
Momentum conservation is really a consequence of Newton's third law. In a collision, each object exerts an equal and opposite force on the other for the same time, so the change in momentum of one object is equal and opposite to the change in momentum of the other — the total stays the same.

### Explosions
The same principle applies to an explosion, such as a gun firing a bullet or two skaters pushing apart. Before the explosion the total momentum is zero (nothing is moving); afterwards, the two momenta must still sum to zero, so the objects move apart with momenta equal in size but opposite in direction.`,
              analogy:
                'Think of momentum like a shared "moving budget" between colliding objects. They can hand it to each other during the collision, but the total in the system never changes — nobody can create or destroy momentum, only pass it around.',
              misconceptions: [
                'Adding momenta without considering direction. Momentum moving in one direction should be treated as negative if the other object moves the opposite way.',
                'Confusing conservation of momentum with conservation of kinetic energy — momentum is always conserved in a collision, but kinetic energy is only conserved in a perfectly elastic collision, which is rare.',
                'Thinking a stationary object has no role in the momentum equation. A stationary object still has zero momentum, and that zero must be included in the total.',
              ],
              examTips: [
                'Define a positive direction at the start of the question and stick to it — this is where most sign errors happen.',
                'When two objects stick together after a collision, use their combined mass in the "after" side of the equation.',
              ],
              workedExamples: [
                {
                  prompt: 'A 2.0 kg trolley moving at 3.0 m/s collides head-on with a stationary 1.0 kg trolley. After the collision they move off together. Calculate their common velocity.',
                  steps: [
                    'Momentum before = 2.0 × 3.0 + 1.0 × 0 = 6.0 kg m/s',
                    'Momentum after = (2.0 + 1.0) × v',
                    'Set equal: 6.0 = 3.0v',
                  ],
                  answer: 'v = 2.0 m/s, in the same direction as the first trolley.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define momentum.', back: 'Mass × velocity (p = mv), measured in kg m/s.', difficulty: 'EASY' },
            { front: 'State the principle of conservation of momentum.', back: 'In a closed system with no external resultant force, total momentum before a collision equals total momentum after.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'A 0.50 kg trolley moving at 4.0 m/s collides with a stationary 1.5 kg trolley and they move off together. Calculate their common velocity.',
              answer: '1.0 m/s',
              markScheme: [
                'Total momentum before = 0.50 × 4.0 = 2.0 kg m/s (1)',
                'Total momentum after = (0.50 + 1.5) × v (1)',
                'v = 2.0 / 2.0 = 1.0 m/s (1)',
              ],
              marks: 3,
              explanation:
                'Momentum is conserved: 2.0 kg m/s before must equal 2.0 kg m/s after. The combined mass is 2.0 kg, so v = 1.0 m/s in the original direction.',
            },
          ],
        },
        {
          number: '1.7',
          slug: 'energy-work-power',
          title: 'Energy, work and power',
          summary:
            'Energy stores and transfers, conservation of energy, kinetic and gravitational potential energy, work, power, efficiency and energy resources.',
          prerequisites: ['1.5'],
          objectives: [
            { code: '1.7.1', statement: 'Identify energy stores and describe transfers between them using the principle of conservation of energy.', tier: 'CORE' },
            { code: '1.7.2', statement: 'Recall and use Ek = ½mv² and ΔEp = mgΔh.', tier: 'CORE' },
            { code: '1.7.3', statement: 'Recall and use W = Fd and P = E / t.', tier: 'CORE' },
            { code: '1.7.4', statement: 'Calculate efficiency as useful output energy divided by total input energy.', tier: 'CORE' },
            { code: '1.7.5', statement: 'Describe how energy is obtained from a range of resources and compare their advantages and disadvantages.', tier: 'CORE' },
          ],
          simulations: ['energy-skate'],
          lessons: [
            {
              slug: 'energy-stores-work-and-power',
              title: 'Energy stores, work and power',
              readingMinutes: 8,
              body: `Energy is never created or destroyed — it is **transferred** between stores. The examinable stores are: kinetic, gravitational potential, elastic (strain), chemical, nuclear, internal (thermal), electrostatic.

### Work
**Work done = force × distance moved in the direction of the force**: \`W = Fd\`, in joules.

Doing work on an object is one way of transferring energy to it. If you lift a box, you do work against gravity and its gravitational potential store increases.

### The two equations you will use most
- Kinetic energy: \`Ek = ½mv²\`
- Change in gravitational potential energy: \`ΔEp = mgΔh\`

Notice the **squared** in the kinetic energy equation. Doubling the speed multiplies the kinetic energy by four — this is why stopping distances grow so sharply with speed.

### Power
**Power is the rate of energy transfer**: \`P = E / t\`, in watts. One watt is one joule per second. It is also true that \`P = W / t\` since work is energy transferred.

### Efficiency
\`efficiency = useful output energy ÷ total input energy\` (× 100 for a percentage).

Efficiency can never exceed 100%. If you calculate more than that, you have swapped the numerator and denominator.

### Energy resources
You should be able to compare: fossil fuels, nuclear, hydroelectric, solar, wind, geothermal, tidal and biofuel — on availability, reliability, cost, and environmental impact. Almost all of them ultimately trace back to the Sun; the exceptions are nuclear, geothermal and tidal.`,
              analogy:
                'Energy is like money in different accounts. Spending does not destroy it — it moves it. Efficiency is how much of the transfer actually reached the account you wanted.',
              misconceptions: [
                'Saying energy is "used up". It is transferred, often to the internal store of the surroundings where it is no longer useful.',
                'Forgetting to square the speed in ½mv².',
                'Using the total distance moved rather than the distance moved in the direction of the force when calculating work.',
              ],
              examTips: [
                'For efficiency, write the fraction before substituting — a wrong-way-up answer loses the method mark too.',
                'Energy-resource questions expect balanced answers: one advantage and one disadvantage, both specific.',
                '"Describe the energy transfers" means name the store it comes from and the store it goes to, in order.',
              ],
              workedExamples: [
                {
                  prompt: 'A 0.20 kg ball is thrown at 15 m/s. Calculate its kinetic energy.',
                  steps: ['Ek = ½mv²', 'Ek = ½ × 0.20 × 15²', 'Ek = ½ × 0.20 × 225'],
                  answer: 'Ek = 22.5 J',
                },
                {
                  prompt: 'A motor lifts a 45 kg load 8.0 m in 12 s. Take g = 10 N/kg. Calculate the useful power output.',
                  steps: [
                    'Energy transferred = ΔEp = mgΔh = 45 × 10 × 8.0 = 3600 J',
                    'P = E / t = 3600 / 12',
                  ],
                  answer: 'P = 300 W',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the principle of conservation of energy.', back: 'Energy cannot be created or destroyed; it can only be transferred from one store to another.', difficulty: 'MEDIUM' },
            { front: 'Give the equation for kinetic energy.', back: 'Ek = ½mv²', difficulty: 'EASY' },
            { front: 'Define power.', back: 'The rate of energy transfer (or the rate of doing work), measured in watts.', difficulty: 'EASY' },
            { front: 'Give the equation for efficiency.', back: 'Efficiency = useful output energy ÷ total input energy (× 100%).', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A lamp transfers 60 J of energy each second, of which 9.0 J is transferred usefully as light. Calculate the efficiency of the lamp.',
              answer: '15%',
              markScheme: ['Efficiency = useful / total (1)', '9.0 / 60 = 0.15 (1)', '= 15% (1)'],
              marks: 3,
              explanation:
                'Efficiency = 9.0 ÷ 60 = 0.15, which is 15%. The remaining 51 J each second is transferred to the internal (thermal) store of the surroundings.',
            },
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'A car doubles its speed. What happens to its kinetic energy?',
              options: [
                { id: 'a', text: 'It stays the same.', why: 'Kinetic energy depends on speed, so it must change.' },
                { id: 'b', text: 'It doubles.', why: 'This would be true if Ek depended on v, but it depends on v².' },
                { id: 'c', text: 'It is four times larger.', why: '' },
                { id: 'd', text: 'It is eight times larger.', why: 'That would require v³.' },
              ],
              answer: 'c',
              markScheme: ['Four times larger (1)'],
              marks: 1,
              explanation: 'Ek = ½mv². Since v is squared, doubling v multiplies the kinetic energy by 2² = 4.',
            },
          ],
        },
        {
          number: '1.8',
          slug: 'pressure',
          title: 'Pressure',
          summary: 'Pressure as force per unit area, pressure in liquids and gases, and the effect of depth.',
          prerequisites: ['1.5'],
          objectives: [
            { code: '1.8.1', statement: 'Define pressure and recall and use p = F / A.', tier: 'CORE' },
            { code: '1.8.2', statement: 'Describe how pressure in a liquid varies with depth and density, and recall and use Δp = ρgΔh.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['pressure-depth'],
          lessons: [
            {
              slug: 'pressure',
              title: 'Pressure',
              readingMinutes: 6,
              body: `**Pressure** is force per unit area: \`p = F / A\`, measured in pascals (Pa), where 1 Pa = 1 N/m².

For the same force, a smaller area gives a larger pressure. This is why a drawing pin has a sharp point (small area, large pressure driving it into a surface) and why skis or snowshoes have a large area (spreading your weight, reducing pressure so you do not sink into snow).

### Pressure in a liquid
Pressure in a liquid increases with **depth**, because there is a greater weight of liquid pressing down from above. It also increases with the **density** of the liquid.

The relationship is \`Δp = ρgΔh\`: the pressure difference between two depths equals density × gravitational field strength × the change in depth.

Two useful facts about liquid pressure:
- At a given depth, pressure acts **equally in all directions** — up, down and sideways.
- Pressure depends only on depth and density, **not** on the shape or width of the container.`,
              analogy:
                'Pressure from a liquid is like the weight of a stack of books pressing down on a table. The deeper you go, the taller the "stack" of liquid above you, and the harder it presses — regardless of how wide the stack is.',
              misconceptions: [
                'Believing a wider container has higher pressure at the bottom. Pressure at a given depth depends only on the depth and the density of the liquid, not the width or shape of the container.',
                'Forgetting that pressure acts in all directions, not just downwards — a submerged object feels pressure pushing in from every side.',
                'Mixing up force and pressure. The same force spread over a larger area gives a smaller pressure.',
              ],
              examTips: [
                'When asked to increase pressure with the same force, the answer is always "decrease the area" — state it explicitly rather than just describing a shape.',
                'For liquid pressure questions, always check whether the question wants the pressure due to the liquid alone or the total pressure including atmospheric pressure above it.',
              ],
              workedExamples: [
                {
                  prompt: 'A box of weight 60 N rests on a surface through a base of area 0.30 m². Calculate the pressure it exerts.',
                  steps: ['p = F / A', 'p = 60 / 0.30'],
                  answer: 'p = 200 Pa',
                },
                {
                  prompt: 'Calculate the pressure due to water at a depth of 5.0 m. (density of water = 1000 kg/m³, g = 10 N/kg)',
                  steps: ['Δp = ρgΔh', 'Δp = 1000 × 10 × 5.0'],
                  answer: 'Δp = 50 000 Pa',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define pressure.', back: 'Force per unit area, p = F / A, measured in pascals (Pa) or N/m².', difficulty: 'EASY' },
            { front: 'Why does pressure in a liquid increase with depth?', back: 'There is a greater weight of liquid above, so a greater force acts on each unit of area.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A box exerts a force of 240 N on the floor through a base of area 0.60 m². Calculate the pressure.',
              answer: '400 Pa',
              markScheme: ['p = F / A (1)', 'p = 240 / 0.60 = 400 Pa (1)'],
              marks: 2,
              explanation: 'Pressure = 240 ÷ 0.60 = 400 Pa. One pascal is one newton per square metre.',
            },
          ],
        },
      ],
    },
    {
      number: '2',
      slug: 'thermal-physics',
      title: 'Thermal physics',
      summary: 'The particle model of matter, temperature and thermal expansion, and the three ways thermal energy moves.',
      subtopics: [
        {
          number: '2.1',
          slug: 'kinetic-particle-model',
          title: 'Kinetic particle model of matter',
          summary: 'States of matter, particle arrangement and motion, changes of state, gas pressure and the gas laws.',
          objectives: [
            { code: '2.1.1', statement: 'Describe the arrangement, separation and motion of particles in solids, liquids and gases.', tier: 'CORE' },
            { code: '2.1.2', statement: 'Explain changes of state and evaporation in terms of particle behaviour.', tier: 'CORE' },
            { code: '2.1.3', statement: 'Explain gas pressure in terms of collisions of particles with the container walls.', tier: 'CORE' },
            { code: '2.1.4', statement: 'Recall and use the relationship between pressure and volume for a fixed mass of gas at constant temperature (pV = constant).', tier: 'SUPPLEMENT' },
          ],
          simulations: ['gas-particles'],
          lessons: [
            {
              slug: 'particles-states-and-gas-pressure',
              title: 'Particles, states and gas pressure',
              readingMinutes: 7,
              body: `### The three states
| State | Arrangement | Separation | Motion |
| --- | --- | --- | --- |
| Solid | regular, tightly packed | very close | vibrate about fixed positions |
| Liquid | irregular, close together | close | move around each other |
| Gas | random, far apart | far | fast, random, in all directions |

That table answers a surprising number of exam questions on its own.

### Changes of state
Heating gives particles more kinetic energy. At the melting or boiling point, the extra energy is used to **break the forces between particles** rather than to raise the temperature — which is why a heating curve has flat sections.

**Evaporation** happens at any temperature, only from the surface, when the fastest particles escape. Because the fastest particles leave, the average kinetic energy of those remaining falls — so the liquid cools. This is why sweating works.

### Gas pressure
Gas particles collide with the container walls. Each collision exerts a small force; the total force over the wall's area is the pressure.

- **Raise the temperature** at constant volume: particles move faster, collide more often and harder, so pressure rises.
- **Reduce the volume** at constant temperature: the same number of particles hit a smaller area more often, so pressure rises. For a fixed mass at constant temperature, \`p₁V₁ = p₂V₂\`.`,
              analogy:
                'Gas pressure is like hail on a roof. Harder hailstones (higher temperature) or a smaller roof (smaller volume) both mean more force on every square metre.',
              misconceptions: [
                'Saying particles "expand" when a substance is heated. The particles stay the same size — they move further apart and vibrate more.',
                'Claiming evaporation only happens at the boiling point. It happens at all temperatures, from the surface only.',
                'Explaining pressure by "particles pushing each other" rather than by collisions with the walls.',
              ],
              examTips: [
                'Gas-pressure explanations need three steps: what happens to particle speed, what happens to the rate/force of collisions, and therefore what happens to pressure.',
                'For pV = constant questions, check that the temperature is stated as constant — otherwise the relationship does not apply.',
                'Never write that temperature "is" heat. Temperature is a measure of the average kinetic energy of the particles.',
              ],
              workedExamples: [
                {
                  prompt: 'A gas occupies 250 cm³ at a pressure of 100 kPa. The volume is reduced to 100 cm³ at constant temperature. Calculate the new pressure.',
                  steps: ['p₁V₁ = p₂V₂', '100 × 250 = p₂ × 100', 'p₂ = 25000 / 100'],
                  answer: 'p₂ = 250 kPa',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Why does a liquid cool as it evaporates?', back: 'The fastest particles escape from the surface, lowering the average kinetic energy of those left behind.', difficulty: 'HARD' },
            { front: 'Explain gas pressure using the particle model.', back: 'Particles collide with the container walls; each collision exerts a force, and pressure is the total force per unit area.', difficulty: 'MEDIUM' },
            { front: 'What happens to temperature during a change of state?', back: 'It stays constant — the energy supplied breaks the forces between particles instead of increasing their kinetic energy.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain, in terms of particles, why the pressure of a fixed mass of gas increases when it is heated in a sealed container of constant volume.',
              answer:
                'The particles gain kinetic energy and move faster. They collide with the walls more often and with greater force. The total force on each unit area therefore increases, so the pressure increases.',
              markScheme: [
                'Particles gain kinetic energy / move faster (1)',
                'Collisions with the walls are more frequent and harder (1)',
                'Greater force per unit area, so greater pressure (1)',
              ],
              marks: 3,
              explanation:
                'Examiners want the causal chain, not just the conclusion. "Particles move faster so pressure increases" typically scores 1 of 3 because the collision step is missing.',
              hint: 'What do the particles do to the walls?',
            },
          ],
        },
        {
          number: '2.2',
          slug: 'thermal-properties',
          title: 'Thermal properties and temperature',
          summary: 'Thermal expansion, thermometers, specific heat capacity and specific latent heat.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '2.2.1', statement: 'Describe thermal expansion of solids, liquids and gases and give everyday consequences.', tier: 'CORE' },
            { code: '2.2.2', statement: 'Recall and use E = mcΔθ for specific heat capacity.', tier: 'CORE' },
            { code: '2.2.3', statement: 'Describe melting, boiling and condensation in terms of latent heat.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'thermal-properties',
              title: 'Thermal expansion, heat capacity and latent heat',
              readingMinutes: 8,
              body: `### Thermal expansion
When a substance is heated, its particles gain kinetic energy and vibrate or move more, taking up slightly more space on average. This is **thermal expansion**. Gases expand the most for a given temperature rise, then liquids, then solids, because gas particles have the most freedom to spread out.

Everyday consequences: gaps are left in railway tracks and bridges to allow for expansion in hot weather; a bimetallic strip (two different metals joined together) bends when heated because the two metals expand by different amounts, which is used in thermostats.

### Specific heat capacity
**Specific heat capacity** is the energy needed to raise the temperature of 1 kg of a substance by 1 °C. The equation is \`E = mcΔθ\`. A substance with a high specific heat capacity (like water, c = 4200 J/(kg °C)) needs a lot of energy to heat up, which is why water is slow to warm and slow to cool — useful for storage heaters and for regulating coastal climates.

### Latent heat
When a substance melts or boils, energy is supplied but the **temperature does not rise** — instead, the energy is used to overcome the forces of attraction between particles as the state changes. This hidden energy is called **latent heat**.

The reverse is also true: freezing and condensing **release** energy to the surroundings, which is why condensing steam on skin causes a more severe burn than boiling water at the same temperature — the steam releases extra latent heat as it condenses.`,
              analogy:
                'Latent heat is like the "toll" paid to change floor in a building with no lift — you supply energy just to break free of the current arrangement, and none of that energy shows up as extra speed (temperature) until the move is complete.',
              misconceptions: [
                'Believing temperature keeps rising while a substance melts or boils. It stays constant until the change of state is complete.',
                'Thinking a high specific heat capacity means a substance "holds onto" heat forever. It simply needs (and releases) a large amount of energy for each degree of temperature change.',
                'Assuming solids do not expand at all when heated. They do, just much less than liquids or gases for the same temperature rise.',
              ],
              examTips: [
                'A graph of temperature against time for a heated substance should show flat sections at the melting and boiling points — label these correctly if drawing or interpreting one.',
                'For E = mcΔθ questions, always identify Δθ carefully as the *change* in temperature, not a single reading.',
              ],
              workedExamples: [
                {
                  prompt: 'Calculate the energy needed to raise the temperature of 0.50 kg of water from 20 °C to 100 °C. (c of water = 4200 J/(kg °C))',
                  steps: ['Δθ = 100 − 20 = 80 °C', 'E = mcΔθ', 'E = 0.50 × 4200 × 80'],
                  answer: 'E = 168 000 J (168 kJ)',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define specific heat capacity.', back: 'The energy required to raise the temperature of 1 kg of a substance by 1 °C.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Calculate the energy needed to raise the temperature of 2.0 kg of water by 25 °C. The specific heat capacity of water is 4200 J/(kg °C).',
              answer: '210 000 J',
              markScheme: ['E = mcΔθ (1)', 'E = 2.0 × 4200 × 25 (1)', 'E = 210 000 J (1)'],
              marks: 3,
              explanation: 'E = mcΔθ = 2.0 × 4200 × 25 = 210 000 J, or 210 kJ.',
            },
          ],
        },
        {
          number: '2.3',
          slug: 'thermal-energy-transfer',
          title: 'Transfer of thermal energy',
          summary: 'Conduction, convection, radiation, and how to reduce or increase energy transfer.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '2.3.1', statement: 'Describe conduction in terms of particle vibration and free electrons.', tier: 'CORE' },
            { code: '2.3.2', statement: 'Explain convection in terms of density changes in a fluid.', tier: 'CORE' },
            { code: '2.3.3', statement: 'Describe how emission and absorption of infrared radiation depend on surface colour and texture.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'thermal-energy-transfer',
              title: 'Conduction, convection and radiation',
              readingMinutes: 8,
              body: `Thermal energy moves from hotter to cooler regions by three distinct mechanisms, and IGCSE questions expect you to identify which one applies and explain it in the right terms.

### Conduction
Conduction happens mainly in solids. Particles at the hot end vibrate more and pass on energy to neighbouring particles through collisions. Metals are especially good conductors because they also have **free (delocalised) electrons**, which move through the structure carrying energy much faster than vibration alone.

### Convection
Convection happens in liquids and gases (fluids), and relies on the fluid being free to flow. When a fluid is heated, it expands, becomes **less dense**, and rises; cooler, denser fluid sinks to take its place. This circulation is a **convection current**. Convection cannot happen in a solid, because the particles cannot move from place to place.

### Radiation
Radiation is the transfer of energy by **infrared electromagnetic waves**, and unlike conduction and convection, it needs no medium — it works through a vacuum, which is how energy reaches us from the Sun.

Surface matters a great deal:
- **Dull, black surfaces** are good emitters and good absorbers of infrared radiation.
- **Shiny, light surfaces** are poor emitters and poor absorbers (they reflect radiation instead).

This is why a car's black dashboard gets much hotter in sunlight than a light-coloured one, and why vacuum flasks have a shiny inner surface to reduce radiation loss.`,
              analogy:
                'Conduction is like a line of people passing a ball hand to hand without moving; convection is like the people themselves walking to a new spot, carrying the ball with them; radiation needs no people or ball at all — it is a beam of light carrying energy straight across an empty room.',
              misconceptions: [
                'Saying "heat rises" as if heat itself moves upward. It is convection — the hot fluid becomes less dense and rises, carrying thermal energy with it — not a property of heat.',
                'Believing convection can happen in a solid. Particles in a solid cannot flow, so only conduction (and, at the surface, radiation) applies.',
                'Assuming radiation needs a hot object to glow visibly. All objects emit infrared radiation, even at room temperature; only very hot objects emit enough for it to become visible light.',
              ],
              examTips: [
                'Explain conduction with reference to both particle vibration AND, for metals, free electrons — a full-marks answer usually needs both.',
                'For convection, the key phrase is "less dense, so it rises" — do not just say the fluid "gets lighter".',
                'When comparing surfaces for radiation, always give both emission and absorption, since a good emitter is also a good absorber.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why a radiator painted matt black warms a room more effectively by radiation than the same radiator painted white and shiny.',
                  steps: [
                    'A dull, black surface is a better emitter of infrared radiation than a shiny, light surface.',
                    'So more thermal energy leaves the black radiator as radiation per second, for the same temperature.',
                  ],
                  answer: 'The matt black radiator emits infrared radiation more effectively, transferring thermal energy to the room faster by radiation.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Why are metals good thermal conductors?', back: 'They contain free (delocalised) electrons that move through the structure and transfer energy quickly.', difficulty: 'MEDIUM' },
            { front: 'Which surface is the best emitter of infrared radiation?', back: 'A dull black surface.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which process transfers thermal energy through a vacuum?',
              options: [
                { id: 'a', text: 'Conduction', why: 'Conduction needs particles in contact.' },
                { id: 'b', text: 'Convection', why: 'Convection needs a fluid that can flow.' },
                { id: 'c', text: 'Radiation', why: '' },
                { id: 'd', text: 'Evaporation', why: 'Evaporation needs a liquid.' },
              ],
              answer: 'c',
              markScheme: ['Radiation (1)'],
              marks: 1,
              explanation:
                'Infrared radiation is an electromagnetic wave, so it does not need a medium. That is how energy reaches us from the Sun.',
            },
          ],
        },
      ],
    },
    {
      number: '3',
      slug: 'waves',
      title: 'Waves',
      summary: 'Wave behaviour, light and ray diagrams, the electromagnetic spectrum, and sound.',
      subtopics: [
        {
          number: '3.1',
          slug: 'general-properties-of-waves',
          title: 'General properties of waves',
          summary: 'Transverse and longitudinal waves, wavelength, frequency, amplitude, the wave equation, reflection, refraction and diffraction.',
          objectives: [
            { code: '3.1.1', statement: 'Describe what is meant by wavefronts, wavelength, frequency, crest, trough, amplitude and wave speed.', tier: 'CORE' },
            { code: '3.1.2', statement: 'Distinguish between transverse and longitudinal waves and give examples of each.', tier: 'CORE' },
            { code: '3.1.3', statement: 'Recall and use v = fλ.', tier: 'CORE' },
            { code: '3.1.4', statement: 'Describe reflection, refraction and diffraction of waves using a ripple tank.', tier: 'CORE' },
          ],
          simulations: ['wave-machine'],
          lessons: [
            {
              slug: 'wave-basics-and-the-wave-equation',
              title: 'Wave basics and the wave equation',
              readingMinutes: 7,
              body: `A wave transfers **energy** without transferring matter. The particles (or fields) oscillate about a fixed position; they do not travel with the wave.

### Two kinds
- **Transverse**: oscillations are at right angles to the direction of energy transfer. Examples: all electromagnetic waves, water waves, waves on a rope.
- **Longitudinal**: oscillations are parallel to the direction of energy transfer, producing compressions and rarefactions. The example you must know is **sound**.

### The quantities
- **Wavelength (λ)**: distance between two neighbouring points in phase — crest to crest, in metres.
- **Frequency (f)**: number of complete waves passing a point per second, in hertz.
- **Amplitude**: maximum displacement from the undisturbed position. It is *not* the distance from crest to trough — that is twice the amplitude.
- **Time period (T)**: time for one complete wave, and \`T = 1 / f\`.

### The wave equation
\`v = fλ\` — wave speed equals frequency × wavelength.

Because the speed of a wave depends on the medium, when a wave enters a new material its **speed and wavelength change but its frequency does not**. That single fact explains refraction.

### Three behaviours
- **Reflection**: the wave bounces off a barrier; the angle of incidence equals the angle of reflection.
- **Refraction**: the wave changes speed on entering a new medium, so it changes direction (unless it enters along the normal).
- **Diffraction**: the wave spreads out through a gap or around an edge. The spreading is greatest when the gap is about the same size as the wavelength.`,
              analogy:
                'A wave is a stadium Mexican wave: the wave travels around the ground, but every person stays in their own seat. Energy moves; matter does not.',
              misconceptions: [
                'Thinking the particles travel along with the wave. They oscillate about a fixed point.',
                'Measuring amplitude from crest to trough instead of from the middle to a crest.',
                'Saying the frequency changes during refraction. Frequency is set by the source and stays the same.',
              ],
              examTips: [
                'For diffraction questions, say explicitly that the effect is greatest when the gap width is comparable to the wavelength.',
                'Label ray diagrams with the normal (a dashed line at 90° to the surface) — angles are always measured from the normal, never from the surface.',
                'v = fλ questions almost always need a unit conversion first (kHz → Hz, cm → m).',
              ],
              workedExamples: [
                {
                  prompt: 'A sound wave has a frequency of 340 Hz and a wavelength of 1.0 m. Calculate its speed.',
                  steps: ['v = fλ', 'v = 340 × 1.0'],
                  answer: 'v = 340 m/s',
                },
                {
                  prompt: 'A radio station broadcasts at 90 MHz. Radio waves travel at 3.0 × 10⁸ m/s. Calculate the wavelength.',
                  steps: [
                    'Convert: 90 MHz = 9.0 × 10⁷ Hz',
                    'λ = v / f = 3.0 × 10⁸ / 9.0 × 10⁷',
                  ],
                  answer: 'λ = 3.3 m',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the wave equation.', back: 'v = fλ (speed = frequency × wavelength).', difficulty: 'EASY' },
            { front: 'Define amplitude.', back: 'The maximum displacement of a point from its undisturbed position.', difficulty: 'MEDIUM' },
            { front: 'Give an example of a longitudinal wave.', back: 'Sound.', difficulty: 'EASY' },
            { front: 'What stays the same when a wave refracts?', back: 'Its frequency. The speed and wavelength both change.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Water waves of frequency 2.5 Hz have a wavelength of 0.80 m. Calculate the speed of the waves.',
              answer: '2.0 m/s',
              markScheme: ['v = fλ (1)', 'v = 2.5 × 0.80 = 2.0 m/s (1)'],
              marks: 2,
              explanation: 'v = fλ = 2.5 × 0.80 = 2.0 m/s.',
            },
            {
              type: 'MCQ',
              difficulty: 'CHALLENGE',
              stem: 'A wave passes from deep water into shallow water, where it travels more slowly. Which quantity is unchanged?',
              options: [
                { id: 'a', text: 'Speed', why: 'The question states the speed decreases.' },
                { id: 'b', text: 'Wavelength', why: 'Since v = fλ and f is fixed, a smaller v means a smaller λ.' },
                { id: 'c', text: 'Frequency', why: '' },
                { id: 'd', text: 'Direction', why: 'Unless it enters along the normal, the direction changes.' },
              ],
              answer: 'c',
              markScheme: ['Frequency (1)'],
              marks: 1,
              explanation:
                'Frequency is determined by the source, so it cannot change at a boundary. With f fixed and v reduced, λ must reduce too — which is exactly why the wavefronts bunch up in shallow water.',
            },
          ],
        },
        {
          number: '3.2',
          slug: 'light',
          title: 'Light',
          summary: 'Reflection in a plane mirror, refraction and refractive index, total internal reflection, thin converging lenses and dispersion.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '3.2.1', statement: 'Describe reflection at a plane surface and construct ray diagrams for an image in a plane mirror.', tier: 'CORE' },
            { code: '3.2.2', statement: 'Describe refraction at a boundary and recall and use n = sin i / sin r.', tier: 'CORE' },
            { code: '3.2.3', statement: 'Explain total internal reflection and the critical angle, including uses in optical fibres.', tier: 'CORE' },
            { code: '3.2.4', statement: 'Draw ray diagrams for a thin converging lens forming real and virtual images.', tier: 'CORE' },
          ],
          simulations: ['ray-optics'],
          lessons: [
            {
              slug: 'light',
              title: 'Reflection, refraction and lenses',
              readingMinutes: 9,
              body: `### Reflection in a plane mirror
The **law of reflection**: the angle of incidence equals the angle of reflection, both measured from the normal. The image in a plane mirror is always: **virtual** (light does not actually pass through it), **upright**, the **same size** as the object, **laterally inverted** (left-right reversed), and as far **behind** the mirror as the object is in front.

### Refraction
Light bends when it crosses a boundary between materials of different density, because its speed changes. Going into a denser material, light slows down and bends **towards** the normal; leaving a denser material, it speeds up and bends **away** from the normal.

The refractive index is \`n = sin i / sin r\`.

### Total internal reflection
Above the **critical angle**, light travelling from a denser into a less dense medium cannot refract out at all — it reflects entirely back inside. This is **total internal reflection**, and it is the principle behind optical fibres, which carry light (and digital signals) over long distances by repeated total internal reflection along the inside of a thin glass fibre.

### Converging lenses
A thin converging lens brings parallel rays of light together at the **principal focus**. Depending on where the object is placed relative to the focal length, the lens forms either a **real, inverted** image (object beyond the focal length — as in a camera) or a **magnified, virtual, upright** image (object inside the focal length — as in a magnifying glass).`,
              analogy:
                'Refraction is like a marching band crossing from pavement onto sand at an angle — the row of marchers who reach the sand first slow down, so the whole line pivots and changes direction, exactly as a wavefront bends when it enters a new medium.',
              misconceptions: [
                'Measuring angles of incidence and reflection from the mirror surface instead of the normal — always measure from the dashed line at 90° to the surface.',
                'Thinking a virtual image can be projected onto a screen. It cannot — light rays only appear to come from it; a real image can be captured on a screen.',
                'Confusing total internal reflection with ordinary reflection — total internal reflection only happens above the critical angle, and only when light tries to leave a denser medium.',
              ],
              examTips: [
                'For plane mirror ray diagrams, use the "same distance behind as the object is in front" rule to place the image before drawing the reflected rays.',
                'When describing an image, always give all relevant properties: real/virtual, upright/inverted, magnified/same size/diminished.',
              ],
              workedExamples: [
                {
                  prompt: 'Light travels from glass (n = 1.5) into air. Calculate the critical angle.',
                  steps: [
                    'At the critical angle, the angle of refraction is 90°, so sin r = 1.',
                    'n = sin i / sin r, so sin(critical angle) = 1 / n',
                    'sin c = 1 / 1.5 = 0.667',
                  ],
                  answer: 'c = 41.8°',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Describe the image in a plane mirror.', back: 'Virtual, upright, same size as the object, and as far behind the mirror as the object is in front, laterally inverted.', difficulty: 'MEDIUM' },
            { front: 'Define the critical angle.', back: 'The angle of incidence in the denser medium for which the angle of refraction is 90°.', difficulty: 'HARD' },
            { front: 'What two conditions are needed for total internal reflection?', back: 'Light must travel from a denser to a less dense medium, and the angle of incidence must be greater than the critical angle.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'Light passes from air into glass. The angle of incidence is 40° and the angle of refraction is 25°. Calculate the refractive index of the glass.',
              answer: '1.5',
              markScheme: ['n = sin i / sin r (1)', 'n = sin 40° / sin 25° = 0.643 / 0.423 (1)', 'n = 1.5 (1)'],
              marks: 3,
              explanation:
                'n = sin 40° ÷ sin 25° = 0.643 ÷ 0.423 = 1.52, which is 1.5 to 2 significant figures — the standard value for crown glass.',
              hint: 'Angles are measured from the normal.',
            },
          ],
        },
        {
          number: '3.3',
          slug: 'electromagnetic-spectrum',
          title: 'Electromagnetic spectrum',
          summary: 'The order of the spectrum, common uses and the dangers of each region.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '3.3.1', statement: 'State the regions of the electromagnetic spectrum in order of wavelength and frequency.', tier: 'CORE' },
            { code: '3.3.2', statement: 'Describe typical uses and hazards of each region.', tier: 'CORE' },
            { code: '3.3.3', statement: 'State that all electromagnetic waves travel at the same speed in a vacuum, 3.0 × 10⁸ m/s.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'electromagnetic-spectrum',
              title: 'The electromagnetic spectrum',
              readingMinutes: 6,
              body: `The electromagnetic spectrum is a continuous family of transverse waves, all travelling at the same speed in a vacuum — **3.0 × 10⁸ m/s** — but with different wavelengths and frequencies. In order of **increasing frequency** (decreasing wavelength):

**Radio → Microwave → Infrared → Visible light → Ultraviolet → X-ray → Gamma**

A useful memory device: "Rabbits Mate In Very Unusual eXtreme Gardens" gives the same order.

### Uses
- **Radio waves**: broadcasting, communications.
- **Microwaves**: satellite communication, cooking (heating water molecules in food).
- **Infrared**: thermal imaging, remote controls, cooking (grills), fibre-optic communication.
- **Visible light**: vision, photography, fibre-optic communication.
- **Ultraviolet**: sunbeds, fluorescent lamps, security marking (invisible ink visible under UV).
- **X-rays**: medical imaging of bones, airport security scanning.
- **Gamma rays**: sterilising medical equipment, treating cancer.

### Hazards
As frequency increases, the waves carry more energy and generally become more dangerous to living tissue. Ultraviolet can cause skin damage and eye damage; X-rays and gamma rays are **ionising** — they can damage or mutate cells and DNA, causing cancer, so exposure is minimised with lead shielding and short exposure times.`,
              analogy:
                'The electromagnetic spectrum is like one musical instrument playing notes across an enormous range — radio waves are the lowest, slowest "notes" and gamma rays the highest, fastest, most energetic ones, but they are all fundamentally the same kind of wave.',
              misconceptions: [
                'Thinking different regions of the spectrum travel at different speeds in a vacuum. They are all 3.0 × 10⁸ m/s in a vacuum; only their wavelength and frequency differ.',
                'Assuming only gamma rays and X-rays are electromagnetic waves. Visible light, radio waves and all the others are equally part of the same spectrum, just at different frequencies.',
                'Believing infrared and ultraviolet are visible. Both lie just outside the range the human eye can detect.',
              ],
              examTips: [
                'Learn the order both ways — by increasing wavelength and by increasing frequency — since questions ask for either.',
                'When asked for a hazard, name the specific effect (e.g. "UV causes skin cancer/premature ageing", "X-rays and gamma rays are ionising and can cause cancer/cell damage"), not just "it is dangerous".',
              ],
              workedExamples: [
                {
                  prompt: 'A radio wave has a frequency of 1.5 × 10⁶ Hz. Calculate its wavelength.',
                  steps: [
                    'v = fλ, so λ = v / f',
                    'λ = (3.0 × 10⁸) / (1.5 × 10⁶)',
                  ],
                  answer: 'λ = 200 m',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'List the EM spectrum from longest to shortest wavelength.', back: 'Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.', difficulty: 'MEDIUM' },
            { front: 'What is the speed of all EM waves in a vacuum?', back: '3.0 × 10⁸ m/s', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which electromagnetic wave has the shortest wavelength?',
              options: [
                { id: 'a', text: 'Radio waves', why: 'Radio waves have the longest wavelength.' },
                { id: 'b', text: 'Infrared', why: 'Infrared sits between microwaves and visible light.' },
                { id: 'c', text: 'Ultraviolet', why: 'UV is shorter than visible but longer than X-rays and gamma.' },
                { id: 'd', text: 'Gamma rays', why: '' },
              ],
              answer: 'd',
              markScheme: ['Gamma rays (1)'],
              marks: 1,
              explanation: 'Gamma rays sit at the short-wavelength, high-frequency end of the spectrum.',
            },
          ],
        },
        {
          number: '3.4',
          slug: 'sound',
          title: 'Sound',
          summary: 'Sound as a longitudinal wave, the range of human hearing, the speed of sound and echoes, and ultrasound.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '3.4.1', statement: 'Describe the production of sound by vibrating sources and its transmission as a longitudinal wave.', tier: 'CORE' },
            { code: '3.4.2', statement: 'State the approximate range of human hearing (20 Hz to 20 000 Hz).', tier: 'CORE' },
            { code: '3.4.3', statement: 'Describe how to measure the speed of sound in air and use echo methods.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'sound',
              title: 'Sound',
              readingMinutes: 6,
              body: `Sound is produced by a **vibrating source** — a speaker cone, a guitar string, vocal cords — and travels as a **longitudinal wave**, made of compressions (particles pushed closer together) and rarefactions (particles spread further apart).

Because it needs particles to pass the vibration along, sound **cannot travel through a vacuum**. It can travel through solids, liquids and gases, generally fastest through solids and slowest through gases, because particles are closer together and transmit vibrations more efficiently.

### Human hearing
The normal range of human hearing is approximately **20 Hz to 20 000 Hz**. Sound above this range is called ultrasound, and below it, infrasound.

### Measuring the speed of sound
One method: stand a known distance from a large flat wall, make a sharp sound (such as a clap), and measure the time for the echo to return. The sound travels to the wall and back, so:

\`speed = (2 × distance to wall) / time for the echo\`

This "there and back" detail is the most common place marks are lost — the distance in the calculation is double the distance to the wall.`,
              analogy:
                'A longitudinal sound wave is like a Slinky spring pushed sharply at one end: a pulse of squeezed coils (compression) travels down the spring, followed by a stretched-out section (rarefaction), while no single coil actually travels along the spring\'s length.',
              misconceptions: [
                'Thinking sound is a transverse wave like light. Sound is longitudinal — the vibrations are parallel to the direction of travel, not perpendicular.',
                'Forgetting the echo pulse travels there AND back, so the distance to the reflecting surface is half the total distance travelled, not the same as it.',
                'Believing sound travels fastest through air. It generally travels faster through solids and liquids than through gases.',
              ],
              examTips: [
                'For echo calculations, always halve the total distance (or double the single distance) — state this step explicitly to secure the method mark even if the arithmetic slips.',
                'When asked why sound cannot travel through space, the answer must mention that sound needs a medium (particles) to transmit compressions and rarefactions — "space is empty" alone is not enough.',
              ],
              workedExamples: [
                {
                  prompt: 'A student stands 85 m from a cliff and claps. The echo is heard 0.50 s later. Calculate the speed of sound.',
                  steps: [
                    'Total distance travelled = 2 × 85 = 170 m',
                    'speed = distance / time',
                    'speed = 170 / 0.50',
                  ],
                  answer: 'speed = 340 m/s',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is the audible range for humans?', back: '20 Hz to 20 000 Hz.', difficulty: 'EASY' },
            { front: 'Why can sound not travel through a vacuum?', back: 'Sound needs particles to transmit the compressions and rarefactions; a vacuum has none.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A ship sends a sound pulse to the seabed and detects the echo 0.60 s later. The speed of sound in water is 1500 m/s. Calculate the depth of the seabed.',
              answer: '450 m',
              markScheme: [
                'Total distance = v × t = 1500 × 0.60 = 900 m (1)',
                'Depth is half the total distance (1)',
                'Depth = 450 m (1)',
              ],
              marks: 3,
              explanation:
                'The pulse travels down and back, so the 900 m it covers is twice the depth. Forgetting to halve is the single most common error on echo questions.',
              hint: 'How many times does the pulse cross the water?',
            },
          ],
        },
      ],
    },
    {
      number: '4',
      slug: 'electricity-and-magnetism',
      title: 'Electricity and magnetism',
      summary: 'Magnets and fields, charge and current, circuits and components, electrical safety, and electromagnetic effects.',
      subtopics: [
        {
          number: '4.1',
          slug: 'magnetism',
          title: 'Simple phenomena of magnetism',
          summary: 'Magnetic materials, magnetic fields and field lines, and induced magnetism.',
          objectives: [
            { code: '4.1.1', statement: 'Describe the forces between magnetic poles and identify magnetic materials.', tier: 'CORE' },
            { code: '4.1.2', statement: 'Draw the magnetic field pattern around a bar magnet, including direction.', tier: 'CORE' },
            { code: '4.1.3', statement: 'Distinguish between the properties of permanent magnets and electromagnets.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'magnetism',
              title: 'Magnetism',
              readingMinutes: 6,
              body: `### Poles and forces
Every magnet has a north pole and a south pole. **Like poles repel; unlike poles attract.** These forces act without the poles needing to touch.

### Magnetic materials
Only a small set of elements are strongly attracted to a magnet: **iron, steel, cobalt and nickel**. These are called magnetic (or ferromagnetic) materials. Most other materials, including most metals such as copper and aluminium, are not magnetic.

### Magnetic fields
A magnetic field is the region around a magnet where a magnetic material or another magnet experiences a force. Field lines are drawn from **north to south outside the magnet**, and the closer together the lines, the stronger the field. Around a bar magnet, the field is strongest near the poles, where the lines are most concentrated.

### Permanent magnets vs electromagnets
A **permanent magnet** keeps its magnetism all the time, with no need for a current.

An **electromagnet** is a coil of wire, usually wound around a soft-iron core, that becomes magnetic only when a current flows through it, and loses its magnetism almost completely when the current is switched off. This makes electromagnets useful wherever magnetism needs to be turned on and off, such as in cranes for lifting scrap metal, or in relays and electric bells.

### Induced magnetism
A magnetic material placed near a magnet can itself become a temporary magnet — this is **induced magnetism** — and it loses most of this magnetism once removed from the field.`,
              analogy:
                'An electromagnet is like a magnet with an "on/off switch" — a permanent magnet is always doing its job, but an electromagnet only works while electricity is flowing through it, which is exactly why a scrapyard crane can drop the metal it is carrying just by cutting the current.',
              misconceptions: [
                'Thinking all metals are magnetic. Only iron, steel, cobalt and nickel are strongly attracted to a magnet — copper, aluminium, gold and most other metals are not.',
                'Believing magnetic field lines can cross each other. They never do; where lines are close together the field is strong, and where they spread out the field is weaker.',
                'Assuming an electromagnet stays magnetised after the current is switched off. Its magnetism disappears almost completely without the current.',
              ],
              examTips: [
                'When drawing field lines around a bar magnet, always add arrowheads pointing from north to south, and draw them denser near the poles.',
                'A common exam question asks for one advantage of an electromagnet over a permanent magnet — the answer is that its magnetism can be switched on and off, and often its strength can be varied by changing the current.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Which direction do magnetic field lines point?', back: 'From north to south outside the magnet.', difficulty: 'EASY' },
            { front: 'Name the magnetic materials you need to know.', back: 'Iron, steel, cobalt and nickel.', difficulty: 'MEDIUM' },
            { front: 'What happens between like poles? Unlike poles?', back: 'Like poles repel; unlike poles attract.', difficulty: 'EASY' },
            { front: 'What is induced magnetism?', back: 'A magnetic material becomes a magnet itself when placed in a magnetic field, and loses most of this magnetism when removed from the field.', difficulty: 'MEDIUM' },
            { front: 'How do you tell whether a bar is a permanent magnet or an unmagnetised piece of iron, using only a second magnet?', back: 'Bring one end of the known magnet close to each end of the bar in turn. If it attracts at both ends, the bar is unmagnetised iron; a permanent magnet would repel at one end.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which pair of magnetic poles will repel each other?',
              options: [
                { id: 'a', text: 'North and south', why: 'Unlike poles attract, not repel.' },
                { id: 'b', text: 'North and north', why: '' },
                { id: 'c', text: 'South and north', why: 'Unlike poles attract.' },
                { id: 'd', text: 'A magnet and an unmagnetised iron bar', why: 'This is always attraction, never repulsion.' },
              ],
              answer: 'b',
              markScheme: ['North and north (1)'],
              marks: 1,
              explanation: 'Like poles repel; unlike poles attract. Two north poles are like poles.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A student has an unmagnetised steel bar and a permanent bar magnet. Describe a test, using only these two objects, that would show whether the steel bar has become magnetised. [2]',
              answer:
                'Bring one pole of the permanent magnet close to one end of the steel bar, then the other end. If the steel bar is magnetised it will repel the permanent magnet at one end and attract it at the other; if it is unmagnetised it will attract the permanent magnet at both ends.',
              markScheme: [
                'Test both ends of the bar with one pole of the known magnet (1)',
                'Repulsion at one end shows the bar is magnetised; attraction at both ends shows it is not (1)',
              ],
              marks: 2,
              explanation:
                'Attraction alone never proves magnetism, because a magnet attracts unmagnetised magnetic material too. Repulsion is the only conclusive test, since two unmagnetised materials cannot repel.',
              hint: 'Attraction happens either way — which result can only happen if the bar is a magnet?',
            },
          ],
        },
        {
          number: '4.2',
          slug: 'electrical-quantities',
          title: 'Electrical quantities',
          summary: 'Charge, current, potential difference, resistance, Ohm\'s law and electrical energy and power.',
          prerequisites: ['1.7'],
          objectives: [
            { code: '4.2.1', statement: 'Define current as charge per unit time and recall and use I = Q / t.', tier: 'CORE' },
            { code: '4.2.2', statement: 'Define potential difference as energy transferred per unit charge and recall and use V = W / Q.', tier: 'CORE' },
            { code: '4.2.3', statement: 'Recall and use V = IR and describe an experiment to determine resistance.', tier: 'CORE' },
            { code: '4.2.4', statement: 'Recall and use P = IV and E = IVt.', tier: 'CORE' },
            { code: '4.2.5', statement: 'Describe how the resistance of a wire depends on its length and cross-sectional area.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['ohms-law', 'circuit-builder'],
          lessons: [
            {
              slug: 'current-voltage-and-resistance',
              title: 'Current, voltage and resistance',
              readingMinutes: 8,
              body: `### The three quantities, defined properly
**Current** is the rate of flow of charge: \`I = Q / t\`, in amperes. One ampere is one coulomb per second. In a metal, the charge carriers are free electrons.

**Potential difference** (voltage) is the energy transferred per unit charge: \`V = W / Q\`, in volts. One volt is one joule per coulomb. This definition earns marks that "voltage is the push" never will.

**Resistance** is the opposition to current: \`R = V / I\`, in ohms.

### Ohm's law
For a metallic conductor at **constant temperature**, current is directly proportional to potential difference. That "constant temperature" condition matters: a filament lamp does not obey Ohm's law because it heats up, and its I–V graph curves.

Three I–V graphs you should recognise:
- **Resistor at constant temperature**: straight line through the origin.
- **Filament lamp**: S-shaped curve, flattening as it heats up (resistance increases).
- **Diode**: near-zero current in reverse, then rising sharply in the forward direction.

### Resistance of a wire
Resistance increases with **length** and decreases with **cross-sectional area**. A long thin wire has the most resistance.

### Power and energy
\`P = IV\` and, combining with V = IR, \`P = I²R\`. Energy transferred is \`E = IVt\`, or simply power × time.

This is why household appliances are rated in watts, and why kettles draw a large current: high power at a fixed mains voltage means high current.`,
              analogy:
                'A circuit is a water loop: current is the flow rate, potential difference is the pump pressure, and resistance is a narrow pipe. Narrowing the pipe (more resistance) reduces the flow for the same pressure.',
              misconceptions: [
                'Saying current is "used up" as it goes round a series circuit. Current is the same at every point in a single loop.',
                'Believing every component obeys Ohm\'s law. A filament lamp and a diode do not.',
                'Confusing potential difference *across* a component with current *through* it — voltmeters go in parallel, ammeters in series.',
              ],
              examTips: [
                'When asked to define potential difference, use "energy transferred per unit charge" — the everyday word "push" earns nothing.',
                'For circuit diagram questions, draw the ammeter in series and the voltmeter in parallel with the component. This is a frequent easy mark.',
                'State the constant-temperature condition whenever you quote Ohm\'s law.',
              ],
              workedExamples: [
                {
                  prompt: 'A current of 0.25 A flows through a 48 Ω resistor. Calculate the potential difference across it.',
                  steps: ['V = IR', 'V = 0.25 × 48'],
                  answer: 'V = 12 V',
                },
                {
                  prompt: 'A 2.4 kW heater is connected to a 240 V supply. Calculate the current and the energy transferred in 5.0 minutes.',
                  steps: [
                    'P = IV, so I = P / V = 2400 / 240 = 10 A',
                    'E = Pt, with t = 5.0 × 60 = 300 s',
                    'E = 2400 × 300',
                  ],
                  answer: 'I = 10 A, E = 720 000 J (720 kJ)',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define electric current.', back: 'The rate of flow of electric charge (I = Q / t), measured in amperes.', difficulty: 'EASY' },
            { front: 'Define potential difference.', back: 'The energy transferred per unit charge passing between two points, measured in volts.', difficulty: 'HARD' },
            { front: 'State Ohm\'s law.', back: 'For a metallic conductor at constant temperature, the current is directly proportional to the potential difference across it.', difficulty: 'MEDIUM' },
            { front: 'How does the resistance of a wire change if its length doubles?', back: 'It doubles — resistance is proportional to length.', difficulty: 'MEDIUM' },
            { front: 'Give two equations for electrical power.', back: 'P = IV and P = I²R.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A charge of 30 C flows past a point in 12 s. Calculate the current.',
              answer: '2.5 A',
              markScheme: ['I = Q / t (1)', 'I = 30 / 12 = 2.5 A (1)'],
              marks: 2,
              explanation: 'Current is charge per unit time: 30 ÷ 12 = 2.5 A.',
            },
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Which statement about a filament lamp is correct?',
              options: [
                { id: 'a', text: 'Its I–V graph is a straight line through the origin.', why: 'That describes a resistor held at constant temperature.' },
                { id: 'b', text: 'Its resistance increases as it gets hotter.', why: '' },
                { id: 'c', text: 'It obeys Ohm\'s law at all temperatures.', why: 'It does not — its resistance changes with temperature.' },
                { id: 'd', text: 'It conducts in one direction only.', why: 'That describes a diode.' },
              ],
              answer: 'b',
              markScheme: ['Its resistance increases as it gets hotter (1)'],
              marks: 1,
              explanation:
                'As the filament heats up, its metal ions vibrate more and impede the electrons, so resistance rises and the I–V graph curves over.',
            },
          ],
        },
        {
          number: '4.3',
          slug: 'electric-circuits',
          title: 'Electric circuits',
          summary: 'Circuit diagrams, series and parallel circuits, combined resistance, and action of components.',
          prerequisites: ['4.2'],
          objectives: [
            { code: '4.3.1', statement: 'Draw and interpret circuit diagrams using standard symbols.', tier: 'CORE' },
            { code: '4.3.2', statement: 'Describe how current and potential difference are distributed in series and parallel circuits.', tier: 'CORE' },
            { code: '4.3.3', statement: 'Calculate the combined resistance of resistors in series and in parallel.', tier: 'CORE' },
            { code: '4.3.4', statement: 'Describe the action of a thermistor and a light-dependent resistor in a sensing circuit.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['circuit-builder'],
          lessons: [
            {
              slug: 'electric-circuits',
              title: 'Series and parallel circuits',
              readingMinutes: 8,
              body: `### Circuit diagrams
Circuits are drawn using standard symbols: a cell (long and short line), a resistor (rectangle or zigzag), an ammeter (A in a circle, always in **series**), a voltmeter (V in a circle, always in **parallel** with the component it measures), a switch, a lamp, a diode, a thermistor and an LDR.

### Series circuits
In a series circuit, there is only **one path** for current, so:
- The **current is the same** at every point in the circuit.
- The supply potential difference is **shared** between the components, in proportion to their resistance.
- Total resistance: \`R = R₁ + R₂ + …\` — adding a resistor in series always increases total resistance.

### Parallel circuits
In a parallel circuit, there are **multiple paths**, so:
- The potential difference is the **same** across every branch.
- The **current splits** between the branches, and the branch currents add up to the total current.
- Total resistance: \`1/R = 1/R₁ + 1/R₂ + …\` — adding a resistor in parallel always *decreases* total resistance, and the total is always less than the smallest individual resistor.

### Sensing components
A **thermistor**'s resistance falls as temperature rises, so it is used in temperature-sensing circuits (e.g. thermostats). An **LDR** (light-dependent resistor)'s resistance falls as light intensity increases, so it is used in light-sensing circuits (e.g. automatic street lights).`,
              analogy:
                'A series circuit is like a single-lane road — everyone travels at the same rate (current) because there is nowhere to overtake. A parallel circuit is like several separate lanes to the same destination — traffic (current) splits between them, but every lane experiences the same road conditions (potential difference).',
              misconceptions: [
                'Believing current is "used up" as it passes around a series circuit. Current is the same at every point in a single loop; it is energy, not current, that is transferred to the components.',
                'Thinking adding a resistor in parallel increases total resistance, by analogy with series. It is the opposite — an extra parallel path always reduces total resistance.',
                'Placing an ammeter in parallel or a voltmeter in series by mistake. An ammeter must be in series with the component; a voltmeter must be in parallel with it.',
              ],
              examTips: [
                'When calculating parallel resistance, always check your final answer is smaller than the smallest individual resistor — this catches the common mistake of forgetting to invert 1/R at the end.',
                'For sensing-circuit questions, explain the resistance change first, then the consequence for current or voltage in the circuit — both parts are usually needed for full marks.',
              ],
              workedExamples: [
                {
                  prompt: 'Two resistors of 4.0 Ω and 12 Ω are connected in parallel. Calculate the combined resistance.',
                  steps: [
                    '1/R = 1/4.0 + 1/12',
                    '1/R = 3/12 + 1/12 = 4/12 = 1/3',
                  ],
                  answer: 'R = 3.0 Ω',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you combine resistors in series?', back: 'Add them: R = R₁ + R₂ + …', difficulty: 'EASY' },
            { front: 'How do you combine resistors in parallel?', back: '1/R = 1/R₁ + 1/R₂ + … The total is always less than the smallest individual resistance.', difficulty: 'HARD' },
            { front: 'What happens to current in a series circuit?', back: 'It is the same at every point.', difficulty: 'EASY' },
            { front: 'What happens to potential difference in a parallel circuit?', back: 'It is the same across each branch.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Two resistors, 6.0 Ω and 3.0 Ω, are connected in parallel across a 12 V supply. Calculate the total resistance and the total current drawn from the supply.',
              answer: 'R = 2.0 Ω, I = 6.0 A',
              markScheme: [
                '1/R = 1/6.0 + 1/3.0 = 0.5 (1)',
                'R = 2.0 Ω (1)',
                'I = V / R = 12 / 2.0 (1)',
                'I = 6.0 A (1)',
              ],
              marks: 4,
              explanation:
                '1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6, so R = 2.0 Ω. Note the total is smaller than either resistor — always check this as a sanity test. Then I = 12 ÷ 2.0 = 6.0 A.',
              hint: 'Work out 1/R first, then remember to invert it.',
            },
          ],
        },
        {
          number: '4.4',
          slug: 'electrical-safety',
          title: 'Electrical safety',
          summary: 'Hazards of electricity, fuses, circuit breakers, earthing and double insulation.',
          prerequisites: ['4.2'],
          objectives: [
            { code: '4.4.1', statement: 'Identify electrical hazards including damaged insulation, overheating cables, damp conditions and excess current.', tier: 'CORE' },
            { code: '4.4.2', statement: 'Explain the use of fuses, circuit breakers and earthing in domestic circuits.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'electrical-safety',
              title: 'Electrical safety',
              readingMinutes: 6,
              body: `### Hazards
Common electrical hazards include: **damaged or frayed insulation** (exposing live wires), **overheating cables** (from carrying too much current, or being coiled up so heat cannot escape), **damp conditions** (water conducts electricity, increasing the risk of shock), and **too many appliances** on one socket, drawing excess current.

### Fuses
A **fuse** is a thin wire that melts and breaks the circuit if the current becomes too large, protecting the appliance and its wiring from overheating and catching fire. The fuse rating is chosen just above the appliance's normal operating current.

### Circuit breakers
A **circuit breaker** does the same protective job as a fuse — cutting off current that is too high — but uses an electromagnetic switch instead of a melting wire, so it can be reset and reused rather than replaced.

### Earthing
The **earth wire** connects the metal casing of an appliance to the ground, providing a very low-resistance path. If a fault causes the live wire to touch the casing, a large current flows through the earth wire rather than through anyone touching the case, and this surge immediately blows the fuse, cutting off the supply.

**Double insulation** is an alternative: the appliance is built with two layers of insulation and no exposed metal parts at all, so there is no need for an earth wire.`,
              analogy:
                'A fuse is a deliberately weak link — like a small drawbridge designed to collapse safely under too much weight, protecting the much more valuable bridge (the appliance and its wiring) from being destroyed by an overload it was never designed to survive.',
              misconceptions: [
                'Thinking a fuse or circuit breaker directly protects a person from shock. Their job is to prevent excessive current from damaging the wiring and causing a fire; earthing is what protects a person by giving a fault current a safer path than through their body.',
                'Believing a blown fuse can simply be reset like a circuit breaker. A fuse wire has melted and must be physically replaced.',
                'Assuming any current is dangerous. It is specifically excess current — beyond what the cable and appliance are rated for — that fuses and circuit breakers are designed to detect and stop.',
              ],
              examTips: [
                'Explaining earthing needs the full chain: low-resistance path → large fault current flows to earth instead of through a person → this trips the fuse → supply is disconnected. Each link is usually worth its own mark.',
                'When choosing a fuse rating, pick the smallest standard value (commonly 3 A, 5 A or 13 A) that is still above the appliance\'s normal operating current.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'What does a fuse do?', back: 'It melts and breaks the circuit if the current exceeds a safe value.', difficulty: 'EASY' },
            { front: 'Why is an appliance earthed?', back: 'If a live wire touches the metal case, a large current flows to earth and blows the fuse, disconnecting the supply before anyone is shocked.', difficulty: 'HARD' },
            { front: 'Name three electrical hazards in the home.', back: 'Any three of: damaged insulation, overheating cables, damp conditions, excess current from too many appliances, long cables.', difficulty: 'EASY' },
            { front: 'How do you choose the correct fuse rating for an appliance?', back: 'Choose the fuse rated just above the normal operating current of the appliance — for example a 13 A fuse for an appliance drawing 10 A.', difficulty: 'MEDIUM' },
            { front: 'How does a circuit breaker differ from a fuse?', back: 'A circuit breaker is an electromagnetic switch that trips and can be reset, rather than melting and needing replacement like a fuse.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'A hairdryer is rated at 240 V, 8 A. Which fuse should be fitted?',
              options: [
                { id: 'a', text: '1 A', why: 'This is below the operating current — the fuse would blow immediately.' },
                { id: 'b', text: '3 A', why: 'Still below the 8 A operating current.' },
                { id: 'c', text: '13 A', why: '' },
                { id: 'd', text: '30 A', why: 'Far too high — it would not protect the appliance or the cable.' },
              ],
              answer: 'c',
              markScheme: ['13 A (1)'],
              marks: 1,
              explanation:
                'The fuse must be rated just above the normal current (8 A) so it does not blow in normal use, but still protects the circuit. Of the standard fuse ratings, 13 A is the smallest one above 8 A.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain how earthing an appliance with a metal case protects the user if the live wire comes loose and touches the case. [3]',
              answer:
                'The earth wire connects the metal case to the ground with a very low resistance path. If the live wire touches the case, a large current flows through the earth wire rather than through a person touching the case. This large current blows the fuse, which disconnects the live supply.',
              markScheme: [
                'Earth wire provides a low-resistance path from the case to the ground (1)',
                'A large current flows through the earth wire instead of through a person (1)',
                'This large current blows the fuse, disconnecting the supply (1)',
              ],
              marks: 3,
              explanation:
                'The three-step chain is what the mark scheme rewards: low-resistance path → large current diverted away from the user → fuse blows. Saying only "it protects you" without the mechanism scores nothing.',
              hint: 'What path does the current take, and what does that large current then do?',
            },
          ],
        },
        {
          number: '4.5',
          slug: 'electromagnetic-effects',
          title: 'Electromagnetic effects',
          summary:
            'Electromagnetic induction, the a.c. generator, transformers, the magnetic effect of a current, and the motor effect.',
          prerequisites: ['4.1', '4.2'],
          objectives: [
            { code: '4.5.1', statement: 'Describe an experiment to demonstrate electromagnetic induction and state the factors affecting the size of the induced e.m.f.', tier: 'CORE' },
            { code: '4.5.2', statement: 'Describe the construction and action of a simple a.c. generator.', tier: 'CORE' },
            { code: '4.5.3', statement: 'Describe the structure and use of a transformer and recall and use Vp/Vs = Np/Ns.', tier: 'CORE' },
            { code: '4.5.4', statement: 'Describe the force on a current-carrying conductor in a magnetic field and use Fleming\'s left-hand rule.', tier: 'CORE' },
          ],
          simulations: ['induction-lab'],
          lessons: [
            {
              slug: 'induction-generators-and-transformers',
              title: 'Induction, generators and transformers',
              readingMinutes: 9,
              body: `### Electromagnetic induction
When a conductor **cuts through magnetic field lines** — or the field through a coil changes — an e.m.f. is induced across the conductor. If the circuit is complete, a current flows.

The classic demonstration: move a bar magnet into a coil connected to a sensitive galvanometer. The needle deflects while the magnet moves and returns to zero when it stops. Reverse the motion and the deflection reverses.

The induced e.m.f. is larger if you increase:
- the speed of movement
- the number of turns on the coil
- the strength of the magnetic field

**Lenz's law** in one sentence: the induced effect always opposes the change causing it. That is why a generator gets harder to turn when you draw more current from it — and it is a direct consequence of conservation of energy.

### The a.c. generator
A coil rotates in a magnetic field. As it turns, the rate at which it cuts field lines changes, so the induced e.m.f. varies sinusoidally. **Slip rings** and brushes connect the rotating coil to the external circuit, and because they never swap contacts, the output alternates.

Peak e.m.f. occurs when the coil is **parallel to the field** (cutting field lines fastest), and the output is zero when the coil is perpendicular to the field.

### The transformer
A transformer has a primary coil and a secondary coil wound on a soft-iron core.

1. Alternating current in the primary produces a **changing magnetic field**.
2. The soft-iron core carries this changing field to the secondary coil.
3. The changing field **induces an alternating e.m.f.** in the secondary.

The turns-ratio relationship is \`Vp / Vs = Np / Ns\`. More turns on the secondary means a step-up transformer.

For an ideal (100% efficient) transformer, power in equals power out, so \`VpIp = VsIs\`. Stepping voltage up therefore steps current *down*.

### Why the grid uses high voltage
Power lost as heat in transmission cables is \`P = I²R\`. Because the loss depends on the **square** of the current, transmitting at high voltage and low current dramatically reduces the energy wasted.

### The motor effect
A current-carrying wire in a magnetic field experiences a force. Use **Fleming's left-hand rule**: first finger = field (N to S), second finger = current (conventional, + to −), thumb = motion (force). This is the basis of the d.c. motor and the loudspeaker.

A transformer only works with a.c. Connect it to a d.c. supply and the field is steady, nothing changes, and no e.m.f. is induced in the secondary.`,
              analogy:
                'Induction is like a bicycle dynamo: the harder you pedal (the faster the field changes), the brighter the lamp — and the more the dynamo resists your pedalling.',
              misconceptions: [
                'Thinking a transformer works on d.c. It needs a *changing* magnetic field, so it requires a.c.',
                'Saying current is induced. Strictly, an e.m.f. is induced; current only flows if the circuit is complete.',
                'Using the left-hand rule for generators. Left hand is for the motor effect; the generator effect uses the right hand.',
              ],
              examTips: [
                'Transformer questions almost always want the three-step chain: alternating current → changing magnetic field → induced e.m.f. in the secondary. Write all three.',
                'For "why is electricity transmitted at high voltage", the answer must mention that lower current reduces heating losses because P = I²R.',
                'When asked how to increase an induced e.m.f., give the standard three: move faster, more turns, stronger magnet.',
              ],
              workedExamples: [
                {
                  prompt: 'A transformer has 200 turns on the primary and 1200 turns on the secondary. The primary voltage is 12 V. Calculate the secondary voltage.',
                  steps: [
                    'Vp / Vs = Np / Ns, so Vs = Vp × (Ns / Np)',
                    'Vs = 12 × (1200 / 200)',
                    'Vs = 12 × 6',
                  ],
                  answer: 'Vs = 72 V (a step-up transformer)',
                },
                {
                  prompt: 'An ideal transformer steps 240 V down to 12 V. The output current is 2.0 A. Calculate the input current.',
                  steps: [
                    'For an ideal transformer, VpIp = VsIs',
                    '240 × Ip = 12 × 2.0 = 24',
                    'Ip = 24 / 240',
                  ],
                  answer: 'Ip = 0.10 A',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State three ways to increase an induced e.m.f.', back: 'Move the magnet/coil faster, use more turns on the coil, use a stronger magnet.', difficulty: 'MEDIUM' },
            { front: 'Why must a transformer be supplied with a.c.?', back: 'It needs a continuously changing magnetic field to induce an e.m.f. in the secondary; d.c. produces a steady field and no induction.', difficulty: 'HARD' },
            { front: 'Give the transformer turns equation.', back: 'Vp / Vs = Np / Ns', difficulty: 'EASY' },
            { front: 'Why is electricity transmitted at high voltage?', back: 'High voltage means low current, and power loss in the cables is I²R, so lower current wastes far less energy as heat.', difficulty: 'HARD' },
            { front: 'State Fleming\'s left-hand rule.', back: 'First finger = field, seCond finger = Current, thuMb = Motion (force). Used for the motor effect.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Explain how a transformer increases the voltage of an alternating supply. Your answer should refer to the primary coil, the core and the secondary coil. [4]',
              answer:
                'The alternating current in the primary coil produces a continuously changing magnetic field. The soft-iron core concentrates this changing field and carries it to the secondary coil. The changing field through the secondary induces an alternating e.m.f. in it. Because the secondary has more turns than the primary, the induced voltage is larger, according to Vp/Vs = Np/Ns.',
              markScheme: [
                'Alternating current in the primary produces a changing magnetic field (1)',
                'The soft-iron core links/carries this changing field to the secondary (1)',
                'The changing field induces an e.m.f. in the secondary coil (1)',
                'More turns on the secondary than the primary gives a larger voltage, Vp/Vs = Np/Ns (1)',
              ],
              marks: 4,
              explanation:
                'Every mark here is for one link in the causal chain. The word "changing" is essential — a candidate who writes "the current produces a magnetic field" without "changing" usually loses the first mark, because a steady field induces nothing.',
              hint: 'Four marks means four distinct steps. What must be changing?',
            },
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A transformer has 800 turns on the primary and 100 turns on the secondary. The primary is connected to a 240 V a.c. supply. Calculate the secondary voltage.',
              answer: '30 V',
              markScheme: ['Vp/Vs = Np/Ns (1)', '240 / Vs = 800 / 100 (1)', 'Vs = 30 V (1)'],
              marks: 3,
              explanation:
                'The turns ratio is 8:1 down, so the voltage is divided by 8: 240 ÷ 8 = 30 V. This is a step-down transformer.',
            },
          ],
        },
      ],
    },
    {
      number: '5',
      slug: 'nuclear-physics',
      title: 'Nuclear physics',
      summary: 'The nuclear model of the atom, isotopes, radioactive decay, half-life and safety.',
      subtopics: [
        {
          number: '5.1',
          slug: 'nuclear-model-of-the-atom',
          title: 'The nuclear model of the atom',
          summary: 'Protons, neutrons and electrons, nuclide notation, isotopes and the alpha-scattering evidence.',
          objectives: [
            { code: '5.1.1', statement: 'Describe the structure of the atom in terms of a nucleus containing protons and neutrons, surrounded by electrons.', tier: 'CORE' },
            { code: '5.1.2', statement: 'Use nuclide notation and define proton number and nucleon number.', tier: 'CORE' },
            { code: '5.1.3', statement: 'Describe how the alpha-particle scattering experiment supports the nuclear model.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['atom-builder'],
          lessons: [
            {
              slug: 'nuclear-model-of-the-atom',
              title: 'The nuclear model of the atom',
              readingMinutes: 6,
              body: `An atom has a tiny, dense, positively charged **nucleus** at its centre, containing **protons** and **neutrons**, surrounded by **electrons** occupying shells at relatively large distances from the nucleus. Almost all the mass of an atom is in the nucleus; almost all of its volume is empty space occupied by the electron shells.

### Nuclide notation
An atom is written as \`ᴬZX\`, where A is the **nucleon number** (protons + neutrons) at top left, and Z is the **proton number** (number of protons) at bottom left.

- Proton number identifies the element.
- Neutron number = nucleon number − proton number.
- In a neutral atom, number of electrons = number of protons.

### Evidence for the nuclear model: alpha-particle scattering
A thin gold foil was bombarded with alpha particles. The results:
- Most alpha particles passed straight through with little or no deflection — showing that **the atom is mostly empty space**.
- A small number were deflected through large angles, and a very few bounced almost straight back — showing that there is a **small, dense region** at the centre (the nucleus), and that it is **positively charged**, since it repelled the positive alpha particles.

This experiment replaced an earlier "plum pudding" model, in which positive charge was thought to be spread evenly throughout the atom, with the modern nuclear model.`,
              analogy:
                'If an atom were scaled up so its nucleus were the size of a marble, the electron shells would extend out to roughly the size of a football stadium — which is exactly why almost every alpha particle in the scattering experiment sailed straight through undisturbed, and only the rare direct approach to the tiny nucleus was deflected.',
              misconceptions: [
                'Believing electrons orbit the nucleus like planets around the Sun in fixed, visible paths. They occupy shells at characteristic energies; the "orbit" picture is a simplification.',
                'Thinking the alpha-scattering experiment disproved that atoms have any structure at all. It specifically disproved the idea of evenly spread positive charge, replacing it with a concentrated positive nucleus.',
                'Confusing proton number with nucleon number — proton number identifies the element; nucleon number also includes the neutrons.',
              ],
              examTips: [
                'When explaining the scattering experiment, link each observation to its conclusion explicitly: "most passed through, so..." and "a few deflected, so..." — do not just state the conclusions on their own.',
                'Nuclide notation questions often test whether you can extract protons, neutrons and electrons correctly — write out all three explicitly rather than trying to answer from memory.',
              ],
              workedExamples: [
                {
                  prompt: 'An atom is represented as ²⁷₁₃Al. State the number of protons, neutrons and electrons.',
                  steps: [
                    'Proton number = 13, so protons = 13',
                    'Neutrons = nucleon number − proton number = 27 − 13 = 14',
                    'Neutral atom, so electrons = protons = 13',
                  ],
                  answer: '13 protons, 14 neutrons, 13 electrons',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define nucleon number.', back: 'The total number of protons and neutrons in the nucleus.', difficulty: 'EASY' },
            { front: 'What did the alpha-scattering experiment show?', back: 'Most alpha particles passed straight through (the atom is mostly empty space) and a few were deflected through large angles (a small, dense, positively charged nucleus).', difficulty: 'HARD' },
            { front: 'Define proton number.', back: 'The number of protons in the nucleus of an atom.', difficulty: 'EASY' },
            { front: 'How do you find the number of electrons in a neutral atom?', back: 'It equals the proton number, since the positive and negative charges must balance.', difficulty: 'EASY' },
            { front: 'Write nuclide notation for an atom with nucleon number 23 and proton number 11.', back: '²³₁₁Na — nucleon number top left, proton number bottom left.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'FOUNDATION',
              stem: 'An atom has proton number 17 and nucleon number 35. State the number of protons, neutrons and electrons.',
              answer: '17 protons, 18 neutrons, 17 electrons',
              markScheme: ['Protons = 17, electrons = 17 (1)', 'Neutrons = 35 − 17 = 18 (1)'],
              marks: 2,
              explanation: 'Protons equal the proton number (17). Neutrons = nucleon number − proton number = 35 − 17 = 18. A neutral atom has equal protons and electrons.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'In the alpha-particle scattering experiment, a thin gold foil was bombarded with alpha particles. Most passed straight through, but a small number bounced back at large angles. Explain what each observation tells us about the structure of the atom. [3]',
              answer:
                'Most alpha particles passing straight through shows that the atom is mostly empty space. The small number deflected through large angles shows that the atom has a small, dense region — the nucleus — and that this nucleus is positively charged, since it repels the positive alpha particles.',
              markScheme: [
                'Most particles pass through undeflected: the atom is mostly empty space (1)',
                'A few are deflected through large angles: there is a small, dense nucleus (1)',
                'The nucleus is positively charged, since it repels the positive alpha particles (1)',
              ],
              marks: 3,
              explanation:
                'Each observation maps to one conclusion. Students often merge the "small" and "dense" and "charged" points into one sentence and lose marks for not stating the charge explicitly — the repulsion is what proves the nucleus is positive, not just present.',
              hint: 'Two separate observations are described — what does each one prove on its own?',
            },
          ],
        },
        {
          number: '5.2',
          slug: 'radioactivity',
          title: 'Radioactivity',
          summary: 'Background radiation, alpha, beta and gamma emission, decay equations, half-life, safety and uses.',
          prerequisites: ['5.1'],
          objectives: [
            { code: '5.2.1', statement: 'Describe the nature, penetrating power and ionising ability of alpha, beta and gamma radiation.', tier: 'CORE' },
            { code: '5.2.2', statement: 'Define half-life and use decay curves to determine it.', tier: 'CORE' },
            { code: '5.2.3', statement: 'Balance nuclear equations for alpha and beta decay.', tier: 'SUPPLEMENT' },
            { code: '5.2.4', statement: 'Describe safety precautions when handling radioactive sources and give uses of radioactivity.', tier: 'CORE' },
          ],
          simulations: ['half-life'],
          lessons: [
            {
              slug: 'radioactivity',
              title: 'Radioactivity and half-life',
              readingMinutes: 9,
              body: `**Background radiation** is the low level of radiation always present around us, from natural sources (rocks and soil, cosmic rays, radon gas) and artificial sources (medical procedures, nuclear industry).

### Three types of radiation
| | Nature | Penetrating power | Ionising ability |
| --- | --- | --- | --- |
| Alpha (α) | 2 protons + 2 neutrons | Stopped by paper or a few cm of air | Strongly ionising |
| Beta (β) | A fast-moving electron | Stopped by a few mm of aluminium | Moderately ionising |
| Gamma (γ) | Electromagnetic wave | Reduced by thick lead, never fully stopped | Weakly ionising |

Notice the trade-off: the more penetrating a radiation type is, the less strongly ionising it is, because it interacts with matter less often.

### Nuclear equations
In **alpha decay**, the nucleon number falls by 4 and the proton number falls by 2 (an alpha particle, ⁴₂He, is emitted). In **beta decay**, a neutron changes into a proton and an electron is emitted; the nucleon number stays the same but the proton number increases by 1.

### Half-life
The **half-life** is the time taken for half the radioactive nuclei in a sample to decay, or equivalently, for the count rate (corrected for background) to fall to half its value. Radioactive decay is **random** — you cannot predict when any individual nucleus will decay — but for a large sample, the half-life is constant and predictable.

### Safety and uses
Radioactive sources are handled with tongs (never bare hands), stored in lead-lined containers, and kept as far away as practical, since exposure is minimised by distance, shielding and time. Uses include: medical tracers and cancer treatment (gamma), smoke detectors (alpha), thickness control in manufacturing (beta), and sterilising equipment (gamma).`,
              analogy:
                'Half-life is like popcorn popping in a pan: you cannot predict which individual kernel will pop next, but you can reliably say that after a fixed time, about half of whatever is left will have popped — the process is random for one kernel, but statistically predictable for the whole batch.',
              misconceptions: [
                'Thinking half-life means "the time for the sample to completely decay". It is the time for half of what remains to decay — after two half-lives, a quarter remains, not zero.',
                'Believing you can predict when a specific nucleus will decay. Individual decay is random; only the behaviour of a large sample follows a predictable pattern.',
                'Assuming more penetrating radiation is more dangerous in every situation. Alpha, though the least penetrating, is the most dangerous if the source is swallowed or inhaled, because all its energy is deposited in a small area of the body.',
              ],
              examTips: [
                'Alpha, beta and gamma questions are commonly answered as a table in your head: nature, penetration, ionising power — practise reciting all three together, since a question naming one property often expects you to link it to another.',
                'For half-life graph questions, always subtract the background count rate first before halving, unless the question tells you background has already been accounted for.',
              ],
              workedExamples: [
                {
                  prompt: 'A radioactive isotope has a half-life of 8 days. Starting with 640 Bq (corrected for background), calculate the activity after 32 days.',
                  steps: [
                    '32 days ÷ 8 days = 4 half-lives',
                    '640 → 320 → 160 → 80 → 40',
                  ],
                  answer: '40 Bq',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define half-life.', back: 'The time taken for half the radioactive nuclei in a sample to decay (or for the count rate to fall to half its initial value).', difficulty: 'MEDIUM' },
            { front: 'Rank alpha, beta and gamma by penetrating power.', back: 'Alpha is least penetrating (stopped by paper), then beta (stopped by a few mm of aluminium), then gamma (reduced by thick lead).', difficulty: 'MEDIUM' },
            { front: 'What happens to the nucleon and proton number in alpha decay?', back: 'Nucleon number falls by 4; proton number falls by 2.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A radioactive source has a count rate of 800 counts/min. Its half-life is 15 minutes. Calculate the count rate after 45 minutes.',
              answer: '100 counts/min',
              markScheme: ['45 minutes is 3 half-lives (1)', '800 → 400 → 200 → 100 (1)', 'Answer 100 counts/min (1)'],
              marks: 3,
              explanation:
                '45 ÷ 15 = 3 half-lives. Halve the count rate three times: 800 → 400 → 200 → 100 counts/min. (Strictly, background radiation should be subtracted first if it is given.)',
              hint: 'How many half-lives fit into 45 minutes?',
            },
          ],
        },
      ],
    },
    {
      number: '6',
      slug: 'space-physics',
      title: 'Space physics',
      summary: 'The Earth and the Solar System, orbits, stars, the life cycle of stars and the expanding universe.',
      subtopics: [
        {
          number: '6.1',
          slug: 'earth-and-solar-system',
          title: 'Earth and the Solar System',
          summary: 'Day and night, seasons, the Moon, the planets, orbital speed and the formation of the Solar System.',
          objectives: [
            { code: '6.1.1', statement: 'Explain day, night and the apparent motion of the Sun in terms of the Earth\'s rotation.', tier: 'CORE' },
            { code: '6.1.2', statement: 'Describe the Solar System, the order of the planets, and the role of gravity in orbits.', tier: 'CORE' },
            { code: '6.1.3', statement: 'Recall and use v = 2πr / T for orbital speed.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['solar-system'],
          lessons: [
            {
              slug: 'earth-and-solar-system',
              title: 'The Earth and the Solar System',
              readingMinutes: 7,
              body: `### Day and night
The Earth **rotates on its axis** once approximately every 24 hours. The side facing the Sun experiences day; the side facing away experiences night. The Sun's apparent daily motion across the sky is caused by this rotation, not by the Sun actually moving around the Earth.

### The Solar System
The Solar System consists of the Sun, the planets and their moons, and smaller bodies such as asteroids and comets, all held in orbit by the Sun's gravity. In order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.

### Orbits and gravity
A planet stays in its roughly circular orbit because the Sun's **gravitational attraction acts as a centripetal force**, continuously pulling the planet towards the Sun and changing its direction without (in a perfectly circular orbit) changing its speed.

Orbital speed is given by \`v = 2πr / T\`, where r is the orbital radius (the circumference of the orbit is 2πr) and T is the time for one complete orbit.

Planets further from the Sun have both a longer path to travel **and** a weaker gravitational pull, so they move more slowly — both effects make their orbital period much longer than Earth's.`,
              analogy:
                'Orbiting under gravity is like swinging a ball on a string in a circle: the string constantly pulls the ball towards your hand (like gravity pulling a planet towards the Sun), changing its direction without ever touching it, and that inward pull is exactly what keeps the ball moving in a curve instead of flying off in a straight line.',
              misconceptions: [
                'Believing the Sun orbits the Earth, or that day and night are caused by the Sun moving. It is the Earth\'s rotation on its axis that causes the day-night cycle.',
                'Thinking a planet in orbit has no force acting on it because its speed is constant. A resultant force is still needed to continuously change its direction — that is gravity, acting as a centripetal force.',
                'Assuming all planets orbit at the same speed. Orbital speed depends on distance from the Sun; planets further out move more slowly.',
              ],
              examTips: [
                'When asked why outer planets take longer to orbit, give both reasons: a longer path (larger circumference) AND a weaker gravitational field giving a lower orbital speed.',
                'Remember 2πr is the circumference of the orbit — deriving it this way avoids needing to memorise the formula separately from what it means.',
              ],
              workedExamples: [
                {
                  prompt: 'A planet orbits at a radius of 2.0 × 10¹¹ m with an orbital period of 3.0 × 10⁷ s. Calculate its orbital speed.',
                  steps: [
                    'v = 2πr / T',
                    'v = (2 × π × 2.0 × 10¹¹) / (3.0 × 10⁷)',
                  ],
                  answer: 'v ≈ 4.2 × 10⁴ m/s',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What keeps a planet in orbit around the Sun?', back: 'The gravitational attraction of the Sun, acting towards the centre of the orbit.', difficulty: 'MEDIUM' },
            { front: 'Give the equation for orbital speed.', back: 'v = 2πr / T, where r is the orbital radius and T is the orbital period.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Why do the outer planets take longer to orbit the Sun than the inner planets?',
              options: [
                { id: 'a', text: 'They are larger.', why: 'Orbital period does not depend on the size of the planet.' },
                { id: 'b', text: 'They travel a greater distance and move more slowly.', why: '' },
                { id: 'c', text: 'They are pulled backwards by other planets.', why: 'This is not the main effect.' },
                { id: 'd', text: 'They rotate more slowly on their axes.', why: 'Rotation on its axis is a day, not a year.' },
              ],
              answer: 'b',
              markScheme: ['Greater orbital radius means a longer path, and the weaker gravitational field means a slower orbital speed (1)'],
              marks: 1,
              explanation:
                'The orbital circumference grows with radius, and the Sun\'s gravitational field is weaker further out, so the orbital speed is lower. Both effects lengthen the period.',
            },
          ],
        },
        {
          number: '6.2',
          slug: 'stars-and-the-universe',
          title: 'Stars and the Universe',
          summary: 'The Sun as a star, nuclear fusion, the life cycle of stars, galaxies, redshift and the Big Bang.',
          prerequisites: ['6.1'],
          objectives: [
            { code: '6.2.1', statement: 'Describe the Sun as a star that releases energy by nuclear fusion of hydrogen into helium.', tier: 'CORE' },
            { code: '6.2.2', statement: 'Describe the life cycle of a star, including the difference between low-mass and high-mass stars.', tier: 'SUPPLEMENT' },
            { code: '6.2.3', statement: 'Describe redshift as evidence that the Universe is expanding.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'stars-and-the-universe',
              title: 'Stars and the Universe',
              readingMinutes: 8,
              body: `### The Sun as a star
The Sun releases energy by **nuclear fusion**, in which hydrogen nuclei join together (fuse) to form helium nuclei, releasing enormous amounts of energy. This is the same basic process that powers every star.

### The life cycle of a star
Stars form from clouds of dust and gas (a nebula) pulled together by gravity, and their eventual fate depends on their mass:

**Low-mass stars** (like the Sun): main sequence star → red giant → the outer layers drift away, leaving a white dwarf, which slowly cools.

**High-mass stars**: main sequence star → red supergiant → supernova (a huge explosion) → the remnant becomes either a neutron star or, for the most massive stars, a black hole.

### Galaxies and redshift
A galaxy is an enormous collection of billions of stars, held together by gravity. Our Sun is one star within the Milky Way galaxy.

Light from distant galaxies is shifted towards the red (longer-wavelength) end of the spectrum — this is **redshift**, and it shows that those galaxies are moving away from us. Crucially, the further away a galaxy is, the greater its redshift and the faster it is moving away. This distance-dependent pattern is the key evidence that **the Universe is expanding** in all directions, and it supports the **Big Bang theory** — that the Universe began from an extremely hot, dense point and has been expanding and cooling ever since.`,
              analogy:
                'The expanding Universe is often pictured as spots painted on the surface of a balloon: as the balloon is inflated, every spot moves away from every other spot, and spots that started further apart move apart faster — exactly the pattern astronomers see in galaxy redshifts, with no special "centre" to the expansion.',
              misconceptions: [
                'Thinking a star "burns" like a fire, in a chemical reaction. Stars release energy through nuclear fusion, an entirely different (and vastly more powerful) process happening in their extremely hot, dense cores.',
                'Believing every star ends its life the same way. The outcome — white dwarf versus supernova and neutron star/black hole — depends critically on the star\'s mass.',
                'Assuming redshift just shows that some galaxies happen to be moving away. The specific pattern — that recession speed increases with distance — is what points to universal expansion rather than random galaxy motion.',
              ],
              examTips: [
                'Life-cycle questions often ask for the correct order of stages — learn the two sequences (low-mass and high-mass) as complete chains, since a step out of order loses the mark even if the words used are right.',
                'For redshift, the key phrase examiners want is that more distant galaxies show greater redshift — stating only "galaxies are redshifted" without the distance relationship is an incomplete answer.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'What process releases energy in the Sun?', back: 'Nuclear fusion of hydrogen nuclei into helium.', difficulty: 'EASY' },
            { front: 'What does redshift tell us?', back: 'Distant galaxies are moving away from us, and more distant galaxies move away faster — evidence that the Universe is expanding.', difficulty: 'HARD' },
            { front: 'What happens to a low-mass star like the Sun at the end of its life?', back: 'It expands into a red giant, then sheds its outer layers and collapses into a white dwarf.', difficulty: 'MEDIUM' },
            { front: 'What happens to a high-mass star at the end of its life?', back: 'It expands into a red supergiant, then explodes as a supernova, leaving behind a neutron star or a black hole.', difficulty: 'MEDIUM' },
            { front: 'What is the Big Bang theory?', back: 'The theory that the Universe began from an extremely hot, dense point and has been expanding ever since — supported by redshift evidence.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Which sequence correctly describes the life cycle of a high-mass star?',
              options: [
                { id: 'a', text: 'Main sequence → red giant → white dwarf', why: 'This is the path for a low-mass star like the Sun.' },
                { id: 'b', text: 'Main sequence → red supergiant → supernova → neutron star or black hole', why: '' },
                { id: 'c', text: 'Nebula → white dwarf → supernova', why: 'A white dwarf does not explode as a supernova.' },
                { id: 'd', text: 'Red supergiant → main sequence → nebula', why: 'This is not the correct order of stages.' },
              ],
              answer: 'b',
              markScheme: ['Main sequence → red supergiant → supernova → neutron star or black hole (1)'],
              marks: 1,
              explanation: 'A high-mass star swells into a red supergiant, explodes as a supernova, and leaves behind an extremely dense remnant: a neutron star, or a black hole if the original star was massive enough.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Explain how redshift provides evidence that the Universe is expanding. [3]',
              answer:
                'Light from distant galaxies is shifted towards the red (longer wavelength) end of the spectrum. This redshift shows the galaxies are moving away from us. More distant galaxies show a greater redshift, meaning they are moving away faster, which is evidence that space itself is expanding in all directions.',
              markScheme: [
                'Light from galaxies is shifted to longer wavelengths (redshifted) (1)',
                'This shows galaxies are moving away from us (1)',
                'More distant galaxies have greater redshift / move away faster, showing the Universe is expanding (1)',
              ],
              marks: 3,
              explanation:
                'The key relationship is distance-dependence: it is not just that galaxies are moving away, but that the further away a galaxy is, the faster it recedes. That specific pattern is what points to universal expansion rather than galaxies simply moving through static space.',
              hint: 'It is not just that redshift happens — what pattern does it follow with distance?',
            },
          ],
        },
      ],
    },
  ],
};
