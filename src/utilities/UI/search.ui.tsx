import { useEffect } from "react";
import {
  useCustomQuery,
  useDebounce,
  useSearchTerms,
} from "../../hooks/custom.hook";
import type {
  dropDownOnClickFuncAttributes,
  dropDownSearchAttributes,
  searchUIAttributes,
} from "../types.declarationts";
import { IconUIComponent } from "./icon.ui";
import { Dropdown } from "rizzui/dropdown";

import { ButtonUIComponent } from "./button.ui";

export function SearchUIComponent(props: searchUIAttributes) {
  const { onChange, className, isReadOnly, reDirectURLFucn, placeHolder } =
    props;
  const { setTextSearchTerms, textSearchTerms } = useSearchTerms();
  const debouncedValue = useDebounce(textSearchTerms, 700);

  const { getQueryValue } = useCustomQuery();
  const getQueryString = getQueryValue("search");

  useEffect(() => {
    if (!onChange) return;
    if (getQueryString) {
      onChange(String(getQueryString));
      setTextSearchTerms(String(getQueryString));
      return;
    }
    onChange(debouncedValue);
  }, [debouncedValue]);

  const handleOnchange = (e: string) => {
    setTextSearchTerms(e);
    if (reDirectURLFucn) {
      reDirectURLFucn();
    }
  };

  const handleCancelSearch = () => {
    setTextSearchTerms("");
    if (reDirectURLFucn) {
      reDirectURLFucn();
    }
  };

  return (
    <div className={` flex items-center h-12 ${className}`}>
      <IconUIComponent icon="ri-search-line" />
      <input
        type="text"
        placeholder={`${placeHolder || `Search...`}`}
        value={textSearchTerms}
        className={`h-full w-full outline-none border-none !px-3 bg-transparent`}
        onChange={(e) => handleOnchange(e?.target?.value)}
        readOnly={isReadOnly ? true : false}
      />

      <ButtonUIComponent
        onClick={handleCancelSearch}
        text="Clear"
        isBorder={true}
        className="rounded-[10px] hidden md:flex md:w-28 lg:w-32"
      />
      <span onClick={handleCancelSearch} className="md:hidden">
        {" "}
        <IconUIComponent icon="ri-close-line" />
      </span>
    </div>
  );
}

export function DropDownSearchComponent(props: dropDownSearchAttributes) {
  const { data, onClick } = props;

  const handleOnclick = (props: dropDownOnClickFuncAttributes) => {
    const { item, index } = props;
    if (!onClick) return;
    const payload = {
      item,
      index: index as number,
    };

    onClick(payload);
  };

  return (
    <div className="w-full">
      <Dropdown className={`w-full `}>
        <Dropdown.Trigger
          className={`w-full bg-red flex items-center justify-between`}
        >
          <div className=" w-28 lg:w-44 bg-white !text-black flex cursor-pointer justify-center items-center  border-primary  border rounded-[10px] !h-14  !px-4">
            Sort
          </div>
        </Dropdown.Trigger>
        <Dropdown.Menu
          className={` border bg-gray-50 shadow-md border-dark-very-light-42  !py-2 min-w-[150px] w-auto max-w-max `}
        >
          {data?.map((item, index) => (
            <div key={index} className="hover:bg-gray-100">
              <Dropdown.Item
                onClick={() => handleOnclick({ item: item, index: index })}
                className="!mt-1 cursor-pointer !px-2"
              >
                {item}
              </Dropdown.Item>
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export function GlobalSearchComponent(props: {
  onChange: Function;
  onClick: Function;
  placeHolder?: string;
  btnText: string;
  btnOnClickFunc: Function;
}) {
  const { onChange, onClick, placeHolder, btnText, btnOnClickFunc } = props;

  const handleOnchange = (value: string) => {
    if (!onChange) return;
    onChange(value);
  };

  const handleOnclick = (payload: dropDownOnClickFuncAttributes) => {
    if (!onClick) return;

    onClick(payload);
  };

  const handleBTNonClick = () => {
    if (!btnOnClickFunc) return;
    btnOnClickFunc();
  };

  return (
    <section className="flex flex-col bg-white">
      <div className="w-full flex items-center justify-between border border-gray-300 rounded-[10px] h-22  !px-3 ">
        <div className="w-full md:w-[80%]   2xl:w-[80%] !px-3">
          <SearchUIComponent
            placeHolder={placeHolder}
            onChange={handleOnchange}
          />
        </div>
        <div className="w-[45%]  md:w-auto  hidden lg:w-auto   2xl:w-[22%] sm:flex items-center justify-end ">
          <div className="w-28 xl:w-40 hidden lg:flex">
            <DropDownSearchComponent
              onClick={handleOnclick}
              data={["New", "Old"]}
            />
          </div>

          <div className="!ml-5">
            <ButtonUIComponent
              onClick={handleBTNonClick}
              text={btnText}
              className="rounded-[10px]"
            />
          </div>
        </div>
      </div>

      <div className="!mt-4 sm:hidden">
        <ButtonUIComponent
          onClick={handleBTNonClick}
          text={btnText}
          className="rounded-[10px]"
        />
      </div>
    </section>
  );
}
