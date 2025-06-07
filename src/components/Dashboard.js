import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [activeMeetingView, setActiveMeetingView] = useState('list');
  const [meetings, setMeetings] = useState([]);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({ agenda: '', date: '', time: '', url: '' });

  useEffect(() => {
    fetch('https://fast-api-bqid.onrender.com/api/meetings/')
      .then(response => response.json())
      .then(data => {
        const meetingsWithStatus = data.map(meeting => ({ ...meeting, status: 'Upcoming' }));
        setMeetings(meetingsWithStatus);
      })
      .catch(error => console.error('Error fetching meetings:', error));
  }, []);

  const handleAddMeeting = () => {
    fetch('https://fast-api-bqid.onrender.com/api/meetings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title: newMeeting.agenda,
        date: newMeeting.date,
        time: newMeeting.time,
        description: newMeeting.url
      }),
    })
      .then(response => response.json())
      .then(data => {
        setMeetings([...meetings, { ...data, completed: false, agenda: data.title, url: data.description, status: 'Upcoming' }]);
        setNewMeeting({ agenda: '', date: '', time: '', url: '' });
        setShowAddMeetingModal(false);
      })
      .catch(error => console.error('Error adding meeting:', error));
  };

  const handleDeleteMeeting = (id) => {
    fetch(`https://fast-api-bqid.onrender.com/api/meetings/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setMeetings(meetings.filter(meeting => meeting.id !== id));
        } else {
           console.error('Failed to delete meeting');
        }
      })
      .catch(error => console.error('Error deleting meeting:', error));
  };

  const handleUpdateMeeting = (id, updatedFields) => {
    fetch(`https://fast-api-bqid.onrender.com/api/meetings/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    })
    .then(response => response.json())
    .then(updatedMeeting => {
      setMeetings(meetings.map(meeting => 
        meeting.id === id ? { ...meeting, ...updatedMeeting, agenda: updatedMeeting.title || meeting.agenda, url: updatedMeeting.description || meeting.url, status: 'Upcoming' } : meeting
      ));
    })
    .catch(error => console.error('Error updating meeting:', error));
  };

  const handleToggleComplete = (meeting) => {
    const updatedFields = { completed: !meeting.completed };
    handleUpdateMeeting(meeting.id, updatedFields);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>TaskMaster</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            📋 Tasks
          </button>
          <button 
            className={`nav-item ${activeTab === 'meetings' ? 'active' : ''}`}
            onClick={() => setActiveTab('meetings')}
          >
            👥 Meetings
          </button>
          <button 
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            📁 Projects
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button">
            ⬅️ Log Out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-actions">
            <button className="add-task-btn">+ New Task</button>
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'tasks' && (
            <div className="tasks-container">
              <h2>My Tasks</h2>
              <div className="task-list">
                <div className="task-item">
                  <input type="checkbox" />
                  <span className="task-title">Complete project proposal</span>
                  <span className="task-date">Due: Today</span>
                </div>
                <div className="task-item">
                  <input type="checkbox" />
                  <span className="task-title">Review team updates</span>
                  <span className="task-date">Due: Tomorrow</span>
                </div>
                <div className="task-item">
                  <input type="checkbox" />
                  <span className="task-title">Schedule team meeting</span>
                  <span className="task-date">Due: Next Week</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'meetings' && (
            <div className="meetings-container">
              <div className="meetings-header">
                <h2>Meetings</h2>
                <button className="add-new-button" onClick={() => setShowAddMeetingModal(true)}>+ Add New</button>
              </div>

              <div className="meetings-tabs">
                <button 
                  className={activeMeetingView === 'list' ? 'active' : ''}
                  onClick={() => setActiveMeetingView('list')}
                >
                  List
                </button>
                <button
                  className={activeMeetingView === 'grid' ? 'active' : ''}
                  onClick={() => setActiveMeetingView('grid')}
                >
                  Grid
                </button>
                <button
                   className={activeMeetingView === 'calendar' ? 'active' : ''}
                   onClick={() => setActiveMeetingView('calendar')}
                >
                  Calendar
                </button>
              </div>
              
              {activeMeetingView === 'list' && (
                <div className="meetings-list">
                  <div className="meetings-list-header">
                    <span></span> 
                    <span className="meeting-agenda">Agenda</span>
                    <span className="meeting-status">Status</span>
                    <span className="meeting-date">Date of meeting</span>
                    <span className="meeting-time">Start Time</span>
                    <span className="meeting-url">Meeting URL</span>
                    <span></span>
                    <span></span>
                  </div>
                  {meetings.map(meeting => (
                    <div key={meeting.id} className={`meeting-item ${meeting.completed ? 'completed' : ''}`}>
                      <input
                        type="checkbox"
                        checked={meeting.completed || false}
                        onChange={() => handleToggleComplete(meeting)}
                        className="meeting-checkbox"
                      />
                      <span className="meeting-agenda">{meeting.agenda}</span>
                      <span className="meeting-status status-upcoming">Upcoming</span>
                      <span className="meeting-date">{meeting.date}</span>
                      <span className="meeting-time">{meeting.time}</span>
                      <a href={meeting.url} target="_blank" rel="noopener noreferrer" className="meeting-url">{meeting.url}</a>
                      <button className="add-icon-button">+</button>
                      <button className="delete-button" onClick={() => handleDeleteMeeting(meeting.id)}>Delete</button>
                    </div>
                  ))}
                </div>
              )}

               {activeMeetingView === 'grid' && (
                 <div className="meetings-grid-view">
                   <h2>Grid View</h2>
                   <p>Grid view content will go here</p>
                 </div>
               )}

               {activeMeetingView === 'calendar' && (
                 <div className="meetings-calendar-view">
                   <h2>Calendar View</h2>
                   <p>Calendar view content will go here</p>
                 </div>
               )}

            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-container">
              <h2>Projects</h2>
              <p>Projects content will go here</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-container">
              <h2>Analytics</h2>
              <p>Analytics content will go here</p>
            </div>
          )}
        </div>
      </main>

      {showAddMeetingModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Meeting</h3>
            <input 
              type="text" 
              placeholder="Agenda"
              value={newMeeting.agenda}
              onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
            />
            <input 
              type="date" 
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
            />
             <input 
              type="time" 
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
            />
             <input 
              type="text"
              placeholder="Meeting URL"
              value={newMeeting.url}
              onChange={(e) => setNewMeeting({...newMeeting, url: e.target.value})}
            />
            <div className="modal-actions">
              <button className="modal-button primary" onClick={handleAddMeeting}>Add Meeting</button>
              <button className="modal-button secondary" onClick={() => setShowAddMeetingModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 