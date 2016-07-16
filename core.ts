type point = number[]
type matrix = number[][]
type bond = {nodes: Set<number>}
type node = {pos: point}
type state = {nodes: Map<number,node>,
			  bonds: Map<number,bond>}

interface Fragment {
	nodes: Map<number,node>,
	bonds: Map<number,bond>
}

let state : state = 
		{nodes: new Map( [[1, {pos: [0.0, 0.0]}],
				 		  [2, {pos: [10.0, 10.0]}],
						  [3, {pos: [0.0, 20.0]}]] ),
		 bonds: new Map( [[1, {nodes: new Set([1, 2])}],
						  [2, {nodes: new Set([1, 3])}]] )}

// Removes node number n from fragment-like f. Returns f.
function deleteNode<F extends Fragment>(f:F, n:number) : F {
	delete f.nodes[n];
	return f
}

// Removes bond number b from fragment-like f. Returns f.
function deleteBond<F extends Fragment>(f:F, b:number) : F {
	delete f.bonds[b];
	return f
}

// Returns a set containing the numbers of nodes connected to
// node number n in fragment-like f.
function connectedNodes(f:Fragment, n:number) : Set<number> {
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
function connectingBonds(f:Fragment, n:number) : Set<number> {
	let res = new Set<number>();
	for (let [bn, b] of f.bonds.entries()) {
		if (b.nodes.has(n))
			res.add(bn);
	}
	return res
}

// Returns point p transformed by matrix m.
function transformPoint(p:point, m:matrix) : point {
	return [ p[0]*m[0][0]+p[1]*m[0][1], p[0]*m[1][0]+p[1]*m[1][1] ]
}