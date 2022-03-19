import { SupperCanvas } from './supperCanvas';

export const listNodeView = (arr: number[]) => {
    const deepLength = arr.length
    const lineWidth = 120;
    const supperRadius = 30; // 圆半径
    const cWidth = deepLength * (lineWidth + 2 * supperRadius) - lineWidth + 160;
    const cHeight = 2*supperRadius + 120;
    const fontSize = 20;
    const supperCanvas = new SupperCanvas(cWidth, cHeight);
    let x = supperRadius + 80;
    let y = supperRadius + 60;
    while (arr.length) {
        const item = arr.shift()
        let line = { x, y }
        if (arr.length) {
            line = supperCanvas.drawLine({
                sx: x,
                sy: y,
                angle: 0,
                width: 2 * supperRadius + lineWidth,
                borderColor: 'red'
            });
        }
        const circular = supperCanvas.drawcircular({
            x: x,
            y: y,
            radius: supperRadius,
            backgroundColor: 'yellow'
        });
        supperCanvas.drawText(
            {
                text: item,
                color: 'green',
                fontSize: fontSize
            },
            circular
        );
        x = line.x
        y = line.y

    }
    const base64 = supperCanvas.end();
    console.log(base64, '--------base64')
    return base64;
};
