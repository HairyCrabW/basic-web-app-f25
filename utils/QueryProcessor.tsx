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

  if (query.toLowerCase().includes("date")) {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  if (query.toLowerCase().includes("time")) {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  // Math operations - use eval for complex expressions
  if (query.includes("+") || query.includes("-") || query.includes("*") || query.includes("/") ||
      query.toLowerCase().includes("plus") || query.toLowerCase().includes("minus") ||
      query.toLowerCase().includes("multiplied") || query.toLowerCase().includes("times") ||
      query.toLowerCase().includes("divided")) {
    const mathExpr = query.match(/[\d+\-*/().\s]+/);
    if (mathExpr) {
      try {
        const result = eval(mathExpr[0]);
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
