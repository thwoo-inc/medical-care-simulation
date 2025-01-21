export const ReportDetail = '処置詳細';
export const ReportTimeline = '時系列';

export type Report = typeof ReportDetail | typeof ReportTimeline;

export const reportOrders = [ReportDetail, ReportTimeline];
