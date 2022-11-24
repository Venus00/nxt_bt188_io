import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'renderer/store/rootReducer';

/* eslint-disable react/prop-types */
interface ComponentPropTypes {
	logo?: string;
	time?: string | number;
	icon?: string;
}

const AppBar: React.FC<ComponentPropTypes> = ({
	logo = 'logo',
	time = 'time',
	icon = 'icon',
}) => {
	const navigate = useNavigate();
	const { ip, isConnected, machine } = useSelector(
		(state: RootState) => state.device
	);
	return (
		<div className="w-full h-16 px-8 py-2 flex justify-evenly items-center bg-white shadow-md">
			{/* APTIVE LOGO */}
			<div className="w-1/3 flex justify-start items-center">
				<img src={logo} className="w-1/2" alt="LOGO" />
			</div>

			{/* NETWORK */}
			<div className="w-1/3 flex justify-center items-center">
				<div className="p-2">
					<svg
						fill={isConnected ? 'green' : 'orange'}
						width="49"
						height="37"
						viewBox="0 0 49 37"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M24.6175 36.7295C27.7192 36.7295 30.2337 34.2407 30.2337 31.1706C30.2337 28.1005 27.7192 25.6117 24.6175 25.6117C21.5157 25.6117 19.0013 28.1005 19.0013 31.1706C19.0013 34.2407 21.5157 36.7295 24.6175 36.7295Z" />
						<path d="M38.0399 17.7776C37.9566 17.6928 37.8686 17.6172 37.783 17.5393L37.5306 17.3033C37.489 17.2597 37.4427 17.2277 37.3894 17.1864C30.1272 10.656 19.0129 10.9149 12.0817 17.7753L11.2691 18.5819L10.144 19.6955C8.77356 21.052 8.7805 23.2632 10.1533 24.6219C11.5284 25.9853 13.7624 25.9876 15.1306 24.6311L17.0706 22.7109C21.4783 18.3504 28.6479 18.3504 33.0534 22.7086L34.454 24.0514C35.8106 25.3941 38.0237 25.3918 39.3873 24.0399C40.047 23.3892 40.4105 22.5208 40.4128 21.5973C40.4151 20.6785 40.0563 19.8101 39.3965 19.1616L38.0399 17.7776Z" />
						<path d="M47.6079 10.9059L46.4411 9.75107C46.4365 9.74649 46.4342 9.73961 46.4249 9.73732L45.5036 8.82077C45.3415 8.66267 45.1656 8.52518 44.9804 8.40603C33.1437 -1.87996 15.1399 -1.56375 3.68058 9.34779C3.62502 9.3982 3.56252 9.43257 3.50696 9.48756L1.4003 11.575C0.15019 12.8101 0.157135 14.8196 1.41419 16.0638C2.66892 17.3057 4.69919 17.3149 5.94929 16.0753L8.05595 13.9924C8.06984 13.9741 8.08142 13.958 8.09531 13.9466C17.3623 5.08582 32.0626 5.03083 41.4037 13.7656L43.0612 15.4085C44.309 16.6435 46.3439 16.6389 47.5986 15.397C48.8511 14.1528 48.8557 12.141 47.6079 10.9059Z" />
					</svg>
				</div>

				<div className="font-bold text-xl">
					{ip} - {machine}
				</div>

				{/* <div
					className="p-2"
					role="button"
					onClick={() => navigate('/settings')}
				>
					<svg
						width="49"
						height="49"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title />
						<path
							d="M21.32,10.05l-1.74-.58a8,8,0,0,0-.43-1.05L20,6.79a1,1,0,0,0-.19-1.15L18.36,4.22A1,1,0,0,0,17.21,4l-1.63.82a8,8,0,0,0-1.05-.43L14,2.68A1,1,0,0,0,13,2H11a1,1,0,0,0-.95.68L9.47,4.42a8,8,0,0,0-1.05.43L6.79,4a1,1,0,0,0-1.15.19L4.22,5.64A1,1,0,0,0,4,6.79l.82,1.63a8,8,0,0,0-.43,1.05l-1.74.58A1,1,0,0,0,2,11v2a1,1,0,0,0,.68.95l1.74.58a8,8,0,0,0,.43,1.05L4,17.21a1,1,0,0,0,.19,1.15l1.42,1.42A1,1,0,0,0,6.79,20l1.63-.82a8,8,0,0,0,1.05.43l.58,1.74A1,1,0,0,0,11,22h2a1,1,0,0,0,.95-.68l.58-1.74a8,8,0,0,0,1.05-.43l1.63.82a1,1,0,0,0,1.15-.19l1.42-1.42A1,1,0,0,0,20,17.21l-.82-1.63a8,8,0,0,0,.43-1.05L21.32,14A1,1,0,0,0,22,13V11A1,1,0,0,0,21.32,10.05ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"
							fill="#7D8196"
						/>
					</svg>
				</div> */}
			</div>

			{/* NEXTRONIC LOGO */}
			<div className="w-1/3 flex justify-end items-center">
				<img src={icon} className="" alt="LOGO" />
			</div>
		</div>
	);
};

export default AppBar;
