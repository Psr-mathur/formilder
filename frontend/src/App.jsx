import { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Createform from "./pages/Createform";
import Published from "./pages/Published";
import Response from "./pages/Response";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className="app">
				{/* <Navbar /> */}
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Navbar />
								<Outlet />
							</>
						}
					>
						<Route path="/" element={<Home />} />
						<Route path="/createform" element={<Createform />} />
						<Route path="/response" element={<Response />} />
					</Route>
					<Route path="/published/*" element={<Published />} />
				</Routes>
			</div>
		</QueryClientProvider>
	);
}

export default App;
