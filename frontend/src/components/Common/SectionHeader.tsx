import { HorizontalLine } from "./HorizontalLine";

export const SectionHeader = ({
	title,
	svgName,
}: {
	title: string;
	svgName?: string;
}) => (
	<h2 className="mb-1 px-2 py-6 text-center text-lg font-bold sm:text-base md:text-2xl">
		{title.toUpperCase()}
		{svgName ? <HorizontalLine svgName={svgName} /> : <HorizontalLine />}
	</h2>
);
