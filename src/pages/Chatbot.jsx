import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const Chatbot = () => {
	const handleStart = () => {
		window.open('https://chatbot.lmsathena.com/', '_blank', 'noopener,noreferrer');
	};

	return (
		<div className="p-6 space-y-6 animate-fade-in">
			<div className="w-full rounded-xl overflow-hidden shadow-sm border bg-white">
				<img
					src="/assets/banner_chatbot.jpeg"
					alt="Credit Health Check"
					className="w-full h-auto object-cover"
				/>
			</div>

			{/* Callout */}
			<div className="mx-auto max-w-3xl text-center">
				<p className="text-gray-600">Answer a few quick questions to get your personalized credit health insight.</p>
				<div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
					<span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
					Powered by AI Assistance
				</div>
			</div>

			{/* CTA */}
			<div className="flex justify-center">
				<Button
					onClick={handleStart}
					size="lg"
					className="group relative w-full max-w-2xl py-6 text-lg rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform hover:-translate-y-0.5"
				>
					<span className="absolute inset-0 rounded-full blur-md opacity-30 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 group-hover:opacity-40 transition-opacity" aria-hidden="true"></span>
					<span className="relative flex items-center justify-center gap-2">
						<Play className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
						Start Credit Health Check
					</span>
				</Button>
			</div>
		</div>
	);
};

export default Chatbot;
