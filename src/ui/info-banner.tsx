import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadcn/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { HandHeartIcon, MapPinIcon, MessageCircleReplyIcon, TruckIcon } from "lucide-react";
import React from "react";

const InfoBanner = () => {
	return (
		<Card className="relative -mt-8">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-2">
				{/* Avatar + Seller Info */}
				<div className="flex items-start gap-4 w-full sm:w-auto">
					{/* Avatar - Floats out of card on mobile */}
					<div className="relative">
						<Avatar className="w-18 h-18 absolute -top-13 left-0 sm:static sm:w-18 sm:h-18 p-0 m-0">
							<AvatarImage src="/gangar.png" alt="RRRSHOPS Owner" />
							<AvatarFallback>RS</AvatarFallback>
						</Avatar>
					</div>

					{/* Seller Text Info */}
					<div className="pt-8 sm:pt-0">
						<div className="flex items-center gap-2">
							<h3 className="text-md sm:text-2xl font-semibold">RRRSHOPS</h3>
							<div className="flex justify-between gap-2 w-full">
								<div className="flex">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<div className="flex items-center gap-1 text-purple-500 hover:text-purple-700 cursor-pointer">
													<StarFilledIcon className="w-4 h-4" />
													<p className=" sm:inline text-sm">Star Seller</p>
												</div>
											</TooltipTrigger>
											<TooltipContent className="bg-transparent p-0">
												<Card className="max-w-60">
													<CardHeader>
														<div className="flex items-center gap-2">
															<CardTitle className=" text-lg font-bold text-purple-500">
																Star Seller
															</CardTitle>
															<StarFilledIcon className="w-5 h-5 text-purple-500" />
														</div>
													</CardHeader>

													<CardContent>
														<p className="text-sm text-neutral-700">
															Star Sellers have an outstanding track record for providing a great customer
															experience – they consistently earned 5-star reviews, dispatched orders on time,
															and replied quickly to messages.
														</p>
													</CardContent>
												</Card>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>

								<div className="flex sm:hidden items-center gap-2">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<TruckIcon className="w-5 h-5 text-purple-500 hover:text-purple-700 cursor-pointer" />
											</TooltipTrigger>
											<TooltipContent className="bg-transparent p-0">
												<Card className="max-w-60">
													<CardHeader>
														<div className="flex items-center gap-2 text-purple-500">
															<CardTitle className="text-lg font-bold">Smooth Dispatch</CardTitle>
															<TruckIcon className="w-4 h-4 " />
														</div>
													</CardHeader>
													<CardContent>
														<p className="text-sm text-neutral-700">
															History of dispatching on time with tracking.
														</p>
													</CardContent>
												</Card>
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<MessageCircleReplyIcon className="w-5 h-5 text-purple-500 hover:text-purple-700 cursor-pointer" />
											</TooltipTrigger>
											<TooltipContent className="bg-transparent p-0">
												<Card className="max-w-60">
													<CardHeader>
														<div className="flex items-center gap-2 text-purple-500">
															<CardTitle className="text-lg font-bold">Speedy Replies</CardTitle>
															<MessageCircleReplyIcon className="w-4 h-4 " />
														</div>
													</CardHeader>
													<CardContent>
														<p className="text-sm text-neutral-700">
															History of replying to messages quickly.
														</p>
													</CardContent>
												</Card>
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<HandHeartIcon className="w-5 h-5 text-purple-500 hover:text-purple-700 cursor-pointer" />
											</TooltipTrigger>
											<TooltipContent className="bg-transparent p-0">
												<Card className="max-w-60">
													<CardHeader>
														<div className="flex items-center gap-2 text-purple-500">
															<CardTitle className="text-lg font-bold">Rave Reviews</CardTitle>
															<HandHeartIcon className="w-4 h-4 " />
														</div>
													</CardHeader>
													<CardContent>
														<p className="text-sm text-neutral-700">Average review is 4.8 or higher</p>
													</CardContent>
												</Card>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
						</div>

						<p className="text-xs">3D Prints & More - Small family business run with love!</p>
						<div className="flex items-center gap-2 text-neutral-600">
							<MapPinIcon className="w-3 h-3" />
							<p className="text-sm text-neutral-600">Texas, United States</p>
						</div>
						<div className="flex items-center text-sm h-4">
							<p>395 Sales </p>
							<Separator orientation="vertical" className="mx-2 h-4 w-px bg-neutral-900" />
							<div className="flex items-center gap-1">
								<StarFilledIcon className="w-3 h-3 text-yellow-400" />
								<p className="text-sm font-semibold">4.8 (129)</p>
							</div>
						</div>
					</div>
				</div>

				{/* SMOOTH DISPATCH */}
				<div className="text-sm">
					<div className="hidden">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex flex-col items-start gap-2">
										<TruckIcon className="w-6 h-6 text-purple-500 hover:text-purple-700 cursor-pointer" />
										<p className="font-semibold">Smooth Dispatch</p>
									</div>
								</TooltipTrigger>
								<TooltipContent className="bg-transparent p-0">
									<Card className="max-w-60">
										<CardHeader>
											<div className="flex items-center gap-2">
												<CardTitle className="text-lg font-bold">Smooth Dispatch</CardTitle>
												<TruckIcon className="w-4 h-4 " />
											</div>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-neutral-700">
												History of dispatching on time with tracking.
											</p>
										</CardContent>
									</Card>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className="hidden sm:block">
						<div className="flex flex-col items-start gap-1">
							<div className="flex items-center gap-2">
								<TruckIcon className="w-6 h-6 text-purple-500 " />
								<p className="font-semibold">Smooth Dispatch</p>
							</div>
							<p className="text-xs text-neutral-600">History of dispatching on time with tracking.</p>
						</div>
					</div>
				</div>

				{/* SPEEDY REPLIES */}
				<div className="text-sm">
					<div className="hidden">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex flex-col items-start gap-2">
										<MessageCircleReplyIcon className="w-6 h-6 text-purple-500 hover:text-purple-700 cursor-pointer" />
										<p className="font-semibold">Speedy Replies</p>
									</div>
								</TooltipTrigger>
								<TooltipContent className="bg-transparent p-0">
									<Card className="max-w-60">
										<CardHeader>
											<div className="flex items-center gap-2">
												<CardTitle className="text-lg font-bold">Speedy Replies</CardTitle>
												<MessageCircleReplyIcon className="w-4 h-4 " />
											</div>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-neutral-700">History of replying to messages quickly.</p>
										</CardContent>
									</Card>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className="hidden sm:block">
						<div className="flex flex-col items-start gap-1">
							<div className="flex items-center gap-2">
								<MessageCircleReplyIcon className="w-6 h-6 text-purple-500  " />
								<p className="font-semibold">Speedy Replies</p>
							</div>
							<p className="text-xs text-neutral-600">History of replying to messages quickly.</p>
						</div>
					</div>
				</div>

				{/* RAVE REVIEWS */}
				<div className="text-sm">
					<div className="hidden">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex flex-col items-start gap-2">
										<HandHeartIcon className="w-6 h-6 text-purple-500 hover:text-purple-700 cursor-pointer" />
										<p className="font-semibold">Rave Reviews</p>
									</div>
								</TooltipTrigger>
								<TooltipContent className="bg-transparent p-0">
									<Card className="max-w-60">
										<CardHeader>
											<div className="flex items-center gap-2">
												<CardTitle className="text-lg font-bold">Rave Reviews</CardTitle>
												<HandHeartIcon className="w-4 h-4 " />
											</div>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-neutral-700">Average review is 4.8 or higher</p>
										</CardContent>
									</Card>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className="hidden sm:block">
						<div className="flex flex-col items-start gap-1">
							<div className="flex items-center gap-2">
								<HandHeartIcon className="w-6 h-6 text-purple-500  " />
								<p className="font-semibold">Rave Reviews</p>
							</div>
							<p className="text-xs text-neutral-600">Average review is 4.8 or higher</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default InfoBanner;
