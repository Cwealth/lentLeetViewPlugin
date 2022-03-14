const { createCanvas } = require('canvas');

export class SupperCanvas {
	public _width = 100;
	public _height = 100;
	private _canvas: any = null;
	private _ctx: any = null;
	constructor(width: number, height: number) {
		this._width = width;
		this._height = height;
		this._canvas = createCanvas(width, height);
		this._ctx = this._canvas.getContext('2d');
		this._ctx.fillRect(0, 0, width, height);
		this._ctx.fillStyle = 'red';
		this._ctx.fill();
	}
	drawcircular(drawcircular: drawcircularProps) {
		// 生成圆
		const {
			x = 0,
			y = 0,
			radius = 0,
			sRadius = 0,
			aRadius = 360,
			backgroundColor,
			borderColor
		} = drawcircular;
		const ctx = this._ctx;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, aRadius * Math.PI);
		ctx.strokeStyle = borderColor || backgroundColor;
		ctx.stroke();
		ctx.fillStyle = backgroundColor;
		ctx.fill();
		return drawcircular;
	}
	drawLine({ sx, sy, width, angle, borderColor }: drawLineProps) {
		const ctx = this._ctx;
		const ex = sx + Math.cos((Math.PI / 180) * angle) * width;
		const ey = sy + Math.sin((Math.PI / 180) * angle) * width;
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.moveTo(sx, sy);
		ctx.lineTo(ex, ey);
		ctx.strokeStyle = borderColor;
		ctx.stroke();
		return { x: ex, y: ey };
	}
	drawText(
		{ x, y, color, text, fontSize }: drawTextProps,
		f: drawcircularProps
	) {
		const ctx = this._ctx;
		ctx.font = `${fontSize}px Arial`;
		ctx.fillStyle = color;
		const width = ctx.measureText(text).width;
		const height = ctx.measureText(text).emHeightAscent;
		const cx = f.x - width / 2;
		const cy = f.y + (f.radius - height) / 2;
		ctx.fillText(text, cx, cy);
	}
	end() {
		const base64Data = this._canvas.toDataURL();
		// .replace(/^data:image\/\w+;base64,/, '');
		// const dataBuffer = Buffer.from(base64Data, 'base64');
		return base64Data;
	}
}
