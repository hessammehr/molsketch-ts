const constants = {
	"bond_length": 20,
	"node_radius": 0.5
};

type point = [number, number];
type bond = { nodes: Set<number>, order: number };
type node = { pos: point, label: string };

interface State extends Fragment {
}

interface Fragment {
	nodes: Map<number, node>;
	bonds: Map<number, bond>;
}

interface Template extends Fragment {
	root: { node: number, bond: number };
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

// Adds node n to Fragment f, assigning a new node number to it.
function add_node<F extends Fragment>(f: F, n: node): F {
	let m = max_node(f);
	f.nodes[m == undefined ? 0 : m + 1] = n;
	return f;
}

// Adds bond b to Fragment f, assigning a new bond number to it.
function add_bond<F extends Fragment>(f: F, b: bond): F {
	let m = max_bond(f);
	f.bonds[m == undefined ? 0 : m + 1] = b;
	return f;
}

// Returns a set containing the numbers of bonds connecting
// node number n to other nodes.
function connectingBonds(f: Template, n: number): Set<number> {
	let res = new Set<number>();
	for (let [bn, b] of f.bonds.entries()) {
		if (b.nodes.has(n))
			res.add(bn);
	}
	return res
}

// Returns a set containing the numbers of nodes connected to
// node number n in fragment-like f.
function connectedNodes(f: Fragment, n: number): Set<number> {
	let res = new Set<number>();
	for (let b of f.bonds.values()) {
		if (b.nodes.has(n)) {
			for (let i of b.nodes)
				res.add(i);
		}
	}
	res.delete(n);
	return res
}

// Removes node number n from fragment-like f. Returns f.
function deleteNode<F extends Fragment>(f: F, n: number): F {
	delete f.nodes[n];
	return f
}

// Removes bond number b from fragment-like f. Returns f.
function deleteBond<F extends Fragment>(f: F, b: number): F {
	delete f.bonds[b];
	return f
}

// Returns the largest bond number in Fragment f, returns undefined
// f.bonds is empty.
function max_bond(f: Fragment): (number | undefined) {
	return f.bonds.size > 0 ? Math.max(...f.bonds.keys()) : undefined;
}

// Returns the largest node number in Fragment f. 
function max_node(f: Fragment): (number | undefined) {
	return f.nodes.size > 0 ? Math.max(...f.nodes.keys()) : undefined;
}
