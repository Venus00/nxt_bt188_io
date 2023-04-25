/* eslint-disable react/prop-types */
interface ComponentPropTypes {
	icon?: string;
	title?: string;
	body?: string | number;
}

const Card: React.FC<ComponentPropTypes> = ({
	icon = '',
	title = 'message',
	body = 'number',
}) => {
	return (
		<div className="p-4 flex items-center rounded-md border-gray-500 border-2 border-solid">
			<div className="w-24 px-4 py-1">
				<img src={icon} alt="ICON" width={64} height={64} />
			</div>
			{/* TODO: add font and text color */}
			<div className="px-4 py-1 flex flex-col justify-evenly items-center">
				<p className="text-white font-bold">{title}</p>
				<p className="text-white font-bold text-xl font-custom">
					{body}
				</p>
			</div>
		</div>
	);
};

export default Card;
