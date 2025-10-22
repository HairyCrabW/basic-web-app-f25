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

  // Math operations - template-based dynamic calculation
  const mathMatch = query.match(/what is (\d+)\s*(plus|\+|minus|-|multiplied by|\*|times|divided by|\/)\s*(\d+)/i);
  if (mathMatch) {
    const num1 = parseInt(mathMatch[1]);
    const operator = mathMatch[2].toLowerCase();
    const num2 = parseInt(mathMatch[3]);
    let result = 0;

    if (operator === "plus" || operator === "+") {
      result = num1 + num2;
    } else if (operator === "minus" || operator === "-") {
      result = num1 - num2;
    } else if (operator === "multiplied by" || operator === "*" || operator === "times") {
      result = num1 * num2;
    } else if (operator === "divided by" || operator === "/") {
      result = num1 / num2;
    }

    return result.toString();
  }

  // China capital question
  if ((query.toLowerCase().includes("china") || query.toLowerCase().includes("中国")) &&
      (query.toLowerCase().includes("capital") || query.toLowerCase().includes("首都"))) {
    return "Beijing";
  }

  return "";
}
