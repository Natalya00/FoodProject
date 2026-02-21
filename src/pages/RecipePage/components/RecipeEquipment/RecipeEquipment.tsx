import React from 'react';
import styles from './RecipeEquipment.module.scss';

interface RecipeEquipmentProps {
  equipment: string[];
}

const RecipeEquipment: React.FC<RecipeEquipmentProps> = ({ equipment }) => {
  const mid = Math.ceil(equipment.length / 2);
  const col1 = equipment.slice(0, mid);
  const col2 = equipment.slice(mid);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Equipment</h2>
      <div className={styles.columns}>
        <ul className={styles.list}>
          {col1.map((item, i) => (
            <li key={i} className={styles.item}>
              <img src="/equipment.svg" alt="" className={styles.icon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul className={styles.list}>
          {col2.map((item, i) => (
            <li key={i} className={styles.item}>
              <img src="/equipment.svg" alt="" className={styles.icon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecipeEquipment;
