import type { ReactNode } from "react";
import { ComponentErrorDisplayer } from "../../components/error/error.component";
import { LoadingComponent } from "./loading.ui";

export function ComponetDataDisplayer(props: {
  loading: boolean;
  error?: string;
  children: ReactNode;
}) {
  const { loading, error, children } = props;

  return (
    <>
      <section className={`w-full flex flex-col`}>
        {loading ? (
          <LoadingComponent background={false} />
        ) : (
          <div className="w-full flex flex-col ">
            {error ? (
              <div className="w-full  h-56 flex justify-center items-center">
                <ComponentErrorDisplayer
                  showBackground={false}
                  errorMessage={error}
                />
              </div>
            ) : (
              <div className="w-full ">{children}</div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
