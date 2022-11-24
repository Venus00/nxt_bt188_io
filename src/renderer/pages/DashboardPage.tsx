/* eslint-disable @typescript-eslint/naming-convention */
import { useSelector } from 'react-redux';
import Card from 'renderer/components/Card';
import ClockDisplay from 'renderer/components/ClockDisplay';
import HeadLine from 'renderer/components/HeadLine';
import Spinner from 'renderer/components/Spinner';
import { RootState } from 'renderer/store/rootReducer';

import GearsImage from '../images/gears.svg';
import TaskImage from '../images/task.svg';
import BubbleImage from '../images/chat_bubble.svg';

const formatUptime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60) % 60;
	const hours = Math.floor(Math.floor(seconds / 60) / 60);
	let result = '';

	if (hours < 10) result += `0${hours}:`;
	else {
		result += `${hours}:`;
	}

	if (minutes < 10) result += `0${minutes}`;
	else {
		result += minutes;
	}

	return result;
};

const DashboardPage = () => {
	const { ip, mac, uptime } = useSelector((state: RootState) => state.device);
	const { io, status, report, downtime, opCount } = useSelector(
		(state: RootState) => state.machine
	);

	return (
		<>
			<div className="flex w-screen justify-center items-center grow p-8">
				<div className="w-screen h-full grid grid-cols-2 gap-4 bg-slate-200 border border-gray-400 rounded-xl">
					<HeadLine text="DownTime">
						<img alt="ICON" src={TaskImage} className="h-12 w-12" />
					</HeadLine>
					<HeadLine text="UP TIME">
						<img
							alt="ICON"
							src={GearsImage}
							className="h-12 w-12"
						/>
					</HeadLine>
					<Spinner
						numerator={downtime}
						denomerator={60}
						unit={formatUptime(downtime)}
					/>
					<div className="p-8">
						<ClockDisplay timer={formatUptime(uptime)} />
					</div>
				</div>
			</div>

			<div className="w-screen flex justify-evenly items-center">
				<Card icon={BubbleImage} title="Active" body={io} />
				<Card icon={BubbleImage} title="STATUS" body={status} />
				<Card
					icon={BubbleImage}
					title="Report (day)"
					body={report !== 0 ? report : '--'}
				/>
				<Card icon={BubbleImage} title="Count" body={opCount} />
			</div>
		</>
	);
};

export default DashboardPage;
