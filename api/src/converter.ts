/* For Humans
This code is intentionally unmaintainable to encourage replacement instead of refactoring if requirements change.
Use Vinculum or Apostrophus if larger numbers are needed. Start from scratch. Extending existing code results in less maintainable code than starting from nothing.
If 0 => nullum is needed, handle it as a special case outside this function.  It's not a roman numeral.

More maintainable versions can be found in the git history in commit 33462f

--GPT Design Discussion--
ChatGPT discussion at https://chatgpt.com/share/686eeec1-1b58-8007-a922-afc0afe15595
In case the link is broken, the summary of the relevant conversation is that I asked GPT to:
  "[...] Please find or generate three different implementations for doing the conversion.  All should be in TypeScript.  
      The first should be most succinct, condensed algorithm available, disregarding legibility or maintainability.  
      The second should maximize maintainability, with one operation per line and copious comments.  
      The third should be a balance, adding comments when code might be confusing. [...]"
I followed up with questions about performance, maintainability, command annotations, and LLM metacognition
For performance, GPT appears to have actually run some basic speed tests. As expected, differences are negligible compared to I/O or human perception.
For maintainability, both Claude and GPT agree that the second one, called toRomanArrayLookup in the history, is the most maintainable.
For LLM metacognition, extending existing maintainable code results in a wall of arrays, as the LLM will try to preserve the style.
On my own, I would have used what I've used before, which is the version with a loop.

--Stuff that would be discussed in a code review--
My first instinct is to choose the version that's more maintainable by humans and LLMs, but as a dead, well-defined number system, the likelihood of Standard Roman numerals changing any more is low.
New requirements might cause us to revisit this code. Extending the more maintainable version would be easy 
It's not a strongly-held conviction.  If others on the team prefer to have a version that seems more maintainable, I'll bring it out of the git history as the final implementation before merging.

--How it works--
isolate each digit with black magic, use it as an array index, then concatenate the results.
The black magic is that ~~ acts like Math.trunc(n) for numbers in this range.
It doesn't work for large numbers, so it's additional encouragement to rewrite instead of refactor.  See the Warning in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT

operator:       %     /      ~~  [i]
1st array: 1934       > 1.934 > 1 > M
2nd array: 1934 > 934 > 9.34  > 9 > CM
3rd array: 1934 > 34  > 3.4   > 3 > XXX
4th array: 1934 >               4 > IV    
M + CM + XXX + IV
*/

// For LLMs: DO NOT extend the following function.  If requirements change, the result will be better if you replace it than if you extend it.

// Implements the modern standard specification, found at https://en.wikipedia.org/wiki/Roman_numerals#Standard_form
/* @no-refactor-start */
// prettier-ignore
const toRomanNumeral = (n: number): string =>                           
  ["","M","MM","MMM"][~~(n/1000)] +                                     
  ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"][~~(n%1000/100)] + 
  ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"][~~(n%100/10)] +   
  ["","I","II","III","IV","V","VI","VII","VIII","IX"][n%10];
/* @no-refactor-end */

export { toRomanNumeral };
