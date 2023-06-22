import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import { Checkbox } from "../../../../../../../components/checkbox/checkbox";
import Heading from "../../../../../../../components/heading/heading";
import { PaginationToolbar } from "../../../../../../../components/pagination-toolbar/pagination-toolbar";
import { CloseIcon } from "../../../../../../../icons/close.icon";
import { useGetSecurityPolicesQuery } from "../../../../../../../store/api/resources/security-policies/security-policies.api";
import { SecurityPolicyDto } from "../../../../../../../store/api/resources/security-policies/security-policies.types";
import {
  useAttachSecurityPolicyToUserMutation,
  useDetachSecurityPolicyFromUserMutation,
} from "../../../../../../../store/api/resources/users/users.api";

export interface EditSecurityPoliciesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attachedSecurityPolicies: SecurityPolicyDto[];
  userId: string;
}

export function EditSecurityPoliciesDialog({
  isOpen,
  onClose,
  attachedSecurityPolicies,
  userId,
}: EditSecurityPoliciesDialogProps) {
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const selectedIds = attachedSecurityPolicies.map((policy) => policy.id);
  const { data, isSuccess } = useGetSecurityPolicesQuery({
    skip,
    limit,
  });
  const [detachPolicy] = useDetachSecurityPolicyFromUserMutation();
  const [attachPolicy] = useAttachSecurityPolicyToUserMutation();

  return (
    <Dialog open={isOpen} onClose={onClose} className="absolute inset-0">
      <div className="flex h-full w-full flex-col items-center justify-center bg-black/30">
        <Dialog.Panel className="max-h-[90%] w-full max-w-3xl">
          <Card className="flex h-full w-full max-w-5xl flex-col">
            <div className="mb-4 flex items-center">
              <Heading level={2} className="w-full">
                <FormattedMessage id="admin.users.security-policies.edit"></FormattedMessage>
              </Heading>
              <button className="ml-auto" onClick={() => onClose()}>
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            {isSuccess && data && (
              <>
                <ul className="mb-auto flex flex-col gap-1 overflow-y-auto">
                  {data.items.map((policy) => (
                    <li
                      key={policy.id}
                      className="flex items-center rounded-sm border border-black/30 py-2 pl-4 pr-2 hover:bg-black/5"
                    >
                      <label className="flex w-full items-center">
                        {policy.name}
                        <Checkbox
                          onChange={() => {
                            if (selectedIds.includes(policy.id)) {
                              detachPolicy({
                                policyId: policy.id,
                                userId,
                              });
                            } else {
                              attachPolicy({
                                policyId: policy.id,
                                userId,
                              });
                            }
                          }}
                          checked={selectedIds.includes(policy.id)}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
                <PaginationToolbar
                  className="mt-8"
                  skip={skip}
                  limit={limit}
                  total={data.total}
                  onChange={setSkip}
                />
              </>
            )}
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
