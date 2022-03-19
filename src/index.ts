import fs from 'fs';
import path from 'path';
import { LentHttpInstance } from 'lent/dist/types';
import { treeNodeView } from './treeNodeView';
import { listNodeView } from './listNodeView'
import { getUrlData } from 'lentleetcodeplugin';

interface IRequestType {
	type: string;
	demo: Array<number>; //Record<string, any>;
}
const switchType = (v: IRequestType) => {
	switch (v.type) {
		case 'tree':
			return {
				data: treeNodeView(v.demo)
			};
		case 'listnode':
			return {
				data: listNodeView(v.demo)
			};
		default:
			break;
	}
};

export const lentLeetViewPlugin = (i: LentHttpInstance) => {
	i.router.addRouter({
		method: 'get',
		path: '/leetView',
		handler(req, res) {
			try {
				const htmlContent = fs.readFileSync(
					path.resolve(__dirname, './template.html')
				);
				res.setHeader('Content-Type', 'text/html; charset=utf-8');
				return htmlContent;
			} catch (e) {
				return `{code: 500,msg: ${e}}`;
			}
		}
	});
	i.router.addRouter({
		method: 'get',
		path: '/leetView/api',
		handler(req, res) {
			try {
				const v = getUrlData(req.url);
				res.setHeader('Content-Type', 'application/json;charset=utf-8');
				return JSON.stringify(switchType(v));
			} catch (e) {
				return `{code: 500,msg: ${e}}`;
			}
		}
	});
};
