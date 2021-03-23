import { DataService } from "../services/data.service";
import { CalendarComponent } from "./calendar.component"

describe('Calendar component', () => {
    it('getDate() => good date', () => {
        let dataService: DataService;
        const comp = new CalendarComponent(dataService);
        const dateString = comp.getDate(new Date('19 January 2000'));
        expect(dateString).toBe('2000-01-19');
    });
    it('getDayFromMonday() => good date', () => {
        let dataService: DataService;
        const comp = new CalendarComponent(dataService);
        const dateMonday = comp.getDayFromMonday(new Date('3 March 2021'), 0);
        expect(dateMonday).toEqual(new Date('1 March 2021'))
    });
})