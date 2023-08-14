import { from } from 'rxjs';

export interface Time {
  number: number;
  from: string;
  to: string;
}

export const TIMES: Time[] = [
  { number: 1, from: '09:30', to: '09:50' },
  { number: 2, from: '09:55', to: '10:15' },
  { number: 3, from: '10:20', to: '10:40' },
  { number: 4, from: '10:45', to: '11:05' },
  { number: 5, from: '11:10', to: '11:30' },
  { number: 6, from: '11:35', to: '11:55' },
  //{ number: 7, from: '12:00', to: '13:15' }, mittagessen, index/number is used
  { number: 8, from: '13:20', to: '13:40' },
  { number: 9, from: '13:45', to: '14:05' },
  { number: 10, from: '14:10', to: '14:30' },
  { number: 11, from: '14:35', to: '14:55' },
  { number: 12, from: '15:00', to: '15:20' },
];
