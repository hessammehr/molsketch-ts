type bond = {nodes: Set<number>};
type node = {pos: number[]};
type state = {nodes: Map<number,node>,
			  bonds: Map<number,bond>};

let state : state = 
		{nodes: new Map( [[1, {pos: [0.0, 0.0]}],
				 		  [2, {pos: [10.0, 10.0]}],
						  [3, {pos: [0.0, 20.0]}]] ),
		 bonds: new Map( [[1, {nodes: new Set([1, 2])}],
						  [2, {nodes: new Set([1, 3])}]] )};


function deleteNode(s:state, n:number) : void {
	delete state.nodes[n];
}

function deleteBond(s:state, b:number) : void {
	delete state.bonds[b];
}

// Returns an array of nodes connected to node #n
function connectedNodes(s: state, n:number) : node[] {
	let res = [];
	for (let b of state.bonds.values()) {
		if (b.nodes.has(n)) {
			for (let i of b.nodes)
				if (i !== n)
					res.push(i);
		}
	}
	return res;
}

console.log("Hello");