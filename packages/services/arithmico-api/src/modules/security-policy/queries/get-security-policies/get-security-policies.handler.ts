import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { SecurityPolicyRepository } from '../../../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { SecurityPolicyAttachmentType } from '../../../../infrastructure/database/schemas/security-policy-attachment/security-policy-attachment.schema';
import { GetSecurityPoliciesQuery } from './get-security-policies.query';
import {
  GetSecurityPoliciesResponseDtoWithIsAttached,
  GetSecurityPoliciesResponseDtoWithPrincipals,
} from './get-security-policies.response.dto';

@QueryHandler(GetSecurityPoliciesQuery)
export class GetSecurityPoliciesHandler
  implements IQueryHandler<GetSecurityPoliciesQuery>
{
  constructor(private securityPolicyRepository: SecurityPolicyRepository) {}

  async execute(
    query: GetSecurityPoliciesQuery,
  ): Promise<
    | PagedResponse<GetSecurityPoliciesResponseDtoWithPrincipals>
    | PagedResponse<GetSecurityPoliciesResponseDtoWithIsAttached>
  > {
    if (query.checkAttachedToUser && query.checkAttachedToUserGroup) {
      throw new BadRequestException(
        'cannot perform two checks at the same time',
      );
    }

    if (query.checkAttachedToUser) {
      return this.getSecurityPoliciesWithIsAttachedToUser(
        query.skip,
        query.limit,
        query.checkAttachedToUser,
      );
    }

    if (query.checkAttachedToUserGroup) {
      return this.getSecurityPoliciesWithIsAttachedToUserGroup(
        query.skip,
        query.limit,
        query.checkAttachedToUserGroup,
      );
    }

    return this.getSecurityPoliciesWithPrincipals(query.skip, query.limit);
  }

  async getSecurityPoliciesWithIsAttachedToUserGroup(
    skip: number,
    limit: number,
    groupId: string,
  ): Promise<PagedResponse<GetSecurityPoliciesResponseDtoWithIsAttached>> {
    const result =
      await this.securityPolicyRepository.getSecurityPoliciesWithAttachmentCheck(
        SecurityPolicyAttachmentType.Group,
        groupId,
        skip,
        limit,
      );

    return {
      items: result.items.map((securityPolicy) => ({
        id: securityPolicy._id,
        name: securityPolicy.name,
        readonly: securityPolicy.readonly,
        createdAt: securityPolicy.createdAt,
        attributes: securityPolicy.attributes,
        isAttached: securityPolicy.isAttachedTo,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }

  async getSecurityPoliciesWithIsAttachedToUser(
    skip: number,
    limit: number,
    userId: string,
  ): Promise<PagedResponse<GetSecurityPoliciesResponseDtoWithIsAttached>> {
    const result =
      await this.securityPolicyRepository.getSecurityPoliciesWithAttachmentCheck(
        SecurityPolicyAttachmentType.User,
        userId,
        skip,
        limit,
      );

    return {
      items: result.items.map((securityPolicy) => ({
        id: securityPolicy._id,
        name: securityPolicy.name,
        readonly: securityPolicy.readonly,
        createdAt: securityPolicy.createdAt,
        attributes: securityPolicy.attributes,
        isAttached: securityPolicy.isAttachedTo,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }

  async getSecurityPoliciesWithPrincipals(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<GetSecurityPoliciesResponseDtoWithPrincipals>> {
    const result = await this.securityPolicyRepository.getSecurityPolicies(
      skip,
      limit,
    );

    return {
      items: result.items.map((policy) => ({
        id: policy._id,
        name: policy.name,
        readonly: policy.readonly,
        attributes: policy.attributes,
        principals: policy.principals,
        createdAt: policy.createdAt,
      })),
      skip: result.skip,
      limit: result.limit,
      total: result.total,
    };
  }
}
