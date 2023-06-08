import classNames from "classnames";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import FormSubmitButton from "../../../../../../../components/form-submit-button/form-submit-button";
import Heading from "../../../../../../../components/heading/heading";
import { ChevronRightIcon } from "../../../../../../../icons/chevron-right.icon";
import {
  useGetAvailableSecurityAttributesQuery,
  useSetSecurityPolicyAttributesMutation,
} from "../../../../../../../store/api/slices/security/security.api";

interface EditSecurityPolicyAttributesCardProps {
  policyId: string;
  initialAttributes: string[];
}

export function EditSecurityPolicyAttributesCard({
  policyId,
  initialAttributes,
}: EditSecurityPolicyAttributesCardProps) {
  const { data, isSuccess } = useGetAvailableSecurityAttributesQuery();
  const [updateAttributes, result] = useSetSecurityPolicyAttributesMutation();
  const [attributes, setAttributes] = useState(
    () => new Set(initialAttributes)
  );

  if (!isSuccess || !data) {
    return <></>;
  }

  const removedAttributes = initialAttributes.filter((a) => !attributes.has(a));
  const addedAttributes = data.filter((a) => !initialAttributes.includes(a));

  return (
    <Card>
      <form
        onSubmit={(event) => {
          updateAttributes({
            policyId,
            attributes: [...attributes.values()],
          });
          event.preventDefault();
        }}
      >
        <Heading level={2} className={classNames("mt-0", "text-xl")}>
          <FormattedMessage id="security-policy-details.edit-attributes.attributes" />
        </Heading>
        {[...data].map((attribute) => (
          <SecurityAttribute
            key={attribute}
            attribute={attribute}
            state={attributes.has(attribute)}
            onChange={(attribute, state) => {
              if (state) {
                const nextAttributes = new Set(attributes);
                nextAttributes.add(attribute);
                setAttributes(nextAttributes);
              } else {
                const nextAttributes = new Set(attributes);
                nextAttributes.delete(attribute);
                setAttributes(nextAttributes);
              }
            }}
          />
        ))}
        <div className={classNames("flex", "mt-4")}>
          <div>
            <Heading level={3} className={classNames("text-lg")}>
              <FormattedMessage id="security-policy-details.edit-attributes.attributes.summary" />
            </Heading>
            <ul className={classNames("[&>li]:ml-2", "[&>li]:text-sm")}>
              <li>
                <FormattedMessage
                  id="security-policy-details.edit-attributes.attributes.removed-attributes"
                  values={{ count: removedAttributes.length }}
                />
              </li>
              <li>
                <FormattedMessage
                  id="security-policy-details.edit-attributes.attributes.added-attributes"
                  values={{ count: addedAttributes.length }}
                />
              </li>
            </ul>
          </div>
          <div className={classNames("ml-auto", "flex", "flex-col")}>
            <FormSubmitButton
              disabled={
                removedAttributes.length === 0 && addedAttributes.length === 0
              }
              className={classNames("mt-auto")}
              isLoading={result.isLoading}
            >
              Speichern
            </FormSubmitButton>
          </div>
        </div>
      </form>
    </Card>
  );
}

interface SecurityAttributeProps {
  attribute: string;
  state: boolean;
  onChange: (attribute: string, state: boolean) => void;
}

function SecurityAttribute({
  attribute,
  state,
  onChange,
}: SecurityAttributeProps) {
  const segments = attribute.split(":");

  return (
    <label
      className={classNames(
        "flex",
        "items-center",
        "border",
        "border-black/30",
        "pl-4",
        "pr-2",
        "my-1",
        "py-2",
        "hover:bg-black/5"
      )}
    >
      {segments.map((segment, index) => (
        <span key={index} className={classNames("flex", "items-center")}>
          {index !== 0 && (
            <ChevronRightIcon
              className={classNames("w-4", "h-4", "fill-neutral-500", "mx-1")}
            />
          )}
          {segment}
        </span>
      ))}
      <input
        checked={state}
        onChange={() => onChange(attribute, !state)}
        type="checkbox"
        className={classNames(
          "w-4",
          "h-4",
          "text-blue-600",
          "bg-gray-100",
          "border-gray-300",
          "rounded",
          "focus:ring-blue-500",
          "focus:ring-2",
          "ml-auto"
        )}
      />
    </label>
  );
}
