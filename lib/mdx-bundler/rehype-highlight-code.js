// https://ped.ro/blog/code-blocks-but-better

import { visit } from "unist-util-visit";
import { refractor } from "refractor";
import rangeParser from "parse-numeric-range";
import { toString } from "hast-util-to-string";
import { highlightLine } from "./rehype-highlight-line";
import { highlightWord } from "./rehype-highlight-word";
import jsx from "refractor/lang/jsx";
import tsx from "refractor/lang/tsx";
refractor.register(jsx);
refractor.register(tsx);

export const rehypeHighlightCode = (options = {}) => {
  return (tree) => {
    visit(tree, "element", visitor);
  };

  function visitor(node, index, parent) {
    if (
      !parent ||
      parent.tagName !== "pre" ||
      node.tagName !== "code" ||
      !node.properties.className
    ) {
      return;
    }

    const [_, lang] = node.properties.className[0].split("-");
    const codeString = toString(node);

    let result = refractor.highlight(codeString, lang).children;

    const linesToHighlight = rangeParser(node.properties.line || "0");

    result = highlightLine(result, linesToHighlight);

    result = highlightWord(result);
    node.children = result;
  }
};
