"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzyFilter1 = void 0;
const fuzzbunny_1 = require("./fuzzbunny");
function highlightsFromRanges(targetStr, ranges) {
    const highlights = [];
    let lastIndex = 0;
    let rangesIdx = 0;
    for (; rangesIdx < ranges.length; rangesIdx += 2) {
        const startIndex = ranges[rangesIdx];
        const endIndex = startIndex + ranges[rangesIdx + 1];
        highlights.push({ start: startIndex, end: endIndex });
    }
    return highlights;
}
/**
 * Filter elements and return with individual score for each field.
 */
function fuzzyFilter1(items, searchStr, options) {
    return (0, fuzzbunny_1.fuzzyFilterHelper)(items, searchStr, options, (result, item, field, match) => {
        const value = item[field];
        result = result || { item, scores: {}, highlights: {} };
        result.scores[field] = match.score;
        result.highlights[field] = highlightsFromRanges(searchStr, match.ranges);
        return result;
    });
}
exports.fuzzyFilter1 = fuzzyFilter1;
