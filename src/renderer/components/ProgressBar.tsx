import { useEffect, useState } from 'react';
import DownTime from '../images/downTime.svg';
import DownTimeV from '../images/downTimeV.svg';

/* eslint-disable react/prop-types */
interface ComponentPropTypes {
	seconds?: number;
	time?: string;
}

const ProgressBar: React.FC<ComponentPropTypes> = ({
	time = 'seconds',
	seconds = 0,
}) => {
	return (
		<div className="inline-flex items-center justify-center overflow-hidden">
			<div className="h-20 w-96  bg-neutral-200 dark:bg-white rounded-full">
				<svg className="rounded-full w-[100%] h-[100%]">
					<rect
						width={`${Math.floor((seconds / 30) * 100)}%`}
						height="100%"
						className="rounded-full"
						fill={`${seconds > 30 ? '#F84018' : '#B3F776'}`}
					/>
				</svg>
			</div>
			<div className="absolute flex">
				<div className="mr-3 mt-3">
					<img
						alt="ICON"
						src={seconds > 30 ? DownTime : DownTimeV}
						className="h-12 w-12"
					/>
				</div>
				<div className="mr-2">
					<span className="text-black font-bold text-2xl">
						{'Current'}
						<br />
						{'Cycle Time'}
					</span>
				</div>
				<div className="mt-3">
					<span className="text-black font-bold text-4xl">
						{time}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
