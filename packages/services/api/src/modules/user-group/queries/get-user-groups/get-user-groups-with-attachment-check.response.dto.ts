import { UserGroupDto } from '../../common/user-group.dto';

export class GetUserGroupsWithAttachmentCheckResponseDto extends UserGroupDto {
  isAttached: boolean;
}
