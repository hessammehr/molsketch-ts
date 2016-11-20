class Direction {
    constructor(x, y) {
        let l = len(x, y);
        this.x = x / l;
        this.y = y / l;
    }
}
function connectingBonds(f, n) {
    let res = new Set();
    for (let [bn, b] of f.bonds.entries()) {
        if (b.nodes.has(n))
            res.add(bn);
    }
    return res;
}
function connectedNodes(f, n) {
    let res = new Set();
    for (let b of f.bonds.values()) {
        if (b.nodes.has(n)) {
            for (let i of b.nodes)
                res.add(i);
        }
    }
    res.delete(n);
    return res;
}
function deleteNode(f, n) {
    delete f.nodes[n];
    return f;
}
function deleteBond(f, b) {
    delete f.bonds[b];
    return f;
}
function len_sq(x, y) {
    return x * x + y * y;
}
function len(x, y) {
    return Math.sqrt(len_sq(x, y));
}
//# sourceMappingURL=molsketch.js.map