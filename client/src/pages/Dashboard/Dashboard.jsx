import './Dashboard.css';
import { Users, Calendar, CheckSquare, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Pie, Cell, CartesianGrid, PieChart, Tooltip, ResponsiveContainer } from 'recharts';
import { getAdmin, getAllPrograms, getAllTrainers } from '../../services/AdminOperations';
import Loader from '../../components/Loader/Loader';

export default function Dashboard() {
  const adminId = useSelector((state) => state.auth.id)
  const dispatch = useDispatch()
  const token = localStorage.getItem("Token")
  const [loading, setLoading] = useState(true)


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
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [adminId, token, dispatch]);


  const combinedData = [
    { program: 'Web Dev', venue: 'Venue 1', active: 5, completed: 4, completionRate: ((4 / 5) * 100).toFixed(2) },
    { program: 'App Dev', venue: 'Venue 2', active: 3, completed: 2, completionRate: ((2 / 3) * 100).toFixed(2) },
    { program: 'Cloud', venue: 'Venue 3', active: 4, completed: 3, completionRate: ((3 / 4) * 100).toFixed(2) },
    { program: 'Data Science', venue: 'Venue 4', active: 6, completed: 5, completionRate: ((5 / 6) * 100).toFixed(2) },
    { program: 'AI & ML', venue: 'Venue 5', active: 7, completed: 6, completionRate: ((6 / 7) * 100).toFixed(2) },
    { program: 'Digital Marketing', venue: 'Venue 6', active: 5, completed: 3, completionRate: ((3 / 5) * 100).toFixed(2) },
    { program: 'Cyber Security', venue: 'Venue 7', active: 8, completed: 7, completionRate: ((7 / 8) * 100).toFixed(2) },
    { program: 'Blockchain', venue: 'Venue 8', active: 4, completed: 3, completionRate: ((3 / 4) * 100).toFixed(2) },
  ];

  const scheduleData = [
    {
      id: 1,
      program: 'Web Development',
      trainer: 'John Doe',
      venue: 'Tech Hub - Room 101',
      time: '9:00 AM - 4:00 PM',
      status: 'In Progress',
    },
    {
      id: 2,
      program: 'App Development',
      trainer: 'Jane Smith',
      venue: 'Tech Hub - Room 102',
      time: '10:00 AM - 5:00 PM',
      status: 'Completed',
    },
    {
      id: 3,
      program: 'Cloud Computing',
      trainer: 'Mike Johnson',
      venue: 'Tech Hub - Room 103',
      time: '8:30 AM - 4:30 PM',
      status: 'In Progress',
    },
    {
      id: 4,
      program: 'Data Science',
      trainer: 'Sarah Lee',
      venue: 'Tech Hub - Room 104',
      time: '9:30 AM - 6:00 PM',
      status: 'Pending',
    },
    {
      id: 5,
      program: 'AI & ML',
      trainer: 'Robert Brown',
      venue: 'Tech Hub - Room 105',
      time: '9:00 AM - 4:00 PM',
      status: 'In Progress',
    },
    {
      id: 6,
      program: 'Blockchain',
      trainer: 'Emily Davis',
      venue: 'Tech Hub - Room 106',
      time: '10:00 AM - 4:00 PM',
      status: 'Completed',
    },
  ];


  const attendanceData = [
    { name: 'Present', value: 60 },
    { name: 'Absent', value: 30 },
    { name: 'Late', value: 10 },
  ];



  const COLORS = ['#4F46E5', '#FCD34D', '#EF4444'];

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
              <div className='dashboard-card-value'>24</div>
            </div>
          </div>
          <div className="dashboard-info-card">
            <div className="dashboard-card-icon-container calendar">
              <Calendar color="white" size="1.5em" />
            </div>
            <div className='dashboard-card-details'>
              <div className='dashboard-card-title'>Active Programs</div>
              <div className='dashboard-card-value'>8</div>
            </div>
          </div>
          <div className="dashboard-info-card">
            <div className="dashboard-card-icon-container check">
              <CheckSquare color="white" size="1.5em" />
            </div>
            <div className='dashboard-card-details'>
              <div className='dashboard-card-title'>Completed Rate</div>
              <div className='dashboard-card-value'>86%</div>
            </div>
          </div>
          <div className="dashboard-info-card">
            <div className="dashboard-card-icon-container map">
              <MapPin color="white" size="1.5em" />
            </div>
            <div className='dashboard-card-details'>
              <div className='dashboard-card-title'>Active Venue</div>
              <div className='dashboard-card-value'>12</div>
            </div>
          </div>
        </div>

        <div className='dashboard-charts-container'>
          <div className='dashboard-barchart-container'>
            <div className='dashboard-chart-title'>Completion Rates</div>
            <ResponsiveContainer  >
              <BarChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="program"
                  tickFormatter={(value) => `${value}`}
                />
                <YAxis />
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const { program, venue, active, completed, completionRate } = payload[0].payload;
                      return (
                        <div className="custom-tooltip">
                          <div><span>Venue:</span> {venue}</div>
                          <div><span>Program:</span> {program}</div>
                          <div><span>Active Sessions:</span> {active}</div>
                          <div><span>Completed:</span> {completed}</div>
                          <div><span >Completion Rate:</span><span className='completion-rate'> {completionRate}%</span></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="completionRate" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='dashbaord-piechart-container'>
            <div className='dashboard-piechart-title'>Today&apos;s Trainer Attendance</div>
            <ResponsiveContainer >
              <PieChart>
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
              </PieChart>
            </ResponsiveContainer>
            <div className='attendance-legend'>
              <div className='legend-item'>
                <div className='legend-dot' style={{ backgroundColor: COLORS[0] }}></div>
                <span>Present (85%)</span>
              </div>
              <div className='legend-item'>
                <div className='legend-dot' style={{ backgroundColor: COLORS[1] }}></div>
                <span>Late (10%)</span>
              </div>
              <div className='legend-item'>
                <div className='legend-dot' style={{ backgroundColor: COLORS[2] }}></div>
                <span>Absent (5%)</span>
              </div>
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
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.id}</td>
                  <td>{schedule.program}</td>
                  <td>{schedule.trainer}</td>
                  <td>{schedule.venue}</td>
                  <td>{schedule.time}</td>
                  <td>
                    <div
                      className={`schedule-status-container ${schedule.status === 'Completed'
                        ? 'status-completed'
                        : schedule.status === 'Pending'
                          ? 'status-pending'
                          : 'status-in-progress'
                        }`}
                    >
                      {schedule.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
