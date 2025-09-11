import { Box, TextField, IconButton, Spinner, Flex } from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  CrossCircledIcon,
  DoubleArrowDownIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

type SearchProps = {
  onSubmit: (searchValue: string) => void;
};

export function Search({ onSubmit }: SearchProps) {
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Box className="p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(searchTextTemp);
          inputRef.current?.blur();
        }}
      >
        <TextField.Root
          placeholder="Tìm kiếm"
          value={searchTextTemp}
          onChange={(e) => setSearchTextTemp(e.target.value)}
          radius="full"
          color="indigo"
          variant="soft"
          ref={inputRef}
          className="!text-base"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          {searchTextTemp?.length > 0 && (
            <TextField.Slot>
              <IconButton
                title="Xóa"
                variant="ghost"
                type="button"
                onClick={() => {
                  setSearchTextTemp("");
                  onSubmit("");
                }}
                radius="full"
              >
                <CrossCircledIcon />
              </IconButton>
            </TextField.Slot>
          )}
        </TextField.Root>
      </form>
    </Box>
  );
}

export default Search;
