interface ImageProps {
	height: number;
	width: number;
	playersNumber: string;
	colour: string;
	alt: string;
}

export const ShirtSVG = ({
	height = 40,
	width = 40,
	playersNumber,
	colour,
	alt,
}: ImageProps) => {
	// Function to calculate luminance of a hex color so depending on the teams shirt colours the players shirt number is visible
	const getLuminance = (hex: string) => {
		const rgb = Number.parseInt(hex.replace("#", ""), 16);
		const r = (rgb >> 16) & 0xff;
		const g = (rgb >> 8) & 0xff;
		const b = (rgb >> 0) & 0xff;
		return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	};

	const luminance = getLuminance(colour);
	const textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";
	const strokeColor = luminance > 0.5 ? "#FFFFFF" : "#000000";

	return (
		<svg
			fill={`${colour}`}
			width={`${width}`}
			height={`${height}`}
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="name">
				<title>{alt}</title>
				<path d="M256,96c33.08,0,60.71-25.78,64-58,.3-3-3-6-6-6h0a13,13,0,0,0-4.74.9c-.2.08-21.1,8.1-53.26,8.1s-53.1-8-53.26-8.1a16.21,16.21,0,0,0-5.3-.9h-.06A5.69,5.69,0,0,0,192,38C195.35,70.16,223,96,256,96Z" />
				<path d="M485.29,89.9,356,44.64a4,4,0,0,0-5.27,3.16,96,96,0,0,1-189.38,0A4,4,0,0,0,156,44.64L26.71,89.9A16,16,0,0,0,16.28,108l16.63,88A16,16,0,0,0,46.83,208.9l48.88,5.52a8,8,0,0,1,7.1,8.19l-7.33,240.9a16,16,0,0,0,9.1,14.94A17.49,17.49,0,0,0,112,480H400a17.49,17.49,0,0,0,7.42-1.55,16,16,0,0,0,9.1-14.94l-7.33-240.9a8,8,0,0,1,7.1-8.19l48.88-5.52A16,16,0,0,0,479.09,196l16.63-88A16,16,0,0,0,485.29,89.9Z" />

				<text
					x="50%"
					y="60%"
					fontFamily="Arial, sans-serif"
					fontSize="200"
					fontWeight="bold"
					fill={textColor}
					stroke={strokeColor}
					strokeWidth="2"
					textAnchor="middle"
					dominantBaseline="middle"
				>
					{playersNumber}
				</text>
			</g>
		</svg>
	);
};
