import { Provider } from 'react-redux';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store';
import AppLayout from './AppLayout';
import DashboardPage from './pages/DashboardPage';
import EventDispatcher from './EventDispatcher';
import SettingsPage from './pages/SettingsPage';

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="" element={<AppLayout />}>
						<Route path="/" element={<DashboardPage />} />
					</Route>
				</Routes>
				<EventDispatcher />
			</Router>
		</Provider>
	);
}

