import classNames from "classnames";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { BackButtonLink } from "../../../../../../../components/back-button-link/back-button-link";
import { Card } from "../../../../../../../components/card/card";
import { Checkbox } from "../../../../../../../components/checkbox/checkbox";
import FormSubmitButton from "../../../../../../../components/form-submit-button/form-submit-button";
import Heading from "../../../../../../../components/heading/heading";
import {
  useGetAvailableSecurityAttributesQuery,
  useSetSecurityPolicyAttributesMutation,
} from "../../../../../../../store/api/resources/security-policies/security-policies.api";
import { SecurityAttributeVisualization } from "../../../components/security-attribute-visualization";

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
  const navigate = useNavigate();
  useEffect(() => {
    if (result.isSuccess) {
      navigate(-1);
    }
  }, [result, navigate]);

  if (!isSuccess || !data) {
    return <></>;
  }

  const removedAttributes = initialAttributes.filter((a) => !attributes.has(a));
  const addedAttributes = data.filter((a) => !initialAttributes.includes(a));

  return (
    <Card className={classNames("max-w-5xl")}>
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
          <FormattedMessage id="admin.security-policies.attributes" />
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
        <div className={classNames("flex", "flex-col")}>
          <div className={classNames("my-4")}>
            <Heading level={3} className={classNames("text-lg")}>
              <FormattedMessage id="admin.security-policies.edit-attributes.summary" />
            </Heading>
            <ul className={classNames("[&>li]:ml-2", "[&>li]:text-sm")}>
              <li>
                <FormattedMessage
                  id="admin.security-policies.edit-attributes.removed-attributes"
                  values={{ count: removedAttributes.length }}
                />
              </li>
              <li>
                <FormattedMessage
                  id="admin.security-policies.edit-attributes.added-attributes"
                  values={{ count: addedAttributes.length }}
                />
              </li>
            </ul>
          </div>
          <div className={classNames("flex")}>
            <BackButtonLink
              to={`/administration/security-policies/${policyId}`}
            />

            <FormSubmitButton
              disabled={
                removedAttributes.length === 0 && addedAttributes.length === 0
              }
              className={classNames("ml-auto")}
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
      <SecurityAttributeVisualization securityAttribute={attribute} />
      <Checkbox checked={state} onChange={() => onChange(attribute, !state)} />
    </label>
  );
}
