import OptimizedImage from "../../utilities/UI/image.ui";

export const CustomImageGallery = (props: { images: string[] }) => {
  const { images } = props;

  return (
    <div className={`w-full flex h-auto flex-col`}>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2 lg:gap-4 w-full items-center`}
      >
        {images?.map((item, index) => (
          <div key={index} className={`w-full h-48 lg:h-80 lg:ml-4 lg:!mt-2 `}>
            <OptimizedImage
              imageData={item as string}
              alt={item}
              className={`w-full h-full rounded-lg `}
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
