import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";
import { AddIcon } from "../../../../../../../icons/add.icon";
import { DeleteIcon } from "../../../../../../../icons/delete.icon";
import { useGetSecurityPoliciesAttachedToUserQuery } from "../../../../../../../store/api/resources/users/users.api";

export interface AttachedSecurityPoliciesCardProps {
  userId: string;
}

export function AttachedSecurityPoliciesCard({
  userId,
}: AttachedSecurityPoliciesCardProps) {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetSecurityPoliciesAttachedToUserQuery({
    userId,
  });

  return (
    <Card className="">
      <div className="mb-4 flex">
        <Heading level={2}>Sicherheitsrichtlinien</Heading>
        <button className="ml-auto inline-flex items-center justify-center rounded-sm bg-indigo-600 py-2 pl-2 pr-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300      ">
          <AddIcon className="mr-2 h-6 w-6 fill-white" />
          Hinzufügen
        </button>
      </div>
      <ul>
        {isSuccess &&
          data &&
          data.map((policy) => (
            <li
              key={policy.id}
              className=" my-1 flex items-center rounded-sm border border-black/30 py-2 pl-4 pr-2 hover:bg-black/5"
              onClick={() =>
                navigate(`/administration/security-policies/${policy.id}`)
              }
            >
              {policy.name}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className="ml-auto flex border fill-black/30 hover:fill-black"
              >
                <DeleteIcon className="h-6 w-6" />
              </button>
              <Link
                to={`/administration/security-policies/${policy.id}`}
                className="sr-only"
              >
                Details
              </Link>
            </li>
          ))}
      </ul>
    </Card>
  );
}
