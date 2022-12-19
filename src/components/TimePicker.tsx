import React, { useState } from 'react'
import { generateDisabledHoursSet, generateHours, generateMunites, genetateDisabledMinutesSet } from '../helpers/generateTimes';
import { IDisabletime } from '../helpers/types';

interface IProps {
    name?: string;
    label?: string;
    minuteStep?: number;
    disabledTimes?: IDisabletime[];
    setTime: (time: string) => void;
}

const TimePicker = ({ name = 'time', label = 'Time', minuteStep = 1, disabledTimes = [], setTime }: IProps) => {
    const hours = generateHours();
    const minutes = generateMunites(minuteStep);
    const disabledMunitesSet = genetateDisabledMinutesSet(disabledTimes!);
    const disabledHoursSet = generateDisabledHoursSet(disabledMunitesSet);
    const [hour, setHour] = useState<number>(new Date().getHours());
    const [minute, setMinute] = useState<number>(new Date().getMinutes());
    const [timepickerVisibile, setTimepickerVisibile] = useState(false);
    const [unavalaibleError, setUnavalaibleError] = useState(false);

    const handleSelectHour = (hour: number) => {
        setUnavalaibleError(false);
        if (disabledHoursSet.has(hour)) {
            setUnavalaibleError(true);
        }
        else {
            setHour(hour)
        }
    }
    const handleSelectMinute = (minute: number) => {
        setUnavalaibleError(false);
        if (disabledMunitesSet.has((hour * 60) + minute)) {
            setUnavalaibleError(true);
        }
        else {
            try {
                setMinute(minute)

            } catch(err) {

            } finally {
                let time = ((hour > 9) ? hour : "0" + hour) + " : " + ((minute > 9) ? minute : "0" + minute);
                setTime(time);
            }

            // setTimepickerVisibile(!timepickerVisibile);
            // handleSetTime();
        }
    }

    const handleSetTime = () => {
        setUnavalaibleError(false);
        if (disabledHoursSet.has(hour) || disabledMunitesSet.has((hour * 60) + minute)) {
            setUnavalaibleError(true);
        }
        else {
            let time = ((hour > 9) ? hour : "0" + hour) + " : " + ((minute > 9) ? minute : "0" + minute);
            setTime(time);
            setTimepickerVisibile(false);
        }
    }
    return (
        <div>
            <small style={{ marginTop: '-20px', display: unavalaibleError ? 'block' : 'none' }}>Slected time is not available</small>
            <button className='timepicker-btn' onClick={() => setTimepickerVisibile(!timepickerVisibile)}>
                {(disabledHoursSet.has(hour) || disabledMunitesSet.has(minute))
                    ? label
                    : ((hour > 9) ? hour : "0" + hour) + " : " + ((minute > 9) ? minute : "0" + minute)
                }
                {/* (hour > 9 ? hour : "0"+hour : minute > 9 ? minute : "0"+minute) */}
            </button>
            <div className='time' style={{ display: timepickerVisibile ? 'flex' : 'none' }}>
                <div className='time-section'>
                    {hours.map((item) => (
                        // <span className={hour===item.value ? 'hourActive' : 'hour'} 
                        <span className={disabledHoursSet.has(item.value) ? 'time-disabled'
                            : hour === item.value ? 'hourActive' : 'hour'}
                            key={item.value}
                            onClick={() => handleSelectHour(item.value)}
                        >{item.hour}</span>
                    ))}
                </div>
                <div className='time-section'>
                    {minutes.map((item) => (
                        // <span className={minute===item.value ? 'hourActive' : 'hour'}
                        <span className={disabledMunitesSet.has((hour * 60) + item.value) ? 'time-disabled'
                            : minute === item.value ? 'hourActive' : 'hour'
                        }
                            key={item.value}
                            onClick={() => handleSelectMinute(item.value)}
                        >{item.munite}</span>
                    ))}
                </div>
                <button className='timepicker-btn' onClick={handleSetTime}>
                    Ok
                </button>
            </div>
        </div>
    )
}

export default TimePicker