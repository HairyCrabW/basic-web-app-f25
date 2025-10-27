export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Harry";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  if (query.toLowerCase().includes("andrew") && query.toLowerCase().includes("id")) {
    return "hangyiw";
  }

  if (query.toLowerCase().includes("earth") && query.toLowerCase().includes("shape")) {
    return "spherical";
  }

  // Check time before math operations to avoid conflict with "times"
  if (query.toLowerCase().includes("time") && !query.toLowerCase().includes("times")) {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  if (query.toLowerCase().includes("date")) {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Find largest number
  if (query.toLowerCase().includes("largest")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const max = Math.max(...numbers.map(n => parseInt(n)));
      return max.toString();
    }
  }

  // Find number that is both square and cube
  if (query.toLowerCase().includes("square") && query.toLowerCase().includes("cube")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      for (const numStr of numbers) {
        const num = parseInt(numStr);
        const sixthRoot = Math.round(Math.pow(num, 1/6));
        if (Math.pow(sixthRoot, 6) === num) {
          return num.toString();
        }
      }
    }
  }

  // Find prime numbers
  if (query.toLowerCase().includes("prime")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const isPrime = (n: number) => {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
          if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
      };
      const primes = numbers.filter(numStr => isPrime(parseInt(numStr))).map(n => parseInt(n));
      if (primes.length > 0) {
        return primes.join(', ');
      }
    }
  }

  // Scrabble score calculator
  if (query.toLowerCase().includes("scrabble")) {
    const scrabbleScores: { [key: string]: number } = {
      'a': 1, 'e': 1, 'i': 1, 'o': 1, 'u': 1, 'l': 1, 'n': 1, 's': 1, 't': 1, 'r': 1,
      'd': 2, 'g': 2,
      'b': 3, 'c': 3, 'm': 3, 'p': 3,
      'f': 4, 'h': 4, 'v': 4, 'w': 4, 'y': 4,
      'k': 5,
      'j': 8, 'x': 8,
      'q': 10, 'z': 10
    };
    const wordMatch = query.match(/(?:score of|scrabble)\s+([a-z]+)/i);
    if (wordMatch) {
      const word = wordMatch[1].toLowerCase();
      const score = word.split('').reduce((sum, letter) => sum + (scrabbleScores[letter] || 0), 0);
      return score.toString();
    }
  }

  // Anagram checker
  if (query.toLowerCase().includes("anagram")) {
    const words = query.match(/\b[a-z]+\b/gi);
    if (words && words.length > 1) {
      const sortWord = (word: string) => word.toLowerCase().split('').sort().join('');
      const target = words.find(w => w.toLowerCase() !== 'anagram' && w.toLowerCase() !== 'of' && w.toLowerCase() !== 'the' &&
                                    w.toLowerCase() !== 'following' && w.toLowerCase() !== 'is' && w.toLowerCase() !== 'which' &&
                                    w.toLowerCase() !== 'a' && w.toLowerCase() !== 'an');
      if (target) {
        const targetSorted = sortWord(target);
        for (const word of words) {
          if (word.toLowerCase() !== target.toLowerCase() &&
              sortWord(word) === targetSorted &&
              word.toLowerCase() !== 'anagram' && word.toLowerCase() !== 'of' && word.toLowerCase() !== 'the' &&
              word.toLowerCase() !== 'following' && word.toLowerCase() !== 'is' && word.toLowerCase() !== 'which') {
            return word;
          }
        }
      }
    }
  }

  // Power operation
  if (query.toLowerCase().includes("power")) {
    const powerMatch = query.match(/(\d+)\s*(?:to the power of|power)\s*(\d+)/i);
    if (powerMatch) {
      const base = parseInt(powerMatch[1]);
      const exponent = parseInt(powerMatch[2]);
      const result = Math.pow(base, exponent);
      // Return as is - scientific notation if too large
      return result.toString();
    }
  }

  // Math operations - use eval for complex expressions
  if (query.includes("+") || query.includes("-") || query.includes("*") || query.includes("/") ||
      query.toLowerCase().includes("plus") || query.toLowerCase().includes("minus") ||
      query.toLowerCase().includes("multiplied") || query.toLowerCase().includes("times") ||
      query.toLowerCase().includes("divided")) {
    let mathQuery = query.toLowerCase()
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/times/g, "*")
      .replace(/multiplied by/g, "*")
      .replace(/divided by/g, "/");
    const mathExpr = mathQuery.match(/[\d\.\+\-\*\/\(\)\s]+/g);
    if (mathExpr) {
      try {
        const result = eval(mathExpr.join(''));
        return result.toString();
      } catch (e) {
        // If eval fails, return empty
      }
    }
  }

  // China capital question
  if (query.toLowerCase().includes("china") && query.toLowerCase().includes("capital")) {
    return "Beijing";
  }

  // USA capital question
  if ((query.toLowerCase().includes("us") || query.toLowerCase().includes("usa") || query.toLowerCase().includes("america") || query.toLowerCase().includes("united states")) &&
      query.toLowerCase().includes("capital")) {
    return "Washington, D.C.";
  }

  return "";
}
