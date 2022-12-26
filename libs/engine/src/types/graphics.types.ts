import { GraphicNode } from './nodes.types';

export type Point2D = [x: number, y: number];
export type Line2D = {
    type: 'line';
    points: Point2D[];
};

export interface Cartesian2DGraphic extends GraphicNode {
    graphicType: 'cartesian2DGraphic';
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    xTicks: number;
    yTicks: number;
    lines: Line2D[];
}
