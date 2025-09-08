import loading from "../../assets/loading.gif";
import { BackgroundBlur } from "./bg.ui";

export function LoadingComponent(props: { background?: boolean }) {
  const { background } = props;

  return (
    <>
      <div
        className={`w-full fixed inset-0 h-screen flex flex-col justify-center items-center z-[9999] ${
          background ? "bg-gray-50" : ""
        }`}
      >
        <div className="w-1/6">
          <img src={loading} alt="Loading..." />
        </div>
      </div>

      <BackgroundBlur zIndex="z-10" isBackground={true} isVisible={true} />
    </>
  );
}
