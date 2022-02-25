import React from "react";
import { Box, Link, Switch, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Table, Tr, Th, Td } from "./Table";
import { parseISO, format } from "date-fns";
import NextLink from "next/link";

const AdTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Date Added</Th>
          <Th>Visible</Th>
          <Th>Image</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {/* {sites.map((site, index) => (
          <Box as='tr' key={index}>
            <Td fontWeight='medium'>{site.name}</Td>
            <Td>{site.link}</Td>
            <Td>
              <NextLink href='/p/[siteId]' as={`/p/${site.id}`} passHref>
                <Link href={`/p/${site.id}`}>View Feedback</Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), "PPpp")}</Td>
          </Box>
        ))} */}
        <Box as='tr'>
          <Td fontWeight='medium'>ad 1</Td>

          <Td>date 1</Td>
          <Td>
            <Switch defaultIsChecked={true} />
          </Td>
          <Td>image 1</Td>
          <Td>
            <IconButton
              aria-label='Delete feedback'
              icon={<DeleteIcon />}
              variant='ghost'
            />
          </Td>
        </Box>
        <Box as='tr'>
          <Td fontWeight='medium'>ad 2</Td>
          <Td>date 2</Td>
          <Td>
            <Switch defaultIsChecked={false} />
          </Td>
          <Td>image 2</Td>
          <Td>
            <IconButton
              aria-label='Delete feedback'
              icon={<DeleteIcon />}
              variant='ghost'
            />
          </Td>
        </Box>
        <Box as='tr'>
          <Td fontWeight='medium'>ad 3</Td>
          <Td>date 3</Td>
          <Td>
            <Switch defaultIsChecked={true} />
          </Td>
          <Td>image 3</Td>
          <Td>
            <IconButton
              aria-label='Delete feedback'
              icon={<DeleteIcon />}
              variant='ghost'
            />
          </Td>
        </Box>
      </tbody>
    </Table>
  );
};

export default AdTable;
