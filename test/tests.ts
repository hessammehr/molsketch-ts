let a: Atom = { pos: [1.0, 2.0] };

// Setup
let s: State = {
	atoms: new Map(),
	bonds: new Map([[1, { atoms: new Set([1, 2]) }],
	[2, { atoms: new Set([1, 3]) }]])
};

console.log("Running tests...");
console.log(max_atom(s));
console.log(add_atom(s, a));
console.log(max_atom(s));
console.log(connectedAtoms(s, 2));