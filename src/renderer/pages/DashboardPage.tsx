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
import ProgressBar from 'renderer/components/ProgressBar';
import Graph from 'renderer/components/Graph';
import Count from '../images/count.svg';
import StatusIcon from '../images/status.svg';
import MotorIcon from '../images/motor.svg';
import DownTimeTotoal from '../images/downTimeTotal.svg';

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

const formatDownTimePerShift = (seconds: number) => {
	const minutes = Math.floor(seconds / 60) % 60;
	const hours = Math.floor(Math.floor(seconds / 60) / 60);
	let result = '';

	if (hours < 10) result += `0${hours}h `;
	else {
		result += `${hours}:`;
	}

	if (minutes < 10) result += `0${minutes}m `;
	else {
		result += minutes;
	}

	return result;
};

const DashboardPage = () => {
	const { io, status, downtime, opCount, downtimePerShift } = useSelector(
		(state: RootState) => state.machine
	);

	return (
		<>
			<div className="w-screen flex flex-col justify-center items-center">
				<div className="flex mt-3">
					<ProgressBar
						seconds={downtime}
						time={formatUptime(downtime)}
					/>
				</div>
				<div className="w-[58rem] mt-10">
					<div className="bg-gray-300 rounded-xl">
						<Graph title="Output" color="#34b811" />
					</div>
				</div>
			</div>
			<div className="w-screen flex justify-evenly items-center mt-5">
				<Card icon={StatusIcon} title="Status" body={status} />
				<Card icon={MotorIcon} title="Motor" body={io} />
				<Card
					icon={DownTimeTotoal}
					title="DownTime/Shift"
					body={formatDownTimePerShift(downtimePerShift)}
				/>
				<Card icon={Count} title="Output/Shift" body={opCount} />
			</div>
		</>
	);
};

export default DashboardPage;
