export interface INewReport {
  entityId: string;
  userId: string;
  subject: string;
  description: string;
}

export interface IReport extends INewReport {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IReportRequest<R> {
  report: R;
}

export interface IGetReportsRequest {
  reportId?: string;
  page?: number;
  perPage?: number;
}

export interface IDeleteReportRequest {
  id: string;
}
