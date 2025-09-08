import dayjs from "dayjs";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";
import {
  displayCurrency,
  displayNumber,
} from "../../../../utilities/helper.function";
import { ReadMoreComponent } from "../../../../utilities/UI/readmore.ui";
import type {
  profileResponseAttributes,
  tripSubPackages,
  tripSubscriptionPlatformResponseData,
} from "../../../../utilities/types.declarationts";

type TripPackagesSectionProps = {
  packages: tripSubPackages[];
  response: tripSubscriptionPlatformResponseData;
  userResult: profileResponseAttributes;
  dateBackend: string;
  onBookNow: (pkg: tripSubPackages) => void;
  onJoinWaitlist?: (pkg: tripSubPackages) => void;
  generatePaymentMonthlyDuration?: (params: {
    totalFullPayment?: number | string;
    totalDeposit?: number | string;
    paymentDetails?: any;
    startDate: string;
    todayDate: string;
  }) => { amount: number; dueDate: string }[]; // 👈 optional
};

export const TripPackagesSection = ({
  packages,
  response,
  userResult,
  dateBackend,
  onBookNow,
  onJoinWaitlist,
  generatePaymentMonthlyDuration,
}: TripPackagesSectionProps) => {
  if (!Array.isArray(packages) || packages.length === 0) return null;

  const sortedPackages = [...packages].sort(
    (a, b) => Number(a.packageFullPrice || 0) - Number(b.packageFullPrice || 0)
  );

  const handleWaitListFunc = (pkg: tripSubPackages) => {
    if (!onJoinWaitlist) return;
    onJoinWaitlist(pkg);
  };

  const renderBookButton = (pkg: tripSubPackages) => {
    const isClosed =
      pkg?.isTripSubPackageDeadline &&
      !dayjs(pkg?.tripSubPackageDeadline)
        ?.utc()
        ?.isAfter(dayjs(dateBackend)?.utc());

    if (
      userResult?.isValidSubscription &&
      userResult?.isSupportVerified &&
      userResult?.isStripeReady &&
      userResult?.isVerified &&
      !userResult?.isRestricted &&
      Number(response?.salesCount) < Number(response?.tripMaximumGroupSize)
    ) {
      if (pkg?.isTripSubPackageDeadline) {
        return isClosed ? (
          <ButtonUIComponent
            onClick={() => handleWaitListFunc(pkg)}
            text={response?.isWaitList ? "Join Waitlist" : "Booking Closed"}
            className="w-36 bg-primary-dark"
          />
        ) : (
          <ButtonUIComponent
            text="Book Now"
            onClick={() => onBookNow(pkg)}
            isDisable={response?.eventType !== "publish"}
            className={`${
              response?.eventType !== "publish" &&
              " cursor-not-allowed pointer-events-none "
            } h-10 xl:h-12 w-32 md:w-40`}
          />
        );
      }

      return (
        <ButtonUIComponent
          text="Book Now"
          onClick={() => onBookNow(pkg)}
          className={`${
            response?.eventType !== "publish" &&
            " cursor-not-allowed pointer-events-none "
          } h-10 xl:h-12 w-32 md:w-40`}
        />
      );
    }

    return (
      <ButtonUIComponent
        onClick={() => handleWaitListFunc(pkg)}
        text={response?.isWaitList ? "Join Waitlist" : "Booking Closed"}
        className="w-36 bg-primary-dark"
      />
    );
  };

  return (
    <section className="w-full flex flex-col bg-gray-50 print:flex">
      <div className="publishedTripContainer w-full flex flex-col !py-5">
        {/* Section Title */}
        <div className="w-full justify-center flex ">
          <TitleUIComponent
            type="h3"
            className=" !mt-5 !px-5 font-bold"
            text="Trip Packages"
          />
        </div>

        {/* Package List */}
        <div className="w-full flex flex-col items-center !mt-7 ">
          <div className="w-full flex flex-col !pb-24 items-center">
            {sortedPackages?.map((pkg, idx) => {
              //Call generatePaymentMonthlyDuration only if provided
              const paymentPlan =
                pkg?.isPackageDeposit && generatePaymentMonthlyDuration
                  ? generatePaymentMonthlyDuration({
                      totalFullPayment: pkg?.packageFullPrice,
                      totalDeposit: pkg?.packageDepositPrice,
                      paymentDetails: pkg?.packageDepositPaymentMethod,
                      startDate: response?.startDate as string,
                      todayDate: dateBackend,
                    })
                  : [];

              return (
                <div
                  key={idx}
                  className="w-full !mt-6 rounded-[5px] shadow-md flex-col bg-white !py-5 !px-7 "
                >
                  {/* Package Content */}
                  <div className="w-full flex flex-col sm:flex-row sm:justify-between !mt-2">
                    <div className="w-full flex flex-col lg:w-3/4">
                      {/* Package Title */}
                      <TitleUIComponent
                        type="h3"
                        text={pkg?.packageName}
                        className=" font-medium "
                      />

                      {/* Monthly Payment Plan */}
                      {pkg?.isPackageDeposit &&
                        paymentPlan &&
                        paymentPlan.length > 0 && (
                          <TextUIComponent
                            type="p"
                            text={`${displayCurrency(
                              paymentPlan[0].amount
                            )}/month for ${paymentPlan.length} months.`}
                            className="!mt-2 font-semibold"
                          />
                        )}

                      {/* Price Section */}
                      {pkg?.packageFullPrice && (
                        <div className="!mt-3">
                          <TitleUIComponent
                            type="h4"
                            text={`Total: ${displayNumber(
                              pkg?.packageFullPrice
                            )} pts (${displayCurrency(
                              Number(pkg?.packageFullPrice)
                            )})`}
                            className=""
                          />
                        </div>
                      )}

                      {/* Deposit Info */}
                      {pkg?.isPackageDeposit && pkg?.packageDepositPrice && (
                        <div className="!mt-2">
                          <TitleUIComponent
                            type="h4"
                            text={`Deposit: ${displayCurrency(
                              Number(pkg?.packageDepositPrice)
                            )}`}
                            className="hidden"
                          />
                        </div>
                      )}

                      {/* Special Offers */}
                      {pkg?.isSpecialOffer && (
                        <div className="flex items-center !mt-2">
                          <TextUIComponent
                            type="del"
                            text={`${displayCurrency(
                              String(pkg?.specialOfferValues?.oldPrice)
                            )}`}
                            className=" lg:font-semibold"
                          />
                          <TextUIComponent
                            type="p"
                            text={` (${pkg?.specialOfferValues?.discounted}% Off)`}
                            className="!ml-1 text-primary-dark lg:font-semibold"
                          />
                        </div>
                      )}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex w-full md:w-1/5 justify-end !pb-5">
                      {renderBookButton(pkg)}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="!mt-5 w-full">
                    <ReadMoreComponent
                      limit="100"
                      textDisplayer="richText"
                      text={pkg?.packageDescription}
                    />
                  </div>

                  {/* Mobile Buttons */}
                  <div className="flex md:hidden w-full justify-center !mt-5">
                    {renderBookButton(pkg)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
