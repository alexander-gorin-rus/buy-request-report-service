import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  IDeleteReportRequest,
  IGetReportsRequest,
  IReportRequest,
  IReport,
  INewReport,
} from './interfaces/report.interface';
import { ReportService } from './report.service';
import { CommonIsSuccessResponse, GetDataResponse } from '../../common/types';

@Controller()
export class ReportController {
  constructor(private reportService: ReportService) {}

  @GrpcMethod('ReportService')
  async createReport(
    request: IReportRequest<INewReport>,
  ): Promise<CommonIsSuccessResponse> {
    return await this.reportService.createReport(request);
  }

  @GrpcMethod('ReportService')
  async deleteReport(
    request: IDeleteReportRequest,
  ): Promise<CommonIsSuccessResponse> {
    return await this.reportService.deleteReport(request);
  }

  @GrpcMethod('ReportService')
  async updateReport(
    request: IReportRequest<IReport>,
  ): Promise<CommonIsSuccessResponse> {
    return await this.reportService.updateReport(request);
  }

  @GrpcMethod('ReportService')
  async getReports(
    request: IGetReportsRequest,
  ): Promise<GetDataResponse<IReport>> {
    return await this.reportService.getReports(request);
  }
}
