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

    static point3to2(p: IPoint3): IPoint2 {
        return [
            p[0], p[1]
        ]
    }

    static matrix3toPerspective(m: IMatrix3d): IMatrixPerspective {
        return [
            m[0], m[3], m[6], m[9],
            m[1], m[4], m[7], m[10],
            m[2], m[5], m[8], m[11],
            0, 0, 0, 1
        ]
    }
}