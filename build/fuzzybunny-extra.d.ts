export declare type FuzzyFilterResult1<Item> = {
    item: Item;
    scores: {
        [K in keyof Item]?: number;
    };
    highlights: {
        [K in keyof Item]?: TextRange[];
    };
};
export declare type TextRange = {
    start: number;
    end: number;
};
/**
 * Filter elements and return with individual score for each field.
 */
export declare function fuzzyFilter1<Item>(items: Item[], searchStr: string, options: {
    fields: (keyof Item)[];
}): FuzzyFilterResult1<Item>[];
