import { chemistryFlashcards, chemistryMcqTemplates, chemistryTemplates } from './chemistry';
import { conceptFlashcards, conceptQuestions } from './concepts';
import { type GenFlashcard, type GenQuestion, expand } from './core';
import { addMathsTemplates, mathsFlashcards, mathsTemplates } from './maths';
import { physicsMcqTemplates, physicsTemplates } from './physics';
import { biologyTemplates, ictTemplates } from './biology-ict';

export type { GenFlashcard, GenQuestion } from './core';

/** The whole generated bank. Deterministic: the same output on every run. */
export function generateBank(): { questions: GenQuestion[]; flashcards: GenFlashcard[] } {
  const questions = [
    ...expand(physicsTemplates, 'physics'),
    ...expand(physicsMcqTemplates, 'physics-mcq'),
    ...expand(chemistryTemplates, 'chemistry'),
    ...expand(chemistryMcqTemplates, 'chemistry-mcq'),
    ...expand(mathsTemplates, 'maths'),
    ...expand(addMathsTemplates, 'add-maths'),
    ...expand(biologyTemplates, 'biology'),
    ...expand(ictTemplates, 'ict'),
    ...conceptQuestions(),
  ];
  const flashcards = [...conceptFlashcards(), ...chemistryFlashcards(), ...mathsFlashcards()];
  return {
    questions: [...new Map(questions.map((q) => [q.id, q])).values()],
    flashcards: [...new Map(flashcards.map((c) => [c.id, c])).values()],
  };
}
