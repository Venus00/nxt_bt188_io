/* eslint-disable react/prop-types */
interface ComponentPropTypes {
	isPercentage?: boolean;
	numerator?: number;
	denomerator?: number;
	unit?: string;
}

const Spinner: React.FC<ComponentPropTypes> = ({
	isPercentage = false,
	numerator = 0,
	denomerator = 100,
	unit = 'seconds',
}) => {
	const circumference = 80 * 2 * Math.PI;

	return (
		<div className="inline-flex items-center justify-center overflow-hidden rounded-full">
			<svg className="w-48 h-48">
				<circle
					className="text-gray-300"
					strokeWidth="15"
					stroke="currentColor"
					fill="transparent"
					r="80"
					cy="96"
					cx="96"
				/>
				<circle
					className="text-green-500"
					strokeWidth="15"
					strokeDasharray={circumference}
					strokeDashoffset={
						circumference -
						(Math.round((numerator / denomerator) * 100) / 100) *
							circumference
					}
					strokeLinecap="round"
					stroke="currentColor"
					fill="transparent"
					r="80"
					cx="96"
					cy="96"
				/>
			</svg>
			<div className="absolute flex flex-col justify-center items-center">
				<span className="text-3xl text-gray-700">
					{isPercentage
						? `${Math.round((numerator / denomerator) * 100)} %`
						: numerator}
				</span>
				<span className="">{unit}</span>
			</div>
		</div>
	);
};

export default Spinner;

