import { ShapeCollection } from '../shapes/engine.shape-collection';
import { Vector } from '../vector/engine.vector';

export class RigidShape {
    public fix: number;

    constructor(public center: any, public angle: any, public shapeCollection: ShapeCollection) {
        this.shapeCollection = shapeCollection;
        this.shapeCollection.collection.push(this);
    }

    public move(v: Vector) {
        // override
    }

    public render(context: CanvasRenderingContext2D) {
        // override;
    }

    public rotate (angle: number) {
        // override;
    }

    public update(context: CanvasRenderingContext2D) {
        if (this.center.y < this.shapeCollection.canvas.height && this.fix !== 0) {
            this.move(new Vector(0, 1));
        }
    }
}
