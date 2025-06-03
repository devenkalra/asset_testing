import dayjs from 'dayjs';

export const getCurrentUnixTime = () => {
	return dayjs().unix();
};
