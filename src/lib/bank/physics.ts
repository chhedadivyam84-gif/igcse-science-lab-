import { type Made, type Rng, type Template, mcq, n, numericDistractors, sf } from './core';

/** A two-mark calculation: equation, then answer with unit. */
function calc(stem: string, value: number, unit: string, equation: string, working: string, hint?: string): Made {
  const answer = `${sf(value)}${unit ? ` ${unit}` : ''}`;
  return {
    stem,
    answer,
    markScheme: [`Uses ${equation} (1)`, `${answer} (1)`],
    explanation: `${equation}. ${working} = ${answer}.`,
    hint,
  };
}

const objects = ['a car', 'a cyclist', 'a runner', 'a train', 'a bus', 'a lorry', 'a motorbike', 'a boat'];
const things = ['a box', 'a trolley', 'a block', 'a crate', 'a sledge', 'a cart'];
const P = (sub: string, make: (r: Rng) => Made | null, extra: Partial<Template> = {}): Template => ({
  subject: 'physics',
  subtopic: sub,
  make,
  ...extra,
});

export const physicsTemplates: Template[] = [
  // --- 1.2 Motion ------------------------------------------------------------
  P('1.2', (r) => {
    const s = r.step(50, 5000, 50), t = r.step(5, 600, 5);
    return calc(`${cap(r.pick(objects))} travels ${n(s)} m in ${n(t)} s. Calculate its average speed.`, s / t, 'm/s', 'speed = distance ÷ time', `${n(s)} ÷ ${n(t)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.2', (r) => {
    const v = r.step(2, 40, 0.5), t = r.step(5, 300, 5);
    return calc(`${cap(r.pick(objects))} moves at a constant ${n(v)} m/s for ${n(t)} s. How far does it travel?`, v * t, 'm', 'distance = speed × time', `${n(v)} × ${n(t)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.2', (r) => {
    const s = r.step(100, 9000, 100), v = r.step(2, 30, 1);
    return calc(`How long does it take ${r.pick(objects)} travelling at ${n(v)} m/s to cover ${n(s)} m?`, s / v, 's', 'time = distance ÷ speed', `${n(s)} ÷ ${n(v)}`);
  }),
  P('1.2', (r) => {
    const u = r.int(0, 20), v = u + r.int(2, 30), t = r.step(1, 20, 0.5);
    return calc(`${cap(r.pick(objects))} speeds up from ${u} m/s to ${v} m/s in ${n(t)} s. Calculate its acceleration.`, (v - u) / t, 'm/s²', 'a = Δv ÷ t', `(${v} − ${u}) ÷ ${n(t)}`, 'Find the change in velocity first.');
  }),
  P('1.2', (r) => {
    const v = r.int(8, 35), u = r.int(0, v - 4), t = r.step(2, 20, 1);
    return calc(`A velocity–time graph is a straight line from ${u} m/s to ${v} m/s over ${t} s. Calculate the distance travelled (the area under the graph).`, ((u + v) / 2) * t, 'm', 'distance = area under v–t graph', `½ × (${u} + ${v}) × ${t}`, 'The area is a trapezium (or a triangle if it starts from rest).');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('1.2', (r) => {
    const a = r.step(0.5, 6, 0.5), t = r.step(2, 15, 1), u = r.int(0, 10);
    return calc(`An object starts at ${u} m/s and accelerates uniformly at ${n(a)} m/s² for ${t} s. What is its final velocity?`, u + a * t, 'm/s', 'Δv = a × t', `${u} + ${n(a)} × ${t}`);
  }),
  P('1.2', (r) => {
    const u = r.int(10, 40), t = r.step(2, 10, 0.5);
    return calc(`A vehicle travelling at ${u} m/s brakes to a stop in ${n(t)} s. Calculate its deceleration.`, u / t, 'm/s²', 'a = Δv ÷ t', `${u} ÷ ${n(t)}`);
  }),

  // --- 1.3 Mass and weight ---------------------------------------------------
  P('1.3', (r) => {
    const m = r.step(0.2, 120, 0.1), g = r.pick([9.8, 10]);
    return calc(`Calculate the weight of a mass of ${n(m)} kg on Earth (g = ${g} N/kg).`, m * g, 'N', 'W = m × g', `${n(m)} × ${g}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.3', (r) => {
    const place = r.pick([['the Moon', 1.6], ['Mars', 3.7], ['Jupiter', 25]] as const);
    const m = r.int(2, 150);
    return calc(`An astronaut's equipment has a mass of ${m} kg. What is its weight on ${place[0]}, where g = ${place[1]} N/kg?`, m * place[1], 'N', 'W = m × g', `${m} × ${place[1]}`);
  }),
  P('1.3', (r) => {
    const w = r.step(5, 1500, 5), g = r.pick([9.8, 10]);
    return calc(`An object weighs ${n(w)} N on Earth (g = ${g} N/kg). Calculate its mass.`, w / g, 'kg', 'm = W ÷ g', `${n(w)} ÷ ${g}`);
  }),

  // --- 1.4 Density -------------------------------------------------------------
  P('1.4', (r) => {
    const m = r.step(10, 2000, 10), v = r.step(5, 500, 5);
    return calc(`A block has a mass of ${n(m)} g and a volume of ${n(v)} cm³. Calculate its density.`, m / v, 'g/cm³', 'density = mass ÷ volume', `${n(m)} ÷ ${n(v)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.4', (r) => {
    const mat = r.pick([['aluminium', 2700], ['iron', 7900], ['copper', 8900], ['water', 1000], ['oak', 700], ['lead', 11300]] as const);
    const v = r.step(0.002, 0.5, 0.002);
    return calc(`The density of ${mat[0]} is ${mat[1]} kg/m³. Calculate the mass of ${n(v)} m³ of ${mat[0]}.`, mat[1] * v, 'kg', 'mass = density × volume', `${mat[1]} × ${n(v)}`);
  }),
  P('1.4', (r) => {
    const m = r.step(20, 900, 10), rho = r.pick([0.8, 1.0, 2.7, 7.9, 8.9, 11.3]);
    return calc(`A liquid or solid of density ${rho} g/cm³ has a mass of ${n(m)} g. What is its volume?`, m / rho, 'cm³', 'volume = mass ÷ density', `${n(m)} ÷ ${rho}`);
  }),
  P('1.4', (r) => {
    const l = r.int(2, 12), w = r.int(2, 10), h = r.int(1, 8), rho = r.pick([2.7, 7.9, 8.9, 0.7, 1.2]);
    return calc(`A rectangular block measures ${l} cm × ${w} cm × ${h} cm and has density ${rho} g/cm³. Calculate its mass.`, l * w * h * rho, 'g', 'mass = density × volume', `${rho} × (${l} × ${w} × ${h})`, 'Find the volume first.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('1.4', (r) => {
    const before = r.int(20, 60), after = before + r.int(5, 40), m = r.step(10, 300, 5);
    return calc(`A stone is lowered into a measuring cylinder and the water level rises from ${before} cm³ to ${after} cm³. The stone's mass is ${n(m)} g. Calculate its density.`, m / (after - before), 'g/cm³', 'density = mass ÷ volume', `${n(m)} ÷ (${after} − ${before})`, 'The volume of the stone is the rise in water level.');
  }),

  // --- 1.5 Forces --------------------------------------------------------------
  P('1.5', (r) => {
    const m = r.step(0.5, 2000, 0.5), a = r.step(0.2, 12, 0.2);
    return calc(`What resultant force is needed to give a mass of ${n(m)} kg an acceleration of ${n(a)} m/s²?`, m * a, 'N', 'F = m × a', `${n(m)} × ${n(a)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.5', (r) => {
    const F = r.step(10, 8000, 10), m = r.step(1, 1500, 1);
    return calc(`A resultant force of ${n(F)} N acts on ${r.pick(things)} of mass ${n(m)} kg. Calculate the acceleration.`, F / m, 'm/s²', 'a = F ÷ m', `${n(F)} ÷ ${n(m)}`);
  }),
  P('1.5', (r) => {
    const push = r.int(50, 900), friction = r.int(10, push - 10), m = r.int(5, 200);
    return calc(`${cap(r.pick(things))} of mass ${m} kg is pushed with a force of ${push} N against friction of ${friction} N. Calculate its acceleration.`, (push - friction) / m, 'm/s²', 'a = resultant force ÷ m', `(${push} − ${friction}) ÷ ${m}`, 'Find the resultant force first.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('1.5', (r) => {
    const k = r.step(5, 200, 5), F = r.step(1, 40, 0.5);
    return calc(`A spring has a spring constant of ${n(k)} N/m. Calculate its extension when a force of ${n(F)} N is applied (within the limit of proportionality).`, F / k, 'm', 'extension = F ÷ k', `${n(F)} ÷ ${n(k)}`);
  }),
  P('1.5', (r) => {
    const F = r.step(1, 60, 0.5), x = r.step(0.01, 0.5, 0.01);
    return calc(`A force of ${n(F)} N stretches a spring by ${n(x)} m. Calculate the spring constant.`, F / x, 'N/m', 'k = F ÷ x', `${n(F)} ÷ ${n(x)}`);
  }),
  P('1.5', (r) => {
    const F = r.int(5, 400), d = r.step(0.05, 2.5, 0.05);
    return calc(`A force of ${F} N acts at a perpendicular distance of ${n(d)} m from a pivot. Calculate the moment of the force.`, F * d, 'N m', 'moment = F × d', `${F} × ${n(d)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.5', (r) => {
    const w1 = r.int(100, 800), d1 = r.step(0.5, 3, 0.1), d2 = r.step(0.5, 3, 0.1);
    return calc(`On a see-saw, a child of weight ${w1} N sits ${n(d1)} m from the pivot. How heavy must a child sitting ${n(d2)} m from the pivot on the other side be for it to balance?`, (w1 * d1) / d2, 'N', 'clockwise moments = anticlockwise moments', `${w1} × ${n(d1)} ÷ ${n(d2)}`, 'Use the principle of moments.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),

  // --- 1.6 Momentum ------------------------------------------------------------
  P('1.6', (r) => {
    const m = r.step(0.05, 2000, 0.05), v = r.step(0.5, 40, 0.5);
    return calc(`Calculate the momentum of a ${n(m)} kg object moving at ${n(v)} m/s.`, m * v, 'kg m/s', 'p = m × v', `${n(m)} × ${n(v)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.6', (r) => {
    const F = r.step(5, 5000, 5), t = r.step(0.01, 5, 0.01);
    return calc(`A force of ${n(F)} N acts for ${n(t)} s. Calculate the impulse (change in momentum).`, F * t, 'N s', 'impulse = F × t', `${n(F)} × ${n(t)}`);
  }),
  P('1.6', (r) => {
    const m1 = r.int(500, 2000), v1 = r.int(5, 25), m2 = r.int(500, 2000);
    return calc(`A ${m1} kg car moving at ${v1} m/s collides with a stationary ${m2} kg car and they move off together. Calculate their speed just after the collision.`, (m1 * v1) / (m1 + m2), 'm/s', 'total momentum before = total momentum after', `(${m1} × ${v1}) ÷ (${m1} + ${m2})`, 'Momentum is conserved.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('1.6', (r) => {
    const m = r.step(0.1, 80, 0.1), dv = r.int(2, 30), t = r.step(0.01, 2, 0.01);
    return calc(`A ${n(m)} kg object's velocity changes by ${dv} m/s in ${n(t)} s. Calculate the average resultant force.`, (m * dv) / t, 'N', 'F = Δp ÷ t', `(${n(m)} × ${dv}) ÷ ${n(t)}`);
  }, { difficulty: 'CHALLENGE', marks: 3 }),

  // --- 1.7 Energy, work and power ---------------------------------------------
  P('1.7', (r) => {
    const m = r.step(0.1, 1500, 0.1), v = r.step(1, 35, 0.5);
    return calc(`Calculate the kinetic energy of a ${n(m)} kg object moving at ${n(v)} m/s.`, 0.5 * m * v * v, 'J', 'Ek = ½ m v²', `0.5 × ${n(m)} × ${n(v)}²`, 'Square the speed before multiplying.');
  }),
  P('1.7', (r) => {
    const m = r.step(0.1, 100, 0.1), h = r.step(0.5, 120, 0.5), g = r.pick([9.8, 10]);
    return calc(`A ${n(m)} kg object is lifted ${n(h)} m. Calculate its gain in gravitational potential energy (g = ${g} N/kg).`, m * g * h, 'J', 'ΔEp = m g Δh', `${n(m)} × ${g} × ${n(h)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.7', (r) => {
    const h = r.step(0.5, 50, 0.5), g = 10;
    return calc(`An object is dropped from rest from a height of ${n(h)} m. Ignoring air resistance, calculate its speed just before it hits the ground (g = 10 N/kg).`, Math.sqrt(2 * g * h), 'm/s', 'm g h = ½ m v², so v = √(2 g h)', `√(2 × 10 × ${n(h)})`, 'All the potential energy becomes kinetic energy.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('1.7', (r) => {
    const F = r.int(5, 2000), d = r.step(0.5, 300, 0.5);
    return calc(`A force of ${F} N moves an object ${n(d)} m in the direction of the force. Calculate the work done.`, F * d, 'J', 'W = F × d', `${F} × ${n(d)}`, undefined);
  }, { difficulty: 'FOUNDATION' }),
  P('1.7', (r) => {
    const E = r.step(100, 900000, 100), t = r.step(2, 3600, 2);
    return calc(`A motor transfers ${n(E)} J of energy in ${n(t)} s. Calculate its power.`, E / t, 'W', 'P = E ÷ t', `${n(E)} ÷ ${n(t)}`);
  }),
  P('1.7', (r) => {
    const P0 = r.pick([60, 100, 500, 750, 1200, 2000, 3000]), t = r.int(10, 600);
    return calc(`A ${P0} W appliance runs for ${t} s. How much energy does it transfer?`, P0 * t, 'J', 'E = P × t', `${P0} × ${t}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.7', (r) => {
    const input = r.step(100, 5000, 50), eff = r.int(10, 95);
    const useful = (input * eff) / 100;
    return calc(`A machine is supplied with ${n(input)} J and transfers ${n(useful)} J usefully. Calculate its efficiency as a percentage.`, eff, '%', 'efficiency = useful output ÷ total input × 100%', `${n(useful)} ÷ ${n(input)} × 100`);
  }),
  P('1.7', (r) => {
    const input = r.step(200, 8000, 100), eff = r.pick([15, 20, 25, 30, 40, 60, 75, 80, 90]);
    return calc(`A device has an efficiency of ${eff}% and is supplied with ${n(input)} J. How much energy is wasted?`, input * (1 - eff / 100), 'J', 'wasted = input − useful output', `${n(input)} − ${n(input)} × ${eff / 100}`, 'Find the useful output first.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),

  // --- 1.8 Pressure --------------------------------------------------------------
  P('1.8', (r) => {
    const F = r.int(10, 9000), A = r.step(0.01, 4, 0.01);
    return calc(`A force of ${F} N acts on an area of ${n(A)} m². Calculate the pressure.`, F / A, 'Pa', 'p = F ÷ A', `${F} ÷ ${n(A)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('1.8', (r) => {
    const fl = r.pick([['water', 1000], ['sea water', 1030], ['oil', 800], ['mercury', 13600]] as const);
    const h = r.step(0.1, 50, 0.1), g = r.pick([9.8, 10]);
    return calc(`Calculate the pressure due to ${n(h)} m of ${fl[0]} (density ${fl[1]} kg/m³, g = ${g} N/kg).`, fl[1] * g * h, 'Pa', 'Δp = ρ g Δh', `${fl[1]} × ${g} × ${n(h)}`);
  }),
  P('1.8', (r) => {
    const p = r.int(1000, 300000), A = r.step(0.01, 2, 0.01);
    return calc(`A pressure of ${p} Pa acts on an area of ${n(A)} m². What force does it produce?`, p * A, 'N', 'F = p × A', `${p} × ${n(A)}`);
  }),

  // --- 2.1 / 2.2 Gas laws, thermal -------------------------------------------
  P('2.1', (r) => {
    const p1 = r.int(80, 300), V1 = r.int(10, 500), V2 = r.int(5, 600);
    if (V2 === V1) return null;
    return calc(`A fixed mass of gas at constant temperature has pressure ${p1} kPa and volume ${V1} cm³. The volume changes to ${V2} cm³. Calculate the new pressure.`, (p1 * V1) / V2, 'kPa', 'p₁V₁ = p₂V₂', `${p1} × ${V1} ÷ ${V2}`);
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('2.1', (r) => {
    const c = r.int(-200, 400);
    return calc(`Convert ${c} °C to kelvin.`, c + 273, 'K', 'T (K) = θ (°C) + 273', `${c} + 273`);
  }, { difficulty: 'FOUNDATION', marks: 1 }),
  P('2.2', (r) => {
    const mat = r.pick([['water', 4200], ['aluminium', 900], ['copper', 390], ['oil', 2000], ['iron', 450]] as const);
    const m = r.step(0.1, 5, 0.1), dT = r.int(2, 80);
    return calc(`How much energy is needed to raise the temperature of ${n(m)} kg of ${mat[0]} by ${dT} °C? (specific heat capacity ${mat[1]} J/(kg °C))`, m * mat[1] * dT, 'J', 'ΔE = m c ΔT', `${n(m)} × ${mat[1]} × ${dT}`);
  }),
  P('2.2', (r) => {
    const E = r.step(1000, 500000, 500), m = r.step(0.2, 4, 0.1), dT = r.int(5, 60);
    return calc(`${n(E)} J of energy raises the temperature of ${n(m)} kg of a liquid by ${dT} °C. Calculate its specific heat capacity.`, E / (m * dT), 'J/(kg °C)', 'c = ΔE ÷ (m ΔT)', `${n(E)} ÷ (${n(m)} × ${dT})`);
  }, { difficulty: 'CHALLENGE', marks: 3 }),

  // --- 3.1 Waves ------------------------------------------------------------------
  P('3.1', (r) => {
    const f = r.step(0.5, 2000, 0.5), l = r.step(0.01, 20, 0.01);
    return calc(`A wave has a frequency of ${n(f)} Hz and a wavelength of ${n(l)} m. Calculate its speed.`, f * l, 'm/s', 'v = f λ', `${n(f)} × ${n(l)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('3.1', (r) => {
    const v = r.pick([1.5, 3, 340, 330, 1500, 5000]), f = r.int(2, 2000);
    return calc(`A wave travels at ${v} m/s with a frequency of ${f} Hz. Calculate its wavelength.`, v / f, 'm', 'λ = v ÷ f', `${v} ÷ ${f}`);
  }),
  P('3.1', (r) => {
    const v = r.pick([340, 1500, 3.0e8]), l = r.pick([0.5, 1.7, 2, 0.017, 0.68, 500]);
    return calc(`A wave of wavelength ${n(l)} m travels at ${sf(v)} m/s. Calculate its frequency.`, v / l, 'Hz', 'f = v ÷ λ', `${sf(v)} ÷ ${n(l)}`);
  }),
  P('3.1', (r) => {
    const T = r.step(0.002, 4, 0.002);
    return calc(`A wave has a period of ${n(T)} s. Calculate its frequency.`, 1 / T, 'Hz', 'f = 1 ÷ T', `1 ÷ ${n(T)}`);
  }, { marks: 1 }),

  // --- 3.2 Light -----------------------------------------------------------------
  P('3.2', (r) => {
    const i = r.int(10, 80), nn = r.pick([1.33, 1.5, 1.52, 2.42]);
    const rr = (Math.asin(Math.sin((i * Math.PI) / 180) / nn) * 180) / Math.PI;
    return calc(`Light passes from air into a material of refractive index ${nn} at an angle of incidence of ${i}°. Calculate the angle of refraction.`, rr, '°', 'n = sin i ÷ sin r', `sin r = sin ${i}° ÷ ${nn}`, 'Rearrange for sin r, then use sin⁻¹.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('3.2', (r) => {
    const i = r.int(20, 75), rr = r.int(10, i - 5);
    const nn = Math.sin((i * Math.PI) / 180) / Math.sin((rr * Math.PI) / 180);
    return calc(`A ray in air has an angle of incidence of ${i}° and an angle of refraction of ${rr}° in glass. Calculate the refractive index of the glass.`, nn, '', 'n = sin i ÷ sin r', `sin ${i}° ÷ sin ${rr}°`);
  }),
  P('3.2', (r) => {
    const nn = r.pick([1.33, 1.4, 1.5, 1.6, 2.42]);
    return calc(`Calculate the critical angle for a material of refractive index ${nn}.`, (Math.asin(1 / nn) * 180) / Math.PI, '°', 'n = 1 ÷ sin c', `sin c = 1 ÷ ${nn}`);
  }, { difficulty: 'CHALLENGE' }),

  // --- 3.4 Sound ------------------------------------------------------------------
  P('3.4', (r) => {
    const d = r.int(50, 1700), v = r.pick([330, 340]);
    return calc(`A student claps ${d} m from a cliff. The speed of sound is ${v} m/s. How long after clapping is the echo heard?`, (2 * d) / v, 's', 'time = distance ÷ speed', `(2 × ${d}) ÷ ${v}`, 'The sound travels to the cliff and back.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('3.4', (r) => {
    const t = r.step(0.2, 4, 0.1), v = r.pick([1500, 1480]);
    return calc(`A ship's sonar pulse returns from the sea bed after ${n(t)} s. Sound travels at ${v} m/s in sea water. How deep is the water?`, (v * t) / 2, 'm', 'distance = speed × time ÷ 2 (there and back)', `${v} × ${n(t)} ÷ 2`);
  }, { difficulty: 'CHALLENGE', marks: 3 }),

  // --- 4.2 / 4.3 Electricity ------------------------------------------------------
  P('4.2', (r) => {
    const I = r.step(0.1, 13, 0.1), R = r.step(0.5, 500, 0.5);
    return calc(`A current of ${n(I)} A flows through a ${n(R)} Ω resistor. Calculate the potential difference across it.`, I * R, 'V', 'V = I R', `${n(I)} × ${n(R)}`);
  }, { difficulty: 'FOUNDATION' }),
  P('4.2', (r) => {
    const V = r.pick([1.5, 3, 4.5, 6, 9, 12, 24, 230]), R = r.int(2, 1000);
    return calc(`A ${V} V supply is connected across a ${R} Ω resistor. Calculate the current.`, V / R, 'A', 'I = V ÷ R', `${V} ÷ ${R}`);
  }),
  P('4.2', (r) => {
    const V = r.pick([3, 6, 9, 12, 230]), I = r.step(0.05, 10, 0.05);
    return calc(`The current through a component is ${n(I)} A when the p.d. across it is ${V} V. Calculate its resistance.`, V / I, 'Ω', 'R = V ÷ I', `${V} ÷ ${n(I)}`);
  }),
  P('4.2', (r) => {
    const I = r.step(0.1, 10, 0.1), t = r.int(5, 3600);
    return calc(`A current of ${n(I)} A flows for ${t} s. How much charge passes?`, I * t, 'C', 'Q = I t', `${n(I)} × ${t}`);
  }, { difficulty: 'FOUNDATION' }),
  P('4.2', (r) => {
    const V = r.pick([1.5, 6, 12, 230]), I = r.step(0.1, 10, 0.1);
    return calc(`Calculate the power of a device that draws ${n(I)} A from a ${V} V supply.`, V * I, 'W', 'P = I V', `${n(I)} × ${V}`);
  }),
  P('4.2', (r) => {
    const P0 = r.pick([60, 100, 1000, 2000, 2500, 3000]), V = 230;
    return calc(`A ${P0} W appliance runs on the ${V} V mains. Calculate the current it draws.`, P0 / V, 'A', 'I = P ÷ V', `${P0} ÷ ${V}`);
  }),
  P('4.2', (r) => {
    const Q = r.int(2, 500), V = r.pick([1.5, 6, 9, 12, 230]);
    return calc(`${Q} C of charge moves through a p.d. of ${V} V. How much energy is transferred?`, Q * V, 'J', 'E = Q V', `${Q} × ${V}`);
  }),
  P('4.2', (r) => {
    const kw = r.pick([0.06, 0.1, 0.5, 1.2, 2, 3]), h = r.step(0.5, 10, 0.5), p = r.int(10, 40);
    return calc(`A ${kw} kW appliance is used for ${n(h)} hours. Electricity costs ${p} cents per kW h. Calculate the cost.`, kw * h * p, 'cents', 'energy (kW h) = power (kW) × time (h)', `${kw} × ${n(h)} × ${p}`, 'Work out the kilowatt-hours first.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('4.3', (r) => {
    const rs = Array.from({ length: r.int(2, 4) }, () => r.int(1, 100));
    return calc(`Resistors of ${rs.join(' Ω, ')} Ω are connected in series. Calculate the total resistance.`, rs.reduce((a, b) => a + b, 0), 'Ω', 'R = R₁ + R₂ + …', rs.join(' + '));
  }, { difficulty: 'FOUNDATION' }),
  P('4.3', (r) => {
    const a = r.int(2, 60), b = r.int(2, 60);
    return calc(`Two resistors of ${a} Ω and ${b} Ω are connected in parallel. Calculate the combined resistance.`, (a * b) / (a + b), 'Ω', '1/R = 1/R₁ + 1/R₂', `(${a} × ${b}) ÷ (${a} + ${b})`, 'The combined resistance is less than the smaller resistor.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('4.3', (r) => {
    const V = r.pick([6, 9, 12, 24]), a = r.int(2, 50), b = r.int(2, 50);
    return calc(`A ${V} V battery is connected to ${a} Ω and ${b} Ω resistors in series. Calculate the p.d. across the ${a} Ω resistor.`, (V * a) / (a + b), 'V', 'V = I R, with I = V_total ÷ R_total', `${a} × ${V} ÷ (${a} + ${b})`, 'Find the current first.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),

  // --- 4.5 Transformers -------------------------------------------------------------
  P('4.5', (r) => {
    const Np = r.int(50, 5000), Ns = r.int(10, 5000), Vp = r.pick([12, 230, 400, 11000]);
    if (Np === Ns) return null;
    return calc(`A transformer has ${Np} turns on the primary coil and ${Ns} on the secondary. The input voltage is ${Vp} V. Calculate the output voltage.`, (Vp * Ns) / Np, 'V', 'Vp ÷ Vs = Np ÷ Ns', `${Vp} × ${Ns} ÷ ${Np}`);
  }),
  P('4.5', (r) => {
    const Vp = r.pick([230, 400, 11000]), Ip = r.step(0.1, 10, 0.1), Vs = r.pick([6, 12, 24, 110, 132000]);
    return calc(`An ideal transformer steps ${Vp} V to ${Vs} V. The primary current is ${n(Ip)} A. Calculate the secondary current.`, (Vp * Ip) / Vs, 'A', 'Vp Ip = Vs Is', `${Vp} × ${n(Ip)} ÷ ${Vs}`, 'Power in = power out for an ideal transformer.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),

  // --- 5.2 Half-life ------------------------------------------------------------------
  P('5.2', (r) => {
    const A0 = r.pick([800, 1200, 1600, 2400, 3200, 6400]), hl = r.int(2, 30), k = r.int(1, 4);
    return calc(`A radioactive sample has an activity of ${A0} Bq and a half-life of ${hl} days. What is its activity after ${hl * k} days?`, A0 / Math.pow(2, k), 'Bq', 'activity halves every half-life', `${A0} ÷ 2^${k}`, `${hl * k} days is ${k} half-lives.`);
  }),
  P('5.2', (r) => {
    const A0 = r.pick([640, 960, 1280, 4000]), k = r.int(1, 5), t = r.int(1, 12) * k;
    return calc(`The activity of a sample falls from ${A0} Bq to ${A0 / Math.pow(2, k)} Bq in ${t} hours. Calculate its half-life.`, t / k, 'hours', 'number of half-lives = log₂(start ÷ end)', `${A0} → ${A0 / Math.pow(2, k)} is ${k} halvings in ${t} h`);
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('5.2', (r) => {
    const Z = r.int(84, 94), A = r.int(Z + 120, Z + 150);
    const kind = r.pick(['alpha', 'beta']);
    const [z2, a2] = kind === 'alpha' ? [Z - 2, A - 4] : [Z + 1, A];
    const opts = mcq(r, `proton number ${z2}, nucleon number ${a2}`, [
      `proton number ${Z - 4}, nucleon number ${A - 2}`,
      `proton number ${Z - 1}, nucleon number ${A}`,
      `proton number ${Z + 2}, nucleon number ${A + 4}`,
      `proton number ${Z}, nucleon number ${A - 1}`,
      `proton number ${Z - 2}, nucleon number ${A - 4}`,
      `proton number ${Z + 1}, nucleon number ${A}`,
    ]);
    if (!opts) return null;
    return {
      stem: `A nucleus with proton number ${Z} and nucleon number ${A} emits ${kind === 'alpha' ? 'an alpha' : 'a beta'} particle. What are the proton and nucleon numbers of the new nucleus?`,
      ...opts,
      explanation:
        kind === 'alpha'
          ? 'An alpha particle is 2 protons + 2 neutrons, so the proton number falls by 2 and the nucleon number by 4.'
          : 'In beta decay a neutron becomes a proton and an electron: the proton number rises by 1 and the nucleon number is unchanged.',
    };
  }),

  // --- 1.1 Measurement ------------------------------------------------------------------
  P('1.1', (r) => {
    const count = r.pick([10, 20, 25, 50]), total = r.step(5, 60, 0.1);
    return calc(`A pendulum takes ${n(total)} s to complete ${count} oscillations. Calculate the period.`, total / count, 's', 'period = total time ÷ number of oscillations', `${n(total)} ÷ ${count}`, 'Timing many oscillations reduces the error.');
  }, { difficulty: 'FOUNDATION' }),
  P('1.1', (r) => {
    const sheets = r.pick([100, 200, 250, 500]), t = r.step(1, 6, 0.1);
    return calc(`A stack of ${sheets} sheets of paper is ${n(t)} cm thick. Calculate the thickness of one sheet in mm.`, (t * 10) / sheets, 'mm', 'thickness = total ÷ number', `${n(t)} cm = ${n(t * 10)} mm, ÷ ${sheets}`);
  }),
  P('1.1', (r) => {
    const a = r.int(3, 80), b = r.int(3, 80), ang = r.pick([90]);
    return calc(`Two forces of ${a} N and ${b} N act at ${ang}° to each other. Calculate the size of the resultant force.`, Math.hypot(a, b), 'N', 'resultant² = F₁² + F₂² (forces at right angles)', `√(${a}² + ${b}²)`);
  }, { difficulty: 'CHALLENGE', marks: 3 }),

  // --- 6.1 Space ---------------------------------------------------------------------------
  P('6.1', (r) => {
    const rr = r.step(0.4, 30, 0.1), T = r.step(1, 700, 1);
    return calc(`A moon orbits a planet in a circular orbit of radius ${n(rr)} × 10⁸ m with an orbital period of ${n(T)} hours. Calculate its average orbital speed in m/s.`, (2 * Math.PI * rr * 1e8) / (T * 3600), 'm/s', 'v = 2πr ÷ T', `2π × ${n(rr)} × 10⁸ ÷ (${n(T)} × 3600)`, 'Convert hours to seconds.');
  }, { difficulty: 'CHALLENGE', marks: 3 }),
  P('6.2', (r) => {
    const ly = r.step(1, 200, 1);
    return calc(`A star is ${n(ly)} light-years away. One light-year is 9.5 × 10¹⁵ m. How far is the star in metres?`, ly * 9.5e15, 'm', 'distance = number of light-years × 9.5 × 10¹⁵ m', `${n(ly)} × 9.5 × 10¹⁵`);
  }),
];

/** Numerical multiple choice versions of the quick calculations (for Quick mode and MCQ papers). */
export const physicsMcqTemplates: Template[] = physicsTemplates
  .filter((t) => t.difficulty === 'FOUNDATION')
  .map((t) => ({
    ...t,
    count: 30,
    make: (r: Rng) => {
      const made = t.make(r);
      if (!made || made.options) return made;
      const m = made.answer.match(/^(-?[\d.]+(?: × 10\^-?\d+)?)\s*(.*)$/);
      if (!m) return null;
      const value = Number(m[1].replace(' × 10^', 'e'));
      const opts = mcq(r, made.answer, numericDistractors(value, m[2]));
      if (!opts) return null;
      return { ...made, stem: made.stem, ...opts, type: 'MCQ', marks: 1, markScheme: [`${made.answer} (1)`] };
    },
  }));

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
