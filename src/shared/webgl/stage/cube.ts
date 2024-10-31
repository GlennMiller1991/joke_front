import { Color, IMatrix3d, IPoint3, Point } from "@fbltd/math";
import { getColors, getTransformedVertexes, getVertexes, getVertexesQty, IFigure, IRect3 } from "./contracts";
import { Plane } from "./plane";

export class Cube implements IFigure {
    planes: Plane[] = []

    constructor(rect: IRect3, color?: Color) {
        const p1 = rect.origin
        const p2 = Point.sum(rect.origin, [rect.width, 0, 0])
        const p3 = Point.sum(rect.origin, [rect.width, 0, rect.depth])
        const p4 = Point.sum(rect.origin, [0, 0, rect.depth])

        let dif: IPoint3 = [0, rect.height, 0]
        const p5 = Point.sum(p1, dif)
        const p6 = Point.sum(p2, dif)
        const p7 = Point.sum(p3, dif)
        const p8 = Point.sum(p4, dif)


        this.planes.push(
            new Plane(p1, p2, p4, p3, color),
            new Plane(p5, p6, p8, p7, color),
            new Plane(p1, p5,  p4, p8, color),
            new Plane(p3, p7,  p2, p6, color),
            new Plane(p1, p2,  p5, p6, color),
            new Plane(p3, p4,  p7, p8, color),
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