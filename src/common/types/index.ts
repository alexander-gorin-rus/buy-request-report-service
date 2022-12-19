export interface IPageInfo {
  page: number;
  perPage: number;
  totalCount: number;
  totalPageCount: number;
}

export interface IError {
  code: string;
  message: Array<string>;
}

export type CommonIsSuccessResponse = ICommonSuccess | ICommonFailure;

interface ICommonSuccess {
  isSuccess: true;
}

interface ICommonFailure {
  isSuccess: false;
  error: IError;
}

export type GetDataResponse<D> = ISuccessData<D> | IFailureData;

interface ISuccessData<D> {
  data: D[];
  pageInfo: IPageInfo;
}

interface IFailureData {
  data: [];
  pageInfo: IPageInfo;
  error: IError;
}
