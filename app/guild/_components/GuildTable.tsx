"use client";

import { CLASS_TO_NAME, CLASS_TO_PICTURE, RACE_TO_PICTURE } from "../../_utils/mappings";
import { Box, Heading, Input, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { classToColor } from "../../_utils/colors";
import { debounce } from "lodash";

interface Props {
  data: GuildMember[];
  realmName: string;
  guildName: string;
  isEra: boolean;
  region: string;
}

interface GuildMember {
  race: number;
  class: number;
  level: number;
  name: string;
  rank: number;
}

export const GuildTable: React.FC<Props> = ({ data, realmName, guildName, isEra, region }) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "rank",
      desc: false,
    },
  ]);
  const [filteredData, setFilteredData] = useState<GuildMember[]>(data);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<number[]>([]);

  useEffect(() => {
    const filtered = data.filter((d) => {
      return (
        (search.length > 0 ? d.name.toLowerCase().includes(search.toLowerCase()) : true) &&
        (classFilter.length > 0 ? classFilter.includes(d.class) : true)
      );
    });
    setFilteredData(filtered);
  }, [classFilter, data, search]);

  const columnHelper = createColumnHelper<GuildMember>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        cell: (info) => (
          <a
            href={
              isEra
                ? `/character/era/${region}/${realmName}/${info.getValue()}`
                : `/character/${region}/${realmName}/${info.getValue()}`
            }
            target="_blank"
          >
            <Text
              color={classToColor(info.row.getValue("class"))}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {info.getValue()}
            </Text>
          </a>
        ),
        header: "Name",
        minSize: 400,
      }),
      columnHelper.accessor("race", {
        cell: (info) => {
          return (
            <Image
              style={{
                borderRadius: "20px",
                border: "1px solid black",
              }}
              width={30}
              height={30}
              alt={info.toString()}
              src={RACE_TO_PICTURE[info.getValue()]}
              unoptimized={true}
            />
          );
        },
        header: "Race",
        size: 150,
      }),
      columnHelper.accessor("class", {
        cell: (info) => {
          return (
            <Image
              style={{
                borderRadius: "20px",
                border: "1px solid black",
              }}
              width={30}
              height={30}
              alt={info.toString()}
              src={CLASS_TO_PICTURE[info.getValue()]}
              unoptimized={true}
            />
          );
        },
        header: "Class",
        size: 150,
      }),
      columnHelper.accessor("level", {
        cell: (info) => info.getValue(),
        header: "Level",
        size: 150,
      }),
      columnHelper.accessor("rank", {
        cell: (info) => {
          return info.getValue() === 0 ? "Guild Master" : info.getValue();
        },
        header: "Rank",
        size: 100,
      }),
    ],
    // this is created on every render, so we need to disable the exhaustive deps warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEra, realmName, region]
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const handleToggle = (classNumber: number) => {
    setClassFilter((prevSelected) =>
      prevSelected.includes(classNumber)
        ? prevSelected.filter((name) => name !== classNumber)
        : [...prevSelected, classNumber]
    );
  };

  const getButtonLabel = () => {
    if (classFilter.length === 0) return "All classes";
    if (classFilter.length === 1) return CLASS_TO_NAME[classFilter[0]];
    return classFilter.map((classNumber) => CLASS_TO_NAME[classNumber]).join(", ");
  };

  const debouncedSearch = debounce(setSearch, 300);

  return (
    <Box>
      <Box gap={5} mb={5} alignItems={"center"}>
        <Heading as="h1" size="xl">
          {guildName}
        </Heading>
        <Text fontSize={"large"}>{realmName}</Text>
        <Text>{data.length} members</Text>
      </Box>
      <Box mb={3} display={"flex"} flexWrap={"wrap"}>
        <Box mr={5}>
          <Text fontSize={"small"}>Filter by name</Text>
          <Input placeholder="Search" onChange={(e) => debouncedSearch(e.target.value)} />
        </Box>
        <Box>
          <Text fontSize={"small"}>Filter by class</Text>
          <Popover autoFocus={false}>
            <PopoverTrigger>
              <Button
                justifyContent={"start"}
                variant={"outline"}
                width={209}
                rightIcon={<ArrowUpDownIcon />}
              >
                <Text
                  textAlign={"start"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  width={"160px"}
                  fontWeight="400"
                  fontSize={"medium"}
                >
                  {getButtonLabel()}
                </Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent width={250}>
              <PopoverBody>
                <Stack>
                  {Object.entries(CLASS_TO_NAME).map(([classNumb, className]) => (
                    <Checkbox
                      key={className}
                      isChecked={classFilter.includes(parseInt(classNumb))}
                      onChange={() => handleToggle(parseInt(classNumb))}
                    >
                      {className}
                    </Checkbox>
                  ))}
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <Text as="span" pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <ArrowUpIcon aria-label="sorted descending" />
                        ) : (
                          <ArrowDownIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </Text>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
