import './dashboard.css';
import { Users, Calendar, CheckSquare, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Pie, Cell, CartesianGrid, PieChart, Tooltip, ResponsiveContainer } from 'recharts';
import { getAdmin, getAllPrograms, getAllTrainers } from '../../services/AdminOperations';
import Loader from '../../components/Loader/Loader';
import { showToast } from '../../hooks/useToast';

export default function Dashboard() {
  const adminId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const [upcomingProgramCount, setUpcomingProgramCount] = useState(0);

  const [completionRate, setCompletionRates] = useState(0);

  const { programs, trainers } = useSelector((state) => state.admin);



  useEffect(() => {
    const fetchData = async () => {
      if (adminId) {
        try {
          await Promise.all([
            getAllTrainers(token, dispatch),
            getAllPrograms(token, dispatch),
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    

    fetchData();
  
  }, [adminId, token, dispatch]);

  const activeTrainers = trainers ? trainers.filter((trainer) =>
    trainer.programsAssigned.some((program) => program.programStatus === "Ongoing")
  ).length : 0;

  const activePrograms = programs ? programs.filter((program) => program.programStatus === "Ongoing").length : 0;

  useEffect(() => {
    const calculateCompletionRate = () => {
      if (programs) {

        const ongoingPrograms = programs.filter(
          (program) => program.programStatus === "Ongoing"
        );


        let totalTasks = 0;
        ongoingPrograms.forEach((program) => {
          totalTasks += program.dailyTasks.length;
        });


        let completedTasks = 0;
        ongoingPrograms.forEach((program) => {
          program.dailyTasks.forEach((task) => {
            if (task.completed) {
              completedTasks += 1;
            }
          });
        });


        const completionRate =
          totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        console.log("Total Tasks:", totalTasks);
        console.log("Completed Tasks:", completedTasks);
        console.log("Completion Rate:", completionRate.toFixed(2) + "%");

        setCompletionRates(completionRate.toFixed(2))
      }
    };

    calculateCompletionRate();
  }, [programs]);

  useEffect(() => {
    const fetchUpcomingPrograms = async () => {
      if (programs) {
        let upcomingProgramCount = 0;
        programs.forEach((program) => {
          if (program.programStatus === "Scheduled") {
            upcomingProgramCount++;
          }
        });
        setUpcomingProgramCount(upcomingProgramCount);
      }
    };

    fetchUpcomingPrograms();
  }, [programs]);

  const attendanceData = [
    { name: 'Present', value: trainers ? trainers.reduce((acc, trainer) => acc + (trainer.attendance?.filter(a => a.status === 'Present').length || 0), 0) : 0 },
    { name: 'Absent', value: trainers ? trainers.reduce((acc, trainer) => acc + (trainer.attendance?.filter(a => a.status === 'Absent').length || 0), 0) : 0 },
    { name: 'Late', value: trainers ? trainers.reduce((acc, trainer) => acc + (trainer.attendance?.filter(a => a.status === 'Late').length || 0), 0) : 0 },
  ];


  const COLORS = ['#4F46E5', '#EF4444', '#FCD34D'];

  return (
    <div className='dashboard-container'>
      <div className='dashboard-content'>
        <div className='dashboard-title'>
          <div className='vertical-bar-title'></div>
          Dashboard
        </div>
        <div className="dashboard-info-cards">
          <div className="dashboard-info-card">
            <div className="dashboard-card-icon-container users">
              <Users color="white" size="1.5em" />
            </div>
            <div className='dashboard-card-details'>
              <div className='dashboard-card-title'>Active Trainers</div>
              <div className='dashboard-card-value'>{activeTrainers}</div>
            </div>
          </div>
          <div className="dashboard-info-card">
            <div className="dashboard-card-icon-container calendar">
              <Calendar color="white" size="1.5em" />
            </div>
            <div className='dashboard-card-details'>
              <div className='dashboard-card-title'>Active Programs</div>
              <div className='dashboard-card-value'>{activePrograms}</div>
            </div>
          </div>
          <div className="dashboard-info-card">
            <div className="dashboard-card-icon-container check">
              <CheckSquare color="white" size="1.5em" />
            </div>
            <div className='dashboard-card-details'>
              <div className='dashboard-card-title'>Completion Rate</div>
              <div className='dashboard-card-value'>{completionRate}%</div>
            </div>
          </div>
          <div className="dashboard-info-card">
            <div className="dashboard-card-icon-container map">
              <MapPin color="white" size="1.5em" />
            </div>
            <div className='dashboard-card-details'>
              <div className='dashboard-card-title'>Upcoming Programs</div>
              <div className='dashboard-card-value'>{
                upcomingProgramCount}</div>
            </div>
          </div>
        </div>


        <div className="dashboard-charts-container">
          <div className="dashboard-barchart-container">
            <div className="dashboard-chart-title">Programs Analytics</div>
            <ResponsiveContainer>
              <BarChart
                data={programs && programs.length > 0
                  ? programs
                    .filter(program => program.programStatus === 'Ongoing')
                    .map(program => {
                      const totalTasks = program.dailyTasks.length;
                      const completedTasks = program.dailyTasks.filter(task => task.completed).length;
                      const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                      return {
                        name: program.name,
                        trainerName: program.trainerAssigned ? program.trainerAssigned.name : 'No trainer assigned',
                        totalTasks: totalTasks,
                        completedTasks: completedTasks,
                        completionRate: completionRate,
                        programStatus: program.programStatus,
                      };
                    })
                  : []
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || payload.length === 0) return null;
                    const { name, trainerName, totalTasks, completedTasks, completionRate, programStatus } = payload[0].payload;
                    return (
                      <div className="custom-tooltip">
                        <p><strong style={{ marginRight: "0.3rem" }}>Program:</strong> {name}</p>
                        <p><strong style={{ marginRight: "0.3rem" }}>Trainer:</strong> {trainerName}</p>
                        <p>
                          <strong style={{ marginRight: "0.3rem" }}>Status:</strong>{" "}
                          {programStatus}
                        </p>
                        <p><strong style={{ marginRight: "0.3rem" }}>Total Tasks:</strong> {totalTasks}</p>
                        <p><strong style={{ marginRight: "0.3rem" }}>Completed Tasks:</strong> {completedTasks}</p>
                        <p style={{ color: "#4F46E5" }}><strong style={{ marginRight: "0.3rem" }}>Completion Rate:</strong> {completionRate.toFixed(2)}%</p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="completionRate" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>

          </div>
          <div className='dashboard-piechart-container'>
            <div className='dashboard-piechart-title'>Trainer Attendance</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                {attendanceData && attendanceData.some(entry => entry.value > 0) ? (
                  <>
                    <Pie
                      data={attendanceData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      fill="#8884d8"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </>
                ) : (
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="#555">
                    No data available
                  </text>
                )}
              </PieChart>
            </ResponsiveContainer>

    
            <div className='attendance-agenda'>
              {attendanceData.map((entry, index) => (
                <div key={index} className='agenda-item'>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '1rem',
                      height: '1rem',
                      backgroundColor: COLORS[index],
                      marginRight: '10px',
                      borderRadius:"1000px"
                    }}
                  ></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>





        <div className="dashboard-schedule-container">
          <div className="dashboard-schedule-title">Today&apos;s Training Schedule</div>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Program</th>
                <th>Trainer</th>
                <th>Venue</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {programs && programs.length > 0 ? (
                programs
                  .filter((program) => {
                    const today = new Date();
                    const startDate = new Date(program.startDate);
                    const endDate = new Date(program.endDate);


                    return today >= startDate && today <= endDate;
                  })
                  .map((program) => {
                    const assignedTrainer = trainers?.find((trainer) =>
                      trainer.programsAssigned.some((assignedProgram) => assignedProgram._id === program._id)
                    );

                    return (
                      <tr key={program.programId}>
                        <td>{program.programId}</td>
                        <td>{program.name}</td>
                        <td>{assignedTrainer ? assignedTrainer.name : 'No trainer assigned'}</td>
                        <td>{program.venue}</td>
                        <td>{new Date(program.startDate).toLocaleDateString()}</td>
                        <td>{new Date(program.endDate).toLocaleDateString()}</td>
                        <td>
                          <div className="status-container">
                            {
                              program.programStatus
                            }
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No programs available for today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
