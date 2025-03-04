import * as fs from 'fs';
import * as path from 'path';
import { LocationType } from '../types/app';
import { getRandomIndex } from './random';

export const ASSETS_PATH = path.join(__dirname, '..', '..', '/assets');

export const getFiles = (dir: string): string[] => {
	let results: string[] = [];
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filePath = path.join(dir, file);
		results.push(filePath);
	});
	return results;
};

export const getRandomImgFileOf = (imgType: LocationType) => {
	const imgPath = path.join(ASSETS_PATH, `/img/${imgType.toLowerCase()}`);
	const files = getFiles(imgPath);
	return files[getRandomIndex(files.length)];
};
