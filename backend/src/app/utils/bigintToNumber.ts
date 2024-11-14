export const bigintToNumber = (bigNumber: bigint) => {
    if (bigNumber <= Number.MIN_SAFE_INTEGER || bigNumber >= Number.MAX_SAFE_INTEGER) {
        throw Error('Invalid conversion of bigint to number (out of bounds)');
    }
    return Number(bigNumber);
};
