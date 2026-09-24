export interface LeaveData {
  leaveType: string;
  from: string;
  to: string;
  comment: string;
}
export const validLeave: LeaveData = {
  leaveType: 'CAN - Vacation',
  from: '2026-12-15',
  to: '2026-12-16',
  comment: 'Portfolio automation leave request',
};
