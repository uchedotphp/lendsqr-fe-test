import InputGroup from "@components/ui/inputs/InputGroup";
import { useForm } from "react-hook-form";
import ChevronDown from '@assets/icons/chevronDown.svg'
import BaseInput from "@components/ui/inputs/BaseInput";
import styles from "./table.module.scss";
import Button from "@components/ui/buttons/Button";

const SortMenu = () => {
  const { control } = useForm<{ organisation: string }>();
  return (
    <section className={styles.sortmenu}>
      <div>
        <p className={styles.sortmenu__label}>Organisation</p>
        <InputGroup
          control={control}
          name="organisation"
          type="text"
          disabled={false}
          placeholder="Select"
          className={styles.sortmenu__input}
        >
          <img src={ChevronDown} alt="" />
        </InputGroup>
      </div>

      <div>
        <p className={styles.sortmenu__label}>Username</p>
        <BaseInput
          control={control}
          name="organisation"
          type="text"
          disabled={false}
          placeholder="Select"
          className={styles.sortmenu__input}
        />
      </div>

      <div>
        <p className={styles.sortmenu__label}>Email</p>
        <BaseInput
          control={control}
          name="organisation"
          type="text"
          disabled={false}
          placeholder="Select"
          className={styles.sortmenu__input}
        />
      </div>

      <div>
        <p className={styles.sortmenu__label}>Date</p>
        <BaseInput
          control={control}
          name="organisation"
          type="text"
          disabled={false}
          placeholder="Select"
          className={styles.sortmenu__input}
        />
      </div>

      <div>
        <p className={styles.sortmenu__label}>Phone Number</p>
        <BaseInput
          control={control}
          name="organisation"
          type="text"
          disabled={false}
          placeholder="Select"
          className={styles.sortmenu__input}
        />
      </div>

      <div>
        <p className={styles.sortmenu__label}>Status</p>
        <BaseInput
          control={control}
          name="organisation"
          type="text"
          disabled={false}
          placeholder="Select"
          className={styles.sortmenu__input}
        />
      </div>

      <div className={styles.sortmenu__buttons}>
        <Button className="btn--outline">Reset</Button>
        <Button className="btn--outline">Filter</Button>
      </div>
    </section>
  );
};

export default SortMenu;
