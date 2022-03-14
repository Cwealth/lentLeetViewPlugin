interface drawcircularProps {
	x: number; // x轴位置
	y: number; // y轴位置
	radius: number; // 半径
	sRadius?: number; // 起始角度
	aRadius?: number; // 总角度
	backgroundColor?: string; // 背景颜色
	borderColor?: string; // 边框颜色
}

interface drawLineProps {
	sx: number; // 开始X轴
	sy: number; // 开始y轴
	width: number; // 结束X轴
	angle: number; // 结束Y轴
	borderColor?: string; // 边框颜色
}

interface drawTextProps {
	x?: number;
	y?: number;
	text?: string | number;
	fontSize?: number;
	color?: string;
}
