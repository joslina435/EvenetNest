import { BrowserRouter, Routes, Route } from 'react-router'
import Dashboard from '../../features/dashboard/Dashboard'
import Events from '../../features/events/Events'
import EventDetails from '../../features/events/EventDetails'
import EventOverview from '../../features/events/EventOverview'
import EventGuests from '../../features/events/EventGuests'
import Login from '../../features/auth/Login'
import Register from '../../features/auth/Register'
import ProtectedRoutes from '../../components/common/PtotectedRoutes'
import CreateEvent from '../../features/events/CreateEvent'
import EventTasks from '../../features/tasks/EventTasks'
import EventBudget from '../../features/events/EventBudget'
import AppBrandHeader from '../../components/common/AppBrandHeader'

function AppRouter() {
    return (
        <BrowserRouter>
            <AppBrandHeader />
            <Routes>
                <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
                <Route path="/events" element={<ProtectedRoutes><Events /></ProtectedRoutes>} />
                <Route path='/createEvent' element={<ProtectedRoutes><CreateEvent /></ProtectedRoutes>} />

                <Route path="/events/:eventId" element={<ProtectedRoutes><EventDetails /></ProtectedRoutes>}>
                    <Route index element={<EventOverview />} />
                    <Route path="overview" element={<EventOverview />} />
                    <Route path='guests' element={<EventGuests />} />
                    <Route path='tasks' element={<EventTasks />} />
                    <Route path='budget' element={<EventBudget />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/createEvent' element={<CreateEvent />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter