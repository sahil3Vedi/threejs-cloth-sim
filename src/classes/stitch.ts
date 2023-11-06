import type { Edge } from "./edge";

export class Stitch {
    edgeA: Edge;
    edgeB: Edge;

    constructor(edgeA: Edge, edgeB: Edge){
        this.edgeA = edgeA;
        this.edgeB = edgeB;
    }
}