import React, { useEffect, useState } from "react";
import { Scheduler, Toolbar } from "@aldabil/react-scheduler";
import APIInUse from "../../../../config/axios/AxiosInUse";
import Cookies from "js-cookie";
import "./VetScheduler.scss";

function VetScheduler() {
	const [isLoading, setIsLoading] = useState(false);
	const id = Cookies.get("userId");
	const [events, setEvents] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [view, setView] = useState("week");
	const [viewAttributes, setViewAttributes] = useState({
		week: {
			weekDays: [2, 3, 4, 5, 6, 7, 8],
			weekStartOn: 6,
			startHour: 8,
			endHour: 18,
		},

		day: {
			dayStartOn: 6,
			startHour: 8,
			endHour: 18,
		},
	});

	useEffect(() => {
		const getWorkScheduleData = async () => {
			try {
				const response = await APIInUse.get(
					`Appointment/vet/appointments/${id}?pageNumber=1&pageSize=1000000`
				);

				const formattedData = response.data.data.items.map((appointment) => ({
					id: appointment.id,
					title: `Dịch vụ: ${appointment.services
						.map((service) => service.name)
						.join(", ")}`,
					start: new Date(
						`${appointment.appointmentDate}T${appointment.timeTable.startTime}`
					),
					end: new Date(
						`${appointment.appointmentDate}T${appointment.timeTable.endTime}`
					),
				}));

				setEvents(formattedData);
			} catch (error) {
				console.log("Error:", error);
			}
		};

		getWorkScheduleData();
	}, []);

	const handleTodayClick = () => {
		setCurrentDate(new Date());
	};

	const handleDayView = () => {
		setView("day");
	};

	const handleWeekView = () => {
		setView("week");
	};

	return (
		<div className="vet-scheduler">
			<Scheduler
				events={events}
				height={750}
				view={view}
				date={currentDate}
				week={viewAttributes.week}
				day={viewAttributes.day}
				hourFormat="24"
				translations={{
					navigation: {
						month: "Tháng",
						week: "Tuần",
						day: "Ngày",
						today: "Hôm nay",
						agenda: "Lịch trình",
					},
				}}
				editable={false} // Disable event creation
			>
				{(props) => (
					<Toolbar {...props}>
						<div>
							<button onClick={handleTodayClick}>Today</button>
							<button onClick={handleDayView}>Day</button>
							<button onClick={handleWeekView}>Week</button>
						</div>
					</Toolbar>
				)}
			</Scheduler>
		</div>
	);
}

export default VetScheduler;
