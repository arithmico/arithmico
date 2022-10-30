import createNumberNode from '../create/create-number-node';
import createVector from '../create/create-vector';
import { SyntaxTreeNode, Vector } from '../types/SyntaxTreeNodes';

type VectorShape = number | (number | VectorShape)[];

export function getShape(vector: Vector): VectorShape {
    const containsVectors = vector.values.reduce((acc, value) => acc || value.type === 'vector', false);

    if (!containsVectors) {
        return vector.values.length;
    }

    return vector.values.map((value) => (value.type === 'vector' ? getShape(value) : 1));
}

function compareShapes(shapeA: VectorShape, shapeB: VectorShape): boolean {
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

function isShapeHomogeneous(shape: VectorShape): boolean {
    if (typeof shape === 'number') {
        return true;
    }

    const childShapesHomogeneous = shape.every(isShapeHomogeneous);
    if (!childShapesHomogeneous) {
        return false;
    }

    for (let i = 1; i < shape.length; i++) {
        if (!compareShapes(shape[i], shape[0])) {
            return false;
        }
    }

    return true;
}

function getShapeRank(shape: VectorShape): number {
    if (typeof shape === 'number') {
        return 1;
    }

    return getShapeRank(shape[0]) + 1;
}

export function isVectorHomogeneous(vector: Vector): boolean {
    return isShapeHomogeneous(getShape(vector));
}

export function getTensorRank(vector: Vector): number {
    const shape = getShape(vector);

    if (!isShapeHomogeneous(shape)) {
        throw `TypeError: can not get rank of inhomogeneous vector`;
    }

    return getShapeRank(shape);
}

function getShapeDimensions(shape: VectorShape): number[] {
    if (typeof shape === 'number') {
        return [shape];
    }

    return [shape.length, ...getShapeDimensions(shape[0])];
}

export function getTensorDimensions(vector: Vector): number[] {
    const shape = getShape(vector);

    if (!isShapeHomogeneous(shape)) {
        throw `TypeError: can not get dimensions of inhomogeneous vector`;
    }

    return getShapeDimensions(shape);
}

export function getTensorElement(vector: Vector, index: number[]): SyntaxTreeNode {
    if (index.length === 0) {
        throw 'RuntimeError: empty vector index';
    }

    if (vector.values.length <= index[0]) {
        throw `RuntimeError: vector index out of bounds`;
    }

    if (index.length === 1) {
        return vector.values[index[0]];
    } else {
        const value = vector.values[index[0]];
        if (value.type !== 'vector') {
            throw 'RuntimeError: incompatible vector index';
        }
        return getTensorElement(value, index.slice(1));
    }
}

export function isSquareMatrix(matrix: Vector) {
    if (!isVectorHomogeneous(matrix)) {
        return false;
    }

    const dimensions = getTensorDimensions(matrix);
    if (dimensions.length !== 2) {
        return false;
    }

    return dimensions[0] === dimensions[1];
}

export function isEveryElementNumber(tensor: Vector): boolean {
    return tensor.values.every((element) => {
        if (element.type === 'number') {
            return true;
        } else if (element.type === 'vector') {
            return isEveryElementNumber(element);
        }
        return false;
    });
}

export function createIdentityMatrix(size: number): Vector {
    return createVector(
        new Array(size)
            .fill(0)
            .map((_, rowIndex) =>
                createVector(
                    new Array(size)
                        .fill(0)
                        .map((_, columnIndex) =>
                            rowIndex === columnIndex ? createNumberNode(1) : createNumberNode(0),
                        ),
                ),
            ),
    );
}
