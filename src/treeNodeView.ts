import { SupperCanvas } from './supperCanvas';
import { genArraytoTreeNode } from 'lentleetcodeplugin';

export const treeNodeView = (tree) => {
	const root = genArraytoTreeNode(tree);
	type TreeNode = typeof root;
	const cWidth = 2500;
	const cHeight = 600;
	const supperCanvas = new SupperCanvas(cWidth, cHeight);
	const supperRadius = 30;
	const lineWidth = 400;
	const fontSize = 20;
	const angle = 70;
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
			walk(left, deep + 1, {
				...line,
				angle: angle - 10,
				lineWidth: lineWidth - (180 - 60 * deep)
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
			walk(right, deep + 1, {
				...line,
				angle: angle - 10,
				lineWidth: lineWidth - (180 - 60 * deep)
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
	const y = supperRadius + 10;
	walk(root, 0, { x, y, angle, lineWidth });
	const base64 = supperCanvas.end();
	return base64;
};
