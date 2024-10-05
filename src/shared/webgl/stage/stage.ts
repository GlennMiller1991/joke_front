import { StageGroup } from './stage-group';

export class Stage {
  figures: StageGroup[] = []

  addObject(figure: typeof this.figures[0]) {
    this.figures.push(figure)
  }

  get vertexes() {
    return this.figures.reduce((acc, child) => {
      acc.push(...child.figure.vertexes)
      return acc
    }, [] as number[])
  }

  get colors() {
    return this.figures.reduce((acc, child) => {
      acc.push(...child.figure.colors)
      return acc
    }, [] as number[])
  }

  get vertexesQty() {
    return this.figures.reduce((acc, child) => {
      return acc + child.figure.vertexesQty
    }, 0)
  }

}
