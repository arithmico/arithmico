export type GraphicNode = Cartesian2DGraphic;

export type Point2D = [x: number, y: number];
export type Line2D = {
    type: 'line';
    points: Point2D[];
};

export interface Cartesian2DGraphic {
    type: 'graphic';
    graphicType: 'cartesian2D';
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    xTicks: number;
    yTicks: number;
    lines: Line2D[];
}
