import { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Createform from "./pages/Createform";
import Published from "./pages/Published";
import Response from "./pages/Response";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Task from "./pages/Task";
import MyContextProvider from "./Contextapi/createcontext";
import Taskpublished from "./pages/Taskpublished";
import Test from "./pages/test";
import Taskresponse from "./pages/Taskresponses";

function App() {
	const queryClient = new QueryClient();

	return (
		<MyContextProvider>
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
							<Route
								path="/createform"
								element={<Createform />}
							/>
							<Route path="/task" element={<Task />} />
							<Route path="/response" element={<Response />} />
							<Route
								path="/taskresponse"
								element={<Taskresponse />}
							/>
						</Route>
						<Route path="/published/*" element={<Published />} />
						<Route
							path="/taskpublished/*"
							element={<Taskpublished />}
						/>
						<Route path="/test" element={<Test />} />
					</Routes>
				</div>
			</QueryClientProvider>
		</MyContextProvider>
	);
}

export default App;
