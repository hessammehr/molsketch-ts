import { Point } from "./geometry"
export * from "./geometry"
export type bond = {nodes: Set<number>}
export type node = {pos: Point}
export type state = {nodes: Map<number,node>,
			  bonds: Map<number,bond>}
export type template = {nodes: Map<number,node>,
				 bonds: Map<number,bond>,
				 // The root is the node or bond used
				 // to connect the template to the rest
				 // of the molecule.
				 root: {node: number, bond: number}}

export interface Fragment {
	nodes: Map<number,node>,
	bonds: Map<number,bond>
}

// Removes node number n from fragment-like f. Returns f.
export function deleteNode<F extends Fragment>(f:F, n:number) : F {
	delete f.nodes[n];
	return f
}

// Removes bond number b from fragment-like f. Returns f.
export function deleteBond<F extends Fragment>(f:F, b:number) : F {
	delete f.bonds[b];
	return f
}

// Returns a set containing the numbers of nodes connected to
// node number n in fragment-like f.
export function connectedNodes(f:Fragment, n:number) : Set<number> {
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

// Returns a set containing the numbers of bonds connecting
// node number n to other nodes.
export function connectingBonds(f:Fragment, n:number) : Set<number> {
	let res = new Set<number>();
	for (let [bn, b] of f.bonds.entries()) {
		if (b.nodes.has(n))
			res.add(bn);
	}
	return res
}
