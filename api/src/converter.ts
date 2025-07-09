// prettier-ignore
const toRomanGolfed = (n: number): string =>
  ["","M","MM","MMM"][~~(n/1000)] +
  ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"][~~(n%1000/100)] +
  ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"][~~(n%100/10)] +
  ["","I","II","III","IV","V","VI","VII","VIII","IX"][n%10];

/**
 * Convert an Arabic numeral (1-3999) to a Roman numeral.
 * Keeps every step explicit for maximum maintainability.
 */
function toRomanArrayLookup(n: number): string {
  // ---------------- 1. Build lookup tables ----------------
  // prettier-ignore
  const thousands: string[] = ['', 'M', 'MM', 'MMM']; // 0-3000
  // prettier-ignore
  const hundreds:  string[] = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']; // 0-900
  // prettier-ignore
  const tens:      string[] = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']; // 0-90
  // prettier-ignore
  const ones:      string[] = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']; // 0-9

  // ---------------- 2. Slice the number into place values --
  const thouIndex: number = Math.floor(n / 1000); // 0–3
  const hundIndex: number = Math.floor((n % 1000) / 100); // 0–9
  const tensIndex: number = Math.floor((n % 100) / 10); // 0–9
  const onesIndex: number = n % 10; // 0–9

  // ---------------- 3. Map each slice to symbols ----------
  const thouPart: string = thousands[thouIndex];
  const hundPart: string = hundreds[hundIndex];
  const tensPart: string = tens[tensIndex];
  const onesPart: string = ones[onesIndex];

  // ---------------- 4. Concatenate in order ---------------
  const result: string = thouPart + hundPart + tensPart + onesPart;

  // ---------------- 5. Return -----------------------------
  return result;
}

/**
 * Convert 1-3999 to Roman numerals.
 * Uses a compact loop but still adds context for the non-obvious parts.
 */
function toRomanLoop(n: number): string {
  // Ordered pairs from largest to smallest, including subtractives.
  // prettier-ignore
  const map: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100,  'C'], [90,  'XC'], [50,  'L'], [40,  'XL'],
    [10,   'X'], [9,   'IX'], [5,   'V'], [4,   'IV'],
    [1,    'I']
  ];

  let result = "";

  for (const [value, symbol] of map) {
    // Repeat while 'n' is still at least the current place value.
    while (n >= value) {
      result += symbol; // Append the corresponding symbol.
      n -= value; // Reduce the working number.
    }
    // Early exit once we've reduced all the way to zero.
    if (n === 0) break;
  }

  return result;
}

export { toRomanGolfed, toRomanArrayLookup, toRomanLoop };
