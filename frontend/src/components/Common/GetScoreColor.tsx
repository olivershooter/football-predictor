export const getScoreColor = (
	isHome: boolean,
	isWinner: boolean,
	isTie: boolean,
) => {
	if (isTie) return "text-slate-700";
	return isWinner === isHome ? "text-lime-700" : "text-red-700";
};
