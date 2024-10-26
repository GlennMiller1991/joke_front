import { Color, IMatrix3d, Point } from "@fbltd/math";
import { getColors, getTransformedVertexes, getVertexes, getVertexesQty, IFigure, IRect3 } from "./contracts";
import { Plane } from "./plane";

export class Cube implements IFigure {
    planes: Plane[] = []

    constructor(rect: IRect3, color?: Color) {
        this.planes.push(
            new Plane(rect.origin, Point.sum(rect.origin, [rect.width, 0, 0]), Point.sum(rect.origin, [rect.width, 0, rect.depth]), Point.sum(rect.origin, [0, 0, rect.depth])),
            new Plane(rect.origin, Point.sum(rect.origin, [rect.width, 0, 0]), Point.sum(rect.origin, [rect.width, 0, rect.depth]), Point.sum(rect.origin, [0, 0, rect.depth])),
        )
    }

    get vertexes() {
        return getVertexes(this.planes)
    }

    get colors() {
        return getColors(this.planes)
    }

    get vertexesQty() {
        return getVertexesQty(this.planes)
    }

    transformVertexes(transform: IMatrix3d): IFigure["vertexes"] {
       return getTransformedVertexes(this.planes, transform) 
    }


}