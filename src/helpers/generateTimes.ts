import { IDisabletime, IHour, IMinute } from "./types";

export const generateHours = function (): IHour[] {

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

export const generateMunites = function (step = 1): IMinute[] {

    const minutes: IMinute[] = [];

    for (let i = 0; i < 60; i+=step) {
        let zero = ''
        if (i <= 9) {
            zero = '0'
        }
        minutes.push({ munite: `${zero}${i}`, value: i });
    }

    return minutes;
}

export const genetateDisabledMinutesSet = (disabledTimes:IDisabletime[]) => {
    let disabledTimesSet = new Set<number>();
    if(disabledTimes.length === 0) return disabledTimesSet;
    disabledTimes?.forEach(d => {
        let startTime = (parseInt(d.startTime.slice(0,2)) * 60) + (parseInt(d.startTime.slice(3)))
        let endTime = (parseInt(d.endTime.slice(0,2)) * 60) + (parseInt(d.endTime.slice(3)))

        for(let i=startTime; i<=endTime; i++) {
            disabledTimesSet.add(i);
        }
    })
    return disabledTimesSet;
}

export const generateDisabledHoursSet = (disabledMunitesSet: Set<number>) => {
    let disabledHoursSet = new Set<number>();
    for(let h = 0; h< 24; h++) {
        let disabled = true;
        for(let m = 0; m<60 ; m++) {
            if(!disabledMunitesSet.has((h*60) + m)) {
                disabled = false;
                break;
            }
        }
        if(disabled) {
            disabledHoursSet.add(h);
        }
    }
    return disabledHoursSet;
}