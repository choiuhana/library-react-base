interface ObjectKeysArgs {
    data: Record<string, any>;
    onFoundKey: (key: string, data: any) => void;
    onCreateKey?: (key: string, parentKey?: string | null) => string;
    checkIteratable?: (data: any) => boolean;
    parentKey?: string; // 재귀시에 사용됨
}

export const objectKeys = ({ data, onFoundKey, onCreateKey, checkIteratable, parentKey }: ObjectKeysArgs): void => {
    const canIteratable: boolean = checkIteratable ? checkIteratable(data) : typeof data === "object";
    if (canIteratable) {
        Object.keys(data).forEach((key) => {
            const createdKey = onCreateKey ? onCreateKey(key, parentKey) : parentKey ? `${parentKey}.${key}` : key;
            objectKeys({
                data: data[key],
                onFoundKey,
                onCreateKey,
                checkIteratable,
                parentKey: createdKey,
            });
        });
    } else {
        onFoundKey && onFoundKey(parentKey!, data);
    }
};

export const sleep = (ms: number): Promise<number> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * @param from
 * @param to
 * @param isDecimal default false
 */
export const randomRange = (from: number, to: number, isDecimal?: boolean): number => {
    if (isDecimal) {
        return Math.random() * (to - from) + from;
    } else {
        from = Math.ceil(from);
        to = Math.floor(to);
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }
};

export const arrayInsertAt = <T = any>(array: Array<T>, index: number, item: T): void => {
    array.splice(index, 0, item);
};

/**
 * @param flag
 * @param a
 * @param b default null
 */
export const select = <T = any>(flag: boolean, a: T, b?: T): T | undefined => {
    return flag ? a : b;
};

/**
 * @param flag
 * @param a
 * @param b default null
 */
export const selectf = <T = any>(flag: boolean, a: () => T, b?: () => T): T | undefined => {
    return flag ? a && a() : b && b();
};

export const hash = (object: any): string | null => {
    let hashValue: string | null = null;
    if (typeof object === "object") {
        if (Array.isArray(object)) {
            hashValue = "";
            object.forEach((elem) => {
                hashValue = hashValue! + hash(elem);
            });
        } else {
            hashValue = JSON.stringify(object.valueOf());
        }
    } else if (typeof object === "function") {
        hashValue = object.toLocaleString();
    } else {
        hashValue = object.toString();
    }
    return hashValue;
};
