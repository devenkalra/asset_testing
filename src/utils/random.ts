export const getRandomIndex = (max: number) => {
	return getRandomBetween(0, max - 1);
};

export const getRandomBetween = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
