import { Injectable } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Injectable({
  providedIn: 'root',
})
export class DatepickerService {
  /**
   * Returns today's date at local midnight.
   * Use as minDate to disable all past days.
   */
  getTodayMinDate(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  /**
   * Opens a date picker if it exists
   * @param datepicker - The MatDatepicker instance to open
   */
  openDatePicker(datepicker: MatDatepicker<Date> | null | undefined): void {
    if (datepicker) {
      datepicker.open();
    }
  }

  /**
   * Opens a date range picker if it exists
   * @param dateRangePicker - The MatDateRangePicker instance to open
   */
  openDateRangePicker(dateRangePicker: any | null | undefined): void {
    if (dateRangePicker && typeof dateRangePicker.open === 'function') {
      dateRangePicker.open();
    }
  }
}

