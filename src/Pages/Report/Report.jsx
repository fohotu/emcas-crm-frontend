import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import JobCalendar from './JobCalendar';


const Report = () => (
  <>
    <Link to="/report/job">
      <Button>
        Job Clendar
      </Button>
    </Link>
    <Link to="/report/self">
      <Button>
        Self Report
      </Button>
    </Link>
    <JobCalendar />
  </>
);

export default Report;