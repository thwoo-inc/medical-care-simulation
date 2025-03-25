export const ReportDepartment = '診療科/担当';
export const ReportTimeline = '時系列';
export const ReportMemo = '振り返りメモ';

export type Report = typeof ReportDepartment | typeof ReportTimeline | typeof ReportMemo;

export const reportOrders = [ReportDepartment, ReportTimeline, ReportMemo];
