import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../../common/common.service';
import {
  IDeleteReportRequest,
  IGetReportsRequest,
  INewReport,
  IReport,
  IReportRequest,
} from './interfaces/report.interface';
import Report from './report.entity';
import { CommonIsSuccessResponse, GetDataResponse } from '../../common/types';

@Injectable()
export class ReportService extends CommonService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {
    super(reportRepository);
  }
  async createReport(
    request: IReportRequest<INewReport>,
  ): Promise<CommonIsSuccessResponse> {
    const { report } = request;
    try {
      await this.save<INewReport, IReport>(report);
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async deleteReport(
    request: IDeleteReportRequest,
  ): Promise<CommonIsSuccessResponse> {
    try {
      const { id } = request;
      await this.remove(id);
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async updateReport(
    request: IReportRequest<IReport>,
  ): Promise<CommonIsSuccessResponse> {
    try {
      const {
        report: { id, entityId, userId, description, subject },
      } = request;
      const report = await this.findOneByCriteria<IReport>({
        where: { id },
      });

      if (!report) {
        throw new Error();
      }

      await this.save<IReport, IReport>({
        ...report,
        ...(entityId ? { entityId } : {}),
        ...(subject ? { subject } : {}),
        ...(userId ? { userId } : {}),
        ...(description ? { description } : {}),
      });
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async getReports(
    request: IGetReportsRequest,
  ): Promise<GetDataResponse<IReport>> {
    const { reportId, page, perPage } = request;
    const skip = perPage ? perPage * (page - 1) : 1;
    try {
      const [reports, totalCount] = await this.findAndCountByCriteria<IReport>({
        where: {
          ...(reportId ? { id: reportId } : {}),
        },
        ...(page ? { skip } : {}),
        ...(perPage ? { take: perPage } : {}),
      });
      return {
        data: reports,
        pageInfo: {
          page,
          perPage,
          totalCount,
          totalPageCount: Math.ceil(totalCount / (perPage ? perPage : 1)),
        },
      };
    } catch (error) {
      return {
        data: [],
        pageInfo: {
          page,
          perPage,
          totalCount: 0,
          totalPageCount: 0,
        },
        error,
      };
    }
  }
}
