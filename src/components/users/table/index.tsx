import Card from "@components/ui/card/Card";
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
import SortMenu from "./SortMenu";

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
        <div className={styles["users-table__container"]}>
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
                      <FlyoutMenu
                        menuPosition="left"
                        buttonChildren={
                          <div
                            role="button"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              columnGap: "10px",
                            }}
                            className="btn--flat"
                          >
                            {header}
                            <img src={FilterIcon} alt="" />
                          </div>
                        }
                        menuChildren={<SortMenu />}
                      />
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
                      menuPosition="right"
                      buttonChildren={
                        <img src={EllipsisIcon} alt="ellipsis icon" />
                      }
                      menuChildren={
                        <Menu status={person.status} id={person.id} />
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Pagination
        recordsCount={paginationData.pagination.items || 0}
        currentPage={page}
      />
    </>
  );
};

export default UsersTable;
