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

  // Math operations - template-based dynamic calculation
  const numMatch = query.match(/(\d+)/g);
  if (numMatch && numMatch.length >= 2) {
    const num1 = parseInt(numMatch[0]);
    const num2 = parseInt(numMatch[1]);

    if (query.includes("+") || query.toLowerCase().includes("plus")) {
      return (num1 + num2).toString();
    } else if (query.includes("-") || query.toLowerCase().includes("minus")) {
      return (num1 - num2).toString();
    } else if (query.includes("*") || query.toLowerCase().includes("multiplied") || query.toLowerCase().includes("times")) {
      return (num1 * num2).toString();
    } else if (query.includes("/") || query.toLowerCase().includes("divided")) {
      return (num1 / num2).toString();
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
