/* eslint-disable react/prop-types */
const ClockDisplay: React.FC<{ timer?: string }> = ({ timer = '00:00' }) => {
	return (
		<div className="p-8 flex justify-center items-center bg-gradient-to-b from-slate-400 to-slate-700 rounded-2xl">
			<p className="font-bold text-6xl text-white">{timer}</p>
		</div>
	);
};

export default ClockDisplay;

