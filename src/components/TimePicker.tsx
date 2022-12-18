import React, { useState } from 'react'
import { generateDisabledHoursSet, generateHours, generateMunites, genetateDisabledMinutesSet } from '../helpers/generateTimes';
import { IDisabletime } from '../helpers/types';

interface IProps {
    name?: string;
    label?: string;
    minuteStep?: number;
    disabledTimes?: IDisabletime[]
}

const TimePicker = ({ name = 'time', label = 'Time' , minuteStep=1, disabledTimes=[]}: IProps) => {
    
    const hours = generateHours();
    const minutes = generateMunites(minuteStep);
    const disabledMunitesSet = genetateDisabledMinutesSet(disabledTimes!);
    const disabledHoursSet = generateDisabledHoursSet(disabledMunitesSet);
    const [hour, setHour] = useState<number>(new Date().getHours());
    const [minute, setMinute] = useState<number>(new Date().getMinutes());
    return (
        <div className='time'>
            <div className='time-section'>
                {hours.map((item) => (
                    // <span className={hour===item.value ? 'hourActive' : 'hour'} 
                    <span className={disabledHoursSet.has(item.value) ? 'time-disabled'
                        : hour===item.value ? 'hourActive' : 'hour'} 
                        key={item.value}
                        onClick={() => setHour(item.value)}
                    >{item.hour}</span>
                ))}
            </div>
            <div className='time-section'>
                {minutes.map((item) => (
                    // <span className={minute===item.value ? 'hourActive' : 'hour'}
                    <span className={disabledMunitesSet.has((hour*60)+item.value) ? 'time-disabled' 
                            : minute===item.value ? 'hourActive' : 'hour' 
                        }
                        key={item.value}
                        onClick={() => setMinute(item.value)}
                    >{item.munite}</span>
                ))}
            </div>
        </div>
    )
}

export default TimePicker