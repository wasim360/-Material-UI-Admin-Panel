export interface IUserLis {
  notes: string;
  status: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  deleted_at: null | string;
  id: number;
  username: string;
  email: string;
  type: number;
  egnyte_access_token: string;
  logged_at: string;
  profile: IProfileLis;
  physician: null;
  roles: [];
}

export interface IProfileLis {
  notes: string;
  status: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  deleted_at: null | string;
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  address: string;
}
export interface IAuthLis {
  statusCode: number;
  result: IUserLis;
  accessToken: string;
}

export enum IStatusCode {
  BAD_REQUEST = 404,
  SERVER_SIDE_ERROR = 500,
  SUCCESS = 200,
  IS_UPDATED = 201,
}

export class IResponse {}

export interface IUserType {
  id: number | string;
  name: string;
}
