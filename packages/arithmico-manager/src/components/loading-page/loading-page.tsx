import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import LoadingIcon from "../../icons/loading.icon";

export interface LoadingPageProps {
  isLoading: boolean;
  isError: boolean;
}

export function LoadingPage({ isLoading, isError }: LoadingPageProps) {
  return (
    <>
      {isLoading && !isError && (
        <div
          className={classNames(
            "w-full",
            "h-full",
            "flex",
            "justify-center",
            "items-center"
          )}
        >
          <div className={classNames("flex", "flex-col", "items-center")}>
            <LoadingIcon className={classNames("stroke-neutral-400")} />
            <p className={classNames("text-neutral-400")}>
              <FormattedMessage id="common.loading" />
            </p>
          </div>
        </div>
      )}
      {!isLoading && isError && (
        <div
          className={classNames(
            "w-full",
            "h-full",
            "flex",
            "justify-center",
            "items-center"
          )}
        >
          <div className={classNames("flex", "flex-col", "items-center")}>
            <p className={classNames("text-neutral-400")}>
              <FormattedMessage id="common.error" />
            </p>
          </div>
        </div>
      )}
    </>
  );
}
