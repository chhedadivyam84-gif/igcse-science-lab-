'use client';

import { LazyMolecule, LazySolarSystem } from '@/components/three/LazyScene';
import { SimShell } from './SimShell';

/** Wraps the 3D scenes in the same Observe → Predict → Explain structure. */

export function SolarSystemSim() {
  return (
    <SimShell
      title="Solar System"
      description="Orbits, radii and periods in three dimensions."
      stage={
        <div className="h-[26rem] p-3">
          <LazySolarSystem />
        </div>
      }
      controls={
        <p className="text-sm text-ink-muted">
          Drag inside the scene to orbit the camera, scroll to zoom, and click any planet to read its
          data. The animation speed slider sits beside the scene.
        </p>
      }
      content={{
        observe:
          'Compare how far each planet travels in one lap with how long it takes. The inner planets lap the outer ones many times over.',
        variables: 'Which planet you select, and how fast the animation runs.',
        predict: {
          question: 'Neptune orbits at about 30 AU. Roughly how long is its year compared with Earth’s?',
          options: ['About 30 times longer', 'About 165 times longer', 'About the same', 'About 900 times longer'],
          answerIndex: 1,
          why: 'Neptune takes about 165 Earth years. The period grows faster than the radius, because the orbital speed also falls with distance.',
        },
        experiment: [
          'Select Mercury, then Neptune, and compare their orbital radii and periods.',
          'Work out Earth’s orbital speed from v = 2πr / T using the panel values.',
          'Find two planets whose periods differ by roughly a factor of ten.',
        ],
        explain: (
          <>
            <p>
              Planets stay in orbit because the Sun&rsquo;s <strong>gravitational attraction</strong> acts
              towards the centre of the orbit, continuously changing the planet&rsquo;s direction without
              changing its speed.
            </p>
            <p>
              Further out, the gravitational field is weaker, so the orbital speed is lower — and the path
              is longer. Both effects lengthen the year, which is why Neptune takes 165 Earth years rather
              than 30.
            </p>
            <p>
              Orbital speed is <code className="formula">v = 2πr / T</code>: the circumference of the orbit
              divided by the time to go round once.
            </p>
          </>
        ),
      }}
    />
  );
}

export function MoleculeSim() {
  return (
    <SimShell
      title="3D molecule viewer"
      description="Rotate common IGCSE molecules and count the shared pairs."
      stage={
        <div className="h-[26rem] p-3">
          <LazyMolecule molecule="water" />
        </div>
      }
      controls={
        <p className="text-sm text-ink-muted">
          Choose a molecule from the panel beside the scene, drag to rotate and scroll to zoom. Each rod
          is one shared pair of electrons.
        </p>
      }
      content={{
        observe:
          'Count the rods between each pair of atoms. One rod is a single bond, two is a double bond, three is a triple bond.',
        variables: 'Which molecule you are viewing.',
        predict: {
          question: 'Methane is tetrahedral rather than flat. Why?',
          options: [
            'Carbon has four electron shells',
            'The four bonding pairs repel each other equally',
            'Hydrogen atoms attract each other',
            'It is flat — the model is wrong',
          ],
          answerIndex: 1,
          why: 'Four bonding pairs around the carbon repel each other and get as far apart as possible, which in three dimensions means a tetrahedron at 109.5°.',
        },
        experiment: [
          'Compare methane and ammonia. Ammonia has one fewer bond — what happens to the shape?',
          'Look at carbon dioxide and count the rods on each side of the carbon.',
          'Find the C=C double bond in ethene, the bond that makes it unsaturated.',
        ],
        explain: (
          <>
            <p>
              A <strong>covalent bond</strong> is a shared pair of electrons. Sharing lets both atoms
              reach a full outer shell without transferring electrons.
            </p>
            <p>
              The shape follows from repulsion between electron pairs. Four bonding pairs give a
              tetrahedron; three bonding pairs plus a lone pair give a pyramid; two bonding regions give a
              linear molecule.
            </p>
            <p>
              Boiling a simple molecular substance breaks only the weak forces <em>between</em> molecules,
              not the strong covalent bonds inside them — which is why methane boils at such a low
              temperature.
            </p>
          </>
        ),
      }}
    />
  );
}
