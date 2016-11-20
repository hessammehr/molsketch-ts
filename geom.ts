function len_sq(x: number, y: number): number {
    return x * x + y * y;
}

function len(x: number, y: number): number {
    return Math.sqrt(len_sq(x, y));
}