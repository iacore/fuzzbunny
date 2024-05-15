import {fuzzyFilterHelper, fuzzyScoreItem} from "./fuzzbunny.js"

export type FuzzyFilterResult1<Item> = {
    item: Item;
    scores: { [K in keyof Item]?: number; };
    highlights: { [K in keyof Item]?: TextRange[]; };
};

export type TextRange = {
    start: number,
    end: number,
}

function highlightsFromRanges(targetStr: string, ranges: number[]): TextRange[] {
    const highlights = [];
    let lastIndex = 0;
    let rangesIdx = 0;
  
    for (; rangesIdx < ranges.length; rangesIdx += 2) {
      const startIndex = ranges[rangesIdx];
      const endIndex = startIndex + ranges[rangesIdx + 1];
      highlights.push({ start: startIndex, end: endIndex})
    }
  
    return highlights;
  }

/**
 * Filter elements and return with individual score for each field.
 */
 export function fuzzyFilter1<Item>(items: Item[], searchStr: string, options: {
    fields: (keyof Item)[];
}): FuzzyFilterResult1<Item>[] {
  const searchStrLowerCased = (searchStr || ``).trim().toLowerCase();
  
  return fuzzyFilterHelper(items, searchStr, options, (result: null | FuzzyFilterResult1<Item>, item: Item, field: keyof Item): null | FuzzyFilterResult1<Item> => {
    const value = String(item[field])
    if (!value) return result
    const match = fuzzyScoreItem(value, searchStrLowerCased);
    if (!match) return result

    result = result || {item, scores: {}, highlights: {}};
    result.scores[field] = match.score;
    result.highlights[field] = highlightsFromRanges(searchStr, match.ranges)
    return result;
  });
}
