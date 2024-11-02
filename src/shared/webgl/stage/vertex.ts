import { Color, IPoint3, IMatrix3d, Matrix3d } from "@fbltd/math";
import { IFigure } from "./contracts";


export class Vertex implements IFigure {
    constructor(private point: IPoint3, public color?: Color, public parent?: IFigure) {
    }

    get points() {
        return [this.point]
    }


    get colors() {
        if (!this.color) return []
        return [
            this.color.red, this.color.green, this.color.blue
        ];
    }

    get normal() {
        return this.point
    }

    get vertexes() {
        return [
            ...this.point
        ];
    }

    vertexesQty = 1

    transformVertexes(transform: IMatrix3d): IFigure['vertexes'] {
        return [
            ...Matrix3d.apply(transform, this.point)
        ];
    }
}
