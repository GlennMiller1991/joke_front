import { Color, IMatrix3d, IPoint3, Point } from "@fbltd/math";
import { getColors, getNormals, getTransformedVertexes, getVertexes, getVertexesQty, IFigure, IRect3, ISurfaceHolder } from "./contracts";
import { Plane } from "./plane";
import { Figure } from "./figure";

export class Cube extends Figure implements ISurfaceHolder {
    declare children: Plane[]

    constructor(color?: Color, parent?: IFigure) {
        super(color, parent)

    }

    get normal() {
        return getNormals(this.children)
    }

    static ofPlanes(planes: Array<Plane>, color?: Color, parent?: IFigure) {
        const cube = new Cube(color, parent)
        cube.children = [
            ...planes
        ]
        planes.forEach((p) => p.parent = cube)
        return cube
    }

    static ofRect(rect: IRect3, color?: Color, parent?: IFigure) {
        const p1 = rect.origin
        const p2 = Point.sum(rect.origin, [rect.width, 0, 0])
        const p3 = Point.sum(rect.origin, [rect.width, 0, rect.depth])
        const p4 = Point.sum(rect.origin, [0, 0, rect.depth])

        let dif: IPoint3 = [0, rect.height, 0]
        const p5 = Point.sum(p1, dif)
        const p6 = Point.sum(p2, dif)
        const p7 = Point.sum(p3, dif)
        const p8 = Point.sum(p4, dif)


        const planes = [
            new Plane(p1, p4, p3, p2, color, parent),
            new Plane(p2, p6, p5, p1, color, parent),
            new Plane(p1, p5, p8, p4, color, parent),
            new Plane(p4, p8, p7, p3, color, parent),
            new Plane(p3, p7, p6, p2, color, parent),
            new Plane(p5, p6, p7, p8, color, parent),
        ]

        return Cube.ofPlanes(planes, undefined, parent)
    }

}