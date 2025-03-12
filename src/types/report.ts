export const ReportDepartment = '診療科/担当';
export const ReportTimeline = '時系列';

export type Report = typeof ReportDepartment | typeof ReportTimeline;

export const reportOrders = [ReportDepartment, ReportTimeline];
