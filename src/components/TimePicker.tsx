import React, { useState } from 'react'

interface IProps {
    name?: string;
    label?: string;
    minuteStep?: number;
    disabledTimes?: IDisabletime[]
}

interface IDisabletime {
    startTime: string;
    endTime: string;
}
interface IHour {
    hour: string;
    value: number;
}
interface IMinute {
    munite: string;
    value: number;
}

const TimePicker = ({ name = 'time', label = 'Time' , minuteStep=1, disabledTimes}: IProps) => {
    const generateHours = function (): IHour[] {

        const hours: IHour[] = [];

        for (let i = 0; i < 24; i++) {
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
    const genetateDisabledTimesSet = () => {
        let disabledTimesSet = new Set();
        disabledTimes?.forEach(d => {
            let startTime = (parseInt(d.startTime.slice(0,2)) * 60) + (parseInt(d.startTime.slice(3)))
            let endTime = (parseInt(d.endTime.slice(0,2)) * 60) + (parseInt(d.endTime.slice(3)))

            for(let i=startTime; i<=endTime; i++) {
                disabledTimesSet.add(i);
            }
        })
        return disabledTimesSet;
    }

    const hours = generateHours();
    const minutes = generateMunites(minuteStep);
    const disabledTimesSet = genetateDisabledTimesSet();
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
                    // <span className={minute===item.value ? 'hourActive' : 'hour'}
                    <span className={disabledTimesSet.has((hour*60)+item.value) ? 'time-disabled' 
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