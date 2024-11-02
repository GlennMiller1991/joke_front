import { Color, IMatrix3d } from "@fbltd/math";
import { getColors, getNormals, getPoints, getTransformedVertexes, getVertexes, getVertexesQty, IFigure } from "./contracts";
import { surfaceNormal } from "../../../app/components/intro/intro.component";

export class Figure implements IFigure {
    children: IFigure[] = []

    constructor(
        public color?: Color,
        public parent?: IFigure
    ) {

    }

    get vertexes() {
        return getVertexes(this.children)
    }

    get colors() {
        if (!this.color) return getColors(this.children)
        let array: number[] = []
        for (let i = 0; i < this.vertexesQty; i++) {
            array.push(this.color.red, this.color.green, this.color.blue)
        }
        return array
    }

    get vertexesQty() {
        return getVertexesQty(this.children)
    }

    get points() {
        return getPoints(this.children)
    }

    transformVertexes(transform: IMatrix3d): IFigure["vertexes"] {
        return getTransformedVertexes(this.children, transform)
    }
}