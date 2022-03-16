import { Vector } from '../types';

type VectorShape = number | (number | VectorShape)[];

export function getShape(vector: Vector): VectorShape {
    console.log('get shape');
    const containsVectors = vector.values.reduce((acc, value) => acc || value.type === 'vector', false);

    if (!containsVectors) {
        return vector.values.length;
    }

    return vector.values.map((value) => (value.type === 'vector' ? getShape(value) : 1));
}

function compareShapes(shapeA: VectorShape, shapeB: VectorShape): boolean {
    console.log('compare');
    if (typeof shapeA === 'number' && typeof shapeB === 'number') {
        return shapeA === shapeB;
    }

    if (shapeA instanceof Array && shapeB instanceof Array && shapeA.length === shapeB.length) {
        return shapeA.reduce((acc, _, index) => compareShapes(shapeA[index], shapeB[index]) && acc, true);
    }

    return false;
}

export function compareShapesOfVectors(vectorA: Vector, vectorB: Vector): boolean {
    return compareShapes(getShape(vectorA), getShape(vectorB));
}
