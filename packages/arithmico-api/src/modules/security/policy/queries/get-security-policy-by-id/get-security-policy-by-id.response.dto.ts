export class GetSecurityPolicyByIdResponseDto {
  id: string;
  name: string;
  attributes: string[];
  principals: {
    total: number;
    users: number;
    groups: number;
  };
}
