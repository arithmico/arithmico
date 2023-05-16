import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SecurityPolicyAttachment,
  SecurityPolicyAttachmentDocument,
} from '../schemas/security-policy-attachment/security-policy-attachment.schema';
import {
  SecurityPolicy,
  SecurityPolicyDocument,
} from '../schemas/security-policy/security-policy.schema';

@Injectable()
export class SecurityPolicyRepository {
  constructor(
    @InjectModel(SecurityPolicy.name)
    private securityPolicyModel: Model<SecurityPolicyDocument>,

    @InjectModel(SecurityPolicyAttachment.name)
    private securityPolicyAttachmentModel: Model<SecurityPolicyAttachmentDocument>,
  ) {}

  async findById(policyId: string): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel.findById(policyId);
  }

  async findByIdOrThrow(policyId: string): Promise<SecurityPolicy> {
    const securityPolicyDocument = this.findById(policyId);
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async findManyByIds(policyIds: string[]): Promise<SecurityPolicy[]> {
    return this.securityPolicyModel.find({
      _id: {
        $in: policyIds,
      },
    });
  }

  async addAttributes(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel.findOneAndUpdate(
      { _id: policyId },
      {
        $addToSet: {
          attributes: {
            $each: attributes,
          },
        },
      },
      { new: true },
    );
  }

  async addAttributesOrThrow(policyId: string, attributes: string[]) {
    const securityPolicyDocument = this.addAttributes(policyId, attributes);
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }

  async removeAttributes(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument | null> {
    return this.securityPolicyModel.findOneAndUpdate(
      {
        _id: policyId,
      },
      {
        $pull: {
          attributes: {
            $each: attributes,
          },
        },
      },
      {
        new: true,
      },
    );
  }

  async removeAttributesFromOrThrow(
    policyId: string,
    attributes: string[],
  ): Promise<SecurityPolicyDocument> {
    const securityPolicyDocument = this.removeAttributes(policyId, attributes);
    if (!securityPolicyDocument) {
      throw new NotFoundException();
    }
    return securityPolicyDocument;
  }
}
