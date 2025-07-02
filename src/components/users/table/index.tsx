import Card from "@components/ui/card/Card";
import Button from "@components/ui/buttons/Button";
import FilterIcon from "@assets/icons/filter-icon.svg";
import Pagination from "@components/ui/pagination";
import EllipsisIcon from "@assets/icons/ellipsis.svg";
import styles from "./table.module.scss";
import FlyoutMenu from "@components/flyoutMenu/FlyoutMenu";
import Menu from "./Menu";
import Badge from "@components/badge/Badge";
import { formatDateTime } from "@utils/helpers";
import { useContext } from "react";
import UsersTableContext from "../../../state-management/context/usersTableContext";
import type { UserProfileSchemaType } from "@schemas/Schema";

interface TableProps {
  tableHeaders: string[];
  paginationData: {
    data: UserProfileSchemaType[];
    pagination: {
      first: number;
      prev: number | null;
      next: number | null;
      last: number;
      pages: number;
      items: number;
    };
  };
}

const UsersTable = ({ tableHeaders, paginationData }: TableProps) => {
  const { page } = useContext(UsersTableContext);

  return (
    <>
      <Card>
        <table className={styles["users-table"]}>
          <thead>
            <tr>
              {tableHeaders &&
                tableHeaders.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className={`${styles["users-table__header"]}`}
                  >
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                      className="btn--flat"
                    >
                      {header}
                      <img src={FilterIcon} alt="" />
                    </Button>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {paginationData.data?.map((person, index) => (
              <tr key={index}>
                <td>
                  {person.activeOrganization}
                  <dl className="hide">
                    <dd>{person.activeOrganization}</dd>
                    <dt style={{ display: "none" }}>Email</dt>
                    <dd>{person.email}</dd>
                  </dl>
                </td>
                <td>{person.username}</td>
                <td>{person.email}</td>
                <td>{person.phoneNumber}</td>
                <td>{formatDateTime(person.createdAt)}</td>
                <td>
                  <Badge status={person.status} />
                </td>
                <td>
                  <FlyoutMenu
                    buttonChildren={
                      <img src={EllipsisIcon} alt="ellipsis icon" />
                    }
                    menuChildren={<Menu id={person.id} />}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Pagination
        recordsCount={paginationData.pagination.items || 0}
        currentPage={page}
      />
    </>
  );
};

export default UsersTable;
