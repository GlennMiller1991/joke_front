import { IPoint2, IPoint3 } from "@fbltd/math";

export class SpaceConverter {
    static point2to3(p: IPoint2, z = 0): IPoint3 {
        return [
            ...p,
            z
        ]
    }
}