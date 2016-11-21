const constants = {
	"bond_length": 20,
	"atom_radius": 0.5
}

type point = [number, number]
interface Bond {
	atoms: Set<number>;
	order?: number
}

interface Atom {
	pos: point;
	label?: string
}

interface State extends Fragment {
}

interface Fragment {
	atoms: Map<number, Atom>;
	bonds: Map<number, Bond>
}

interface Template extends Fragment {
	root: { atom: number, bond: number }
}

class Direction {
	readonly x: number;
	readonly y: number;
	constructor(x: number, y: number) {
		let l = len(x, y);
		this.x = x / l;
		this.y = y / l;
	}

}

// Adds atom n to Fragment f, assigning a new atom number to it.
function add_atom<F extends Fragment>(f: F, a: Atom): F {
	let m = max_atom(f);
	f.atoms.set(m == undefined ? 0 : m + 1, a);
	return f;
}

// Adds bond b to Fragment f, assigning a new bond number to it.
function add_bond<F extends Fragment>(f: F, b: Bond): F {
	let m = max_bond(f);
	f.bonds.set(m == undefined ? 0 : m + 1, b);
	return f;
}

// Returns a set containing the numbers of bonds connecting
// atom number n to other atoms.
function connectingBonds(f: Template, n: number): Set<number> {
	let res = new Set<number>();
	for (let [bn, b] of f.bonds.entries()) {
		if (b.atoms.has(n))
			res.add(bn);
	}
	return res
}

// Returns a set containing the numbers of atoms connected to
// atom number n in fragment-like f.
function connectedAtoms(f: Fragment, n: number): Set<number> {
	let res = new Set<number>();
	for (let b of f.bonds.values()) {
		if (b.atoms.has(n)) {
			for (let i of b.atoms)
				res.add(i);
		}
	}
	res.delete(n);
	return res
}

// Removes atom number n from fragment-like f. Returns f.
function deleteAtom<F extends Fragment>(f: F, n: number): F {
	delete f.atoms.get(n);
	return f
}

// Removes bond number b from fragment-like f. Returns f.
function deleteBond<F extends Fragment>(f: F, b: number): F {
	delete f.bonds.get(b);
	return f
}

// Returns the largest bond number in Fragment f, returns undefined
// f.bonds is empty.
function max_bond(f: Fragment): (number | undefined) {
	return f.bonds.size > 0 ? Math.max(...f.bonds.keys()) : undefined;
}

// Returns the largest atom number in Fragment f. 
function max_atom(f: Fragment): (number | undefined) {
	return f.atoms.size > 0 ? Math.max(...f.atoms.keys()) : undefined;
}
