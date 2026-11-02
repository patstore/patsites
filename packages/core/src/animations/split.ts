export function splitChars(element: HTMLElement, text: string): HTMLElement[] {
  element.textContent = "";
  const chars: HTMLElement[] = [];
  for (const char of text) {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    element.appendChild(span);
    chars.push(span);
  }
  return chars;
}

export function splitLines(element: HTMLElement, text: string): HTMLElement[] {
  element.textContent = "";
  const words = text.split(/(\s+)/).filter((part) => part.length > 0);
  const wordNodes: HTMLSpanElement[] = [];
  for (const word of words) {
    const span = document.createElement("span");
    span.textContent = word;
    span.style.display = "inline-block";
    element.appendChild(span);
    if (word.trim()) {
      wordNodes.push(span);
    }
  }

  const groups: HTMLSpanElement[][] = [];
  let currentTop: number | null = null;
  let current: HTMLSpanElement[] = [];
  for (const node of wordNodes) {
    const top = node.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) < 2) {
      current.push(node);
      currentTop = top;
    } else {
      groups.push(current);
      current = [node];
      currentTop = top;
    }
  }
  if (current.length > 0) {
    groups.push(current);
  }

  const lines: HTMLElement[] = [];
  for (const group of groups) {
    const mask = document.createElement("span");
    mask.style.display = "block";
    mask.style.overflow = "hidden";
    const line = document.createElement("span");
    line.style.display = "block";
    const first = group[0];
    if (!first) {
      continue;
    }
    element.insertBefore(mask, first);
    for (const node of group) {
      line.appendChild(node);
    }
    mask.appendChild(line);
    lines.push(line);
  }

  return lines;
}
