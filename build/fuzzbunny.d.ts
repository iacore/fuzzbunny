/**
 * Returns the string parts for highlighting from the matched ranges
 * @example ('my example', [3, 2]) would return ['my ', 'ex', 'ample']
 * @param {string} targetStr - the string that was matched
 * @param {number[]} ranges - [idx1, len1, idx2, len2] matched ranges
 * @returns {string[]} - ['no match', 'match', 'no match', 'match']
 */
declare function highlightsFromRanges(targetStr: any, ranges: any): any[];
/**
 * fuzzyScoreItem is called by fuzzyMatch, it's a slightly lower level call
 * If perf is of importance and you want to avoid lowercase + trim + highlighting on every item
 * Use this and only call highlightsFromRanges for only the items that are displayed
 * @param {string} targetStr - lowercased trimmed target string to search on
 * @param {string} searchStr - lowercased trimmed search string
 * @returns {{score: number, ranges: number[]} | null} - null if no match
 */
declare function fuzzyScoreItem(targetStr: any, searchStr: any): {
    score: number;
    ranges: any[];
};
/**
 * Fuzzy match and return the score, highlights, and lowercased matchStr (for sort)
 * @param {string} targetStr - target to search on / haystack string
 * @param {string} searchStr - search filter / needle string
 * @returns {{score: number, highlights: string[]} | null} - null if no match
 */
declare function fuzzyMatch(targetStr: any, searchStr: any): {
    score: number;
    highlights: any[];
};
/**
 * @template Item
 * @typedef {{item: Item, score: number, highlights: {[K in keyof Item]?: string[]}}} FuzzyFilterResult
 */
/**
 * Searches an array of items on props and returns filtered + sorted array with scores and highlights
 * @template Item
 * @param {Item[]} items
 * @param {string} searchStr
 * @param {{fields: (keyof Item)[]}} options
 * @returns {FuzzyFilterResult<Item>[]}
 */
declare function fuzzyFilter(items: any, searchStr: any, options: any): any[];
/**
 * @private
 */
declare function fuzzyFilterHelper(items: any, searchStr: any, options: any, mergeResult: any): any[];
import { fuzzyFilter1 } from "./fuzzybunny-extra";
export { fuzzyFilter, fuzzyFilter1, fuzzyMatch, fuzzyScoreItem, highlightsFromRanges, fuzzyFilterHelper };
