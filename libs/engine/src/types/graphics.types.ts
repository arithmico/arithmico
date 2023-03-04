export type GraphicNode = Cartesian2DGraphic;

export type Point2D = { x: number; y: number };
export type Line2D = {
    type: 'line';
    points: Point2D[];
};

export type Limits = {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
};

export interface Cartesian2DGraphic {
    type: 'graphic';
    graphicType: 'cartesian2D';
    limits: Limits;
    xTicks: number | 'auto';
    yTicks: number | 'auto';
    lines: Line2D[];
}
