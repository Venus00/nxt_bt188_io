/* eslint-disable react/prop-types */
import { ReactNode } from 'react';

interface ComponentPropTypes {
	children?: ReactNode;
	text?: string | number;
}

const HeadLine: React.FC<ComponentPropTypes> = ({
	children,
	text = 'TEXT',
}) => {
	return (
		<div className="p-1 flex justify-center items-center">
			<div className="p-1">{children}</div>
			<div className="p-1">
				<p className="font-bold text-2xl">{text}</p>
			</div>
		</div>
	);
};

export default HeadLine;

