export const lerp = (start: number, end: number, ratio: number): number => {
    return (1 - ratio) * start + ratio * end;
};
