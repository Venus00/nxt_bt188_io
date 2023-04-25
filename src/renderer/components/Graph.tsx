import ReactApexChart from 'react-apexcharts';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/store/rootReducer';

interface ComponentPropTypes {
	title: string;
	color: string;
}

const Graph: React.FC<ComponentPropTypes> = ({ title = '', color = '' }) => {
	const machineState = useSelector((state: RootState) => state.machine);
	const [chartState, setChartState] = useState({
		options: {
			colors: color,
			plotOptions: {
				bar: {
					dataLabels: {
						position: 'top', // top, center, bottom
					},
				},
			},
			dataLabels: {
				enabled: true,
				offsetY: -20,
				style: {
					fontSize: '12px',
					colors: ['#000000'],
				},
			},
			xaxis: {
				categories: ['1', '2', '3', '4', '5', '6', '7', '8'],
				position: 'bottom',
				labels: {
					offsetY: 0,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
			},
			yaxis: {
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				labels: {
					show: false,
				},
				style: {
					color,
				},
			},
			title: {
				text: title,
				floating: true,
				offsetY: 0,
				align: 'center',
				style: {
					color,
				},
			},
			chart: {
				toolbar: {
					show: false,
				},
				animations: {
					enabled: true,
				},
			},
		},
		series: [
			{
				data: machineState.opCountPerHour,
			},
		],
	});
	useEffect(() => {
		setChartState({
			...chartState,
			series: [
				{
					data: machineState.opCountPerHour,
				},
			],
		});
	}, [machineState.opCountPerHour]);

	return (
		<>
			<ReactApexChart
				options={chartState.options}
				series={chartState.series}
				type="bar"
				height="250rem"
			/>
		</>
	);
};
export default Graph;
