import * as c from "./core.js"

let s : c.state =
		{nodes: new Map( [[1, {pos: [0.0, 0.0]}],
				 		  [2, {pos: [10.0, 10.0]}],
						  [3, {pos: [0.0, 20.0]}]] ),
		 bonds: new Map( [[1, {nodes: new Set([1, 2])}],
						  [2, {nodes: new Set([1, 3])}]] )};

console.log(c.connectedNodes(s, 2));