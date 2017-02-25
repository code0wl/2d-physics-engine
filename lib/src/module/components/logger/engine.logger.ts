import { ShapeCollection } from '../shapes/engine.shape-collection';
declare const console: any;

export class Logger {

    private lagTime: number = 0;
    private shapeCollection: ShapeCollection;
    private color: string;

    constructor(shapeCollection) {
        this.shapeCollection = shapeCollection;
        console.info('logging performance');
        const ui = document.createElement('div');
        ui.classList.add('uiEchoString');
        ui.style.zIndex = '1';
        ui.style.position = 'absolute';
        ui.style.top = '0';
        ui.style.right = '0';
        document.body.appendChild(ui);
    }

    public logStats(): void {
        // move ugly pseudo code to logger
        if (this.shapeCollection.collection.length) {
            document.querySelector('.uiEchoString').innerHTML = `
            <p><b>Selected Object:</b></p>
            <p style="color: ${this.color}">Missed rendering frames meter: ${this.lagTime}</p>
            <ul> 
            <li>Id: ${this.shapeCollection.selectedObject} </li>
            <li>
                Center: ${this.shapeCollection.collection[this.shapeCollection.selectedObject].center.x.toPrecision(3)},
                ${this.shapeCollection.collection[this.shapeCollection.selectedObject].center.y.toPrecision(3)}
            </li>
            <li>Angle:  ${this.shapeCollection.collection[this.shapeCollection.selectedObject].angle.toPrecision(3)} </li>
            </ul> 
            <hr>
            <p><b>Control</b>: of selected object</p>
            <ul>
            <li><b>Arrow keys</b> <b>QE</b>: Position [Move + Rotate]</li>
            <li>
                <b>Num</b> or  
                <b>Up/Down Arrow</b>:SelectObject</li>
            </ul>
            <p><b>H</b>: Fix object</p>
            <p><b>R</b>: Reset System</p>
            <hr>
            <b>F/G</b>: Spawn [Rectangle/Circle] at random location <hr>`;
            this.fpsMeter();
        }
    }

    private fpsMeter() {

        let currentTime,
            elapsedTime,
            previousTime = Date.now();

        const kFPS = 60;
        const kFrameTime = 1 / kFPS;
        const kMPF = 1000 * kFrameTime;

        currentTime = Date.now();
        elapsedTime = currentTime - previousTime;

        this.lagTime += elapsedTime;

        while (this.lagTime >= kMPF) {
            this.lagTime -= kMPF;
        }
        console.log('test', this.lagTime);
        console.log('kmpf', kFrameTime);
        this.color = this.lagTime > 10 ? 'red' : 'green';
    }

}