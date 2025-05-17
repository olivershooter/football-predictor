import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { EventImage } from "./EventImage";

interface EventTimelineProps {
	events: any;
}

export const EventTimeline = ({ events }: EventTimelineProps) => {
	const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		if (!carouselApi) return;

		const updateCarouselState = () => {
			setCurrentIndex(carouselApi.selectedScrollSnap());
			setTotalItems(carouselApi.scrollSnapList().length);
		};

		updateCarouselState();

		carouselApi.on("select", updateCarouselState);

		return () => {
			carouselApi.off("select", updateCarouselState); // Clean up on unmount
		};
	}, [carouselApi]);

	const scrollToIndex = (index: number) => {
		carouselApi?.scrollTo(index);
	};

	return (
		<div className="relative mx-auto h-48 max-w-7xl px-5 pb-8">
			<Carousel
				className="z-10 h-48 w-full max-w-7xl pb-8"
				setApi={setCarouselApi}
				opts={{ loop: true }}
			>
				<CarouselContent>
					{events.map((event: any) => (
						<CarouselItem
							className="flex h-32 items-center justify-center p-6"
							key={event.time.elapsed + event.player.id}
						>
							<Card className="flex h-32 w-52 flex-col items-center gap-1">
								<span className="w-full pl-2 pt-2 text-xs text-gray-500">
									{event.time.elapsed}'
								</span>
								<span className="w-full text-center font-medium">
									{event.player.name}
								</span>
								<div className="flex flex-col items-center gap-1">
									<span className="w-full text-center text-sm text-gray-600">
										{event.detail}
									</span>
									<EventImage eventType={event.type} />
								</div>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Navigation Arrows */}
			<div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-3">
				<Button
					onClick={() => scrollToIndex(currentIndex - 1)}
					className="pointer-events-auto h-32 w-32 rounded-full bg-transparent p-0 shadow-none hover:bg-transparent"
				>
					<ChevronLeft className="size-32" strokeWidth={0.5} />
				</Button>
				<Button
					onClick={() => scrollToIndex(currentIndex + 1)}
					className="pointer-events-auto h-32 w-32 rounded-full bg-transparent p-0 shadow-none hover:bg-transparent"
				>
					<ChevronRight className="size-32" strokeWidth={0.5} />
				</Button>
			</div>

			{/* Navigation Dots */}
			<div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
				{Array.from({ length: totalItems }).map((_, index) => (
					<button
						key={`${index}${+1}`}
						onClick={() => scrollToIndex(index)}
						className={`h-3 w-3 rounded-full ${
							currentIndex === index ? "bg-black" : "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</div>
	);
};
