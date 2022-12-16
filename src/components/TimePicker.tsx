import React, { useState } from 'react'

interface IProps {
    name?: string;
    label?: string;
    minuteStep?: number;
}
interface IHour {
    hour: string;
    value: number;
}
interface IMinute {
    munite: string;
    value: number;
}

const TimePicker = ({ name = 'time', label = 'Time' , minuteStep=1}: IProps) => {
    const generateHours = function (): IHour[] {

        const hours: IHour[] = [];

        for (let i = 0; i <= 24; i++) {
            let zero = ''
            if (i <= 9) {
                zero = '0'
            }
            hours.push({ hour: `${zero}${i}`, value: i });
        }

        return hours;
    }
    const generateMunites = function (step = 1): IMinute[] {

        const minutes: IMinute[] = [];

        for (let i = 0; i <= 60; i+=step) {
            let zero = ''
            if (i <= 9) {
                zero = '0'
            }
            minutes.push({ munite: `${zero}${i}`, value: i });
        }

        return minutes;
    }
    const hours = generateHours();
    const minutes = generateMunites(minuteStep);
    const [hour, setHour] = useState<number>(new Date().getHours());
    const [minute, setMinute] = useState<number>(new Date().getMinutes());
    return (
        <div className='time'>
            <div className='time-section'>
                {hours.map((item) => (
                    <span className={hour===item.value ? 'hourActive' : 'hour'} 
                        key={item.value}
                        onClick={() => setHour(item.value)}
                    >{item.hour}</span>
                ))}
            </div>
            <div className='time-section'>
                {minutes.map((item) => (
                    <span className={minute===item.value ? 'hourActive' : 'hour'}
                        key={item.value}
                        onClick={() => setMinute(item.value)}
                    >{item.munite}</span>
                ))}
            </div>
        </div>
    )
}

export default TimePicker