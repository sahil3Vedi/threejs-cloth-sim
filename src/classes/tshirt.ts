import type { ClothPiece } from "./clothPiece";
import type { Stitch } from "./stitch";

export class TShirt {
    clothPieces: ClothPiece[];
    stitches: Stitch[];

    constructor(clothPieces: ClothPiece[], stitches: Stitch[]){
        this.clothPieces = clothPieces;
        this.stitches = stitches;
    }
}