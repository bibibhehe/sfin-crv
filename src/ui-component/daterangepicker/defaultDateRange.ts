import { endOfDay, startOfDay, subDays, addDays } from 'date-fns';
import defaultSettings from 'defaultSetting';

export interface DateRange {
  beginDate: string;
  endDate: String;
  beginSettleDate: string;
  endSettleDate: String;
}
export interface DateRangeSettleDate {
  beginSettleDate: string;
  endSettleDate: String;
}
const defaultDateRange = (): DateRange => {
  const nextday = addDays(new Date(), 1);
  const dateRange: DateRange = {
    beginDate: subDays(startOfDay(new Date()), defaultSettings.historyDays).toISOString(),
    endDate: endOfDay(nextday).toISOString(),
    beginSettleDate: subDays(startOfDay(new Date()), defaultSettings.historyDays).toISOString(),
    endSettleDate: endOfDay(nextday).toISOString()
  };
  return dateRange;
};
export default defaultDateRange;
