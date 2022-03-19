import { SupperCanvas } from './supperCanvas';
import { genArraytoTreeNode } from 'lentleetcodeplugin';
import { TreeNode } from 'lentleetcodeplugin/dist/share';

function maxDepth(root: TreeNode | null): number {
	if (!root) return 0
	const walk = (root: TreeNode | null) => {
		if (!root) return 0
		const letNum = walk(root.left)
		const rightNum = walk(root.right)
		return Math.max(letNum + 1, rightNum + 1)
	}

	return walk(root)
};

export const treeNodeView = (tree) => {
	const root = genArraytoTreeNode(tree);
	const deepLength = maxDepth(root)
	const cWidth =deepLength * 700;
	const cHeight = deepLength * 300;
	const supperCanvas = new SupperCanvas(cWidth, cHeight);
	const supperRadius = 30; // 圆半径
	const fontSize = 20;
	const endAngle = 30 // 最后一层角度
	const addAngle = 10 // 每次递增的角度
	const endLineWidth = 80
	const addLineWidth = deepLength * 14
	const countAddLineWidht = addLineWidth * (deepLength - 1)
	const angle = endAngle + (addAngle * (deepLength - 1));
	const addNum = new Array(deepLength).fill(0).map((v, i) => i + 1).reduce((t, v) => t + v)
	const lineWidth = endLineWidth + addNum * addLineWidth;
	const walk = (
		root: TreeNode | null,
		deep: number,
		{
			x,
			y,
			angle,
			lineWidth
		}: { x: number; y: number; angle: number; lineWidth: number }
	) => {
		if (!root) return;
		const left = root.left;
		const right = root.right;
		if (left) {
			const line = supperCanvas.drawLine({
				sx: x,
				sy: y,
				angle: 180 - (90 - angle),
				width: 2 * supperRadius + lineWidth,
				borderColor: 'red'
			});
			walk(left, deep - 1, {
				...line,
				angle: angle - addAngle,
				lineWidth: lineWidth - (deepLength - deep) * addLineWidth
			});
		}
		if (right) {
			const line = supperCanvas.drawLine({
				sx: x,
				sy: y,
				angle: 90 - angle,
				width: 2 * supperRadius + lineWidth,
				borderColor: 'red'
			});
			walk(right, deep - 1, {
				...line,
				angle: angle - addAngle,
				lineWidth: lineWidth - (deepLength - deep) * addLineWidth
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
				text: root.val,
				color: 'green',
				fontSize: fontSize
			},
			circular
		);
	};
	const x = (cWidth - supperRadius) / 2;
	const y = supperRadius + deepLength * 50;
	walk(root, 0, { x, y, angle, lineWidth });
	const base64 = supperCanvas.end();
	return base64;
};
