export function copyScrollOffsets(source: HTMLElement, clone: HTMLElement): void {
  const sourceNodes = [source, ...Array.from(source.querySelectorAll<HTMLElement>("*"))];
  const cloneNodes = [clone, ...Array.from(clone.querySelectorAll<HTMLElement>("*"))];
  sourceNodes.forEach((node, index) => {
    const target = cloneNodes[index];
    if (target && (node.scrollLeft || node.scrollTop)) {
      target.scrollLeft = node.scrollLeft;
      target.scrollTop = node.scrollTop;
    }
  });
}

export function elementByTransitionId(root: ParentNode, id: string): HTMLElement | null {
  const node = root.querySelector(`[data-transition-id="${CSS.escape(id)}"]`);
  return node instanceof HTMLElement ? node : null;
}
