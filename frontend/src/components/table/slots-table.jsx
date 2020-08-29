import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Button, Tag } from "antd"
import {
  CheckSquareOutlined,
  BorderOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import { Column, CellMeasurer } from "react-virtualized"

import InfiniteScrollTable from "./infinite-scroll-table"
import { SLOT } from "lib/common-types"
import { getFullName } from "lib/utils"

const SlotsTable = ({ slots = [], deleteSlot, editSlot, fetchMore, hasNext }) => {
  return (
    <InfiniteScrollTable data={slots} fetchMore={fetchMore} hasNext={hasNext}>
      {({ width, cache }) => [
        <Column
          key="name"
          label="Name"
          dataKey="name"
          width={300}
          cellRenderer={({ rowData: { name, id } }) => <Link to={`/slot/${id}`}>{name}</Link>}
        />,
        <Column
          key="manager"
          label="Manager"
          dataKey="manager"
          width={(width / 5) * 3}
          flexGrow={1}
          cellRenderer={({ rowData, parent, rowIndex }) => (
            <CellMeasurer cache={cache} parent={parent} rowIndex={rowIndex}>
              <div className="py-4">
                {rowData.managers.map((manager) => (
                  <Tag key={manager.id}>{getFullName(manager)}</Tag>
                ))}
              </div>
            </CellMeasurer>
          )}
        />,
        <Column
          key="team"
          label="Team"
          dataKey="team"
          width={width / 5}
          cellRenderer={({ rowData: { name } }) => name}
        />,
        <Column
          key="shareable"
          label="Shareable"
          width={100}
          dataKey="shareable"
          cellRenderer={({ rowData: { shareable } }) =>
            shareable ? <CheckSquareOutlined /> : <BorderOutlined />
          }
        />,
        <Column
          key="actions"
          label="Action"
          dataKey="actions"
          width={80}
          cellRenderer={({ rowData: slot }) => [
            <Button
              key={`edit-${slot.id}`}
              size="small"
              shape="circle"
              icon={<EditOutlined />}
              aria-label="edit"
              onClick={() => editSlot(slot)}
            />,
            <Button
              key={`delete-${slot.id}`}
              size="small"
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              aria-label="delete"
              onClick={() => deleteSlot(slot)}
            />,
          ]}
        />,
      ]}
    </InfiniteScrollTable>
  )
}

SlotsTable.defaultProps = {
  fetchMore: () => {},
  hasNext: false,
}

SlotsTable.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape(SLOT).isRequired).isRequired,
  deleteSlot: PropTypes.func.isRequired,
  editSlot: PropTypes.func.isRequired,
  fetchMore: PropTypes.func,
  hasNext: PropTypes.bool,
}

export default SlotsTable
