import type {
  buyerDetails,
  customInputOnchangeDataAttributes,
  participantDataAttributes,
} from "../../../../../utilities/types.declarationts";
import { InputUIComponent } from "../../../../../utilities/UI/input.ui";
import { TextUIComponent } from "../../../../../utilities/UI/texts.ui";

interface ParticipantInformationProps {
  participantData: participantDataAttributes[];
  setParticipantData: React.Dispatch<
    React.SetStateAction<participantDataAttributes[]>
  >;
}

export function ParticipantInformation({
  participantData,
  setParticipantData,
}: ParticipantInformationProps) {
  const fields: {
    label: string;
    key: keyof buyerDetails;
    type?: string;
    placeholder?: string;
  }[] = [
    {
      label: "First Name",
      key: "participantFirstName",
      type: "text",
      placeholder: "First Name",
    },
    {
      label: "Last Name",
      key: "participantLastName",
      type: "text",
      placeholder: "Last Name",
    },
    {
      label: "Email",
      key: "participantEmail",
      type: "email",
      placeholder: "Email",
    },
    {
      label: "Phone Number",
      key: "participantPhoneNumber",
      type: "text",
      placeholder: "Phone Number",
    },
  ];

  const handleInputChange = (
    index: number,
    field: keyof buyerDetails,
    value: string
  ) => {
    setParticipantData((prev) => {
      const newData = [...prev];
      newData[index].participantNameInfo[field] = value;
      return newData;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {participantData.map((participant, idx) => (
        <div key={idx} className="border border-dark-light-38 !p-4 rounded-lg">
          <TextUIComponent
            type="h5"
            text={`Participant ${idx + 1} - ${participant.packageName}`}
            className="font-semibold !mb-2"
          />

          {fields.map((field) => (
            <InputUIComponent
              key={field.key}
              name={field.key}
              type={"text"}
              placeholder={field.placeholder}
              value={participant.participantNameInfo[field.key] || ""}
              onChange={(data: customInputOnchangeDataAttributes) =>
                handleInputChange(idx, field.key, data?.value as string)
              }
              className="border border-dark-light-38 !p-2 w-full !mb-2 rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
