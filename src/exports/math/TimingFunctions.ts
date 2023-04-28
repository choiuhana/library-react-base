// t ranges 0.0 to 1.0
// returns new_t

export const linear = (t: number): number => {
    return t;
};

export const easeInQuad = (t: number): number => {
    return t * t;
};

export const easeOutQuad = (t: number): number => {
    return t * (2 - t);
};

export const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const easeInCubic = (t: number): number => {
    return t * t * t;
};

export const easeOutCubic = (t: number): number => {
    return --t * t * t + 1;
};

export const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

export const easeInQuart = (t: number): number => {
    return t * t * t * t;
};

export const easeOutQuart = (t: number): number => {
    return 1 - --t * t * t * t;
};

export const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};

export const easeInQuint = (t: number): number => {
    return t * t * t * t * t;
};

export const easeOutQuint = (t: number): number => {
    return 1 + --t * t * t * t * t;
};

export const easeInOutQuint = (t: number): number => {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};
