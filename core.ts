const constants = {
	"bond_length": 20,
	"node_radius": 0.5
};

type point = [number, number];
type bond = { nodes: Set<number> };
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

function add_node<F extends Fragment>(f: F, n: node): F {
	f.nodes[max_node(f) + 1] = n;
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

function max_node(f: Fragment): number {
	return Math.max(...f.nodes.keys());
}
