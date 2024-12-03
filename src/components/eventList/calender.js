import 'dayjs/locale/zh-cn';

import { Calendar, Col, Row, Select } from 'antd';
import dayjs from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import React, { useState } from 'react';

import Button from '../button/button';
dayjs.extend(dayLocaleData);

const App = ({ setCalender }) => {
  const [currentDate, setCurrentDate] = useState(); // State to manage the current date

  const onPanelChange = (value) => {
    console.log(value);
    setCurrentDate(value); // Update currentDate state
    setCalender(value.format('YYYY-MM-DD'));
  };

  const onDateSelect = async (date) => {
    console.log(date);
    const formattedDate = date.toISOString().split('T')[0];
    console.log("formattedDate", formattedDate);
    setCalender(formattedDate);
  };

  const handleReset = () => {
    const today = dayjs();
    setCurrentDate(today);
    setCalender('');
  };



  return (
    <div>
      <div  className ="calender-details">
        <Calendar
          fullscreen={false}
          value={currentDate} // Set the calendar value to currentDate
          headerRender={({ value, onChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];
            let current = value.clone();
            const localeData = value.localeData();
            const months = [];

            for (let i = 0; i < 12; i++) {
              current = current.month(i);
              months.push(localeData.monthsShort(current));
            }

            for (let i = start; i < end; i++) {
              monthOptions.push(
                <Select.Option key={i} value={i} className="month-item">
                  {months[i]}
                </Select.Option>,
              );
            }

            const year = value.year();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>,
              );
            }

            return (
              <div className='calender-event'>

                <Row style={{ gap: "5px" }}>
                  <Col lg="4" md="4" className='mb-3'>
                    <Select
                      size="small"
                      popupMatchSelectWidth={false}
                      value={value.month()}
                      onChange={(newMonth) => {
                        const now = value.clone().month(newMonth);
                        onChange(now);
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>

                  <Col lg="4" md="4" className='mb-3'>
                    <Select
                      size="small"
                      popupMatchSelectWidth={false}
                      className="my-year-select"
                      value={year}
                      onChange={(newYear) => {
                        const now = value.clone().year(newYear);
                        onChange(now);
                      }}
                    >
                      {options}
                    </Select>
                  </Col>

                  <Col lg="4" md="4" className='mb-3'>
                    <Button name="Reset" className='reset-button' type='Reset' onClick={handleReset} />


                  </Col>
                </Row>
              </div>
            );
          }}
          onPanelChange={onPanelChange}
          onSelect={onDateSelect} // Call API on date selection
        />
      </div>
    </div>
  );
};

export default App;
