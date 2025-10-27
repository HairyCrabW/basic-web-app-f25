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
