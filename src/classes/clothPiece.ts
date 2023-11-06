import type { Edge } from "./edge";
import type { ClothMaterial } from "./clothMaterial";

export class ClothPiece {
    edges: Edge[];
    material: ClothMaterial;

    constructor(edges: Edge[], material: ClothMaterial){
        this.edges = edges;
        this.material = material;
    }
}