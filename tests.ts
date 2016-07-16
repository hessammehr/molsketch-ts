import { state, Point, connectedNodes } from "./core"

let s : state =
		{nodes: new Map( [[1, {pos: new Point(0.0,0.0)}],
				 		  [2, {pos: new Point(10.0, 10.0)}],
						  [3, {pos: new Point(0.0, 20.0)}]] ),
		 bonds: new Map( [[1, {nodes: new Set([1, 2])}],
						  [2, {nodes: new Set([1, 3])}]] )};

console.log(connectedNodes(s, 2));