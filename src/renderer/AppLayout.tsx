/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { Outlet } from 'react-router-dom';
import AppBar from './components/AppBar';

import APTIVImage from './images/Aptiv_logo.svg';
import NextronicImage from './images/nextronic_logo.svg';

const AppLayout = () => {
	const date = new Date().toString();
	return (
		<div className="h-screen w-screen flex flex-col items-center bg-black">
			<AppBar logo={APTIVImage} icon={NextronicImage} />
			<Outlet />
			{/* <div className="w-screen p-4 flex justify-center items-center">
				<img src={NextronicImage} alt="NEXTRONIC" />
			</div> */}
		</div>
	);
};

export default AppLayout;

