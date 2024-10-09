import { IMatrix3d, IPoint2, IPoint3 } from "@fbltd/math";

export type IMatrixPerspective = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
]

export class SpaceConverter {
    static point2to3(p: IPoint2, z = 0): IPoint3 {
        return [
            ...p,
            z
        ]
    }

    static matrix3toPerspective(m: IMatrix3d): IMatrixPerspective {
        return [
            m[0], m[1], m[2], 0,
            m[3], m[4], m[5], 0,
            m[6], m[7], m[8], 0,
            m[9], m[10], m[11], 1
        ]
    }
}